/**
 * SkillBridge AI — Intelligent Academia–Industry Collaboration and Employability Platform
 * Platform with explainable AI gap analysis, recruiter matching, and digital skill passports.
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StudentDashboard } from './components/student/StudentDashboard';
import { RecruiterDashboard } from './components/recruiter/RecruiterDashboard';
import { AcademicianPortal } from './components/academician/AcademicianPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CollaborationHub } from './components/collaboration/CollaborationHub';
import { AICareerAssistant } from './components/student/AICareerAssistant';
import { PostOpportunityModal } from './components/recruiter/PostOpportunityModal';
import {
  Menu,
  X,
  Sparkles,
  Layers,
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
} from 'lucide-react';

const DashboardContainer: React.FC = () => {
  const { currentRole, activeNavTab, setActiveNavTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQuickPostOpen, setIsQuickPostOpen] = useState(false);

  // Render the current view based on role and active navigation tab
  const renderRoleView = () => {
    // If Collaboration Hub tab is chosen across any role
    if (activeNavTab === 'collaboration') {
      return <CollaborationHub />;
    }

    switch (currentRole) {
      case 'student':
        return (
          <StudentDashboard
            activeTab={activeNavTab}
            onTabChange={(tab) => {
              setActiveNavTab(tab);
              setMobileMenuOpen(false);
            }}
          />
        );

      case 'recruiter':
        if (activeNavTab === 'post-opportunity') {
          return (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto border border-teal-200">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Publish New Campus Recruitment Opportunity
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Post internships, full-time engineering roles, or live student industry projects with AI skill benchmark matching.
                </p>
                <button
                  id="btn-trigger-quick-post-modal"
                  onClick={() => setIsQuickPostOpen(true)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm cursor-pointer"
                >
                  Open Opportunity Editor
                </button>
              </div>
              <RecruiterDashboard />
            </div>
          );
        }
        return <RecruiterDashboard />;

      case 'academician':
        return <AcademicianPortal />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return <StudentDashboard activeTab={activeNavTab} onTabChange={setActiveNavTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Navigation Bar with persistent role switcher */}
      <Header />

      {/* Mobile Drawer Toggle Sub-bar */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{mobileMenuOpen ? 'Close Menu' : 'Workspace Menu'}</span>
        </button>

        <span className="text-xs font-mono text-slate-500 capitalize">
          Role: <strong className="text-teal-700 font-bold">{currentRole}</strong>
        </span>
      </div>

      {/* Main Workspace Layout (Persistent Sidebar + Scrollable Main Content) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            currentTab={activeNavTab}
            onTabChange={(tab) => setActiveNavTab(tab)}
          />
        </div>

        {/* Mobile Slide-over Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full shadow-2xl overflow-y-auto">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">SkillBridge Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar
                currentTab={activeNavTab}
                onTabChange={(tab) => {
                  setActiveNavTab(tab);
                  setMobileMenuOpen(false);
                }}
              />
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {renderRoleView()}
        </main>
      </div>

      {/* Student AI Career Assistant Drawer */}
      <AICareerAssistant />

      {/* Recruiter Quick Post Modal */}
      <PostOpportunityModal
        isOpen={isQuickPostOpen}
        onClose={() => setIsQuickPostOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContainer />
    </AppProvider>
  );
}
