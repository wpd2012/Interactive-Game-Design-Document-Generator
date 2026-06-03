(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=a(i);fetch(i.href,c)}})();function pe(t){return t?t.split(/\n\s*---\s*\n/).map(a=>{let o="";const i=a.split(`
`);let c=!1,u="",y=[];const f=()=>{c&&(o+=`<ul>${u}</ul>`,u="",c=!1)},r=()=>{y.length>0&&(o+='<div class="slide-grid">',y.forEach(E=>{o+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),o+="</div>",y=[])};for(let E=0;E<i.length;E++){let p=i[E].trim();if(!p){f(),r();continue}const h=p.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){f(),y.push({title:h[1].trim(),desc:h[2].trim()});continue}r();const e=p.match(/^\[loop:\s*([^\]]+)\]/);if(e){f();const g=e[1].split("->").map(b=>b.trim());o+=`<div class="loop-diagram-container" data-nodes="${g.join(",")}"></div>`;continue}const d=p.match(/^\[pacing:\s*([^\]]+)\]/);if(d){f();const g=d[1].split(",").map(b=>b.trim());o+=`<div class="pacing-container" data-points="${g.join(",")}"></div>`;continue}const s=p.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(s){f();const g=s[1].trim(),b=s[2].trim();o+=`<div class="sandbox-container" data-type="${g}" data-config="${b}"></div>`;continue}const m=p.match(/^\[roadmap:\s*([^\]]+)\]/);if(m){f();const g=m[1].split("->").map(b=>b.trim());o+=`<div class="roadmap-container" data-points="${g.join("|")}"></div>`;continue}const v=p.match(/^\[state:\s*([^\]]+)\]/);if(v){f();const g=v[1].split("->").map($=>$.trim()),b=[],x=[];g.forEach($=>{const I=$.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);I?(b.push(I[1].trim()),x.push(I[2]?I[2].trim():"System monitoring triggers.")):(b.push($),x.push("System monitoring triggers."))}),o+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${x.join("|")}"></div>`;continue}if(p.startsWith("# ")){f();const g=p.substring(2).trim();o+=`<h1>${q(g)}</h1>`;continue}if(p.startsWith("## ")){f();const g=p.substring(3).trim();o+=`<h2>${q(g)}</h2>`;continue}if(p.startsWith("* ")||p.startsWith("- ")){c=!0;const g=p.substring(2).trim();u+=`<li>${q(g)}</li>`;continue}f(),o+=`<p>${q(p)}</p>`}return f(),r(),`<div class="slide-content">${o}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function q(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class me{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(n){console.error("Web Audio API is not supported in this browser.",n)}}setEnabled(n){this.isEnabled=n,this.ctx&&!n?this.ctx.suspend():this.ctx&&n&&this.ctx.resume()}createDecayGain(n,a){const o=this.ctx.createGain();return o.gain.setValueAtTime(n,this.ctx.currentTime),o.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+a),o}playHover(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.createOscillator(),a=this.createDecayGain(.04,this.config.hover.decay);n.type=this.config.hover.type,n.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),n.connect(a),a.connect(this.ctx.destination),n.start(),n.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.createOscillator(),a=this.createDecayGain(.08,this.config.click.decay);n.type=this.config.click.type,n.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const o=this.ctx.createOscillator(),i=this.createDecayGain(.05,.015);o.type="square",o.frequency.setValueAtTime(1200,this.ctx.currentTime),n.connect(a),a.connect(this.ctx.destination),o.connect(i),i.connect(this.ctx.destination),n.start(),o.start(),n.stop(this.ctx.currentTime+this.config.click.decay),o.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.sampleRate*.25,a=this.ctx.createBuffer(1,n,this.ctx.sampleRate),o=a.getChannelData(0);for(let y=0;y<n;y++)o[y]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=a;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(1500,this.ctx.currentTime),c.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);i.connect(c),c.connect(u),u.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.currentTime,a=[261.63,329.63,392,523.25],o=.08;a.forEach((i,c)=>{const u=this.ctx.createOscillator(),y=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(i,n+c*o),y.gain.setValueAtTime(.05,n+c*o),y.gain.exponentialRampToValueAtTime(1e-4,n+(c+1)*o+.05),u.connect(y),y.connect(this.ctx.destination),u.start(n+c*o),u.stop(n+(c+2)*o)})}}const l=new me;function he(t){t.querySelectorAll(".loop-diagram-container").forEach(a=>{const o=a.getAttribute("data-nodes");if(!o)return;const i=o.split(","),c=i.length,u=600,y=360,f=u/2,r=y/2,E=105;let p=`
      <svg class="loop-diagram-svg" viewBox="0 0 ${u} ${y}" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG Definitions for Markers (Arrowheads) -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-muted)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-accent)" />
          </marker>
        </defs>
    `;const h=[];for(let e=0;e<c;e++){const d=(e*(360/c)-90)*(Math.PI/180),s=f+E*Math.cos(d),m=r+E*Math.sin(d);h.push({x:s,y:m,angle:d})}for(let e=0;e<c;e++){const d=h[e],s=h[(e+1)%c],m=d.angle+.35,v=s.angle-.35,g=f+E*Math.cos(m),b=r+E*Math.sin(m),x=f+E*Math.cos(v),$=r+E*Math.sin(v);p+=`
        <path class="loop-arrow-path" 
              d="M ${g} ${b} A ${E} ${E} 0 0 1 ${x} ${$}" 
              marker-end="url(#arrow)" />
      `}h.forEach((e,d)=>{const s=i[d],v=Math.max(80,s.length*8+15),g=30,b=e.x-v/2,x=e.y-g/2;p+=`
        <g class="loop-node" data-index="${d}">
          <rect class="loop-node-box" x="${b}" y="${x}" width="${v}" height="${g}" rx="6" ry="6" />
          <text class="loop-node-text" x="${e.x}" y="${e.y}">${s}</text>
        </g>
      `}),p+="</svg>",a.innerHTML=p,a.querySelectorAll(".loop-node").forEach(e=>{e.addEventListener("mouseenter",()=>{l.playHover();const d=parseInt(e.getAttribute("data-index"),10),s=a.querySelectorAll(".loop-arrow-path");s[d]&&(s[d].style.stroke="var(--text-accent)",s[d].setAttribute("marker-end","url(#arrow-active)"))}),e.addEventListener("mouseleave",()=>{const d=parseInt(e.getAttribute("data-index"),10),s=a.querySelectorAll(".loop-arrow-path");s[d]&&(s[d].style.stroke="",s[d].setAttribute("marker-end","url(#arrow)"))}),e.addEventListener("click",()=>{l.playClick()})})})}function ve(t){t.querySelectorAll(".pacing-container").forEach(a=>{const o=a.getAttribute("data-points");if(!o)return;let i=o.split(",").map(s=>{const m=parseInt(s.trim(),10);return isNaN(m)?50:Math.max(0,Math.min(100,m))});const c=i.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const y=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];i.forEach((s,m)=>{const v=y[m]||`P${m+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${v}: ${s}%</label>
          <input type="range" class="pacing-slider" data-index="${m}" min="0" max="100" value="${s}">
        </div>
      `}),u+="</div>",u+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,a.innerHTML=u;const f=a.querySelector(".pacing-canvas"),r=f.getContext("2d"),E=a.querySelectorAll(".pacing-slider"),p=a.querySelectorAll(".btn-preset"),h=()=>{const s=f.clientWidth,m=f.clientHeight;if(s===0||m===0)return;(f.width!==s||f.height!==m)&&(f.width=s,f.height=m);const v=f.width,g=f.height;r.clearRect(0,0,v,g);const b=getComputedStyle(document.documentElement),x=b.getPropertyValue("--text-accent").trim()||"#00ffff",$=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",I=b.getPropertyValue("--border-color").trim()||"#1f1f45";r.strokeStyle=I,r.lineWidth=1,r.setLineDash([4,4]);for(let L of[.25,.5,.75]){const k=g*L;r.beginPath(),r.moveTo(0,k),r.lineTo(v,k),r.stroke()}r.setLineDash([]);const D=40,H=v-D*2,w=i.map((L,k)=>{const T=D+k/(c-1)*H,N=g-20-L/100*(g-40);return{x:T,y:N}}),V=r.createLinearGradient(0,0,0,g);V.addColorStop(0,x+"22"),V.addColorStop(1,"transparent"),r.fillStyle=V,r.beginPath(),r.moveTo(w[0].x,g),r.lineTo(w[0].x,w[0].y);for(let L=0;L<w.length-1;L++){const k=w[L],T=w[L+1],N=k.x+(T.x-k.x)/2,G=k.y,W=k.x+(T.x-k.x)/2,Y=T.y;r.bezierCurveTo(N,G,W,Y,T.x,T.y)}r.lineTo(w[w.length-1].x,g),r.closePath(),r.fill(),r.strokeStyle=x,r.lineWidth=3,r.shadowBlur=10,r.shadowColor=x,r.beginPath(),r.moveTo(w[0].x,w[0].y);for(let L=0;L<w.length-1;L++){const k=w[L],T=w[L+1],N=k.x+(T.x-k.x)/2,G=k.y,W=k.x+(T.x-k.x)/2,Y=T.y;r.bezierCurveTo(N,G,W,Y,T.x,T.y)}r.stroke(),r.shadowBlur=0,w.forEach((L,k)=>{r.fillStyle=$,r.strokeStyle="#ffffff",r.lineWidth=2,r.beginPath(),r.arc(L.x,L.y,6,0,Math.PI*2),r.fill(),r.stroke(),r.fillStyle="var(--text-main)",r.font="9px monospace",r.textAlign="center",r.fillText(`${i[k]}%`,L.x,L.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(f);const d=s=>{const m=[...i];let v=0;const g=18,b=()=>{v++;const x=v/g,$=x*(2-x);i=m.map((I,D)=>{const H=s[D]!==void 0?s[D]:50;return Math.round(I+(H-I)*$)}),E.forEach((I,D)=>{I.value=i[D];const H=I.parentElement.querySelector("label"),w=y[D]||`P${D+1}`;H.textContent=`${w}: ${i[D]}%`}),a.setAttribute("data-points",i.join(",")),h(),v<g&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(s=>{s.addEventListener("input",m=>{const v=parseInt(s.getAttribute("data-index"),10),g=parseInt(m.target.value,10);i[v]=g;const b=s.parentElement.querySelector("label"),x=y[v]||`P${v+1}`;b.textContent=`${x}: ${g}%`,a.setAttribute("data-points",i.join(",")),h()}),s.addEventListener("mousedown",()=>{l.playClick()}),s.addEventListener("mouseenter",()=>{l.playHover()})}),p.forEach(s=>{s.addEventListener("click",()=>{const m=s.getAttribute("data-preset");let v=[];switch(m){case"boss":v=[10,20,30,95,20];break;case"stealth":v=[75,80,25,15,10];break;case"slow":v=[10,30,50,70,90];break;case"flat":v=[40,40,40,40,40];break}l.playSuccess(),d(v)}),s.addEventListener("mouseenter",()=>{l.playHover()})})})}function ge(t){t.querySelectorAll(".state-machine-container").forEach(a=>{const o=a.getAttribute("data-states"),i=a.getAttribute("data-descriptions");if(!o)return;const c=o.split(","),u=i?i.split("|"):[];let y=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;c.forEach((h,e)=>{const d=e===0?"active":"",s=u[e]||"System monitoring triggers.";y+=`
        <div class="state-node-wrapper">
          <div class="state-node ${d}" data-index="${e}" data-desc="${s}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,e<c.length-1&&(y+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),y+="</div>"});const f=u[0]||"System monitoring triggers.";y+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${c[0]}</strong></span>
        <p id="active-state-desc">${f}</p>
      </div>
    `,a.innerHTML=y;const r=a.querySelectorAll(".state-node"),E=a.querySelector("#active-state-title"),p=a.querySelector("#active-state-desc");r.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;r.forEach(v=>v.classList.remove("active")),h.classList.add("active");const e=h.getAttribute("data-index"),d=c[e],s=h.getAttribute("data-desc");E.textContent=d,p.textContent=s,a.querySelectorAll(".connector-arrow path").forEach((v,g)=>{g==e-1&&(v.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{v.style.stroke=""},600))}),l.playSuccess()}),h.addEventListener("mouseenter",()=>{l.playHover()})})})}function fe(t){t.querySelectorAll(".sandbox-container").forEach(a=>{const o=a.getAttribute("data-type"),i=a.getAttribute("data-config");i&&(o==="formula"?ye(a,i):o==="loot"&&Ee(a,i))})}function ye(t,n){const a=n.split("|").map(e=>e.trim()),i=a[0].split("=").map(e=>e.trim()),c=i[0]||"Result",u=i[1]||"",y={};for(let e=1;e<a.length;e++)a[e].split(",").map(s=>s.trim()).forEach(s=>{const m=s.split(":").map(v=>v.trim());m.length===2&&(y[m[0]]=parseFloat(m[1])||0)});let f=`
    <div class="sandbox-card formula-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📊 EQUATION PLAYGROUND</span>
        <span class="hud-label status">LIVE CALCULATOR</span>
      </div>
      
      <div class="formula-display-box">
        <div class="formula-expr">${c} = <span class="accent-expr">${u}</span></div>
        <div class="formula-output">
          <span class="output-label">${c}:</span>
          <span class="output-val" id="formula-result-val">0.00</span>
        </div>
      </div>

      <div class="sandbox-controls">
  `;const r={...y};Object.keys(r).forEach(e=>{const d=r[e],s=d>0?Math.ceil(d*3):100;f+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${e}</span>
          <span class="var-val" id="val-display-${e}">${d}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${e}" min="0" max="${s}" value="${d}" step="1">
      </div>
    `}),f+=`
      </div>
    </div>
  `,t.innerHTML=f;const E=t.querySelector("#formula-result-val"),p=t.querySelectorAll(".sandbox-slider"),h=()=>{let e=u;const d=Object.keys(r).sort((s,m)=>m.length-s.length);for(const s of d){const m=new RegExp("\\b"+s+"\\b","g");e=e.replace(m,r[s])}if(/^[0-9+\-*/().\s]+$/.test(e))try{const s=Function(`"use strict"; return (${e})`)();typeof s=="number"&&!isNaN(s)&&isFinite(s)?E.textContent=s%1===0?s:s.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};p.forEach(e=>{e.addEventListener("input",d=>{const s=e.getAttribute("data-var"),m=parseFloat(d.target.value)||0;r[s]=m,t.querySelector(`#val-display-${s}`).textContent=m,h()}),e.addEventListener("mouseenter",()=>l.playHover()),e.addEventListener("mousedown",()=>l.playClick())}),h()}function Ee(t,n){const a=[];let o=0;n.split(",").map(p=>p.trim()).forEach(p=>{const h=p.split(":").map(e=>e.trim());if(h.length===2){const e=h[0],d=parseFloat(h[1])||0;a.push({name:e,weight:d}),o+=d}});let c=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const u={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};a.forEach(p=>{const h=(p.weight/o*100).toFixed(1),e=p.name.toLowerCase(),d=u[e]||"var(--text-accent)";c+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${d};" title="${p.name}: ${h}%"></div>
    `}),c+=`
      </div>

      <div class="loot-stats-grid">
  `,a.forEach(p=>{const h=(p.weight/o*100).toFixed(1),e=p.name.toLowerCase(),d=u[e]||"var(--text-accent)";c+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${d};">• ${p.name.toUpperCase()}</span>
        <span class="loot-pct">${h}%</span>
        <span class="loot-rolled-count" id="count-${e}">0 rolled</span>
      </div>
    `}),c+=`
      </div>

      <div class="loot-simulation-pane">
        <div class="loot-log" id="loot-console">
          <div class="log-line text-muted">> Chest unopened. Press roll to drop loot.</div>
        </div>
        <button class="btn btn-primary btn-roll-loot">🔓 OPEN DROP BOX</button>
      </div>
    </div>
  `,t.innerHTML=c;const y=t.querySelector(".btn-roll-loot"),f=t.querySelector("#loot-console"),r={};a.forEach(p=>{r[p.name.toLowerCase()]=0});let E=0;y.addEventListener("click",()=>{E++;const p=Math.random()*o;let h=0,e=a[0];for(let v=0;v<a.length;v++)if(h+=a[v].weight,p<=h){e=a[v];break}const d=e.name.toLowerCase();r[d]++,a.forEach(v=>{const g=v.name.toLowerCase(),b=r[g],x=(b/E*100).toFixed(0);t.querySelector(`#count-${g}`).textContent=`${b} (${x}%)`}),d==="legendary"||d==="exotic"?l.playSuccess():l.playClick();const s=u[d]||"var(--text-accent)",m=document.createElement("div");m.className="log-line",m.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${s}; text-shadow: 0 0 4px ${s}55;">[${e.name.toUpperCase()}]</strong>`,f.appendChild(m),f.scrollTop=f.scrollHeight,(d==="legendary"||d==="exotic")&&(y.classList.add("btn-pulse-glow"),setTimeout(()=>y.classList.remove("btn-pulse-glow"),500))}),y.addEventListener("mouseenter",()=>l.playHover())}function be(t){t.querySelectorAll(".roadmap-container").forEach(a=>{const o=a.getAttribute("data-points");if(!o)return;const c=o.split("|").map(e=>e.trim()).map((e,d)=>{const s=e.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),m=s?s[1].trim():e,g=(s&&s[2]?s[2].trim():"").split(","),b=g.length>1?g[g.length-1].trim():"TBD",x=g.length>0?g[0].trim():"Objective pending";return{id:d+1,name:m,date:b,objective:x}});let u=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;c.forEach((e,d)=>{u+=`
        <div class="roadmap-node ${d===0?"active":""}" data-index="${d}" title="Click to inspect: ${e.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${e.name}</span>
          <span class="node-date">${e.date}</span>
        </div>
      `}),u+=`
        </div>

        <div class="roadmap-details-box">
          <div class="roadmap-details-header">
            <h3 id="roadmap-active-title">${c[0].name}</h3>
            <span class="phase-date" id="roadmap-active-date">${c[0].date}</span>
          </div>
          
          <div class="roadmap-details-body">
            <div class="detail-section">
              <span class="hud-label-dim">CORE DELIVERABLE & FOCUS</span>
              <p id="roadmap-active-objective" class="deliverable-text">${c[0].objective}</p>
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
    `,a.innerHTML=u;const y=a.querySelectorAll(".roadmap-node"),f=a.querySelector("#roadmap-active-badge"),r=a.querySelector("#roadmap-active-title"),E=a.querySelector("#roadmap-active-date"),p=a.querySelector("#roadmap-active-objective"),h=a.querySelector("#roadmap-active-checklist");y.forEach(e=>{e.addEventListener("click",()=>{const d=parseInt(e.getAttribute("data-index"),10),s=c[d];y.forEach(v=>v.classList.remove("active")),e.classList.add("active"),l.playSuccess(),f.textContent=`PHASE ${s.id}`,r.textContent=s.name,E.textContent=s.date,p.textContent=s.objective;let m=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;s.id>1?m+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':m+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',s.id===c.length?m+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:s.id>=3?m+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:m+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,h.innerHTML=m}),e.addEventListener("mouseenter",()=>l.playHover())})})}const J="playable_gdd_draft",X=`# CYBER-PULSE: NEON RUNNER
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
`;function xe(t){try{return localStorage.setItem(J,t),!0}catch(n){return console.error("Failed to save draft to LocalStorage",n),!1}}function Le(){try{const t=localStorage.getItem(J);return t!==null?t:X}catch(t){return console.error("Failed to load draft from LocalStorage",t),X}}let S=0,R=[],z=null,B=!1,M=!1;const A=document.getElementById("markdown-input"),O=document.getElementById("slide-container"),ee=document.getElementById("current-slide-num"),ke=document.getElementById("total-slides-num"),te=document.getElementById("prev-slide-btn"),se=document.getElementById("next-slide-btn"),Se=document.getElementById("status-message"),ne=document.getElementById("theme-select"),K=document.getElementById("toggle-crt"),Q=document.getElementById("toggle-audio"),F=document.getElementById("toggle-editor"),U=document.getElementById("toggle-doc"),ae=document.getElementById("btn-fullscreen"),oe=document.getElementById("btn-export"),ce=document.getElementById("btn-export-html"),_=document.getElementById("editor-actions-select"),we=document.getElementById("audio-modal"),ie=document.getElementById("btn-enable-audio");function P(){const t=A.value;R=pe(t),ke.textContent=R.length,S>=R.length&&(S=Math.max(0,R.length-1)),ee.textContent=S+1,O.innerHTML=R[S]||"",he(O),ve(O),ge(O),fe(O),be(O),Ce()}function j(t){t<0||t>=R.length||(S=t,ee.textContent=S+1,l.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),P(),C(`VIEWING SLIDE ${S+1}`))}function Ce(){O.querySelectorAll(".tilt-card").forEach(n=>{n.addEventListener("mousemove",a=>{const o=n.getBoundingClientRect(),i=a.clientX-o.left,c=a.clientY-o.top,u=o.width,y=o.height,f=(i/u-.5)*20,r=-(c/y-.5)*20;n.style.transform=`rotateX(${r}deg) rotateY(${f}deg) scale(1.03)`}),n.addEventListener("mouseleave",()=>{n.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),n.addEventListener("mouseenter",()=>{l.playHover()}),n.addEventListener("click",()=>{l.playClick()})})}function Ae(t){const n=A.selectionStart,a=A.value;let o="";switch(t){case"slide":o=`
---
# NEW SLIDE TITLE
## Subheading
- Point 1
- Point 2
`;break;case"loop":o=`
[loop: Start -> Core Loop -> Action -> Reward]
`;break;case"pacing":o=`
[pacing: 15, 30, 75, 40, 20]
`;break;case"state":o=`
[state: Idle (Resting / scanning) -> Chase (Locking target) -> Attack (Fire pulse) -> Search (Seek target)]
`;break;case"card":o=`
[card: Feature Title | Visual descriptions of custom game systems.]
`;break;case"formula":o=`
[sandbox: formula | Damage = ATK * 1.5 - DEF | ATK: 80, DEF: 30]
`;break;case"loot":o=`
[sandbox: loot | Common: 60, Rare: 25, Epic: 12, Legendary: 3]
`;break;case"roadmap":o=`
[roadmap: Concept (Mechanic Pitch, Q1) -> Prototype (Core Mechanics, Q2) -> Alpha (Checklist & Testing, Q3) -> Release (Launch, Q4)]
`;break}const i=a.substring(0,n),c=a.substring(n);A.value=i+o+c,A.focus();const u=n+o.length;A.setSelectionRange(u,u),l.playClick(),P(),Z()}function Z(){C("SAVING..."),z&&clearTimeout(z),z=setTimeout(()=>{xe(A.value),C("SYSTEM READY • AUTO-SAVED")},1e3)}function C(t){Se.textContent=t}document.addEventListener("keydown",t=>{document.activeElement!==A&&(M||(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),S<R.length-1?j(S+1):l.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),S>0?j(S-1):l.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),re()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&le()))});function re(){l.playClick(),document.body.classList.contains("presentation-fullscreen")?le():(document.body.classList.add("presentation-fullscreen"),C("FULLSCREEN PRESENTER MODE ACTIVE"))}function le(){document.body.classList.remove("presentation-fullscreen"),C("SYSTEM READY")}ne.addEventListener("change",t=>{const n=t.target.value;document.documentElement.setAttribute("data-theme",n),l.playClick(),P()});ne.addEventListener("mouseenter",()=>l.playHover());F.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),F.classList.toggle("active",B),B&&(M=!1,document.body.classList.remove("markdown-solo"),U.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),C(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${S+1}`)},320)});F.addEventListener("mouseenter",()=>l.playHover());U.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),U.classList.toggle("active",M),M&&(B=!1,document.body.classList.remove("live-solo"),F.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),C(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${S+1}`)},320)});U.addEventListener("mouseenter",()=>l.playHover());K.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",t?"false":"true"),K.classList.toggle("active",!t),l.playClick()});K.addEventListener("mouseenter",()=>l.playHover());Q.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",t?"false":"true"),Q.classList.toggle("active",!t),l.setEnabled(!t),l.playClick()});Q.addEventListener("mouseenter",()=>l.playHover());te.addEventListener("click",()=>{S>0&&j(S-1)});te.addEventListener("mouseenter",()=>l.playHover());se.addEventListener("click",()=>{S<R.length-1&&j(S+1)});se.addEventListener("mouseenter",()=>l.playHover());ae.addEventListener("click",re);ae.addEventListener("mouseenter",()=>l.playHover());oe.addEventListener("click",()=>{l.playClick(),window.print()});oe.addEventListener("mouseenter",()=>l.playHover());ce.addEventListener("click",Oe);ce.addEventListener("mouseenter",()=>l.playHover());_.addEventListener("change",t=>{const n=t.target.value;if(n){if(n==="copy")navigator.clipboard.writeText(A.value).then(()=>{l.playSuccess(),C("GDD SOURCE COPIED TO CLIPBOARD")}).catch(a=>{console.error("Could not copy text: ",a)});else if(n==="download"){const a=A.value,o=new Blob([a],{type:"text/markdown"}),i=URL.createObjectURL(o),c=document.createElement("a");c.href=i,c.download="game_design_document.md",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i),l.playSuccess(),C("GDD MARKDOWN FILE DOWNLOADED")}else n==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(A.value=X,S=0,l.playSuccess(),P(),Z());_.value=""}});_.addEventListener("mouseenter",()=>l.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const n=t.getAttribute("data-inject");Ae(n)}),t.addEventListener("mouseenter",()=>l.playHover())});A.addEventListener("input",()=>{P(),Z()});ie.addEventListener("click",()=>{l.init(),we.classList.add("hidden")});ie.addEventListener("mouseenter",()=>{});const de=document.getElementById("btn-audio-deck"),ue=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Te=document.getElementById("param-hover-freq"),Ie=document.getElementById("param-hover-decay"),$e=document.getElementById("param-hover-wave"),De=document.getElementById("btn-test-hover"),Me=document.getElementById("param-click-freq"),Re=document.getElementById("param-click-decay"),Pe=document.getElementById("param-click-wave"),Be=document.getElementById("btn-test-click");de.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),l.playClick()});de.addEventListener("mouseenter",()=>l.playHover());ue.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),l.playClick()});ue.addEventListener("mouseenter",()=>l.playHover());Te.addEventListener("input",t=>{const n=t.target.value;document.getElementById("val-hover-freq").textContent=`${n} Hz`,l.config.hover.freq=parseInt(n,10)});Ie.addEventListener("input",t=>{const n=t.target.value;document.getElementById("val-hover-decay").textContent=`${n}s`,l.config.hover.decay=parseFloat(n)});$e.addEventListener("change",t=>{l.config.hover.type=t.target.value});De.addEventListener("click",()=>l.playHover());Me.addEventListener("input",t=>{const n=t.target.value;document.getElementById("val-click-freq").textContent=`${n} Hz`,l.config.click.freq=parseInt(n,10)});Re.addEventListener("input",t=>{const n=t.target.value;document.getElementById("val-click-decay").textContent=`${n}s`,l.config.click.decay=parseFloat(n)});Pe.addEventListener("change",t=>{l.config.click.type=t.target.value});Be.addEventListener("click",()=>l.playClick());async function Oe(){C("BUNDLING OFFLINE GDD..."),l.playClick();try{let t="";const n=Array.from(document.styleSheets);for(const h of n)try{if(h.href){const e=await fetch(h.href);t+=await e.text()}else{const e=Array.from(h.cssRules);t+=e.map(d=>d.cssText).join(`
`)}}catch(e){console.warn("Could not read stylesheet:",e)}let a="";const o=Array.from(document.querySelectorAll("script"));let i="";for(const h of o){const e=h.getAttribute("src");if(e&&(e.includes("assets/index")||e.includes("src/main.js")||h.type==="module")){i=e;break}}i?a=await(await fetch(i)).text():a='console.error("Main script bundle not found during export.");';const c=A.value;let u="";try{u=await(await fetch("./index.html")).text()}catch{u=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const y=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,f=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");u=u.replace(y,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${f}</textarea>`),u=u.replace(/<link rel="stylesheet" href="[^"]+">/g,""),u=u.replace(/<script type="module" src="[^"]+"><\/script>/g,""),u=u.replace("</head>",`<style>${t}</style></head>`),u=u.replace("</body>",`<script type="module">${a}<\/script></body>`);const r=new Blob([u],{type:"text/html"}),E=URL.createObjectURL(r),p=document.createElement("a");p.href=E,p.download="interactive_game_design_document.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(E),l.playSuccess(),C("OFFLINE GDD EXPORTED SUCCESS")}catch(t){console.error("Error during HTML export:",t),C("EXPORT ERROR: BUNDLING FAILED")}}function He(){const t=Le();A.value=t,P(),C("SYSTEM READY")}He();
