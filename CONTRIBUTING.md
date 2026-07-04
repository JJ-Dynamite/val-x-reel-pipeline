# Contributing to Val-X Reel Pipeline

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/JJ-Dynamite/val-x-reel-pipeline.git
cd val-x-reel-pipeline
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run Remotion preview
cd val-x-reel && npm start

# Test audio generation
./generate-audio-edge.sh

# Test video rendering
npx remotion render src/index.ts ValXReel out/test.mp4
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

- Provide a clear description of your changes
- Include any relevant screenshots or videos
- Reference any related issues

## 📝 Commit Message Convention

We follow the Conventional Commits specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Code style changes (formatting, missing semi-colons, etc.)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests
- `chore:` Changes to the build process or auxiliary tools

Examples:

```bash
git commit -m "feat: add new glitch text animation"
git commit -m "fix: resolve audio sync issue in hook scene"
git commit -m "docs: update README with new screenshots"
```

## 🎨 Code Style

- Use TypeScript for all new components
- Follow existing naming conventions
- Use functional components with hooks
- Keep components small and focused

## 🐛 Reporting Issues

- Use the GitHub issue tracker
- Provide a clear description of the issue
- Include steps to reproduce
- Add screenshots if applicable

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 👥 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

---

Thank you for contributing! 🚀
