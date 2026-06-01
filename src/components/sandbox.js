// ==========================================================================
// INTERACTIVE MECHANICS SANDBOX (FORMULAS & LOOT DROPS)
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderSandboxes(container) {
  const elements = container.querySelectorAll('.sandbox-container');

  elements.forEach(el => {
    const type = el.getAttribute('data-type');
    const config = el.getAttribute('data-config');
    if (!config) return;

    if (type === 'formula') {
      setupFormulaSandbox(el, config);
    } else if (type === 'loot') {
      setupLootSandbox(el, config);
    }
  });
}

// --------------------------------------------------------------------------
// 1. FORMULA SANDBOX SETUP
// --------------------------------------------------------------------------
function setupFormulaSandbox(el, config) {
  // Config format: ResultName = Equation | Var1: Def1, Var2: Def2
  const parts = config.split('|').map(p => p.trim());
  const exprPart = parts[0];
  
  const eqParts = exprPart.split('=').map(e => e.trim());
  const resultLabel = eqParts[0] || 'Result';
  const formulaExpr = eqParts[1] || '';

  const varDefs = {};
  for (let i = 1; i < parts.length; i++) {
    const pairs = parts[i].split(',').map(x => x.trim());
    pairs.forEach(pair => {
      const vPair = pair.split(':').map(x => x.trim());
      if (vPair.length === 2) {
        varDefs[vPair[0]] = parseFloat(vPair[1]) || 0;
      }
    });
  }

  // Generate HTML
  let html = `
    <div class="sandbox-card formula-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📊 EQUATION PLAYGROUND</span>
        <span class="hud-label status">LIVE CALCULATOR</span>
      </div>
      
      <div class="formula-display-box">
        <div class="formula-expr">${resultLabel} = <span class="accent-expr">${formulaExpr}</span></div>
        <div class="formula-output">
          <span class="output-label">${resultLabel}:</span>
          <span class="output-val" id="formula-result-val">0.00</span>
        </div>
      </div>

      <div class="sandbox-controls">
  `;

  const vars = { ...varDefs };
  Object.keys(vars).forEach(varName => {
    const defVal = vars[varName];
    // Define max bound as 3x the default, or at least 100
    const maxVal = defVal > 0 ? Math.ceil(defVal * 3) : 100;
    html += `
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${varName}</span>
          <span class="var-val" id="val-display-${varName}">${defVal}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${varName}" min="0" max="${maxVal}" value="${defVal}" step="1">
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  el.innerHTML = html;

  const resultEl = el.querySelector('#formula-result-val');
  const sliders = el.querySelectorAll('.sandbox-slider');

  // Math Evaluator
  const evaluate = () => {
    let sanitized = formulaExpr;
    const varNames = Object.keys(vars).sort((a, b) => b.length - a.length);
    for (const name of varNames) {
      const regex = new RegExp('\\b' + name + '\\b', 'g');
      sanitized = sanitized.replace(regex, vars[name]);
    }
    
    // Whitelist only numbers, spaces, operators, brackets, decimals
    if (/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      try {
        const val = Function(`"use strict"; return (${sanitized})`)();
        if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
          // Format decimals nicely
          resultEl.textContent = val % 1 === 0 ? val : val.toFixed(2);
        } else {
          resultEl.textContent = 'NaN';
        }
      } catch (err) {
        resultEl.textContent = 'Error';
      }
    } else {
      resultEl.textContent = 'Invalid';
    }
  };

  // Bind Events
  sliders.forEach(slider => {
    slider.addEventListener('input', (e) => {
      const varName = slider.getAttribute('data-var');
      const val = parseFloat(e.target.value) || 0;
      vars[varName] = val;
      el.querySelector(`#val-display-${varName}`).textContent = val;
      evaluate();
    });

    slider.addEventListener('mouseenter', () => AudioEngine.playHover());
    slider.addEventListener('mousedown', () => AudioEngine.playClick());
  });

  evaluate();
}

