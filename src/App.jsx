import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import DisclaimerBanner from './components/DisclaimerBanner';
import JobInputForm from './components/JobInputForm';
import ResultsDashboard from './components/ResultsDashboard';
import AnalysisHistory from './components/AnalysisHistory';
import HistoryDetailsModal from './components/HistoryDetailsModal';
import SecurityTipsModal from './components/SecurityTipsModal';
import HowItWorks from './components/HowItWorks';
import { analyzeJobPostingHeuristically } from './utils/detectorEngine';
import {
  getAnalysisHistory,
  saveAnalysisToHistory,
  deleteAnalysisFromHistory,
  clearAllAnalysisHistory,
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'history' | 'about'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [isSavedInHistory, setIsSavedInHistory] = useState(false);
  const [selectedHistoryReport, setSelectedHistoryReport] = useState(null);
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  // Phase 2: Backend Integration State
  const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'missing_key' | 'offline' | 'checking'
  const [backendError, setBackendError] = useState(null);
  const [loadingStage, setLoadingStage] = useState('');

  // Load history from localStorage on initial render
  useEffect(() => {
    const saved = getAnalysisHistory();
    setHistory(saved);
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`);
      if (res.ok) {
        const data = await res.json();
        setBackendStatus(data.gemini_configured ? 'connected' : 'missing_key');
      } else {
        setBackendStatus('offline');
      }
    } catch (e) {
      setBackendStatus('offline');
    }
  };

  // Handle Job Analysis with FastAPI Backend & Google Gemini AI
  const handleAnalyzeJob = async (jobFormData) => {
    setIsAnalyzing(true);
    setBackendError(null);
    setLoadingStage(`Connecting to FastAPI backend at ${API_BASE_URL}...`);

    try {
      setLoadingStage('Transmitting job details to Google Gemini AI...');
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: jobFormData.title || '',
          company: jobFormData.company || '',
          contact: jobFormData.contact || '',
          interviewChannel: jobFormData.interviewChannel || 'standard',
          salary: jobFormData.salary || '',
          description: jobFormData.description,
        }),
      });

      if (response.ok) {
        setLoadingStage('Parsing structured threat assessment from Gemini...');
        const aiReport = await response.json();
        setCurrentReport(aiReport);
        setIsSavedInHistory(false);
        setBackendStatus('connected');

        setTimeout(() => {
          const resultsEl = document.getElementById('results-section');
          if (resultsEl) {
            resultsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else if (response.status === 503) {
        // Gemini API key missing in backend/.env
        const errData = await response.json().catch(() => ({}));
        const detail = errData.detail || {};
        setBackendStatus('missing_key');
        setBackendError({
          type: 'KEY_MISSING',
          title: 'Google Gemini API Key Setup Required',
          message: detail.message || 'Your Gemini API key is missing in backend/.env.',
          setupGuide: 'Open backend/.env in your project folder, add your Gemini API key (GEMINI_API_KEY=your_key), and retry. Get a free key at https://aistudio.google.com/',
        });
      } else {
        const errData = await response.json().catch(() => ({}));
        const msg = typeof errData.detail === 'object' ? errData.detail.message : (errData.detail || 'An error occurred during analysis.');
        setBackendError({
          type: 'API_ERROR',
          title: 'AI Analysis Error',
          message: msg,
        });
      }
    } catch (fetchErr) {
      setBackendStatus('offline');
      setBackendError({
        type: 'OFFLINE',
        title: 'Backend Server Not Reachable',
        message: `Unable to communicate with the Python backend server at ${API_BASE_URL}.`,
        setupGuide: `Ensure your backend server is running and accessible at ${API_BASE_URL}. For local development run: python backend/run.py`,
      });
    } finally {
      setIsAnalyzing(false);
      setLoadingStage('');
    }
  };

  // Fallback trigger for offline heuristic preview mode
  const handleRunHeuristicFallback = (jobFormData) => {
    setIsAnalyzing(true);
    setBackendError(null);
    setTimeout(() => {
      const report = analyzeJobPostingHeuristically(jobFormData);
      setCurrentReport(report);
      setIsAnalyzing(false);
      setIsSavedInHistory(false);
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 600);
  };

  // Save current report to LocalStorage history
  const handleSaveReport = (reportToSave) => {
    const report = reportToSave || currentReport;
    if (!report) return;

    const updated = saveAnalysisToHistory(report);
    setHistory(updated);
    setIsSavedInHistory(true);
  };

  // Delete a report from history
  const handleDeleteReport = (reportId) => {
    const updated = deleteAnalysisFromHistory(reportId);
    setHistory(updated);
    if (selectedHistoryReport && selectedHistoryReport.id === reportId) {
      setSelectedHistoryReport(null);
    }
  };

  // Clear all history
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to delete all saved scan history?')) {
      const updated = clearAllAnalysisHistory();
      setHistory(updated);
    }
  };

  // Re-load a history item back into the live scanner
  const handleLoadToScanner = (report) => {
    setCurrentReport(report);
    setActiveTab('scanner');
    setIsSavedInHistory(true);
    setTimeout(() => {
      const resultsEl = document.getElementById('results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Reset scanner for a new job
  const handleResetScanner = () => {
    setCurrentReport(null);
    setIsSavedInHistory(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      
      {/* 1. Transparent Architecture Disclaimer Banner */}
      <DisclaimerBanner 
        backendStatus={backendStatus}
        onOpenTips={() => setIsTipsModalOpen(true)} 
        onCheckBackend={checkBackendHealth}
      />

      {/* 2. Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        onOpenTips={() => setIsTipsModalOpen(true)}
      />

      {/* 3. Hero Section (Shown on Scanner Tab) */}
      {activeTab === 'scanner' && !currentReport && (
        <HeroSection
          onStartScan={() => {
            const formEl = document.getElementById('scanner-form-section');
            if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTips={() => setIsTipsModalOpen(true)}
        />
      )}

      {/* 4. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* TAB 1: Scanner View */}
        {activeTab === 'scanner' && (
          <div className="space-y-8">
            
            {/* Form Section */}
            <div id="scanner-form-section">
              <JobInputForm
                onAnalyze={handleAnalyzeJob}
                isAnalyzing={isAnalyzing}
                backendStatus={backendStatus}
                backendError={backendError}
                loadingStage={loadingStage}
                onRunHeuristicFallback={handleRunHeuristicFallback}
                onCheckBackend={checkBackendHealth}
              />
            </div>

            {/* Results Section */}
            {currentReport && (
              <div id="results-section">
                <ResultsDashboard
                  report={currentReport}
                  onSaveToHistory={handleSaveReport}
                  isSaved={isSavedInHistory}
                  onReset={handleResetScanner}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Analysis History View */}
        {activeTab === 'history' && (
          <AnalysisHistory
            history={history}
            onSelectReport={(report) => setSelectedHistoryReport(report)}
            onDeleteReport={handleDeleteReport}
            onClearHistory={handleClearHistory}
            onStartNewScan={() => setActiveTab('scanner')}
          />
        )}

        {/* TAB 3: How It Works & Architecture */}
        {activeTab === 'about' && (
          <HowItWorks
            onStartScan={() => setActiveTab('scanner')}
            onOpenTips={() => setIsTipsModalOpen(true)}
          />
        )}

      </main>

      {/* 5. Modals */}
      <HistoryDetailsModal
        report={selectedHistoryReport}
        onClose={() => setSelectedHistoryReport(null)}
        onLoadToScanner={handleLoadToScanner}
      />

      <SecurityTipsModal
        isOpen={isTipsModalOpen}
        onClose={() => setIsTipsModalOpen(false)}
      />

      {/* 6. Footer */}
      <Footer onOpenTips={() => setIsTipsModalOpen(true)} />

    </div>
  );
}
