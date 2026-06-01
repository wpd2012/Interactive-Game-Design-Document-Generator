// ==========================================================================
// CUSTOM SLIDE MARKDOWN PARSER
// ==========================================================================

export function parseMarkdownToSlides(markdown) {
  if (!markdown) return ['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>'];

  // Split slides by "---" delimiter (with optional whitespace/newlines)
  const rawSlides = markdown.split(/\n\s*---\s*\n/);
  
  return rawSlides.map(slideText => {
    let html = '';
    const lines = slideText.split('\n');
    let inList = false;
    let listHTML = '';
    
    // Track consecutive card elements to group them in a grid
    let cardsBatch = [];
    
    const flushList = () => {
      if (inList) {
        html += `<ul>${listHTML}</ul>`;
        listHTML = '';
        inList = false;
      }
    };

    const flushCards = () => {
      if (cardsBatch.length > 0) {
        html += `<div class="slide-grid">`;
        cardsBatch.forEach(card => {
          html += `
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${card.title}</h3>
                <p>${card.desc}</p>
              </div>
            </div>
          `;
        });
        html += `</div>`;
        cardsBatch = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line) {
        // Empty line resets lists and cards
        flushList();
        flushCards();
        continue;
      }

      // 1. Custom Tags
      
      // Card tag: [card: Title | Description]
      const cardMatch = line.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);
      if (cardMatch) {
        flushList();
        cardsBatch.push({
          title: cardMatch[1].trim(),
          desc: cardMatch[2].trim()
        });
        continue;
      }

      // If we see a non-card line, flush any accumulated cards first
      flushCards();

      // Loop diagram: [loop: Start -> Action -> Loop]
      const loopMatch = line.match(/^\[loop:\s*([^\]]+)\]/);
      if (loopMatch) {
        flushList();
        const nodes = loopMatch[1].split('->').map(n => n.trim());
        html += `<div class="loop-diagram-container" data-nodes="${nodes.join(',')}"></div>`;
        continue;
      }

      // Pacing chart: [pacing: 10, 40, 60, 20]
      const pacingMatch = line.match(/^\[pacing:\s*([^\]]+)\]/);
      if (pacingMatch) {
        flushList();
        const points = pacingMatch[1].split(',').map(p => p.trim());
        html += `<div class="pacing-container" data-points="${points.join(',')}"></div>`;
        continue;
      }

      // State machine diagram: [state: Idle (Scan area) -> Patrol (Walk path)]
      const stateMatch = line.match(/^\[state:\s*([^\]]+)\]/);
      if (stateMatch) {
        flushList();
        const rawNodes = stateMatch[1].split('->').map(n => n.trim());
        const states = [];
        const descs = [];
        rawNodes.forEach(node => {
          const descMatch = node.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);
          if (descMatch) {
            states.push(descMatch[1].trim());
            descs.push(descMatch[2] ? descMatch[2].trim() : 'System monitoring triggers.');
          } else {
            states.push(node);
            descs.push('System monitoring triggers.');
          }
        });
        html += `<div class="state-machine-container" data-states="${states.join(',')}" data-descriptions="${descs.join('|')}"></div>`;
        continue;
      }

      // 2. Headings
      if (line.startsWith('# ')) {
        flushList();
        const text = line.substring(2).trim();
        html += `<h1>${parseInlineStyles(text)}</h1>`;
        continue;
      }
      if (line.startsWith('## ')) {
        flushList();
        const text = line.substring(3).trim();
        html += `<h2>${parseInlineStyles(text)}</h2>`;
        continue;
      }

      // 3. Lists
      if (line.startsWith('* ') || line.startsWith('- ')) {
        inList = true;
        const text = line.substring(2).trim();
        listHTML += `<li>${parseInlineStyles(text)}</li>`;
        continue;
      }

      // 4. Regular Paragraphs
      flushList();
      html += `<p>${parseInlineStyles(line)}</p>`;
    }

    // Flush any leftover open blocks
    flushList();
    flushCards();

    return `<div class="slide-content">${html}</div>`;
  });
}

// Helper: Parse inline markdown styles like bold **text**
function parseInlineStyles(text) {
  // Convert double asterisks to strong tags
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}
