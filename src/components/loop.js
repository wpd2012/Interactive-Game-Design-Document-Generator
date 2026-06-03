// ==========================================================================
// INTERACTIVE SVG CORE LOOP GENERATOR
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderLoops(container) {
  // Find all loop containers in the target element
  const elements = container.querySelectorAll('.loop-diagram-container');
  
  elements.forEach(el => {
    const rawNodes = el.getAttribute('data-nodes');
    if (!rawNodes) return;
    
    const nodes = rawNodes.split(',');
    const numNodes = nodes.length;
    
    // SVG Settings
    const width = 600;
    const height = 360;
    const cx = width / 2;
    const cy = height / 2;
    const r = 105; // Radius of the circle of nodes
    
    let svgContent = `
      <svg class="loop-diagram-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG Definitions for Markers (Arrowheads) -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-muted)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-accent)" />
          </marker>
        </defs>
    `;
    
    // Coordinates of each node
    const nodeCoords = [];
    for (let i = 0; i < numNodes; i++) {
      // Offset by -90 degrees so the first node starts at the top
      const angle = (i * (360 / numNodes) - 90) * (Math.PI / 180);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      nodeCoords.push({ x, y, angle });
    }
    
    // Draw Arcs connecting the nodes
    for (let i = 0; i < numNodes; i++) {
      const startNode = nodeCoords[i];
      const endNode = nodeCoords[(i + 1) % numNodes];
      
      // Calculate arc path
      const angleStart = startNode.angle + 0.35; // offset slightly from center of node
      const angleEnd = endNode.angle - 0.35;
      
      const x1 = cx + r * Math.cos(angleStart);
      const y1 = cy + r * Math.sin(angleStart);
      const x2 = cx + r * Math.cos(angleEnd);
      const y2 = cy + r * Math.sin(angleEnd);
      
      // Large-arc-flag is 0 for these segments
      svgContent += `
        <path class="loop-arrow-path" 
              d="M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}" 
              marker-end="url(#arrow)" />
      `;
    }
    
    // Draw Nodes (Pills with text)
    nodeCoords.forEach((coord, idx) => {
      const nodeText = nodes[idx];
      const textWidth = Math.max(80, nodeText.length * 8 + 15);
      const rectW = textWidth;
      const rectH = 30;
      const rectX = coord.x - rectW / 2;
      const rectY = coord.y - rectH / 2;
      
      svgContent += `
        <g class="loop-node" data-index="${idx}">
          <rect class="loop-node-box" x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}" rx="6" ry="6" />
          <text class="loop-node-text" x="${coord.x}" y="${coord.y}">${nodeText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>
        </g>
      `;
    });
    
    svgContent += `</svg>`;
    el.innerHTML = svgContent;
    
    // Bind sounds and events to nodes
    el.querySelectorAll('.loop-node').forEach(nodeGroup => {
      nodeGroup.addEventListener('mouseenter', () => {
        AudioEngine.playHover();
        
        // Temporarily highlight the arrows connected to this node
        const idx = parseInt(nodeGroup.getAttribute('data-index'), 10);
        const paths = el.querySelectorAll('.loop-arrow-path');
        
        // Highlight outgoing path
        if (paths[idx]) {
          paths[idx].style.stroke = 'var(--text-accent)';
          paths[idx].setAttribute('marker-end', 'url(#arrow-active)');
        }
      });
      
      nodeGroup.addEventListener('mouseleave', () => {
        const idx = parseInt(nodeGroup.getAttribute('data-index'), 10);
        const paths = el.querySelectorAll('.loop-arrow-path');
        if (paths[idx]) {
          paths[idx].style.stroke = '';
          paths[idx].setAttribute('marker-end', 'url(#arrow)');
        }
      });
      
      nodeGroup.addEventListener('click', () => {
        AudioEngine.playClick();
      });
    });
  });
}
