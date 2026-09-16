import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Building2,
  Users,
  Award,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminAnalytics,
    triggerCurriculumAction,
    adminActionFeedback,
    clearAdminActionFeedback,
    currentUser,
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Institutional Employability & Curriculum Intelligence
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Dean Directorate
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Aggregate institutional skill benchmarking, placement readiness monitoring, and proactive curriculum interventions.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl">
          Institution: <strong className="text-slate-900">{currentUser.institution}</strong>
        </div>
      </div>

      {/* Action Feedback Banner */}
      {adminActionFeedback && (
        <div className="bg-teal-700 text-white px-5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>{adminActionFeedback}</span>
          </div>
          <button
            onClick={clearAdminActionFeedback}
            className="text-teal-200 hover:text-white font-bold text-sm ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Total Enrolled Students</div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            {adminAnalytics.totalStudents.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Across 5 Engineering Depts
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Corporate Hiring Partners</div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">
            {adminAnalytics.activeRecruiters}
          </div>
          <div className="text-[11px] text-teal-600 font-medium mt-1 flex items-center gap-1">
            <Building2 className="w-3 h-3" /> Actively Posting & Ranking
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Internship Participation</div>
          <div className="text-2xl font-black text-teal-700 font-mono mt-1">
            {adminAnalytics.internshipParticipationRate}%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Target 85% • +6.2% vs Last Term
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="text-xs font-medium text-slate-500">Placement Ready (80%+)</div>
          <div className="text-2xl font-black text-indigo-700 font-mono mt-1">
            {adminAnalytics.placementReadinessRate}%
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">
            596 Final-Year Candidates
          </div>
        </div>
      </div>

      {/* Proactive Insight Callout Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              AI Continuous Intelligence & Curriculum Insight
            </h4>
          </div>
          <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-bold">
            High Priority Intervention
          </span>
        </div>

        {adminAnalytics.recentInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="font-bold text-teal-300 text-sm">{insight.title}</div>
              <p className="text-slate-200 leading-relaxed">{insight.summary}</p>
              <p className="text-emerald-300 font-medium">
                Recommendation: {insight.recommendation}
              </p>
            </div>

            <button
              id={`btn-trigger-intervention-${insight.id}`}
              onClick={() => triggerCurriculumAction(insight.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 transition-all shadow-sm active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{insight.status.includes('Initiated') ? 'Workshop Scheduled' : 'Initiate Workshop'}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Department Scores & Top In-Demand Skills Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Department-Wise Skill Average (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Department-Wise Average Skill Scores
              </h4>
              <p className="text-xs text-slate-500">
                Benchmarked from technical coding assessments, proctored exams, and soft skill evaluations.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">Cohort 2026</span>
          </div>

          <div className="space-y-4">
            {adminAnalytics.departmentScores.map((dept) => (
              <div key={dept.department} className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{dept.department}</span>
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="text-slate-500">{dept.studentsCount} students</span>
                    <span className="text-teal-700 font-bold">{dept.averageScore}/100 Avg</span>
                    <span className="text-emerald-600 font-semibold">{dept.readinessRate}% Ready</span>
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"
                    style={{ width: `${dept.averageScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Readiness Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-sm font-bold text-slate-900">
              Placement Readiness Distribution
            </h4>
            <p className="text-xs text-slate-500">
              Overall student population broken down by industry benchmark readiness.
            </p>
          </div>

          <div className="space-y-3">
            {adminAnalytics.readinessDistribution.map((tier) => (
              <div
                key={tier.tier}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{tier.tier}</span>
                  <span className="font-mono font-bold text-slate-900">{tier.percent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tier.color} rounded-full`}
                    style={{ width: `${tier.percent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {tier.count} Students in this cohort
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* In-Demand Skills Bar Chart: Industry Demand vs Student Average Supply */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Top In-Demand Skills: Industry Demand vs Student Supply
            </h4>
            <p className="text-xs text-slate-500">
              Derived from aggregated corporate job postings vs verified student proficiency averages.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-sm bg-blue-600" />
              <span>Industry Recruiter Demand</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-sm bg-teal-500" />
              <span>Student Average Score</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          {adminAnalytics.topInDemandSkills.map((item) => (
            <div key={item.skill} className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{item.skill}</span>
                <span className="font-mono text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                  Curriculum Gap: -{item.gap}%
                </span>
              </div>

              {/* Stacked comparison bars */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 w-16 font-mono">Demand:</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.industryDemandScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-800 w-8 text-right">
                    {item.industryDemandScore}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 w-16 font-mono">Supply:</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${item.studentAverageScore}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-teal-800 w-8 text-right">
                    {item.studentAverageScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
