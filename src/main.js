// ==========================================================================
// CORE APPLICATION COORDINATOR
// ==========================================================================
import { parseMarkdownToSlides } from './core/markdown.js';
import { AudioEngine } from './core/audio.js';
import { renderLoops } from './components/loop.js';
import { renderPacingGraphs } from './components/pacing.js';
import { renderStateMachines } from './components/stateMachine.js';
import { renderSandboxes } from './components/sandbox.js';
import { renderRoadmaps } from './components/roadmap.js';
import { saveDraft, loadDraft, DEMO_TEMPLATE } from './core/storage.js';

// Application State
let currentSlideIndex = 0;
let slidesHTML = [];
let autosaveTimeout = null;
let isLiveSolo = false;
let isMarkdownSolo = false;
let glitchSetting = localStorage.getItem('playable_gdd_glitch_setting') || 'low';

// DOM Element Selectors
const markdownInput = document.getElementById('markdown-input');
const slideContainer = document.getElementById('slide-container');
const currentSlideNum = document.getElementById('current-slide-num');
const totalSlidesNum = document.getElementById('total-slides-num');
const prevSlideBtn = document.getElementById('prev-slide-btn');
const nextSlideBtn = document.getElementById('next-slide-btn');
const statusMessage = document.getElementById('status-message');

const themeSelect = document.getElementById('theme-select');
const toggleCrtBtn = document.getElementById('toggle-crt');
const toggleAudioBtn = document.getElementById('toggle-audio');
const toggleEditorBtn = document.getElementById('toggle-editor');
const toggleDocBtn = document.getElementById('toggle-doc');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnExportTrigger = document.getElementById('btn-export-trigger');
const exportDropdownContainer = document.getElementById('export-dropdown-container');
const editorActionsSelect = document.getElementById('editor-actions-select');

const audioModal = document.getElementById('audio-modal');
const btnEnableAudio = document.getElementById('btn-enable-audio');

// Settings Drawer Selectors
const btnSettings = document.getElementById('btn-settings');
const settingsDrawer = document.getElementById('settings-drawer');
const btnCloseSettings = document.getElementById('btn-close-settings');
const settingsThemeSelect = document.getElementById('settings-theme-select');
const settingsToggleCrt = document.getElementById('settings-toggle-crt');
const settingsToggleAudio = document.getElementById('settings-toggle-audio');
const settingsToggleEditor = document.getElementById('settings-toggle-editor');
const settingsToggleDoc = document.getElementById('settings-toggle-doc');
const settingsToggleHeaderControls = document.getElementById('settings-toggle-header-controls');
const settingsGlitchSelect = document.getElementById('settings-glitch-select');

// ==========================================================================
// RENDER ENGINE
// ==========================================================================
function renderSlides() {
  const markdownText = markdownInput.value;
  slidesHTML = parseMarkdownToSlides(markdownText);
  
  // Update Slide Counts
  totalSlidesNum.textContent = slidesHTML.length;
  
  // Cap index if slides were deleted
  if (currentSlideIndex >= slidesHTML.length) {
    currentSlideIndex = Math.max(0, slidesHTML.length - 1);
  }
  currentSlideNum.textContent = currentSlideIndex + 1;
  
  // Show single slide card
  slideContainer.innerHTML = slidesHTML[currentSlideIndex] || '';
  
  // Inject Dynamic Interactive Components
  renderLoops(slideContainer);
  renderPacingGraphs(slideContainer);
  renderStateMachines(slideContainer);
  renderSandboxes(slideContainer);
  renderRoadmaps(slideContainer);
  initialize3DTilts();
}

function triggerGlitchTransition() {
  if (glitchSetting === 'normal') {
    document.body.classList.add('glitch-active');
    setTimeout(() => {
      document.body.classList.remove('glitch-active');
    }, 220);
  } else if (glitchSetting === 'low') {
    document.body.classList.add('glitch-active-low');
    setTimeout(() => {
      document.body.classList.remove('glitch-active-low');
    }, 150);
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slidesHTML.length) return;
  
  currentSlideIndex = index;
  currentSlideNum.textContent = currentSlideIndex + 1;
  
  // Synthesize transitions
  AudioEngine.playTransition();
  
  // Trigger screen glitch visual aberration (only if enabled)
  triggerGlitchTransition();
  
  // Render
  renderSlides();
  updateStatusHUD(`VIEWING SLIDE ${currentSlideIndex + 1}`);
}

