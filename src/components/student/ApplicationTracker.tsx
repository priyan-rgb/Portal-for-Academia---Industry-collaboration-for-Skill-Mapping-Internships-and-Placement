import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileCheck,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const ApplicationTracker: React.FC = () => {
  const { applications, setRole, setActiveNavTab } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Shortlisted':
        return {
          label: 'Shortlisted for Interview',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
          icon: CheckCircle2,
          dotColor: 'bg-emerald-500',
        };
      case 'Under Review':
        return {
          label: 'Under Technical Review',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-200 font-medium',
          icon: Clock,
          dotColor: 'bg-blue-500',
        };
      case 'Rejected':
        return {
          label: 'Not Selected',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: XCircle,
          dotColor: 'bg-slate-400',
        };
      default:
        return {
          label: 'Application Submitted',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
          icon: FileCheck,
          dotColor: 'bg-amber-500',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60">
              <FileCheck className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Application Lifecycle & Placement Tracker
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Synchronized
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track real-time hiring decisions, reviewer feedback, and interview shortlists.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Total Applications: <strong className="text-slate-900 font-bold">{applications.length}</strong>
        </div>
      </div>

      {/* Sync Callout */}
      <div className="mx-6 my-4 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Connected Ecosystem Note:</strong> When you switch to the <em>Industry / Recruiter</em> role and shortlist or reject candidates for CloudScale Technologies, this table will update its status instantly.
          </p>
        </div>
        <button
          onClick={() => setRole('recruiter')}
          className="shrink-0 text-teal-800 font-bold hover:text-teal-950 underline underline-offset-2 flex items-center gap-1"
        >
          <span>Test Recruiter View</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-y border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Role & Organization</th>
              <th className="py-3 px-4">Applied Date</th>
              <th className="py-3 px-4">AI Compatibility</th>
              <th className="py-3 px-4">Key Matched Skills</th>
              <th className="py-3 px-6 text-right">Application Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {applications.map((app) => {
              const statusInfo = getStatusBadge(app.status);
              const Icon = statusInfo.icon;

              return (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Role & Company */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{app.opportunityTitle}</div>
                    <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                      <span className="font-medium text-slate-700">{app.company}</span>
                      <span>•</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        {app.type}
                      </span>
                    </div>
                  </td>

                  {/* Applied Date */}
                  <td className="py-4 px-4 text-slate-600 font-mono text-[11px]">
                    {app.appliedDate}
                  </td>

                  {/* Compatibility */}
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      {app.compatibilityScore}%
                    </span>
                  </td>

                  {/* Matched skills */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {app.matchedSkills.slice(0, 2).map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {m.split(' ')[0]}
                        </span>
                      ))}
                      {app.matchedSkills.length > 2 && (
                        <span className="text-[10px] text-slate-400">
                          +{app.matchedSkills.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${statusInfo.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotColor}`} />
                      <Icon className="w-3.5 h-3.5" />
                      <span>{statusInfo.label}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {applications.length === 0 && (
        <div className="p-8 text-center text-slate-500 text-xs">
          No applications submitted yet. Browse the Opportunities Feed to apply!
        </div>
      )}
    </div>
  );
};
