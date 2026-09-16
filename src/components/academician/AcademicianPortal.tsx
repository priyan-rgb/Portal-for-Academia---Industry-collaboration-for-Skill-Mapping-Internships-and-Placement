import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AcademicianEngagement } from '../../types';
import {
  BookOpen,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  Award,
  Filter,
  DollarSign,
  MapPin,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AcademicianPortal: React.FC = () => {
  const { academicEngagements, toggleEngagementInterest, currentUser } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Industrial Training',
    'Faculty Development Program',
    'Consultancy Opportunity',
    'Research Collaboration',
    'Guest Lecture Invite',
  ];

  const filteredEngagements = academicEngagements.filter(
    (eng) => activeCategory === 'All' || eng.category === activeCategory
  );

  const myEngagements = academicEngagements.filter(
    (eng) => eng.status === 'Interested' || eng.status === 'Confirmed'
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <BookOpen className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Academician & Faculty Industry Engagement Portal
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Faculty Development & Grants
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Empowering professors and researchers with corporate sabbaticals, research grants, consultancy, and keynote invitations.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700">
          Faculty Lead: <strong className="text-slate-900">{currentUser.name}</strong>
        </div>
      </div>

      {/* "My Applications / Engagements" Summary Strip */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 rounded-2xl p-6 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-200">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>My Active Engagements & Industry Grants ({myEngagements.length})</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Track accepted industry immersions, consultancy retainers, and applied programs.
            </p>
          </div>
          <span className="text-[11px] font-mono text-teal-300 bg-teal-900/50 border border-teal-500/30 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            ● Synchronized with Dean Directorate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {myEngagements.map((eng) => (
            <div
              key={eng.id}
              className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-white">{eng.title}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    eng.status === 'Confirmed'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}
                >
                  {eng.status === 'Confirmed' ? 'Confirmed Cohort' : 'Expression Submitted'}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-2">
                <span>{eng.hostOrganization}</span>
                <span>•</span>
                <span className="text-teal-300 font-mono font-semibold">{eng.stipendOrGrant}</span>
              </div>
            </div>
          ))}
          {myEngagements.length === 0 && (
            <div className="p-4 text-center text-slate-400 text-xs border border-white/10 rounded-xl">
              No engagements selected yet. Express interest below to register!
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Browse by Program Type:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEngagements.map((eng) => {
            const isInterested = eng.status === 'Interested' || eng.status === 'Confirmed';

            return (
              <div
                key={eng.id}
                className="p-5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {eng.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{eng.deadline}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {eng.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {eng.description}
                  </p>

                  <div className="space-y-1 pt-1 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{eng.hostOrganization}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{eng.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-mono text-teal-800 font-bold">{eng.stipendOrGrant}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-200">
                    <strong className="text-slate-800">Eligibility:</strong> {eng.eligibility}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Duration: {eng.duration}
                  </span>

                  <button
                    id={`btn-engagement-${eng.id}`}
                    onClick={() => toggleEngagementInterest(eng.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                      isInterested
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                    }`}
                  >
                    {isInterested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{eng.status === 'Confirmed' ? 'Confirmed' : 'Interest Expressed'}</span>
                      </>
                    ) : (
                      <>
                        <span>Express Interest</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
