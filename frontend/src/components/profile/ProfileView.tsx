import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  UserCheck,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Briefcase,
  MapPin,
  Target,
  Sparkles,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, profile, updateProfileState } = useAuth();
  const [targetCareer, setTargetCareer] = useState(profile?.targetCareer || 'Full Stack Developer');
  const [preferredLocation, setPreferredLocation] = useState(profile?.preferredLocation || 'Remote Global');
  const [learningGoals, setLearningGoals] = useState(
    profile?.learningGoals || 'Master production-ready cloud architectures and earn verified credentials.'
  );
  const [skills, setSkills] = useState<any[]>(profile?.currentSkills || []);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setTargetRoleSafe(profile.targetCareer);
      setPreferredLocation(profile.preferredLocation || 'Remote Global');
      setLearningGoals(profile.learningGoals || '');
      setSkills(profile.currentSkills || []);
    }
  }, [profile]);

  const setTargetRoleSafe = (role: string) => {
    if (role) setTargetCareer(role);
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), proficiency: newSkillProficiency }]);
    setNewSkillName('');
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await api.updateProfile({
        targetCareer,
        preferredLocation,
        learningGoals,
        currentSkills: skills,
      });

      if (res.success && res.profile) {
        updateProfileState(res.profile);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err: any) {
      alert(err.message || 'Profile update failed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Learner Identity & Career Track</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Learner Profile</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Update your target career track, geographic preferences, and current skill baseline.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile Synchronized!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Info */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Account Credentials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                readOnly
                value={user?.name || ''}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                readOnly
                value={user?.email || ''}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Career & Location Preferences */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Career Objectives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-400" />
                <span>Target Career Track</span>
              </label>
              <select
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand-500"
              >
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="AI Engineer">AI Engineer (LLM & Generative Systems)</option>
                <option value="Cloud DevOps Engineer">Cloud DevOps Engineer</option>
                <option value="Data Analyst">Data Analyst & Analytics Engineer</option>
                <option value="Backend Systems Architect">Backend Systems Architect</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyanAccent-400" />
                <span>Preferred Location</span>
              </label>
              <select
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-white outline-none focus:border-brand-500"
              >
                <option value="Remote Global">Remote Global</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia-Pacific">Asia-Pacific</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personal Learning Goals</span>
            </label>
            <textarea
              rows={3}
              value={learningGoals}
              onChange={(e) => setLearningGoals(e.target.value)}
              placeholder="Describe your learning milestones, projects, or certification targets..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-brand-500 font-mono"
            />
          </div>
        </div>

        {/* Demonstrated Skills Baseline */}
        <div className="p-6 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Demonstrated Skills ({skills.length})
            </h3>
          </div>

          {/* Add Skill Row */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. React, Docker, Python)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-brand-500"
            />
            <select
              value={newSkillProficiency}
              onChange={(e) => setNewSkillProficiency(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Current Skills List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="block text-[10px] text-cyanAccent-400 font-semibold">{skill.proficiency}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(idx)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Updating Profile...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
