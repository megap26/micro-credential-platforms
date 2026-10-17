import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AssessmentData, AssessmentAttemptResult } from '../../types';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface AssessmentViewProps {
  curriculumId?: string;
  setCurrentView: (view: string) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  curriculumId,
  setCurrentView,
}) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qIndex: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attemptResult, setAttemptResult] = useState<AssessmentAttemptResult | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [curriculaList, setCurriculaList] = useState<any[]>([]);
  const [activeCurriculumId, setActiveCurriculumId] = useState<string>(curriculumId || '');

  useEffect(() => {
    const fetchCurriculaAndAssessment = async () => {
      try {
        setIsLoading(true);
        const currRes = await api.getUserCurricula();
        if (currRes.success && currRes.curricula?.length > 0) {
          setCurriculaList(currRes.curricula);
          const targetId = activeCurriculumId || currRes.curricula[0]._id;
          setActiveCurriculumId(targetId);
          loadAssessment(targetId);
        }
      } catch (err) {
        console.error('Failed to load assessment data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurriculaAndAssessment();
  }, [curriculumId]);

  const loadAssessment = async (cId: string) => {
    try {
      setIsLoading(true);
      const res = await api.getAssessment(cId);
      if (res.success) {
        setAssessmentData(res.assessment);
        setPreviousAttempts(res.previousAttempts || []);
        setUserAnswers({});
        setAttemptResult(null);
        setCurrentQuestionIndex(0);
      }
    } catch (err) {
      console.error('Error fetching assessment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (attemptResult) return; // Read-only after submission
    setUserAnswers({
      ...userAnswers,
      [qIdx]: optionIdx,
    });
  };

  const handleSubmitQuiz = async () => {
    if (!assessmentData) return;

    // Check if all questions are answered
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < assessmentData.questionsCount) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${assessmentData.questionsCount} questions. Submit anyway?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitting(true);
    try {
      const formattedAnswers = Object.entries(userAnswers).map(([qIdx, optIdx]) => ({
        questionIndex: Number(qIdx),
        selectedOptionIndex: Number(optIdx),
      }));

      const res = await api.submitAssessment(assessmentData._id, formattedAnswers, 300);
      if (res.success && res.attempt) {
        setAttemptResult(res.attempt);
        if (res.attempt.passed) {
          // Trigger celebratory confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }
    } catch (err: any) {
      alert(err.message || 'Assessment submission failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIssueCredential = async () => {
    if (!activeCurriculumId) return;
    setIsIssuing(true);
    try {
      const res = await api.issueCredential(activeCurriculumId);
      if (res.success) {
        alert('🎉 Verified Digital Credential successfully issued and recorded in the global registry!');
        setCurrentView('credentials');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to issue credential.');
    } finally {
      setIsIssuing(false);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setAttemptResult(null);
    setCurrentQuestionIndex(0);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <span className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
        <p className="text-xs">Loading competency certification examination...</p>
      </div>
    );
  }

  if (!assessmentData) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-3">
        <Award className="w-12 h-12 mx-auto text-slate-600" />
        <h3 className="text-base font-bold text-white">No Assessment Configured</h3>
        <p className="text-xs">Please generate and enroll in a curriculum first.</p>
      </div>
    );
  }

  const currentQ = assessmentData.questions[currentQuestionIndex];
  const answeredTotal = Object.keys(userAnswers).length;

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
              Competency Evaluation Exam
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Passing Benchmark: {assessmentData.passingScorePercent}%
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">{assessmentData.title}</h1>
        </div>

        {/* Pathway Selector */}
        {curriculaList.length > 1 && (
          <select
            value={activeCurriculumId}
            onChange={(e) => {
              setActiveCurriculumId(e.target.value);
              loadAssessment(e.target.value);
            }}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
          >
            {curriculaList.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* If Graded Attempt Result Exists */}
      {attemptResult ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Result Banner */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              attemptResult.passed
                ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-navy-950 border-emerald-500/40'
                : 'bg-gradient-to-r from-rose-950/80 via-slate-900 to-navy-950 border-rose-500/40'
            }`}
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                {attemptResult.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {attemptResult.passed ? 'Demonstrated Competency Verified' : 'Assessment Threshold Not Met'}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white">
                Exam Score: {attemptResult.scorePercent}%
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {attemptResult.feedback}
              </p>
              <div className="text-xs text-slate-400 font-mono">
                Correct: {attemptResult.correctCount} of {attemptResult.totalQuestions} Questions • Attempt #{attemptResult.attemptNumber}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {attemptResult.passed ? (
                <button
                  onClick={handleIssueCredential}
                  disabled={isIssuing}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>{isIssuing ? 'Recording in Registry...' : 'Claim Verified Digital Credential'}</span>
                </button>
              ) : (
                <button
                  onClick={handleRetake}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake Examination</span>
                </button>
              )}
            </div>
          </div>

          {/* Graded Questions with Answers & Explanations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Detailed Answer Rationale & Scoring</h3>

            {attemptResult.gradedDetails?.map((detail, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${
                  detail.isCorrect
                    ? 'bg-navy-900/60 border-emerald-500/30'
                    : 'bg-navy-900/60 border-rose-500/30'
                } space-y-4`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                        detail.isCorrect
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{detail.questionText}</h4>
                      <span className="text-[10px] text-cyanAccent-400 font-mono mt-1 block">
                        Competency: {detail.competencyTag}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      detail.isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {detail.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-2">
                  {detail.options.map((opt, optIdx) => {
                    const isSelected = detail.selectedOptionIndex === optIdx;
                    const isCorrect = detail.correctOptionIndex === optIdx;

                    let optStyle = 'border-slate-800 bg-slate-950/60 text-slate-300';
                    if (isCorrect) {
                      optStyle = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optStyle}`}
                      >
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="text-[10px] text-emerald-400 font-bold ml-2">
                            ✓ Correct Answer
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span className="text-[10px] text-rose-400 font-bold ml-2">
                            ✗ Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Technical Explanation */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-400">
                    Engineering Explanation:
                  </span>
                  <p className="leading-relaxed">{detail.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Active Quiz Runner */
        <div className="space-y-6">
          {/* Progress & Pagination Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>
              Question <strong className="text-white">{currentQuestionIndex + 1}</strong> of{' '}
              {assessmentData.questionsCount}
            </span>
            <span>
              Answered: <strong className="text-cyanAccent-400">{answeredTotal}</strong> / {assessmentData.questionsCount}
            </span>
          </div>

          {/* Question Box */}
          {currentQ && (
            <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-slate-800 space-y-6 shadow-xl">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
                  {currentQ.competencyTag} • {currentQ.difficulty}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-3 leading-relaxed">
                  {currentQ.questionText}
                </h3>
              </div>

              {/* Code Snippet if present */}
              {currentQ.codeSnippet && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyanAccent-300 overflow-x-auto whitespace-pre">
                  {currentQ.codeSnippet}
                </div>
              )}

              {/* Multiple Choice Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                      className={`p-4 rounded-xl border cursor-pointer transition select-none flex items-center justify-between ${
                        isSelected
                          ? 'border-brand-500 bg-brand-600/15 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-brand-400 bg-brand-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition disabled:opacity-40"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {currentQuestionIndex < assessmentData.questionsCount - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition flex items-center gap-1.5"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>{isSubmitting ? 'Grading Answers...' : 'Submit & Grade Exam'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
