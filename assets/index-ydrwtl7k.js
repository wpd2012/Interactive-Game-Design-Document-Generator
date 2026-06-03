(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();function we(t){return t?t.split(/\n\s*---\s*\n/).map(s=>{let n="";const r=s.split(`
`);let i=!1,u="",g=[];const f=()=>{i&&(n+=`<ul>${u}</ul>`,u="",i=!1)},d=()=>{g.length>0&&(n+='<div class="slide-grid">',g.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",g=[])};for(let E=0;E<r.length;E++){let v=r[E].trim();if(!v){f(),d();continue}const h=v.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){f(),g.push({title:h[1].trim(),desc:h[2].trim()});continue}d();const a=v.match(/^\[loop:\s*([^\]]+)\]/);if(a){f();const m=a[1].split("->").map(b=>b.trim());n+=`<div class="loop-diagram-container" data-nodes="${m.join(",")}"></div>`;continue}const y=v.match(/^\[pacing:\s*([^\]]+)\]/);if(y){f();const m=y[1].split(",").map(b=>b.trim());n+=`<div class="pacing-container" data-points="${m.join(",")}"></div>`;continue}const c=v.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(c){f();const m=c[1].trim(),b=c[2].trim();n+=`<div class="sandbox-container" data-type="${m}" data-config="${b}"></div>`;continue}const l=v.match(/^\[roadmap:\s*([^\]]+)\]/);if(l){f();const m=l[1].split("->").map(b=>b.trim());n+=`<div class="roadmap-container" data-points="${m.join("|")}"></div>`;continue}const p=v.match(/^\[state:\s*([^\]]+)\]/);if(p){f();const m=p[1].split("->").map($=>$.trim()),b=[],L=[];m.forEach($=>{const T=$.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);T?(b.push(T[1].trim()),L.push(T[2]?T[2].trim():"System monitoring triggers.")):(b.push($),L.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${L.join("|")}"></div>`;continue}if(v.startsWith("# ")){f();const m=v.substring(2).trim();n+=`<h1>${W(m)}</h1>`;continue}if(v.startsWith("## ")){f();const m=v.substring(3).trim();n+=`<h2>${W(m)}</h2>`;continue}if(v.startsWith("* ")||v.startsWith("- ")){i=!0;const m=v.substring(2).trim();u+=`<li>${W(m)}</li>`;continue}f(),n+=`<p>${W(v)}</p>`}return f(),d(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function W(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class Ce{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(e){console.error("Web Audio API is not supported in this browser.",e)}}setEnabled(e){this.isEnabled=e,this.ctx&&!e?this.ctx.suspend():this.ctx&&e&&this.ctx.resume()}createDecayGain(e,s){const n=this.ctx.createGain();return n.gain.setValueAtTime(e,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+s),n}playHover(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),s=this.createDecayGain(.04,this.config.hover.decay);e.type=this.config.hover.type,e.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),e.connect(s),s.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),s=this.createDecayGain(.08,this.config.click.decay);e.type=this.config.click.type,e.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),r=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),e.connect(s),s.connect(this.ctx.destination),n.connect(r),r.connect(this.ctx.destination),e.start(),n.start(),e.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.sampleRate*.25,s=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=s.getChannelData(0);for(let g=0;g<e;g++)n[g]=Math.random()*2-1;const r=this.ctx.createBufferSource();r.buffer=s;const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(1500,this.ctx.currentTime),i.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);r.connect(i),i.connect(u),u.connect(this.ctx.destination),r.start(),r.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.currentTime,s=[261.63,329.63,392,523.25],n=.08;s.forEach((r,i)=>{const u=this.ctx.createOscillator(),g=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(r,e+i*n),g.gain.setValueAtTime(.05,e+i*n),g.gain.exponentialRampToValueAtTime(1e-4,e+(i+1)*n+.05),u.connect(g),g.connect(this.ctx.destination),u.start(e+i*n),u.stop(e+(i+2)*n)})}}const o=new Ce;function Se(t){t.querySelectorAll(".loop-diagram-container").forEach(s=>{const n=s.getAttribute("data-nodes");if(!n)return;const r=n.split(",").map(l=>l.trim()),i=r.length,u=520,g=380,f=u/2,d=g/2,E=120,v=[];for(let l=0;l<i;l++){const p=(l*(360/i)-90)*(Math.PI/180),m=f+E*Math.cos(p),b=d+E*Math.sin(p);v.push({x:m,y:b,angle:p})}let h=`<svg class="loop-arrows-svg" viewBox="0 0 ${u} ${g}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="loop-arrow-${s.id||Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="loop-arrow-active-${s.id||Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;const a=s.id||Math.random().toString(36).slice(2);h=`<svg class="loop-arrows-svg" viewBox="0 0 ${u} ${g}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="la-${a}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="la-act-${a}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;for(let l=0;l<i;l++){const p=v[l].angle+.4,m=v[(l+1)%i].angle-.4,b=f+E*Math.cos(p),L=d+E*Math.sin(p),$=f+E*Math.cos(m),T=d+E*Math.sin(m);h+=`<path class="loop-arc" data-arc-index="${l}"
        d="M ${b} ${L} A ${E} ${E} 0 0 1 ${$} ${T}"
        marker-end="url(#la-${a})" />`}h+="</svg>";let y="";v.forEach((l,p)=>{const m=r[p],b=l.x/u*100,L=l.y/g*100;y+=`
        <button class="loop-node-btn" data-index="${p}"
                style="left: ${b}%; top: ${L}%;">
          <span class="loop-node-label">${m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span>
        </button>`});const c=`<div class="loop-center-label">
      <span class="loop-center-icon">⟳</span>
      <span class="loop-center-text">LOOP</span>
    </div>`;s.innerHTML=`
      <div class="loop-stage" style="--loop-w: ${u}px; --loop-h: ${g}px;">
        <div class="loop-arrows-layer">${h}</div>
        <div class="loop-nodes-layer">${y}</div>
        ${c}
      </div>`,s.querySelectorAll(".loop-node-btn").forEach(l=>{l.addEventListener("mouseenter",()=>{o.playHover(),l.classList.add("is-active");const p=parseInt(l.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.add("is-active"),m[p].setAttribute("marker-end",`url(#la-act-${a})`))}),l.addEventListener("mouseleave",()=>{l.classList.remove("is-active");const p=parseInt(l.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.remove("is-active"),m[p].setAttribute("marker-end",`url(#la-${a})`))}),l.addEventListener("click",()=>{o.playClick()})})})}function Ae(t){t.querySelectorAll(".pacing-container").forEach(s=>{const n=s.getAttribute("data-points");if(!n)return;let r=n.split(",").map(c=>{const l=parseInt(c.trim(),10);return isNaN(l)?50:Math.max(0,Math.min(100,l))});const i=r.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const g=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];r.forEach((c,l)=>{const p=g[l]||`P${l+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${p}: ${c}%</label>
          <input type="range" class="pacing-slider" data-index="${l}" min="0" max="100" value="${c}">
        </div>
      `}),u+="</div>",u+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,s.innerHTML=u;const f=s.querySelector(".pacing-canvas"),d=f.getContext("2d"),E=s.querySelectorAll(".pacing-slider"),v=s.querySelectorAll(".btn-preset"),h=()=>{const c=f.clientWidth,l=f.clientHeight;if(c===0||l===0)return;(f.width!==c||f.height!==l)&&(f.width=c,f.height=l);const p=f.width,m=f.height;d.clearRect(0,0,p,m);const b=getComputedStyle(document.documentElement),L=b.getPropertyValue("--text-accent").trim()||"#00ffff",$=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",T=b.getPropertyValue("--border-color").trim()||"#1f1f45";d.strokeStyle=T,d.lineWidth=1,d.setLineDash([4,4]);for(let x of[.25,.5,.75]){const k=m*x;d.beginPath(),d.moveTo(0,k),d.lineTo(p,k),d.stroke()}d.setLineDash([]);const D=40,q=p-D*2,C=r.map((x,k)=>{const I=D+k/(i-1)*q,F=m-20-x/100*(m-40);return{x:I,y:F}}),Z=d.createLinearGradient(0,0,0,m);Z.addColorStop(0,L+"22"),Z.addColorStop(1,"transparent"),d.fillStyle=Z,d.beginPath(),d.moveTo(C[0].x,m),d.lineTo(C[0].x,C[0].y);for(let x=0;x<C.length-1;x++){const k=C[x],I=C[x+1],F=k.x+(I.x-k.x)/2,J=k.y,ee=k.x+(I.x-k.x)/2,te=I.y;d.bezierCurveTo(F,J,ee,te,I.x,I.y)}d.lineTo(C[C.length-1].x,m),d.closePath(),d.fill(),d.strokeStyle=L,d.lineWidth=3,d.shadowBlur=10,d.shadowColor=L,d.beginPath(),d.moveTo(C[0].x,C[0].y);for(let x=0;x<C.length-1;x++){const k=C[x],I=C[x+1],F=k.x+(I.x-k.x)/2,J=k.y,ee=k.x+(I.x-k.x)/2,te=I.y;d.bezierCurveTo(F,J,ee,te,I.x,I.y)}d.stroke(),d.shadowBlur=0,C.forEach((x,k)=>{d.fillStyle=$,d.strokeStyle="#ffffff",d.lineWidth=2,d.beginPath(),d.arc(x.x,x.y,6,0,Math.PI*2),d.fill(),d.stroke(),d.fillStyle="var(--text-main)",d.font="9px monospace",d.textAlign="center",d.fillText(`${r[k]}%`,x.x,x.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(f);const y=c=>{const l=[...r];let p=0;const m=18,b=()=>{p++;const L=p/m,$=L*(2-L);r=l.map((T,D)=>{const q=c[D]!==void 0?c[D]:50;return Math.round(T+(q-T)*$)}),E.forEach((T,D)=>{T.value=r[D];const q=T.parentElement.querySelector("label"),C=g[D]||`P${D+1}`;q.textContent=`${C}: ${r[D]}%`}),s.setAttribute("data-points",r.join(",")),h(),p<m&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(c=>{c.addEventListener("input",l=>{const p=parseInt(c.getAttribute("data-index"),10),m=parseInt(l.target.value,10);r[p]=m;const b=c.parentElement.querySelector("label"),L=g[p]||`P${p+1}`;b.textContent=`${L}: ${m}%`,s.setAttribute("data-points",r.join(",")),h()}),c.addEventListener("mousedown",()=>{o.playClick()}),c.addEventListener("mouseenter",()=>{o.playHover()})}),v.forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-preset");let p=[];switch(l){case"boss":p=[10,20,30,95,20];break;case"stealth":p=[75,80,25,15,10];break;case"slow":p=[10,30,50,70,90];break;case"flat":p=[40,40,40,40,40];break}o.playSuccess(),y(p)}),c.addEventListener("mouseenter",()=>{o.playHover()})})})}function Te(t){t.querySelectorAll(".state-machine-container").forEach(s=>{const n=s.getAttribute("data-states"),r=s.getAttribute("data-descriptions");if(!n)return;const i=n.split(","),u=r?r.split("|"):[];let g=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;i.forEach((h,a)=>{const y=a===0?"active":"",c=u[a]||"System monitoring triggers.";g+=`
        <div class="state-node-wrapper">
          <div class="state-node ${y}" data-index="${a}" data-desc="${c}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,a<i.length-1&&(g+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),g+="</div>"});const f=u[0]||"System monitoring triggers.";g+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${i[0]}</strong></span>
        <p id="active-state-desc">${f}</p>
      </div>
    `,s.innerHTML=g;const d=s.querySelectorAll(".state-node"),E=s.querySelector("#active-state-title"),v=s.querySelector("#active-state-desc");d.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;d.forEach(p=>p.classList.remove("active")),h.classList.add("active");const a=h.getAttribute("data-index"),y=i[a],c=h.getAttribute("data-desc");E.textContent=y,v.textContent=c,s.querySelectorAll(".connector-arrow path").forEach((p,m)=>{m==a-1&&(p.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{p.style.stroke=""},600))}),o.playSuccess()}),h.addEventListener("mouseenter",()=>{o.playHover()})})})}function Ie(t){t.querySelectorAll(".sandbox-container").forEach(s=>{const n=s.getAttribute("data-type"),r=s.getAttribute("data-config");r&&(n==="formula"?$e(s,r):n==="loot"&&De(s,r))})}function $e(t,e){const s=e.split("|").map(a=>a.trim()),r=s[0].split("=").map(a=>a.trim()),i=r[0]||"Result",u=r[1]||"",g={};for(let a=1;a<s.length;a++)s[a].split(",").map(c=>c.trim()).forEach(c=>{const l=c.split(":").map(p=>p.trim());l.length===2&&(g[l[0]]=parseFloat(l[1])||0)});let f=`
    <div class="sandbox-card formula-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📊 EQUATION PLAYGROUND</span>
        <span class="hud-label status">LIVE CALCULATOR</span>
      </div>
      
      <div class="formula-display-box">
        <div class="formula-expr">${i} = <span class="accent-expr">${u}</span></div>
        <div class="formula-output">
          <span class="output-label">${i}:</span>
          <span class="output-val" id="formula-result-val">0.00</span>
        </div>
      </div>

      <div class="sandbox-controls">
  `;const d={...g};Object.keys(d).forEach(a=>{const y=d[a],c=y>0?Math.ceil(y*3):100;f+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${a}</span>
          <span class="var-val" id="val-display-${a}">${y}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${a}" min="0" max="${c}" value="${y}" step="1">
      </div>
    `}),f+=`
      </div>
    </div>
  `,t.innerHTML=f;const E=t.querySelector("#formula-result-val"),v=t.querySelectorAll(".sandbox-slider"),h=()=>{let a=u;const y=Object.keys(d).sort((c,l)=>l.length-c.length);for(const c of y){const l=new RegExp("\\b"+c+"\\b","g");a=a.replace(l,d[c])}if(/^[0-9+\-*/().\s]+$/.test(a))try{const c=Function(`"use strict"; return (${a})`)();typeof c=="number"&&!isNaN(c)&&isFinite(c)?E.textContent=c%1===0?c:c.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};v.forEach(a=>{a.addEventListener("input",y=>{const c=a.getAttribute("data-var"),l=parseFloat(y.target.value)||0;d[c]=l,t.querySelector(`#val-display-${c}`).textContent=l,h()}),a.addEventListener("mouseenter",()=>o.playHover()),a.addEventListener("mousedown",()=>o.playClick())}),h()}function De(t,e){const s=[];let n=0;e.split(",").map(v=>v.trim()).forEach(v=>{const h=v.split(":").map(a=>a.trim());if(h.length===2){const a=h[0],y=parseFloat(h[1])||0;s.push({name:a,weight:y}),n+=y}});let i=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const u={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};s.forEach(v=>{const h=(v.weight/n*100).toFixed(1),a=v.name.toLowerCase(),y=u[a]||"var(--text-accent)";i+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${y};" title="${v.name}: ${h}%"></div>
    `}),i+=`
      </div>

      <div class="loot-stats-grid">
  `,s.forEach(v=>{const h=(v.weight/n*100).toFixed(1),a=v.name.toLowerCase(),y=u[a]||"var(--text-accent)";i+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${y};">• ${v.name.toUpperCase()}</span>
        <span class="loot-pct">${h}%</span>
        <span class="loot-rolled-count" id="count-${a}">0 rolled</span>
      </div>
    `}),i+=`
      </div>

      <div class="loot-simulation-pane">
        <div class="loot-log" id="loot-console">
          <div class="log-line text-muted">> Chest unopened. Press roll to drop loot.</div>
        </div>
        <button class="btn btn-primary btn-roll-loot">🔓 OPEN DROP BOX</button>
      </div>
    </div>
  `,t.innerHTML=i;const g=t.querySelector(".btn-roll-loot"),f=t.querySelector("#loot-console"),d={};s.forEach(v=>{d[v.name.toLowerCase()]=0});let E=0;g.addEventListener("click",()=>{E++;const v=Math.random()*n;let h=0,a=s[0];for(let p=0;p<s.length;p++)if(h+=s[p].weight,v<=h){a=s[p];break}const y=a.name.toLowerCase();d[y]++,s.forEach(p=>{const m=p.name.toLowerCase(),b=d[m],L=(b/E*100).toFixed(0);t.querySelector(`#count-${m}`).textContent=`${b} (${L}%)`}),y==="legendary"||y==="exotic"?o.playSuccess():o.playClick();const c=u[y]||"var(--text-accent)",l=document.createElement("div");l.className="log-line",l.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${c}; text-shadow: 0 0 4px ${c}55;">[${a.name.toUpperCase()}]</strong>`,f.appendChild(l),f.scrollTop=f.scrollHeight,(y==="legendary"||y==="exotic")&&(g.classList.add("btn-pulse-glow"),setTimeout(()=>g.classList.remove("btn-pulse-glow"),500))}),g.addEventListener("mouseenter",()=>o.playHover())}function Me(t){t.querySelectorAll(".roadmap-container").forEach(s=>{const n=s.getAttribute("data-points");if(!n)return;const i=n.split("|").map(a=>a.trim()).map((a,y)=>{const c=a.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),l=c?c[1].trim():a,m=(c&&c[2]?c[2].trim():"").split(","),b=m.length>1?m[m.length-1].trim():"TBD",L=m.length>0?m[0].trim():"Objective pending";return{id:y+1,name:l,date:b,objective:L}});let u=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;i.forEach((a,y)=>{u+=`
        <div class="roadmap-node ${y===0?"active":""}" data-index="${y}" title="Click to inspect: ${a.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${a.name}</span>
          <span class="node-date">${a.date}</span>
        </div>
      `}),u+=`
        </div>

        <div class="roadmap-details-box">
          <div class="roadmap-details-header">
            <h3 id="roadmap-active-title">${i[0].name}</h3>
            <span class="phase-date" id="roadmap-active-date">${i[0].date}</span>
          </div>
          
          <div class="roadmap-details-body">
            <div class="detail-section">
              <span class="hud-label-dim">CORE DELIVERABLE & FOCUS</span>
              <p id="roadmap-active-objective" class="deliverable-text">${i[0].objective}</p>
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
    `,s.innerHTML=u;const g=s.querySelectorAll(".roadmap-node"),f=s.querySelector("#roadmap-active-badge"),d=s.querySelector("#roadmap-active-title"),E=s.querySelector("#roadmap-active-date"),v=s.querySelector("#roadmap-active-objective"),h=s.querySelector("#roadmap-active-checklist");g.forEach(a=>{a.addEventListener("click",()=>{const y=parseInt(a.getAttribute("data-index"),10),c=i[y];g.forEach(p=>p.classList.remove("active")),a.classList.add("active"),o.playSuccess(),f.textContent=`PHASE ${c.id}`,d.textContent=c.name,E.textContent=c.date,v.textContent=c.objective;let l=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;c.id>1?l+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':l+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',c.id===i.length?l+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:c.id>=3?l+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:l+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,h.innerHTML=l}),a.addEventListener("mouseenter",()=>o.playHover())})})}const me="playable_gdd_draft",ae=`# CYBER-PULSE: NEON RUNNER
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
`;function Re(t){try{return localStorage.setItem(me,t),!0}catch(e){return console.error("Failed to save draft to LocalStorage",e),!1}}function Be(){try{const t=localStorage.getItem(me);return t!==null?t:ae}catch(t){return console.error("Failed to load draft from LocalStorage",t),ae}}let w=0,P=[],se=null,B=!1,M=!1,U=localStorage.getItem("playable_gdd_glitch_setting")||"low";const A=document.getElementById("markdown-input"),H=document.getElementById("slide-container"),ge=document.getElementById("current-slide-num"),Pe=document.getElementById("total-slides-num"),ve=document.getElementById("prev-slide-btn"),he=document.getElementById("next-slide-btn"),Oe=document.getElementById("status-message"),G=document.getElementById("theme-select"),Y=document.getElementById("toggle-crt"),z=document.getElementById("toggle-audio"),j=document.getElementById("toggle-editor"),V=document.getElementById("toggle-doc"),ye=document.getElementById("btn-fullscreen"),ne=document.getElementById("btn-export-trigger"),O=document.getElementById("export-dropdown-container"),oe=document.getElementById("editor-actions-select"),He=document.getElementById("audio-modal"),fe=document.getElementById("btn-enable-audio"),X=document.getElementById("btn-settings"),Ne=document.getElementById("settings-drawer"),Ee=document.getElementById("btn-close-settings"),be=document.getElementById("settings-theme-select"),ie=document.getElementById("settings-toggle-crt"),re=document.getElementById("settings-toggle-audio"),K=document.getElementById("settings-toggle-editor"),Q=document.getElementById("settings-toggle-doc"),ce=document.getElementById("settings-toggle-header-controls"),le=document.getElementById("settings-glitch-select");function R(){const t=A.value;P=we(t),Pe.textContent=P.length,w>=P.length&&(w=Math.max(0,P.length-1)),ge.textContent=w+1,H.innerHTML=P[w]||"",Se(H),Ae(H),Te(H),Ie(H),Me(H),qe()}function de(){U==="normal"?(document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220)):U==="low"&&(document.body.classList.add("glitch-active-low"),setTimeout(()=>{document.body.classList.remove("glitch-active-low")},150))}function _(t){t<0||t>=P.length||(w=t,ge.textContent=w+1,o.playTransition(),de(),R(),S(`VIEWING SLIDE ${w+1}`))}function qe(){H.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",s=>{const n=e.getBoundingClientRect(),r=s.clientX-n.left,i=s.clientY-n.top,u=n.width,g=n.height,f=(r/u-.5)*20,d=-(i/g-.5)*20;e.style.transform=`rotateX(${d}deg) rotateY(${f}deg) scale(1.03)`}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),e.addEventListener("mouseenter",()=>{o.playHover()}),e.addEventListener("click",()=>{o.playClick()})})}function Fe(t){const e=A.selectionStart,s=A.value;let n="";switch(t){case"slide":n=`
---
# NEW SLIDE TITLE
## Subheading
- Point 1
- Point 2
`;break;case"loop":n=`
[loop: Start -> Core Loop -> Action -> Reward]
`;break;case"pacing":n=`
[pacing: 15, 30, 75, 40, 20]
`;break;case"state":n=`
[state: Idle (Resting / scanning) -> Chase (Locking target) -> Attack (Fire pulse) -> Search (Seek target)]
`;break;case"card":n=`
[card: Feature Title | Visual descriptions of custom game systems.]
`;break;case"formula":n=`
[sandbox: formula | Damage = ATK * 1.5 - DEF | ATK: 80, DEF: 30]
`;break;case"loot":n=`
[sandbox: loot | Common: 60, Rare: 25, Epic: 12, Legendary: 3]
`;break;case"roadmap":n=`
[roadmap: Concept (Mechanic Pitch, Q1) -> Prototype (Core Mechanics, Q2) -> Alpha (Checklist & Testing, Q3) -> Release (Launch, Q4)]
`;break}const r=s.substring(0,e),i=s.substring(e);A.value=r+n+i,A.focus();const u=e+n.length;A.setSelectionRange(u,u),o.playClick(),R(),ue()}function ue(){S("SAVING..."),se&&clearTimeout(se),se=setTimeout(()=>{Re(A.value),S("SYSTEM READY • AUTO-SAVED")},1e3)}function S(t){Oe.textContent=t}document.addEventListener("keydown",t=>{document.activeElement!==A&&(M||(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),w<P.length-1?_(w+1):o.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),w>0?_(w-1):o.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),Le()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&xe()))});function Le(){o.playClick(),document.body.classList.contains("presentation-fullscreen")?xe():(document.body.classList.add("presentation-fullscreen"),S("FULLSCREEN PRESENTER MODE ACTIVE"))}function xe(){document.body.classList.remove("presentation-fullscreen"),S("SYSTEM READY")}G.addEventListener("change",t=>{const e=t.target.value;document.documentElement.setAttribute("data-theme",e),o.playClick(),R()});G.addEventListener("mouseenter",()=>o.playHover());j.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),j.classList.toggle("active",B),N(K,B),B&&(M=!1,document.body.classList.remove("markdown-solo"),V.classList.remove("active"),N(Q,!1)),de(),o.playClick(),setTimeout(()=>{R(),S(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});j.addEventListener("mouseenter",()=>o.playHover());V.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),V.classList.toggle("active",M),N(Q,M),M&&(B=!1,document.body.classList.remove("live-solo"),j.classList.remove("active"),N(K,!1)),de(),o.playClick(),setTimeout(()=>{R(),S(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});V.addEventListener("mouseenter",()=>o.playHover());Y.addEventListener("click",()=>{const e=!(document.documentElement.getAttribute("data-crt")==="true");document.documentElement.setAttribute("data-crt",e?"true":"false"),Y.classList.toggle("active",e),N(ie,e),o.playClick()});Y.addEventListener("mouseenter",()=>o.playHover());z.addEventListener("click",()=>{const e=!(document.documentElement.getAttribute("data-audio")==="true");document.documentElement.setAttribute("data-audio",e?"true":"false"),z.classList.toggle("active",e),N(re,e),o.setEnabled(e),o.playClick()});z.addEventListener("mouseenter",()=>o.playHover());ve.addEventListener("click",()=>{w>0&&_(w-1)});ve.addEventListener("mouseenter",()=>o.playHover());he.addEventListener("click",()=>{w<P.length-1&&_(w+1)});he.addEventListener("mouseenter",()=>o.playHover());ye.addEventListener("click",Le);ye.addEventListener("mouseenter",()=>o.playHover());ne&&O&&(ne.addEventListener("click",e=>{e.stopPropagation();const s=O.classList.contains("open");O.classList.toggle("open",!s),o.playClick()}),ne.addEventListener("mouseenter",()=>o.playHover()),O.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("mouseenter",()=>o.playHover()),e.addEventListener("click",s=>{s.stopPropagation();const n=e.getAttribute("data-value");if(O.classList.remove("open"),n==="pdf")o.playClick(),window.print();else if(n==="html")_e();else if(n==="markdown"){const r=A.value,i=new Blob([r],{type:"text/markdown"}),u=URL.createObjectURL(i),g=document.createElement("a");g.href=u,g.download="game_design_document.md",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(u),o.playSuccess(),S("GDD MARKDOWN FILE DOWNLOADED")}})}),document.addEventListener("click",e=>{O.contains(e.target)||O.classList.remove("open")}));oe.addEventListener("change",t=>{const e=t.target.value;if(e){if(e==="copy")navigator.clipboard.writeText(A.value).then(()=>{o.playSuccess(),S("GDD SOURCE COPIED TO CLIPBOARD")}).catch(s=>{console.error("Could not copy text: ",s)});else if(e==="download"){const s=A.value,n=new Blob([s],{type:"text/markdown"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download="game_design_document.md",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r),o.playSuccess(),S("GDD MARKDOWN FILE DOWNLOADED")}else e==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(A.value=ae,w=0,o.playSuccess(),R(),ue());oe.value=""}});oe.addEventListener("mouseenter",()=>o.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-inject");Fe(e)}),t.addEventListener("mouseenter",()=>o.playHover())});A.addEventListener("input",()=>{R(),ue()});fe.addEventListener("click",()=>{o.init(),He.classList.add("hidden")});fe.addEventListener("mouseenter",()=>{});const pe=document.getElementById("btn-audio-deck"),ke=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Ue=document.getElementById("param-hover-freq"),Ge=document.getElementById("param-hover-decay"),je=document.getElementById("param-hover-wave"),Ve=document.getElementById("btn-test-hover"),We=document.getElementById("param-click-freq"),Ye=document.getElementById("param-click-decay"),ze=document.getElementById("param-click-wave"),Xe=document.getElementById("btn-test-click");pe.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),o.playClick()});pe.addEventListener("mouseenter",()=>o.playHover());ke.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),o.playClick()});ke.addEventListener("mouseenter",()=>o.playHover());Ue.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-freq").textContent=`${e} Hz`,o.config.hover.freq=parseInt(e,10)});Ge.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-decay").textContent=`${e}s`,o.config.hover.decay=parseFloat(e)});je.addEventListener("change",t=>{o.config.hover.type=t.target.value});Ve.addEventListener("click",()=>o.playHover());We.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-freq").textContent=`${e} Hz`,o.config.click.freq=parseInt(e,10)});Ye.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-decay").textContent=`${e}s`,o.config.click.decay=parseFloat(e)});ze.addEventListener("change",t=>{o.config.click.type=t.target.value});Xe.addEventListener("click",()=>o.playClick());async function _e(){S("BUNDLING OFFLINE GDD..."),o.playClick();try{let t="";const e=Array.from(document.styleSheets);for(const h of e)try{if(h.href){const a=await fetch(h.href);t+=await a.text()}else{const a=Array.from(h.cssRules);t+=a.map(y=>y.cssText).join(`
`)}}catch(a){console.warn("Could not read stylesheet:",a)}let s="";const n=Array.from(document.querySelectorAll("script"));let r="";for(const h of n){const a=h.getAttribute("src");if(a&&(a.includes("assets/index")||a.includes("src/main.js")||h.type==="module")){r=a;break}}r?s=await(await fetch(r)).text():s='console.error("Main script bundle not found during export.");';const i=A.value;let u="";try{u=await(await fetch("./index.html")).text()}catch{u=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const g=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,f=i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");u=u.replace(g,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${f}</textarea>`),u=u.replace(/<link rel="stylesheet" href="[^"]+">/g,""),u=u.replace(/<script type="module" src="[^"]+"><\/script>/g,""),u=u.replace("</head>",`<style>${t}</style></head>`),u=u.replace("</body>",`<script type="module">${s}<\/script></body>`);const d=new Blob([u],{type:"text/html"}),E=URL.createObjectURL(d),v=document.createElement("a");v.href=E,v.download="interactive_game_design_document.html",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(E),o.playSuccess(),S("OFFLINE GDD EXPORTED SUCCESS")}catch(t){console.error("Error during HTML export:",t),S("EXPORT ERROR: BUNDLING FAILED")}}function N(t,e){t&&(t.classList.toggle("active",e),t.textContent=e?"ON":"OFF")}X.addEventListener("click",()=>{const t=document.body.classList.contains("settings-open");document.body.classList.remove("drawer-open"),document.body.classList.toggle("settings-open",!t),o.playClick()});X.addEventListener("mouseenter",()=>o.playHover());Ee.addEventListener("click",()=>{document.body.classList.remove("settings-open"),o.playClick()});Ee.addEventListener("mouseenter",()=>o.playHover());document.addEventListener("click",t=>{document.body.classList.contains("settings-open")&&!Ne.contains(t.target)&&t.target!==X&&!X.contains(t.target)&&document.body.classList.remove("settings-open")});be.addEventListener("change",t=>{const e=t.target.value;document.documentElement.setAttribute("data-theme",e),G.value=e,o.playClick(),R()});G.addEventListener("change",()=>{be.value=G.value});ie.addEventListener("click",()=>{Y.click()});ie.addEventListener("mouseenter",()=>o.playHover());re.addEventListener("click",()=>{z.click()});re.addEventListener("mouseenter",()=>o.playHover());K.addEventListener("click",()=>{j.click()});K.addEventListener("mouseenter",()=>o.playHover());Q.addEventListener("click",()=>{V.click()});Q.addEventListener("mouseenter",()=>o.playHover());ce.addEventListener("click",()=>{const t=document.body.classList.toggle("header-controls-hidden");N(ce,!t),o.playClick()});ce.addEventListener("mouseenter",()=>o.playHover());le.addEventListener("change",t=>{U=t.target.value,localStorage.setItem("playable_gdd_glitch_setting",U),o.playClick()});le.addEventListener("mouseenter",()=>o.playHover());pe.addEventListener("click",()=>{document.body.classList.remove("settings-open")},!0);function Ke(){const t=Be();A.value=t,le.value=U,R(),S("SYSTEM READY")}Ke();
