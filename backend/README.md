# 🐍 AI Fake Job Detector - Python FastAPI Backend

> **High-Performance Threat Intelligence API powered by FastAPI, Pydantic, and Google Gemini AI.**

---

## 🎯 Purpose & Architecture

This backend serves as the secure AI inference layer for the **AI Fake Job Detector**. It receives job advertisement details from the React frontend, evaluates them using **Google Gemini** via the official **Google Gen AI Python SDK (`google-genai`)**, and returns structured threat intelligence JSON reports.

### 🔒 Security Principles
1. **Zero Key Exposure:** The `GEMINI_API_KEY` is loaded securely on the server from `backend/.env`. It is never transmitted to or visible in client-side frontend code.
2. **AI Integrity:** The backend never fabricates fake AI results. If the API key is unconfigured, it returns a structured setup guide (`503 Service Unavailable`).
3. **Legal & Security Disclaimer:** All threat assessments are framed as probabilistic risk estimates and heuristic indicators—never as mathematical proof that a job is genuine or fraudulent.

---

## 📂 File Structure & Code Explanation

```
backend/
├── .env.example               # Template environment configuration
├── .env                       # Local secrets file (NEVER committed to Git)
├── .gitignore                 # Prevents secrets and __pycache__ from being tracked
├── requirements.txt           # Python package dependencies
├── run.py                     # Convenience runner script (Uvicorn server)
├── start-backend.bat          # 1-click Windows launcher
└── app/
    ├── __init__.py            # Declares app as a Python package
    ├── config.py              # Loads .env variables via python-dotenv
    ├── main.py                # FastAPI app, CORS middleware, and API endpoints
    ├── models/
    │   ├── __init__.py
    │   └── schemas.py         # Pydantic data schemas for requests and responses
    └── services/
        ├── __init__.py
        └── gemini_service.py  # Google Gemini AI SDK integration and prompt orchestration
```

### 🧠 Understanding Key Files (Beginner's Guide)

#### 1. `app/config.py`
- Uses `python-dotenv` to read `backend/.env` without hardcoding sensitive strings.
- Provides `settings.is_gemini_configured` to check if a valid API key has been added.

#### 2. `app/models/schemas.py`
- Built using **Pydantic**, Python's industry standard for data validation.
- Defines `JobAnalysisRequest`: validates that the job description has sufficient text.
- Defines `JobAnalysisResponse`: guarantees the shape of the JSON response (fraudScore, riskCategory, suspiciousPhrases, reasons, safetyRecommendations).

#### 3. `app/services/gemini_service.py`
- Integrates the **official Google Gen AI Python SDK (`google-genai`)**.
- Uses `client = genai.Client(api_key=...)`.
- Sends a specialized cybersecurity threat intelligence prompt with `response_mime_type="application/json"`.
- Parses the returned structured JSON and maps it to the `JobAnalysisResponse` schema.

#### 4. `app/main.py`
- The core FastAPI application.
- Configures **CORS (Cross-Origin Resource Sharing)** so your React frontend running on port 3000 can talk to FastAPI running on port 8000.
- Endpoints:
  - `GET /api/health`: Confirms system status and tells the frontend if Gemini is ready.
  - `POST /api/analyze`: Ingests job data and returns the threat assessment.

---

## 🚀 How to Run the Backend

### Step 1: Add Your Gemini API Key
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/).
2. Open `backend/.env` in your editor and paste your key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Step 2: Start the Backend Server
Run:
```bash
python run.py
```
*(Or double-click `start-backend.bat` on Windows)*

The server will start at:
- **API Base:** `http://127.0.0.1:8000`
- **Interactive Swagger Documentation:** `http://127.0.0.1:8000/docs`
- **Alternative ReDoc:** `http://127.0.0.1:8000/redoc`

---

## 🔌 API Endpoints Reference

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Response:**
  ```json
  {
    "status": "healthy",
    "app": "AI Fake Job Detector API",
    "version": "1.0.0",
    "gemini_configured": true,
    "model": "gemini-2.5-flash",
    "message": "Gemini AI backend is ready and connected."
  }
  ```

### 2. Analyze Job Posting
- **Endpoint:** `POST /api/analyze`
- **Headers:** `Content-Type: application/json`
- **Sample Request Body:**
  ```json
  {
    "title": "Remote Executive Assistant",
    "company": "Apex Logistics",
    "contact": "hr@gmail.com",
    "interviewChannel": "telegram",
    "salary": "$65/hr",
    "description": "We will mail a cashier's check to purchase home office gear from our certified vendor via wire transfer."
  }
  ```
- **Sample Response Body:**
  ```json
  {
    "id": "rep_a1b2c3d4e5",
    "jobTitle": "Remote Executive Assistant",
    "company": "Apex Logistics",
    "fraudScore": 92,
    "riskCategory": "HIGH",
    "riskColor": "red",
    "riskLabel": "High Fraud Risk",
    "suspiciousPhrases": ["cashier's check", "vendor via wire", "Telegram"],
    "reasons": [
      {
        "category": "Financial Red Flags",
        "severity": "critical",
        "title": "Advance-Fee Check Scheme",
        "description": "Mailing a check to purchase equipment from a specified vendor is the hallmark of a counterfeit check scam.",
        "triggerPhrase": "cashier's check"
      }
    ],
    "safetyRecommendations": [
      {
        "priority": "CRITICAL",
        "text": "Never deposit checks sent by an employer to wire money elsewhere."
      }
    ],
    "engineMode": "Google Gemini AI (gemini-2.5-flash)",
    "aiBackendStatus": "CONNECTED"
  }
  ```
