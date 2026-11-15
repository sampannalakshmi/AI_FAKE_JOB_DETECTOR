import React, { useState } from 'react';
import { SAMPLE_JOBS } from '../utils/sampleJobs';

export default function JobInputForm({
  onAnalyze,
  isAnalyzing,
  backendStatus = 'checking',
  backendError = null,
  loadingStage = '',
  onRunHeuristicFallback,
  onCheckBackend,
}) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    contact: '',
    interviewChannel: 'standard',
    salary: '',
    description: '',
  });

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'description' && value.trim().length >= 15) {
      setValidationError('');
    }
  };

  const loadSample = (sampleId) => {
    const sample = SAMPLE_JOBS.find((s) => s.id === sampleId);
    if (sample) {
      setFormData({
        title: sample.title,
        company: sample.company,
        contact: sample.contact,
        interviewChannel: sample.interviewChannel,
        salary: sample.salary,
        description: sample.description,
      });
      setValidationError('');
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      company: '',
      contact: '',
      interviewChannel: 'standard',
      salary: '',
      description: '',
    });
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || formData.description.trim().length < 15) {
      setValidationError('Please paste or write at least 15 characters of the job advertisement description.');
      return;
    }
    setValidationError('');
    onAnalyze(formData);
  };

  const charCount = formData.description.length;
  const wordCount = formData.description.trim() ? formData.description.trim().split(/\s+/).length : 0;

  return (
    <div className="cyber-card p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-2xl">
      {/* Subtle scanning accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

      {/* Header and Quick Samples */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            Paste Job Advertisement for Analysis
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Analyze complete job postings, recruiter direct messages, emails, or text invitations with AI.
          </p>
        </div>

        {/* Quick Sample Loader Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-mono text-slate-400">Quick Test:</span>
          {SAMPLE_JOBS.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => loadSample(sample.id)}
              className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer flex items-center gap-1.5"
              title="Click to load this sample data into the form"
            >
              <span>{sample.badge}</span>
            </button>
          ))}
          {formData.description && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs px-2.5 py-1.5 rounded-md bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Backend Setup / API Key Error Banner */}
      {backendError && (
        <div className={`mt-6 p-4 rounded-xl border ${
          backendError.type === 'KEY_MISSING'
            ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
            : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1 space-y-2">
              <h4 className="font-bold text-sm text-white">{backendError.title}</h4>
              <p className="text-xs leading-relaxed text-slate-200">{backendError.message}</p>
              {backendError.setupGuide && (
                <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  📋 <strong>Setup Guide:</strong> {backendError.setupGuide}
                </div>
              )}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {onRunHeuristicFallback && (
                  <button
                    type="button"
                    onClick={() => onRunHeuristicFallback(formData)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider border border-slate-700 cursor-pointer"
                  >
                    ⚡ Test with Heuristic Engine for Now
                  </button>
                )}
                {onCheckBackend && (
                  <button
                    type="button"
                    onClick={onCheckBackend}
                    className="px-3 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-xs font-semibold uppercase tracking-wider border border-cyan-700 cursor-pointer"
                  >
                    🔄 Re-check Backend Status
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* Supplementary Metadata Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Job Title <span className="text-slate-600 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Remote Data Entry Clerk"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Company Name <span className="text-slate-600 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Apex Global Logistics"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Recruiter Email / URL <span className="text-slate-600 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g. hr@company.com or hr@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-600 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Interview Channel
            </label>
            <select
              name="interviewChannel"
              value={formData.interviewChannel}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white outline-none transition cursor-pointer"
            >
              <option value="standard">Standard / Video Call (Zoom, Teams)</option>
              <option value="telegram">Telegram Messenger Chat</option>
              <option value="whatsapp">WhatsApp Messaging</option>
              <option value="signal">Signal / Wire App</option>
              <option value="email_only">Email Questionnaire Only</option>
              <option value="phone">Standard Phone Screen</option>
            </select>
          </div>
        </div>

        {/* Job Description Textarea */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Full Job Description & Instructions</span>
              <span className="text-rose-400">*</span>
            </label>
            <div className="text-xs font-mono text-slate-500">
              {wordCount} words | {charCount} chars
            </div>
          </div>

          <div className="relative">
            <textarea
              name="description"
              rows={8}
              value={formData.description}
              onChange={handleChange}
              placeholder="Paste the full job posting advertisement, recruiter message, requirements, and hiring instructions here..."
              className={`w-full p-4 rounded-xl bg-slate-950/90 border font-mono text-xs sm:text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 resize-y leading-relaxed ${
                validationError
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500'
              }`}
            />
          </div>

          {validationError && (
            <p className="mt-2 text-xs text-rose-400 flex items-center gap-1.5 font-medium">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {validationError}
            </p>
          )}
        </div>

        {/* Action Button & Security Assurance */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {isAnalyzing ? (
              <span className="text-cyan-300 font-mono animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                {loadingStage || 'Processing AI threat intelligence...'}
              </span>
            ) : (
              <span>
                <span className="text-emerald-400 font-bold">🔒</span> Zero Key Exposure: Keys securely stored in backend/.env.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className={`w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg ${
              isAnalyzing
                ? 'bg-cyan-900 text-cyan-200 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>Analyze Job Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
