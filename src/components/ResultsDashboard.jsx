import React, { useState } from 'react';
import RiskScoreMeter from './RiskScoreMeter';
import SuspiciousPhrasesList from './SuspiciousPhrasesList';
import RiskReasonsList from './RiskReasonsList';
import SafetyRecommendations from './SafetyRecommendations';

export default function ResultsDashboard({ report, onSaveToHistory, isSaved, onReset }) {
  const [copied, setCopied] = useState(false);

  if (!report) return null;

  const handleCopySummary = () => {
    const text = `=== AI FAKE JOB DETECTOR REPORT ===
Job Title: ${report.jobTitle}
Company: ${report.company}
Risk Score: ${report.fraudScore}/100 (${report.riskLabel})
Risk Category: ${report.riskCategory}
Suspicious Phrases Detected: ${report.suspiciousPhrases.join(', ') || 'None'}

Key Reasons:
${report.reasons.map((r) => `- [${r.category}] ${r.title}: ${r.description}`).join('\n')}

Safety Recommendations:
${report.safetyRecommendations.map((s) => `- [${s.priority}] ${s.text}`).join('\n')}

Engine Provenance: ${report.engineMode}
Date: ${new Date(report.analyzedAt).toLocaleString()}
Disclaimer: Heuristic preview estimate. Not a legal certificate of fraud.
===================================`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fraud-risk-report-${report.jobTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cyber-card p-6 sm:p-8 space-y-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Top Banner with Provenance & Transparency */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
              Threat Intelligence Assessment Report
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            {report.jobTitle}
          </h2>
          <p className="text-sm text-slate-400">
            Target Entity: <span className="text-slate-200 font-medium">{report.company}</span> • Contact: <span className="font-mono text-slate-300">{report.contact}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSaveToHistory(report)}
            disabled={isSaved}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isSaved
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 cursor-default'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSaved ? "M5 13l4 4L19 7" : "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"} />
            </svg>
            <span>{isSaved ? 'Saved in History' : 'Save to History'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={copied ? "M5 13l4 4L19 7" : "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"} />
            </svg>
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export JSON</span>
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* 1. Risk Score Meter Component */}
      <RiskScoreMeter
        score={report.fraudScore}
        category={report.riskCategory}
        color={report.riskColor}
        label={report.riskLabel}
      />

      {/* 2. Suspicious Phrases Detected */}
      <div className="pt-2">
        <SuspiciousPhrasesList phrases={report.suspiciousPhrases} />
      </div>

      {/* 3. Reasons Behind Risk Assessment */}
      <div className="pt-2">
        <RiskReasonsList reasons={report.reasons} />
      </div>

      {/* 4. Safety Recommendations */}
      <div className="pt-2">
        <SafetyRecommendations
          recommendations={report.safetyRecommendations}
          category={report.riskCategory}
        />
      </div>

      {/* Engine Transparency Footer */}
      <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400">Analysis Engine:</span>
          <span>{report.engineMode}</span>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Timestamp: {new Date(report.analyzedAt).toUTCString()}
        </div>
      </div>
    </div>
  );
}
