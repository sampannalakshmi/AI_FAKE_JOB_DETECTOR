import React from 'react';

export default function Footer({ onOpenTips }) {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                AI Fake Job Detector
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A cybersecurity initiative engineered to protect job seekers from sophisticated employment fraud, 
              advance-fee cashier check scams, phishing recruiters, and identity theft.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              🔒 Privacy Assured: Client-side evaluation, zero key exposure architecture.
            </div>
          </div>

          {/* Column 2: Legal & Reporting */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Official Reporting
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://reportfraud.ftc.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  Federal Trade Commission (FTC) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.ic3.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  FBI Internet Crime Complaint Center ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.identitytheft.gov"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition"
                >
                  IdentityTheft.gov Portal ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Architecture */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Platform Status
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Frontend: React 18 + Tailwind</span>
              </li>
              <li className="flex items-center gap-1.5 text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>AI Backend: Ready for Integration</span>
              </li>
              <li>
                <button
                  onClick={onOpenTips}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                >
                  Threat Intelligence Guide
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} AI Fake Job Detector. Open source cybersecurity resource for job seekers.
          </div>
          <div className="text-center sm:text-right">
            Disclaimer: Automated heuristic tool for educational and screening purposes. Always independently verify employers.
          </div>
        </div>

      </div>
    </footer>
  );
}
