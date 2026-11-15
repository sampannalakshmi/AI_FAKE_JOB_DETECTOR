import json
import logging
import uuid
from datetime import datetime, timezone
from typing import Dict, Any

from google import genai
from google.genai import types
from google.genai.errors import APIError

from app.config import settings
from app.models.schemas import (
    JobAnalysisRequest,
    JobAnalysisResponse,
    ReasonItem,
    SafetyRecommendationItem,
)

logger = logging.getLogger("uvicorn.error")

SYSTEM_INSTRUCTION = """
You are an expert cybersecurity threat intelligence analyst specializing in employment scam detection and recruitment fraud analysis.
Your mission is to evaluate job advertisements, recruiter messages, and recruitment correspondence to identify indicators of fraud, advance-fee scams, phishing, and identity theft.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCORING CALIBRATION (VERY IMPORTANT — read carefully)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your fraudScore MUST reflect the ACTUAL likelihood the posting is fraudulent based on evidence in the text. Use this rubric:

 Score  0–15  (LOW)  → Legitimate corporate posting. Has: structured multi-stage interview process, corporate domain email, standard benefits, equity/stock, EEO/diversity statement, no payment demands, professional requirements and qualifications. The presence of salary details, company descriptions, technology stacks, specific job responsibilities, and professional requirements are NORMAL and are NOT fraud indicators.

 Score 16–35  (LOW)  → Mostly legitimate but has one or two minor informality signals (e.g., vague role scope OR missing company details). No payment demands, no PII overreach.

 Score 36–55  (MEDIUM) → Mixed signals. Some informality combined with weak red flags (e.g., only free webmail contact AND vague job duties AND no clear interview process), but NO critical fraud vectors like advance fees or PII theft.

 Score 56–75  (MEDIUM-HIGH) → Multiple concrete red flags present (e.g., informal-channel-only interviews PLUS unrealistic pay PLUS urgency language), but no confirmed critical scam vectors.

 Score 76–100 (HIGH)  → Clear fraud indicators: advance payment/registration fees demanded, sensitive PII requested before offer, package reshipping scheme, or crypto wallet connection required. Multiple critical vectors confirmed.

CRITICAL CALIBRATION RULES:
• A well-structured corporate job posting from a known company (Stripe, Google, Amazon, Microsoft, TCS, Infosys, etc.) with formal interview stages, corporate email, and standard benefits should score 0–15 (LOW). Do NOT inflate scores for legitimate postings.
• Salary information, company background descriptions, team descriptions, and benefit details are STANDARD parts of job postings — they are NOT suspicious.
• Contact email addresses, interview channels, and salary fields are metadata — only flag them if the DESCRIPTION BODY itself shows red flags in combination.
• "WhatsApp" or "Telegram" is only suspicious when it is the SOLE interview/communication method AND is combined with other red flags (urgency, fees, etc.). Mentioning these as one of multiple contact channels is not suspicious.
• A job posting mentioning a formal phone screen, technical assessment, and on-site panel interview is exhibiting POSITIVE legitimacy signals.
• An EEO (Equal Opportunity Employer) statement, benefits package, or equity compensation is a STRONG positive signal of legitimacy.
• Registration fees, advance payments, equipment purchase demands, and "pay before joining" are CRITICAL fraud indicators (add 30–40 points each).
• Requests for SSN, passport photos, bank credentials, or government ID copies before an official offer letter are CRITICAL identity theft indicators (add 30–40 points each).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAUD INDICATOR CATEGORIES (weight guidance)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL (each adds 30-40 points):
   - Advance-Fee / Equipment Scams: Mailing checks, purchasing equipment from "certified vendors", wire transfers, Zelle, CashApp, registration fees, training fees, "pay before joining".
   - Sensitive PII Overreach: Asking for SSN, photo IDs (passport/driver's license front and back), or bank logins BEFORE a formal signed offer.
   - Package Reshipping / Mule rings: Receiving packages at home to repack and forward abroad.
   - Crypto / Web3 Drains: Demanding candidates connect non-custodial wallets (MetaMask/Phantom) for trial tasks.

HIGH (each adds 15-25 points):
   - Untraceable Communication as SOLE method: Mandatory interviews conducted EXCLUSIVELY via Telegram, WhatsApp, Signal, or text chat with NO corporate email or video option.
   - Public Free Webmail ONLY: Recruiters claiming Fortune 500/enterprise representation using ONLY @gmail.com, @yahoo.com, etc. with no corporate email anywhere.

MEDIUM (each adds 5-15 points):
   - Compensation Anomalies: Unrealistic high pay ($60-$100/hr) for low-skill/entry-level data entry with "no experience needed".
   - Urgency Tactics: "Immediate start", "hired on the spot", "no interview needed".
   - Vague role descriptions with no specific responsibilities.

POSITIVE SIGNALS (each SUBTRACTS 5-15 points from the total):
   - Structured multi-stage interview process (phone screen → technical → onsite)
   - Corporate domain email mentioned (@company.com)
   - Standard benefits (health insurance, 401k, equity, PTO)
   - EEO / Equal Opportunity statement
   - Specific technical requirements and years of experience
   - "We do not charge any fees" disclaimer
   - Professional job responsibilities and team structure described

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tone and Objectivity:
   - Objectively state evidence found in the text.
   - Quote exact suspicious phrases directly from the posting where applicable.
   - Never state that an AI analysis mathematically "proves" a job is definitively fraudulent or genuine. Frame all evaluations as probabilistic risk indicators and threat assessments.
   - For LOW risk postings, you may still provide 1-2 general safety recommendations (e.g., verify company domain, ensure tax forms go through encrypted portals) with INFO priority.

Output Format:
   You MUST return a valid JSON object matching this exact schema:
   {
     "fraudScore": <integer 0-100>,
     "riskCategory": "<LOW, MEDIUM, or HIGH>",
     "suspiciousPhrases": ["<exact quote 1>", "<exact quote 2>"],
     "reasons": [
       {
         "category": "<e.g. Financial Red Flags, Communication Channels, Urgency Tactics, Compensation Anomaly, Identity Overreach, Legitimacy Signals>",
         "severity": "<critical, high, medium, low, or positive>",
         "title": "<Concise title of the risk or positive signal>",
         "description": "<Detailed explanation of the risk vector or legitimacy indicator>",
         "recommendation": "<Specific defensive advice for this risk>",
         "triggerPhrase": "<Quote or pattern that triggered this>"
       }
     ],
     "safetyRecommendations": [
       {
         "priority": "<CRITICAL, HIGH, MEDIUM, or INFO>",
         "text": "<Clear, actionable safety instruction for the job seeker>"
       }
     ]
   }
"""

