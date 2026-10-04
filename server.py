#!/usr/bin/env python3
"""
FitFriend - Local HTTP Server Runner
Allows accessing FitFriend locally or across your home Wi-Fi network on phone/tablet.
"""

import http.server
import socketserver
import webbrowser
import os
import socket

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def run():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 60)
        print(" FitFriend App is running!")
        print("=" * 60)
        print(f" • Open on this PC:      http://localhost:{PORT}")
        print(f" • Open on Friend's Phone: http://{local_ip}:{PORT}")
        print("=" * 60)
        print(" Press Ctrl+C to stop the server.")
        
        # Open in default browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped. Have a healthy day!")

if __name__ == "__main__":
    run()
