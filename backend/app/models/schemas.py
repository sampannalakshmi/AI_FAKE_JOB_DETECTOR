from typing import List, Optional
from pydantic import BaseModel, Field

class JobAnalysisRequest(BaseModel):
    """
    Input schema sent from the React frontend.
    """
    title: Optional[str] = Field(default="", description="Job Title advertised")
    company: Optional[str] = Field(default="", description="Company or recruiter organization name")
    description: str = Field(..., min_length=15, description="Full job advertisement text")
    contact: Optional[str] = Field(default="", description="Recruiter contact email or URL")
    interviewChannel: Optional[str] = Field(default="standard", description="Stated interview medium")
    salary: Optional[str] = Field(default="", description="Stated salary or compensation")

class ReasonItem(BaseModel):
    """
    A specific reason explaining an aspect of the risk assessment.
    """
    category: str = Field(..., description="Risk category: Financial, Communication, Urgency, Identity, etc.")
    severity: str = Field(..., description="Severity level: critical, high, medium, low")
    title: str = Field(..., description="Short summary of the risk indicator")
    description: str = Field(..., description="Detailed rationale explaining why this is suspicious")
    recommendation: Optional[str] = Field(default=None, description="Guidance addressing this specific risk")
    triggerPhrase: Optional[str] = Field(default=None, description="Key phrase or pattern from text that triggered this flag")

class SafetyRecommendationItem(BaseModel):
    """
    Actionable safety precaution for the job seeker.
    """
    priority: str = Field(..., description="Priority level: CRITICAL, HIGH, MEDIUM, INFO")
    text: str = Field(..., description="Actionable safety guidance")

class JobAnalysisResponse(BaseModel):
    """
    Standardized threat intelligence report returned to the frontend.
    """
    id: str
    jobTitle: str
    company: str
    contact: str
    interviewChannel: str
    salary: str
    fraudScore: int = Field(..., ge=0, le=100, description="Estimated fraud risk score from 0 to 100")
    riskCategory: str = Field(..., description="Risk category: LOW, MEDIUM, or HIGH")
    riskColor: str = Field(..., description="UI theme color: emerald, amber, red")
    riskLabel: str = Field(..., description="Human-friendly badge label")
    suspiciousPhrases: List[str] = Field(default_factory=list, description="Suspicious phrases extracted from posting")
    reasons: List[ReasonItem] = Field(default_factory=list, description="Detailed reasons for the risk score")
    safetyRecommendations: List[SafetyRecommendationItem] = Field(default_factory=list, description="Actionable safety guidance")
    analyzedAt: str
    engineMode: str = "Google Gemini AI (Official Google Gen AI SDK)"
    aiBackendStatus: str = "CONNECTED"
    disclaimer: str = (
        "Notice: This assessment is an AI-generated risk estimate based on linguistic patterns and common "
        "employment scam heuristics. It does not prove that a job is fraudulent or genuine. Always perform "
        "independent due diligence before sharing sensitive information or accepting offers."
    )

class HealthResponse(BaseModel):
    """
    Health check and configuration status schema.
    """
    status: str
    app: str
    version: str
    gemini_configured: bool
    model: str
    message: str