// --------------------------------------------------------------------------
// 2. LOOT CHEST SIMULATOR SETUP
// --------------------------------------------------------------------------
function setupLootSandbox(el, config) {
  // Config format: Common: 60, Rare: 30, Epic: 8, Legendary: 2
  const items = [];
  let totalWeight = 0;

  const pairs = config.split(',').map(x => x.trim());
  pairs.forEach(pair => {
    const vPair = pair.split(':').map(x => x.trim());
    if (vPair.length === 2) {
      const name = vPair[0];
      const weight = parseFloat(vPair[1]) || 0;
      items.push({ name, weight });
      totalWeight += weight;
    }
  });

  // HTML layouts
  let html = `
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;

  // Color assignments for drop rarities
  const colors = {
    common: 'var(--text-muted, #858585)',
    rare: 'var(--text-accent-secondary, #00ffff)',
    epic: '#a335ee',
    legendary: '#ff8000',
    exotic: '#ff007f'
  };

  items.forEach(item => {
    const pct = ((item.weight / totalWeight) * 100).toFixed(1);
    const lowName = item.name.toLowerCase();
    const bg = colors[lowName] || 'var(--text-accent)';
    html += `
      <div class="loot-bar-segment" style="width: ${pct}%; background: ${bg};" title="${item.name}: ${pct}%"></div>
    `;
  });

  html += `
      </div>

      <div class="loot-stats-grid">
  `;

  items.forEach(item => {
    const pct = ((item.weight / totalWeight) * 100).toFixed(1);
    const lowName = item.name.toLowerCase();
    const color = colors[lowName] || 'var(--text-accent)';
    html += `
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${color};">• ${item.name.toUpperCase()}</span>
        <span class="loot-pct">${pct}%</span>
        <span class="loot-rolled-count" id="count-${lowName}">0 rolled</span>
      </div>
    `;
  });

  html += `
      </div>

      <div class="loot-simulation-pane">
        <div class="loot-log" id="loot-console">
          <div class="log-line text-muted">> Chest unopened. Press roll to drop loot.</div>
        </div>
        <button class="btn btn-primary btn-roll-loot">🔓 OPEN DROP BOX</button>
      </div>
    </div>
  `;

  el.innerHTML = html;

  const btnRoll = el.querySelector('.btn-roll-loot');
  const consoleEl = el.querySelector('#loot-console');
  const counters = {};
  items.forEach(item => {
    counters[item.name.toLowerCase()] = 0;
  });

  let rollCount = 0;

  // Click Roll
  btnRoll.addEventListener('click', () => {
    rollCount++;
    
    // Weighted selection
    const rand = Math.random() * totalWeight;
    let accum = 0;
    let selectedItem = items[0];

    for (let i = 0; i < items.length; i++) {
      accum += items[i].weight;
      if (rand <= accum) {
        selectedItem = items[i];
        break;
      }
    }

    const lowName = selectedItem.name.toLowerCase();
    counters[lowName]++;
    
    // Update stats count displays
    items.forEach(item => {
      const lName = item.name.toLowerCase();
      const count = counters[lName];
      const percentRolled = ((count / rollCount) * 100).toFixed(0);
      el.querySelector(`#count-${lName}`).textContent = `${count} (${percentRolled}%)`;
    });

    // Sound FX: standard roll or legendary success drop!
    if (lowName === 'legendary' || lowName === 'exotic') {
      AudioEngine.playSuccess();
    } else {
      AudioEngine.playClick();
    }

    // Append to console logger
    const color = colors[lowName] || 'var(--text-accent)';
    const logLine = document.createElement('div');
    logLine.className = 'log-line';
    logLine.innerHTML = `> Roll #${rollCount}: Dropped <strong style="color: ${color}; text-shadow: 0 0 4px ${color}55;">[${selectedItem.name.toUpperCase()}]</strong>`;
    
    consoleEl.appendChild(logLine);
    consoleEl.scrollTop = consoleEl.scrollHeight;

    // Glitch button briefly on legendary
    if (lowName === 'legendary' || lowName === 'exotic') {
      btnRoll.classList.add('btn-pulse-glow');
      setTimeout(() => btnRoll.classList.remove('btn-pulse-glow'), 500);
    }
  });

  btnRoll.addEventListener('mouseenter', () => AudioEngine.playHover());
}
