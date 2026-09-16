import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RadarChart } from '../charts/RadarChart';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Zap,
  Info,
  Layers,
} from 'lucide-react';

export const SkillProfileCard: React.FC = () => {
  const { studentSkills, targetRole } = useApp();
  const [activeView, setActiveView] = useState<'radar' | 'breakdown'>('radar');

  const verifiedCount = studentSkills.filter((s) => s.verified).length;
  const averageSkillScore = Math.round(
    studentSkills.reduce((acc, curr) => acc + curr.score, 0) / studentSkills.length
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              Verified Student Skill Profile
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Proctored & Assessed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized technical, core computing & soft skill competencies scored 0–100.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            id="tab-radar-view"
            onClick={() => setActiveView('radar')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'radar'
                ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Radar Spectrum
          </button>
          <button
            id="tab-breakdown-view"
            onClick={() => setActiveView('breakdown')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeView === 'breakdown'
                ? 'bg-white text-teal-800 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Detailed Metrics ({studentSkills.length})
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Average Proficiency</div>
            <div className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
              {averageSkillScore}<span className="text-xs font-normal text-slate-400">/100</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Top 12% in Batch
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Verified Credentials</div>
            <div className="text-xl font-extrabold text-teal-700 font-mono mt-0.5">
              {verifiedCount}<span className="text-xs font-normal text-slate-400">/{studentSkills.length}</span>
            </div>
            <div className="text-[10px] text-teal-600 font-medium mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> NIT ProctorEval
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Top Competency</div>
            <div className="text-sm font-bold text-slate-900 truncate mt-1">
              Communication (86)
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Soft Skills Assessment</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="text-[11px] text-slate-500 font-medium">Active Benchmark</div>
            <div className="text-sm font-bold text-slate-900 truncate mt-1">
              {targetRole.name}
            </div>
            <div className="text-[10px] text-amber-600 font-medium mt-0.5">
              {targetRole.demandGrowth}
            </div>
          </div>
        </div>

        {/* View 1: Radar Chart View */}
        {activeView === 'radar' ? (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-2">
            <div className="w-full max-w-sm flex justify-center">
              <RadarChart
                skills={studentSkills}
                benchmarkSkills={targetRole.requiredSkills}
                size={340}
              />
            </div>

            <div className="w-full lg:max-w-md space-y-3">
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/70">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900 mb-1">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Interactive Competency Radar</span>
                </div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Hover over vertices to inspect real proctored evaluation scores. The dashed amber polygon shows the benchmark curve expected by hiring partners for <span className="font-semibold">{targetRole.name}</span>.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-700">Quick Skill Tags:</div>
                <div className="flex flex-wrap gap-1.5">
                  {studentSkills.map((s) => (
                    <span
                      key={s.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      <span>{s.name}</span>
                      <span className="font-mono text-teal-700 font-semibold">{s.score}</span>
                      {s.verified && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" title="Verified by ProctorEval" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* View 2: Detailed Breakdown Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {studentSkills.map((s) => (
              <div
                key={s.name}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors bg-white shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {s.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-teal-700">
                    {s.score}/100
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"
                    style={{ width: `${s.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Assessed: {s.lastAssessed}</span>
                  {s.verified ? (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {s.verifiedBy || 'ProctorEval Verified'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">Self-Reported (Unverified)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
