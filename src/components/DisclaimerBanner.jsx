import React from 'react';

/**
 * Transparent status banner informing users of backend and AI connectivity status.
 */
export default function DisclaimerBanner({ onOpenTips, backendStatus = 'checking', onCheckBackend }) {
  return (
    <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-y border-cyan-500/20 px-4 py-2.5 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
          {backendStatus === 'connected' && (
            <>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[11px]">
                FastAPI Backend Connected
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-200">Google Gemini AI Inference Ready</span>
            </>
          )}

          {backendStatus === 'missing_key' && (
            <>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
                Backend Online
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-200">GEMINI_API_KEY pending in backend/.env</span>
            </>
          )}

          {backendStatus === 'offline' && (
            <>
              <span className="inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                Backend Offline
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Verify backend service is running for live AI inference</span>
            </>
          )}

          {backendStatus === 'checking' && (
            <>
              <span className="inline-flex rounded-full h-2 w-2 bg-cyan-400 animate-spin"></span>
              <span className="text-slate-400">Probing backend connection...</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {onCheckBackend && (
            <button
              onClick={onCheckBackend}
              className="text-slate-400 hover:text-cyan-300 text-[11px] underline cursor-pointer"
            >
              Re-check Backend 🔄
            </button>
          )}
          <span className="text-slate-600 hidden sm:inline">|</span>
          <button
            onClick={onOpenTips}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer transition-colors"
          >
            Security Guide & Scam Tactics
          </button>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-400 hidden lg:inline font-mono">
            🔒 Zero Key Exposure
          </span>
        </div>
      </div>
    </div>
  );
}
