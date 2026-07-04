# Val-X Reel Pipeline

Professional motion graphic Instagram Reel for Val-X International Technologies, built with Remotion, Voicebox, and Postiz.

## 🎬 Features

- **7 Animated Scenes**: Hook, Problem, Solution, Services, Impact, CTA, Outro
- **8 Reusable Components**: MatrixRain, GlitchText, StatCounter, TechBadge, ValXLogo, ParticleSystem, GlowCard, TypingEffect
- **Malayalam Voiceover**: Edge-TTS + Voicebox integration
- **Multi-Platform Posting**: Instagram, YouTube Shorts, TikTok, X
- **FAANG Git-Flow**: Production-ready codebase

## 🛠️ Tech Stack

- **Video**: Remotion (React-based video generation)
- **Audio**: Edge-TTS (Malayalam), Voicebox (Kokoro engine)
- **Styling**: TypeScript, Tailwind CSS
- **Posting**: Postiz CLI, Instagram API
- **Git**: FAANG-style git-flow

## 📁 Project Structure

```
val-x-reel-pipeline/
├── src/
│   ├── scenes/           # Video scenes
│   ├── components/       # Reusable components
│   └── styles/           # Theme configuration
├── config/               # Social media configs
├── scripts/              # Malayalam scripts
├── output/               # Generated videos & audio
├── docs/                 # Documentation
└── val-x-reel/           # Remotion project
```

## 🚀 Quick Start

```bash
# Install dependencies
cd val-x-reel && npm install

# Generate audio
./generate-audio-edge.sh

# Render video
npx remotion render src/index.ts ValXReel out/val-x-reel.mp4

# Post to social media
./post-to-social.sh
```

## 📝 Scripts

Each scene has a Malayalam + English script:

| Scene | Duration | Description |
|-------|----------|-------------|
| Hook | 0-10s | Matrix rain + Val-X logo |
| Problem | 10-25s | 90% startup failure stat |
| Solution | 25-40s | Ideas → Reality |
| Services | 40-55s | Tech stack grid |
| Impact | 55-70s | Stats + Joel's story |
| CTA | 70-80s | Call to action |
| Outro | 80-90s | Social handles |

## 🎨 Brand Colors

- **Primary Green**: #00FF41
- **Blue**: #0066FF
- **Dark**: #0D1117

## 📱 Social Media

- **Instagram**: @val_x_international_
- **YouTube**: Val-X
- **TikTok**: @val_x
- **X**: @val_x_intl

## 📄 License

MIT License - Val-X International Technologies

## 👥 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📊 Status

- [x] Video production
- [x] Audio generation
- [x] Final rendering
- [ ] Social media posting (requires authentication)

---

Built with ❤️ by Val-X International Technologies
