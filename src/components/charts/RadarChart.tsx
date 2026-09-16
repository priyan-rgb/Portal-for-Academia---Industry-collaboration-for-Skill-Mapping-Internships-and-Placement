import React, { useState } from 'react';
import { SkillItem } from '../../types';

interface RadarChartProps {
  skills: SkillItem[];
  benchmarkSkills?: { skillName: string; requiredScore: number }[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  skills,
  benchmarkSkills,
  size = 360,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Take 6-8 skills for clean polygon geometry
  const displaySkills = skills.slice(0, 7);
  const totalPoints = displaySkills.length;
  if (totalPoints < 3) return null;

  const center = size / 2;
  const radius = size * 0.38;
  const angleStep = (Math.PI * 2) / totalPoints;

  // Concentric levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to get coordinates
  const getCoordinates = (value: number, index: number, maxVal = 100) => {
    const angle = index * angleStep - Math.PI / 2; // start from top (12 o'clock)
    const normalized = (value / maxVal) * radius;
    const x = center + normalized * Math.cos(angle);
    const y = center + normalized * Math.sin(angle);
    return { x, y };
  };

  // Build current student polygon path
  const studentPoints = displaySkills.map((s, i) => getCoordinates(s.score, i));
  const studentPolygon = studentPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Build benchmark polygon path (if provided)
  let benchmarkPolygon = '';
  let benchmarkPoints: { x: number; y: number; val: number }[] = [];
  if (benchmarkSkills && benchmarkSkills.length > 0) {
    const bmMap = new Map<string, number>();
    benchmarkSkills.forEach((b) => bmMap.set(b.skillName, b.requiredScore));

    benchmarkPoints = displaySkills.map((s, i) => {
      const bScore = bmMap.get(s.name) || 75;
      const coords = getCoordinates(bScore, i);
      return { ...coords, val: bScore };
    });
    benchmarkPolygon = benchmarkPoints.map((p) => `${p.x},${p.y}`).join(' ');
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Background Grids */}
        {levels.map((level, levelIdx) => {
          const levelPoints = displaySkills.map((_, i) =>
            getCoordinates(level * 100, i)
          );
          const pathD = levelPoints.map((p) => `${p.x},${p.y}`).join(' ');
          return (
            <g key={levelIdx}>
              <polygon
                points={pathD}
                fill={levelIdx === levels.length - 1 ? '#f8fafc' : 'transparent'}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={levelIdx < levels.length - 1 ? '3 3' : 'none'}
              />
              <text
                x={center + 6}
                y={center - level * radius + 4}
                fill="#94a3b8"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axes lines from center to outer vertices */}
        {displaySkills.map((_, i) => {
          const end = getCoordinates(100, i);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Area (Dashed amber/slate) */}
        {benchmarkPolygon && (
          <g>
            <polygon
              points={benchmarkPolygon}
              fill="rgba(245, 158, 11, 0.08)"
              stroke="#f59e0b"
              strokeWidth="1.75"
              strokeDasharray="4 4"
            />
            {benchmarkPoints.map((p, i) => (
              <circle
                key={`bm-${i}`}
                cx={p.x}
                cy={p.y}
                r="3"
                fill="#f59e0b"
              />
            ))}
          </g>
        )}

        {/* Student Skill Area (Teal / Blue Gradient Fill) */}
        <defs>
          <linearGradient id="studentSkillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <polygon
          points={studentPolygon}
          fill="url(#studentSkillGrad)"
          stroke="#0d9488"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Data points on student vertices */}
        {studentPoints.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g
              key={`point-${i}`}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 6 : 4}
                fill="#0f766e"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-200"
              />
              {isHovered && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="10"
                  fill="rgba(13, 148, 136, 0.25)"
                />
              )}
            </g>
          );
        })}

        {/* Outer Labels for Skills */}
        {displaySkills.map((s, i) => {
          const labelDist = radius + 24;
          const angle = i * angleStep - Math.PI / 2;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          // Text alignment based on x coordinate
          let textAnchor = 'middle';
          if (lx > center + 15) textAnchor = 'start';
          if (lx < center - 15) textAnchor = 'end';

          const isHovered = hoveredIndex === i;

          return (
            <g key={`lbl-${i}`} className="cursor-pointer" onClick={() => setHoveredIndex(i)}>
              <text
                x={lx}
                y={ly - 2}
                textAnchor={textAnchor}
                className={`text-xs font-semibold tracking-tight transition-colors duration-200 ${
                  isHovered ? 'fill-teal-700 font-bold' : 'fill-slate-700'
                }`}
              >
                {s.name.length > 18 ? s.name.substring(0, 16) + '…' : s.name}
              </text>
              <text
                x={lx}
                y={ly + 12}
                textAnchor={textAnchor}
                className="text-[10px] font-mono fill-teal-600 font-medium"
              >
                {s.score}/100 {s.verified && '✓'}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Floating Detail tooltip */}
      {hoveredIndex !== null && (
        <div className="absolute bottom-1 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs shadow-lg pointer-events-none flex items-center gap-2 border border-slate-700">
          <span className="font-semibold text-teal-300">
            {displaySkills[hoveredIndex].name}
          </span>
          <span className="font-mono bg-teal-800/80 px-1.5 py-0.5 rounded text-[11px]">
            Score: {displaySkills[hoveredIndex].score}%
          </span>
          {displaySkills[hoveredIndex].verified && (
            <span className="text-emerald-400 text-[10px] font-medium">Verified</span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-5 mt-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-teal-500/30 border border-teal-600" />
          <span>Alex's Assessed Score</span>
        </div>
        {benchmarkPolygon && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500" />
            <span>Target Benchmark</span>
          </div>
        )}
      </div>
    </div>
  );
};
