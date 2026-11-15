import React from 'react';

export default function RiskReasonsList({ reasons = [] }) {
  if (!reasons || reasons.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-sm text-slate-400">
        No high-risk vectors identified in this advertisement.
      </div>
    );
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-rose-950/80',
          border: 'border-rose-500/50',
          text: 'text-rose-300',
          label: 'CRITICAL VECTOR',
        };
      case 'high':
        return {
          bg: 'bg-amber-950/80',
          border: 'border-amber-500/50',
          text: 'text-amber-300',
          label: 'HIGH RISK',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-950/60',
          border: 'border-yellow-600/40',
          text: 'text-yellow-300',
          label: 'SUSPICIOUS',
        };
      default:
        return {
          bg: 'bg-slate-800',
          border: 'border-slate-700',
          text: 'text-slate-300',
          label: 'NOTE',
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Risk Assessment Breakdown & Reasons ({reasons.length})</span>
        </h4>
        <span className="text-[11px] font-mono text-slate-400">Heuristic Signals</span>
      </div>

      <div className="space-y-3">
        {reasons.map((item, index) => {
          const badge = getSeverityBadge(item.severity);
          return (
            <div
              key={item.id || index}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${badge.bg} ${badge.border} ${badge.text}`}>
                    {badge.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {item.category}
                  </span>
                </div>
                {item.triggerPhrase && (
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Match: <span className="text-cyan-300 font-semibold">"{item.triggerPhrase}"</span>
                  </span>
                )}
              </div>

              <h5 className="text-sm font-bold text-white mt-1">
                {item.title}
              </h5>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {item.description}
              </p>

              {item.recommendation && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300/90 font-medium">
                  <svg className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item.recommendation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
