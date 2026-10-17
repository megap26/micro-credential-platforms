import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  Building2,
  Users,
  BookOpen,
  Award,
  CheckCircle2,
  Plus,
  Search,
  Star,
  Sparkles,
  FileText,
  BarChart3,
  TrendingUp,
} from 'lucide-react';

export const AdminPortalView: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [curriculaList, setCurriculaList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'stats' | 'jobs' | 'review'>('stats');
  
  // Add Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState('Enterprise SaaS');
  const [newDescription, setNewDescription] = useState('');
  const [isAddingJob, setIsAddingJob] = useState(false);

  // Industry Review Form State
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [reviewerOrg, setReviewerOrg] = useState('Global Cloud Talent Advisory Board');
  const [rating, setRating] = useState(5);
  const [relevanceScore, setRelevanceScore] = useState(95);
  const [feedback, setFeedback] = useState('Curriculum demonstrates outstanding fidelity to live employer tech stacks and strict architectural requirements.');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, jobsRes, currRes] = await Promise.all([
          api.getAdminStats().catch(() => ({ stats: null })),
          api.getJobPostings().catch(() => ({ postings: [] })),
          api.getUserCurricula().catch(() => ({ curricula: [] })),
        ]);

        if (statsRes.stats) setStats(statsRes.stats);
        if (jobsRes.postings) setJobPostings(jobsRes.postings);
        if (currRes.curricula) {
          setCurriculaList(currRes.curricula);
          if (currRes.curricula.length > 0) {
            setSelectedCurriculumId(currRes.curricula[0]._id);
          }
        }
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleAddJobPosting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim() || !newDescription.trim()) return;

    setIsAddingJob(true);
    try {
      const res = await api.addJobPosting({
        title: newTitle,
        company: newCompany,
        industry: newIndustry,
        rawDescription: newDescription,
      });

      if (res.success) {
        alert(`✅ Job posting added! Extracted ${res.extractedSkillsCount} standardized skills.`);
        setJobPostings([res.posting, ...jobPostings]);
        setNewTitle('');
        setNewCompany('');
        setNewDescription('');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to add job posting.');
    } finally {
      setIsAddingJob(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCurriculumId) return;

    setIsSubmittingReview(true);
    try {
      const res = await api.addReview(selectedCurriculumId, {
        reviewerOrganization: reviewerOrg,
        rating,
        relevanceScore,
        marketAlignmentFeedback: feedback,
        approvedStamp: true,
      });

      if (res.success) {
        setReviewSuccess(true);
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Role: {user?.role === 'admin' ? 'System Administrator' : 'Industry Reviewer'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Admin & Industry Governance Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Monitor platform-wide analytics, manage job market corpus, and submit industry curriculum endorsements.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'stats' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            System Metrics
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'jobs' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Job Postings ({jobPostings.length})
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'review' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Industry Review
          </button>
        </div>
      </div>

      {activeTab === 'stats' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
                <h3 className="text-2xl font-black text-white mt-1">{stats?.totalUsers || 3}</h3>
                <p className="text-[11px] text-emerald-400 mt-0.5">Active Learners & Admins</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center border border-brand-500/20">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curricula Generated</p>
                <h3 className="text-2xl font-black text-white mt-1">{stats?.totalCurricula || 1}</h3>
                <p className="text-[11px] text-cyanAccent-400 mt-0.5">AI Modular Pathways</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyanAccent-400 flex items-center justify-center border border-cyan-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assessment Pass Rate</p>
                <h3 className="text-2xl font-black text-white mt-1">{stats?.passRate || 100}%</h3>
                <p className="text-[11px] text-emerald-400 mt-0.5">Threshold: 75% Min</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Credentials Issued</p>
                <h3 className="text-2xl font-black text-white mt-1">{stats?.totalCredentials || 1}</h3>
                <p className="text-[11px] text-amber-400 mt-0.5">Registry Validated</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-6">
          {/* Add Job Posting Form */}
          <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyanAccent-400" />
              <span>Import New Job Description into Intelligence Corpus</span>
            </h3>

            <form onSubmit={handleAddJobPosting} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Lead Cloud Architect"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Snowflake Systems"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Industry</label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="AI Services">AI Services</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Raw Job Description Text (Engine will automatically extract skills & requirements)
                </label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Paste job posting details here..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isAddingJob}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-brand-600 hover:bg-brand-500 text-white shadow-md transition disabled:opacity-50"
                >
                  {isAddingJob ? 'Indexing Job Posting...' : 'Index & Extract Skills'}
                </button>
              </div>
            </form>
          </div>

          {/* List of Existing Job Postings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Indexed Market Postings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobPostings.map((job, idx) => (
                <div key={job._id || idx} className="p-4 bg-navy-900/60 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{job.title}</h4>
                    <span className="text-[10px] text-cyanAccent-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {job.industry}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{job.company} • {job.location}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {job.extractedSkills?.map((s: string, sIdx: number) => (
                      <span key={sIdx} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'review' && (
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span>Industry Advisory Curriculum Endorsement & Review</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Authorized industry reviewers audit curriculum content, verify market alignment, and provide advisory stamps.
            </p>
          </div>

          {reviewSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Industry endorsement recorded successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Select Curriculum to Review
                </label>
                <select
                  value={selectedCurriculumId}
                  onChange={(e) => setSelectedCurriculumId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  {curriculaList.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Reviewer Organization / Advisory Board
                </label>
                <input
                  type="text"
                  required
                  value={reviewerOrg}
                  onChange={(e) => setReviewerOrg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Star Rating (1 - 5 Stars): {rating} ★
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Market Relevance Score (0 - 100): {relevanceScore}%
                </label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={relevanceScore}
                  onChange={(e) => setRelevanceScore(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                Advisory Board Evaluation Feedback
              </label>
              <textarea
                rows={3}
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-brand-500 font-mono"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md hover:scale-105 transition disabled:opacity-50"
              >
                {isSubmittingReview ? 'Submitting Review...' : 'Stamp & Endorse Curriculum'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
