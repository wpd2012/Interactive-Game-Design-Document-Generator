// ==========================================================================
// INTERACTIVE AI STATE MACHINE VISUALIZER
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderStateMachines(container) {
  const elements = container.querySelectorAll('.state-machine-container');
  
  elements.forEach(el => {
    const rawStates = el.getAttribute('data-states');
    const rawDescs = el.getAttribute('data-descriptions');
    
    if (!rawStates) return;
    
    const states = rawStates.split(',');
    const descs = rawDescs ? rawDescs.split('|') : [];
    
    let html = `
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;
    
    states.forEach((state, idx) => {
      const activeClass = idx === 0 ? 'active' : '';
      const descText = descs[idx] || 'System monitoring triggers.';
      
      html += `
        <div class="state-node-wrapper">
          <div class="state-node ${activeClass}" data-index="${idx}" data-desc="${descText}">
            <div class="state-indicator"></div>
            <span class="state-name">${state}</span>
          </div>
      `;
      
      // Add arrow separator between nodes (except for the last one)
      if (idx < states.length - 1) {
        html += `
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `;
      }
      
      html += `</div>`; // end state-node-wrapper
    });
    
    // Add detail card to show description of active state
    const initialDesc = descs[0] || 'System monitoring triggers.';
    html += `
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${states[0]}</strong></span>
        <p id="active-state-desc">${initialDesc}</p>
      </div>
    `;
    
    el.innerHTML = html;
    
    const nodes = el.querySelectorAll('.state-node');
    const activeTitle = el.querySelector('#active-state-title');
    const activeDesc = el.querySelector('#active-state-desc');
    
    // Interaction logic
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        if (node.classList.contains('active')) return;
        
        // Remove active class from others
        nodes.forEach(n => n.classList.remove('active'));
        
        // Add to clicked
        node.classList.add('active');
        
        const index = node.getAttribute('data-index');
        const stateName = states[index];
        const stateDesc = node.getAttribute('data-desc');
        
        // Update details text
        activeTitle.textContent = stateName;
        activeDesc.textContent = stateDesc;
        
        // Visual impact trigger: glow arrow transition
        const connectors = el.querySelectorAll('.connector-arrow path');
        connectors.forEach((path, cIdx) => {
          if (cIdx == index - 1) {
            // Pulse incoming transition arrow
            path.style.stroke = 'var(--text-accent-secondary)';
            setTimeout(() => { path.style.stroke = ''; }, 600);
          }
        });
        
        // Play click / transition alert sound
        AudioEngine.playSuccess();
      });
      
      node.addEventListener('mouseenter', () => {
        AudioEngine.playHover();
      });
    });
  });
}
