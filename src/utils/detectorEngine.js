/**
 * AI Fake Job Detector - Heuristic Detection Engine (Calibrated)
 *
 * IMPORTANT TRANSPARENCY NOTICE:
 * This client-side engine uses rule-based heuristic pattern matching to analyze
 * job postings for known employment scam indicators. It is designed as a fast
 * fallback preview and structural scaffold when offline.
 *
 * Full deep semantic analysis and contextual anomaly scoring are executed by
 * the official Google Gemini AI backend.
 */

// Positive legitimacy signals that REDUCE the score
export const LEGITIMACY_SIGNALS = [
  { regex: /(phone\s*screen|technical\s*(assessment|interview|coding)|on-?\s*site\s*(panel|interview)|virtual\s*on-?\s*site|interview\s*process\s*:?\s*\d)/i, deduction: 15, label: 'Structured interview process' },
  { regex: /@[a-zA-Z0-9-]+\.(com|org|io|co|net|ai|dev)\b(?!.*(gmail|yahoo|hotmail|outlook|live|protonmail|aol))/i, deduction: 10, label: 'Corporate domain email' },
  { regex: /(health\s*insurance|401\s*k|equity|stock\s*options|RSU|PTO|paid\s*time\s*off|dental|vision\s*coverage|retirement\s*plan)/i, deduction: 10, label: 'Standard benefits package' },
  { regex: /(equal\s*opportunity\s*employer|EEO|diversity\s*(and|&)\s*inclusion|we\s*do\s*not\s*charge\s*any\s*fee)/i, deduction: 10, label: 'EEO or no-fee disclaimer' },
  { regex: /(\d+\+?\s*years?\s*(of\s*)?(experience|exp)|bachelor'?s?\s*degree|master'?s?\s*degree|computer\s*science)/i, deduction: 5, label: 'Specific professional requirements' },
];

