import React from 'react';

export default function SecurityTipsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const SCAM_TACTICS = [
    {
      title: '1. The Fake Check & Equipment Purchase Scam',
      badge: 'Most Common',
      badgeColor: 'text-rose-400 border-rose-500/40 bg-rose-950/50',
      description:
        'The recruiter sends you a counterfeit cashier’s check (often $2,000–$5,000) to deposit into your bank account. They instruct you to wire money or Zelle funds to their "approved vendor" for home office equipment. Days later, the bank discovers the check is fraudulent, reverses the deposit, and you are held liable for the lost thousands.',
      prevention:
        'Legitimate companies ship hardware directly from their IT department. Never deposit a check from an employer to forward money elsewhere.',
    },
    {
      title: '2. The Telegram / WhatsApp Impersonator',
      badge: 'High Velocity',
      badgeColor: 'text-amber-400 border-amber-500/40 bg-amber-950/50',
      description:
        'Scammers pose as recruiters from real companies (e.g. Amazon, Google, Pfizer) using names found on LinkedIn. They refuse video calls and conduct a 15-minute text interview on Telegram or WhatsApp before extending an immediate "offer letter".',
      prevention:
        'Real companies never interview solely over Telegram or WhatsApp chat. Always contact the company through their official domain or LinkedIn profile.',
    },
    {
      title: '3. Identity Theft & Premature PII Harvesting',
      badge: 'Data Danger',
      badgeColor: 'text-purple-400 border-purple-500/40 bg-purple-950/50',
      description:
        'Before any formal interview or written offer, the "hiring manager" asks for a copy of your driver’s license (front and back), Social Security Number, or bank account routing numbers under the guise of an "immediate background check".',
      prevention:
        'Never submit SSNs or photo IDs through Google Forms, email, or chat. Real background checks use accredited third-party portals (Checkr, HireRight) with verifiable consent forms.',
    },
    {
      title: '4. The Package Mule / Re-shipping Scheme',
      badge: 'Criminal Liability',
      badgeColor: 'text-rose-400 border-rose-500/40 bg-rose-950/50',
      description:
        'Advertised as "Quality Control Inspector" or "Package Logistics Manager". Packages are shipped to your home; you are told to open, repack, and forward them abroad. The goods were purchased with stolen credit cards, making you an accessory to wire fraud.',
      prevention:
        'Never accept packages at your home address for re-shipping to unfamiliar third parties.',
    },
    {
      title: '5. The Cryptographic "Trial Task" Trap',
      badge: 'Emerging Threat',
      badgeColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/50',
      description:
        'Applicants are asked to "test" a new Web3 dApp or smart contract by connecting their personal crypto wallet (MetaMask, Phantom) or sending a test transaction. The transaction contains a malicious approval that drains all crypto assets.',
      prevention:
        'Never connect personal crypto wallets with funds to unverified web applications for job applications.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto cyber-card p-6 sm:p-8 border border-slate-700 shadow-2xl bg-slate-950 my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                Threat Intelligence Briefing
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Top 5 Employment Fraud Tactics
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              How modern cybercriminals target remote job seekers and how to protect yourself.
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

        {/* Tactics List */}
        <div className="py-6 space-y-4">
          {SCAM_TACTICS.map((tactic, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{tactic.title}</h4>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tactic.badgeColor}`}>
                  {tactic.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tactic.description}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2 text-xs text-emerald-300">
                <span className="font-bold font-mono uppercase text-emerald-400 flex-shrink-0">Defense:</span>
                <span>{tactic.prevention}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition cursor-pointer font-mono"
          >
            Got it, Return to Scanner
          </button>
        </div>

      </div>
    </div>
  );
}
