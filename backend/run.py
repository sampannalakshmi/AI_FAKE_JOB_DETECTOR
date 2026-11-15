"""
AI Fake Job Detector - Backend Server Runner
Starts the FastAPI application using Uvicorn.
"""

import uvicorn
import os
import sys

# Ensure backend root directory is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app.config import settings

def main():
    host = os.getenv("HOST", settings.HOST)
    port = int(os.getenv("PORT", settings.PORT))
    is_prod = os.getenv("ENVIRONMENT", "").lower() == "production"

    print("=" * 65)
    print(" 🛡️  Starting AI Fake Job Detector - Python FastAPI Backend")
    print(f" Host: {host}:{port}")
    print(f" Gemini Model: {settings.GEMINI_MODEL}")
    print(f" Gemini Configured: {'YES (Ready)' if settings.is_gemini_configured else 'NO (Set key in backend/.env)'}")
    print(f" Interactive Swagger API Docs: http://{host}:{port}/docs")
    print("=" * 65)

    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=not is_prod,
    )

if __name__ == "__main__":
    main()
