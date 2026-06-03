(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))a(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function s(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerPolicy&&(r.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?r.credentials="include":c.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(c){if(c.ep)return;c.ep=!0;const r=s(c);fetch(c.href,r)}})();function he(e){return e?e.split(/\n\s*---\s*\n/).map(s=>{let a="";const c=s.split(`
`);let r=!1,u="",y=[];const f=()=>{r&&(a+=`<ul>${u}</ul>`,u="",r=!1)},i=()=>{y.length>0&&(a+='<div class="slide-grid">',y.forEach(E=>{a+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),a+="</div>",y=[])};for(let E=0;E<c.length;E++){let p=c[E].trim();if(!p){f(),i();continue}const h=p.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){f(),y.push({title:h[1].trim(),desc:h[2].trim()});continue}i();const t=p.match(/^\[loop:\s*([^\]]+)\]/);if(t){f();const g=t[1].split("->").map(b=>b.trim());a+=`<div class="loop-diagram-container" data-nodes="${g.join(",")}"></div>`;continue}const d=p.match(/^\[pacing:\s*([^\]]+)\]/);if(d){f();const g=d[1].split(",").map(b=>b.trim());a+=`<div class="pacing-container" data-points="${g.join(",")}"></div>`;continue}const n=p.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(n){f();const g=n[1].trim(),b=n[2].trim();a+=`<div class="sandbox-container" data-type="${g}" data-config="${b}"></div>`;continue}const m=p.match(/^\[roadmap:\s*([^\]]+)\]/);if(m){f();const g=m[1].split("->").map(b=>b.trim());a+=`<div class="roadmap-container" data-points="${g.join("|")}"></div>`;continue}const v=p.match(/^\[state:\s*([^\]]+)\]/);if(v){f();const g=v[1].split("->").map($=>$.trim()),b=[],x=[];g.forEach($=>{const I=$.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);I?(b.push(I[1].trim()),x.push(I[2]?I[2].trim():"System monitoring triggers.")):(b.push($),x.push("System monitoring triggers."))}),a+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${x.join("|")}"></div>`;continue}if(p.startsWith("# ")){f();const g=p.substring(2).trim();a+=`<h1>${U(g)}</h1>`;continue}if(p.startsWith("## ")){f();const g=p.substring(3).trim();a+=`<h2>${U(g)}</h2>`;continue}if(p.startsWith("* ")||p.startsWith("- ")){r=!0;const g=p.substring(2).trim();u+=`<li>${U(g)}</li>`;continue}f(),a+=`<p>${U(p)}</p>`}return f(),i(),`<div class="slide-content">${a}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function U(e){return e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class ve{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(o){console.error("Web Audio API is not supported in this browser.",o)}}setEnabled(o){this.isEnabled=o,this.ctx&&!o?this.ctx.suspend():this.ctx&&o&&this.ctx.resume()}createDecayGain(o,s){const a=this.ctx.createGain();return a.gain.setValueAtTime(o,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+s),a}playHover(){if(!this.isEnabled||!this.ctx)return;const o=this.ctx.createOscillator(),s=this.createDecayGain(.04,this.config.hover.decay);o.type=this.config.hover.type,o.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),o.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),o.connect(s),s.connect(this.ctx.destination),o.start(),o.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const o=this.ctx.createOscillator(),s=this.createDecayGain(.08,this.config.click.decay);o.type=this.config.click.type,o.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),o.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const a=this.ctx.createOscillator(),c=this.createDecayGain(.05,.015);a.type="square",a.frequency.setValueAtTime(1200,this.ctx.currentTime),o.connect(s),s.connect(this.ctx.destination),a.connect(c),c.connect(this.ctx.destination),o.start(),a.start(),o.stop(this.ctx.currentTime+this.config.click.decay),a.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const o=this.ctx.sampleRate*.25,s=this.ctx.createBuffer(1,o,this.ctx.sampleRate),a=s.getChannelData(0);for(let y=0;y<o;y++)a[y]=Math.random()*2-1;const c=this.ctx.createBufferSource();c.buffer=s;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1500,this.ctx.currentTime),r.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);c.connect(r),r.connect(u),u.connect(this.ctx.destination),c.start(),c.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const o=this.ctx.currentTime,s=[261.63,329.63,392,523.25],a=.08;s.forEach((c,r)=>{const u=this.ctx.createOscillator(),y=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(c,o+r*a),y.gain.setValueAtTime(.05,o+r*a),y.gain.exponentialRampToValueAtTime(1e-4,o+(r+1)*a+.05),u.connect(y),y.connect(this.ctx.destination),u.start(o+r*a),u.stop(o+(r+2)*a)})}}const l=new ve;function ge(e){e.querySelectorAll(".loop-diagram-container").forEach(s=>{const a=s.getAttribute("data-nodes");if(!a)return;const c=a.split(","),r=c.length,u=350,y=350,f=u/2,i=y/2,E=100;let p=`
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
    `;const h=[];for(let t=0;t<r;t++){const d=(t*(360/r)-90)*(Math.PI/180),n=f+E*Math.cos(d),m=i+E*Math.sin(d);h.push({x:n,y:m,angle:d})}for(let t=0;t<r;t++){const d=h[t],n=h[(t+1)%r],m=d.angle+.35,v=n.angle-.35,g=f+E*Math.cos(m),b=i+E*Math.sin(m),x=f+E*Math.cos(v),$=i+E*Math.sin(v);p+=`
        <path class="loop-arrow-path" 
              d="M ${g} ${b} A ${E} ${E} 0 0 1 ${x} ${$}" 
              marker-end="url(#arrow)" />
      `}h.forEach((t,d)=>{const n=c[d],v=Math.max(80,n.length*8+15),g=30,b=t.x-v/2,x=t.y-g/2;p+=`
        <g class="loop-node" data-index="${d}">
          <rect class="loop-node-box" x="${b}" y="${x}" width="${v}" height="${g}" rx="6" ry="6" />
          <text class="loop-node-text" x="${t.x}" y="${t.y}">${n}</text>
        </g>
      `}),p+="</svg>",s.innerHTML=p,s.querySelectorAll(".loop-node").forEach(t=>{t.addEventListener("mouseenter",()=>{l.playHover();const d=parseInt(t.getAttribute("data-index"),10),n=s.querySelectorAll(".loop-arrow-path");n[d]&&(n[d].style.stroke="var(--text-accent)",n[d].setAttribute("marker-end","url(#arrow-active)"))}),t.addEventListener("mouseleave",()=>{const d=parseInt(t.getAttribute("data-index"),10),n=s.querySelectorAll(".loop-arrow-path");n[d]&&(n[d].style.stroke="",n[d].setAttribute("marker-end","url(#arrow)"))}),t.addEventListener("click",()=>{l.playClick()})})})}function fe(e){e.querySelectorAll(".pacing-container").forEach(s=>{const a=s.getAttribute("data-points");if(!a)return;let c=a.split(",").map(n=>{const m=parseInt(n.trim(),10);return isNaN(m)?50:Math.max(0,Math.min(100,m))});const r=c.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const y=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];c.forEach((n,m)=>{const v=y[m]||`P${m+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${v}: ${n}%</label>
          <input type="range" class="pacing-slider" data-index="${m}" min="0" max="100" value="${n}">
        </div>
      `}),u+="</div>",u+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,s.innerHTML=u;const f=s.querySelector(".pacing-canvas"),i=f.getContext("2d"),E=s.querySelectorAll(".pacing-slider"),p=s.querySelectorAll(".btn-preset"),h=()=>{const n=f.clientWidth,m=f.clientHeight;if(n===0||m===0)return;(f.width!==n||f.height!==m)&&(f.width=n,f.height=m);const v=f.width,g=f.height;i.clearRect(0,0,v,g);const b=getComputedStyle(document.documentElement),x=b.getPropertyValue("--text-accent").trim()||"#00ffff",$=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",I=b.getPropertyValue("--border-color").trim()||"#1f1f45";i.strokeStyle=I,i.lineWidth=1,i.setLineDash([4,4]);for(let L of[.25,.5,.75]){const k=g*L;i.beginPath(),i.moveTo(0,k),i.lineTo(v,k),i.stroke()}i.setLineDash([]);const M=40,q=v-M*2,C=c.map((L,k)=>{const S=M+k/(r-1)*q,F=g-20-L/100*(g-40);return{x:S,y:F}}),G=i.createLinearGradient(0,0,0,g);G.addColorStop(0,x+"22"),G.addColorStop(1,"transparent"),i.fillStyle=G,i.beginPath(),i.moveTo(C[0].x,g),i.lineTo(C[0].x,C[0].y);for(let L=0;L<C.length-1;L++){const k=C[L],S=C[L+1],F=k.x+(S.x-k.x)/2,W=k.y,z=k.x+(S.x-k.x)/2,X=S.y;i.bezierCurveTo(F,W,z,X,S.x,S.y)}i.lineTo(C[C.length-1].x,g),i.closePath(),i.fill(),i.strokeStyle=x,i.lineWidth=3,i.shadowBlur=10,i.shadowColor=x,i.beginPath(),i.moveTo(C[0].x,C[0].y);for(let L=0;L<C.length-1;L++){const k=C[L],S=C[L+1],F=k.x+(S.x-k.x)/2,W=k.y,z=k.x+(S.x-k.x)/2,X=S.y;i.bezierCurveTo(F,W,z,X,S.x,S.y)}i.stroke(),i.shadowBlur=0,C.forEach((L,k)=>{i.fillStyle=$,i.strokeStyle="#ffffff",i.lineWidth=2,i.beginPath(),i.arc(L.x,L.y,6,0,Math.PI*2),i.fill(),i.stroke(),i.fillStyle="var(--text-main)",i.font="9px monospace",i.textAlign="center",i.fillText(`${c[k]}%`,L.x,L.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(f);const d=n=>{const m=[...c];let v=0;const g=18,b=()=>{v++;const x=v/g,$=x*(2-x);c=m.map((I,M)=>{const q=n[M]!==void 0?n[M]:50;return Math.round(I+(q-I)*$)}),E.forEach((I,M)=>{I.value=c[M];const q=I.parentElement.querySelector("label"),C=y[M]||`P${M+1}`;q.textContent=`${C}: ${c[M]}%`}),s.setAttribute("data-points",c.join(",")),h(),v<g&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(n=>{n.addEventListener("input",m=>{const v=parseInt(n.getAttribute("data-index"),10),g=parseInt(m.target.value,10);c[v]=g;const b=n.parentElement.querySelector("label"),x=y[v]||`P${v+1}`;b.textContent=`${x}: ${g}%`,s.setAttribute("data-points",c.join(",")),h()}),n.addEventListener("mousedown",()=>{l.playClick()}),n.addEventListener("mouseenter",()=>{l.playHover()})}),p.forEach(n=>{n.addEventListener("click",()=>{const m=n.getAttribute("data-preset");let v=[];switch(m){case"boss":v=[10,20,30,95,20];break;case"stealth":v=[75,80,25,15,10];break;case"slow":v=[10,30,50,70,90];break;case"flat":v=[40,40,40,40,40];break}l.playSuccess(),d(v)}),n.addEventListener("mouseenter",()=>{l.playHover()})})})}function ye(e){e.querySelectorAll(".state-machine-container").forEach(s=>{const a=s.getAttribute("data-states"),c=s.getAttribute("data-descriptions");if(!a)return;const r=a.split(","),u=c?c.split("|"):[];let y=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;r.forEach((h,t)=>{const d=t===0?"active":"",n=u[t]||"System monitoring triggers.";y+=`
        <div class="state-node-wrapper">
          <div class="state-node ${d}" data-index="${t}" data-desc="${n}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,t<r.length-1&&(y+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),y+="</div>"});const f=u[0]||"System monitoring triggers.";y+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${r[0]}</strong></span>
        <p id="active-state-desc">${f}</p>
      </div>
    `,s.innerHTML=y;const i=s.querySelectorAll(".state-node"),E=s.querySelector("#active-state-title"),p=s.querySelector("#active-state-desc");i.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;i.forEach(v=>v.classList.remove("active")),h.classList.add("active");const t=h.getAttribute("data-index"),d=r[t],n=h.getAttribute("data-desc");E.textContent=d,p.textContent=n,s.querySelectorAll(".connector-arrow path").forEach((v,g)=>{g==t-1&&(v.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{v.style.stroke=""},600))}),l.playSuccess()}),h.addEventListener("mouseenter",()=>{l.playHover()})})})}function Ee(e){e.querySelectorAll(".sandbox-container").forEach(s=>{const a=s.getAttribute("data-type"),c=s.getAttribute("data-config");c&&(a==="formula"?be(s,c):a==="loot"&&xe(s,c))})}function be(e,o){const s=o.split("|").map(t=>t.trim()),c=s[0].split("=").map(t=>t.trim()),r=c[0]||"Result",u=c[1]||"",y={};for(let t=1;t<s.length;t++)s[t].split(",").map(n=>n.trim()).forEach(n=>{const m=n.split(":").map(v=>v.trim());m.length===2&&(y[m[0]]=parseFloat(m[1])||0)});let f=`
    <div class="sandbox-card formula-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📊 EQUATION PLAYGROUND</span>
        <span class="hud-label status">LIVE CALCULATOR</span>
      </div>
      
      <div class="formula-display-box">
        <div class="formula-expr">${r} = <span class="accent-expr">${u}</span></div>
        <div class="formula-output">
          <span class="output-label">${r}:</span>
          <span class="output-val" id="formula-result-val">0.00</span>
        </div>
      </div>

      <div class="sandbox-controls">
  `;const i={...y};Object.keys(i).forEach(t=>{const d=i[t],n=d>0?Math.ceil(d*3):100;f+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${t}</span>
          <span class="var-val" id="val-display-${t}">${d}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${t}" min="0" max="${n}" value="${d}" step="1">
      </div>
    `}),f+=`
      </div>
    </div>
  `,e.innerHTML=f;const E=e.querySelector("#formula-result-val"),p=e.querySelectorAll(".sandbox-slider"),h=()=>{let t=u;const d=Object.keys(i).sort((n,m)=>m.length-n.length);for(const n of d){const m=new RegExp("\\b"+n+"\\b","g");t=t.replace(m,i[n])}if(/^[0-9+\-*/().\s]+$/.test(t))try{const n=Function(`"use strict"; return (${t})`)();typeof n=="number"&&!isNaN(n)&&isFinite(n)?E.textContent=n%1===0?n:n.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};p.forEach(t=>{t.addEventListener("input",d=>{const n=t.getAttribute("data-var"),m=parseFloat(d.target.value)||0;i[n]=m,e.querySelector(`#val-display-${n}`).textContent=m,h()}),t.addEventListener("mouseenter",()=>l.playHover()),t.addEventListener("mousedown",()=>l.playClick())}),h()}function xe(e,o){const s=[];let a=0;o.split(",").map(p=>p.trim()).forEach(p=>{const h=p.split(":").map(t=>t.trim());if(h.length===2){const t=h[0],d=parseFloat(h[1])||0;s.push({name:t,weight:d}),a+=d}});let r=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const u={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};s.forEach(p=>{const h=(p.weight/a*100).toFixed(1),t=p.name.toLowerCase(),d=u[t]||"var(--text-accent)";r+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${d};" title="${p.name}: ${h}%"></div>
    `}),r+=`
      </div>

      <div class="loot-stats-grid">
  `,s.forEach(p=>{const h=(p.weight/a*100).toFixed(1),t=p.name.toLowerCase(),d=u[t]||"var(--text-accent)";r+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${d};">• ${p.name.toUpperCase()}</span>
        <span class="loot-pct">${h}%</span>
        <span class="loot-rolled-count" id="count-${t}">0 rolled</span>
      </div>
    `}),r+=`
      </div>

      <div class="loot-simulation-pane">
        <div class="loot-log" id="loot-console">
          <div class="log-line text-muted">> Chest unopened. Press roll to drop loot.</div>
        </div>
        <button class="btn btn-primary btn-roll-loot">🔓 OPEN DROP BOX</button>
      </div>
    </div>
  `,e.innerHTML=r;const y=e.querySelector(".btn-roll-loot"),f=e.querySelector("#loot-console"),i={};s.forEach(p=>{i[p.name.toLowerCase()]=0});let E=0;y.addEventListener("click",()=>{E++;const p=Math.random()*a;let h=0,t=s[0];for(let v=0;v<s.length;v++)if(h+=s[v].weight,p<=h){t=s[v];break}const d=t.name.toLowerCase();i[d]++,s.forEach(v=>{const g=v.name.toLowerCase(),b=i[g],x=(b/E*100).toFixed(0);e.querySelector(`#count-${g}`).textContent=`${b} (${x}%)`}),d==="legendary"||d==="exotic"?l.playSuccess():l.playClick();const n=u[d]||"var(--text-accent)",m=document.createElement("div");m.className="log-line",m.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${n}; text-shadow: 0 0 4px ${n}55;">[${t.name.toUpperCase()}]</strong>`,f.appendChild(m),f.scrollTop=f.scrollHeight,(d==="legendary"||d==="exotic")&&(y.classList.add("btn-pulse-glow"),setTimeout(()=>y.classList.remove("btn-pulse-glow"),500))}),y.addEventListener("mouseenter",()=>l.playHover())}function Le(e){e.querySelectorAll(".roadmap-container").forEach(s=>{const a=s.getAttribute("data-points");if(!a)return;const r=a.split("|").map(t=>t.trim()).map((t,d)=>{const n=t.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),m=n?n[1].trim():t,g=(n&&n[2]?n[2].trim():"").split(","),b=g.length>1?g[g.length-1].trim():"TBD",x=g.length>0?g[0].trim():"Objective pending";return{id:d+1,name:m,date:b,objective:x}});let u=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;r.forEach((t,d)=>{u+=`
        <div class="roadmap-node ${d===0?"active":""}" data-index="${d}" title="Click to inspect: ${t.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${t.name}</span>
          <span class="node-date">${t.date}</span>
        </div>
      `}),u+=`
        </div>

        <div class="roadmap-details-box">
          <div class="roadmap-details-header">
            <h3 id="roadmap-active-title">${r[0].name}</h3>
            <span class="phase-date" id="roadmap-active-date">${r[0].date}</span>
          </div>
          
          <div class="roadmap-details-body">
            <div class="detail-section">
              <span class="hud-label-dim">CORE DELIVERABLE & FOCUS</span>
              <p id="roadmap-active-objective" class="deliverable-text">${r[0].objective}</p>
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
    `,s.innerHTML=u;const y=s.querySelectorAll(".roadmap-node"),f=s.querySelector("#roadmap-active-badge"),i=s.querySelector("#roadmap-active-title"),E=s.querySelector("#roadmap-active-date"),p=s.querySelector("#roadmap-active-objective"),h=s.querySelector("#roadmap-active-checklist");y.forEach(t=>{t.addEventListener("click",()=>{const d=parseInt(t.getAttribute("data-index"),10),n=r[d];y.forEach(v=>v.classList.remove("active")),t.classList.add("active"),l.playSuccess(),f.textContent=`PHASE ${n.id}`,i.textContent=n.name,E.textContent=n.date,p.textContent=n.objective;let m=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;n.id>1?m+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':m+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',n.id===r.length?m+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:n.id>=3?m+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:m+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,h.innerHTML=m}),t.addEventListener("mouseenter",()=>l.playHover())})})}const ee="playable_gdd_draft",_=`# CYBER-PULSE: NEON RUNNER
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
`;function ke(e){try{return localStorage.setItem(ee,e),!0}catch(o){return console.error("Failed to save draft to LocalStorage",o),!1}}function Te(){try{const e=localStorage.getItem(ee);return e!==null?e:_}catch(e){return console.error("Failed to load draft from LocalStorage",e),_}}let T=0,P=[],Q=null,B=!1,R=!1;const w=document.getElementById("markdown-input"),O=document.getElementById("slide-container"),te=document.getElementById("current-slide-num"),Ce=document.getElementById("total-slides-num"),ne=document.getElementById("prev-slide-btn"),se=document.getElementById("next-slide-btn"),we=document.getElementById("status-message"),ae=document.getElementById("theme-select"),K=document.getElementById("toggle-crt"),Z=document.getElementById("toggle-audio"),j=document.getElementById("toggle-editor"),V=document.getElementById("toggle-doc"),oe=document.getElementById("btn-fullscreen"),ce=document.getElementById("btn-export"),ie=document.getElementById("btn-export-html"),re=document.getElementById("btn-template"),D=document.getElementById("btn-copy-md"),N=document.getElementById("btn-download-md"),Se=document.getElementById("audio-modal"),le=document.getElementById("btn-enable-audio");function H(){const e=w.value;P=he(e),Ce.textContent=P.length,T>=P.length&&(T=Math.max(0,P.length-1)),te.textContent=T+1,O.innerHTML=P[T]||"",ge(O),fe(O),ye(O),Ee(O),Le(O),Ae()}function Y(e){e<0||e>=P.length||(T=e,te.textContent=T+1,l.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),H(),A(`VIEWING SLIDE ${T+1}`))}function Ae(){O.querySelectorAll(".tilt-card").forEach(o=>{o.addEventListener("mousemove",s=>{const a=o.getBoundingClientRect(),c=s.clientX-a.left,r=s.clientY-a.top,u=a.width,y=a.height,f=(c/u-.5)*20,i=-(r/y-.5)*20;o.style.transform=`rotateX(${i}deg) rotateY(${f}deg) scale(1.03)`}),o.addEventListener("mouseleave",()=>{o.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),o.addEventListener("mouseenter",()=>{l.playHover()}),o.addEventListener("click",()=>{l.playClick()})})}function Ie(e){const o=w.selectionStart,s=w.value;let a="";switch(e){case"slide":a=`
---
# NEW SLIDE TITLE
## Subheading
- Point 1
- Point 2
`;break;case"loop":a=`
[loop: Start -> Core Loop -> Action -> Reward]
`;break;case"pacing":a=`
[pacing: 15, 30, 75, 40, 20]
`;break;case"state":a=`
[state: Idle (Resting / scanning) -> Chase (Locking target) -> Attack (Fire pulse) -> Search (Seek target)]
`;break;case"card":a=`
[card: Feature Title | Visual descriptions of custom game systems.]
`;break;case"formula":a=`
[sandbox: formula | Damage = ATK * 1.5 - DEF | ATK: 80, DEF: 30]
`;break;case"loot":a=`
[sandbox: loot | Common: 60, Rare: 25, Epic: 12, Legendary: 3]
`;break;case"roadmap":a=`
[roadmap: Concept (Mechanic Pitch, Q1) -> Prototype (Core Mechanics, Q2) -> Alpha (Checklist & Testing, Q3) -> Release (Launch, Q4)]
`;break}const c=s.substring(0,o),r=s.substring(o);w.value=c+a+r,w.focus();const u=o+a.length;w.setSelectionRange(u,u),l.playClick(),H(),J()}function J(){A("SAVING..."),Q&&clearTimeout(Q),Q=setTimeout(()=>{ke(w.value),A("SYSTEM READY • AUTO-SAVED")},1e3)}function A(e){we.textContent=e}document.addEventListener("keydown",e=>{document.activeElement!==w&&(R||(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"?(e.preventDefault(),T<P.length-1?Y(T+1):l.playClick()):e.key==="ArrowLeft"||e.key==="Backspace"||e.key==="PageUp"?(e.preventDefault(),T>0?Y(T-1):l.playClick()):e.key.toLowerCase()==="f"?(e.preventDefault(),de()):e.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&ue()))});function de(){l.playClick(),document.body.classList.contains("presentation-fullscreen")?ue():(document.body.classList.add("presentation-fullscreen"),A("FULLSCREEN PRESENTER MODE ACTIVE"))}function ue(){document.body.classList.remove("presentation-fullscreen"),A("SYSTEM READY")}ae.addEventListener("change",e=>{const o=e.target.value;document.documentElement.setAttribute("data-theme",o),l.playClick(),H()});ae.addEventListener("mouseenter",()=>l.playHover());j.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),j.classList.toggle("active",B),B&&(R=!1,document.body.classList.remove("markdown-solo"),V.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{H(),A(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${T+1}`)},320)});j.addEventListener("mouseenter",()=>l.playHover());V.addEventListener("click",()=>{R=!R,document.body.classList.toggle("markdown-solo",R),V.classList.toggle("active",R),R&&(B=!1,document.body.classList.remove("live-solo"),j.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{H(),A(R?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${T+1}`)},320)});V.addEventListener("mouseenter",()=>l.playHover());K.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",e?"false":"true"),K.classList.toggle("active",!e),l.playClick()});K.addEventListener("mouseenter",()=>l.playHover());Z.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",e?"false":"true"),Z.classList.toggle("active",!e),l.setEnabled(!e),l.playClick()});Z.addEventListener("mouseenter",()=>l.playHover());ne.addEventListener("click",()=>{T>0&&Y(T-1)});ne.addEventListener("mouseenter",()=>l.playHover());se.addEventListener("click",()=>{T<P.length-1&&Y(T+1)});se.addEventListener("mouseenter",()=>l.playHover());oe.addEventListener("click",de);oe.addEventListener("mouseenter",()=>l.playHover());ce.addEventListener("click",()=>{l.playClick(),window.print()});ce.addEventListener("mouseenter",()=>l.playHover());ie.addEventListener("click",Ne);ie.addEventListener("mouseenter",()=>l.playHover());D.addEventListener("click",()=>{navigator.clipboard.writeText(w.value).then(()=>{const e=D.innerHTML;D.innerHTML="✔ COPIED!",D.style.color="var(--text-accent-secondary)",l.playSuccess(),setTimeout(()=>{D.innerHTML=e,D.style.color=""},1500)}).catch(e=>{console.error("Could not copy text: ",e),D.textContent="❌ ERROR",setTimeout(()=>{D.textContent="📋 COPY"},1500)})});D.addEventListener("mouseenter",()=>l.playHover());N.addEventListener("click",()=>{const e=w.value,o=new Blob([e],{type:"text/markdown"}),s=URL.createObjectURL(o),a=document.createElement("a");a.href=s,a.download="game_design_document.md",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(s);const c=N.innerHTML;N.innerHTML="✔ DOWNLOADED!",N.style.color="var(--text-accent)",l.playSuccess(),setTimeout(()=>{N.innerHTML=c,N.style.color=""},1500)});N.addEventListener("mouseenter",()=>l.playHover());re.addEventListener("click",()=>{confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(w.value=_,T=0,l.playSuccess(),H(),J())});re.addEventListener("mouseenter",()=>l.playHover());document.querySelectorAll("[data-inject]").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-inject");Ie(o)}),e.addEventListener("mouseenter",()=>l.playHover())});w.addEventListener("input",()=>{H(),J()});le.addEventListener("click",()=>{l.init(),Se.classList.add("hidden")});le.addEventListener("mouseenter",()=>{});const pe=document.getElementById("btn-audio-deck"),me=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const $e=document.getElementById("param-hover-freq"),Me=document.getElementById("param-hover-decay"),De=document.getElementById("param-hover-wave"),Re=document.getElementById("btn-test-hover"),Pe=document.getElementById("param-click-freq"),He=document.getElementById("param-click-decay"),Be=document.getElementById("param-click-wave"),Oe=document.getElementById("btn-test-click");pe.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),l.playClick()});pe.addEventListener("mouseenter",()=>l.playHover());me.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),l.playClick()});me.addEventListener("mouseenter",()=>l.playHover());$e.addEventListener("input",e=>{const o=e.target.value;document.getElementById("val-hover-freq").textContent=`${o} Hz`,l.config.hover.freq=parseInt(o,10)});Me.addEventListener("input",e=>{const o=e.target.value;document.getElementById("val-hover-decay").textContent=`${o}s`,l.config.hover.decay=parseFloat(o)});De.addEventListener("change",e=>{l.config.hover.type=e.target.value});Re.addEventListener("click",()=>l.playHover());Pe.addEventListener("input",e=>{const o=e.target.value;document.getElementById("val-click-freq").textContent=`${o} Hz`,l.config.click.freq=parseInt(o,10)});He.addEventListener("input",e=>{const o=e.target.value;document.getElementById("val-click-decay").textContent=`${o}s`,l.config.click.decay=parseFloat(o)});Be.addEventListener("change",e=>{l.config.click.type=e.target.value});Oe.addEventListener("click",()=>l.playClick());async function Ne(){A("BUNDLING OFFLINE GDD..."),l.playClick();try{let e="";const o=Array.from(document.styleSheets);for(const h of o)try{if(h.href){const t=await fetch(h.href);e+=await t.text()}else{const t=Array.from(h.cssRules);e+=t.map(d=>d.cssText).join(`
`)}}catch(t){console.warn("Could not read stylesheet:",t)}let s="";const a=Array.from(document.querySelectorAll("script"));let c="";for(const h of a){const t=h.getAttribute("src");if(t&&(t.includes("assets/index")||t.includes("src/main.js")||h.type==="module")){c=t;break}}c?s=await(await fetch(c)).text():s='console.error("Main script bundle not found during export.");';const r=w.value;let u="";try{u=await(await fetch("./index.html")).text()}catch{u=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const y=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,f=r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");u=u.replace(y,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${f}</textarea>`),u=u.replace(/<link rel="stylesheet" href="[^"]+">/g,""),u=u.replace(/<script type="module" src="[^"]+"><\/script>/g,""),u=u.replace("</head>",`<style>${e}</style></head>`),u=u.replace("</body>",`<script type="module">${s}<\/script></body>`);const i=new Blob([u],{type:"text/html"}),E=URL.createObjectURL(i),p=document.createElement("a");p.href=E,p.download="interactive_game_design_document.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(E),l.playSuccess(),A("OFFLINE GDD EXPORTED SUCCESS")}catch(e){console.error("Error during HTML export:",e),A("EXPORT ERROR: BUNDLING FAILED")}}function qe(){const e=Te();w.value=e,H(),A("SYSTEM READY")}qe();
