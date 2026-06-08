(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();function Te(t){return t?t.split(/\n\s*---\s*\n/).map(s=>{let n="";const r=s.split(`
`);let i=!1,u="",g=[];const y=()=>{i&&(n+=`<ul>${u}</ul>`,u="",i=!1)},d=()=>{g.length>0&&(n+='<div class="slide-grid">',g.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",g=[])};for(let E=0;E<r.length;E++){let v=r[E].trim();if(!v){y(),d();continue}const h=v.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(h){y(),g.push({title:h[1].trim(),desc:h[2].trim()});continue}d();const a=v.match(/^\[loop:\s*([^\]]+)\]/);if(a){y();const m=a[1].split("->").map(b=>b.trim());n+=`<div class="loop-diagram-container" data-nodes="${m.join(",")}"></div>`;continue}const f=v.match(/^\[pacing:\s*([^\]]+)\]/);if(f){y();const m=f[1].split(",").map(b=>b.trim());n+=`<div class="pacing-container" data-points="${m.join(",")}"></div>`;continue}const c=v.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(c){y();const m=c[1].trim(),b=c[2].trim();n+=`<div class="sandbox-container" data-type="${m}" data-config="${b}"></div>`;continue}const l=v.match(/^\[roadmap:\s*([^\]]+)\]/);if(l){y();const m=l[1].split("->").map(b=>b.trim());n+=`<div class="roadmap-container" data-points="${m.join("|")}"></div>`;continue}const p=v.match(/^\[state:\s*([^\]]+)\]/);if(p){y();const m=p[1].split("->").map($=>$.trim()),b=[],L=[];m.forEach($=>{const A=$.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);A?(b.push(A[1].trim()),L.push(A[2]?A[2].trim():"System monitoring triggers.")):(b.push($),L.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${L.join("|")}"></div>`;continue}if(v.startsWith("# ")){y();const m=v.substring(2).trim();n+=`<h1>${z(m)}</h1>`;continue}if(v.startsWith("## ")){y();const m=v.substring(3).trim();n+=`<h2>${z(m)}</h2>`;continue}if(v.startsWith("* ")||v.startsWith("- ")){i=!0;const m=v.substring(2).trim();u+=`<li>${z(m)}</li>`;continue}y(),n+=`<p>${z(v)}</p>`}return y(),d(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function z(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class Ae{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(e){console.error("Web Audio API is not supported in this browser.",e)}}setEnabled(e){this.isEnabled=e,this.ctx&&!e?this.ctx.suspend():this.ctx&&e&&this.ctx.resume()}createDecayGain(e,s){const n=this.ctx.createGain();return n.gain.setValueAtTime(e,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+s),n}playHover(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),s=this.createDecayGain(.04,this.config.hover.decay);e.type=this.config.hover.type,e.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),e.connect(s),s.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),s=this.createDecayGain(.08,this.config.click.decay);e.type=this.config.click.type,e.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),r=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),e.connect(s),s.connect(this.ctx.destination),n.connect(r),r.connect(this.ctx.destination),e.start(),n.start(),e.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.sampleRate*.25,s=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=s.getChannelData(0);for(let g=0;g<e;g++)n[g]=Math.random()*2-1;const r=this.ctx.createBufferSource();r.buffer=s;const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(1500,this.ctx.currentTime),i.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);r.connect(i),i.connect(u),u.connect(this.ctx.destination),r.start(),r.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.currentTime,s=[261.63,329.63,392,523.25],n=.08;s.forEach((r,i)=>{const u=this.ctx.createOscillator(),g=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(r,e+i*n),g.gain.setValueAtTime(.05,e+i*n),g.gain.exponentialRampToValueAtTime(1e-4,e+(i+1)*n+.05),u.connect(g),g.connect(this.ctx.destination),u.start(e+i*n),u.stop(e+(i+2)*n)})}}const o=new Ae;function Ie(t){t.querySelectorAll(".loop-diagram-container").forEach(s=>{const n=s.getAttribute("data-nodes");if(!n)return;const r=n.split(",").map(l=>l.trim()),i=r.length,u=520,g=380,y=u/2,d=g/2,E=120,v=[];for(let l=0;l<i;l++){const p=(l*(360/i)-90)*(Math.PI/180),m=y+E*Math.cos(p),b=d+E*Math.sin(p);v.push({x:m,y:b,angle:p})}let h=`<svg class="loop-arrows-svg" viewBox="0 0 ${u} ${g}" xmlns="http://www.w3.org/2000/svg">
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
      </defs>`;for(let l=0;l<i;l++){const p=v[l].angle+.4,m=v[(l+1)%i].angle-.4,b=y+E*Math.cos(p),L=d+E*Math.sin(p),$=y+E*Math.cos(m),A=d+E*Math.sin(m);h+=`<path class="loop-arc" data-arc-index="${l}"
        d="M ${b} ${L} A ${E} ${E} 0 0 1 ${$} ${A}"
        marker-end="url(#la-${a})" />`}h+="</svg>";let f="";v.forEach((l,p)=>{const m=r[p],b=l.x/u*100,L=l.y/g*100;f+=`
        <button class="loop-node-btn" data-index="${p}"
                style="left: ${b}%; top: ${L}%;">
          <span class="loop-node-label">${m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span>
        </button>`});const c=`<div class="loop-center-label">
      <span class="loop-center-icon">⟳</span>
      <span class="loop-center-text">LOOP</span>
    </div>`;s.innerHTML=`
      <div class="loop-stage" style="--loop-w: ${u}px; --loop-h: ${g}px;">
        <div class="loop-arrows-layer">${h}</div>
        <div class="loop-nodes-layer">${f}</div>
        ${c}
      </div>`,s.querySelectorAll(".loop-node-btn").forEach(l=>{l.addEventListener("mouseenter",()=>{o.playHover(),l.classList.add("is-active");const p=parseInt(l.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.add("is-active"),m[p].setAttribute("marker-end",`url(#la-act-${a})`))}),l.addEventListener("mouseleave",()=>{l.classList.remove("is-active");const p=parseInt(l.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.remove("is-active"),m[p].setAttribute("marker-end",`url(#la-${a})`))}),l.addEventListener("click",()=>{o.playClick()})})})}function $e(t){t.querySelectorAll(".pacing-container").forEach(s=>{const n=s.getAttribute("data-points");if(!n)return;let r=n.split(",").map(c=>{const l=parseInt(c.trim(),10);return isNaN(l)?50:Math.max(0,Math.min(100,l))});const i=r.length;let u=`
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
    `,s.innerHTML=u;const y=s.querySelector(".pacing-canvas"),d=y.getContext("2d"),E=s.querySelectorAll(".pacing-slider"),v=s.querySelectorAll(".btn-preset"),h=()=>{const c=y.clientWidth,l=y.clientHeight;if(c===0||l===0)return;(y.width!==c||y.height!==l)&&(y.width=c,y.height=l);const p=y.width,m=y.height;d.clearRect(0,0,p,m);const b=getComputedStyle(document.documentElement),L=b.getPropertyValue("--text-accent").trim()||"#00ffff",$=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",A=b.getPropertyValue("--border-color").trim()||"#1f1f45";d.strokeStyle=A,d.lineWidth=1,d.setLineDash([4,4]);for(let x of[.25,.5,.75]){const k=m*x;d.beginPath(),d.moveTo(0,k),d.lineTo(p,k),d.stroke()}d.setLineDash([]);const D=40,F=p-D*2,C=r.map((x,k)=>{const I=D+k/(i-1)*F,U=m-20-x/100*(m-40);return{x:I,y:U}}),ee=d.createLinearGradient(0,0,0,m);ee.addColorStop(0,L+"22"),ee.addColorStop(1,"transparent"),d.fillStyle=ee,d.beginPath(),d.moveTo(C[0].x,m),d.lineTo(C[0].x,C[0].y);for(let x=0;x<C.length-1;x++){const k=C[x],I=C[x+1],U=k.x+(I.x-k.x)/2,te=k.y,se=k.x+(I.x-k.x)/2,ne=I.y;d.bezierCurveTo(U,te,se,ne,I.x,I.y)}d.lineTo(C[C.length-1].x,m),d.closePath(),d.fill(),d.strokeStyle=L,d.lineWidth=3,d.shadowBlur=10,d.shadowColor=L,d.beginPath(),d.moveTo(C[0].x,C[0].y);for(let x=0;x<C.length-1;x++){const k=C[x],I=C[x+1],U=k.x+(I.x-k.x)/2,te=k.y,se=k.x+(I.x-k.x)/2,ne=I.y;d.bezierCurveTo(U,te,se,ne,I.x,I.y)}d.stroke(),d.shadowBlur=0,C.forEach((x,k)=>{d.fillStyle=$,d.strokeStyle="#ffffff",d.lineWidth=2,d.beginPath(),d.arc(x.x,x.y,6,0,Math.PI*2),d.fill(),d.stroke(),d.fillStyle="var(--text-main)",d.font="9px monospace",d.textAlign="center",d.fillText(`${r[k]}%`,x.x,x.y-12)})};h(),new ResizeObserver(()=>{h()}).observe(y);const f=c=>{const l=[...r];let p=0;const m=18,b=()=>{p++;const L=p/m,$=L*(2-L);r=l.map((A,D)=>{const F=c[D]!==void 0?c[D]:50;return Math.round(A+(F-A)*$)}),E.forEach((A,D)=>{A.value=r[D];const F=A.parentElement.querySelector("label"),C=g[D]||`P${D+1}`;F.textContent=`${C}: ${r[D]}%`}),s.setAttribute("data-points",r.join(",")),h(),p<m&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(c=>{c.addEventListener("input",l=>{const p=parseInt(c.getAttribute("data-index"),10),m=parseInt(l.target.value,10);r[p]=m;const b=c.parentElement.querySelector("label"),L=g[p]||`P${p+1}`;b.textContent=`${L}: ${m}%`,s.setAttribute("data-points",r.join(",")),h()}),c.addEventListener("mousedown",()=>{o.playClick()}),c.addEventListener("mouseenter",()=>{o.playHover()})}),v.forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-preset");let p=[];switch(l){case"boss":p=[10,20,30,95,20];break;case"stealth":p=[75,80,25,15,10];break;case"slow":p=[10,30,50,70,90];break;case"flat":p=[40,40,40,40,40];break}o.playSuccess(),f(p)}),c.addEventListener("mouseenter",()=>{o.playHover()})})})}function De(t){t.querySelectorAll(".state-machine-container").forEach(s=>{const n=s.getAttribute("data-states"),r=s.getAttribute("data-descriptions");if(!n)return;const i=n.split(","),u=r?r.split("|"):[];let g=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;i.forEach((h,a)=>{const f=a===0?"active":"",c=u[a]||"System monitoring triggers.";g+=`
        <div class="state-node-wrapper">
          <div class="state-node ${f}" data-index="${a}" data-desc="${c}">
            <div class="state-indicator"></div>
            <span class="state-name">${h}</span>
          </div>
      `,a<i.length-1&&(g+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),g+="</div>"});const y=u[0]||"System monitoring triggers.";g+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${i[0]}</strong></span>
        <p id="active-state-desc">${y}</p>
      </div>
    `,s.innerHTML=g;const d=s.querySelectorAll(".state-node"),E=s.querySelector("#active-state-title"),v=s.querySelector("#active-state-desc");d.forEach(h=>{h.addEventListener("click",()=>{if(h.classList.contains("active"))return;d.forEach(p=>p.classList.remove("active")),h.classList.add("active");const a=h.getAttribute("data-index"),f=i[a],c=h.getAttribute("data-desc");E.textContent=f,v.textContent=c,s.querySelectorAll(".connector-arrow path").forEach((p,m)=>{m==a-1&&(p.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{p.style.stroke=""},600))}),o.playSuccess()}),h.addEventListener("mouseenter",()=>{o.playHover()})})})}function Me(t){t.querySelectorAll(".sandbox-container").forEach(s=>{const n=s.getAttribute("data-type"),r=s.getAttribute("data-config");r&&(n==="formula"?Re(s,r):n==="loot"&&Be(s,r))})}function Re(t,e){const s=e.split("|").map(a=>a.trim()),r=s[0].split("=").map(a=>a.trim()),i=r[0]||"Result",u=r[1]||"",g={};for(let a=1;a<s.length;a++)s[a].split(",").map(c=>c.trim()).forEach(c=>{const l=c.split(":").map(p=>p.trim());l.length===2&&(g[l[0]]=parseFloat(l[1])||0)});let y=`
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
  `;const d={...g};Object.keys(d).forEach(a=>{const f=d[a],c=f>0?Math.ceil(f*3):100;y+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${a}</span>
          <span class="var-val" id="val-display-${a}">${f}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${a}" min="0" max="${c}" value="${f}" step="1">
      </div>
    `}),y+=`
      </div>
    </div>
  `,t.innerHTML=y;const E=t.querySelector("#formula-result-val"),v=t.querySelectorAll(".sandbox-slider"),h=()=>{let a=u;const f=Object.keys(d).sort((c,l)=>l.length-c.length);for(const c of f){const l=new RegExp("\\b"+c+"\\b","g");a=a.replace(l,d[c])}if(/^[0-9+\-*/().\s]+$/.test(a))try{const c=Function(`"use strict"; return (${a})`)();typeof c=="number"&&!isNaN(c)&&isFinite(c)?E.textContent=c%1===0?c:c.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};v.forEach(a=>{a.addEventListener("input",f=>{const c=a.getAttribute("data-var"),l=parseFloat(f.target.value)||0;d[c]=l,t.querySelector(`#val-display-${c}`).textContent=l,h()}),a.addEventListener("mouseenter",()=>o.playHover()),a.addEventListener("mousedown",()=>o.playClick())}),h()}function Be(t,e){const s=[];let n=0;e.split(",").map(v=>v.trim()).forEach(v=>{const h=v.split(":").map(a=>a.trim());if(h.length===2){const a=h[0],f=parseFloat(h[1])||0;s.push({name:a,weight:f}),n+=f}});let i=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const u={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};s.forEach(v=>{const h=(v.weight/n*100).toFixed(1),a=v.name.toLowerCase(),f=u[a]||"var(--text-accent)";i+=`
      <div class="loot-bar-segment" style="width: ${h}%; background: ${f};" title="${v.name}: ${h}%"></div>
    `}),i+=`
      </div>

      <div class="loot-stats-grid">
  `,s.forEach(v=>{const h=(v.weight/n*100).toFixed(1),a=v.name.toLowerCase(),f=u[a]||"var(--text-accent)";i+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${f};">• ${v.name.toUpperCase()}</span>
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
  `,t.innerHTML=i;const g=t.querySelector(".btn-roll-loot"),y=t.querySelector("#loot-console"),d={};s.forEach(v=>{d[v.name.toLowerCase()]=0});let E=0;g.addEventListener("click",()=>{E++;const v=Math.random()*n;let h=0,a=s[0];for(let p=0;p<s.length;p++)if(h+=s[p].weight,v<=h){a=s[p];break}const f=a.name.toLowerCase();d[f]++,s.forEach(p=>{const m=p.name.toLowerCase(),b=d[m],L=(b/E*100).toFixed(0);t.querySelector(`#count-${m}`).textContent=`${b} (${L}%)`}),f==="legendary"||f==="exotic"?o.playSuccess():o.playClick();const c=u[f]||"var(--text-accent)",l=document.createElement("div");l.className="log-line",l.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${c}; text-shadow: 0 0 4px ${c}55;">[${a.name.toUpperCase()}]</strong>`,y.appendChild(l),y.scrollTop=y.scrollHeight,(f==="legendary"||f==="exotic")&&(g.classList.add("btn-pulse-glow"),setTimeout(()=>g.classList.remove("btn-pulse-glow"),500))}),g.addEventListener("mouseenter",()=>o.playHover())}function Pe(t){t.querySelectorAll(".roadmap-container").forEach(s=>{const n=s.getAttribute("data-points");if(!n)return;const i=n.split("|").map(a=>a.trim()).map((a,f)=>{const c=a.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),l=c?c[1].trim():a,m=(c&&c[2]?c[2].trim():"").split(","),b=m.length>1?m[m.length-1].trim():"TBD",L=m.length>0?m[0].trim():"Objective pending";return{id:f+1,name:l,date:b,objective:L}});let u=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;i.forEach((a,f)=>{u+=`
        <div class="roadmap-node ${f===0?"active":""}" data-index="${f}" title="Click to inspect: ${a.name}">
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
    `,s.innerHTML=u;const g=s.querySelectorAll(".roadmap-node"),y=s.querySelector("#roadmap-active-badge"),d=s.querySelector("#roadmap-active-title"),E=s.querySelector("#roadmap-active-date"),v=s.querySelector("#roadmap-active-objective"),h=s.querySelector("#roadmap-active-checklist");g.forEach(a=>{a.addEventListener("click",()=>{const f=parseInt(a.getAttribute("data-index"),10),c=i[f];g.forEach(p=>p.classList.remove("active")),a.classList.add("active"),o.playSuccess(),y.textContent=`PHASE ${c.id}`,d.textContent=c.name,E.textContent=c.date,v.textContent=c.objective;let l=`
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
          `,h.innerHTML=l}),a.addEventListener("mouseenter",()=>o.playHover())})})}const he="playable_gdd_draft",ie=`# CYBER-PULSE: NEON RUNNER
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
`;function Oe(t){try{return localStorage.setItem(he,t),!0}catch(e){return console.error("Failed to save draft to LocalStorage",e),!1}}function He(){try{const t=localStorage.getItem(he);return t!==null?t:ie}catch(t){return console.error("Failed to load draft from LocalStorage",t),ie}}let w=0,P=[],ae=null,B=!1,M=!1,j=localStorage.getItem("playable_gdd_glitch_setting")||"low";const T=document.getElementById("markdown-input"),H=document.getElementById("slide-container"),fe=document.getElementById("current-slide-num"),Ne=document.getElementById("total-slides-num"),ye=document.getElementById("prev-slide-btn"),Ee=document.getElementById("next-slide-btn"),q=document.getElementById("status-message"),V=document.getElementById("theme-select"),X=document.getElementById("toggle-crt"),_=document.getElementById("toggle-audio"),W=document.getElementById("toggle-editor"),Y=document.getElementById("toggle-doc"),be=document.getElementById("btn-fullscreen"),oe=document.getElementById("btn-export-trigger"),O=document.getElementById("export-dropdown-container"),re=document.getElementById("editor-actions-select"),qe=document.getElementById("audio-modal"),Le=document.getElementById("btn-enable-audio"),K=document.getElementById("btn-settings"),Fe=document.getElementById("settings-drawer"),xe=document.getElementById("btn-close-settings"),ke=document.getElementById("settings-theme-select"),de=document.getElementById("settings-toggle-crt"),ue=document.getElementById("settings-toggle-audio"),Z=document.getElementById("settings-toggle-editor"),J=document.getElementById("settings-toggle-doc"),le=document.getElementById("settings-toggle-header-controls"),pe=document.getElementById("settings-glitch-select");function R(){const t=T.value;P=Te(t),Ne.textContent=P.length,w>=P.length&&(w=Math.max(0,P.length-1)),fe.textContent=w+1,H.innerHTML=P[w]||"",Ie(H),$e(H),De(H),Me(H),Pe(H),Ue()}function me(){j==="normal"?(document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220)):j==="low"&&(document.body.classList.add("glitch-active-low"),setTimeout(()=>{document.body.classList.remove("glitch-active-low")},150))}function Q(t){t<0||t>=P.length||(w=t,fe.textContent=w+1,o.playTransition(),me(),R(),S(`VIEWING SLIDE ${w+1}`))}function Ue(){H.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",s=>{const n=e.getBoundingClientRect(),r=s.clientX-n.left,i=s.clientY-n.top,u=n.width,g=n.height,y=(r/u-.5)*20,d=-(i/g-.5)*20;e.style.transform=`rotateX(${d}deg) rotateY(${y}deg) scale(1.03)`}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),e.addEventListener("mouseenter",()=>{o.playHover()}),e.addEventListener("click",()=>{o.playClick()})})}function Ge(t){const e=T.selectionStart,s=T.value;let n="";switch(t){case"slide":n=`
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
`;break}const r=s.substring(0,e),i=s.substring(e);T.value=r+n+i,T.focus();const u=e+n.length;T.setSelectionRange(u,u),o.playClick(),R(),ge()}let ce="SYSTEM READY",G=null;function ge(){S("SAVING..."),ae&&clearTimeout(ae),ae=setTimeout(()=>{Oe(T.value),S("DRAFT AUTO-SAVED","notify")},1e3)}function S(t,e=null){e==="notify"||e==="error"?(G&&clearTimeout(G),q.textContent=`▶ ${t}`,q.className=e==="error"?"status-error":"status-notify",G=setTimeout(()=>{q.className="",q.textContent=ce,G=null},3e3)):(ce=t,G||(q.className="",q.textContent=ce))}document.addEventListener("keydown",t=>{document.activeElement!==T&&(M||(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),w<P.length-1?Q(w+1):o.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),w>0?Q(w-1):o.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),we()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&Ce()))});function we(){o.playClick(),document.body.classList.contains("presentation-fullscreen")?Ce():(document.body.classList.add("presentation-fullscreen"),S("FULLSCREEN PRESENTER MODE ACTIVE"))}function Ce(){document.body.classList.remove("presentation-fullscreen"),S("SYSTEM READY")}V.addEventListener("change",t=>{const e=t.target.value;document.documentElement.setAttribute("data-theme",e),o.playClick(),R()});V.addEventListener("mouseenter",()=>o.playHover());W.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),W.classList.toggle("active",B),N(Z,B),B&&(M=!1,document.body.classList.remove("markdown-solo"),Y.classList.remove("active"),N(J,!1)),me(),o.playClick(),setTimeout(()=>{R(),S(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});W.addEventListener("mouseenter",()=>o.playHover());Y.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),Y.classList.toggle("active",M),N(J,M),M&&(B=!1,document.body.classList.remove("live-solo"),W.classList.remove("active"),N(Z,!1)),me(),o.playClick(),setTimeout(()=>{R(),S(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});Y.addEventListener("mouseenter",()=>o.playHover());X.addEventListener("click",()=>{const e=!(document.documentElement.getAttribute("data-crt")==="true");document.documentElement.setAttribute("data-crt",e?"true":"false"),X.classList.toggle("active",e),N(de,e),o.playClick()});X.addEventListener("mouseenter",()=>o.playHover());_.addEventListener("click",()=>{const e=!(document.documentElement.getAttribute("data-audio")==="true");document.documentElement.setAttribute("data-audio",e?"true":"false"),_.classList.toggle("active",e),N(ue,e),o.setEnabled(e),o.playClick()});_.addEventListener("mouseenter",()=>o.playHover());ye.addEventListener("click",()=>{w>0&&Q(w-1)});ye.addEventListener("mouseenter",()=>o.playHover());Ee.addEventListener("click",()=>{w<P.length-1&&Q(w+1)});Ee.addEventListener("mouseenter",()=>o.playHover());be.addEventListener("click",we);be.addEventListener("mouseenter",()=>o.playHover());oe&&O&&(oe.addEventListener("click",e=>{e.stopPropagation();const s=O.classList.contains("open");O.classList.toggle("open",!s),o.playClick()}),oe.addEventListener("mouseenter",()=>o.playHover()),O.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("mouseenter",()=>o.playHover()),e.addEventListener("click",s=>{s.stopPropagation();const n=e.getAttribute("data-value");if(O.classList.remove("open"),n==="pdf")o.playClick(),window.print();else if(n==="html")Qe();else if(n==="markdown"){const r=T.value,i=new Blob([r],{type:"text/markdown"}),u=URL.createObjectURL(i),g=document.createElement("a");g.href=u,g.download="game_design_document.md",document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(u),o.playSuccess(),S("GDD MARKDOWN FILE DOWNLOADED","notify")}})}),document.addEventListener("click",e=>{O.contains(e.target)||O.classList.remove("open")}));re.addEventListener("change",t=>{const e=t.target.value;if(e){if(e==="copy")navigator.clipboard.writeText(T.value).then(()=>{o.playSuccess(),S("GDD SOURCE COPIED TO CLIPBOARD","notify")}).catch(s=>{console.error("Could not copy text: ",s)});else if(e==="download"){const s=T.value,n=new Blob([s],{type:"text/markdown"}),r=URL.createObjectURL(n),i=document.createElement("a");i.href=r,i.download="game_design_document.md",document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r),o.playSuccess(),S("GDD MARKDOWN FILE DOWNLOADED","notify")}else e==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(T.value=ie,w=0,o.playSuccess(),R(),ge());re.value=""}});re.addEventListener("mouseenter",()=>o.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-inject");Ge(e)}),t.addEventListener("mouseenter",()=>o.playHover())});T.addEventListener("input",()=>{R(),ge()});Le.addEventListener("click",()=>{o.init(),qe.classList.add("hidden")});Le.addEventListener("mouseenter",()=>{});const ve=document.getElementById("btn-audio-deck"),Se=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const je=document.getElementById("param-hover-freq"),Ve=document.getElementById("param-hover-decay"),We=document.getElementById("param-hover-wave"),Ye=document.getElementById("btn-test-hover"),ze=document.getElementById("param-click-freq"),Xe=document.getElementById("param-click-decay"),_e=document.getElementById("param-click-wave"),Ke=document.getElementById("btn-test-click");ve.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),o.playClick()});ve.addEventListener("mouseenter",()=>o.playHover());Se.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),o.playClick()});Se.addEventListener("mouseenter",()=>o.playHover());je.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-freq").textContent=`${e} Hz`,o.config.hover.freq=parseInt(e,10)});Ve.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-decay").textContent=`${e}s`,o.config.hover.decay=parseFloat(e)});We.addEventListener("change",t=>{o.config.hover.type=t.target.value});Ye.addEventListener("click",()=>o.playHover());ze.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-freq").textContent=`${e} Hz`,o.config.click.freq=parseInt(e,10)});Xe.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-decay").textContent=`${e}s`,o.config.click.decay=parseFloat(e)});_e.addEventListener("change",t=>{o.config.click.type=t.target.value});Ke.addEventListener("click",()=>o.playClick());async function Qe(){S("BUNDLING OFFLINE GDD..."),o.playClick();try{let t="";const e=Array.from(document.styleSheets);for(const h of e)try{if(h.href){const a=await fetch(h.href);t+=await a.text()}else{const a=Array.from(h.cssRules);t+=a.map(f=>f.cssText).join(`
`)}}catch(a){console.warn("Could not read stylesheet:",a)}let s="";const n=Array.from(document.querySelectorAll("script"));let r="";for(const h of n){const a=h.getAttribute("src");if(a&&(a.includes("assets/index")||a.includes("src/main.js")||h.type==="module")){r=a;break}}r?s=await(await fetch(r)).text():s='console.error("Main script bundle not found during export.");';const i=T.value;let u="";try{u=await(await fetch("./index.html")).text()}catch{u=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const g=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,y=i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");u=u.replace(g,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${y}</textarea>`),u=u.replace(/<link rel="stylesheet" href="[^"]+">/g,""),u=u.replace(/<script type="module" src="[^"]+"><\/script>/g,""),u=u.replace("</head>",`<style>${t}</style></head>`),u=u.replace("</body>",`<script type="module">${s}<\/script></body>`);const d=new Blob([u],{type:"text/html"}),E=URL.createObjectURL(d),v=document.createElement("a");v.href=E,v.download="interactive_game_design_document.html",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(E),o.playSuccess(),S("OFFLINE GDD EXPORTED SUCCESS","notify")}catch(t){console.error("Error during HTML export:",t),S("EXPORT ERROR: BUNDLING FAILED","error")}}function N(t,e){t&&(t.classList.toggle("active",e),t.textContent=e?"ON":"OFF")}K.addEventListener("click",()=>{const t=document.body.classList.contains("settings-open");document.body.classList.remove("drawer-open"),document.body.classList.toggle("settings-open",!t),o.playClick()});K.addEventListener("mouseenter",()=>o.playHover());xe.addEventListener("click",()=>{document.body.classList.remove("settings-open"),o.playClick()});xe.addEventListener("mouseenter",()=>o.playHover());document.addEventListener("click",t=>{document.body.classList.contains("settings-open")&&!Fe.contains(t.target)&&t.target!==K&&!K.contains(t.target)&&document.body.classList.remove("settings-open")});ke.addEventListener("change",t=>{const e=t.target.value;document.documentElement.setAttribute("data-theme",e),V.value=e,o.playClick(),R()});V.addEventListener("change",()=>{ke.value=V.value});de.addEventListener("click",()=>{X.click()});de.addEventListener("mouseenter",()=>o.playHover());ue.addEventListener("click",()=>{_.click()});ue.addEventListener("mouseenter",()=>o.playHover());Z.addEventListener("click",()=>{W.click()});Z.addEventListener("mouseenter",()=>o.playHover());J.addEventListener("click",()=>{Y.click()});J.addEventListener("mouseenter",()=>o.playHover());le.addEventListener("click",()=>{const t=document.body.classList.toggle("header-controls-hidden");N(le,!t),o.playClick()});le.addEventListener("mouseenter",()=>o.playHover());pe.addEventListener("change",t=>{j=t.target.value,localStorage.setItem("playable_gdd_glitch_setting",j),o.playClick()});pe.addEventListener("mouseenter",()=>o.playHover());ve.addEventListener("click",()=>{document.body.classList.remove("settings-open")},!0);function Ze(){const t=He();T.value=t,pe.value=j,R(),S("SYSTEM READY")}Ze();
