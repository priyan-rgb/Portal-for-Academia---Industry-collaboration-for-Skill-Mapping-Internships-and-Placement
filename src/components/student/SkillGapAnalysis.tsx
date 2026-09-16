import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { careerRoleBenchmarks } from '../../data/mockData';
import { BarComparisonChart } from '../charts/BarComparisonChart';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Calculator,
  ChevronDown,
  Sparkles,
  Award,
} from 'lucide-react';

export const SkillGapAnalysis: React.FC = () => {
  const { targetRoleId, setTargetRoleId, targetRole, skillGapResult, setActiveNavTab } = useApp();
  const [showFormulaModal, setShowFormulaModal] = useState<boolean>(false);

  const { readinessScore, matchedSkills, gaps, formulaExplanation } = skillGapResult;

  // Color theme based on readiness
  const getReadinessBadge = (score: number) => {
    if (score >= 80) return { label: 'Industry Ready', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 65) return { label: 'Near Placement Ready', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    return { label: 'Active Upskilling Needed', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  };

  const badge = getReadinessBadge(readinessScore);

  // Prepare comparison items for chart
  const comparisonItems = targetRole.requiredSkills.map((req) => {
    const matched = matchedSkills.find((m) => m.skillName === req.skillName);
    const gap = gaps.find((g) => g.skillName === req.skillName);
    const currentScore = matched ? matched.currentScore : gap ? gap.currentScore : 0;
    return {
      name: req.skillName,
      current: currentScore,
      required: req.requiredScore,
      weight: req.weight,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Top Header with Role Selector Dropdown */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              AI Skill Gap & Role Readiness Engine
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare verified competencies against employer-defined job role requirements.
          </p>
        </div>

        {/* Target Role Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="target-role-dropdown" className="text-xs font-semibold text-slate-600 shrink-0">
            Target Role:
          </label>
          <div className="relative">
            <select
              id="target-role-dropdown"
              value={targetRoleId}
              onChange={(e) => setTargetRoleId(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl pl-3 pr-8 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-hidden cursor-pointer"
            >
              {careerRoleBenchmarks.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name} ({role.demandGrowth})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Readiness Score Banner */}
      <div className="p-6 bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-white/10 text-teal-300 border-teal-400/30">
                Target: {targetRole.name}
              </span>
              <span className="text-xs text-slate-300">
                {targetRole.department}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Overall Employability Readiness: <span className="text-teal-400 font-mono">{readinessScore}%</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {targetRole.description}
            </p>
          </div>

          {/* Readiness Dial & Explain Button */}
          <div className="flex items-center gap-4 shrink-0 bg-white/5 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
            {/* SVG Circular Ring Gauge */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-400 transition-all duration-700 ease-out"
                  strokeDasharray={`${readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-sm font-bold text-white">
                {readinessScore}%
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-white mb-0.5">
                {badge.label}
              </div>
              <button
                id="btn-explain-math-formula"
                onClick={() => setShowFormulaModal(!showFormulaModal)}
                className="inline-flex items-center gap-1.5 text-[11px] text-teal-300 hover:text-teal-200 font-medium underline underline-offset-2 transition-colors"
              >
                <Calculator className="w-3 h-3" />
                <span>Explain Calculation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Explainable Formula Card (Dropdown / Collapsible) */}
        {showFormulaModal && (
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-teal-500/40 text-xs text-slate-200 space-y-3 font-sans transition-all animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>Transparent AI Readiness Formula</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Open-Audit Algorithm</span>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              Unlike black-box neural ranking, our readiness calculation performs a normalized weighted benchmark comparison over all required competencies:
            </p>

            <div className="p-3 bg-black/40 rounded-lg font-mono text-[11px] text-teal-300 border border-slate-800 overflow-x-auto">
              {formulaExplanation.formulaString}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400">Total Benchmark Weight</div>
                <div className="font-mono text-white font-bold text-sm mt-0.5">
                  {formulaExplanation.totalWeight} pts
                </div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400">Matched Weighted Sum</div>
                <div className="font-mono text-teal-300 font-bold text-sm mt-0.5">
                  {formulaExplanation.matchedWeightedSum} pts
                </div>
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5">
                <div className="text-slate-400">Computed Readiness</div>
                <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                  ({formulaExplanation.matchedWeightedSum} / {formulaExplanation.totalWeight}) × 100 = {readinessScore}%
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              *Completing any recommended roadmap project increases the target skill score, automatically lifting the matched weighted sum and readiness in real time.
            </p>
          </div>
        )}
      </div>

      {/* Two Column Layout: Bar Chart Comparison & Categorized Gap Lists */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visual Bar Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Required Benchmark Comparison
            </h4>
            <p className="text-xs text-slate-500">
              Visualizing your current proctored scores against the threshold set by recruiting partners for {targetRole.name}.
            </p>
          </div>

          <BarComparisonChart
            items={comparisonItems}
          />

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Target Benchmark Line indicates employer minimum threshold.</span>
            </span>
            <button
              onClick={() => setActiveNavTab('roadmap')}
              className="text-teal-700 font-semibold hover:text-teal-800 flex items-center gap-1"
            >
              <span>View Recommended Upgrades</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Matched Skills vs Gaps Breakdown (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Matched Skills Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Matched Competencies ({matchedSkills.length})</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Ready
              </span>
            </div>

            {matchedSkills.length === 0 ? (
              <p className="text-xs text-emerald-700">No skills currently meet the minimum benchmark.</p>
            ) : (
              <div className="space-y-2">
                {matchedSkills.map((m) => (
                  <div
                    key={m.skillName}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/90 border border-emerald-200/80 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-slate-900">{m.skillName}</span>
                      <span className="text-[10px] text-slate-500 block">
                        Weight: {m.weight}x
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-emerald-700 font-bold">{m.currentScore}</span>
                      <span className="text-slate-400 text-[10px]"> / target {m.requiredScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Identified Gaps Box */}
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Identified Skill Gaps ({gaps.length})</span>
              </div>
              <span className="text-[10px] font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                Action Required
              </span>
            </div>

            {gaps.length === 0 ? (
              <p className="text-xs text-rose-700">All required benchmarks have been achieved!</p>
            ) : (
              <div className="space-y-2">
                {gaps.map((g) => (
                  <div
                    key={g.skillName}
                    className="p-2.5 rounded-lg bg-white/90 border border-rose-200/80 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{g.skillName}</span>
                      <span className="font-mono text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[10px]">
                        -{g.gapPercent}% Gap
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                      <span>Score: {g.currentScore}</span>
                      <span>Target: {g.requiredScore}</span>
                      <span className="text-[10px] text-slate-400">Δ {g.requiredScore - g.currentScore} pts</span>
                    </div>

                    {/* Mini Gap progress */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${Math.round((g.currentScore / g.requiredScore) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
