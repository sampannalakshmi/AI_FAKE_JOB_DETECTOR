import React from 'react';

export default function SafetyRecommendations({ recommendations = [], category }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Safety Recommendations & Next Steps</span>
        </h4>
        <span className="text-[11px] font-mono text-emerald-400">Actionable Checklist</span>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec, idx) => {
          const isCritical = rec.priority === 'CRITICAL';
          const isHigh = rec.priority === 'HIGH';
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
                isCritical
                  ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  : isHigh
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="mt-0.5">
                {isCritical ? (
                  <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider mr-2 opacity-80">
                  [{rec.priority}]
                </span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {rec.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Reporting Resources Callout */}
      {category === 'High' && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-rose-950/60 via-slate-950 to-slate-900 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase font-mono tracking-wider mb-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Official Incident Reporting Hotlines
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            If you have sent funds or personal information to this entity, immediately freeze your credit bureaus and file reports with:
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
            <a
              href="https://reportfraud.ftc.gov"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 underline font-mono cursor-pointer"
            >
              FTC Fraud Portal (reportfraud.ftc.gov) ↗
            </a>
            <a
              href="https://www.ic3.gov"
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 underline font-mono cursor-pointer"
            >
              FBI Internet Crime Complaint Center (ic3.gov) ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
