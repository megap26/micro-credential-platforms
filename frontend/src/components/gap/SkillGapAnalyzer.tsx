import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Info,
  Sliders,
  Plus,
  Trash2,
  TrendingUp,
} from 'lucide-react';

interface SkillGapAnalyzerProps {
  setCurrentView: (view: string) => void;
  setCurriculumPreload?: (data: any) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  setCurrentView,
  setCurriculumPreload,
}) => {
  const { profile } = useAuth();
  const [targetRole, setTargetRole] = useState(profile?.targetCareer || 'Full Stack Developer');
  const [skillsList, setSkillsList] = useState<any[]>(profile?.currentSkills || [
    { name: 'JavaScript', proficiency: 'Advanced' },
    { name: 'HTML5 & CSS3', proficiency: 'Advanced' },
    { name: 'React', proficiency: 'Intermediate' },
    { name: 'Node.js', proficiency: 'Beginner' },
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const data = await api.analyzeGap(targetRole, skillsList);
      if (data.success) {
        setAnalysisResult(data.analysis);
      }
    } catch (err: any) {
      console.error('Gap analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, [targetRole, skillsList.length]);

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    setSkillsList([...skillsList, { name: newSkillName.trim(), proficiency: newSkillProficiency }]);
    setNewSkillName('');
  };

  const removeSkill = (index: number) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };

  const updateSkillLevel = (index: number, level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') => {
    const updated = [...skillsList];
    updated[index].proficiency = level;
    setSkillsList(updated);
  };

  const handleGeneratePath = () => {
    if (setCurriculumPreload) {
      setCurriculumPreload({
        targetRole,
        currentSkills: skillsList,
        missingSkills: analysisResult?.missingSkills || [],
        skillsToImprove: analysisResult?.skillsToImprove || [],
      });
    }
    setCurrentView('curriculum-generator');
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-2">
            <GitCompare className="w-3.5 h-3.5" />
            <span>Labor Market Benchmarking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Skill-Gap Analysis Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Compare your demonstrated competencies against current global job requirements to reveal exact growth priorities.
          </p>
        </div>

        <button
          onClick={handleGeneratePath}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition flex items-center gap-2 self-start sm:self-center"
        >
          <Sparkles className="w-4 h-4 text-cyanAccent-300" />
          <span>Generate My Learning Path</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Target Role & Skills Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1/3: Role Selector & Add Skills */}
        <div className="space-y-6">
          {/* Role Selector Card */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              Target Career Track
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand-500 transition"
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="AI Engineer">AI Engineer (LLM & Agents)</option>
              <option value="Cloud DevOps Engineer">Cloud DevOps Engineer</option>
              <option value="Data Analyst">Data Analyst & Analytics Engineer</option>
              <option value="Backend Systems Architect">Backend Systems Architect</option>
            </select>
            <p className="text-[11px] text-slate-400">
              Benchmarked against live tech job postings and standard competencies.
            </p>
          </div>

          {/* Add Custom Skill Card */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
              Add Your Skills
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Docker, PostgreSQL..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition"
              />
              <div className="flex gap-2">
                <select
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Skills Chips List */}
          <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Current Skills ({skillsList.length})
              </span>
              <button
                onClick={runAnalysis}
                className="text-[11px] text-cyanAccent-400 hover:underline font-semibold"
              >
                Re-calculate
              </button>
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {skillsList.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white">{skill.name}</span>
                    <select
                      value={skill.proficiency}
                      onChange={(e) => updateSkillLevel(idx, e.target.value as any)}
                      className="block text-[10px] bg-transparent text-slate-400 outline-none mt-0.5 cursor-pointer hover:text-cyanAccent-400"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeSkill(idx)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 2/3: Skill-Gap Breakdown & Calculation Engine */}
        <div className="lg:col-span-2 space-y-6">
          {analysisResult && (
            <>
              {/* Match Score Card with Formula Explanation */}
              <div className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyanAccent-400 uppercase tracking-wider">
                      Transparent Math Calculation
                    </span>
                  </div>
                  <h3 className="text-3xl font-black text-white">
                    {analysisResult.matchPercentage}% Target Readiness
                  </h3>
                  <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800 leading-relaxed">
                    {analysisResult.scoreFormula?.calculation}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {analysisResult.scoreFormula?.explanation}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex-shrink-0">
                  <span className="text-xs font-semibold text-slate-400 mb-1">Recommended Badge</span>
                  <span className="text-sm font-extrabold text-amber-400 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    {analysisResult.recommendations?.recommendedBadge}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-2">Pass rate required: 75%</span>
                </div>
              </div>

              {/* 4 Categorized Skill Buckets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Strong Skills */}
                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Strong Skills ({analysisResult.strongSkills?.length || 0})
                      </h4>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">Meets Standard</span>
                  </div>

                  <div className="space-y-2">
                    {analysisResult.strongSkills?.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">No skills meet benchmark standard yet.</p>
                    ) : (
                      analysisResult.strongSkills?.map((s: any, i: number) => (
                        <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl border border-emerald-500/20 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white">{s.name}</span>
                            <span className="block text-[10px] text-slate-400">{s.category}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                            {s.currentProficiency}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 2. Skills to Improve */}
                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Skills to Improve ({analysisResult.skillsToImprove?.length || 0})
                      </h4>
                    </div>
                    <span className="text-[10px] text-amber-400 font-bold">Below Benchmark</span>
                  </div>

                  <div className="space-y-2">
                    {analysisResult.skillsToImprove?.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">No partial gaps identified.</p>
                    ) : (
                      analysisResult.skillsToImprove?.map((s: any, i: number) => (
                        <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl border border-amber-500/20 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white">{s.name}</span>
                            <span className="block text-[10px] text-amber-400">Needs {s.requiredProficiency}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                            Current: {s.currentProficiency}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 3. Missing Skills */}
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Missing Skills ({analysisResult.missingSkills?.length || 0})
                      </h4>
                    </div>
                    <span className="text-[10px] text-rose-400 font-bold">Must Acquire</span>
                  </div>

                  <div className="space-y-2">
                    {analysisResult.missingSkills?.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">No missing required skills.</p>
                    ) : (
                      analysisResult.missingSkills?.map((s: any, i: number) => (
                        <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl border border-rose-500/20 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white">{s.name}</span>
                            <span className="block text-[10px] text-slate-400">{s.category}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                            Required: {s.requiredProficiency}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* 4. High-Priority Focus */}
                <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyanAccent-400" />
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        High-Priority Curriculum Focus
                      </h4>
                    </div>
                    <span className="text-[10px] text-cyanAccent-300 font-bold">Employer Critical</span>
                  </div>

                  <div className="space-y-2">
                    {analysisResult.highPriorityGaps?.length === 0 ? (
                      <p className="text-xs text-slate-400 py-2">All high-priority core requirements satisfied!</p>
                    ) : (
                      analysisResult.highPriorityGaps?.map((s: any, i: number) => (
                        <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl border border-indigo-500/20 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white">{s.name}</span>
                            <span className="block text-[10px] text-indigo-300">Weight: {s.weight} pts</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                            Core Gap
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
