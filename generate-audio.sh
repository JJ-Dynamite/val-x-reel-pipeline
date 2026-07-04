#!/bin/bash
# generate-audio.sh — Generate Malayalam audio for each scene using Voicebox

set -e

VOICEBOX_URL="http://127.0.0.1:17493"
SCRIPTS_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline/scripts"
AUDIO_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline/output/audio"

mkdir -p "$AUDIO_DIR"

echo "🎙️ Generating Malayalam audio for Val-X Reel..."
echo ""

# Check if Voicebox is running
if ! curl -s "$VOICEBOX_URL/profiles" > /dev/null 2>&1; then
  echo "❌ Voicebox is not running!"
echo "   Start Voicebox first:"
echo "   cd /Users/Shared/hack/projects/val-x-reel-pipeline/voicebox"
echo "   just dev"
  exit 1
fi

echo "✅ Voicebox is running"
echo ""

# Generate audio for each scene
for i in 1 2 3 4 5 6 7; do
  echo "📝 Scene $i"
  
  # Extract Malayalam text from script file
  TEXT=$(grep "^MALAYALAM:" "$SCRIPTS_DIR/scene$i.txt" | sed 's/MALAYALAM: //')
  
  echo "  Text: $TEXT"
  
  # Generate audio using Voicebox API
  curl -X POST "$VOICEBOX_URL/generate" \
    -H "Content-Type: application/json" \
    -d "{
      \"text\": \"$TEXT\",
      \"profile_id\": \"default\",
      \"language\": \"ml\"
    }" \
    --output "$AUDIO_DIR/scene$i.mp3" \
    --silent
  
  echo "  ✅ Saved to $AUDIO_DIR/scene$i.mp3"
  echo ""
done

# Combine all audio files
echo "🎵 Combining audio files..."
ffmpeg -y \
  -i "concat:$AUDIO_DIR/scene1.mp3|$AUDIO_DIR/scene2.mp3|$AUDIO_DIR/scene3.mp3|$AUDIO_DIR/scene4.mp3|$AUDIO_DIR/scene5.mp3|$AUDIO_DIR/scene6.mp3|$AUDIO_DIR/scene7.mp3" \
  "$AUDIO_DIR/voiceover-raw.mp3" \
  --loglevel error

# Add background music (if available)
if [ -f "$AUDIO_DIR/bgm.mp3" ]; then
  echo "🎵 Mixing with background music..."
  ffmpeg -y \
    -i "$AUDIO_DIR/voiceover-raw.mp3" \
    -i "$AUDIO_DIR/bgm.mp3" \
    -filter_complex "[0:a]volume=1.0[a];[1:a]volume=0.3[b];[a][b]amix=inputs=2" \
    "$AUDIO_DIR/final-voiceover.mp3" \
    --loglevel error
else
  echo "⚠️  No background music found. Using raw voiceover."
  cp "$AUDIO_DIR/voiceover-raw.mp3" "$AUDIO_DIR/final-voiceover.mp3"
fi

echo ""
echo "✅ Audio generation complete!"
echo "📁 Output: $AUDIO_DIR/final-voiceover.mp3"
echo ""
echo "Next steps:"
echo "  1. Add background music to $AUDIO_DIR/bgm.mp3"
echo "  2. Run this script again to mix"
echo "  3. Copy to val-x-reel/src/audio/voiceover.mp3"
