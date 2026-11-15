import React from 'react';

export default function HeroSection({ onStartScan, onOpenTips }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a0e17] to-slate-950">
      {/* Background cyber pattern / glow */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Security Alert Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide mb-6 shadow-sm shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>CYBERSECURITY EMPLOYMENT DEFENSE SYSTEM</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none">
          Detect Fraudulent Job Offers{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
            Before You Become A Victim
          </span>
        </h1>

        {/* Subtitle / Intro */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Employment scams cost job seekers millions in lost funds and stolen identities every year.
          Our analyzer evaluates job descriptions, recruiter channels, compensation anomalies, and payment demands 
          to identify fake check scams, phishing schemes, and phantom corporate recruiters.
        </p>

        {/* Feature Badges Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
            <div className="text-cyan-400 text-xs font-mono font-semibold uppercase">01 • Advance Fee</div>
            <div className="text-slate-200 text-sm font-medium mt-0.5">Fake Check & Equipment Scams</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
            <div className="text-cyan-400 text-xs font-mono font-semibold uppercase">02 • Social Vectors</div>
            <div className="text-slate-200 text-sm font-medium mt-0.5">Telegram & WhatsApp Traps</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
            <div className="text-cyan-400 text-xs font-mono font-semibold uppercase">03 • Identity Defense</div>
            <div className="text-slate-200 text-sm font-medium mt-0.5">SSN & PII Overreach Warning</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80">
            <div className="text-cyan-400 text-xs font-mono font-semibold uppercase">04 • Pay Anomalies</div>
            <div className="text-slate-200 text-sm font-medium mt-0.5">Unrealistic Salary Traps</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartScan}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide uppercase transition-all duration-200 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Paste & Scan Job Posting
          </button>

          <button
            onClick={onOpenTips}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            How Job Scams Work (Guide)
          </button>
        </div>
      </div>
    </section>
  );
}