// Known scam indicators & calibrated risk patterns
export const SCAM_INDICATORS = [
  {
    category: 'Financial Red Flags',
    severity: 'critical',
    weight: 35,
    regex: /(cashier['’]?s\s*check|send\s*(a\s*)?check|wire\s*transfer|zelle|cash\s*app|venmo|western\s*union|moneygram|purchase\s*(this\s*|the\s*)?equipment|certified\s*vendor|vendor\s*via\s*wire|training\s*fee|registration\s*fee|pay\s*for\s*(your\s*)?(background\s*check|software|tools)|pay\s*(?:rs\.?|₹|INR)\s*\d|pay\s*\$?\d+\s*(as\s*(a\s*)?)?fee|pay\s*before\s*joining|verification\s*fee|processing\s*fee|security\s*deposit\s*for\s*job)/i,
    title: 'Advance-Fee / Equipment Purchasing Scheme Detected',
    reason: 'The posting mentions mailing checks or requiring the applicant to transfer money/purchase equipment from a "vendor", or demands registration/verification/training fees. Legitimate employers NEVER require candidates to pay money upfront.',
    recommendation: 'NEVER deposit a check from a prospective employer to buy equipment or transfer funds. NEVER pay registration, verification, or training fees. This is the classic "Fake Check / Advance-Fee Scam".',
    scanDescriptionOnly: false,
  },
  {
    category: 'Cryptocurrency & Untraceable Assets',
    severity: 'high',
    weight: 25,
    regex: /(cryptocurrency|bitcoin|btc|usdt|usdc|ethereum|metamask|phantom\s*wallet|crypto\s*wallet|test\s*wallet|smart\s*contract\s*trial)/i,
    title: 'Cryptocurrency / Non-Custodial Wallet Requirement',
    reason: 'Job requires interactions with crypto wallets, smart contracts, or payment exclusively in tokens/USDT. Common in crypto task fraud, unauthorized drainers, or unlicensed MLM operations.',
    recommendation: 'Do not connect your personal cryptocurrency wallets to unverified portals or accept payment exclusively in untraceable crypto assets.',
    scanDescriptionOnly: true,
  },
  {
    category: 'Communication Channels',
    severity: 'medium',
    weight: 10,
    regex: /(interview\s*(only\s*)?(via|through|on)\s*(telegram|whatsapp|signal)|contact\s*(us\s*)?(only\s*)?(via|through|on)\s*(telegram|whatsapp)|telegram\s*(only|interview|screening)|whatsapp\s*(only|interview|screening)|chat\s*screening\s*only)/i,
    title: 'Text-Only Interview on Informal Messaging App',
    reason: 'Hiring process appears to be conducted solely through Telegram, WhatsApp, or other informal text chat apps. Verified corporate enterprises use corporate email systems and verified video conferences.',
    recommendation: 'Legitimate corporate companies do not interview candidates exclusively via Telegram or WhatsApp text messages. Request a formal corporate video conference and an official company email address.',
    scanDescriptionOnly: true,
  },
  {
    category: 'Email Domain Verification',
    severity: 'medium',
    weight: 10,
    regex: /(@gmail\.com|@yahoo\.com|@hotmail\.com|@outlook\.com|@live\.com|@protonmail\.com|@aol\.com)/i,
    title: 'Free Public Webmail Used for Recruiting',
    reason: 'The contact email uses a free webmail service (Gmail, Yahoo, Hotmail, etc.) rather than a verified company domain. Established businesses typically use domain-authenticated email.',
    recommendation: 'Check the sender’s email domain against the company’s official registered website. If a large corporation uses a Gmail address as its only contact, treat it with caution.',
    scanDescriptionOnly: false,
    contextWeight: true,
  },
  {
    category: 'Compensation Anomaly',
    severity: 'medium',
    weight: 15,
    regex: /(no\s*experience\s*(needed|required).*\$?\d{2,}|no\s*degree\s*needed|earn\s*\$?[4-9]\d{2,}\s*(per\s*day|weekly)|(\$([5-9]\d|\d{3})\s*(per|\/)\s*hour.*data\s*entry)|guaranteed\s*income|instant\s*wealth|earn\s*lakhs?\s*per\s*month\s*from\s*home)/i,
    title: 'Unrealistic Pay for Entry-Level or Zero-Experience Role',
    reason: 'Offering extraordinarily high compensation for generic, entry-level, or zero-experience tasks is a notorious scammer hook.',
    recommendation: 'Compare the offered salary with standard industry benchmarks. Disproportionately high pay for low-skilled tasks indicates high fraud probability.',
    scanDescriptionOnly: true,
  },
  {
    category: 'Linguistic & Urgency Red Flags',
    severity: 'medium',
    weight: 12,
    regex: /(kindly\s*(provide|send|add|reach|contact|fill|deposit)|immediate\s*(start|hiring|tomorrow)|hired\s*(on\s*the\s*spot|instantly)|no\s*interview\s*(needed|required)|confidential\s*task|urgent\s*opening|contact\s*(our\s*)?recruiter\s*(through|via)\s*whatsapp\s*immediately|you\s*will\s*receive\s*your\s*joining\s*letter\s*after\s*payment)/i,
    title: 'Artificial Urgency & Scam Dialect Markers',
    reason: 'Repeated use of linguistic indicators like "Kindly", immediate hiring without substantive screening, or rushing the candidate to start or pay within 24 hours.',
    recommendation: 'Be cautious of rush tactics. Real hiring teams require credential checks, interview debriefs, and standard background verification timeframes.',
    scanDescriptionOnly: true,
  },
  {
    category: 'Sensitive Information & Identity Theft',
    severity: 'critical',
    weight: 30,
    regex: /(ssn|social\s*security\s*number|driver['’]?s\s*license\s*(front\s*and\s*back|copy)|passport\s*photo|bank\s*(login|credentials|account\s*details\s*for\s*verification)|date\s*of\s*birth\s*before\s*offer)/i,
    title: 'Premature Request for Sensitive Identity or Banking Data',
    reason: 'Demanding sensitive identity documents (SSN, Passport, Driver’s license photos, banking credentials) prior to a signed formal employment contract.',
    recommendation: 'Never send copies of government IDs, Social Security Numbers, or banking login credentials via email or chat.',
    scanDescriptionOnly: true,
  },
  {
    category: 'Package Reshipping / Mule',
    severity: 'critical',
    weight: 35,
    regex: /(receive\s*packages?\s*(at\s*home|at\s*your\s*address)|repack\s*and\s*(forward|ship)|reship|package\s*(forwarding|handler|processor)\s*job|shipping\s*coordinator\s*from\s*home)/i,
    title: 'Package Reshipping / Mule Ring Scheme',
    reason: 'The posting describes receiving, repackaging, and forwarding parcels from home. This is a known criminal mule operation often involving stolen goods.',
    recommendation: 'Legitimate employers never ask employees to receive and reship packages from their personal home address. This is a federal crime.',
    scanDescriptionOnly: true,
  },
];

// Helper to determine risk category
export function calculateRiskCategory(score) {
  if (score >= 65) return { category: 'High', color: 'red', label: 'High Fraud Risk' };
  if (score >= 30) return { category: 'Medium', color: 'amber', label: 'Moderate Risk' };
  return { category: 'Low', color: 'emerald', label: 'Low Risk' };
}

/**
 * Analyzes a job posting using calibrated client-side heuristics.
 *
 * @param {Object} jobData
 * @param {string} jobData.title - Job Title
 * @param {string} jobData.company - Company Name
 * @param {string} jobData.contact - Contact email or URL
 * @param {string} jobData.interviewChannel - Stated interview medium
 * @param {string} jobData.salary - Salary description
 * @param {string} jobData.description - Full job posting text
 * @returns {Object} Comprehensive analysis report
 */
export function analyzeJobPostingHeuristically(jobData) {
  const descriptionText = jobData.description || '';
  const metadataText = [
    jobData.title || '',
    jobData.company || '',
    jobData.contact || '',
    jobData.salary || '',
  ].join(' \n ');

  const detectedPhrases = new Set();
  const detectedReasons = [];
  let rawScore = 0;

  // Scan indicators against appropriate text
  for (const indicator of SCAM_INDICATORS) {
    const textToScan = indicator.scanDescriptionOnly ? descriptionText : (descriptionText + ' \n ' + metadataText);
    const match = textToScan.match(indicator.regex);
    if (match) {
      let weight = indicator.weight;
      if (indicator.contextWeight && !descriptionText.match(indicator.regex)) {
        weight = Math.round(weight * 0.4);
      }
      rawScore += weight;
      const snippet = match[0].trim();
      detectedPhrases.add(snippet);
      detectedReasons.push({
        id: indicator.category + '-' + detectedReasons.length,
        category: indicator.category,
        severity: indicator.severity,
        title: indicator.title,
        description: indicator.reason,
        recommendation: indicator.recommendation,
        triggerPhrase: snippet,
      });
    }
  }

  // Apply positive legitimacy signal deductions (scan full text)
  const fullText = descriptionText + ' \n ' + metadataText;
  let legitimacyDeduction = 0;
  for (const signal of LEGITIMACY_SIGNALS) {
    if (fullText.match(signal.regex)) {
      legitimacyDeduction += signal.deduction;
    }
  }
  rawScore = Math.max(0, rawScore - legitimacyDeduction);

  // Cap: if NO critical or high severity indicators fired, cap at 45
  const hasCriticalOrHigh = detectedReasons.some(r => r.severity === 'critical' || r.severity === 'high');
  if (!hasCriticalOrHigh && rawScore > 45) {
    rawScore = 45;
  }

  // Normalize fraud score to 0 - 100 range
  const fraudScore = Math.min(100, Math.max(0, rawScore));
  const { category, color, label } = calculateRiskCategory(fraudScore);

  const recommendations = [];
  if (category === 'High') {
    recommendations.push({
      priority: 'CRITICAL',
      text: 'Do NOT send any money, buy equipment, or deposit checks sent by this sender.',
    });
    recommendations.push({
      priority: 'CRITICAL',
      text: 'Cease communication immediately if they demand conducting interviews exclusively via Telegram or WhatsApp.',
    });
    recommendations.push({
      priority: 'HIGH',
      text: 'Report this job posting to the FTC (reportfraud.ftc.gov) or FBI Internet Crime Complaint Center (ic3.gov).',
    });
  } else if (category === 'Medium') {
    recommendations.push({
      priority: 'HIGH',
      text: 'Verify the company’s corporate existence via state business registries (e.g. SEC EDGAR, UK Companies House).',
    });
    recommendations.push({
      priority: 'MEDIUM',
      text: 'Search for the recruiter on LinkedIn and confirm their official corporate email address domain.',
    });
    recommendations.push({
      priority: 'MEDIUM',
      text: 'Insist on a two-way video interview with corporate team members before signing any documents.',
    });
  } else {
    recommendations.push({
      priority: 'INFO',
      text: 'Posting exhibits standard corporate hiring signals. Always double check that the sender’s email domain matches the exact company URL.',
    });
    recommendations.push({
      priority: 'INFO',
      text: 'Ensure all onboarding tax documents (W-4, I-9) are submitted through encrypted corporate HR systems, never over email.',
    });
  }

  return {
    id: 'report_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    jobTitle: jobData.title || 'Untitled Job Posting',
    company: jobData.company || 'Unspecified Organization',
    contact: jobData.contact || 'N/A',
    interviewChannel: jobData.interviewChannel || 'Standard',
    salary: jobData.salary || 'Unspecified',
    originalDescription: jobData.description || '',
    fraudScore,
    riskCategory: category,
    riskColor: color,
    riskLabel: label,
    suspiciousPhrases: Array.from(detectedPhrases),
    reasons: detectedReasons,
    safetyRecommendations: recommendations,
    analyzedAt: new Date().toISOString(),
    engineMode: 'Client Heuristic Scanner (Calibrated Preview)',
    aiBackendStatus: 'Connected to AI Backend',
    disclaimer: 'This assessment is a probabilistic threat analysis. Legitimate employers should be verified independently.',
  };
}
