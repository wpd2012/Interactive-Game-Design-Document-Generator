// ==========================================================================
// INTERACTIVE GDD MILESTONE TIMELINE / ROADMAP COMPONENT
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderRoadmaps(container) {
  const elements = container.querySelectorAll('.roadmap-container');

  elements.forEach(el => {
    const rawPoints = el.getAttribute('data-points');
    if (!rawPoints) return;

    const points = rawPoints.split('|').map(p => p.trim());
    const milestones = points.map((p, idx) => {
      const match = p.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);
      const name = match ? match[1].trim() : p;
      const details = match && match[2] ? match[2].trim() : '';
      
      // Parse out target date (split by comma if available, last is usually date)
      const detailParts = details.split(',');
      const date = detailParts.length > 1 ? detailParts[detailParts.length - 1].trim() : 'TBD';
      const objective = detailParts.length > 0 ? detailParts[0].trim() : 'Objective pending';

      return {
        id: idx + 1,
        name,
        date,
        objective
      };
    });

    let html = `
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;

    milestones.forEach((m, idx) => {
      const activeClass = idx === 0 ? 'active' : '';
      html += `
        <div class="roadmap-node ${activeClass}" data-index="${idx}" title="Click to inspect: ${m.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${m.name}</span>
          <span class="node-date">${m.date}</span>
        </div>
      `;
    });

    html += `
        </div>

        <div class="roadmap-details-box">
          <div class="roadmap-details-header">
            <h3 id="roadmap-active-title">${milestones[0].name}</h3>
            <span class="phase-date" id="roadmap-active-date">${milestones[0].date}</span>
          </div>
          
          <div class="roadmap-details-body">
            <div class="detail-section">
              <span class="hud-label-dim">CORE DELIVERABLE & FOCUS</span>
              <p id="roadmap-active-objective" class="deliverable-text">${milestones[0].objective}</p>
            </div>
            
            <div class="detail-section">
              <span class="hud-label-dim">MILESTONE CHECKLIST</span>
              <ul class="roadmap-checklist" id="roadmap-active-checklist">
                <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
                <li><span class="check-box">☐</span> Prototype core logic loop testing</li>
                <li><span class="check-box">☐</span> Document packaging and review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    el.innerHTML = html;

    const nodes = el.querySelectorAll('.roadmap-node');
    const badgeEl = el.querySelector('#roadmap-active-badge');
    const titleEl = el.querySelector('#roadmap-active-title');
    const dateEl = el.querySelector('#roadmap-active-date');
    const objectiveEl = el.querySelector('#roadmap-active-objective');
    const checklistEl = el.querySelector('#roadmap-active-checklist');

    // Click node handler
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const idx = parseInt(node.getAttribute('data-index'), 10);
        const milestone = milestones[idx];

        // Update active class
        nodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        // Play feedback sounds
        AudioEngine.playSuccess();

        // Update detail box
        badgeEl.textContent = `PHASE ${milestone.id}`;
        titleEl.textContent = milestone.name;
        dateEl.textContent = milestone.date;
        objectiveEl.textContent = milestone.objective;

        // Generate procedural checklist items based on milestone ID
        let checklistHtml = `
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;
        if (milestone.id > 1) {
          checklistHtml += `<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>`;
        } else {
          checklistHtml += `<li><span class="check-box">☐</span> Prototype core logic loop testing</li>`;
        }

        if (milestone.id === milestones.length) {
          checklistHtml += `
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `;
        } else if (milestone.id >= 3) {
          checklistHtml += `
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `;
        } else {
          checklistHtml += `
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `;
        }

        checklistEl.innerHTML = checklistHtml;
      });

      node.addEventListener('mouseenter', () => AudioEngine.playHover());
    });
  });
}
