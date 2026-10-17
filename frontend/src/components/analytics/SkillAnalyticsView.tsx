import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Skill } from '../../types';
import {
  Compass,
  TrendingUp,
  Search,
  Filter,
  Layers,
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  Globe,
  Briefcase,
  AlertCircle,
  HelpCircle,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const SkillAnalyticsView: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTrend, setSelectedTrend] = useState('All');
  const [activeTab, setActiveTab] = useState<'analytics' | 'extractor'>('analytics');
  
  // Job Extractor State
  const [jobText, setJobText] = useState('');
  const [extractionResult, setExtractionResult] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [analRes, skillsRes] = await Promise.all([
          api.getSkillAnalytics(),
          api.getSkills(),
        ]);
        if (analRes.success) setAnalytics(analRes);
        if (skillsRes.skills) setAllSkills(skillsRes.skills);
      } catch (err) {
        console.error('Failed to load skill analytics:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExtract = async () => {
    if (!jobText.trim()) return;
    setIsExtracting(true);
    try {
      const res = await api.extractSkills(jobText);
      if (res.success) {
        setExtractionResult(res.extraction);
      }
    } catch (err: any) {
      alert(err.message || 'Skill extraction failed.');
    } finally {
      setIsExtracting(false);
    }
  };

  const loadSampleJob = (role: string) => {
    if (role === 'stripe') {
      setJobText(`Stripe is looking for a Senior Full Stack Engineer.
Must have 5+ years building scalable web applications with React, TypeScript, and Node.js.
Must be skilled in PostgreSQL, MongoDB, Docker containerization, and AWS microservices.
Experience with CI/CD pipelines, Unit & Integration testing, and Agile / Scrum collaboration.`);
    } else if (role === 'ai') {
      setJobText(`Anthropic is seeking an AI Systems Engineer.
Requirements: 3+ years experience with Python, Machine Learning, and LLM Integration.
Demonstrated ability building RAG pipelines, Vector Databases (Pinecone/ChromaDB), and Prompt Engineering.
Experience with FastAPI, Docker, and distributed systems.`);
    }
  };

  const filteredSkills = allSkills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.taxonomyCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesTrend = selectedTrend === 'All' || s.trend === selectedTrend;
    return matchesSearch && matchesCat && matchesTrend;
  });

  const chartData = (analytics?.topInDemand || []).map((s: any) => ({
    name: s.name,
    demand: s.marketDemandScore,
    frequency: s.demandFrequencyPercent,
  }));

  const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#06b6d4', '#0891b2', '#0284c7', '#3b82f6'];

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyanAccent-500/10 border border-cyanAccent-500/20 text-xs font-semibold text-cyanAccent-400 mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Labor Market Intelligence Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Global Job-Market Skill Demands
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Derived from global job postings and standardized ESCO/O*NET labor frameworks.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'analytics'
                ? 'bg-brand-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Market Analytics & Directory
          </button>
          <button
            onClick={() => setActiveTab('extractor')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'extractor'
                ? 'bg-brand-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyanAccent-300" />
            AI Skill Extractor
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <div className="space-y-8">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Demand Bar Chart */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Top 10 In-Demand Engineering Skills</h3>
                  <p className="text-xs text-slate-400">Employer request frequency score (0 - 100)</p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Global Index
                </span>
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis
                      dataKey="name"
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0c1222',
                        borderColor: '#1e293b',
                        borderRadius: '12px',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="demand" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emerging & High Growth Skills */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyanAccent-400" />
                  <h3 className="text-base font-bold text-white">Emerging Trajectory</h3>
                </div>
                <span className="text-[10px] text-cyanAccent-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Highest Growth
                </span>
              </div>

              <div className="space-y-3">
                {(analytics?.emergingSkills || []).map((skill: any) => (
                  <div key={skill._id || skill.name} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{skill.name}</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">+{skill.growthRatePercent}% YoY</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{skill.description}</p>
                    <span className="inline-block mt-1 text-[9px] font-mono text-slate-500">{skill.taxonomyCode}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Industry & Geographic Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Industry Demand */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Industry-Specific Skill Demands</h3>
              </div>
              <div className="space-y-3">
                {(analytics?.industryBreakdown || []).map((ind: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-white">{ind.industry}</h4>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {ind.highDemandSkills.map((s: string, sIdx: number) => (
                          <span key={sIdx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyanAccent-400 self-start sm:self-center">
                      Index: {ind.demandIndex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Geographic Trends & Remote Distribution</h3>
              </div>
              <div className="space-y-3">
                {(analytics?.geographicDemand || []).map((geo: any, i: number) => (
                  <div key={i} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{geo.region}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Top: {geo.topRoles.join(' • ')}</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                      {geo.remoteShare} Remote
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Searchable Skill Directory Table */}
          <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">Standardized Skills Taxonomy</h3>
                <p className="text-xs text-slate-400">Searchable catalogue aligned with ESCO / O*NET classifications</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search skills, taxonomy..."
                    className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500 transition w-44 sm:w-56"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Technical">Technical</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Soft skills">Soft Skills</option>
                </select>

                <select
                  value={selectedTrend}
                  onChange={(e) => setSelectedTrend(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="All">All Trends</option>
                  <option value="high-demand">High Demand</option>
                  <option value="emerging">Emerging</option>
                  <option value="stable">Stable</option>
                  <option value="declining">Declining</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Skill Name</th>
                    <th className="py-3 px-3">Taxonomy Code</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Market Demand</th>
                    <th className="py-3 px-3">Trend Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSkills.map((skill) => (
                    <tr key={skill._id || skill.name} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3 font-bold text-white">{skill.name}</td>
                      <td className="py-3 px-3 font-mono text-slate-400">{skill.taxonomyCode}</td>
                      <td className="py-3 px-3 text-slate-300">{skill.category}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyanAccent-400">{skill.marketDemandScore}%</span>
                          <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-brand-500 h-full rounded-full"
                              style={{ width: `${skill.marketDemandScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            skill.trend === 'high-demand'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : skill.trend === 'emerging'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : skill.trend === 'declining'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {skill.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* AI Skill Extractor Tab */
        <div className="p-6 sm:p-8 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyanAccent-400" />
                Paste or Upload Job Description for Skill Extraction
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                The NLP engine parses technical skills, credentials, and experience levels, normalizing synonyms into standard taxonomy codes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Load Sample:</span>
              <button
                type="button"
                onClick={() => loadSampleJob('stripe')}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              >
                Stripe (Full Stack)
              </button>
              <button
                type="button"
                onClick={() => loadSampleJob('ai')}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              >
                Anthropic (AI Systems)
              </button>
            </div>
          </div>

          <textarea
            rows={7}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste raw job description here (e.g. responsibilities, required qualifications, tech stack)..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-200 placeholder-slate-500 outline-none focus:border-brand-500 transition leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleExtract}
              disabled={isExtracting || !jobText.trim()}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition disabled:opacity-50 flex items-center gap-2"
            >
              {isExtracting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Extracting Skills...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Extract & Normalize Skills</span>
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {extractionResult && (
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Extracted {extractionResult.totalExtracted} Standardized Skills
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  Experience: <strong className="text-white">{extractionResult.experienceRequirement}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Technical Skills */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-brand-300 mb-2 uppercase">Technical Skills</h5>
                  <div className="space-y-1.5">
                    {extractionResult.technicalSkills?.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-850">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{s.taxonomyCode}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cloud & DevOps */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-cyan-300 mb-2 uppercase">Cloud & DevOps</h5>
                  <div className="space-y-1.5">
                    {extractionResult.cloudSkills?.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-850">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{s.taxonomyCode}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI & ML */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-purple-300 mb-2 uppercase">AI & Data</h5>
                  <div className="space-y-1.5">
                    {extractionResult.aiSkills?.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-850">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{s.taxonomyCode}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills & Qualifications */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-bold text-emerald-300 mb-2 uppercase">Soft Skills & Credentials</h5>
                  <div className="space-y-1.5">
                    {extractionResult.softSkills?.map((s: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-850">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="text-[10px] text-emerald-400">Required</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
