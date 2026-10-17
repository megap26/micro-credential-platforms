import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Curriculum, LearningProgress, CurriculumModule } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Send,
  Sparkles,
  Award,
  FileCode,
  Github,
  Check,
  ChevronRight,
  PlayCircle,
} from 'lucide-react';

interface LearningProgressViewProps {
  selectedCurriculumId?: string;
  setCurrentView: (view: string) => void;
  setSelectedCurriculumId: (id: string) => void;
}

export const LearningProgressView: React.FC<LearningProgressViewProps> = ({
  selectedCurriculumId,
  setCurrentView,
  setSelectedCurriculumId,
}) => {
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [activeCurriculum, setActiveCurriculum] = useState<Curriculum | null>(null);
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [activeModule, setActiveModule] = useState<CurriculumModule | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user curricula
  useEffect(() => {
    const loadCurricula = async () => {
      try {
        setIsLoading(true);
        const res = await api.getUserCurricula();
        if (res.success && res.curricula?.length > 0) {
          setCurricula(res.curricula);
          const initialId = selectedCurriculumId || res.curricula[0]._id;
          loadCurriculumProgress(initialId);
        }
      } catch (err) {
        console.error('Error fetching curricula:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadCurricula();
  }, [selectedCurriculumId]);

  const loadCurriculumProgress = async (currId: string) => {
    try {
      const res = await api.getCurriculumById(currId);
      if (res.success) {
        setActiveCurriculum(res.curriculum);
        setProgress(res.progress);
        setSelectedCurriculumId(currId);

        // Set active module
        const activeModId = res.progress?.currentModuleId || res.curriculum?.modules[0]?.id;
        const found = res.curriculum?.modules?.find((m: any) => m.id === activeModId) || res.curriculum?.modules[0];
        setActiveModule(found || null);
      }
    } catch (err) {
      console.error('Error fetching curriculum progress:', err);
    }
  };

  const handleToggleModuleCompletion = async (modId: string, currentCompleted: boolean) => {
    if (!activeCurriculum?._id) return;
    try {
      const res = await api.updateModule(activeCurriculum._id, {
        moduleId: modId,
        isCompleted: !currentCompleted,
        currentModuleId: modId,
      });
      if (res.success) {
        setProgress(res.progress);
      }
    } catch (err) {
      alert('Failed to update progress.');
    }
  };

  const handleSubmitMiniProject = async () => {
    if (!activeCurriculum?._id || !activeModule?.id) return;
    if (!submissionText.trim() && !repoUrl.trim()) {
      alert('Please enter a submission description or GitHub repository URL.');
      return;
    }

    setIsSubmittingTask(true);
    try {
      const res = await api.updateModule(activeCurriculum._id, {
        moduleId: activeModule.id,
        isCompleted: true,
        practicalSubmission: {
          text: submissionText,
          repoUrl,
        },
      });

      if (res.success) {
        setProgress(res.progress);
        alert('🎉 Practical Mini-Project deliverable submitted and recorded in your learning record!');
        setSubmissionText('');
        setRepoUrl('');
      }
    } catch (err) {
      alert('Failed to submit mini project.');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <span className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
        <p className="text-xs">Loading learning modules and persistent progress...</p>
      </div>
    );
  }

  if (curricula.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Enrolled Pathways</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          You haven't enrolled in any micro-credential curriculum yet. Generate one tailored to your role!
        </p>
        <button
          onClick={() => setCurrentView('curriculum-generator')}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Curriculum</span>
        </button>
      </div>
    );
  }

  const isModuleCompleted = (modId: string) => {
    return progress?.completedModules?.includes(modId) || false;
  };

  const progressPercentage = progress?.overallProgressPercent || 0;

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
              Micro-Credential In Progress
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Version {activeCurriculum?.version || 'v1.0'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {activeCurriculum?.title}
          </h1>
        </div>

        {/* Action Button: Take Assessment */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('assessments')}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Take Competency Exam</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Banner */}
      <div className="p-6 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyanAccent-400" />
            Overall Completion: {progress?.completedModules?.length || 0} of {activeCurriculum?.modules?.length || 0} Modules
          </span>
          <span className="font-mono font-bold text-emerald-400 text-sm">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Module Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Modules Navigation Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Curriculum Modules
          </h3>

          <div className="space-y-2">
            {activeCurriculum?.modules?.map((mod, idx) => {
              const completed = isModuleCompleted(mod.id);
              const isSelected = activeModule?.id === mod.id;

              return (
                <div
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition select-none flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-brand-500 text-white shadow-md'
                      : 'bg-navy-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModuleCompletion(mod.id, completed);
                      }}
                      className="p-1 hover:scale-110 transition"
                    >
                      {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold line-clamp-1">
                        {idx + 1}. {mod.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {mod.estimatedHours} hrs • {mod.topics?.length || 0} topics
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2/3: Active Module Deep Workspace */}
        <div className="lg:col-span-2 space-y-6">
          {activeModule && (
            <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/90 border border-slate-800 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono text-cyanAccent-400 uppercase tracking-wider font-semibold">
                    Current Module Study Desk
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{activeModule.title}</h2>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeModule.description}</p>
                </div>

                <button
                  onClick={() => handleToggleModuleCompletion(activeModule.id, isModuleCompleted(activeModule.id))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 flex-shrink-0 ${
                    isModuleCompleted(activeModule.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-md'
                  }`}
                >
                  {isModuleCompleted(activeModule.id) ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" />
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>

              {/* Topics & Lessons Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-brand-400" />
                  <span>Module Topics & Learning Objectives</span>
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeModule.topics?.map((topic, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-200 flex items-center gap-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyanAccent-400" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Exercises */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <span>Hands-on Exercises</span>
                </h4>
                <div className="space-y-2">
                  {activeModule.practicalExercises?.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs text-slate-300 leading-relaxed"
                    >
                      {ex}
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Task & Mini-Project Submission Form */}
              {activeModule.miniProject && (
                <div className="p-5 bg-gradient-to-br from-brand-950/40 to-slate-950 border border-brand-500/30 rounded-2xl space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-brand-300 uppercase tracking-wider bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                      Mini-Project Challenge
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">
                      {activeModule.miniProject.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeModule.miniProject.instructions}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 font-mono">
                      Evaluation Criteria: {activeModule.miniProject.submissionCriteria}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Repository or Project URL (GitHub, GitLab, CodeSandbox)
                      </label>
                      <div className="relative">
                        <Github className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                        <input
                          type="url"
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                          placeholder="https://github.com/username/project-repo"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        Implementation Notes & Technical Architecture
                      </label>
                      <textarea
                        rows={3}
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        placeholder="Detail how you fulfilled the requirements, architectural design decisions, and testing steps..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition font-mono"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSubmitMiniProject}
                        disabled={isSubmittingTask}
                        className="px-5 py-2 rounded-xl font-bold text-xs bg-brand-600 hover:bg-brand-500 text-white shadow-md transition disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmittingTask ? 'Submitting...' : 'Submit Deliverable'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