// ==========================================================================
// 3D CARD PARALLAX EFFECT
// ==========================================================================
function initialize3DTilts() {
  const cards = slideContainer.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate rotation degree (max 15 deg)
      const rY = ((x / width) - 0.5) * 20;
      const rX = -((y / height) - 0.5) * 20;
      
      card.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) scale(1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
    
    card.addEventListener('mouseenter', () => {
      AudioEngine.playHover();
    });
    
    card.addEventListener('click', () => {
      AudioEngine.playClick();
    });
  });
}

// ==========================================================================
// COMPONENT INJECTOR UTILITIES
// ==========================================================================
function injectMarkup(type) {
  const cursorIndex = markdownInput.selectionStart;
  const originalText = markdownInput.value;
  let injectionText = '';
  
  switch(type) {
    case 'slide':
      injectionText = '\n---\n# NEW SLIDE TITLE\n## Subheading\n- Point 1\n- Point 2\n';
      break;
    case 'loop':
      injectionText = '\n[loop: Start -> Core Loop -> Action -> Reward]\n';
      break;
    case 'pacing':
      injectionText = '\n[pacing: 15, 30, 75, 40, 20]\n';
      break;
    case 'state':
      injectionText = '\n[state: Idle (Resting / scanning) -> Chase (Locking target) -> Attack (Fire pulse) -> Search (Seek target)]\n';
      break;
    case 'card':
      injectionText = '\n[card: Feature Title | Visual descriptions of custom game systems.]\n';
      break;
    case 'formula':
      injectionText = '\n[sandbox: formula | Damage = ATK * 1.5 - DEF | ATK: 80, DEF: 30]\n';
      break;
    case 'loot':
      injectionText = '\n[sandbox: loot | Common: 60, Rare: 25, Epic: 12, Legendary: 3]\n';
      break;
    case 'roadmap':
      injectionText = '\n[roadmap: Concept (Mechanic Pitch, Q1) -> Prototype (Core Mechanics, Q2) -> Alpha (Checklist & Testing, Q3) -> Release (Launch, Q4)]\n';
      break;
  }
  
  const textBefore = originalText.substring(0, cursorIndex);
  const textAfter = originalText.substring(cursorIndex);
  
  markdownInput.value = textBefore + injectionText + textAfter;
  markdownInput.focus();
  
  // Move cursor past the injected block
  const newCursorIndex = cursorIndex + injectionText.length;
  markdownInput.setSelectionRange(newCursorIndex, newCursorIndex);
  
  AudioEngine.playClick();
  renderSlides();
  triggerAutoSave();
}

// ==========================================================================
// SYSTEM AUTOSAVE
// ==========================================================================
function triggerAutoSave() {
  updateStatusHUD("SAVING...");
  
  if (autosaveTimeout) clearTimeout(autosaveTimeout);
  
  autosaveTimeout = setTimeout(() => {
    saveDraft(markdownInput.value);
    updateStatusHUD("SYSTEM READY • AUTO-SAVED");
  }, 1000);
}

function updateStatusHUD(msg) {
  statusMessage.textContent = msg;
}

// ==========================================================================
// EVENT ATTACHMENTS & CONTROLS
// ==========================================================================

// Key Bindings
document.addEventListener('keydown', (e) => {
  // Disable slide controls if user is writing in the editor or GDD Markdown Solo is active
  if (document.activeElement === markdownInput) return;
  if (isMarkdownSolo) return; // Skip arrows pagination if only GDD source is visible
  
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    if (currentSlideIndex < slidesHTML.length - 1) {
      goToSlide(currentSlideIndex + 1);
    } else {
      AudioEngine.playClick(); // play boundary sound
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
    e.preventDefault();
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    } else {
      AudioEngine.playClick();
    }
  } else if (e.key.toLowerCase() === 'f') {
    e.preventDefault();
    toggleFullscreen();
  } else if (e.key === 'Escape') {
    if (document.body.classList.contains('presentation-fullscreen')) {
      exitFullscreen();
    }
  }
});