class GeminiKeyMissingException(Exception):
    """Raised when the GEMINI_API_KEY is not configured in backend/.env"""
    pass

class GeminiService:
    def __init__(self):
        self._client = None
        self._last_key = None

    def get_client(self) -> genai.Client:
        """
        Lazily initialize and return the official Google Gen AI Client.
        Ensures the API key is validated before invoking the model and updates
        dynamically if a new key is saved to backend/.env.
        """
        if not settings.is_gemini_configured:
            raise GeminiKeyMissingException(
                "Gemini API key is missing or not configured. "
                "Please open backend/.env and set GEMINI_API_KEY=your_actual_key from https://aistudio.google.com/"
            )
        
        current_key = settings.GEMINI_API_KEY
        if self._client is None or self._last_key != current_key:
            self._client = genai.Client(api_key=current_key)
            self._last_key = current_key
            
        return self._client

    async def analyze_job(self, request: JobAnalysisRequest) -> JobAnalysisResponse:
        """
        Submits job details to Google Gemini via the official Google Gen AI SDK
        and parses the structured threat intelligence report.
        """
        client = self.get_client()

        prompt = f"""
Please analyze the following job posting advertisement for potential employment fraud, scam indicators, and suspicious practices:

Job Title: {request.title or 'Not specified'}
Company Name: {request.company or 'Not specified'}
Contact Email / URL: {request.contact or 'Not specified'}
Stated Interview Channel: {request.interviewChannel or 'Standard'}
Compensation / Salary: {request.salary or 'Not specified'}

Full Job Description & Instructions:
\"\"\"
{request.description}
\"\"\"

Analyze the text thoroughly according to your threat intelligence guidelines and return the required structured JSON object.
"""

        # Fallback chain of modern Gemini models
        preferred_model = settings.GEMINI_MODEL
        model_candidates = [preferred_model] + [
            m for m in ["gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.7-flash", "gemini-3.8-flash"]
            if m != preferred_model
        ]

        last_err = None
        data = None
        active_model = preferred_model

        for model_name in model_candidates:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_INSTRUCTION,
                        response_mime_type="application/json",
                        temperature=0.2,
                    ),
                )

                response_text = response.text.strip()
                # Clean any markdown code blocks if returned
                if response_text.startswith("```"):
                    response_text = response_text.strip("`")
                    if response_text.startswith("json"):
                        response_text = response_text[4:].strip()

                data = json.loads(response_text)
                active_model = model_name
                break
            except Exception as e:
                logger.warning(f"Model {model_name} attempt failed: {e}. Trying next candidate...")
                last_err = e
                continue

        if data is None:
            logger.error(f"All Gemini model candidates failed: {last_err}")
            raise RuntimeError(f"Google Gemini AI error: {str(last_err)}")

        # Normalize score and category
        score = max(0, min(100, int(data.get("fraudScore", 50))))
        category = str(data.get("riskCategory", "MEDIUM")).upper()
        if category not in ["LOW", "MEDIUM", "HIGH"]:
            if score >= 65:
                category = "HIGH"
            elif score >= 30:
                category = "MEDIUM"
            else:
                category = "LOW"

        # Theme color and friendly label
        color_map = {
            "HIGH": ("red", "High Fraud Risk"),
            "MEDIUM": ("amber", "Moderate Risk"),
            "LOW": ("emerald", "Low Risk Profile"),
        }
        risk_color, risk_label = color_map.get(category, ("amber", "Moderate Risk"))

        # Parse reasons
        reasons = []
        for r in data.get("reasons", []):
            reasons.append(
                ReasonItem(
                    category=r.get("category", "General Anomaly"),
                    severity=r.get("severity", "medium").lower(),
                    title=r.get("title", "Suspicious Indicator Flagged"),
                    description=r.get("description", "Potential concern identified in posting structure."),
                    recommendation=r.get("recommendation"),
                    triggerPhrase=r.get("triggerPhrase"),
                )
            )

        # Parse safety recommendations
        recommendations = []
        for s in data.get("safetyRecommendations", []):
            recommendations.append(
                SafetyRecommendationItem(
                    priority=s.get("priority", "HIGH").upper(),
                    text=s.get("text", "Perform independent employer verification."),
                )
            )

        # Fallback if AI returned empty recommendation list
        if not recommendations:
            recommendations.append(
                SafetyRecommendationItem(
                    priority="HIGH",
                    text="Verify corporate existence via official state registrar before sharing personal details.",
                )
            )

        return JobAnalysisResponse(
            id=f"rep_{uuid.uuid4().hex[:10]}",
            jobTitle=request.title or "Untitled Job Posting",
            company=request.company or "Unspecified Organization",
            contact=request.contact or "N/A",
            interviewChannel=request.interviewChannel or "Standard",
            salary=request.salary or "Unspecified",
            fraudScore=score,
            riskCategory=category,
            riskColor=risk_color,
            riskLabel=risk_label,
            suspiciousPhrases=data.get("suspiciousPhrases", []),
            reasons=reasons,
            safetyRecommendations=recommendations,
            analyzedAt=datetime.now(timezone.utc).isoformat(),
            engineMode=f"Google Gemini AI ({active_model})",
            aiBackendStatus="CONNECTED",
        )

# Singleton service instance
gemini_service = GeminiService()
