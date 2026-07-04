# Audio Files

This directory contains generated audio files for the Val-X Reel.

## Files

- `voiceover-raw.mp3` - Raw voiceover (Malayalam)
- `bgm-ambient.wav` - Background music
- `final-mixed.wav` - Mixed voiceover + BGM
- `voicebox-sample.wav` - Voicebox generated sample

## Generation

```bash
# Generate voiceover
./generate-audio-edge.sh

# Generate with Voicebox
curl -X POST http://127.0.0.1:17493/generate \
  -H "Content-Type: application/json" \
  -d '{"text": "...", "engine": "kokoro", "language": "hi"}'
```
