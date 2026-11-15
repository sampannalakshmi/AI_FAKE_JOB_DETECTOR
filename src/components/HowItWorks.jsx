import React from 'react';

export default function HowItWorks({ onStartScan, onOpenTips }) {
  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="cyber-card p-6 sm:p-8 border border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>Security Architecture & Threat Detection Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          How the AI Fake Job Detector Works
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          The AI Fake Job Detector operates a multi-tier defense architecture designed to intercept fraudulent employment schemes before candidates surrender money, personal banking data, or sensitive government credentials.
        </p>
      </div>

      {/* 4 Pipeline Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1 */}
        <div className="cyber-card p-6 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
              STAGE 01
            </span>
            <span className="text-xs text-slate-500 font-mono">Input Processing</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            1. Job Content & Recruiter Ingestion
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Users paste the advertisement text, company name, contact email, and stated interview channel. 
            The system strips hidden formatting, tokenizes text, and parses structured entities (salaries, communication tools, payment terms).
          </p>
        </div>

        {/* Step 2 */}
        <div className="cyber-card p-6 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
              STAGE 02
            </span>
            <span className="text-xs text-slate-500 font-mono">Pattern Extraction</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            2. Heuristic Pattern Matching (Client-Side)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The frontend immediately scans for known scam vectors: advance-fee equipment purchase requests, 
            Telegram/WhatsApp interview traps, free public email domains (e.g. @gmail.com for enterprise hiring), 
            and premature Social Security / banking requests.
          </p>
        </div>

        {/* Step 3 */}
        <div className="cyber-card p-6 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-500/30">
              STAGE 03
            </span>
            <span className="text-xs text-slate-500 font-mono">Backend AI Model (Phase 2)</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            3. Neural AI Semantic Analysis
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Once backend integration is approved, the secure API server runs Large Language Model semantic reasoning 
            to evaluate linguistic coercion, tone urgency, company existence validation, and cross-reference with historical fraud patterns.
          </p>
        </div>

        {/* Step 4 */}
        <div className="cyber-card p-6 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30">
              STAGE 04
            </span>
            <span className="text-xs text-slate-500 font-mono">Defense Dashboard</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            4. Risk Scoring & Safety Recommendations
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Results are synthesized into a 0–100 Fraud Risk Score, categorized into Low, Medium, or High threat levels, 
            accompanied by highlighted suspicious phrases, detailed rationales, and FTC/IC3 incident reporting guidance.
          </p>
        </div>

      </div>

      {/* Security Principles Banner */}
      <div className="p-6 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Zero Key Exposure & Privacy By Design
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            In compliance with cybersecurity best practices, no sensitive API keys are bundled or exposed in client frontend code. 
            All AI operations run through isolated server-side endpoints.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onStartScan}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase font-mono tracking-wider hover:from-cyan-300 hover:to-blue-400 cursor-pointer shadow-md"
          >
            Launch Scanner
          </button>
        </div>
      </div>
    </div>
  );
}
