import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Locate backend .env file
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_PATH = BASE_DIR / ".env"

def reload_env():
    """Reloads the .env file with override enabled."""
    if ENV_PATH.exists():
        load_dotenv(dotenv_path=ENV_PATH, override=True)

# Initial load
reload_env()

class Settings:
    """
    Application configuration dynamically loaded from backend/.env.
    Keeps API keys isolated from client code and reloads automatically on change.
    """
    APP_NAME: str = "AI Fake Job Detector API"
    APP_VERSION: str = "1.0.0"
    
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    CORS_ORIGINS_RAW: str = os.getenv(
        "CORS_ORIGINS", 
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173"
    )

    @property
    def GEMINI_API_KEY(self) -> str:
        reload_env()
        return os.getenv("GEMINI_API_KEY", "").strip()

    @property
    def GEMINI_MODEL(self) -> str:
        reload_env()
        return os.getenv("GEMINI_MODEL", "gemini-3.8-flash").strip()

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS_RAW.split(",") if origin.strip()]

    @property
    def is_gemini_configured(self) -> bool:
        """Returns True if a valid non-placeholder API key is set."""
        key = self.GEMINI_API_KEY
        return bool(key and key != "your_gemini_api_key_here" and len(key) > 10)

settings = Settings()
