/**
 * Storage utility for managing analysis history in browser LocalStorage.
 */

const STORAGE_KEY = 'ai_fake_job_detector_history_v1';

export function getAnalysisHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read history from localStorage:', err);
    return [];
  }
}

export function saveAnalysisToHistory(report) {
  try {
    const current = getAnalysisHistory();
    // Prepend new report and limit to last 50 scans
    const updated = [report, ...current.filter(item => item.id !== report.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save report to localStorage:', err);
    return getAnalysisHistory();
  }
}

export function deleteAnalysisFromHistory(reportId) {
  try {
    const current = getAnalysisHistory();
    const updated = current.filter(item => item.id !== reportId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete report from localStorage:', err);
    return getAnalysisHistory();
  }
}

export function clearAllAnalysisHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear history from localStorage:', err);
    return [];
  }
}
