import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Curriculum, Credential, LearningProgress } from '../../types';
import {
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Clock,
  Compass,
  GitCompare,
  Zap,
} from 'lucide-react';

interface LearnerDashboardProps {
  setCurrentView: (view: string) => void;
  setSelectedCurriculumId: (id: string) => void;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({
  setCurrentView,
  setSelectedCurriculumId,
}) => {
  const { user, profile } = useAuth();
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [currRes, credRes, analRes] = await Promise.all([
          api.getUserCurricula().catch(() => ({ curricula: [] })),
          api.getMyCredentials().catch(() => ({ credentials: [] })),
          api.getSkillAnalytics(profile?.targetCareer || 'Full Stack Developer').catch(() => ({})),
        ]);

        if (currRes.curricula) setCurricula(currRes.curricula);
        if (credRes.credentials) setCredentials(credRes.credentials);
        if (analRes) setAnalyticsData(analRes);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profile?.targetCareer]);

  const targetRole = profile?.targetCareer || 'Full Stack Developer';
  const matchScore = profile?.overallMatchScore || 68;

  const currentSkills = profile?.currentSkills || [];
  const topInDemand = analyticsData?.topInDemand?.slice(0, 4) || [];
  const emergingSkills = analyticsData?.emergingSkills?.slice(0, 3) || [];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-navy-900 via-indigo-950/70 to-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-xs font-semibold text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-cyanAccent-400" />
              <span>Personalized Micro-Credential Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Welcome back, {user?.name || 'Learner'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Target Track: <span className="font-bold text-cyanAccent-400">{targetRole}</span> • 
              Your skills are continuously benchmarked against real-time global employer requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('gap-analyzer')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center gap-2 shadow-sm"
            >
              <GitCompare className="w-4 h-4 text-cyanAccent-400" />
              <span>Skill-Gap Analysis</span>
            </button>
            <button
              onClick={() => setCurrentView('curriculum-generator')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyanAccent-300" />
              <span>Generate Curriculum</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Match Score Card */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role Match Score</p>
            <h3 className="text-2xl font-black text-white mt-1">{matchScore}%</h3>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from last evaluation</span>
            </p>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-brand-500"
                strokeDasharray={`${matchScore}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-white">{matchScore}%</span>
          </div>
        </div>

        {/* Active Curricula */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Enrolled Curricula</p>
            <h3 className="text-2xl font-black text-white mt-1">{curricula.length}</h3>
            <p className="text-[11px] text-cyanAccent-400 mt-1">Modular Micro-Courses</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyanAccent-400 flex items-center justify-center border border-cyan-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Earned Credentials */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Verified Credentials</p>
            <h3 className="text-2xl font-black text-white mt-1">{credentials.length}</h3>
            <p className="text-[11px] text-amber-400 mt-1">Registry Validated</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Global Market Index */}
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Market Demand Index</p>
            <h3 className="text-2xl font-black text-white mt-1">High (94.2)</h3>
            <p className="text-[11px] text-slate-400 mt-1">ESCO / O*NET Aligned</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <Compass className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: My Active Learning & Skill Profile Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Learning Curricula */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-bold text-white">Active Micro-Credential Pathways</h2>
            </div>
            <button
              onClick={() => setCurrentView('my-learning')}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {curricula.length === 0 ? (
            <div className="p-8 rounded-2xl bg-navy-900/50 border border-slate-800 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Curricula Enrolled Yet</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Generate a personalized micro-credential curriculum tailored to your specific skill gap and target career.
              </p>
              <button
                onClick={() => setCurrentView('curriculum-generator')}
                className="mt-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white transition inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate First Curriculum</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {curricula.map((curr) => {
                const totalMods = curr.modules?.length || 4;
                const completedMods = curr.modules?.filter(m => m.status === 'completed').length || 0;
                const progressPct = Math.round((completedMods / totalMods) * 100);

                return (
                  <div
                    key={curr._id}
                    className="p-5 rounded-2xl bg-navy-900/90 border border-slate-800 hover:border-slate-700 transition shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                            {curr.badgeLevel || 'Specialist'} • Version {curr.version || 'v1.0'}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {curr.alignmentScore}% Market Match
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white mt-1.5">{curr.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{curr.shortDescription}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (curr._id) setSelectedCurriculumId(curr._id);
                          setCurrentView('my-learning');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-brand-600 text-xs font-semibold text-white border border-slate-700 hover:border-brand-500 transition flex items-center gap-1.5 flex-shrink-0"
                      >
                        <span>Resume Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Modules Progress</span>
                        <span className="font-bold text-white">{completedMods} of {totalMods} completed ({progressPct}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brand-500 to-cyanAccent-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* High-Demand & Emerging Market Insights Box */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Live Market Skill Trends ({targetRole})</h3>
              </div>
              <button
                onClick={() => setCurrentView('analytics')}
                className="text-xs text-cyanAccent-400 hover:underline font-semibold"
              >
                Explore Analytics →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topInDemand.map((skill: any) => (
                <div key={skill._id || skill.name} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                    <span className="block text-[10px] text-slate-400">{skill.category}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyanAccent-400">{skill.marketDemandScore}% Demand</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Current Skills Breakdown & Credentials */}
        <div className="space-y-6">
          {/* My Skills Breakdown Card */}
          <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Demonstrated Skills</h3>
              </div>
              <button
                onClick={() => setCurrentView('profile')}
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold"
              >
                Edit
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {currentSkills.length === 0 ? (
                <p className="text-xs text-slate-400">No skills added yet.</p>
              ) : (
                currentSkills.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40">
                    <span className="font-medium text-slate-200">{s.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        s.proficiency === 'Expert'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : s.proficiency === 'Advanced'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : s.proficiency === 'Intermediate'
                          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {s.proficiency}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Earned Micro-Credentials Preview Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-950/60 to-slate-900 border border-brand-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Earned Micro-Credentials</h3>
              </div>
              <button
                onClick={() => setCurrentView('credentials')}
                className="text-xs text-cyanAccent-400 hover:underline font-semibold"
              >
                View
              </button>
            </div>

            {credentials.length === 0 ? (
              <div className="text-center py-4 text-xs text-slate-400">
                <p>Pass your first competency exam to earn an authentic digital credential.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.credentialId}
                    onClick={() => setCurrentView('credentials')}
                    className="p-3 bg-slate-950/70 border border-brand-500/30 rounded-xl cursor-pointer hover:border-brand-500 transition"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-cyanAccent-400 font-bold">{cred.credentialId}</span>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                        {cred.badgeTier} • {cred.scorePercent}%
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{cred.microCredentialTitle}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">Issued: {new Date(cred.issueDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
