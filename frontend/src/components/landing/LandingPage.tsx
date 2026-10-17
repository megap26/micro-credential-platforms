import React from 'react';
import {
  Compass,
  FileSearch,
  GitCompare,
  Sparkles,
  CheckCircle2,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Layers,
  ChevronRight,
  BarChart3,
  Search,
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onExploreTrends: () => void;
  onOpenVerification: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onExploreTrends,
  onOpenVerification,
}) => {
  return (
    <div className="w-full min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/10 to-cyanAccent-400/10 blur-[130px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Market Intelligence Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-brand-500/30 text-xs font-semibold text-brand-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyanAccent-400 animate-pulse" />
            <span>Q4 2026 Real-Time Global Job Market Intelligence Active</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Turn In-Demand Skills into{' '}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyanAccent-400 bg-clip-text text-transparent">
              Career-Ready Micro-Credentials.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            SkillPulse bridges the gap between hiring requirements and learner competencies. Our AI engine continuously analyzes real-time job-market data, benchmarks your personal skill gaps, generates custom learning curricula, and issues verifiable digital credentials.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 shadow-xl shadow-brand-500/25 transition flex items-center justify-center gap-2 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={onExploreTrends}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 transition flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyanAccent-400" />
              <span>Explore Skill Trends</span>
            </button>
          </div>

          {/* Quick Credential Verification Search Bar */}
          <div className="mt-10 max-w-md mx-auto p-2 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Verify Credential ID (e.g. CRED-2026-F9A2-881B)"
              readOnly
              onClick={onOpenVerification}
              className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-full cursor-pointer"
            />
            <button
              onClick={onOpenVerification}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyanAccent-300 border border-slate-700 transition flex-shrink-0"
            >
              Verify
            </button>
          </div>

          {/* Dashboard Interactive Preview Component */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl p-1 bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/20 shadow-2xl">
            <div className="bg-navy-900/95 rounded-[15px] p-5 sm:p-7 border border-slate-800/80 text-left">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">skillpulse.platform/learner/alex-vance</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Market Engine Connected</span>
                </div>
              </div>

              {/* Grid Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Demand Analytics Mock */}
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-200">High-Demand Skill Index</span>
                    <TrendingUp className="w-4 h-4 text-cyanAccent-400" />
                  </div>
                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">React 18 & State</span>
                        <span className="text-cyanAccent-400 font-bold">96%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-500 to-cyanAccent-400 h-full w-[96%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">TypeScript Strict Mode</span>
                        <span className="text-cyanAccent-400 font-bold">95%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-500 to-cyanAccent-400 h-full w-[95%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-300">Docker Containerization</span>
                        <span className="text-cyanAccent-400 font-bold">93%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-500 to-cyanAccent-400 h-full w-[93%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill-Gap Score Mock */}
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-200">Role Match: Full Stack Dev</span>
                    <BarChart3 className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-brand-500"
                          strokeDasharray="88, 100"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="text-xl font-extrabold text-white">88%</span>
                        <span className="block text-[9px] text-slate-400 uppercase font-semibold">Match</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 text-center">
                    <span className="text-emerald-400 font-semibold">4 Strong Skills</span> • <span className="text-amber-400 font-semibold">2 Gaps Identified</span>
                  </div>
                </div>

                {/* Micro-Credential Mock */}
                <div className="bg-gradient-to-br from-brand-950/70 to-slate-950/90 border border-brand-500/30 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
                        Verified Credential
                      </span>
                      <Award className="w-4 h-4 text-amber-400" />
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">Modern Full-Stack Cloud Engineering</h5>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      4 Modules Completed • Score: 100% • ID: CRED-2026-F9A2-881B
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Status: Authentic</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Registry Validated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Feature Cards Section */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyanAccent-400 mb-2">
              Integrated Architectural Pipeline
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              End-to-End Competency Architecture
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              Connecting live job-market labor intelligence directly with adaptive curriculum authoring and tamper-evident credential verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center mb-5 border border-brand-500/20 group-hover:scale-105 transition">
                <Compass className="w-6 h-6 text-brand-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Global Job-Market Intelligence</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Ingests job postings across global tech hubs to extract high-demand skills, emerging trends, and industry-specific hiring requirements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/20 group-hover:scale-105 transition">
                <FileSearch className="w-6 h-6 text-cyanAccent-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI Skill Extraction & Normalization</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Normalizes synonymous skill labels into canonical entries linked to internationally recognized taxonomies including ESCO and O*NET.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-5 border border-indigo-500/20 group-hover:scale-105 transition">
                <GitCompare className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Personalized Skill-Gap Analysis</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Benchmarks your current proficiency against employer standards. Highlights Strong Skills, Skills to Improve, and High-Priority Gaps with mathematical scoring.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/20 group-hover:scale-105 transition">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Automated Curriculum Generation</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Generates modular micro-credentials containing ordered modules, practical exercises, mini-projects, and duration estimates powered by AI with safe fallback.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20 group-hover:scale-105 transition">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Competency-Based Assessments</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Validates demonstrated learning through timed, scenario-driven multiple-choice assessments with automatic server-side grading and answer rationale.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 hover:border-brand-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/20 group-hover:scale-105 transition">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Verifiable Digital Credentials</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Issues cryptographic SHA-256 digital certificates with unique credential IDs, downloadable PDF previews, and instant public verification URLs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step How It Works Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">
              Learner Journey
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              How SkillPulse Works in 4 Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <span className="text-3xl font-black text-slate-700 block mb-3">01</span>
              <h4 className="text-base font-bold text-white mb-1.5">Pick Target Career Track</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select from Full Stack Developer, AI Engineer, Cloud DevOps, or Data Analyst to benchmark against global hiring requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <span className="text-3xl font-black text-slate-700 block mb-3">02</span>
              <h4 className="text-base font-bold text-white mb-1.5">Identify Skill Gaps</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Input your current skills. The engine computes a transparent match percentage and separates strong skills from high-priority gaps.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <span className="text-3xl font-black text-slate-700 block mb-3">03</span>
              <h4 className="text-base font-bold text-white mb-1.5">Generate Micro-Curriculum</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI synthesizes a personalized learning path with topics, exercises, and mini-projects specifically targeting your missing competencies.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative">
              <span className="text-3xl font-black text-brand-500/60 block mb-3">04</span>
              <h4 className="text-base font-bold text-white mb-1.5">Pass Exam & Earn Credential</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete modules, pass the competency exam, and unlock an authentic digital micro-credential with unique ID and verification link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview & Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-cyanAccent-400" />
                <span className="text-base font-bold text-white">SkillPulse AI Platform</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Micro-Credential Curriculum Generation Platform Driven by Real-Time Global Job Market Skill Demands.
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span>React.js + Vite</span>
                <span>•</span>
                <span>Node.js Express</span>
                <span>•</span>
                <span>MongoDB Mongoose</span>
                <span>•</span>
                <span>JWT Security</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 text-sm">Navigation</h5>
              <ul className="space-y-2">
                <li><button onClick={() => onOpenAuth('login')} className="hover:text-white transition">Sign In</button></li>
                <li><button onClick={() => onOpenAuth('register')} className="hover:text-white transition">Register Account</button></li>
                <li><button onClick={onExploreTrends} className="hover:text-white transition">Market Skill Analytics</button></li>
                <li><button onClick={onOpenVerification} className="hover:text-white transition">Verify Digital Credential</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 text-sm">Transparency Notice</h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                This platform issues its own verifiable digital micro-credentials recorded in an internal registry. It is designed for demonstration, portfolio evaluation, and mini-project assessment.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
            <p>© 2026 SkillPulse Micro-Credential Platform. Built for College Project Review & Portfolio.</p>
            <p className="mt-2 sm:mt-0">All sample job data formatted for taxonomy compliance (ESCO & O*NET).</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
