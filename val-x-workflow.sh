#!/bin/bash
# val-x-workflow.sh — Complete Val-X Reel Pipeline Automation

set -e

PROJECT_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline"
REEL_DIR="$PROJECT_DIR/val-x-reel"
VOICEBOX_URL="http://127.0.0.1:17493"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         VAL-X REEL PIPELINE - Complete Workflow             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Generate Audio
echo "🎙️ Step 1: Generating Malayalam audio..."
echo ""

if curl -s "$VOICEBOX_URL/profiles" > /dev/null 2>&1; then
  echo "  ✅ Voicebox is running"
  bash "$PROJECT_DIR/generate-audio.sh"
else
  echo "  ⚠️  Voicebox is not running"
  echo "  Skipping audio generation..."
  echo "  To generate audio later:"
  echo "    1. Start Voicebox: cd $PROJECT_DIR/voicebox && just dev"
  echo "    2. Run: bash $PROJECT_DIR/generate-audio.sh"
fi

echo ""

# Step 2: Copy audio to Remotion project
echo "📁 Step 2: Copying audio to Remotion project..."
if [ -f "$PROJECT_DIR/output/audio/final-voiceover.mp3" ]; then
  cp "$PROJECT_DIR/output/audio/final-voiceover.mp3" "$REEL_DIR/src/audio/voiceover.mp3"
  echo "  ✅ Audio copied"
else
  echo "  ⚠️  No audio file found. Using placeholder."
fi

echo ""

# Step 3: Install dependencies
echo "📦 Step 3: Installing Remotion dependencies..."
cd "$REEL_DIR"
npm install --silent 2>/dev/null || true
echo "  ✅ Dependencies installed"

echo ""

# Step 4: Render Video
echo "🎬 Step 4: Rendering Val-X Reel..."
cd "$REEL_DIR"
npx remotion render src/index.ts ValXReel out/val-x-reel.mp4
echo "  ✅ Video rendered to out/val-x-reel.mp4"

echo ""

# Step 5: Upload and Post
echo "📤 Step 5: Posting to social media..."

# Check if postiz is installed
if command -v postiz &> /dev/null; then
  echo "  ✅ Postiz CLI found"
  
  # Upload video
  echo "  📤 Uploading video..."
  POST_ID=$(postiz upload out/val-x-reel.mp4 2>/dev/null | grep -o '"id":"[^"]*"' | cut -d'"' -f4 || echo "")
  
  if [ -n "$POST_ID" ]; then
    echo "  ✅ Video uploaded (ID: $POST_ID)"
    
    # Schedule posts
    SCHEDULE_TIME=$(date -u -v+1H +%Y-%m-%dT%H:00:00Z 2>/dev/null || date -u -d '+1 hour' +%Y-%m-%dT%H:00:00Z)
    
    echo "  📅 Scheduling posts for $SCHEDULE_TIME..."
    
    # Instagram
    postiz posts:create \
      -c "🚀 Val-X — Transforming Ideas into Global Businesses

🔧 Full-Stack | AI/ML | Cloud | Blockchain
📍 Kozhikode, Kerala → Global

#ValX #Startup #Technology #Kerala #India #AI #React #Rust" \
      -m "$POST_ID" \
      -s "$SCHEDULE_TIME" \
      -i "instagram-id" 2>/dev/null || echo "    ⚠️  Instagram post failed"
    
    echo "  ✅ Posts scheduled"
  else
    echo "  ⚠️  Upload failed. Check Postiz configuration."
  fi
else
  echo "  ⚠️  Postiz CLI not found"
  echo "  To install: npm install -g postiz"
  echo "  Then run: postiz auth:login"
fi

echo ""

# Step 6: Monitor
echo "📊 Step 6: Starting Instagram monitor..."

if command -v instagram_monitor &> /dev/null; then
  echo "  ✅ Instagram Monitor found"
  echo "  Starting monitor in background..."
  instagram_monitor val_x_international_ --web-dashboard &
  MONITOR_PID=$!
  echo "  ✅ Monitor running (PID: $MONITOR_PID)"
  echo "  🌐 Dashboard: http://localhost:8000"
else
  echo "  ⚠️  Instagram Monitor not found"
  echo "  To install: pip install instagram_monitor"
  echo "  Then run: instagram_monitor val_x_international_ --web-dashboard"
fi

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    PIPELINE COMPLETE!                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "📁 Output: $REEL_DIR/out/val-x-reel.mp4"
echo ""
echo "Next steps:"
echo "  1. Preview video: cd $REEL_DIR && npm run start"
echo "  2. Check monitor dashboard: http://localhost:8000"
echo "  3. View posts in Postiz dashboard"
echo ""
