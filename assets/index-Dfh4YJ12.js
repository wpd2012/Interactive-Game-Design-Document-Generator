(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();function pe(e){return e?e.split(/\n\s*---\s*\n/).map(s=>{let o="";const i=s.split(`
`);let c=!1,d="",v=[];const y=()=>{c&&(o+=`<ul>${d}</ul>`,d="",c=!1)},r=()=>{v.length>0&&(o+='<div class="slide-grid">',v.forEach(E=>{o+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),o+="</div>",v=[])};for(let E=0;E<i.length;E++){let p=i[E].trim();if(!p){y(),r();continue}const h=p.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){y(),v.push({title:h[1].trim(),desc:h[2].trim()});continue}r();const t=p.match(/^\[loop:\s*([^\]]+)\]/);if(t){y();const f=t[1].split("->").map(b=>b.trim());o+=`<div class="loop-diagram-container" data-nodes="${f.join(",")}"></div>`;continue}const u=p.match(/^\[pacing:\s*([^\]]+)\]/);if(u){y();const f=u[1].split(",").map(b=>b.trim());o+=`<div class="pacing-container" data-points="${f.join(",")}"></div>`;continue}const a=p.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(a){y();const f=a[1].trim(),b=a[2].trim();o+=`<div class="sandbox-container" data-type="${f}" data-config="${b}"></div>`;continue}const m=p.match(/^\[roadmap:\s*([^\]]+)\]/);if(m){y();const f=m[1].split("->").map(b=>b.trim());o+=`<div class="roadmap-container" data-points="${f.join("|")}"></div>`;continue}const g=p.match(/^\[state:\s*([^\]]+)\]/);if(g){y();const f=g[1].split("->").map(D=>D.trim()),b=[],x=[];f.forEach(D=>{const I=D.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);I?(b.push(I[1].trim()),x.push(I[2]?I[2].trim():"System monitoring triggers.")):(b.push(D),x.push("System monitoring triggers."))}),o+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${x.join("|")}"></div>`;continue}if(p.startsWith("# ")){y();const f=p.substring(2).trim();o+=`<h1>${F(f)}</h1>`;continue}if(p.startsWith("## ")){y();const f=p.substring(3).trim();o+=`<h2>${F(f)}</h2>`;continue}if(p.startsWith("* ")||p.startsWith("- ")){c=!0;const f=p.substring(2).trim();d+=`<li>${F(f)}</li>`;continue}y(),o+=`<p>${F(p)}</p>`}return y(),r(),`<div class="slide-content">${o}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function F(e){return e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class me{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(n){console.error("Web Audio API is not supported in this browser.",n)}}setEnabled(n){this.isEnabled=n,this.ctx&&!n?this.ctx.suspend():this.ctx&&n&&this.ctx.resume()}createDecayGain(n,s){const o=this.ctx.createGain();return o.gain.setValueAtTime(n,this.ctx.currentTime),o.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+s),o}playHover(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.createOscillator(),s=this.createDecayGain(.04,this.config.hover.decay);n.type=this.config.hover.type,n.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),n.connect(s),s.connect(this.ctx.destination),n.start(),n.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.createOscillator(),s=this.createDecayGain(.08,this.config.click.decay);n.type=this.config.click.type,n.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),n.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const o=this.ctx.createOscillator(),i=this.createDecayGain(.05,.015);o.type="square",o.frequency.setValueAtTime(1200,this.ctx.currentTime),n.connect(s),s.connect(this.ctx.destination),o.connect(i),i.connect(this.ctx.destination),n.start(),o.start(),n.stop(this.ctx.currentTime+this.config.click.decay),o.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.sampleRate*.25,s=this.ctx.createBuffer(1,n,this.ctx.sampleRate),o=s.getChannelData(0);for(let v=0;v<n;v++)o[v]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=s;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(1500,this.ctx.currentTime),c.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const d=this.createDecayGain(.07,.25);i.connect(c),c.connect(d),d.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const n=this.ctx.currentTime,s=[261.63,329.63,392,523.25],o=.08;s.forEach((i,c)=>{const d=this.ctx.createOscillator(),v=this.ctx.createGain();d.type="square",d.frequency.setValueAtTime(i,n+c*o),v.gain.setValueAtTime(.05,n+c*o),v.gain.exponentialRampToValueAtTime(1e-4,n+(c+1)*o+.05),d.connect(v),v.connect(this.ctx.destination),d.start(n+c*o),d.stop(n+(c+2)*o)})}}const l=new me;function he(e){e.querySelectorAll(".loop-diagram-container").forEach(s=>{const o=s.getAttribute("data-nodes");if(!o)return;const i=o.split(","),c=i.length,d=600,v=360,y=d/2,r=v/2,E=105;let p=`
      <svg class="loop-diagram-svg" viewBox="0 0 ${d} ${v}" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG Definitions for Markers (Arrowheads) -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-muted)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-accent)" />
          </marker>
        </defs>
    `;const h=[];for(let t=0;t<c;t++){const u=(t*(360/c)-90)*(Math.PI/180),a=y+E*Math.cos(u),m=r+E*Math.sin(u);h.push({x:a,y:m,angle:u})}for(let t=0;t<c;t++){const u=h[t],a=h[(t+1)%c],m=u.angle+.35,g=a.angle-.35,f=y+E*Math.cos(m),b=r+E*Math.sin(m),x=y+E*Math.cos(g),D=r+E*Math.sin(g);p+=`
        <path class="loop-arrow-path" 
              d="M ${f} ${b} A ${E} ${E} 0 0 1 ${x} ${D}" 
              marker-end="url(#arrow)" />
      `}h.forEach((t,u)=>{const a=i[u],g=Math.max(80,a.length*8+15),f=30,b=t.x-g/2,x=t.y-f/2;p+=`
        <g class="loop-node" data-index="${u}">
          <rect class="loop-node-box" x="${b}" y="${x}" width="${g}" height="${f}" rx="6" ry="6" />
          <text class="loop-node-text" x="${t.x}" y="${t.y}">${a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>
        </g>
      `}),p+="</svg>",s.innerHTML=p,s.querySelectorAll(".loop-node").forEach(t=>{t.addEventListener("mouseenter",()=>{l.playHover();const u=parseInt(t.getAttribute("data-index"),10),a=s.querySelectorAll(".loop-arrow-path");a[u]&&(a[u].style.stroke="var(--text-accent)",a[u].setAttribute("marker-end","url(#arrow-active)"))}),t.addEventListener("mouseleave",()=>{const u=parseInt(t.getAttribute("data-index"),10),a=s.querySelectorAll(".loop-arrow-path");a[u]&&(a[u].style.stroke="",a[u].setAttribute("marker-end","url(#arrow)"))}),t.addEventListener("click",()=>{l.playClick()})})})}function ve(e){e.querySelectorAll(".pacing-container").forEach(s=>{const o=s.getAttribute("data-points");if(!o)return;let i=o.split(",").map(a=>{const m=parseInt(a.trim(),10);return isNaN(m)?50:Math.max(0,Math.min(100,m))});const c=i.length;let d=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const v=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];i.forEach((a,m)=>{const g=v[m]||`P${m+1}`;d+=`
        <div class="pacing-slider-group">
          <label>${g}: ${a}%</label>
          <input type="range" class="pacing-slider" data-index="${m}" min="0" max="100" value="${a}">
        </div>
      `}),d+="</div>",d+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,s.innerHTML=d;const y=s.querySelector(".pacing-canvas"),r=y.getContext("2d"),E=s.querySelectorAll(".pacing-slider"),p=s.querySelectorAll(".btn-preset"),h=()=>{const a=y.clientWidth,m=y.clientHeight;if(a===0||m===0)return;(y.width!==a||y.height!==m)&&(y.width=a,y.height=m);const g=y.width,f=y.height;r.clearRect(0,0,g,f);const b=getComputedStyle(document.documentElement),x=b.getPropertyValue("--text-accent").trim()||"#00ffff",D=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",I=b.getPropertyValue("--border-color").trim()||"#1f1f45";r.strokeStyle=I,r.lineWidth=1,r.setLineDash([4,4]);for(let L of[.25,.5,.75]){const k=f*L;r.beginPath(),r.moveTo(0,k),r.lineTo(g,k),r.stroke()}r.setLineDash([]);const $=40,N=g-$*2,C=i.map((L,k)=>{const T=$+k/(c-1)*N,q=f-20-L/100*(f-40);return{x:T,y:q}}),G=r.createLinearGradient(0,0,0,f);G.addColorStop(0,x+"22"),G.addColorStop(1,"transparent"),r.fillStyle=G,r.beginPath(),r.moveTo(C[0].x,f),r.lineTo(C[0].x,C[0].y);for(let L=0;L<C.length-1;L++){const k=C[L],T=C[L+1],q=k.x+(T.x-k.x)/2,W=k.y,Y=k.x+(T.x-k.x)/2,z=T.y;r.bezierCurveTo(q,W,Y,z,T.x,T.y)}r.lineTo(C[C.length-1].x,f),r.closePath(),r.fill(),r.strokeStyle=x,r.lineWidth=3,r.shadowBlur=10,r.shadowColor=x,r.beginPath(),r.moveTo(C[0].x,C[0].y);for(let L=0;L<C.length-1;L++){const k=C[L],T=C[L+1],q=k.x+(T.x-k.x)/2,W=k.y,Y=k.x+(T.x-k.x)/2,z=T.y;r.bezierCurveTo(q,W,Y,z,T.x,T.y)}r.stroke(),r.shadowBlur=0,C.forEach((L,k)=>{r.fillStyle=D,r.strokeStyle="#ffffff",r.lineWidth=2,r.beginPath(),r.arc(L.x,L.y,6,0,Math.PI*2),r.fill(),r.stroke(),r.fillStyle="var(--text-main)",r.font="9px monospace",r.textAlign="center",r.fillText(`${i[k]}%`,L.x,L.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(y);const u=a=>{const m=[...i];let g=0;const f=18,b=()=>{g++;const x=g/f,D=x*(2-x);i=m.map((I,$)=>{const N=a[$]!==void 0?a[$]:50;return Math.round(I+(N-I)*D)}),E.forEach((I,$)=>{I.value=i[$];const N=I.parentElement.querySelector("label"),C=v[$]||`P${$+1}`;N.textContent=`${C}: ${i[$]}%`}),s.setAttribute("data-points",i.join(",")),h(),g<f&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(a=>{a.addEventListener("input",m=>{const g=parseInt(a.getAttribute("data-index"),10),f=parseInt(m.target.value,10);i[g]=f;const b=a.parentElement.querySelector("label"),x=v[g]||`P${g+1}`;b.textContent=`${x}: ${f}%`,s.setAttribute("data-points",i.join(",")),h()}),a.addEventListener("mousedown",()=>{l.playClick()}),a.addEventListener("mouseenter",()=>{l.playHover()})}),p.forEach(a=>{a.addEventListener("click",()=>{const m=a.getAttribute("data-preset");let g=[];switch(m){case"boss":g=[10,20,30,95,20];break;case"stealth":g=[75,80,25,15,10];break;case"slow":g=[10,30,50,70,90];break;case"flat":g=[40,40,40,40,40];break}l.playSuccess(),u(g)}),a.addEventListener("mouseenter",()=>{l.playHover()})})})}function ge(e){e.querySelectorAll(".state-machine-container").forEach(s=>{const o=s.getAttribute("data-states"),i=s.getAttribute("data-descriptions");if(!o)return;const c=o.split(","),d=i?i.split("|"):[];let v=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;c.forEach((h,t)=>{const u=t===0?"active":"",a=d[t]||"System monitoring triggers.";v+=`
        <div class="state-node-wrapper">
          <div class="state-node ${u}" data-index="${t}" data-desc="${a}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,t<c.length-1&&(v+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),v+="</div>"});const y=d[0]||"System monitoring triggers.";v+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${c[0]}</strong></span>
        <p id="active-state-desc">${y}</p>
      </div>
    `,s.innerHTML=v;const r=s.querySelectorAll(".state-node"),E=s.querySelector("#active-state-title"),p=s.querySelector("#active-state-desc");r.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;r.forEach(g=>g.classList.remove("active")),h.classList.add("active");const t=h.getAttribute("data-index"),u=c[t],a=h.getAttribute("data-desc");E.textContent=u,p.textContent=a,s.querySelectorAll(".connector-arrow path").forEach((g,f)=>{f==t-1&&(g.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{g.style.stroke=""},600))}),l.playSuccess()}),h.addEventListener("mouseenter",()=>{l.playHover()})})})}function fe(e){e.querySelectorAll(".sandbox-container").forEach(s=>{const o=s.getAttribute("data-type"),i=s.getAttribute("data-config");i&&(o==="formula"?ye(s,i):o==="loot"&&Ee(s,i))})}function ye(e,n){const s=n.split("|").map(t=>t.trim()),i=s[0].split("=").map(t=>t.trim()),c=i[0]||"Result",d=i[1]||"",v={};for(let t=1;t<s.length;t++)s[t].split(",").map(a=>a.trim()).forEach(a=>{const m=a.split(":").map(g=>g.trim());m.length===2&&(v[m[0]]=parseFloat(m[1])||0)});let y=`
    <div class="sandbox-card formula-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📊 EQUATION PLAYGROUND</span>
        <span class="hud-label status">LIVE CALCULATOR</span>
      </div>
      
      <div class="formula-display-box">
        <div class="formula-expr">${c} = <span class="accent-expr">${d}</span></div>
        <div class="formula-output">
          <span class="output-label">${c}:</span>
          <span class="output-val" id="formula-result-val">0.00</span>
        </div>
      </div>

      <div class="sandbox-controls">
  `;const r={...v};Object.keys(r).forEach(t=>{const u=r[t],a=u>0?Math.ceil(u*3):100;y+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${t}</span>
          <span class="var-val" id="val-display-${t}">${u}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${t}" min="0" max="${a}" value="${u}" step="1">
      </div>
    `}),y+=`
      </div>
    </div>
  `,e.innerHTML=y;const E=e.querySelector("#formula-result-val"),p=e.querySelectorAll(".sandbox-slider"),h=()=>{let t=d;const u=Object.keys(r).sort((a,m)=>m.length-a.length);for(const a of u){const m=new RegExp("\\b"+a+"\\b","g");t=t.replace(m,r[a])}if(/^[0-9+\-*/().\s]+$/.test(t))try{const a=Function(`"use strict"; return (${t})`)();typeof a=="number"&&!isNaN(a)&&isFinite(a)?E.textContent=a%1===0?a:a.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};p.forEach(t=>{t.addEventListener("input",u=>{const a=t.getAttribute("data-var"),m=parseFloat(u.target.value)||0;r[a]=m,e.querySelector(`#val-display-${a}`).textContent=m,h()}),t.addEventListener("mouseenter",()=>l.playHover()),t.addEventListener("mousedown",()=>l.playClick())}),h()}function Ee(e,n){const s=[];let o=0;n.split(",").map(p=>p.trim()).forEach(p=>{const h=p.split(":").map(t=>t.trim());if(h.length===2){const t=h[0],u=parseFloat(h[1])||0;s.push({name:t,weight:u}),o+=u}});let c=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const d={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};s.forEach(p=>{const h=(p.weight/o*100).toFixed(1),t=p.name.toLowerCase(),u=d[t]||"var(--text-accent)";c+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${u};" title="${p.name}: ${h}%"></div>
    `}),c+=`
      </div>

      <div class="loot-stats-grid">
  `,s.forEach(p=>{const h=(p.weight/o*100).toFixed(1),t=p.name.toLowerCase(),u=d[t]||"var(--text-accent)";c+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${u};">• ${p.name.toUpperCase()}</span>
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
  `,e.innerHTML=c;const v=e.querySelector(".btn-roll-loot"),y=e.querySelector("#loot-console"),r={};s.forEach(p=>{r[p.name.toLowerCase()]=0});let E=0;v.addEventListener("click",()=>{E++;const p=Math.random()*o;let h=0,t=s[0];for(let g=0;g<s.length;g++)if(h+=s[g].weight,p<=h){t=s[g];break}const u=t.name.toLowerCase();r[u]++,s.forEach(g=>{const f=g.name.toLowerCase(),b=r[f],x=(b/E*100).toFixed(0);e.querySelector(`#count-${f}`).textContent=`${b} (${x}%)`}),u==="legendary"||u==="exotic"?l.playSuccess():l.playClick();const a=d[u]||"var(--text-accent)",m=document.createElement("div");m.className="log-line",m.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${a}; text-shadow: 0 0 4px ${a}55;">[${t.name.toUpperCase()}]</strong>`,y.appendChild(m),y.scrollTop=y.scrollHeight,(u==="legendary"||u==="exotic")&&(v.classList.add("btn-pulse-glow"),setTimeout(()=>v.classList.remove("btn-pulse-glow"),500))}),v.addEventListener("mouseenter",()=>l.playHover())}function be(e){e.querySelectorAll(".roadmap-container").forEach(s=>{const o=s.getAttribute("data-points");if(!o)return;const c=o.split("|").map(t=>t.trim()).map((t,u)=>{const a=t.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),m=a?a[1].trim():t,f=(a&&a[2]?a[2].trim():"").split(","),b=f.length>1?f[f.length-1].trim():"TBD",x=f.length>0?f[0].trim():"Objective pending";return{id:u+1,name:m,date:b,objective:x}});let d=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;c.forEach((t,u)=>{d+=`
        <div class="roadmap-node ${u===0?"active":""}" data-index="${u}" title="Click to inspect: ${t.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${t.name}</span>
          <span class="node-date">${t.date}</span>
        </div>
      `}),d+=`
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
    `,s.innerHTML=d;const v=s.querySelectorAll(".roadmap-node"),y=s.querySelector("#roadmap-active-badge"),r=s.querySelector("#roadmap-active-title"),E=s.querySelector("#roadmap-active-date"),p=s.querySelector("#roadmap-active-objective"),h=s.querySelector("#roadmap-active-checklist");v.forEach(t=>{t.addEventListener("click",()=>{const u=parseInt(t.getAttribute("data-index"),10),a=c[u];v.forEach(g=>g.classList.remove("active")),t.classList.add("active"),l.playSuccess(),y.textContent=`PHASE ${a.id}`,r.textContent=a.name,E.textContent=a.date,p.textContent=a.objective;let m=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;a.id>1?m+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':m+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',a.id===c.length?m+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:a.id>=3?m+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:m+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,h.innerHTML=m}),t.addEventListener("mouseenter",()=>l.playHover())})})}const te="playable_gdd_draft",K=`# CYBER-PULSE: NEON RUNNER
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
`;function xe(e){try{return localStorage.setItem(te,e),!0}catch(n){return console.error("Failed to save draft to LocalStorage",n),!1}}function Le(){try{const e=localStorage.getItem(te);return e!==null?e:K}catch(e){return console.error("Failed to load draft from LocalStorage",e),K}}let w=0,M=[],X=null,B=!1,R=!1;const S=document.getElementById("markdown-input"),H=document.getElementById("slide-container"),ne=document.getElementById("current-slide-num"),ke=document.getElementById("total-slides-num"),se=document.getElementById("prev-slide-btn"),ae=document.getElementById("next-slide-btn"),we=document.getElementById("status-message"),oe=document.getElementById("theme-select"),Q=document.getElementById("toggle-crt"),Z=document.getElementById("toggle-audio"),U=document.getElementById("toggle-editor"),j=document.getElementById("toggle-doc"),ce=document.getElementById("btn-fullscreen"),_=document.getElementById("btn-export-trigger"),O=document.getElementById("export-dropdown-container"),J=document.getElementById("editor-actions-select"),Ce=document.getElementById("audio-modal"),ie=document.getElementById("btn-enable-audio");function P(){const e=S.value;M=pe(e),ke.textContent=M.length,w>=M.length&&(w=Math.max(0,M.length-1)),ne.textContent=w+1,H.innerHTML=M[w]||"",he(H),ve(H),ge(H),fe(H),be(H),Ae()}function V(e){e<0||e>=M.length||(w=e,ne.textContent=w+1,l.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),P(),A(`VIEWING SLIDE ${w+1}`))}function Ae(){H.querySelectorAll(".tilt-card").forEach(n=>{n.addEventListener("mousemove",s=>{const o=n.getBoundingClientRect(),i=s.clientX-o.left,c=s.clientY-o.top,d=o.width,v=o.height,y=(i/d-.5)*20,r=-(c/v-.5)*20;n.style.transform=`rotateX(${r}deg) rotateY(${y}deg) scale(1.03)`}),n.addEventListener("mouseleave",()=>{n.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),n.addEventListener("mouseenter",()=>{l.playHover()}),n.addEventListener("click",()=>{l.playClick()})})}function Se(e){const n=S.selectionStart,s=S.value;let o="";switch(e){case"slide":o=`
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
`;break}const i=s.substring(0,n),c=s.substring(n);S.value=i+o+c,S.focus();const d=n+o.length;S.setSelectionRange(d,d),l.playClick(),P(),ee()}function ee(){A("SAVING..."),X&&clearTimeout(X),X=setTimeout(()=>{xe(S.value),A("SYSTEM READY • AUTO-SAVED")},1e3)}function A(e){we.textContent=e}document.addEventListener("keydown",e=>{document.activeElement!==S&&(R||(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"?(e.preventDefault(),w<M.length-1?V(w+1):l.playClick()):e.key==="ArrowLeft"||e.key==="Backspace"||e.key==="PageUp"?(e.preventDefault(),w>0?V(w-1):l.playClick()):e.key.toLowerCase()==="f"?(e.preventDefault(),re()):e.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&le()))});function re(){l.playClick(),document.body.classList.contains("presentation-fullscreen")?le():(document.body.classList.add("presentation-fullscreen"),A("FULLSCREEN PRESENTER MODE ACTIVE"))}function le(){document.body.classList.remove("presentation-fullscreen"),A("SYSTEM READY")}oe.addEventListener("change",e=>{const n=e.target.value;document.documentElement.setAttribute("data-theme",n),l.playClick(),P()});oe.addEventListener("mouseenter",()=>l.playHover());U.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),U.classList.toggle("active",B),B&&(R=!1,document.body.classList.remove("markdown-solo"),j.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),A(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});U.addEventListener("mouseenter",()=>l.playHover());j.addEventListener("click",()=>{R=!R,document.body.classList.toggle("markdown-solo",R),j.classList.toggle("active",R),R&&(B=!1,document.body.classList.remove("live-solo"),U.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),l.playClick(),setTimeout(()=>{P(),A(R?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});j.addEventListener("mouseenter",()=>l.playHover());Q.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",e?"false":"true"),Q.classList.toggle("active",!e),l.playClick()});Q.addEventListener("mouseenter",()=>l.playHover());Z.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",e?"false":"true"),Z.classList.toggle("active",!e),l.setEnabled(!e),l.playClick()});Z.addEventListener("mouseenter",()=>l.playHover());se.addEventListener("click",()=>{w>0&&V(w-1)});se.addEventListener("mouseenter",()=>l.playHover());ae.addEventListener("click",()=>{w<M.length-1&&V(w+1)});ae.addEventListener("mouseenter",()=>l.playHover());ce.addEventListener("click",re);ce.addEventListener("mouseenter",()=>l.playHover());_&&O&&(_.addEventListener("click",n=>{n.stopPropagation();const s=O.classList.contains("open");O.classList.toggle("open",!s),l.playClick()}),_.addEventListener("mouseenter",()=>l.playHover()),O.querySelectorAll(".dropdown-item").forEach(n=>{n.addEventListener("mouseenter",()=>l.playHover()),n.addEventListener("click",s=>{s.stopPropagation();const o=n.getAttribute("data-value");if(O.classList.remove("open"),o==="pdf")l.playClick(),window.print();else if(o==="html")Be();else if(o==="markdown"){const i=S.value,c=new Blob([i],{type:"text/markdown"}),d=URL.createObjectURL(c),v=document.createElement("a");v.href=d,v.download="game_design_document.md",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(d),l.playSuccess(),A("GDD MARKDOWN FILE DOWNLOADED")}})}),document.addEventListener("click",n=>{O.contains(n.target)||O.classList.remove("open")}));J.addEventListener("change",e=>{const n=e.target.value;if(n){if(n==="copy")navigator.clipboard.writeText(S.value).then(()=>{l.playSuccess(),A("GDD SOURCE COPIED TO CLIPBOARD")}).catch(s=>{console.error("Could not copy text: ",s)});else if(n==="download"){const s=S.value,o=new Blob([s],{type:"text/markdown"}),i=URL.createObjectURL(o),c=document.createElement("a");c.href=i,c.download="game_design_document.md",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i),l.playSuccess(),A("GDD MARKDOWN FILE DOWNLOADED")}else n==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(S.value=K,w=0,l.playSuccess(),P(),ee());J.value=""}});J.addEventListener("mouseenter",()=>l.playHover());document.querySelectorAll("[data-inject]").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-inject");Se(n)}),e.addEventListener("mouseenter",()=>l.playHover())});S.addEventListener("input",()=>{P(),ee()});ie.addEventListener("click",()=>{l.init(),Ce.classList.add("hidden")});ie.addEventListener("mouseenter",()=>{});const de=document.getElementById("btn-audio-deck"),ue=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Te=document.getElementById("param-hover-freq"),Ie=document.getElementById("param-hover-decay"),De=document.getElementById("param-hover-wave"),$e=document.getElementById("btn-test-hover"),Re=document.getElementById("param-click-freq"),Me=document.getElementById("param-click-decay"),Pe=document.getElementById("param-click-wave"),Oe=document.getElementById("btn-test-click");de.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),l.playClick()});de.addEventListener("mouseenter",()=>l.playHover());ue.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),l.playClick()});ue.addEventListener("mouseenter",()=>l.playHover());Te.addEventListener("input",e=>{const n=e.target.value;document.getElementById("val-hover-freq").textContent=`${n} Hz`,l.config.hover.freq=parseInt(n,10)});Ie.addEventListener("input",e=>{const n=e.target.value;document.getElementById("val-hover-decay").textContent=`${n}s`,l.config.hover.decay=parseFloat(n)});De.addEventListener("change",e=>{l.config.hover.type=e.target.value});$e.addEventListener("click",()=>l.playHover());Re.addEventListener("input",e=>{const n=e.target.value;document.getElementById("val-click-freq").textContent=`${n} Hz`,l.config.click.freq=parseInt(n,10)});Me.addEventListener("input",e=>{const n=e.target.value;document.getElementById("val-click-decay").textContent=`${n}s`,l.config.click.decay=parseFloat(n)});Pe.addEventListener("change",e=>{l.config.click.type=e.target.value});Oe.addEventListener("click",()=>l.playClick());async function Be(){A("BUNDLING OFFLINE GDD..."),l.playClick();try{let e="";const n=Array.from(document.styleSheets);for(const h of n)try{if(h.href){const t=await fetch(h.href);e+=await t.text()}else{const t=Array.from(h.cssRules);e+=t.map(u=>u.cssText).join(`
`)}}catch(t){console.warn("Could not read stylesheet:",t)}let s="";const o=Array.from(document.querySelectorAll("script"));let i="";for(const h of o){const t=h.getAttribute("src");if(t&&(t.includes("assets/index")||t.includes("src/main.js")||h.type==="module")){i=t;break}}i?s=await(await fetch(i)).text():s='console.error("Main script bundle not found during export.");';const c=S.value;let d="";try{d=await(await fetch("./index.html")).text()}catch{d=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const v=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,y=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");d=d.replace(v,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${y}</textarea>`),d=d.replace(/<link rel="stylesheet" href="[^"]+">/g,""),d=d.replace(/<script type="module" src="[^"]+"><\/script>/g,""),d=d.replace("</head>",`<style>${e}</style></head>`),d=d.replace("</body>",`<script type="module">${s}<\/script></body>`);const r=new Blob([d],{type:"text/html"}),E=URL.createObjectURL(r),p=document.createElement("a");p.href=E,p.download="interactive_game_design_document.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(E),l.playSuccess(),A("OFFLINE GDD EXPORTED SUCCESS")}catch(e){console.error("Error during HTML export:",e),A("EXPORT ERROR: BUNDLING FAILED")}}function He(){const e=Le();S.value=e,P(),A("SYSTEM READY")}He();