// Fullscreen PRESENT Toggle
function toggleFullscreen() {
  AudioEngine.playClick();
  if (!document.body.classList.contains('presentation-fullscreen')) {
    document.body.classList.add('presentation-fullscreen');
    updateStatusHUD("FULLSCREEN PRESENTER MODE ACTIVE");
  } else {
    exitFullscreen();
  }
}

function exitFullscreen() {
  document.body.classList.remove('presentation-fullscreen');
  updateStatusHUD("SYSTEM READY");
}

// Theme Controls
themeSelect.addEventListener('change', (e) => {
  const theme = e.target.value;
  document.documentElement.setAttribute('data-theme', theme);
  
  AudioEngine.playClick();
  // Redraw graphs so color scales matching theme variables refresh
  renderSlides();
});
themeSelect.addEventListener('mouseenter', () => AudioEngine.playHover());

// Toggle Sidebar Editor Pane (Solos Live Presentation view)
toggleEditorBtn.addEventListener('click', () => {
  isLiveSolo = !isLiveSolo;
  document.body.classList.toggle('live-solo', isLiveSolo);
  toggleEditorBtn.classList.toggle('active', isLiveSolo);
  syncSettingsToggle(settingsToggleEditor, isLiveSolo);
  
  if (isLiveSolo) {
    isMarkdownSolo = false;
    document.body.classList.remove('markdown-solo');
    toggleDocBtn.classList.remove('active');
    syncSettingsToggle(settingsToggleDoc, false);
  }
  
  // Trigger screen glitch visual aberration during layout transition
  triggerGlitchTransition();
  
  AudioEngine.playClick();
  
  // Re-draw slides after layouts finish transitions so canvases adjust widths
  setTimeout(() => {
    renderSlides();
    if (isLiveSolo) {
      updateStatusHUD("LIVE PRESENTATION MAXIMIZED");
    } else {
      updateStatusHUD(`VIEWING SLIDE ${currentSlideIndex + 1}`);
    }
  }, 320);
});
toggleEditorBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

// Toggle GDD Source Editor (Solos Markdown side view)
toggleDocBtn.addEventListener('click', () => {
  isMarkdownSolo = !isMarkdownSolo;
  document.body.classList.toggle('markdown-solo', isMarkdownSolo);
  toggleDocBtn.classList.toggle('active', isMarkdownSolo);
  syncSettingsToggle(settingsToggleDoc, isMarkdownSolo);
  
  if (isMarkdownSolo) {
    isLiveSolo = false;
    document.body.classList.remove('live-solo');
    toggleEditorBtn.classList.remove('active');
    syncSettingsToggle(settingsToggleEditor, false);
  }
  
  // Trigger screen glitch visual aberration
  triggerGlitchTransition();
  
  AudioEngine.playClick();
  
  setTimeout(() => {
    renderSlides();
    if (isMarkdownSolo) {
      updateStatusHUD("GDD SOURCE CODE MAXIMIZED");
    } else {
      updateStatusHUD(`VIEWING SLIDE ${currentSlideIndex + 1}`);
    }
  }, 320);
});
toggleDocBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

// Toggles (CRT / AUDIO)
toggleCrtBtn.addEventListener('click', () => {
  const isCrt = document.documentElement.getAttribute('data-crt') === 'true';
  const newCrt = !isCrt;
  document.documentElement.setAttribute('data-crt', newCrt ? 'true' : 'false');
  toggleCrtBtn.classList.toggle('active', newCrt);
  syncSettingsToggle(settingsToggleCrt, newCrt);
  AudioEngine.playClick();
});
toggleCrtBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

toggleAudioBtn.addEventListener('click', () => {
  const isAudio = document.documentElement.getAttribute('data-audio') === 'true';
  const newAudio = !isAudio;
  document.documentElement.setAttribute('data-audio', newAudio ? 'true' : 'false');
  toggleAudioBtn.classList.toggle('active', newAudio);
  syncSettingsToggle(settingsToggleAudio, newAudio);
  
  AudioEngine.setEnabled(newAudio);
  AudioEngine.playClick();
});
toggleAudioBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

