import React from 'react';

export default function SuspiciousPhrasesList({ phrases = [] }) {
  if (!phrases || phrases.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-emerald-400">No Suspicious Keyphrases Flagged</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            The scanner did not find textbook scam buzzwords (e.g. check overpayment, cashier check, Telegram HR, advance fees).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>Suspicious Keywords & Patterns Detected ({phrases.length})</span>
        </h4>
        <span className="text-[11px] font-mono text-slate-400">Triggered from posting</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {phrases.map((phrase, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-rose-950/60 border border-rose-500/40 text-rose-200 shadow-sm shadow-rose-950/50"
          >
            <svg className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">"{phrase}"</span>
          </span>
        ))}
      </div>
    </div>
  );
}
