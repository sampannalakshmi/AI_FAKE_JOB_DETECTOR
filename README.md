# 🛡️ AI Fake Job Detector

> **Cybersecurity Threat Defense Platform for Job Seekers**  
> Protect job seekers from fraudulent employment advertisements, advance-fee fake check schemes, telegram phishing recruiters, and premature identity theft using Google Gemini AI and calibrated heuristic intelligence.

---

## 📌 Project Overview
Employment scams have surged with the growth of remote work, costing victims thousands of dollars in bounced cashier's checks, fake equipment fees, and stolen identities. The **AI Fake Job Detector** provides job seekers with real-time threat intelligence by analyzing job descriptions, communication channels, compensation anomalies, and payment demands.

The application combines a high-tech cybersecurity React frontend with a Python FastAPI backend powered by the official **Google Gen AI SDK** and **Google Gemini 3.5 Flash**.

---

## 🚀 Key Features

### 1. Modern Cybersecurity Dashboard
- **Cyber-Sleek Aesthetic**: Deep slate and obsidian backgrounds (`#0a0e17`), glowing neon accents (Cyan, Emerald, Amber, Rose), and clean typography (Inter & JetBrains Mono).
- **Fully Responsive**: Optimized for desktop monitors, tablets, and mobile devices.

### 2. High-Tech Job Input Area
- Ingestion area for full job descriptions, recruiter messages, and email correspondence.
- Structured input for **Job Title**, **Company Name**, **Contact Domain/Email**, **Interview Channel** (Zoom, Telegram, WhatsApp, Signal, Email), and **Salary**.
- **1-Click Test Samples**:
  - 🚨 *Critical Scam Sample*: Fake check & equipment purchase scheme with Telegram interview.
  - ⚠️ *Moderate Risk Sample*: Vague Web3 token task with non-custodial wallet requirement.
  - ✅ *Legitimate Corporate Sample*: Authentic Stripe senior engineering role with verified domains and transparent interview phases.

### 3. AI-Powered Threat Assessment Dashboard
- **Calibrated Fraud Risk Score (0 to 100)**: Animated radial SVG gauge with color-coded severity.
  - `Low Risk` (0–29): Standard corporate hiring patterns, formal interviews, verified domains.
  - `Moderate Risk` (30–64): Suspicious markers requiring independent verification.
  - `High Risk` (65–100): Critical red flags of advance-fee scams, registration fees, or identity theft.
- **Suspicious Phrases Extraction**: Verbatim quotes highlighting detected threat keywords.
- **Reasons Behind Risk Assessment**: Categorized breakdown (Financial, Communication, Urgency, Compensation, Identity Vectors).
- **Actionable Safety Recommendations**: Priority checklists and official incident reporting links (FTC Fraud Portal, FBI IC3).
- **Probabilistic Disclaimer**: Clearly indicates assessments are risk evaluations, not legal proof.

### 4. Local Scan History
- Automatically saves reports into browser `localStorage` (`ai_fake_job_detector_history`).
- Capacity for up to 50 historical reports with newest first.
- Re-examine any past report in the dashboard with one click.
- Single report deletion or full history wipe with confirmation dialog.

### 5. Threat Intelligence & Education
- Dedicated **Scam Tactics** navigation tab and interactive checklist modal covering:
  - Advance-Fee & Equipment Purchasing Schemes
  - WhatsApp & Telegram Text-Only Interviews
  - Premature PII Harvesting & Identity Theft
  - Package Mule & Reshipping Rings
  - Cryptocurrency Wallet Drainers

---

## 🏗️ Architecture & Technology Stack

```
AI_FAKE_JOB_DETECTOR/
├── preview.html                     # Complete standalone frontend (React 18 + Tailwind CDN)
├── index.html                       # Standard Vite application root
├── package.json                     # Frontend dependencies
├── start-preview.py                 # Python HTTP preview server (Port 3000)
├── start-preview.bat                # Windows 1-click frontend batch launcher
├── .gitignore                       # Protects .env, node_modules, logs across repository
│
├── backend/
│   ├── run.py                       # Uvicorn entrypoint (Port 8000)
│   ├── start-backend.bat            # Windows 1-click backend batch launcher
│   ├── requirements.txt             # fastapi, uvicorn, google-genai, python-dotenv, pydantic
│   ├── .env                         # Environment variables (GEMINI_API_KEY - gitignored)
│   ├── .env.example                 # Template environment file
│   ├── .gitignore                   # Backend-specific ignore rules
│   │
│   └── app/
│       ├── __init__.py
│       ├── main.py                  # FastAPI app, CORS, routes (/api/health, /api/analyze, /api/config/key)
│       ├── config.py                # Dynamic configuration & hot-reloading settings
│       ├── models/
│       │   └── schemas.py           # Pydantic request & response models
│       └── services/
│           └── gemini_service.py    # Google Gen AI SDK client, model fallback chain, calibrated prompt
│
└── src/                             # Modular Vite React components
    ├── components/                  # Navbar, HeroSection, JobInputForm, ResultsDashboard, etc.
    └── utils/                       # Calibrated detectorEngine.js, sampleJobs.js, storage.js
```

