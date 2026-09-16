import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Route,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Clock,
  Star,
  ExternalLink,
  TrendingUp,
  Zap,
} from 'lucide-react';

export const PersonalizedRoadmap: React.FC = () => {
  const { roadmap, markRoadmapCompleted, targetRole, skillGapResult } = useApp();
  const [justCompletedId, setJustCompletedId] = useState<string | null>(null);

  const handleComplete = (id: string, skillName: string, gain: number) => {
    markRoadmapCompleted(id);
    setJustCompletedId(id);
    setTimeout(() => {
      setJustCompletedId(null);
    }, 4000);
  };

  const completedCount = roadmap.filter((r) => r.completed).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60">
              <Route className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              AI Personalized Learning & Upskilling Roadmap
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              Gap-Targeted
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Curated hands-on projects, industry certifications, and labs aligned directly to close your <span className="font-semibold text-slate-700">{targetRole.name}</span> skill gaps.
          </p>
        </div>

        {/* Progress pill */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
          <div className="text-xs font-semibold text-slate-700">
            Roadmap Progress:
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-teal-700">
            <span>{completedCount}</span>
            <span className="text-slate-400">/</span>
            <span>{roadmap.length} Completed</span>
          </div>
        </div>
      </div>

      {/* Just completed toast / banner */}
      {justCompletedId && (
        <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>
              Milestone Verified! Skill score elevated & Role Readiness dynamically recalculated in real-time.
            </span>
          </div>
          <span className="font-mono text-emerald-100 text-[11px]">
            New Readiness: {skillGapResult.readinessScore}%
          </span>
        </div>
      )}

      {/* Roadmap List */}
      <div className="p-6 space-y-4">
        {roadmap.map((item, index) => {
          const isCompleted = item.completed;
          const isJustCompleted = justCompletedId === item.id;

          const getTypeBadge = (type: string) => {
            switch (type) {
              case 'Hands-on Project':
                return 'bg-blue-50 text-blue-700 border-blue-200';
              case 'Certification':
                return 'bg-purple-50 text-purple-700 border-purple-200';
              case 'Industry Lab':
                return 'bg-indigo-50 text-indigo-700 border-indigo-200';
              default:
                return 'bg-teal-50 text-teal-700 border-teal-200';
            }
          };

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-50/40 border-emerald-200/80'
                  : 'bg-white border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left: Content info */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      Step {index + 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getTypeBadge(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {item.duration}
                    </span>
                    <span className="text-xs text-amber-600 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description || `Curated specifically to address benchmark gaps in ${item.targetSkill}.`}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                    <span className="text-slate-500">
                      Partner: <strong className="text-slate-700">{item.provider}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      <Zap className="w-3 h-3 text-teal-600" />
                      Target: {item.targetSkill} (+{item.skillGain} pts)
                    </span>
                    {item.difficulty && (
                      <span className="text-slate-400 text-[11px]">
                        Level: {item.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Status / Action */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed & Verified</span>
                    </div>
                  ) : (
                    <button
                      id={`btn-complete-roadmap-${item.id}`}
                      onClick={() => handleComplete(item.id, item.targetSkill, item.skillGain)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-sm transition-all duration-200 transform active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mark as Completed</span>
                    </button>
                  )}

                  <span className="text-[10px] text-slate-400 font-mono text-right">
                    {isCompleted ? 'Score boosted' : `Adds +${item.skillGain} to ${item.targetSkill}`}
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
