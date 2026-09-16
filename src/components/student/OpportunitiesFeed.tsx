import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Opportunity } from '../../types';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Info,
  DollarSign,
  Building,
} from 'lucide-react';

export const OpportunitiesFeed: React.FC = () => {
  const { opportunities, applyToOpportunity, applications, calculateCompatibility, setActiveNavTab } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOppForWhy, setSelectedOppForWhy] = useState<Opportunity | null>(null);

  // Set of already applied opportunity IDs
  const appliedOppIds = new Set(applications.map((a) => a.opportunityId));

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesFilter = filterType === 'all' || opp.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60">
              <Briefcase className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Curated Industry Opportunities & Placement Feed
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              AI Match Scored
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time algorithmic compatibility matching against your verified skill profile.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === 'all' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({opportunities.length})
            </button>
            <button
              onClick={() => setFilterType('internship')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === 'internship' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setFilterType('full-time')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === 'full-time' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full-Time
            </button>
            <button
              onClick={() => setFilterType('live project')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterType === 'live project' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Live Projects
            </button>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by role, company, or required skill (e.g., Python, Cloud)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          Showing {filteredOpportunities.length} opportunities
        </div>
      </div>

      {/* Opportunities List */}
      <div className="p-6 space-y-4">
        {filteredOpportunities.map((opp) => {
          const compat = calculateCompatibility(opp);
          const isApplied = appliedOppIds.has(opp.id);

          const getScoreColor = (score: number) => {
            if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
            if (score >= 65) return 'text-teal-700 bg-teal-50 border-teal-200';
            return 'text-amber-700 bg-amber-50 border-amber-200';
          };

          return (
            <div
              key={opp.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all bg-white hover:shadow-xs space-y-4"
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${opp.companyLogoBg} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}
                  >
                    {opp.company.substring(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-slate-900">{opp.title}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {opp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span className="font-semibold text-slate-800">{opp.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {opp.location}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-teal-700 font-semibold">{opp.stipend}</span>
                    </div>
                  </div>
                </div>

                {/* Compatibility Score Tag */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 bg-slate-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
                  <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
                    AI Profile Compatibility
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg border ${getScoreColor(
                        compat.score
                      )}`}
                    >
                      <Sparkles className="w-3 h-3" />
                      {compat.score}% Match
                    </span>

                    <button
                      id={`btn-why-score-${opp.id}`}
                      onClick={() => setSelectedOppForWhy(selectedOppForWhy?.id === opp.id ? null : opp)}
                      className="text-[11px] text-teal-700 hover:text-teal-800 underline underline-offset-2 font-medium"
                    >
                      Why this score?
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {opp.description}
              </p>

              {/* Required Skills Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-500">Required Skills:</span>
                {opp.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Explanatory Dropdown ("Why this score?") */}
              {selectedOppForWhy?.id === opp.id && (
                <div className="p-4 rounded-xl bg-slate-50 border border-teal-200 text-xs space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-1.5">
                    <span className="flex items-center gap-1.5 text-teal-800">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      Compatibility Intelligence Breakdown
                    </span>
                    <span className="font-mono text-teal-700">{compat.score}% Overall</span>
                  </div>

                  <p className="text-slate-600 leading-relaxed">{compat.explanation}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-lg bg-white border border-emerald-200">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        Matched Competencies ({compat.matchedSkills.length})
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-700 font-mono">
                        {compat.matchedSkills.length > 0 ? (
                          compat.matchedSkills.map((m) => (
                            <div key={m} className="flex items-center gap-1 text-emerald-700">
                              <span>✓</span> <span>{m}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-400 font-sans">No full benchmark matches yet</span>
                        )}
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-white border border-amber-200">
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1">
                        Competencies to Strengthen ({compat.missingSkills.length})
                      </div>
                      <div className="space-y-0.5 text-[11px] text-slate-700 font-mono">
                        {compat.missingSkills.length > 0 ? (
                          compat.missingSkills.map((m) => (
                            <div key={m} className="flex items-center gap-1 text-amber-700">
                              <span>△</span> <span>{m}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-emerald-600 font-sans">All competencies meet criteria!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-4 text-slate-500">
                  <span>Applicants: <strong className="text-slate-800 font-mono">{opp.applicantCount}</strong></span>
                  <span>•</span>
                  <span>Deadline: <strong className="text-slate-800">{opp.deadline}</strong></span>
                  <span>•</span>
                  <span className="truncate max-w-xs">{opp.eligibility}</span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {isApplied ? (
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 text-teal-800 font-bold border border-teal-200">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>Applied (Under Review)</span>
                    </div>
                  ) : (
                    <button
                      id={`btn-apply-opp-${opp.id}`}
                      onClick={() => applyToOpportunity(opp.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Apply with Skill Passport</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
