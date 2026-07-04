#!/bin/bash

# Val-X Reel Social Media Posting Script
# Posts the final video to Instagram, YouTube Shorts, TikTok, and X

set -e

VIDEO_PATH="/Users/Shared/hack/projects/val-x-reel-pipeline/output/val-x-reel-complete.mp4"
CONFIG_PATH="/Users/Shared/hack/projects/val-x-reel-pipeline/config/postiz.json"
LOG_FILE="/Users/Shared/hack/projects/val-x-reel-pipeline/output/posting-log.txt"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
    echo "[$(date '+%H:%M:%S')] $1" >> "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] WARNING:${NC} $1"
    echo "[$(date '+%H:%M:%S')] WARNING: $1" >> "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ERROR:${NC} $1"
    echo "[$(date '+%H:%M:%S')] ERROR: $1" >> "$LOG_FILE"
}

# Check if video exists
if [ ! -f "$VIDEO_PATH" ]; then
    error "Video not found: $VIDEO_PATH"
    exit 1
fi

log "Starting social media posting..."
log "Video: $VIDEO_PATH"
log "Config: $CONFIG_PATH"

# Check Postiz
export PATH="$PATH:/Users/bonderconnect/.hermes/node/bin"
if ! command -v postiz &> /dev/null; then
    error "Postiz not found. Install with: npm install -g postiz"
    exit 1
fi

# Check authentication
AUTH_STATUS=$(postiz auth:status 2>&1)
if echo "$AUTH_STATUS" | grep -q "Not authenticated"; then
    warn "Not authenticated with Postiz"
    echo ""
    echo "To authenticate, run:"
    echo "  postiz auth:login"
    echo ""
    echo "This will open a browser for OAuth2 authentication."
    echo "After authentication, run this script again."
    echo ""
    exit 1
fi

log "Authenticated with Postiz"

# Post to Instagram
log "Posting to Instagram..."
postiz posts:create \
    --media "$VIDEO_PATH" \
    --caption "🚀 Val-X — Transforming Ideas into Global Businesses

🔧 Full-Stack | AI/ML | Cloud | Blockchain
📍 Kozhikode, Kerala → Global

#ValX #Startup #Technology #Kerala #India #AI #React #Rust #FullStack #WebDev #Blockchain #Cloud #StartupLife #Founder" \
    --platform instagram 2>&1 | tee -a "$LOG_FILE"

# Post to YouTube Shorts
log "Posting to YouTube Shorts..."
postiz posts:create \
    --media "$VIDEO_PATH" \
    --title "Val-X — Your Technology Partner from Kerala" \
    --description "Val-X International Technologies — transforming innovative ideas into successful global businesses.

🌐 www.val-x.com

#ValX #Startup #Technology #Kerala #India #Shorts #TechStartup #FullStack" \
    --platform youtube 2>&1 | tee -a "$LOG_FILE"

# Post to TikTok
log "Posting to TikTok..."
postiz posts:create \
    --media "$VIDEO_PATH" \
    --caption "Val-X — Ideas-ine Reality aakki maattunna place 🔥

#ValX #TikTok #TechStartup #Kerala #Coding #FullStack" \
    --platform tiktok 2>&1 | tee -a "$LOG_FILE"

# Post to X (Twitter)
log "Posting to X (Twitter)..."
postiz posts:create \
    --media "$VIDEO_PATH" \
    --text "🚀 Introducing Val-X — Your Technology Partner

From Kozhikode to the Global Market

Full-Stack | AI/ML | Cloud | Blockchain

#ValX #Startup #Technology #Kerala #India" \
    --platform twitter 2>&1 | tee -a "$LOG_FILE"

log "All posts submitted!"
log "Check posting log: $LOG_FILE"

echo ""
echo "✅ Posts submitted to all platforms!"
echo "📝 Log file: $LOG_FILE"
echo ""
echo "Note: Posts may be in draft/schedule state."
echo "Check Postiz dashboard for status: postiz posts:list"
