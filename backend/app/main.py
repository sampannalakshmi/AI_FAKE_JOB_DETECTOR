import logging
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings, save_gemini_key_to_env
from pydantic import BaseModel

class ApiKeyPayload(BaseModel):
    key: str

from app.models.schemas import (
    JobAnalysisRequest,
    JobAnalysisResponse,
    HealthResponse,
)
from app.services.gemini_service import (
    gemini_service,
    GeminiKeyMissingException,
)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai_fake_job_detector")

# Initialize FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Cybersecurity AI Backend for detecting fraudulent employment advertisements using Google Gemini.",
)

# Configure CORS Middleware for Frontend Communication
# Production-ready: supports local dev, Vercel deployments (*.vercel.app), and custom CORS_ORIGINS
configured_origins = settings.cors_origins
wildcard_allowed = "*" in configured_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if wildcard_allowed else configured_origins,
    allow_origin_regex=None if wildcard_allowed else r"https://.*\.vercel\.app|http://localhost:\d+|http://127\.0\.0\.1:\d+",
    allow_credentials=not wildcard_allowed,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
def root():
    """
    Root endpoint confirming backend is active.
    """
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "docs": "/docs",
        "gemini_configured": settings.is_gemini_configured,
    }

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """
    Health check endpoint returning system status and Gemini configuration status.
    Used by the frontend to detect if the backend is connected and if an API key is set.
    """
    is_configured = settings.is_gemini_configured
    msg = (
        "Gemini AI backend is ready and connected."
        if is_configured
        else "Backend is online, but GEMINI_API_KEY is missing in backend/.env. Please configure your key."
    )
    return HealthResponse(
        status="healthy" if is_configured else "configuration_required",
        app=settings.APP_NAME,
        version=settings.APP_VERSION,
        gemini_configured=is_configured,
        model=settings.GEMINI_MODEL,
        message=msg,
    )

@app.post("/api/config/key", tags=["Config"])
def set_api_key(payload: ApiKeyPayload):
    """
    Saves a Gemini API key to backend/.env and reloads it dynamically.
    """
    cleaned = payload.key.strip()
    if not cleaned or len(cleaned) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid Gemini API key. Keys from Google AI Studio typically start with 'AIzaSy' and are at least 30 characters long."
        )
    success = save_gemini_key_to_env(cleaned)
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to write key to backend/.env")
    return {"status": "success", "message": "API key successfully saved to backend/.env and activated!", "gemini_configured": True}

@app.post(
    "/api/analyze",
    response_model=JobAnalysisResponse,
    tags=["Analysis"],
    status_code=status.HTTP_200_OK,
    summary="Analyze job posting with Google Gemini AI",
)
async def analyze_job(request: JobAnalysisRequest):
    """
    Analyzes a job description for employment fraud, advance-fee scams, and suspicious markers.
    Calls Google Gemini via the official Google Gen AI SDK.
    """
    # 1. Validation check
    if not request.description or len(request.description.strip()) < 15:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description must contain at least 15 characters.",
        )

    # 2. Check API key configuration
    if not settings.is_gemini_configured:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "error": "GEMINI_API_KEY_MISSING",
                "message": (
                    "Google Gemini API key is not configured in the backend. "
                    "To enable real AI analysis, open backend/.env and paste your GEMINI_API_KEY. "
                    "Get a key for free at: https://aistudio.google.com/"
                ),
                "setup_guide": "Open backend/.env, set GEMINI_API_KEY=your_key, and save the file.",
            },
        )

    # 3. Perform AI Analysis
    try:
        report = await gemini_service.analyze_job(request)
        return report

    except GeminiKeyMissingException as key_err:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"error": "GEMINI_API_KEY_MISSING", "message": str(key_err)},
        )
    except RuntimeError as run_err:
        logger.error(f"Analysis runtime error: {run_err}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={"error": "AI_INFERENCE_ERROR", "message": str(run_err)},
        )
    except Exception as e:
        logger.error(f"Unexpected backend exception: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": "INTERNAL_SERVER_ERROR", "message": f"Analysis failed: {str(e)}"},
        )
