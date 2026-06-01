// ==========================================================================
// DRAFT STORAGE MANAGER & DEMO TEMPLATES
// ==========================================================================

const STORAGE_KEY = 'playable_gdd_draft';

export const DEMO_TEMPLATE = `# CYBER-PULSE: NEON RUNNER
## A Cinematic Roguelike Platformer
- **Pitch**: Speedrun through shifting modular skyscrapers, hack security nodes, and outrun an approaching security grid sweep in rhythmic, low-latency movement combat.
- **Aesthetic**: Retro-futuristic cyberpunk using vibrant neon color palettes, synthwave score, and responsive screen-shake feedback.

---

# THE CORE GAMEPLAY LOOP
## How the Game Directs Action & Rewards
- Explore grid nodes to hack security databases and gain tech cards.
- Escape security interceptors using high-speed slide/dash momentum.
- Upgrade cyberware modules between runs with collected currency.

[loop: Explore & Hack -> Evade Interceptors -> Collect Tech-Credits -> Upgrade Cyberware]

---

# CORE GAME SYSTEMS
## Modular Tech Features
[card: Fluid Movement Engine | Pure momentum-based traversal. Implement dashes, wall runs, and grapple hooks that preserve kinetic energy.]
[card: Dynamic Hack Cards | Collect deck cards that trigger visual hacks (e.g. slowing time, disabling lasers, or overriding drones).]
[card: Diegetic Threat Matrix | Real-time threat bar at the top of the HUD. Higher threat scales security bot spawns and alert states.]

---

# GAME DIFFICULTY PACING
## Emotional Tension Mapping Across Level 1
- **Tutorial**: Introduce wall-runs and basic dash controls (low threat).
- **Infiltration**: Breach the lower server tower (moderate security response).
- **Server Climax**: The core database is breached, initiating alert level 5 (intense escape sequence).

[pacing: 10, 25, 45, 95, 20]

---

# ENEMY AI STATES
## Hunter-Bot Behavior Flow
- States transition dynamically based on alert triggers.
- Click on nodes in the diagram below to simulate transitions.

[state: Scan (Patrol area and scan for kinetic signatures) -> Intercept (Navigate to alert coordinate) -> Exterminate (Deploy pulses and shield modules) -> Cooldown (Search and return to scan route)]

---

# GAME BALANCE SANDBOX
## Playable Weapon Damage & Loot Tables
- **Damage Formula**: Adjust variables below to test combat scaling.
- **Chest Simulator**: Run probability rolling simulation to log real-time drops.

[sandbox: formula | Damage = ATK * 1.5 - DEF | ATK: 80, DEF: 35]

[sandbox: loot | Common: 60, Rare: 25, Epic: 12, Legendary: 3]

---

# PRODUCTION ROADMAP
## Interactive Project Milestones
- Click nodes below to inspect objectives, checklists, and timelines.

[roadmap: Concept Pitch (Design loop layout & budget, Q1) -> Prototype (Evasion traversal validation, Q2) -> Alpha Build (Cards systems & bot AI loop, Q3) -> Launch Demo (Pacing polish & launch, Q4)]
`;

export function saveDraft(markdownText) {
  try {
    localStorage.setItem(STORAGE_KEY, markdownText);
    return true;
  } catch (e) {
    console.error("Failed to save draft to LocalStorage", e);
    return false;
  }
}

export function loadDraft() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? saved : DEMO_TEMPLATE;
  } catch (e) {
    console.error("Failed to load draft from LocalStorage", e);
    return DEMO_TEMPLATE;
  }
}
