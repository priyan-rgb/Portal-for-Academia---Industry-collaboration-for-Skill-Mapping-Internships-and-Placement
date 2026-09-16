import React from 'react';

interface BarComparisonItem {
  name: string;
  current: number;
  required: number;
  weight?: number;
}

interface BarComparisonChartProps {
  items: BarComparisonItem[];
  title?: string;
  subtitle?: string;
}

export const BarComparisonChart: React.FC<BarComparisonChartProps> = ({
  items,
  title,
  subtitle,
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-600" />
              <span>Current Score</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
              <span>Target Benchmark</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3.5">
        {items.map((item, idx) => {
          const isMatched = item.current >= item.required;
          const gap = item.required - item.current;
          const pctGap = Math.max(0, Math.round((gap / item.required) * 100));

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800">{item.name}</span>
                  {item.weight && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                      Wt: {item.weight}x
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-teal-700 font-semibold">{item.current}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-amber-700 font-medium">{item.required}</span>
                  {isMatched ? (
                    <span className="text-emerald-600 font-sans text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      ✓ Met (+{item.current - item.required})
                    </span>
                  ) : (
                    <span className="text-rose-600 font-sans text-[10px] bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                      -{pctGap}% gap
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Track */}
              <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                {/* Benchmark indicator line */}
                <div
                  className="absolute top-0 bottom-0 z-10 w-0.5 bg-amber-500"
                  style={{ left: `${item.required}%` }}
                  title={`Benchmark: ${item.required}%`}
                />

                {/* Current student score bar */}
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    isMatched
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500'
                      : 'bg-gradient-to-r from-teal-600 to-blue-600'
                  }`}
                  style={{ width: `${Math.min(100, item.current)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
