import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Compass,
  GitCompare,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Award,
  ShieldCheck,
  UserCheck,
  Building2,
  LogOut,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const { user, profile, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Skill Analytics', icon: Compass, badge: 'Live Trends' },
    { id: 'gap-analyzer', label: 'Skill-Gap Analyzer', icon: GitCompare },
    { id: 'curriculum-generator', label: 'Curriculum Generator', icon: Sparkles, badge: 'AI' },
    { id: 'my-learning', label: 'My Learning & Modules', icon: BookOpen },
    { id: 'assessments', label: 'Competency Exams', icon: CheckCircle2 },
    { id: 'credentials', label: 'My Credentials', icon: Award },
    { id: 'verification', label: 'Verify Credential', icon: ShieldCheck },
    { id: 'profile', label: 'Learner Profile', icon: UserCheck },
  ];

  if (user?.role === 'admin' || user?.role === 'industry_reviewer') {
    navItems.push({
      id: 'admin',
      label: 'Admin & Industry Portal',
      icon: Building2,
      badge: user.role === 'admin' ? 'Admin' : 'Reviewer',
    });
  }

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-navy-950 flex flex-col flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16 select-none">
      {/* Learner Info Badge */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 p-0.5 shadow-md flex items-center justify-center font-bold text-white text-base">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-100 truncate">{user?.name}</h4>
            <p className="text-xs text-cyanAccent-400 font-medium truncate">
              {profile?.targetCareer || 'Full Stack Developer'}
            </p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-700/50">
          <span className="flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Match Readiness
          </span>
          <span className="font-bold text-white">{profile?.overallMatchScore || 68}%</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyanAccent-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`w-3.5 h-3.5 transition ${
                    isActive ? 'opacity-100 translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/30">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
