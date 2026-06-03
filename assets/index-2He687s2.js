(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=a(i);fetch(i.href,c)}})();function ue(e){return e?e.split(/\n\s*---\s*\n/).map(a=>{let o="";const i=a.split(`
`);let c=!1,u="",y=[];const f=()=>{c&&(o+=`<ul>${u}</ul>`,u="",c=!1)},r=()=>{y.length>0&&(o+='<div class="slide-grid">',y.forEach(E=>{o+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),o+="</div>",y=[])};for(let E=0;E<i.length;E++){let p=i[E].trim();if(!p){f(),r();continue}const h=p.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){f(),y.push({title:h[1].trim(),desc:h[2].trim()});continue}r();const t=p.match(/^\[loop:\s*([^\]]+)\]/);if(t){f();const g=t[1].split("->").map(b=>b.trim());o+=`<div class="loop-diagram-container" data-nodes="${g.join(",")}"></div>`;continue}const d=p.match(/^\[pacing:\s*([^\]]+)\]/);if(d){f();const g=d[1].split(",").map(b=>b.trim());o+=`<div class="pacing-container" data-points="${g.join(",")}"></div>`;continue}const n=p.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(n){f();const g=n[1].trim(),b=n[2].trim();o+=`<div class="sandbox-container" data-type="${g}" data-config="${b}"></div>`;continue}const m=p.match(/^\[roadmap:\s*([^\]]+)\]/);if(m){f();const g=m[1].split("->").map(b=>b.trim());o+=`<div class="roadmap-container" data-points="${g.join("|")}"></div>`;continue}const v=p.match(/^\[state:\s*([^\]]+)\]/);if(v){f();const g=v[1].split("->").map(D=>D.trim()),b=[],x=[];g.forEach(D=>{const I=D.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);I?(b.push(I[1].trim()),x.push(I[2]?I[2].trim():"System monitoring triggers.")):(b.push(D),x.push("System monitoring triggers."))}),o+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${x.join("|")}"></div>`;continue}if(p.startsWith("# ")){f();const g=p.substring(2).trim();o+=`<h1>${q(g)}</h1>`;continue}if(p.startsWith("## ")){f();const g=p.substring(3).trim();o+=`<h2>${q(g)}</h2>`;continue}if(p.startsWith("* ")||p.startsWith("- ")){c=!0;const g=p.substring(2).trim();u+=`<li>${q(g)}</li>`;continue}f(),o+=`<p>${q(p)}</p>`}return f(),r(),`<div class="slide-content">${o}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function q(e){return e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class pe{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(s){console.error("Web Audio API is not supported in this browser.",s)}}setEnabled(s){this.isEnabled=s,this.ctx&&!s?this.ctx.suspend():this.ctx&&s&&this.ctx.resume()}createDecayGain(s,a){const o=this.ctx.createGain();return o.gain.setValueAtTime(s,this.ctx.currentTime),o.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+a),o}playHover(){if(!this.isEnabled||!this.ctx)return;const s=this.ctx.createOscillator(),a=this.createDecayGain(.04,this.config.hover.decay);s.type=this.config.hover.type,s.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),s.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),s.connect(a),a.connect(this.ctx.destination),s.start(),s.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const s=this.ctx.createOscillator(),a=this.createDecayGain(.08,this.config.click.decay);s.type=this.config.click.type,s.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),s.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const o=this.ctx.createOscillator(),i=this.createDecayGain(.05,.015);o.type="square",o.frequency.setValueAtTime(1200,this.ctx.currentTime),s.connect(a),a.connect(this.ctx.destination),o.connect(i),i.connect(this.ctx.destination),s.start(),o.start(),s.stop(this.ctx.currentTime+this.config.click.decay),o.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const s=this.ctx.sampleRate*.25,a=this.ctx.createBuffer(1,s,this.ctx.sampleRate),o=a.getChannelData(0);for(let y=0;y<s;y++)o[y]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=a;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(1500,this.ctx.currentTime),c.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);i.connect(c),c.connect(u),u.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const s=this.ctx.currentTime,a=[261.63,329.63,392,523.25],o=.08;a.forEach((i,c)=>{const u=this.ctx.createOscillator(),y=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(i,s+c*o),y.gain.setValueAtTime(.05,s+c*o),y.gain.exponentialRampToValueAtTime(1e-4,s+(c+1)*o+.05),u.connect(y),y.connect(this.ctx.destination),u.start(s+c*o),u.stop(s+(c+2)*o)})}}const l=new pe;function me(e){e.querySelectorAll(".loop-diagram-container").forEach(a=>{const o=a.getAttribute("data-nodes");if(!o)return;const i=o.split(","),c=i.length,u=600,y=360,f=u/2,r=y/2,E=105;let p=`
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
    `;const h=[];for(let t=0;t<c;t++){const d=(t*(360/c)-90)*(Math.PI/180),n=f+E*Math.cos(d),m=r+E*Math.sin(d);h.push({x:n,y:m,angle:d})}for(let t=0;t<c;t++){const d=h[t],n=h[(t+1)%c],m=d.angle+.35,v=n.angle-.35,g=f+E*Math.cos(m),b=r+E*Math.sin(m),x=f+E*Math.cos(v),D=r+E*Math.sin(v);p+=`
        <path class="loop-arrow-path" 
              d="M ${g} ${b} A ${E} ${E} 0 0 1 ${x} ${D}" 
              marker-end="url(#arrow)" />
      `}h.forEach((t,d)=>{const n=i[d],v=Math.max(80,n.length*8+15),g=30,b=t.x-v/2,x=t.y-g/2;p+=`
        <g class="loop-node" data-index="${d}">
          <rect class="loop-node-box" x="${b}" y="${x}" width="${v}" height="${g}" rx="6" ry="6" />
          <text class="loop-node-text" x="${t.x}" y="${t.y}">${n}</text>
        </g>
      `}),p+="</svg>",a.innerHTML=p,a.querySelectorAll(".loop-node").forEach(t=>{t.addEventListener("mouseenter",()=>{l.playHover();const d=parseInt(t.getAttribute("data-index"),10),n=a.querySelectorAll(".loop-arrow-path");n[d]&&(n[d].style.stroke="var(--text-accent)",n[d].setAttribute("marker-end","url(#arrow-active)"))}),t.addEventListener("mouseleave",()=>{const d=parseInt(t.getAttribute("data-index"),10),n=a.querySelectorAll(".loop-arrow-path");n[d]&&(n[d].style.stroke="",n[d].setAttribute("marker-end","url(#arrow)"))}),t.addEventListener("click",()=>{l.playClick()})})})}function he(e){e.querySelectorAll(".pacing-container").forEach(a=>{const o=a.getAttribute("data-points");if(!o)return;let i=o.split(",").map(n=>{const m=parseInt(n.trim(),10);return isNaN(m)?50:Math.max(0,Math.min(100,m))});const c=i.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const y=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];i.forEach((n,m)=>{const v=y[m]||`P${m+1}`;u+=`
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
    `,a.innerHTML=u;const f=a.querySelector(".pacing-canvas"),r=f.getContext("2d"),E=a.querySelectorAll(".pacing-slider"),p=a.querySelectorAll(".btn-preset"),h=()=>{const n=f.clientWidth,m=f.clientHeight;if(n===0||m===0)return;(f.width!==n||f.height!==m)&&(f.width=n,f.height=m);const v=f.width,g=f.height;r.clearRect(0,0,v,g);const b=getComputedStyle(document.documentElement),x=b.getPropertyValue("--text-accent").trim()||"#00ffff",D=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",I=b.getPropertyValue("--border-color").trim()||"#1f1f45";r.strokeStyle=I,r.lineWidth=1,r.setLineDash([4,4]);for(let L of[.25,.5,.75]){const k=g*L;r.beginPath(),r.moveTo(0,k),r.lineTo(v,k),r.stroke()}r.setLineDash([]);const $=40,H=v-$*2,S=i.map((L,k)=>{const T=$+k/(c-1)*H,N=g-20-L/100*(g-40);return{x:T,y:N}}),V=r.createLinearGradient(0,0,0,g);V.addColorStop(0,x+"22"),V.addColorStop(1,"transparent"),r.fillStyle=V,r.beginPath(),r.moveTo(S[0].x,g),r.lineTo(S[0].x,S[0].y);for(let L=0;L<S.length-1;L++){const k=S[L],T=S[L+1],N=k.x+(T.x-k.x)/2,G=k.y,W=k.x+(T.x-k.x)/2,Y=T.y;r.bezierCurveTo(N,G,W,Y,T.x,T.y)}r.lineTo(S[S.length-1].x,g),r.closePath(),r.fill(),r.strokeStyle=x,r.lineWidth=3,r.shadowBlur=10,r.shadowColor=x,r.beginPath(),r.moveTo(S[0].x,S[0].y);for(let L=0;L<S.length-1;L++){const k=S[L],T=S[L+1],N=k.x+(T.x-k.x)/2,G=k.y,W=k.x+(T.x-k.x)/2,Y=T.y;r.bezierCurveTo(N,G,W,Y,T.x,T.y)}r.stroke(),r.shadowBlur=0,S.forEach((L,k)=>{r.fillStyle=D,r.strokeStyle="#ffffff",r.lineWidth=2,r.beginPath(),r.arc(L.x,L.y,6,0,Math.PI*2),r.fill(),r.stroke(),r.fillStyle="var(--text-main)",r.font="9px monospace",r.textAlign="center",r.fillText(`${i[k]}%`,L.x,L.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(f);const d=n=>{const m=[...i];let v=0;const g=18,b=()=>{v++;const x=v/g,D=x*(2-x);i=m.map((I,$)=>{const H=n[$]!==void 0?n[$]:50;return Math.round(I+(H-I)*D)}),E.forEach((I,$)=>{I.value=i[$];const H=I.parentElement.querySelector("label"),S=y[$]||`P${$+1}`;H.textContent=`${S}: ${i[$]}%`}),a.setAttribute("data-points",i.join(",")),h(),v<g&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(n=>{n.addEventListener("input",m=>{const v=parseInt(n.getAttribute("data-index"),10),g=parseInt(m.target.value,10);i[v]=g;const b=n.parentElement.querySelector("label"),x=y[v]||`P${v+1}`;b.textContent=`${x}: ${g}%`,a.setAttribute("data-points",i.join(",")),h()}),n.addEventListener("mousedown",()=>{l.playClick()}),n.addEventListener("mouseenter",()=>{l.playHover()})}),p.forEach(n=>{n.addEventListener("click",()=>{const m=n.getAttribute("data-preset");let v=[];switch(m){case"boss":v=[10,20,30,95,20];break;case"stealth":v=[75,80,25,15,10];break;case"slow":v=[10,30,50,70,90];break;case"flat":v=[40,40,40,40,40];break}l.playSuccess(),d(v)}),n.addEventListener("mouseenter",()=>{l.playHover()})})})}function ve(e){e.querySelectorAll(".state-machine-container").forEach(a=>{const o=a.getAttribute("data-states"),i=a.getAttribute("data-descriptions");if(!o)return;const c=o.split(","),u=i?i.split("|"):[];let y=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;c.forEach((h,t)=>{const d=t===0?"active":"",n=u[t]||"System monitoring triggers.";y+=`
        <div class="state-node-wrapper">
          <div class="state-node ${d}" data-index="${t}" data-desc="${n}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,t<c.length-1&&(y+=`
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
    `,a.innerHTML=y;const r=a.querySelectorAll(".state-node"),E=a.querySelector("#active-state-title"),p=a.querySelector("#active-state-desc");r.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;r.forEach(v=>v.classList.remove("active")),h.classList.add("active");const t=h.getAttribute("data-index"),d=c[t],n=h.getAttribute("data-desc");E.textContent=d,p.textContent=n,a.querySelectorAll(".connector-arrow path").forEach((v,g)=>{g==t-1&&(v.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{v.style.stroke=""},600))}),l.playSuccess()}),h.addEventListener("mouseenter",()=>{l.playHover()})})})}function ge(e){e.querySelectorAll(".sandbox-container").forEach(a=>{const o=a.getAttribute("data-type"),i=a.getAttribute("data-config");i&&(o==="formula"?fe(a,i):o==="loot"&&ye(a,i))})}function fe(e,s){const a=s.split("|").map(t=>t.trim()),i=a[0].split("=").map(t=>t.trim()),c=i[0]||"Result",u=i[1]||"",y={};for(let t=1;t<a.length;t++)a[t].split(",").map(n=>n.trim()).forEach(n=>{const m=n.split(":").map(v=>v.trim());m.length===2&&(y[m[0]]=parseFloat(m[1])||0)});let f=`
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
  `;const r={...y};Object.keys(r).forEach(t=>{const d=r[t],n=d>0?Math.ceil(d*3):100;f+=`
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
  `,e.innerHTML=f;const E=e.querySelector("#formula-result-val"),p=e.querySelectorAll(".sandbox-slider"),h=()=>{let t=u;const d=Object.keys(r).sort((n,m)=>m.length-n.length);for(const n of d){const m=new RegExp("\\b"+n+"\\b","g");t=t.replace(m,r[n])}if(/^[0-9+\-*/().\s]+$/.test(t))try{const n=Function(`"use strict"; return (${t})`)();typeof n=="number"&&!isNaN(n)&&isFinite(n)?E.textContent=n%1===0?n:n.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};p.forEach(t=>{t.addEventListener("input",d=>{const n=t.getAttribute("data-var"),m=parseFloat(d.target.value)||0;r[n]=m,e.querySelector(`#val-display-${n}`).textContent=m,h()}),t.addEventListener("mouseenter",()=>l.playHover()),t.addEventListener("mousedown",()=>l.playClick())}),h()}function ye(e,s){const a=[];let o=0;s.split(",").map(p=>p.trim()).forEach(p=>{const h=p.split(":").map(t=>t.trim());if(h.length===2){const t=h[0],d=parseFloat(h[1])||0;a.push({name:t,weight:d}),o+=d}});let c=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const u={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};a.forEach(p=>{const h=(p.weight/o*100).toFixed(1),t=p.name.toLowerCase(),d=u[t]||"var(--text-accent)";c+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${d};" title="${p.name}: ${h}%"></div>
    `}),c+=`
      </div>

      <div class="loot-stats-grid">
  `,a.forEach(p=>{const h=(p.weight/o*100).toFixed(1),t=p.name.toLowerCase(),d=u[t]||"var(--text-accent)";c+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${d};">• ${p.name.toUpperCase()}</span>
        <span class="loot-pct">${h}%</span>
        <span class="loot-rolled-count" id="count-${t}">0 rolled</span>
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
  `,e.innerHTML=c;const y=e.querySelector(".btn-roll-loot"),f=e.querySelector("#loot-console"),r={};a.forEach(p=>{r[p.name.toLowerCase()]=0});let E=0;y.addEventListener("click",()=>{E++;const p=Math.random()*o;let h=0,t=a[0];for(let v=0;v<a.length;v++)if(h+=a[v].weight,p<=h){t=a[v];break}const d=t.name.toLowerCase();r[d]++,a.forEach(v=>{const g=v.name.toLowerCase(),b=r[g],x=(b/E*100).toFixed(0);e.querySelector(`#count-${g}`).textContent=`${b} (${x}%)`}),d==="legendary"||d==="exotic"?l.playSuccess():l.playClick();const n=u[d]||"var(--text-accent)",m=document.createElement("div");m.className="log-line",m.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${n}; text-shadow: 0 0 4px ${n}55;">[${t.name.toUpperCase()}]</strong>`,f.appendChild(m),f.scrollTop=f.scrollHeight,(d==="legendary"||d==="exotic")&&(y.classList.add("btn-pulse-glow"),setTimeout(()=>y.classList.remove("btn-pulse-glow"),500))}),y.addEventListener("mouseenter",()=>l.playHover())}function Ee(e){e.querySelectorAll(".roadmap-container").forEach(a=>{const o=a.getAttribute("data-points");if(!o)return;const c=o.split("|").map(t=>t.trim()).map((t,d)=>{const n=t.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),m=n?n[1].trim():t,g=(n&&n[2]?n[2].trim():"").split(","),b=g.length>1?g[g.length-1].trim():"TBD",x=g.length>0?g[0].trim():"Objective pending";return{id:d+1,name:m,date:b,objective:x}});let u=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;c.forEach((t,d)=>{u+=`
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
    `,a.innerHTML=u;const y=a.querySelectorAll(".roadmap-node"),f=a.querySelector("#roadmap-active-badge"),r=a.querySelector("#roadmap-active-title"),E=a.querySelector("#roadmap-active-date"),p=a.querySelector("#roadmap-active-objective"),h=a.querySelector("#roadmap-active-checklist");y.forEach(t=>{t.addEventListener("click",()=>{const d=parseInt(t.getAttribute("data-index"),10),n=c[d];y.forEach(v=>v.classList.remove("active")),t.classList.add("active"),l.playSuccess(),f.textContent=`PHASE ${n.id}`,r.textContent=n.name,E.textContent=n.date,p.textContent=n.objective;let m=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;n.id>1?m+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':m+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',n.id===c.length?m+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:n.id>=3?m+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:m+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,h.innerHTML=m}),t.addEventListener("mouseenter",()=>l.playHover())})})}const ee="playable_gdd_draft",X=`# CYBER-PULSE: NEON RUNNER
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
`;function be(e){try{return localStorage.setItem(ee,e),!0}catch(s){return console.error("Failed to save draft to LocalStorage",s),!1}}function xe(){try{const e=localStorage.getItem(ee);return e!==null?e:X}catch(e){return console.error("Failed to load draft from LocalStorage",e),X}}let w=0,M=[],z=null,O=!1,R=!1;const C=document.getElementById("markdown-input"),B=document.getElementById("slide-container"),te=document.getElementById("current-slide-num"),Le=document.getElementById("total-slides-num"),se=document.getElementById("prev-slide-btn"),ne=document.getElementById("next-slide-btn"),ke=document.getElementById("status-message"),ae=document.getElementById("theme-select"),_=document.getElementById("toggle-crt"),K=document.getElementById("toggle-audio"),F=document.getElementById("toggle-editor"),U=document.getElementById("toggle-doc"),oe=document.getElementById("btn-fullscreen"),Q=document.getElementById("export-actions-select"),Z=document.getElementById("editor-actions-select"),we=document.getElementById("audio-modal"),ce=document.getElementById("btn-enable-audio");function P(){const e=C.value;M=ue(e),Le.textContent=M.length,w>=M.length&&(w=Math.max(0,M.length-1)),te.textContent=w+1,B.innerHTML=M[w]||"",me(B),he(B),ve(B),ge(B),Ee(B),Se()}function j(e){e<0||e>=M.length||(w=e,te.textContent=w+1,l.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),P(),A(`VIEWING SLIDE ${w+1}`))}function Se(){B.querySelectorAll(".tilt-card").forEach(s=>{s.addEventListener("mousemove",a=>{const o=s.getBoundingClientRect(),i=a.clientX-o.left,c=a.clientY-o.top,u=o.width,y=o.height,f=(i/u-.5)*20,r=-(c/y-.5)*20;s.style.transform=`rotateX(${r}deg) rotateY(${f}deg) scale(1.03)`}),s.addEventListener("mouseleave",()=>{s.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),s.addEventListener("mouseenter",()=>{l.playHover()}),s.addEventListener("click",()=>{l.playClick()})})}function Ae(e){const s=C.selectionStart,a=C.value;let o="";switch(e){case"slide":o=`
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
`;break}const i=a.substring(0,s),c=a.substring(s);C.value=i+o+c,C.focus();const u=s+o.length;C.setSelectionRange(u,u),l.playClick(),P(),J()}function J(){A("SAVING..."),z&&clearTimeout(z),z=setTimeout(()=>{be(C.value),A("SYSTEM READY • AUTO-SAVED")},1e3)}function A(e){ke.textContent=e}document.addEventListener("keydown",e=>{document.activeElement!==C&&(R||(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"?(e.preventDefault(),w<M.length-1?j(w+1):l.playClick()):e.key==="ArrowLeft"||e.key==="Backspace"||e.key==="PageUp"?(e.preventDefault(),w>0?j(w-1):l.playClick()):e.key.toLowerCase()==="f"?(e.preventDefault(),ie()):e.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&re()))});function ie(){l.playClick(),document.body.classList.contains("presentation-fullscreen")?re():(document.body.classList.add("presentation-fullscreen"),A("FULLSCREEN PRESENTER MODE ACTIVE"))}function re(){document.body.classList.remove("presentation-fullscreen"),A("SYSTEM READY")}ae.addEventListener("change",e=>{const s=e.target.value;document.documentElement.setAttribute("data-theme",s),l.playClick(),P()});ae.addEventListener("mouseenter",()=>l.playHover());F.addEventListener("click",()=>{O=!O,document.body.classList.toggle("live-solo",O),F.classList.toggle("active",O),O&&(R=!1,document.body.classList.remove("markdown-solo"),U.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),A(O?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});F.addEventListener("mouseenter",()=>l.playHover());U.addEventListener("click",()=>{R=!R,document.body.classList.toggle("markdown-solo",R),U.classList.toggle("active",R),R&&(O=!1,document.body.classList.remove("live-solo"),F.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),A(R?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});U.addEventListener("mouseenter",()=>l.playHover());_.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",e?"false":"true"),_.classList.toggle("active",!e),l.playClick()});_.addEventListener("mouseenter",()=>l.playHover());K.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",e?"false":"true"),K.classList.toggle("active",!e),l.setEnabled(!e),l.playClick()});K.addEventListener("mouseenter",()=>l.playHover());se.addEventListener("click",()=>{w>0&&j(w-1)});se.addEventListener("mouseenter",()=>l.playHover());ne.addEventListener("click",()=>{w<M.length-1&&j(w+1)});ne.addEventListener("mouseenter",()=>l.playHover());oe.addEventListener("click",ie);oe.addEventListener("mouseenter",()=>l.playHover());Q.addEventListener("change",e=>{const s=e.target.value;if(s){if(s==="pdf")l.playClick(),window.print();else if(s==="html")Oe();else if(s==="markdown"){const a=C.value,o=new Blob([a],{type:"text/markdown"}),i=URL.createObjectURL(o),c=document.createElement("a");c.href=i,c.download="game_design_document.md",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i),l.playSuccess(),A("GDD MARKDOWN FILE DOWNLOADED")}Q.value=""}});Q.addEventListener("mouseenter",()=>l.playHover());Z.addEventListener("change",e=>{const s=e.target.value;if(s){if(s==="copy")navigator.clipboard.writeText(C.value).then(()=>{l.playSuccess(),A("GDD SOURCE COPIED TO CLIPBOARD")}).catch(a=>{console.error("Could not copy text: ",a)});else if(s==="download"){const a=C.value,o=new Blob([a],{type:"text/markdown"}),i=URL.createObjectURL(o),c=document.createElement("a");c.href=i,c.download="game_design_document.md",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i),l.playSuccess(),A("GDD MARKDOWN FILE DOWNLOADED")}else s==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(C.value=X,w=0,l.playSuccess(),P(),J());Z.value=""}});Z.addEventListener("mouseenter",()=>l.playHover());document.querySelectorAll("[data-inject]").forEach(e=>{e.addEventListener("click",()=>{const s=e.getAttribute("data-inject");Ae(s)}),e.addEventListener("mouseenter",()=>l.playHover())});C.addEventListener("input",()=>{P(),J()});ce.addEventListener("click",()=>{l.init(),we.classList.add("hidden")});ce.addEventListener("mouseenter",()=>{});const le=document.getElementById("btn-audio-deck"),de=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Ce=document.getElementById("param-hover-freq"),Te=document.getElementById("param-hover-decay"),Ie=document.getElementById("param-hover-wave"),De=document.getElementById("btn-test-hover"),$e=document.getElementById("param-click-freq"),Re=document.getElementById("param-click-decay"),Me=document.getElementById("param-click-wave"),Pe=document.getElementById("btn-test-click");le.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),l.playClick()});le.addEventListener("mouseenter",()=>l.playHover());de.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),l.playClick()});de.addEventListener("mouseenter",()=>l.playHover());Ce.addEventListener("input",e=>{const s=e.target.value;document.getElementById("val-hover-freq").textContent=`${s} Hz`,l.config.hover.freq=parseInt(s,10)});Te.addEventListener("input",e=>{const s=e.target.value;document.getElementById("val-hover-decay").textContent=`${s}s`,l.config.hover.decay=parseFloat(s)});Ie.addEventListener("change",e=>{l.config.hover.type=e.target.value});De.addEventListener("click",()=>l.playHover());$e.addEventListener("input",e=>{const s=e.target.value;document.getElementById("val-click-freq").textContent=`${s} Hz`,l.config.click.freq=parseInt(s,10)});Re.addEventListener("input",e=>{const s=e.target.value;document.getElementById("val-click-decay").textContent=`${s}s`,l.config.click.decay=parseFloat(s)});Me.addEventListener("change",e=>{l.config.click.type=e.target.value});Pe.addEventListener("click",()=>l.playClick());async function Oe(){A("BUNDLING OFFLINE GDD..."),l.playClick();try{let e="";const s=Array.from(document.styleSheets);for(const h of s)try{if(h.href){const t=await fetch(h.href);e+=await t.text()}else{const t=Array.from(h.cssRules);e+=t.map(d=>d.cssText).join(`
`)}}catch(t){console.warn("Could not read stylesheet:",t)}let a="";const o=Array.from(document.querySelectorAll("script"));let i="";for(const h of o){const t=h.getAttribute("src");if(t&&(t.includes("assets/index")||t.includes("src/main.js")||h.type==="module")){i=t;break}}i?a=await(await fetch(i)).text():a='console.error("Main script bundle not found during export.");';const c=C.value;let u="";try{u=await(await fetch("./index.html")).text()}catch{u=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const y=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,f=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");u=u.replace(y,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${f}</textarea>`),u=u.replace(/<link rel="stylesheet" href="[^"]+">/g,""),u=u.replace(/<script type="module" src="[^"]+"><\/script>/g,""),u=u.replace("</head>",`<style>${e}</style></head>`),u=u.replace("</body>",`<script type="module">${a}<\/script></body>`);const r=new Blob([u],{type:"text/html"}),E=URL.createObjectURL(r),p=document.createElement("a");p.href=E,p.download="interactive_game_design_document.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(E),l.playSuccess(),A("OFFLINE GDD EXPORTED SUCCESS")}catch(e){console.error("Error during HTML export:",e),A("EXPORT ERROR: BUNDLING FAILED")}}function Be(){const e=xe();C.value=e,P(),A("SYSTEM READY")}Be();