// Nav HUD buttons
prevSlideBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) goToSlide(currentSlideIndex - 1);
});
prevSlideBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

nextSlideBtn.addEventListener('click', () => {
  if (currentSlideIndex < slidesHTML.length - 1) goToSlide(currentSlideIndex + 1);
});
nextSlideBtn.addEventListener('mouseenter', () => AudioEngine.playHover());

btnFullscreen.addEventListener('click', toggleFullscreen);
btnFullscreen.addEventListener('mouseenter', () => AudioEngine.playHover());

// Custom Export Dropdown Menu Handlers
if (btnExportTrigger && exportDropdownContainer) {
  btnExportTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = exportDropdownContainer.classList.contains('open');
    // Close other dropdowns if any, then toggle
    exportDropdownContainer.classList.toggle('open', !isOpen);
    AudioEngine.playClick();
  });
  
  btnExportTrigger.addEventListener('mouseenter', () => AudioEngine.playHover());
  
  // Handle individual export actions
  const dropdownItems = exportDropdownContainer.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('mouseenter', () => AudioEngine.playHover());
    
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const type = item.getAttribute('data-value');
      exportDropdownContainer.classList.remove('open');
      
      if (type === 'pdf') {
        AudioEngine.playClick();
        window.print();
      } else if (type === 'html') {
        exportStandaloneHTML();
      } else if (type === 'markdown') {
        const currentMarkdown = markdownInput.value;
        const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'game_design_document.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        AudioEngine.playSuccess();
        updateStatusHUD("GDD MARKDOWN FILE DOWNLOADED");
      }
    });
  });
  
  // Close export dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!exportDropdownContainer.contains(e.target)) {
      exportDropdownContainer.classList.remove('open');
    }
  });
}

// Editor Actions Dropdown handler
editorActionsSelect.addEventListener('change', (e) => {
  const action = e.target.value;
  if (!action) return;
  
  if (action === 'copy') {
    navigator.clipboard.writeText(markdownInput.value)
      .then(() => {
        AudioEngine.playSuccess();
        updateStatusHUD("GDD SOURCE COPIED TO CLIPBOARD");
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  } else if (action === 'download') {
    const currentMarkdown = markdownInput.value;
    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game_design_document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    AudioEngine.playSuccess();
    updateStatusHUD("GDD MARKDOWN FILE DOWNLOADED");
  } else if (action === 'template') {
    if (confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")) {
      markdownInput.value = DEMO_TEMPLATE;
      currentSlideIndex = 0;
      AudioEngine.playSuccess();
      renderSlides();
      triggerAutoSave();
    }
  }
  
  // Reset select value to show placeholder
  editorActionsSelect.value = '';
});
editorActionsSelect.addEventListener('mouseenter', () => AudioEngine.playHover());

// Component Injectors Tray
document.querySelectorAll('[data-inject]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-inject');
    injectMarkup(type);
  });
  btn.addEventListener('mouseenter', () => AudioEngine.playHover());
});

// Sound alerts on input editing
markdownInput.addEventListener('input', () => {
  renderSlides();
  triggerAutoSave();
});

// Enable Audio Initialize Modal
btnEnableAudio.addEventListener('click', () => {
  AudioEngine.init();
  audioModal.classList.add('hidden');
});
btnEnableAudio.addEventListener('mouseenter', () => {
  // Standard hover won't work yet since Context is not initialized,
  // but it indicates UI feedback.
});

// Audio Deck Drawer Selectors
const btnAudioDeck = document.getElementById('btn-audio-deck');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const audioDeckDrawer = document.getElementById('audio-deck-drawer');

const paramHoverFreq = document.getElementById('param-hover-freq');
const paramHoverDecay = document.getElementById('param-hover-decay');
const paramHoverWave = document.getElementById('param-hover-wave');
const btnTestHover = document.getElementById('btn-test-hover');

const paramClickFreq = document.getElementById('param-click-freq');
const paramClickDecay = document.getElementById('param-click-decay');
const paramClickWave = document.getElementById('param-click-wave');
const btnTestClick = document.getElementById('btn-test-click');

