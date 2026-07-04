#!/usr/bin/env python3
"""
Instagram posting script using instagram-private-api
Requires: username, password
"""

import sys
import json
from instagram_private_api import Client

def post_to_instagram(username, password, video_path, caption):
    """Post a video to Instagram"""
    try:
        # Login
        api = Client(username, password)
        print(f"Logged in as {username}")
        
        # Upload video
        with open(video_path, 'rb') as f:
            video_data = f.read()
        
        # Post as reel
        result = api.video_upload(
            video_data,
            caption=caption,
            width=1080,
            height=1920,
            duration=90
        )
        
        print(f"Posted successfully! Media ID: {result.media_id}")
        return True
        
    except Exception as e:
        print(f"Error posting to Instagram: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python post-instagram.py <username> <password> <video_path>")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    video_path = sys.argv[3]
    
    caption = """🚀 Val-X — Transforming Ideas into Global Businesses

🔧 Full-Stack | AI/ML | Cloud | Blockchain
📍 Kozhikode, Kerala → Global

#ValX #Startup #Technology #Kerala #India #AI #React #Rust #FullStack #WebDev #Blockchain #Cloud #StartupLife #Founder"""
    
    success = post_to_instagram(username, password, video_path, caption)
    sys.exit(0 if success else 1)
