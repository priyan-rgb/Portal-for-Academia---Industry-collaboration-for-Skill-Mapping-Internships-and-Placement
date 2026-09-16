import React from 'react';
import { useApp } from '../../context/AppContext';
import { SkillProfileCard } from './SkillProfileCard';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { PersonalizedRoadmap } from './PersonalizedRoadmap';
import { OpportunitiesFeed } from './OpportunitiesFeed';
import { ApplicationTracker } from './ApplicationTracker';
import { DigitalSkillPassport } from './DigitalSkillPassport';
import { CollaborationHub } from '../collaboration/CollaborationHub';
import {
  Compass,
  Route,
  Briefcase,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileCheck,
} from 'lucide-react';

interface StudentDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { targetRole, skillGapResult, opportunities, applications } = useApp();

  // If specific sub-view is selected
  if (activeTab === 'gap-analysis') return <SkillGapAnalysis />;
  if (activeTab === 'roadmap') return <PersonalizedRoadmap />;
  if (activeTab === 'opportunities') return <OpportunitiesFeed />;
  if (activeTab === 'applications') return <ApplicationTracker />;
  if (activeTab === 'passport') return <DigitalSkillPassport />;
  if (activeTab === 'collaboration') return <CollaborationHub />;

  // Default 'overview' / main hub view
  return (
    <div className="space-y-6">
      {/* Target Role & Readiness Hero Ribbon */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 border border-teal-500/20">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30">
              Career Trajectory
            </span>
            <span className="text-xs text-slate-300">Target Role: {targetRole.name}</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">
            Employability Readiness Score: <span className="text-teal-300 font-mono">{skillGapResult.readinessScore}%</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI has analyzed your proctored skills against employer expectations. You have matched {skillGapResult.matchedSkills.length} of {targetRole.requiredSkills.length} core benchmarks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            id="btn-overview-to-gap-engine"
            onClick={() => onTabChange('gap-analysis')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-teal-300 hover:bg-teal-200 transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open Gap Engine</span>
          </button>
          <button
            id="btn-overview-to-passport"
            onClick={() => onTabChange('passport')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Digital Skill Passport</span>
          </button>
        </div>
      </div>

      {/* Primary Skill Profile Card (Radar & Metrics) */}
      <SkillProfileCard />

      {/* Two Column Grid: Gap Engine Snapshot & Personalized Roadmap Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Skill Gap Engine Preview (6 cols) */}
        <div className="lg:col-span-6">
          <SkillGapAnalysis />
        </div>

        {/* Right: Personalized Roadmap Preview (6 cols) */}
        <div className="lg:col-span-6">
          <PersonalizedRoadmap />
        </div>

      </div>

      {/* Opportunities Feed & Application Tracker */}
      <div className="space-y-6">
        <OpportunitiesFeed />
        <ApplicationTracker />
      </div>
    </div>
  );
};