// Toggle Drawer Open/Close
btnAudioDeck.addEventListener('click', () => {
  document.body.classList.toggle('drawer-open');
  AudioEngine.playClick();
});
btnAudioDeck.addEventListener('mouseenter', () => AudioEngine.playHover());

btnCloseDrawer.addEventListener('click', () => {
  document.body.classList.remove('drawer-open');
  AudioEngine.playClick();
});
btnCloseDrawer.addEventListener('mouseenter', () => AudioEngine.playHover());

// Sliders mapping and text updates
paramHoverFreq.addEventListener('input', (e) => {
  const val = e.target.value;
  document.getElementById('val-hover-freq').textContent = `${val} Hz`;
  AudioEngine.config.hover.freq = parseInt(val, 10);
});
paramHoverDecay.addEventListener('input', (e) => {
  const val = e.target.value;
  document.getElementById('val-hover-decay').textContent = `${val}s`;
  AudioEngine.config.hover.decay = parseFloat(val);
});
paramHoverWave.addEventListener('change', (e) => {
  AudioEngine.config.hover.type = e.target.value;
});
btnTestHover.addEventListener('click', () => AudioEngine.playHover());

paramClickFreq.addEventListener('input', (e) => {
  const val = e.target.value;
  document.getElementById('val-click-freq').textContent = `${val} Hz`;
  AudioEngine.config.click.freq = parseInt(val, 10);
});
paramClickDecay.addEventListener('input', (e) => {
  const val = e.target.value;
  document.getElementById('val-click-decay').textContent = `${val}s`;
  AudioEngine.config.click.decay = parseFloat(val);
});
paramClickWave.addEventListener('change', (e) => {
  AudioEngine.config.click.type = e.target.value;
});
btnTestClick.addEventListener('click', () => AudioEngine.playClick());

