"""
AI Fake Job Detector - Local Preview Server
Serves the modern React + Tailwind frontend locally using Python's built-in HTTP server.
"""

import http.server
import socketserver
import os
import sys

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Automatically serve preview.html if root path is requested
        if self.path in ('/', '', '/index.html'):
            self.path = '/preview.html'
        return super().do_GET()

    def end_headers(self):
        # Enable CORS and disable aggressive caching for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)
    
    socketserver.TCPServer.allow_reuse_address = True
    global PORT
    for attempt_port in [3000, 3001, 3002, 3003, 3004, 3005]:
        try:
            httpd = socketserver.TCPServer(("", attempt_port), Handler)
            PORT = attempt_port
            url = f"http://localhost:{PORT}/preview.html"
            print("=" * 65, flush=True)
            print(" 🛡️  AI Fake Job Detector - Local Frontend Preview Running!", flush=True)
            print(f" URL: {url}", flush=True)
            print(f" Root Directory: {base_dir}", flush=True)
            print("=" * 65, flush=True)
            httpd.serve_forever()
            break
        except OSError:
            continue

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nServer stopped.", flush=True)
        sys.exit(0)
