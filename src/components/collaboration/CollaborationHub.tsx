import React from 'react';
import { useApp } from '../../context/AppContext';
import { CollaborationInitiative } from '../../types';
import {
  Network,
  Users,
  Flame,
  Calendar,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building,
  Tag,
} from 'lucide-react';

export const CollaborationHub: React.FC = () => {
  const { collaborationInitiatives, toggleRegisterInitiative, currentUser } = useApp();

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Hackathon':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Live Industry Project':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Mentorship Program':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Innovation Challenge':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Network className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Academia–Industry Joint Collaboration Hub
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Co-Innovation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Bridging corporate engineering squads with student talent and faculty researchers through hackathons, sponsored projects, and masterclasses.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl font-mono">
          <span>Active Initiatives: <strong className="text-slate-900">{collaborationInitiatives.length}</strong></span>
          <span>•</span>
          <span>Registered: <strong className="text-teal-700">{collaborationInitiatives.filter(c => c.registered).length}</strong></span>
        </div>
      </div>

      {/* Grid of Collaboration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {collaborationInitiatives.map((item) => {
          const isRegistered = item.registered;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all flex flex-col justify-between space-y-4 ${
                isRegistered
                  ? 'bg-teal-50/40 border-teal-300/80 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getTypeBadge(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{item.participantsCount}</strong> / {item.maxParticipants} Enrolled
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Organizer: <strong className="text-slate-800">{item.organizer}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Timeline: <strong className="text-slate-800 font-mono">{item.timeline}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="font-semibold text-teal-800">{item.prizeOrBenefit}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Difficulty: {item.difficulty}
                </span>

                <button
                  id={`btn-collab-register-${item.id}`}
                  onClick={() => toggleRegisterInitiative(item.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                    isRegistered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-2xs'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered & Joined</span>
                    </>
                  ) : (
                    <>
                      <span>Register & Participate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