// ==========================================================================
// STANDALONE OFFLINE HTML EXPORT
// ==========================================================================
async function exportStandaloneHTML() {
  updateStatusHUD("BUNDLING OFFLINE GDD...");
  AudioEngine.playClick();
  
  try {
    // 1. Fetch current stylesheet content
    let cssContent = '';
    const styleSheets = Array.from(document.styleSheets);
    for (const sheet of styleSheets) {
      try {
        if (sheet.href) {
          const res = await fetch(sheet.href);
          cssContent += await res.text();
        } else {
          const rules = Array.from(sheet.cssRules);
          cssContent += rules.map(rule => rule.cssText).join('\n');
        }
      } catch (e) {
        console.warn('Could not read stylesheet:', e);
      }
    }
    
    // 2. Fetch main script content
    let jsContent = '';
    const scripts = Array.from(document.querySelectorAll('script'));
    let mainScriptUrl = '';
    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (src && (src.includes('assets/index') || src.includes('src/main.js') || script.type === 'module')) {
        mainScriptUrl = src;
        break;
      }
    }
    
    if (mainScriptUrl) {
      const res = await fetch(mainScriptUrl);
      jsContent = await res.text();
    } else {
      jsContent = 'console.error("Main script bundle not found during export.");';
    }
    
    // 3. Assemble HTML
    const currentMarkdown = markdownInput.value;
    let indexHtml = '';
    try {
      const indexRes = await fetch('./index.html');
      indexHtml = await indexRes.text();
    } catch (e) {
      indexHtml = `<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`;
    }
    
    // Prefill Markdown inside the template's textarea
    const textareaRegex = /<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/;
    const safeEscapedMarkdown = currentMarkdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    indexHtml = indexHtml.replace(textareaRegex, `<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${safeEscapedMarkdown}</textarea>`);
    
    // Remove reference to external stylesheet and script
    indexHtml = indexHtml.replace(/<link rel="stylesheet" href="[^"]+">/g, '');
    indexHtml = indexHtml.replace(/<script type="module" src="[^"]+"><\/script>/g, '');
    
    // Inject style content into head
    indexHtml = indexHtml.replace('</head>', `<style>${cssContent}</style></head>`);
    
    // Inject script content into body
    indexHtml = indexHtml.replace('</body>', `<script type="module">${jsContent}</script></body>`);
    
    // 4. Download Trigger
    const blob = new Blob([indexHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interactive_game_design_document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    AudioEngine.playSuccess();
    updateStatusHUD("OFFLINE GDD EXPORTED SUCCESS");
  } catch (err) {
    console.error('Error during HTML export:', err);
    updateStatusHUD("EXPORT ERROR: BUNDLING FAILED");
  }
}

// ==========================================================================
// SETTINGS DRAWER
// ==========================================================================

// Helper: sync a settings pill toggle button
function syncSettingsToggle(btn, isActive) {
  if (!btn) return;
  btn.classList.toggle('active', isActive);
  btn.textContent = isActive ? 'ON' : 'OFF';
}

// Open/Close Settings Drawer
btnSettings.addEventListener('click', () => {
  const isOpen = document.body.classList.contains('settings-open');
  // Close audio deck if open
  document.body.classList.remove('drawer-open');
  document.body.classList.toggle('settings-open', !isOpen);
  AudioEngine.playClick();
});
btnSettings.addEventListener('mouseenter', () => AudioEngine.playHover());

btnCloseSettings.addEventListener('click', () => {
  document.body.classList.remove('settings-open');
  AudioEngine.playClick();
});
btnCloseSettings.addEventListener('mouseenter', () => AudioEngine.playHover());

// Close settings when clicking outside
document.addEventListener('click', (e) => {
  if (document.body.classList.contains('settings-open') &&
      !settingsDrawer.contains(e.target) &&
      e.target !== btnSettings && !btnSettings.contains(e.target)) {
    document.body.classList.remove('settings-open');
  }
});

// Settings Theme Select — syncs with header select
settingsThemeSelect.addEventListener('change', (e) => {
  const theme = e.target.value;
  document.documentElement.setAttribute('data-theme', theme);
  themeSelect.value = theme; // sync header dropdown
  AudioEngine.playClick();
  renderSlides();
});

// Also sync settings theme when header theme changes
themeSelect.addEventListener('change', () => {
  settingsThemeSelect.value = themeSelect.value;
});

// Settings CRT Toggle
settingsToggleCrt.addEventListener('click', () => {
  toggleCrtBtn.click(); // delegate to existing handler
});
settingsToggleCrt.addEventListener('mouseenter', () => AudioEngine.playHover());

// Settings Audio Toggle
settingsToggleAudio.addEventListener('click', () => {
  toggleAudioBtn.click(); // delegate to existing handler
});
settingsToggleAudio.addEventListener('mouseenter', () => AudioEngine.playHover());

// Settings Editor Toggle
settingsToggleEditor.addEventListener('click', () => {
  toggleEditorBtn.click(); // delegate to existing handler
});
settingsToggleEditor.addEventListener('mouseenter', () => AudioEngine.playHover());

// Settings Docs Toggle
settingsToggleDoc.addEventListener('click', () => {
  toggleDocBtn.click(); // delegate to existing handler
});
settingsToggleDoc.addEventListener('mouseenter', () => AudioEngine.playHover());

// Settings Header Controls Visibility Toggle
settingsToggleHeaderControls.addEventListener('click', () => {
  const isHidden = document.body.classList.toggle('header-controls-hidden');
  syncSettingsToggle(settingsToggleHeaderControls, !isHidden);
  AudioEngine.playClick();
});
settingsToggleHeaderControls.addEventListener('mouseenter', () => AudioEngine.playHover());

// Settings Glitch Select Change
settingsGlitchSelect.addEventListener('change', (e) => {
  glitchSetting = e.target.value;
  localStorage.setItem('playable_gdd_glitch_setting', glitchSetting);
  AudioEngine.playClick();
});
settingsGlitchSelect.addEventListener('mouseenter', () => AudioEngine.playHover());

// Also close settings drawer when audio deck opens
btnAudioDeck.addEventListener('click', () => {
  document.body.classList.remove('settings-open');
}, true);

// ==========================================================================
// SYSTEM INITIATION
// ==========================================================================
function start() {
  const loadedScript = loadDraft();
  markdownInput.value = loadedScript;
  
  // Set initial glitch select value
  settingsGlitchSelect.value = glitchSetting;
  
  renderSlides();
  updateStatusHUD("SYSTEM READY");
}

start();
