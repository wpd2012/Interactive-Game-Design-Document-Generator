// ==========================================================================
// INTERACTIVE CANVAS-BASED PACING GRAPH
// ==========================================================================
import { AudioEngine } from '../core/audio.js';

export function renderPacingGraphs(container) {
  const elements = container.querySelectorAll('.pacing-container');
  
  elements.forEach(el => {
    const rawPoints = el.getAttribute('data-points');
    if (!rawPoints) return;
    
    // Parse point values (normally 0 to 100)
    let points = rawPoints.split(',').map(p => {
      const val = parseInt(p.trim(), 10);
      return isNaN(val) ? 50 : Math.max(0, Math.min(100, val));
    });
    
    const numPoints = points.length;
    
    // Build HTML layout with canvas and sliders
    let html = `
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas" width="600" height="200"></canvas>
      <div class="pacing-controls">
    `;
    
    // Auto-generate labels like P1, P2, P3... or customizable ones
    const labels = ['Intro', 'Rising', 'Midpoint', 'Climax', 'Ending', 'P6', 'P7', 'P8'];
    
    points.forEach((val, idx) => {
      const label = labels[idx] || `P${idx + 1}`;
      html += `
        <div class="pacing-slider-group">
          <label>${label}: ${val}%</label>
          <input type="range" class="pacing-slider" data-index="${idx}" min="0" max="100" value="${val}">
        </div>
      `;
    });
    
    html += `</div>`;
    
    // Add Preset Buttons Row
    html += `
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `;
    
    el.innerHTML = html;
    
    const canvas = el.querySelector('.pacing-canvas');
    const ctx = canvas.getContext('2d');
    const sliders = el.querySelectorAll('.pacing-slider');
    const presetButtons = el.querySelectorAll('.btn-preset');
    
    // Draw function
    const drawCurve = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      ctx.clearRect(0, 0, w, h);
      
      const rootStyles = getComputedStyle(document.documentElement);
      const accentColor = rootStyles.getPropertyValue('--text-accent').trim() || '#00ffff';
      const accentSecondaryColor = rootStyles.getPropertyValue('--text-accent-secondary').trim() || '#ff007f';
      const gridColor = rootStyles.getPropertyValue('--border-color').trim() || '#1f1f45';
      
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      
      for (let yPct of [0.25, 0.5, 0.75]) {
        const y = h * yPct;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      
      const paddingX = 40;
      const usableW = w - paddingX * 2;
      const coords = points.map((val, idx) => {
        const x = paddingX + (idx / (numPoints - 1)) * usableW;
        const y = h - 20 - (val / 100) * (h - 40);
        return { x, y };
      });
      
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, accentColor + '22');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(coords[0].x, h);
      ctx.lineTo(coords[0].x, coords[0].y);
      
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[i];
        const p1 = coords[i + 1];
        const cpX1 = p0.x + (p1.x - p0.x) / 2;
        const cpY1 = p0.y;
        const cpX2 = p0.x + (p1.x - p0.x) / 2;
        const cpY2 = p1.y;
        
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
      }
      ctx.lineTo(coords[coords.length - 1].x, h);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentColor;
      
      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);
      
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[i];
        const p1 = coords[i + 1];
        const cpX1 = p0.x + (p1.x - p0.x) / 2;
        const cpY1 = p0.y;
        const cpX2 = p0.x + (p1.x - p0.x) / 2;
        const cpY2 = p1.y;
        
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
      }
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      coords.forEach((coord, idx) => {
        ctx.fillStyle = accentSecondaryColor;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = 'var(--text-main)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${points[idx]}%`, coord.x, coord.y - 12);
      });
    };
    
    drawCurve();
    
    // Helper to animate curve transitions smoothly
    const animateToPoints = (targetPoints) => {
      const startPoints = [...points];
      let frame = 0;
      const totalFrames = 18;
      
      const step = () => {
        frame++;
        const t = frame / totalFrames;
        const ease = t * (2 - t);
        
        points = startPoints.map((sp, idx) => {
          const targetVal = targetPoints[idx] !== undefined ? targetPoints[idx] : 50;
          return Math.round(sp + (targetVal - sp) * ease);
        });
        
        sliders.forEach((slider, idx) => {
          slider.value = points[idx];
          const label = slider.parentElement.querySelector('label');
          const defaultLabel = labels[idx] || `P${idx + 1}`;
          label.textContent = `${defaultLabel}: ${points[idx]}%`;
        });
        
        el.setAttribute('data-points', points.join(','));
        drawCurve();
        
        if (frame < totalFrames) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    };
    
    // Bind slider events
    sliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const idx = parseInt(slider.getAttribute('data-index'), 10);
        const val = parseInt(e.target.value, 10);
        
        points[idx] = val;
        
        const label = slider.parentElement.querySelector('label');
        const defaultLabel = labels[idx] || `P${idx + 1}`;
        label.textContent = `${defaultLabel}: ${val}%`;
        
        el.setAttribute('data-points', points.join(','));
        drawCurve();
      });
      
      slider.addEventListener('mousedown', () => {
        AudioEngine.playClick();
      });
      
      slider.addEventListener('mouseenter', () => {
        AudioEngine.playHover();
      });
    });
    
    // Bind preset button events
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-preset');
        let target = [];
        switch(type) {
          case 'boss':
            target = [10, 20, 30, 95, 20];
            break;
          case 'stealth':
            target = [75, 80, 25, 15, 10];
            break;
          case 'slow':
            target = [10, 30, 50, 70, 90];
            break;
          case 'flat':
            target = [40, 40, 40, 40, 40];
            break;
        }
        
        AudioEngine.playSuccess();
        animateToPoints(target);
      });
      
      btn.addEventListener('mouseenter', () => {
        AudioEngine.playHover();
      });
    });
  });
}
