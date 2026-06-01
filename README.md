# Playable GDD & Pitch Deck Generator 🎮⚡

An interactive, client-side slideshow and GDD (Game Design Document) editor styled like a playable choice-driven retro game. It instantly compiles markdown scripts into beautiful presentation slides featuring procedural sound synthesis, CRT overlays, responsive screen glitches, and interactive game design diagrams.

---

## 🌟 Key Features

*   **Diegetic Screen Aesthetics**: Toggle CRT monitor scanlines, radial screen-glare filters, and refresh flicker layers.
*   **Procedural Audio Synthesizer**: Custom sounds generated purely in-browser using the **Web Audio API** (Hover blips, click select ticks, slide transitions, success fanfares) — *no external audio files needed*.
*   **Adaptive Theme Deck**: Swiftly toggle presentation modes matching your genre:
    *   `Cyberpunk` (Neon glow lines, tech grid background)
    *   `Cozy RPG` (Warm beige parchment textures, wood-carved cards)
    *   `Minimalist Dark` (Sleek obsidian panels, high-contrast layouts)
*   **Interactive Design Components**: Write custom markdown tags that compile into live dashboard panels:
    *   `🔄 SVG Core Loop Diagram`: Circle loops linking gameplay cycles, with path lighting triggers.
    *   `📈 Canvas Pacing Graph`: Intensity curves editable via sliders or **preset profiles** (Boss Fight, Stealth Run, etc.).
    *   `🤖 AI State Machine Flow`: Interactive node chains to map behaviors. Click nodes to run transitions and display actions.
    *   `🃏 3D Parallax Cards`: Concept tiles that tilt dynamically based on cursor vector angles.
*   **Audio Customizer Panel**: Open the **🎛️ AUDIO DECK** slider tray to adjust pitch frequencies, oscillator wave patterns, and decays on the fly.
*   **Markdown Autosave**: Works entirely offline-first, backing up edits into local browser storage.
*   **OLED Print Export**: Flattens presentation decks into clean, print-ready document pages for standard PDF exports.

---

## 🛠️ Visual Syntax Guide

Write GDD slides using standard markdown. Separate slides with a triple hyphen `---` and insert custom interactive panels:

### Core Game Loop
```markdown
[loop: Explore & Hack -> Evade Threat -> Collect Credits -> Upgrade Cyberware]
```

### Tension/Difficulty Pacing Curve
```markdown
[pacing: 15, 30, 75, 45, 20]
```

### AI Behaviour / State Flow
```markdown
[state: Scan (Patrol area) -> Intercept (Navigate to alert) -> Exterminate (Fire pulse)]
```

### 3D Parallax Feature Cards
```markdown
[card: Mechanics | Short description of game features.]
```

---

## 🚀 Running Locally

Ensure you have [Node.js](https://nodejs.org) installed on your machine.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/playable-gdd-generator.git
    cd playable-gdd-generator
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Launch Dev Server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to GitHub Pages (Live Demo)

You can publish the app for free as a live webpage on GitHub Pages!

1.  **Install Github Pages Deployer Tool** as a dev dependency:
    ```bash
    npm install gh-pages --save-dev
    ```
2.  Add deployment scripts to your `package.json`:
    ```json
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
3.  Set your base URL inside `vite.config.js` to match your repository name:
    ```javascript
    import { defineConfig } from 'vite';

    export default defineConfig({
      base: '/playable-gdd-generator/', // Replace with your repository name!
      server: {
        port: 3000,
        open: true
      }
    });
    ```
4.  Run the publish command:
    ```bash
    npm run deploy
    ```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
