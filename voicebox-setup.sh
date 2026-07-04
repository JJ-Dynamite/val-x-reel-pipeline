#!/bin/bash
# voicebox-setup.sh — Setup Voicebox for Malayalam audio generation

set -e

VOICEBOX_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline/voicebox"
PROJECT_DIR="/Users/Shared/hack/projects/val-x-reel-pipeline"

echo "🎙️ Setting up Voicebox for Malayalam audio..."

# Clone Voicebox if not exists
if [ ! -d "$VOICEBOX_DIR" ]; then
  echo "  Cloning Voicebox..."
  git clone https://github.com/jamiepine/voicebox.git "$VOICEBOX_DIR"
fi

cd "$VOICEBOX_DIR"

# Setup Voicebox
echo "  Installing dependencies..."
just setup

echo ""
echo "✅ Voicebox setup complete!"
echo ""
echo "To start Voicebox:"
echo "  cd $VOICEBOX_DIR"
echo "  just dev"
echo ""
echo "API will be available at: http://127.0.0.1:17493"
