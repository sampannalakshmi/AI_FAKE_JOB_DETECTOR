/**
 * Realistic job posting samples for testing the AI Fake Job Detector frontend.
 * Covers:
 * 1. High-risk employment scam (Equipment check / advance fee / Telegram)
 * 2. Medium-risk suspicious posting (Crypto MLM / WhatsApp / Vague credentials)
 * 3. Low-risk legitimate corporate posting (Authentic hiring lifecycle)
 */

export const SAMPLE_JOBS = [
  {
    id: 'sample-high-risk',
    badge: '🚨 Critical Scam Sample',
    title: 'Remote Executive Assistant & Data Entry Specialist',
    company: 'Apex Global Logistics Solutions Inc.',
    contact: 'hr.apexlogistics.careers@gmail.com',
    interviewChannel: 'telegram',
    salary: '$65.00 / hour ($135,000 / year) - No Experience Required',
    description: `Position: Remote Executive Data Entry Clerk & Administrative Support
Compensation: $65.00 per hour (Paid weekly via direct deposit or check)
Hours: Flexible 20-40 hours per week (Full-time or Part-time)

About the Opportunity:
Apex Global Logistics is expanding rapidly and currently hiring motivated remote staff immediately! No prior experience or degree needed — complete paid virtual training will be provided.

Responsibilities:
- Input customer shipping records into our proprietary software.
- Review spreadsheets and verify vendor addresses.
- Manage confidential correspondence and company email schedules.

Interview Process:
Due to high applicant volume, interviews are conducted strictly via Telegram Messenger text chat for rapid processing. Kindly add our Senior Talent Acquisition Director on Telegram: @ApexRecruiterDave_HR to start your immediate screening.

Home Office Setup & Equipment:
A full remote workstation (Apple MacBook Pro 16", dual 4K monitors, laser printer, and encrypted communication software) will be provided. Upon passing the 15-minute Telegram screening, a cashier's check will be mailed to your home address to purchase this equipment from our certified vendor via wire transfer or Zelle.

Requirements:
- Must have a reliable internet connection.
- Kindly provide your full legal name, home address, and current mobile number for instant background verification.
- You must be ready to start work immediately tomorrow!`,
  },
  {
    id: 'sample-medium-risk',
    badge: '⚠️ Moderate Risk Sample',
    title: 'Junior Web3 Community Manager & Growth Specialist',
    company: 'NovaVerse Decentralized Labs',
    contact: 'team@novaverse-talent.online',
    interviewChannel: 'whatsapp',
    salary: '$4,500 - $7,000 / month + Token Allocation',
    description: `NovaVerse is seeking an energetic Junior Web3 Community Specialist to moderate our community channels and manage growth campaigns.

Key Responsibilities:
- Manage daily Telegram and Discord community chatter.
- Assist in promoting our decentralized utility token presale.
- Onboard new users and distribute promotional task bonuses.

Qualifications:
- Must be active on WhatsApp and Telegram.
- Familiarity with non-custodial crypto wallets (MetaMask / Phantom).
- Willing to accept compensation in USDT or USDC stablecoins.

Hiring Process:
- Fast-track review via WhatsApp voice note or message.
- Candidates will be required to perform a trial task involving interacting with our beta decentralized application smart contract using a personal test wallet.
- No formal corporate registration required. Immediate onboarding.`,
  },
  {
    id: 'sample-low-risk',
    badge: '✅ Legitimate Corporate Sample',
    title: 'Senior Frontend Engineer (React & TypeScript)',
    company: 'Stripe Payments Enterprise',
    contact: 'careers@stripe.com',
    interviewChannel: 'video',
    salary: '$165,000 - $195,000 / year + Equity + Full Benefits',
    description: `About the Role:
At Stripe, we build financial infrastructure for the internet. Millions of companies—from the world’s largest enterprises to ambitious startups—use Stripe software to accept payments and manage their businesses online.

We are looking for a Senior Frontend Engineer to join our Core Dashboard engineering team. You will lead the architecture of our user-facing analytics portal, building responsive, accessible, and high-performance user interfaces in React and TypeScript.

What you'll do:
- Collaborate with product designers and backend engineers to build intuitive payment management workflows.
- Architect reusable component libraries and improve frontend build tooling and performance.
- Champion frontend best practices, automated unit and integration testing, and accessibility (WCAG 2.1 AA).

Requirements:
- 5+ years of experience developing modern web applications with React, TypeScript, and modern CSS frameworks.
- Strong understanding of asynchronous state management, browser networking, and web security principles (CORS, CSP, XSS prevention).
- Excellent written and verbal communication skills.
- Bachelor's degree in Computer Science, related field, or equivalent practical experience.

Interview Process:
1. 30-minute initial phone screen with a Stripe Technical Recruiter.
2. 60-minute technical coding assessment with a Senior Engineer via Zoom and CoderPad.
3. Virtual on-site panel (System Architecture, Pair Programming, and Values Alignment).

Equal Opportunity Employer:
Stripe does not charge any application or equipment fees. All official communications originate strictly from @stripe.com domains. All equipment is provisioned directly by Stripe IT and shipped pre-configured at no cost to the employee.`,
  },
];