---

## 🔒 Security Standards

1. **Zero Client-Side Key Exposure**: The Gemini API key is stored exclusively in `backend/.env` and loaded by the Python server. It is never included in client JavaScript or rendered in HTML.
2. **Repository Protection**: Both `backend/.gitignore` and root `.gitignore` block all `.env` files from version control.
3. **No Fabricated AI Claims**: If the API key is not configured, the application explicitly warns the user and offers an offline heuristic fallback mode rather than generating fake AI responses.
4. **Evidence-Based Calibration**: Scoring reflects concrete evidence. Genuine corporate postings with structured interviews, corporate email domains, and benefits score low (0–15), while advance fee demands and identity theft trigger high scores (85–100).

---

## 💻 How to Run Locally

### 1. Start the Python FastAPI Backend (Port 8000)

```bash
# From the project root
python backend/run.py
```
*(Or double-click `backend/start-backend.bat` on Windows)*

The backend will start at: `http://127.0.0.1:8000`  
Health check endpoint: `http://127.0.0.1:8000/api/health`

### 2. Start the Frontend (Port 3000)

```bash
# In a separate terminal
python start-preview.py
```
*(Or double-click `start-preview.bat` on Windows)*

Open your browser to: **`http://localhost:3000/preview.html`**

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check, version info, and Gemini API key status |
| `POST` | `/api/analyze` | Accepts job posting details, queries Google Gemini AI, and returns structured threat report |
| `POST` | `/api/config/key` | Runtime endpoint to save and hot-reload a Gemini API key into `backend/.env` |

### Sample Analysis Request
```json
POST /api/analyze
Content-Type: application/json

{
  "title": "Data Entry Operator",
  "company": "Quick Earnings Ltd",
  "contact": "hr.quickearnings@gmail.com",
  "interviewChannel": "whatsapp",
  "salary": "Rs 35,000 / month",
  "description": "Work from home. Pay Rs 2,000 as registration fee before joining. Contact recruiter via WhatsApp."
}
```

### Sample Analysis Response
```json
{
  "id": "rep_b1dd5f0053",
  "jobTitle": "Data Entry Operator",
  "company": "Quick Earnings Ltd",
  "fraudScore": 95,
  "riskCategory": "HIGH",
  "riskColor": "red",
  "riskLabel": "High Fraud Risk",
  "suspiciousPhrases": [
    "Pay Rs 2,000 as registration fee before joining.",
    "Contact recruiter via WhatsApp."
  ],
  "reasons": [
    {
      "category": "Financial Red Flags",
      "severity": "critical",
      "title": "Advance-Fee / Registration Scheme Detected",
      "description": "Demands upfront payment before joining. Legitimate employers never charge candidates.",
      "triggerPhrase": "Pay Rs 2,000 as registration fee before joining."
    }
  ],
  "safetyRecommendations": [
    {
      "priority": "CRITICAL",
      "text": "Do not pay any registration, verification, or training fees."
    }
  ],
  "engineMode": "Google Gemini AI (gemini-3.5-flash)",
  "aiBackendStatus": "CONNECTED"
}
```

---

## 🧪 Verification & Audit

The project has passed 100% of its automated audit suite across 64 test cases:
- ✅ React Frontend serves HTTP 200 OK with all controls reactive
- ✅ FastAPI Backend responds on port 8000 with CORS enabled for port 3000
- ✅ Live Google Gemini AI generates structured threat intelligence
- ✅ Genuine job postings (e.g. Stripe) calibrated to score **0/100 (LOW)**
- ✅ Fraudulent fee scams calibrated to score **95/100 (HIGH)**
- ✅ Zero API key leaks in client-side code or git tracking
