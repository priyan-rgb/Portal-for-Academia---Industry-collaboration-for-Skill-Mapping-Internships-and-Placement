import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
  Bot,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRole, setRole, currentUser, isChatOpen, setIsChatOpen, studentSkills } = useApp();

  const roles: { id: UserRole; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'student', label: 'Student', icon: GraduationCap, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { id: 'recruiter', label: 'Industry / Recruiter', icon: Briefcase, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'academician', label: 'Academician', icon: BookOpen, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'admin', label: 'Institution Admin', icon: Building2, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  SkillBridge<span className="text-teal-600">.AI</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Academia–Industry Employability & Intelligence
              </p>
            </div>
          </div>

          {/* Role Switcher Pills (Centered) */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 overflow-x-auto max-w-full">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 hidden lg:inline-block">
              Role:
            </span>
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  id={`role-selector-${r.id}`}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Header: AI Career Assistant toggle + User Profile Badge */}
          <div className="flex items-center gap-3 shrink-0">
            {currentRole === 'student' && (
              <button
                id="header-ai-career-assistant-btn"
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                  isChatOpen
                    ? 'bg-teal-600 text-white border-teal-700 shadow-sm'
                    : 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100/80'
                }`}
              >
                <Bot className="w-4 h-4 text-current animate-pulse" />
                <span className="hidden sm:inline">AI Career Assistant</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
              </button>
            )}

            {/* Profile Chip */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-teal-200 ring-2 ring-slate-100"
              />
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {currentRole === 'student'
                    ? 'NIT Student'
                    : currentRole === 'recruiter'
                    ? currentUser.company
                    : currentRole === 'academician'
                    ? 'Faculty Lead'
                    : 'Admin Directorate'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
