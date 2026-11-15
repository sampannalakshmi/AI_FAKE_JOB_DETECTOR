import React, { useState } from 'react';

export default function AnalysisHistory({
  history = [],
  onSelectReport,
  onDeleteReport,
  onClearHistory,
  onStartNewScan,
}) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter history items based on category and search query
  const filteredHistory = history.filter((item) => {
    const matchesCategory =
      filterCategory === 'ALL' || item.riskCategory?.toUpperCase() === filterCategory;
    const matchesSearch =
      !searchTerm ||
      item.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeStyle = (category) => {
    switch (category) {
      case 'High':
        return 'bg-rose-950/80 border-rose-500/50 text-rose-300';
      case 'Medium':
        return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
      case 'Low':
        return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="cyber-card p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Saved Analysis History
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Review past job posting evaluations, audit trails, and risk trends stored locally on this device.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="self-start md:self-auto px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All History
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title or company name..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Risk Level Filters */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white">No Analysis Records Yet</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mt-1">
            Scan a job posting or try one of the built-in scam samples to start building your threat history.
          </p>
          <button
            onClick={onStartNewScan}
            className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition hover:from-cyan-400 hover:to-blue-500 cursor-pointer shadow-md"
          >
            Analyze First Job
          </button>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-sm">
          No records matching the selected filter or search term.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Job Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getBadgeStyle(item.riskCategory)}`}>
                    {item.riskCategory} Risk ({item.fraudScore}/100)
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {new Date(item.analyzedAt).toLocaleDateString()} at {new Date(item.analyzedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white truncate">
                  {item.jobTitle}
                </h4>

                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  Company: <span className="text-slate-300 font-medium">{item.company}</span> • Contact: <span className="font-mono text-slate-400">{item.contact}</span>
                </p>

                {item.suspiciousPhrases && item.suspiciousPhrases.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {item.suspiciousPhrases.slice(0, 3).map((p, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/50 text-rose-300 border border-rose-800/40">
                        "{p}"
                      </span>
                    ))}
                    {item.suspiciousPhrases.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5">
                        +{item.suspiciousPhrases.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onSelectReport(item)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-700/50 transition cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onDeleteReport(item.id)}
                  title="Delete from history"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
