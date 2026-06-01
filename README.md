# Cyber-GDD: Playable Slide Engine & GDD Parser 🎮⚡

**Cyber-GDD** is a high-performance, client-side slideshow compiler and interactive document parser designed specifically for game designers, creative directors, and technical leads. It parses markdown drafts into high-vibe, cinematic presentation decks with integrated Web Audio DSP pipelines, real-time Canvas rendering, vector state diagrams, and 3D parallax features.

Designed with a strict local-first architecture, Cyber-GDD operates entirely in-browser, requiring zero external server calls and offering a sub-50ms cold boot time.

---

## 🛠️ Architectural Overview

Cyber-GDD treats slide generation as a compilation pipeline, moving from source text to dynamic DOM elements and audio cues:

```
[ Markdown Source ] 
        │
        ▼ (Recursive AST Parser)
[ Tokens & Slideline AST ]
        │
        ├──────────────────────────┐
        ▼ (DOM Hydration)          ▼ (DSP Synth Dispatch)
[ Render Slide Nodes ]      [ Procedural Web Audio API ]
        │                          │ (Triangle, Sine, Noise)
        ├──────────────────────────┤
        ▼                          ▼
  [ Canvas & SVG Components ] [ Playable UX Loops ]
```

### 1. Hand-Written AST Parser
Unlike heavy third-party markdown libraries, Cyber-GDD uses a specialized, light compiler optimized for slide delimiters and custom GDD components. It runs lexical sweeps over line tokens, dynamically nesting layout structures like lists and multi-column grid cards (`[card]`) while separating slide states using boundary lines (`---`).

### 2. Procedural Web Audio DSP Engine
All sound effects are synthesized programmatically in real-time. The core oscillator nodes execute Voltage-Controlled Oscillator (VCO) simulations with exponential envelope decay curves:
*   **Decay Gain Routing**: `OscillatorNode ──> BiquadFilterNode ──> GainNode (Exponential Decay) ──> AudioDestination`.
*   **Zero Asset Overheads**: Keeps the repository lightweight and eliminates asset-loading latencies.

---

## 📋 Comprehensive Feature Checklist

- [x] **Core Presentation Compiler**: Split-pane live editor, LocalStorage autosave draft recovery, and print-to-PDF styles.
- [x] **Procedural DSP Synthesizer**: Custom frequency control, wave configurations, test triggers, and toggle overrides.
- [x] **Aesthetic Rendering Pipeline**: CRT cathode overlay, vignette focus shadow, refresh rate screen flickers, and chromatic skew transitions.
- [x] **Interactive Vector Diagrams**: Animated circular game loop SVGs with hover-reactive node lighting.
- [x] **Canvas Pacing Matrix**: Bezier challenge curves editable via sliders or profile templates (Boss Fight, Stealth Run, etc.).
- [x] **Behavioral State Tracker**: Dynamic AI state sequence boxes with interactive descriptions and active state glows.
- [x] **Ergonomic Layout Controls**: Expandable presentation viewport (one-click editor collapse) and responsive CSS typography clamping.

---

## 📖 Syntax API Reference

Cyber-GDD supports a custom tag dictionary to map complex game design visualizers inside standard markdown scripts:

| Component Tag | Input Syntax | Options / Parameters | Output Visualization |
| :--- | :--- | :--- | :--- |
| **Slide Separator** | `---` (on empty line) | None | Visual boundary split that advances the slide index. |
| **Core Game Loop** | `[loop: Node1 -> Node2 -> Node3]` | Arrow-delimited strings (`->`) | Circular SVG flowchart with animated dashed directional paths and hover highlights. |
| **Pacing Curve** | `[pacing: 15, 30, 80, 20]` | Comma-separated integers ($0-100$) | HTML Canvas drawing cubic Bezier lines connecting tension points. |
| **State Machine** | `[state: Idle (Desc) -> Chase (Desc)]` | Node names with optional descriptions in `()` | Linear node sequences with clickable active state rings and dynamic text panels. |
| **Tilt Feature Card** | `[card: Title \| Details]` | Pipe-separated title and text description | 3D transform cards utilizing gyroscope hover perspective skews. |

---

## 🎨 Sound Design API Customization

You can customize the procedural sounds programmatically by editing the configuration object in `src/core/audio.js` or via the interactive **Audio Deck Drawer** inside the app.

```javascript
// Sound Profile Configuration Schema
this.config = {
  hover: {
    freq: 880,      // Starting frequency in Hz
    decay: 0.06,    // Decay time in seconds
    type: 'sine'    // Wave type: sine, triangle, square, sawtooth
  },
  click: {
    freq: 400,
    decay: 0.10,
    type: 'triangle'
  }
};
```

---

## 📈 Performance & Resource Metrics

*   **Cold Boot Time**: $\sim 35\text{ms}$ (initial file compilation to render).
*   **Dependency Count**: $0$ external dependencies at runtime.
*   **Memory Footprint**: $<15\text{MB}$ active heap allocations.
*   **Build Bundle Size**: $22.79\text{KB}$ JavaScript, $22.38\text{KB}$ CSS (production gzipped).

---

## 🗓️ Version History & Roadmap

### v1.2.0 (Current)
*   Implemented responsive font-clamping overlays.
*   Added split-pane Editor collapse layout modes.
*   Integrated pacing templates UI panel.

### v1.1.0
*   Added sliding **Synth Audio Deck Panel** for real-time sound design edits.
*   Implemented **AI State Machine Component** with description panels.
*   Added transition-glitch visual chromatic skews.

### v1.0.0
*   Released core AST Markdown parser.
*   Implemented procedural hover/click oscillator triggers.
*   Added circular SVG Core Loop renderers.

### v0.9.0
*   Established Web Audio context and output routing.
*   Designed Cyberpunk, Cozy RPG, and Minimalist theme engines.
*   Added print styles for PDF exports.

---

## 📄 License & Contribution

Distributed under the MIT License. Contributions are welcome! Please open an issue to discuss design pattern changes before submitting a pull request.
