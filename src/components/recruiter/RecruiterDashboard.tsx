import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostOpportunityModal } from './PostOpportunityModal';
import { Candidate, Opportunity } from '../../types';
import {
  Users,
  Briefcase,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const {
    opportunities,
    candidates,
    selectedOpportunityIdForRanking,
    setSelectedOpportunityIdForRanking,
    applications,
    updateApplicationStatus,
    currentUser,
  } = useApp();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const selectedOpp =
    opportunities.find((o) => o.id === selectedOpportunityIdForRanking) || opportunities[0];

  const getCandidateCompatibility = (candidate: Candidate, opp: Opportunity) => {
    let scoreSum = 0;
    const matched: string[] = [];
    const missing: string[] = [];

    opp.requiredSkills.forEach((skillName) => {
      const candScore = candidate.skills[skillName] || 40;
      if (candScore >= 70) {
        matched.push(`${skillName} (${candScore}%)`);
        scoreSum += candScore;
      } else {
        missing.push(`${skillName} (${candScore}%)`);
        scoreSum += candScore * 0.7;
      }
    });

    const average = opp.requiredSkills.length > 0 ? Math.round(scoreSum / opp.requiredSkills.length) : 75;
    const finalScore = Math.max(45, Math.min(99, average));

    return {
      score: finalScore,
      matched,
      missing,
    };
  };

  const rankedCandidates = [...candidates]
    .map((cand) => {
      const compat = getCandidateCompatibility(cand, selectedOpp);
      const appRecord = applications.find(
        (a) => a.opportunityId === selectedOpp.id && a.studentId === cand.id
      );
      const currentStatus = appRecord ? appRecord.status : 'Applied';

      return {
        ...cand,
        compatScore: compat.score,
        matchedSkills: compat.matched,
        missingSkills: compat.missing,
        applicationStatus: currentStatus,
        applicationId: appRecord?.id,
      };
    })
    .sort((a, b) => b.compatScore - a.compatScore);

  const handleStatusChange = (
    candidate: (typeof rankedCandidates)[0],
    newStatus: 'Shortlisted' | 'Rejected' | 'Under Review'
  ) => {
    if (candidate.applicationId) {
      updateApplicationStatus(candidate.applicationId, newStatus);
    }
    setFeedbackToast(`Updated ${candidate.name}'s status to "${newStatus}". Syncing live across platform.`);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Briefcase className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Industry Recruiter Portal — {currentUser.company || 'CloudScale Technologies'}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Talent Partner
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Screen, rank and shortlist student applicants using explainable skill benchmark matching.
          </p>
        </div>

        <button
          id="btn-open-post-opportunity"
          onClick={() => setIsPostModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Opportunity</span>
        </button>
      </div>

      {/* Recruiter Notice & Disclaimer Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="font-bold text-slate-100 flex items-center gap-2">
              <span>Recruiter Autonomy Mandate</span>
              <span className="text-[10px] font-mono text-amber-400 font-semibold px-1.5 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">
                Ethical AI Standard
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              AI generates explainable compatibility rankings based purely on verified skill benchmarks and proctored coursework. <strong>All shortlist and rejection decisions remain strictly under recruiter human authority.</strong>
            </p>
          </div>
        </div>

        <div className="text-[11px] text-teal-300 font-mono shrink-0 pl-7 sm:pl-0">
          ● Live Candidate Pool: {candidates.length} Profiles
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackToast && (
        <div className="bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>{feedbackToast}</span>
          </div>
          <button
            onClick={() => setFeedbackToast(null)}
            className="text-teal-200 hover:text-white font-bold text-sm ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Grid: Posted Opportunities List & Selected Opportunity Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Active Posted Opportunities ({opportunities.length})
            </h4>
            <p className="text-xs text-slate-500">
              Select an opportunity below to view and rank candidate applicants.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Selected: <strong className="text-teal-700">{selectedOpp.title}</strong>
          </div>
        </div>

        {/* Horizontal Cards Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {opportunities.slice(0, 3).map((opp) => {
            const isSelected = opp.id === selectedOpp.id;
            return (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunityIdForRanking(opp.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs space-y-2 ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500 shadow-xs ring-2 ring-teal-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-900 leading-tight">
                    {opp.title}
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                    {opp.type}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                  <span>Applicants: <strong className="text-slate-800">{opp.applicantCount}</strong></span>
                  <span className="text-teal-700 font-semibold">{opp.stipend}</span>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {opp.requiredSkills.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-1.5 py-0.2 rounded bg-white text-slate-600 border border-slate-200"
                    >
                      {s.split(' ')[0]}
                    </span>
                  ))}
                  {opp.requiredSkills.length > 2 && (
                    <span className="text-[10px] text-slate-400">
                      +{opp.requiredSkills.length - 2}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Ranking Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <h4 className="text-base font-bold text-slate-900">
                Candidate Ranking: {selectedOpp.title}
              </h4>
              <span className="text-xs font-mono text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Sorted by AI Compatibility
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Candidate benchmark analysis against required competencies: {selectedOpp.requiredSkills.join(', ')}.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900 font-mono">{rankedCandidates.length}</strong> evaluated candidates
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Rank & Candidate</th>
                <th className="py-3 px-4">Institution & Dept</th>
                <th className="py-3 px-4">AI Compatibility</th>
                <th className="py-3 px-4">Matched vs Missing Skills</th>
                <th className="py-3 px-6 text-right">Recruiter Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rankedCandidates.map((candidate, idx) => {
                const isAlex = candidate.id === 'student-alex';
                const isShortlisted = candidate.applicationStatus === 'Shortlisted';
                const isRejected = candidate.applicationStatus === 'Rejected';

                return (
                  <tr
                    key={candidate.id}
                    className={`transition-colors ${
                      isAlex ? 'bg-teal-50/40 hover:bg-teal-50/60' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    {/* Rank & Candidate */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-slate-400 w-5">
                          #{idx + 1}
                        </span>
                        <img
                          src={candidate.avatar}
                          alt={candidate.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{candidate.name}</span>
                            {isAlex && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 font-bold">
                                Current Logged In Student
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            CGPA: <strong className="text-slate-800">{candidate.cgpa}</strong> • {candidate.year}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Institution */}
                    <td className="py-4 px-4 text-slate-700">
                      <div className="font-medium text-slate-900">{candidate.institution}</div>
                      <div className="text-[11px] text-slate-500">{candidate.department}</div>
                    </td>

                    {/* Compatibility */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                          <Sparkles className="w-3 h-3 text-teal-600" />
                          {candidate.compatScore}% Match
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-teal-600 rounded-full"
                            style={{ width: `${candidate.compatScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Matched vs Missing */}
                    <td className="py-4 px-4 max-w-sm">
                      <div className="space-y-1 text-[11px]">
                        {candidate.matchedSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1 text-emerald-800 font-mono">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">✓ Matched:</span>
                            {candidate.matchedSkills.slice(0, 2).map((m) => (
                              <span
                                key={m}
                                className="px-1.5 py-0.2 rounded bg-emerald-50 border border-emerald-200 text-[10px]"
                              >
                                {m.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                        )}
                        {candidate.missingSkills.length > 0 && (
                          <div className="flex flex-wrap gap-1 text-amber-800 font-mono">
                            <span className="text-[10px] font-bold text-amber-700 uppercase">△ Gap:</span>
                            {candidate.missingSkills.slice(0, 2).map((m) => (
                              <span
                                key={m}
                                className="px-1.5 py-0.2 rounded bg-amber-50 border border-amber-200 text-[10px]"
                              >
                                {m.split(' ')[0]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isShortlisted ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Shortlisted</span>
                          </span>
                        ) : isRejected ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Rejected</span>
                          </span>
                        ) : (
                          <>
                            <button
                              id={`btn-shortlist-cand-${candidate.id}`}
                              onClick={() => handleStatusChange(candidate, 'Shortlisted')}
                              className="px-3 py-1.5 rounded-lg font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs active:scale-95 cursor-pointer"
                            >
                              Shortlist
                            </button>
                            <button
                              id={`btn-reject-cand-${candidate.id}`}
                              onClick={() => handleStatusChange(candidate, 'Rejected')}
                              className="px-2.5 py-1.5 rounded-lg font-medium text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Opportunity Modal */}
      <PostOpportunityModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};
