import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Route,
  Briefcase,
  FileCheck,
  Award,
  Network,
  Users,
  PlusCircle,
  BookOpen,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const { currentRole, opportunities, applications, academicEngagements, collaborationInitiatives, adminAnalytics } = useApp();

  const getNavItems = () => {
    switch (currentRole) {
      case 'student':
        return [
          { id: 'overview', label: 'Skill Profile & Metrics', icon: LayoutDashboard },
          { id: 'gap-analysis', label: 'Skill Gap Engine', icon: Compass, badge: 'Explainable AI' },
          { id: 'roadmap', label: 'Learning Roadmap', icon: Route, badge: 'Live Upgrades' },
          { id: 'opportunities', label: 'Opportunities Feed', icon: Briefcase, count: opportunities.length },
          { id: 'applications', label: 'Application Tracker', icon: FileCheck, count: applications.length },
          { id: 'passport', label: 'Digital Skill Passport', icon: Award, badge: 'Verified' },
          { id: 'collaboration', label: 'Collaboration Hub', icon: Network, count: collaborationInitiatives.length },
        ];
      case 'recruiter':
        return [
          { id: 'candidate-ranking', label: 'Candidate Ranking', icon: Users, badge: 'AI Match' },
          { id: 'posted-jobs', label: 'Posted Opportunities', icon: Briefcase, count: opportunities.length },
          { id: 'post-opportunity', label: 'Post New Opportunity', icon: PlusCircle },
          { id: 'collaboration', label: 'Industry Collaboration', icon: Network, count: collaborationInitiatives.length },
        ];
      case 'academician':
        return [
          { id: 'academician-portal', label: 'Faculty Programs & Grants', icon: BookOpen, count: academicEngagements.length },
          { id: 'my-engagements', label: 'My Engagements', icon: CheckCircle2 },
          { id: 'collaboration', label: 'Collaboration Hub', icon: Network, count: collaborationInitiatives.length },
        ];
      case 'admin':
        return [
          { id: 'admin-overview', label: 'Institution Analytics', icon: BarChart3 },
          { id: 'curriculum-insights', label: 'Curriculum Interventions', icon: Lightbulb, badge: 'Actionable' },
          { id: 'skill-matrix', label: 'Skill Demand Matrix', icon: TrendingUp },
          { id: 'collaboration', label: 'Academia Initiatives', icon: Network, count: collaborationInitiatives.length },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between py-5 px-3 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        
        {/* Role Context Card */}
        <div className="px-3 py-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Active Workspace
          </div>
          <div className="text-xs font-semibold text-slate-900 capitalize flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            {currentRole === 'student'
              ? 'Student Portal'
              : currentRole === 'recruiter'
              ? 'Industry & Talent Hub'
              : currentRole === 'academician'
              ? 'Academician Network'
              : 'Institution Governance'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            {currentRole === 'student'
              ? 'Assessing skills, bridging gaps & discovering matched roles.'
              : currentRole === 'recruiter'
              ? 'Reviewing candidates with explainable AI compatibility.'
              : currentRole === 'academician'
              ? 'FDPs, industrial training, consultancy & research.'
              : 'Monitoring placement readiness & curriculum alignment.'}
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Navigation Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200/70 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-teal-200/70 text-teal-800 font-bold'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Persistent Bottom Info Card */}
      <div className="mt-8 pt-4 border-t border-slate-100 px-2 space-y-3">
        <div className="p-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-xs shadow-sm">
          <div className="flex items-center gap-1.5 font-bold text-teal-300 text-[11px] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Matching Engine</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            All compatibility & gap scores use open, explainable weighted metrics with zero black-box bias.
          </p>
          <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-700/80 pt-1.5 font-mono">
            <span>Formula: v2.4-OpenAudit</span>
            <span className="text-emerald-400">● Live Sync</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 text-center font-mono">
          SkillBridge AI • v1.0
        </p>
      </div>
    </aside>
  );
};
