import React from 'react';

/**
 * Animated SVG circular gauge representing Fraud Risk Score (0 - 100).
 * Color dynamically switches based on risk category (Emerald / Amber / Rose).
 */
export default function RiskScoreMeter({ score, category, color, label }) {
  // SVG circular gauge calculations
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Score percentage (clamp between 0 and 100)
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  // Determine styling classes based on risk
  const colorMap = {
    red: {
      stroke: '#ef4444',
      badgeBg: 'bg-rose-950/80',
      badgeBorder: 'border-rose-500/50',
      badgeText: 'text-rose-300',
      glow: 'text-glow-red',
      levelText: 'High Risk Alert',
      summary: 'Strong indicators of fraudulent employment scheme or financial advance-fee trap.',
    },
    amber: {
      stroke: '#f59e0b',
      badgeBg: 'bg-amber-950/80',
      badgeBorder: 'border-amber-500/50',
      badgeText: 'text-amber-300',
      glow: 'text-glow-amber',
      levelText: 'Moderate Risk Warning',
      summary: 'Multiple anomalies or unverified hiring practices detected. Exercise high scrutiny.',
    },
    emerald: {
      stroke: '#10b981',
      badgeBg: 'bg-emerald-950/80',
      badgeBorder: 'border-emerald-500/50',
      badgeText: 'text-emerald-300',
      glow: 'text-glow-green',
      levelText: 'Low Risk Profile',
      summary: 'Posting exhibits typical legitimate hiring structure with no common fraud patterns detected.',
    },
  };

  const currentStyle = colorMap[color] || colorMap.emerald;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-slate-950/60 border border-slate-800">
      {/* SVG Radial Gauge */}
      <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={currentStyle.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Numerical Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-mono text-slate-400">Risk Score</span>
          <span className={`text-4xl font-extrabold font-mono tracking-tight ${currentStyle.glow} text-white`}>
            {clampedScore}
          </span>
          <span className="text-[11px] font-mono text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Risk Assessment Description */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${currentStyle.badgeBg} ${currentStyle.badgeBorder} ${currentStyle.badgeText}`}>
            {label} ({category} Category)
          </span>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            Heuristic Severity: {currentStyle.levelText}
          </span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed mt-2 font-medium">
          {currentStyle.summary}
        </p>

        {/* Severity Scale Guide */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
          <div className={`p-1.5 rounded ${category === 'Low' ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-slate-900/60 text-slate-400'}`}>
            0 - 29: Low
          </div>
          <div className={`p-1.5 rounded ${category === 'Medium' ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300' : 'bg-slate-900/60 text-slate-400'}`}>
            30 - 64: Medium
          </div>
          <div className={`p-1.5 rounded ${category === 'High' ? 'bg-rose-950/60 border border-rose-500/40 text-rose-300' : 'bg-slate-900/60 text-slate-400'}`}>
            65 - 100: High
          </div>
        </div>
      </div>
    </div>
  );
}
