import urllib.request
import urllib.error
import json
import os
import sys

def run_tests():
    results = {}
    
    # 1. Frontend Test
    print("Testing 1. React frontend...")
    try:
        req = urllib.request.urlopen("http://localhost:3000/preview.html", timeout=5)
        content = req.read().decode("utf-8")
        results["frontend_status"] = req.status
        results["frontend_has_title"] = "AI Fake Job Detector" in content
        results["frontend_has_root"] = 'id="root"' in content
        results["frontend_size"] = len(content)
        print(f" -> Frontend HTTP: {req.status}, Size: {len(content)} bytes")
    except Exception as e:
        results["frontend_error"] = str(e)
        print(f" -> Frontend Error: {e}")

    # 2. Backend Server & Health Check
    print("\nTesting 2. FastAPI backend & health check...")
    try:
        req = urllib.request.urlopen("http://127.0.0.1:8000/api/health", timeout=5)
        content = json.loads(req.read().decode("utf-8"))
        results["backend_status"] = req.status
        results["backend_health"] = content
        print(f" -> Backend HTTP: {req.status}, Body: {content}")
    except Exception as e:
        results["backend_error"] = str(e)
        print(f" -> Backend Error: {e}")

    # 3. Analyze Endpoint without Key
    print("\nTesting 3. /api/analyze endpoint with sample data...")
    payload = json.dumps({
        "title": "Remote Data Entry Clerk",
        "company": "Apex Logistics Solutions",
        "contact": "hr@gmail.com",
        "interviewChannel": "telegram",
        "salary": "$65/hour",
        "description": "We will mail a cashier's check to purchase workstation equipment from our certified vendor via wire transfer or Zelle."
    }).encode("utf-8")

    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/analyze",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            results["analyze_status"] = resp.status
            results["analyze_response"] = data
            print(f" -> Analyze returned 200 OK: Fraud Score: {data.get('fraudScore')}")
    except urllib.error.HTTPError as he:
        body = json.loads(he.read().decode("utf-8"))
        results["analyze_status"] = he.code
        results["analyze_error"] = body
        print(f" -> Analyze returned HTTP {he.code}: {body}")
    except Exception as e:
        results["analyze_error"] = str(e)
        print(f" -> Analyze Error: {e}")

    # 4. Check Environment Key Storage
    print("\nTesting 4. Checking Gemini API key storage...")
    env_file = os.path.join(os.path.dirname(__file__), "backend", ".env")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            lines = f.readlines()
        key_line = [l.strip() for l in lines if l.strip().startswith("GEMINI_API_KEY")]
        results["key_line_present"] = bool(key_line)
        key_val = key_line[0].split("=", 1)[1].strip() if key_line else ""
        results["key_is_set"] = bool(key_val and key_val != "your_gemini_api_key_here")
        print(f" -> Key line present: {bool(key_line)}, Key value populated: {bool(key_val and key_val != 'your_gemini_api_key_here')}")
    else:
        results["env_file_missing"] = True
        print(" -> backend/.env file does not exist!")

    # 5. Check Log Files for Errors
    print("\nTesting 5. Checking logs for errors...")
    log_126 = r"C:\Users\sampa\.gemini\antigravity\brain\952a394e-0193-4095-ac15-0d152b5c06d2\.system_generated\tasks\task-126.log"
    log_184 = r"C:\Users\sampa\.gemini\antigravity\brain\952a394e-0193-4095-ac15-0d152b5c06d2\.system_generated\tasks\task-184.log"
    
    if os.path.exists(log_126):
        with open(log_126, "r", encoding="utf-8", errors="ignore") as f:
            results["frontend_server_log"] = f.read()[-500:]
    if os.path.exists(log_184):
        with open(log_184, "r", encoding="utf-8", errors="ignore") as f:
            results["backend_server_log"] = f.read()[-500:]
            
    print("Done running automated checks.")

if __name__ == "__main__":
    run_tests()
