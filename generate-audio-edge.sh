#!/bin/bash
# generate-audio-edge.sh — Generate Malayalam audio using edge-tts (lightweight alternative to Voicebox)

set -e

PROJECT_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline"
SCRIPTS_DIR="$PROJECT_DIR/scripts"
AUDIO_DIR="$PROJECT_DIR/output/audio"
VENV_DIR="$PROJECT_DIR/voicebox/venv-source"

mkdir -p "$AUDIO_DIR"

echo "🎙️ Generating Malayalam audio for Val-X Reel (edge-tts)..."
echo ""

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# List available Malayalam voices
echo "📝 Available Malayalam voices:"
edge-tts --list-voices 2>/dev/null | grep -i "ml-IN" || echo "  No Malayalam voices found"
echo ""

# Generate audio for each scene
for i in 1 2 3 4 5 6 7; do
  echo "📝 Scene $i"
  
  # Extract Malayalam text from script file
  TEXT=$(grep "^MALAYALAM:" "$SCRIPTS_DIR/scene$i.txt" | sed 's/MALAYALAM: //')
  
  echo "  Text: $TEXT"
  
  # Generate audio using edge-tts (Malayalam voice: ml-IN-SobhanaNeural)
  edge-tts --voice "ml-IN-SobhanaNeural" --text "$TEXT" --write-media "$AUDIO_DIR/scene$i.mp3" 2>/dev/null
  
  echo "  ✅ Saved to $AUDIO_DIR/scene$i.mp3"
  echo ""
done

# Combine all audio files
echo "🎵 Combining audio files..."
ffmpeg -y \
  -i "concat:$AUDIO_DIR/scene1.mp3|$AUDIO_DIR/scene2.mp3|$AUDIO_DIR/scene3.mp3|$AUDIO_DIR/scene4.mp3|$AUDIO_DIR/scene5.mp3|$AUDIO_DIR/scene6.mp3|$AUDIO_DIR/scene7.mp3" \
  "$AUDIO_DIR/voiceover-raw.mp3" \
  --loglevel error 2>/dev/null || {
    # If concat fails, use filter_complex
    ffmpeg -y \
      -i "$AUDIO_DIR/scene1.mp3" \
      -i "$AUDIO_DIR/scene2.mp3" \
      -i "$AUDIO_DIR/scene3.mp3" \
      -i "$AUDIO_DIR/scene4.mp3" \
      -i "$AUDIO_DIR/scene5.mp3" \
      -i "$AUDIO_DIR/scene6.mp3" \
      -i "$AUDIO_DIR/scene7.mp3" \
      -filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a][6:a]concat=n=7:v=0:a=1[outa]" \
      -map "[outa]" \
      "$AUDIO_DIR/voiceover-raw.mp3" \
      --loglevel error
  }

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

# Copy to Remotion project
echo "📁 Copying to Remotion project..."
cp "$AUDIO_DIR/final-voiceover.mp3" "$PROJECT_DIR/val-x-reel/src/audio/voiceover.mp3" 2>/dev/null || true

echo ""
echo "✅ Audio generation complete!"
echo "📁 Output: $AUDIO_DIR/final-voiceover.mp3"
echo ""
echo "Voice used: ml-IN-SobhanaNeural (Malayalam)"
echo ""
echo "To add background music:"
echo "  1. Place bgm.mp3 in $AUDIO_DIR/"
echo "  2. Run this script again"
