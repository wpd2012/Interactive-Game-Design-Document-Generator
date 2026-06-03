// ==========================================================================
// INTERACTIVE CORE LOOP GENERATOR — HTML + SVG HYBRID
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderLoops(container) {
  const elements = container.querySelectorAll('.loop-diagram-container');

  elements.forEach(el => {
    const rawNodes = el.getAttribute('data-nodes');
    if (!rawNodes) return;

    const nodes = rawNodes.split(',').map(n => n.trim());
    const numNodes = nodes.length;

    // Layout settings
    const width = 520;
    const height = 380;
    const cx = width / 2;
    const cy = height / 2;
    const r = 120; // radius of the circle

    // Calculate node positions
    const nodeCoords = [];
    for (let i = 0; i < numNodes; i++) {
      const angle = (i * (360 / numNodes) - 90) * (Math.PI / 180);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      nodeCoords.push({ x, y, angle });
    }

    // === Build SVG arrow layer (background) ===
    let arrowsSvg = `<svg class="loop-arrows-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="loop-arrow-${el.id || Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="loop-arrow-active-${el.id || Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;

    const markerId = el.id || Math.random().toString(36).slice(2);

    // Recalculate with stable marker IDs
    arrowsSvg = `<svg class="loop-arrows-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="la-${markerId}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="la-act-${markerId}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;

    for (let i = 0; i < numNodes; i++) {
      const angleStart = nodeCoords[i].angle + 0.4;
      const angleEnd = nodeCoords[(i + 1) % numNodes].angle - 0.4;
      const x1 = cx + r * Math.cos(angleStart);
      const y1 = cy + r * Math.sin(angleStart);
      const x2 = cx + r * Math.cos(angleEnd);
      const y2 = cy + r * Math.sin(angleEnd);

      arrowsSvg += `<path class="loop-arc" data-arc-index="${i}"
        d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}"
        marker-end="url(#la-${markerId})" />`;
    }
    arrowsSvg += `</svg>`;

    // === Build HTML node layer ===
    let nodesHtml = '';
    nodeCoords.forEach((coord, idx) => {
      const text = nodes[idx];
      // Position nodes using percentage-based coordinates
      const leftPct = (coord.x / width) * 100;
      const topPct = (coord.y / height) * 100;

      nodesHtml += `
        <button class="loop-node-btn" data-index="${idx}"
                style="left: ${leftPct}%; top: ${topPct}%;">
          <span class="loop-node-label">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>
        </button>`;
    });

    // === Center label ===
    const centerHtml = `<div class="loop-center-label">
      <span class="loop-center-icon">⟳</span>
      <span class="loop-center-text">LOOP</span>
    </div>`;

    // === Assemble ===
    el.innerHTML = `
      <div class="loop-stage" style="--loop-w: ${width}px; --loop-h: ${height}px;">
        <div class="loop-arrows-layer">${arrowsSvg}</div>
        <div class="loop-nodes-layer">${nodesHtml}</div>
        ${centerHtml}
      </div>`;

    // === Bind events ===
    el.querySelectorAll('.loop-node-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        AudioEngine.playHover();
        btn.classList.add('is-active');
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const arcs = el.querySelectorAll('.loop-arc');
        if (arcs[idx]) {
          arcs[idx].classList.add('is-active');
          arcs[idx].setAttribute('marker-end', `url(#la-act-${markerId})`);
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('is-active');
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        const arcs = el.querySelectorAll('.loop-arc');
        if (arcs[idx]) {
          arcs[idx].classList.remove('is-active');
          arcs[idx].setAttribute('marker-end', `url(#la-${markerId})`);
        }
      });

      btn.addEventListener('click', () => {
        AudioEngine.playClick();
      });
    });
  });
}
