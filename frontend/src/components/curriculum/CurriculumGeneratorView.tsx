import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Curriculum, CurriculumModule } from '../../types';
import {
  Sparkles,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Save,
  Download,
  RefreshCw,
  GitBranch,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileCode,
  ArrowRight,
} from 'lucide-react';

interface CurriculumGeneratorViewProps {
  preloadData?: any;
  setCurrentView: (view: string) => void;
  setSelectedCurriculumId: (id: string) => void;
}

export const CurriculumGeneratorView: React.FC<CurriculumGeneratorViewProps> = ({
  preloadData,
  setCurrentView,
  setSelectedCurriculumId,
}) => {
  const [targetRole, setTargetRole] = useState(preloadData?.targetRole || 'Full Stack Developer');
  const [durationWeeks, setDurationWeeks] = useState(6);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<Curriculum | null>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>('mod-1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRealigning, setIsRealigning] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Auto-generate if preloadData arrived from Gap Analyzer
  useEffect(() => {
    if (preloadData) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatusMessage(null);
    try {
      const res = await api.generateCurriculum({
        targetRole,
        currentSkills: preloadData?.currentSkills || [],
        preferredDurationWeeks: durationWeeks,
      });

      if (res.success && res.curriculum) {
        setGeneratedCurriculum(res.curriculum);
        setExpandedModuleId(res.curriculum.modules[0]?.id || 'mod-1');
      }
    } catch (err: any) {
      alert(err.message || 'Curriculum generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndEnroll = async () => {
    if (!generatedCurriculum) return;
    setIsSaving(true);
    try {
      const res = await api.saveCurriculum(generatedCurriculum);
      if (res.success) {
        setStatusMessage('✅ Curriculum successfully saved and enrolled in your learning plan!');
        if (res.curriculum?._id) {
          setSelectedCurriculumId(res.curriculum._id);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Saving failed.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRealignMarketDemand = async () => {
    if (!generatedCurriculum?._id) {
      alert('Please save the curriculum first before re-aligning version history.');
      return;
    }

    setIsRealigning(true);
    try {
      const res = await api.realignCurriculum(generatedCurriculum._id);
      if (res.success) {
        setGeneratedCurriculum(res.curriculum);
        setStatusMessage(`🚀 Market Demand Re-analyzed! Upgraded to version ${res.curriculum.version}. Newly required skills and updated modules have been synchronized.`);
      }
    } catch (err: any) {
      alert(err.message || 'Market re-alignment failed.');
    } finally {
      setIsRealigning(false);
    }
  };

  const handlePrintSyllabus = () => {
    window.print();
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Curriculum Synthesis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            AI Micro-Credential Curriculum Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Synthesizes personalized learning modules and practical mini-projects tailored to bridge your exact career skill gaps.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {generatedCurriculum && (
            <>
              <button
                onClick={handlePrintSyllabus}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Export Syllabus / PDF</span>
              </button>
              {generatedCurriculum._id && (
                <button
                  onClick={handleRealignMarketDemand}
                  disabled={isRealigning}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-4 h-4 ${isRealigning ? 'animate-spin' : ''}`} />
                  <span>Re-analyze Market Demand</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
          <span>{statusMessage}</span>
          <button
            onClick={() => setCurrentView('my-learning')}
            className="font-bold underline text-emerald-200 ml-4 hover:text-white"
          >
            Go to My Learning →
          </button>
        </div>
      )}

      {/* Generator Controls Card */}
      <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Target Job Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand-500 transition"
            >
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="AI Engineer">AI Engineer (LLM & Generative Systems)</option>
              <option value="Cloud DevOps Engineer">Cloud DevOps & Site Reliability Engineer</option>
              <option value="Data Analyst">Data Analyst & Analytics Engineer</option>
              <option value="Backend Systems Architect">Backend Systems Architect</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Preferred Study Pacing ({durationWeeks} Weeks)
            </label>
            <input
              type="range"
              min={2}
              max={12}
              step={1}
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value))}
              className="w-full accent-brand-500 h-2 bg-slate-800 rounded-lg cursor-pointer mt-3"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>2 Weeks (Intensive)</span>
              <span>6 Weeks</span>
              <span>12 Weeks (Comprehensive)</span>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Curriculum...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyanAccent-300" />
                  <span>Generate Personalized Curriculum</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Generated Curriculum View */}
      {generatedCurriculum && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Metadata Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-navy-900 to-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
                    {generatedCurriculum.badgeLevel} Micro-Credential
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Version {generatedCurriculum.version || 'v1.0'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-cyanAccent-300 bg-cyan-500/10 border border-cyan-500/20">
                    {generatedCurriculum.alignmentScore}% Market Alignment
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700">
                    Source: {generatedCurriculum.generatedBy === 'ai_gemini' ? 'Google Gemini 1.5' : 'Demonstration Domain Knowledge Engine'}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white">{generatedCurriculum.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  {generatedCurriculum.shortDescription}
                </p>
              </div>

              <button
                onClick={handleSaveAndEnroll}
                disabled={isSaving}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save & Enroll in Pathway'}</span>
              </button>
            </div>

            {/* Target Competencies & Outcomes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-cyanAccent-400 uppercase tracking-wider">
                  Target Competencies
                </h4>
                <div className="space-y-1.5">
                  {generatedCurriculum.targetCompetencies?.map((comp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Demonstrated Learning Outcomes
                </h4>
                <div className="space-y-1.5">
                  {generatedCurriculum.learningOutcomes?.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Estimated Duration: <strong className="text-white">{generatedCurriculum.totalEstimatedDurationHours || 24} Hours</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Passing Score Requirement: <strong className="text-white">{generatedCurriculum.passingScorePercent || 75}%</strong></span>
              </div>
            </div>
          </div>

          {/* Ordered Modules Accordion */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-400" />
              <span>Modular Learning Curriculum ({generatedCurriculum.modules?.length || 0} Modules)</span>
            </h3>

            {generatedCurriculum.modules?.map((mod: CurriculumModule, idx: number) => {
              const isExpanded = expandedModuleId === mod.id;
              return (
                <div
                  key={mod.id}
                  className="rounded-2xl bg-navy-900/80 border border-slate-800 overflow-hidden shadow-sm transition"
                >
                  {/* Module Header Bar */}
                  <div
                    onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-white">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{mod.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 hidden sm:block">
                        {mod.estimatedHours} Hours
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-5 animate-in fade-in duration-200">
                      {/* Topics */}
                      <div>
                        <h5 className="text-xs font-bold text-cyanAccent-400 uppercase tracking-wider mb-2">
                          Topics & Practical Lessons
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          {mod.topics?.map((topic, tIdx) => (
                            <li key={tIdx} className="p-2 bg-slate-900 rounded-lg border border-slate-800 flex items-start gap-2">
                              <span className="text-brand-400 font-bold">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Practical Exercises */}
                      <div>
                        <h5 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                          Hands-on Exercises
                        </h5>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {mod.practicalExercises?.map((ex, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2">
                              <FileCode className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mini Project */}
                      {mod.miniProject && (
                        <div className="p-4 bg-brand-950/30 border border-brand-500/20 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                              Mini-Project Deliverable: {mod.miniProject.title}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {mod.miniProject.instructions}
                          </p>
                          <div className="text-[11px] text-slate-400 pt-2 border-t border-brand-500/10 font-mono">
                            Criteria: {mod.miniProject.submissionCriteria}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
