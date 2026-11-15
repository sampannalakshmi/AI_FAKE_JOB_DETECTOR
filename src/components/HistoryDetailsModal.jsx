import React from 'react';
import RiskScoreMeter from './RiskScoreMeter';
import SuspiciousPhrasesList from './SuspiciousPhrasesList';
import RiskReasonsList from './RiskReasonsList';
import SafetyRecommendations from './SafetyRecommendations';

export default function HistoryDetailsModal({ report, onClose, onLoadToScanner }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto cyber-card p-6 sm:p-8 border border-slate-700 shadow-2xl bg-slate-950 my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                Archived Threat Report
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                {new Date(report.analyzedAt).toLocaleString()}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {report.jobTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Company: <span className="text-slate-200">{report.company}</span> • Contact: <span className="font-mono text-slate-300">{report.contact}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-6 space-y-6">
          <RiskScoreMeter
            score={report.fraudScore}
            category={report.riskCategory}
            color={report.riskColor}
            label={report.riskLabel}
          />

          <SuspiciousPhrasesList phrases={report.suspiciousPhrases} />

          <RiskReasonsList reasons={report.reasons} />

          <SafetyRecommendations
            recommendations={report.safetyRecommendations}
            category={report.riskCategory}
          />

          {/* Original Text Snippet */}
          {report.originalDescription && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Original Job Description Text (Excerpt)
              </h4>
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {report.originalDescription}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onLoadToScanner(report);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/50 flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Re-analyze in Scanner</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
