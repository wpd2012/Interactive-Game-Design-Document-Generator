(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=s(i);fetch(i.href,c)}})();function pe(e){return e?e.split(/\n\s*---\s*\n/).map(s=>{let a="";const i=s.split(`
`);let c=!1,d="",h=[];const y=()=>{c&&(a+=`<ul>${d}</ul>`,d="",c=!1)},l=()=>{h.length>0&&(a+='<div class="slide-grid">',h.forEach(E=>{a+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),a+="</div>",h=[])};for(let E=0;E<i.length;E++){let v=i[E].trim();if(!v){y(),l();continue}const g=v.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(g){y(),h.push({title:g[1].trim(),desc:g[2].trim()});continue}l();const n=v.match(/^\[loop:\s*([^\]]+)\]/);if(n){y();const m=n[1].split("->").map(b=>b.trim());a+=`<div class="loop-diagram-container" data-nodes="${m.join(",")}"></div>`;continue}const f=v.match(/^\[pacing:\s*([^\]]+)\]/);if(f){y();const m=f[1].split(",").map(b=>b.trim());a+=`<div class="pacing-container" data-points="${m.join(",")}"></div>`;continue}const o=v.match(/^\[sandbox:\s*([^\s|]+)\s*\|\s*([^\]]+)\]/);if(o){y();const m=o[1].trim(),b=o[2].trim();a+=`<div class="sandbox-container" data-type="${m}" data-config="${b}"></div>`;continue}const r=v.match(/^\[roadmap:\s*([^\]]+)\]/);if(r){y();const m=r[1].split("->").map(b=>b.trim());a+=`<div class="roadmap-container" data-points="${m.join("|")}"></div>`;continue}const p=v.match(/^\[state:\s*([^\]]+)\]/);if(p){y();const m=p[1].split("->").map($=>$.trim()),b=[],x=[];m.forEach($=>{const T=$.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);T?(b.push(T[1].trim()),x.push(T[2]?T[2].trim():"System monitoring triggers.")):(b.push($),x.push("System monitoring triggers."))}),a+=`<div class="state-machine-container" data-states="${b.join(",")}" data-descriptions="${x.join("|")}"></div>`;continue}if(v.startsWith("# ")){y();const m=v.substring(2).trim();a+=`<h1>${F(m)}</h1>`;continue}if(v.startsWith("## ")){y();const m=v.substring(3).trim();a+=`<h2>${F(m)}</h2>`;continue}if(v.startsWith("* ")||v.startsWith("- ")){c=!0;const m=v.substring(2).trim();d+=`<li>${F(m)}</li>`;continue}y(),a+=`<p>${F(v)}</p>`}return y(),l(),`<div class="slide-content">${a}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function F(e){return e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class me{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(t){console.error("Web Audio API is not supported in this browser.",t)}}setEnabled(t){this.isEnabled=t,this.ctx&&!t?this.ctx.suspend():this.ctx&&t&&this.ctx.resume()}createDecayGain(t,s){const a=this.ctx.createGain();return a.gain.setValueAtTime(t,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+s),a}playHover(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.createOscillator(),s=this.createDecayGain(.04,this.config.hover.decay);t.type=this.config.hover.type,t.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),t.connect(s),s.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.createOscillator(),s=this.createDecayGain(.08,this.config.click.decay);t.type=this.config.click.type,t.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const a=this.ctx.createOscillator(),i=this.createDecayGain(.05,.015);a.type="square",a.frequency.setValueAtTime(1200,this.ctx.currentTime),t.connect(s),s.connect(this.ctx.destination),a.connect(i),i.connect(this.ctx.destination),t.start(),a.start(),t.stop(this.ctx.currentTime+this.config.click.decay),a.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.sampleRate*.25,s=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=s.getChannelData(0);for(let h=0;h<t;h++)a[h]=Math.random()*2-1;const i=this.ctx.createBufferSource();i.buffer=s;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(1500,this.ctx.currentTime),c.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const d=this.createDecayGain(.07,.25);i.connect(c),c.connect(d),d.connect(this.ctx.destination),i.start(),i.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.currentTime,s=[261.63,329.63,392,523.25],a=.08;s.forEach((i,c)=>{const d=this.ctx.createOscillator(),h=this.ctx.createGain();d.type="square",d.frequency.setValueAtTime(i,t+c*a),h.gain.setValueAtTime(.05,t+c*a),h.gain.exponentialRampToValueAtTime(1e-4,t+(c+1)*a+.05),d.connect(h),h.connect(this.ctx.destination),d.start(t+c*a),d.stop(t+(c+2)*a)})}}const u=new me;function he(e){e.querySelectorAll(".loop-diagram-container").forEach(s=>{const a=s.getAttribute("data-nodes");if(!a)return;const i=a.split(",").map(r=>r.trim()),c=i.length,d=520,h=380,y=d/2,l=h/2,E=120,v=[];for(let r=0;r<c;r++){const p=(r*(360/c)-90)*(Math.PI/180),m=y+E*Math.cos(p),b=l+E*Math.sin(p);v.push({x:m,y:b,angle:p})}let g=`<svg class="loop-arrows-svg" viewBox="0 0 ${d} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="loop-arrow-${s.id||Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="loop-arrow-active-${s.id||Math.random().toString(36).slice(2)}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;const n=s.id||Math.random().toString(36).slice(2);g=`<svg class="loop-arrows-svg" viewBox="0 0 ${d} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="la-${n}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead" />
        </marker>
        <marker id="la-act-${n}" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" class="loop-arrowhead-active" />
        </marker>
      </defs>`;for(let r=0;r<c;r++){const p=v[r].angle+.4,m=v[(r+1)%c].angle-.4,b=y+E*Math.cos(p),x=l+E*Math.sin(p),$=y+E*Math.cos(m),T=l+E*Math.sin(m);g+=`<path class="loop-arc" data-arc-index="${r}"
        d="M ${b} ${x} A ${E} ${E} 0 0 1 ${$} ${T}"
        marker-end="url(#la-${n})" />`}g+="</svg>";let f="";v.forEach((r,p)=>{const m=i[p],b=r.x/d*100,x=r.y/h*100;f+=`
        <button class="loop-node-btn" data-index="${p}"
                style="left: ${b}%; top: ${x}%;">
          <span class="loop-node-label">${m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</span>
        </button>`});const o=`<div class="loop-center-label">
      <span class="loop-center-icon">⟳</span>
      <span class="loop-center-text">LOOP</span>
    </div>`;s.innerHTML=`
      <div class="loop-stage" style="--loop-w: ${d}px; --loop-h: ${h}px;">
        <div class="loop-arrows-layer">${g}</div>
        <div class="loop-nodes-layer">${f}</div>
        ${o}
      </div>`,s.querySelectorAll(".loop-node-btn").forEach(r=>{r.addEventListener("mouseenter",()=>{u.playHover(),r.classList.add("is-active");const p=parseInt(r.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.add("is-active"),m[p].setAttribute("marker-end",`url(#la-act-${n})`))}),r.addEventListener("mouseleave",()=>{r.classList.remove("is-active");const p=parseInt(r.getAttribute("data-index"),10),m=s.querySelectorAll(".loop-arc");m[p]&&(m[p].classList.remove("is-active"),m[p].setAttribute("marker-end",`url(#la-${n})`))}),r.addEventListener("click",()=>{u.playClick()})})})}function ve(e){e.querySelectorAll(".pacing-container").forEach(s=>{const a=s.getAttribute("data-points");if(!a)return;let i=a.split(",").map(o=>{const r=parseInt(o.trim(),10);return isNaN(r)?50:Math.max(0,Math.min(100,r))});const c=i.length;let d=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const h=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];i.forEach((o,r)=>{const p=h[r]||`P${r+1}`;d+=`
        <div class="pacing-slider-group">
          <label>${p}: ${o}%</label>
          <input type="range" class="pacing-slider" data-index="${r}" min="0" max="100" value="${o}">
        </div>
      `}),d+="</div>",d+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,s.innerHTML=d;const y=s.querySelector(".pacing-canvas"),l=y.getContext("2d"),E=s.querySelectorAll(".pacing-slider"),v=s.querySelectorAll(".btn-preset"),g=()=>{const o=y.clientWidth,r=y.clientHeight;if(o===0||r===0)return;(y.width!==o||y.height!==r)&&(y.width=o,y.height=r);const p=y.width,m=y.height;l.clearRect(0,0,p,m);const b=getComputedStyle(document.documentElement),x=b.getPropertyValue("--text-accent").trim()||"#00ffff",$=b.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",T=b.getPropertyValue("--border-color").trim()||"#1f1f45";l.strokeStyle=T,l.lineWidth=1,l.setLineDash([4,4]);for(let L of[.25,.5,.75]){const k=m*L;l.beginPath(),l.moveTo(0,k),l.lineTo(p,k),l.stroke()}l.setLineDash([]);const D=40,N=p-D*2,S=i.map((L,k)=>{const I=D+k/(c-1)*N,q=m-20-L/100*(m-40);return{x:I,y:q}}),V=l.createLinearGradient(0,0,0,m);V.addColorStop(0,x+"22"),V.addColorStop(1,"transparent"),l.fillStyle=V,l.beginPath(),l.moveTo(S[0].x,m),l.lineTo(S[0].x,S[0].y);for(let L=0;L<S.length-1;L++){const k=S[L],I=S[L+1],q=k.x+(I.x-k.x)/2,W=k.y,Y=k.x+(I.x-k.x)/2,z=I.y;l.bezierCurveTo(q,W,Y,z,I.x,I.y)}l.lineTo(S[S.length-1].x,m),l.closePath(),l.fill(),l.strokeStyle=x,l.lineWidth=3,l.shadowBlur=10,l.shadowColor=x,l.beginPath(),l.moveTo(S[0].x,S[0].y);for(let L=0;L<S.length-1;L++){const k=S[L],I=S[L+1],q=k.x+(I.x-k.x)/2,W=k.y,Y=k.x+(I.x-k.x)/2,z=I.y;l.bezierCurveTo(q,W,Y,z,I.x,I.y)}l.stroke(),l.shadowBlur=0,S.forEach((L,k)=>{l.fillStyle=$,l.strokeStyle="#ffffff",l.lineWidth=2,l.beginPath(),l.arc(L.x,L.y,6,0,Math.PI*2),l.fill(),l.stroke(),l.fillStyle="var(--text-main)",l.font="9px monospace",l.textAlign="center",l.fillText(`${i[k]}%`,L.x,L.y-12)})};g(),new ResizeObserver(()=>{g()}).observe(y);const f=o=>{const r=[...i];let p=0;const m=18,b=()=>{p++;const x=p/m,$=x*(2-x);i=r.map((T,D)=>{const N=o[D]!==void 0?o[D]:50;return Math.round(T+(N-T)*$)}),E.forEach((T,D)=>{T.value=i[D];const N=T.parentElement.querySelector("label"),S=h[D]||`P${D+1}`;N.textContent=`${S}: ${i[D]}%`}),s.setAttribute("data-points",i.join(",")),g(),p<m&&requestAnimationFrame(b)};requestAnimationFrame(b)};E.forEach(o=>{o.addEventListener("input",r=>{const p=parseInt(o.getAttribute("data-index"),10),m=parseInt(r.target.value,10);i[p]=m;const b=o.parentElement.querySelector("label"),x=h[p]||`P${p+1}`;b.textContent=`${x}: ${m}%`,s.setAttribute("data-points",i.join(",")),g()}),o.addEventListener("mousedown",()=>{u.playClick()}),o.addEventListener("mouseenter",()=>{u.playHover()})}),v.forEach(o=>{o.addEventListener("click",()=>{const r=o.getAttribute("data-preset");let p=[];switch(r){case"boss":p=[10,20,30,95,20];break;case"stealth":p=[75,80,25,15,10];break;case"slow":p=[10,30,50,70,90];break;case"flat":p=[40,40,40,40,40];break}u.playSuccess(),f(p)}),o.addEventListener("mouseenter",()=>{u.playHover()})})})}function ge(e){e.querySelectorAll(".state-machine-container").forEach(s=>{const a=s.getAttribute("data-states"),i=s.getAttribute("data-descriptions");if(!a)return;const c=a.split(","),d=i?i.split("|"):[];let h=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;c.forEach((g,n)=>{const f=n===0?"active":"",o=d[n]||"System monitoring triggers.";h+=`
        <div class="state-node-wrapper">
          <div class="state-node ${f}" data-index="${n}" data-desc="${o}">
            <div class="state-indicator"></div>
            <span class="state-name">${g}</span>
          </div>
      `,n<c.length-1&&(h+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),h+="</div>"});const y=d[0]||"System monitoring triggers.";h+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${c[0]}</strong></span>
        <p id="active-state-desc">${y}</p>
      </div>
    `,s.innerHTML=h;const l=s.querySelectorAll(".state-node"),E=s.querySelector("#active-state-title"),v=s.querySelector("#active-state-desc");l.forEach(g=>{g.addEventListener("click",()=>{if(g.classList.contains("active"))return;l.forEach(p=>p.classList.remove("active")),g.classList.add("active");const n=g.getAttribute("data-index"),f=c[n],o=g.getAttribute("data-desc");E.textContent=f,v.textContent=o,s.querySelectorAll(".connector-arrow path").forEach((p,m)=>{m==n-1&&(p.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{p.style.stroke=""},600))}),u.playSuccess()}),g.addEventListener("mouseenter",()=>{u.playHover()})})})}function fe(e){e.querySelectorAll(".sandbox-container").forEach(s=>{const a=s.getAttribute("data-type"),i=s.getAttribute("data-config");i&&(a==="formula"?ye(s,i):a==="loot"&&Ee(s,i))})}function ye(e,t){const s=t.split("|").map(n=>n.trim()),i=s[0].split("=").map(n=>n.trim()),c=i[0]||"Result",d=i[1]||"",h={};for(let n=1;n<s.length;n++)s[n].split(",").map(o=>o.trim()).forEach(o=>{const r=o.split(":").map(p=>p.trim());r.length===2&&(h[r[0]]=parseFloat(r[1])||0)});let y=`
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
  `;const l={...h};Object.keys(l).forEach(n=>{const f=l[n],o=f>0?Math.ceil(f*3):100;y+=`
      <div class="sandbox-slider-group">
        <div class="sandbox-slider-labels">
          <span class="var-name">${n}</span>
          <span class="var-val" id="val-display-${n}">${f}</span>
        </div>
        <input type="range" class="sandbox-slider" data-var="${n}" min="0" max="${o}" value="${f}" step="1">
      </div>
    `}),y+=`
      </div>
    </div>
  `,e.innerHTML=y;const E=e.querySelector("#formula-result-val"),v=e.querySelectorAll(".sandbox-slider"),g=()=>{let n=d;const f=Object.keys(l).sort((o,r)=>r.length-o.length);for(const o of f){const r=new RegExp("\\b"+o+"\\b","g");n=n.replace(r,l[o])}if(/^[0-9+\-*/().\s]+$/.test(n))try{const o=Function(`"use strict"; return (${n})`)();typeof o=="number"&&!isNaN(o)&&isFinite(o)?E.textContent=o%1===0?o:o.toFixed(2):E.textContent="NaN"}catch{E.textContent="Error"}else E.textContent="Invalid"};v.forEach(n=>{n.addEventListener("input",f=>{const o=n.getAttribute("data-var"),r=parseFloat(f.target.value)||0;l[o]=r,e.querySelector(`#val-display-${o}`).textContent=r,g()}),n.addEventListener("mouseenter",()=>u.playHover()),n.addEventListener("mousedown",()=>u.playClick())}),g()}function Ee(e,t){const s=[];let a=0;t.split(",").map(v=>v.trim()).forEach(v=>{const g=v.split(":").map(n=>n.trim());if(g.length===2){const n=g[0],f=parseFloat(g[1])||0;s.push({name:n,weight:f}),a+=f}});let c=`
    <div class="sandbox-card loot-sandbox">
      <div class="sandbox-header">
        <span class="hud-label title">📦 LOOT TABLE DROP CHANCE</span>
        <span class="hud-label status">PROBABILITY SIMULATOR</span>
      </div>

      <div class="loot-bar-distribution">
  `;const d={common:"var(--text-muted, #858585)",rare:"var(--text-accent-secondary, #00ffff)",epic:"#a335ee",legendary:"#ff8000",exotic:"#ff007f"};s.forEach(v=>{const g=(v.weight/a*100).toFixed(1),n=v.name.toLowerCase(),f=d[n]||"var(--text-accent)";c+=`
      <div class="loot-bar-segment" style="width: ${g}%; background: ${f};" title="${v.name}: ${g}%"></div>
    `}),c+=`
      </div>

      <div class="loot-stats-grid">
  `,s.forEach(v=>{const g=(v.weight/a*100).toFixed(1),n=v.name.toLowerCase(),f=d[n]||"var(--text-accent)";c+=`
      <div class="loot-stat-row">
        <span class="loot-rarity" style="color: ${f};">• ${v.name.toUpperCase()}</span>
        <span class="loot-pct">${g}%</span>
        <span class="loot-rolled-count" id="count-${n}">0 rolled</span>
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
  `,e.innerHTML=c;const h=e.querySelector(".btn-roll-loot"),y=e.querySelector("#loot-console"),l={};s.forEach(v=>{l[v.name.toLowerCase()]=0});let E=0;h.addEventListener("click",()=>{E++;const v=Math.random()*a;let g=0,n=s[0];for(let p=0;p<s.length;p++)if(g+=s[p].weight,v<=g){n=s[p];break}const f=n.name.toLowerCase();l[f]++,s.forEach(p=>{const m=p.name.toLowerCase(),b=l[m],x=(b/E*100).toFixed(0);e.querySelector(`#count-${m}`).textContent=`${b} (${x}%)`}),f==="legendary"||f==="exotic"?u.playSuccess():u.playClick();const o=d[f]||"var(--text-accent)",r=document.createElement("div");r.className="log-line",r.innerHTML=`> Roll #${E}: Dropped <strong style="color: ${o}; text-shadow: 0 0 4px ${o}55;">[${n.name.toUpperCase()}]</strong>`,y.appendChild(r),y.scrollTop=y.scrollHeight,(f==="legendary"||f==="exotic")&&(h.classList.add("btn-pulse-glow"),setTimeout(()=>h.classList.remove("btn-pulse-glow"),500))}),h.addEventListener("mouseenter",()=>u.playHover())}function be(e){e.querySelectorAll(".roadmap-container").forEach(s=>{const a=s.getAttribute("data-points");if(!a)return;const c=a.split("|").map(n=>n.trim()).map((n,f)=>{const o=n.match(/^([^(]+)\s*(?:\(([^)]+)\))?/),r=o?o[1].trim():n,m=(o&&o[2]?o[2].trim():"").split(","),b=m.length>1?m[m.length-1].trim():"TBD",x=m.length>0?m[0].trim():"Objective pending";return{id:f+1,name:r,date:b,objective:x}});let d=`
      <div class="roadmap-card">
        <div class="roadmap-header">
          <span class="hud-label title">📅 PRODUCTION TIMELINE & ROADMAP</span>
          <span class="hud-label status" id="roadmap-active-badge">PHASE 1</span>
        </div>

        <div class="roadmap-timeline-track">
          <div class="timeline-line"></div>
    `;c.forEach((n,f)=>{d+=`
        <div class="roadmap-node ${f===0?"active":""}" data-index="${f}" title="Click to inspect: ${n.name}">
          <div class="node-ring"></div>
          <div class="node-dot"></div>
          <span class="node-label">${n.name}</span>
          <span class="node-date">${n.date}</span>
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
    `,s.innerHTML=d;const h=s.querySelectorAll(".roadmap-node"),y=s.querySelector("#roadmap-active-badge"),l=s.querySelector("#roadmap-active-title"),E=s.querySelector("#roadmap-active-date"),v=s.querySelector("#roadmap-active-objective"),g=s.querySelector("#roadmap-active-checklist");h.forEach(n=>{n.addEventListener("click",()=>{const f=parseInt(n.getAttribute("data-index"),10),o=c[f];h.forEach(p=>p.classList.remove("active")),n.classList.add("active"),u.playSuccess(),y.textContent=`PHASE ${o.id}`,l.textContent=o.name,E.textContent=o.date,v.textContent=o.objective;let r=`
          <li><span class="check-box checked">✔</span> Objective alignment and scope sign-off</li>
        `;o.id>1?r+='<li><span class="check-box checked">✔</span> Refine logic loop mechanics</li>':r+='<li><span class="check-box">☐</span> Prototype core logic loop testing</li>',o.id===c.length?r+=`
            <li><span class="check-box checked">✔</span> Release candidate build validation</li>
            <li><span class="check-box checked">✔</span> Public open source launch</li>
          `:o.id>=3?r+=`
            <li><span class="check-box checked">✔</span> Alpha features validation</li>
            <li><span class="check-box">☐</span> Pre-launch optimization checks</li>
          `:r+=`
            <li><span class="check-box">☐</span> Core interface refinement</li>
            <li><span class="check-box">☐</span> Document packaging and review</li>
          `,g.innerHTML=r}),n.addEventListener("mouseenter",()=>u.playHover())})})}const te="playable_gdd_draft",K=`# CYBER-PULSE: NEON RUNNER
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
`;function xe(e){try{return localStorage.setItem(te,e),!0}catch(t){return console.error("Failed to save draft to LocalStorage",t),!1}}function Le(){try{const e=localStorage.getItem(te);return e!==null?e:K}catch(e){return console.error("Failed to load draft from LocalStorage",e),K}}let w=0,R=[],X=null,B=!1,M=!1;const A=document.getElementById("markdown-input"),H=document.getElementById("slide-container"),se=document.getElementById("current-slide-num"),ke=document.getElementById("total-slides-num"),ae=document.getElementById("prev-slide-btn"),ne=document.getElementById("next-slide-btn"),we=document.getElementById("status-message"),oe=document.getElementById("theme-select"),Q=document.getElementById("toggle-crt"),Z=document.getElementById("toggle-audio"),U=document.getElementById("toggle-editor"),j=document.getElementById("toggle-doc"),ce=document.getElementById("btn-fullscreen"),_=document.getElementById("btn-export-trigger"),O=document.getElementById("export-dropdown-container"),J=document.getElementById("editor-actions-select"),Se=document.getElementById("audio-modal"),ie=document.getElementById("btn-enable-audio");function P(){const e=A.value;R=pe(e),ke.textContent=R.length,w>=R.length&&(w=Math.max(0,R.length-1)),se.textContent=w+1,H.innerHTML=R[w]||"",he(H),ve(H),ge(H),fe(H),be(H),Ce()}function G(e){e<0||e>=R.length||(w=e,se.textContent=w+1,u.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),P(),C(`VIEWING SLIDE ${w+1}`))}function Ce(){H.querySelectorAll(".tilt-card").forEach(t=>{t.addEventListener("mousemove",s=>{const a=t.getBoundingClientRect(),i=s.clientX-a.left,c=s.clientY-a.top,d=a.width,h=a.height,y=(i/d-.5)*20,l=-(c/h-.5)*20;t.style.transform=`rotateX(${l}deg) rotateY(${y}deg) scale(1.03)`}),t.addEventListener("mouseleave",()=>{t.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),t.addEventListener("mouseenter",()=>{u.playHover()}),t.addEventListener("click",()=>{u.playClick()})})}function Ae(e){const t=A.selectionStart,s=A.value;let a="";switch(e){case"slide":a=`
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
`;break}const i=s.substring(0,t),c=s.substring(t);A.value=i+a+c,A.focus();const d=t+a.length;A.setSelectionRange(d,d),u.playClick(),P(),ee()}function ee(){C("SAVING..."),X&&clearTimeout(X),X=setTimeout(()=>{xe(A.value),C("SYSTEM READY • AUTO-SAVED")},1e3)}function C(e){we.textContent=e}document.addEventListener("keydown",e=>{document.activeElement!==A&&(M||(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"?(e.preventDefault(),w<R.length-1?G(w+1):u.playClick()):e.key==="ArrowLeft"||e.key==="Backspace"||e.key==="PageUp"?(e.preventDefault(),w>0?G(w-1):u.playClick()):e.key.toLowerCase()==="f"?(e.preventDefault(),re()):e.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&le()))});function re(){u.playClick(),document.body.classList.contains("presentation-fullscreen")?le():(document.body.classList.add("presentation-fullscreen"),C("FULLSCREEN PRESENTER MODE ACTIVE"))}function le(){document.body.classList.remove("presentation-fullscreen"),C("SYSTEM READY")}oe.addEventListener("change",e=>{const t=e.target.value;document.documentElement.setAttribute("data-theme",t),u.playClick(),P()});oe.addEventListener("mouseenter",()=>u.playHover());U.addEventListener("click",()=>{B=!B,document.body.classList.toggle("live-solo",B),U.classList.toggle("active",B),B&&(M=!1,document.body.classList.remove("markdown-solo"),j.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),u.playClick(),setTimeout(()=>{P(),C(B?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});U.addEventListener("mouseenter",()=>u.playHover());j.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),j.classList.toggle("active",M),M&&(B=!1,document.body.classList.remove("live-solo"),U.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),u.playClick(),setTimeout(()=>{P(),C(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${w+1}`)},320)});j.addEventListener("mouseenter",()=>u.playHover());Q.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",e?"false":"true"),Q.classList.toggle("active",!e),u.playClick()});Q.addEventListener("mouseenter",()=>u.playHover());Z.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",e?"false":"true"),Z.classList.toggle("active",!e),u.setEnabled(!e),u.playClick()});Z.addEventListener("mouseenter",()=>u.playHover());ae.addEventListener("click",()=>{w>0&&G(w-1)});ae.addEventListener("mouseenter",()=>u.playHover());ne.addEventListener("click",()=>{w<R.length-1&&G(w+1)});ne.addEventListener("mouseenter",()=>u.playHover());ce.addEventListener("click",re);ce.addEventListener("mouseenter",()=>u.playHover());_&&O&&(_.addEventListener("click",t=>{t.stopPropagation();const s=O.classList.contains("open");O.classList.toggle("open",!s),u.playClick()}),_.addEventListener("mouseenter",()=>u.playHover()),O.querySelectorAll(".dropdown-item").forEach(t=>{t.addEventListener("mouseenter",()=>u.playHover()),t.addEventListener("click",s=>{s.stopPropagation();const a=t.getAttribute("data-value");if(O.classList.remove("open"),a==="pdf")u.playClick(),window.print();else if(a==="html")Be();else if(a==="markdown"){const i=A.value,c=new Blob([i],{type:"text/markdown"}),d=URL.createObjectURL(c),h=document.createElement("a");h.href=d,h.download="game_design_document.md",document.body.appendChild(h),h.click(),document.body.removeChild(h),URL.revokeObjectURL(d),u.playSuccess(),C("GDD MARKDOWN FILE DOWNLOADED")}})}),document.addEventListener("click",t=>{O.contains(t.target)||O.classList.remove("open")}));J.addEventListener("change",e=>{const t=e.target.value;if(t){if(t==="copy")navigator.clipboard.writeText(A.value).then(()=>{u.playSuccess(),C("GDD SOURCE COPIED TO CLIPBOARD")}).catch(s=>{console.error("Could not copy text: ",s)});else if(t==="download"){const s=A.value,a=new Blob([s],{type:"text/markdown"}),i=URL.createObjectURL(a),c=document.createElement("a");c.href=i,c.download="game_design_document.md",document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(i),u.playSuccess(),C("GDD MARKDOWN FILE DOWNLOADED")}else t==="template"&&confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(A.value=K,w=0,u.playSuccess(),P(),ee());J.value=""}});J.addEventListener("mouseenter",()=>u.playHover());document.querySelectorAll("[data-inject]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-inject");Ae(t)}),e.addEventListener("mouseenter",()=>u.playHover())});A.addEventListener("input",()=>{P(),ee()});ie.addEventListener("click",()=>{u.init(),Se.classList.add("hidden")});ie.addEventListener("mouseenter",()=>{});const de=document.getElementById("btn-audio-deck"),ue=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Te=document.getElementById("param-hover-freq"),Ie=document.getElementById("param-hover-decay"),$e=document.getElementById("param-hover-wave"),De=document.getElementById("btn-test-hover"),Me=document.getElementById("param-click-freq"),Re=document.getElementById("param-click-decay"),Pe=document.getElementById("param-click-wave"),Oe=document.getElementById("btn-test-click");de.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),u.playClick()});de.addEventListener("mouseenter",()=>u.playHover());ue.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),u.playClick()});ue.addEventListener("mouseenter",()=>u.playHover());Te.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-hover-freq").textContent=`${t} Hz`,u.config.hover.freq=parseInt(t,10)});Ie.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-hover-decay").textContent=`${t}s`,u.config.hover.decay=parseFloat(t)});$e.addEventListener("change",e=>{u.config.hover.type=e.target.value});De.addEventListener("click",()=>u.playHover());Me.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-click-freq").textContent=`${t} Hz`,u.config.click.freq=parseInt(t,10)});Re.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-click-decay").textContent=`${t}s`,u.config.click.decay=parseFloat(t)});Pe.addEventListener("change",e=>{u.config.click.type=e.target.value});Oe.addEventListener("click",()=>u.playClick());async function Be(){C("BUNDLING OFFLINE GDD..."),u.playClick();try{let e="";const t=Array.from(document.styleSheets);for(const g of t)try{if(g.href){const n=await fetch(g.href);e+=await n.text()}else{const n=Array.from(g.cssRules);e+=n.map(f=>f.cssText).join(`
`)}}catch(n){console.warn("Could not read stylesheet:",n)}let s="";const a=Array.from(document.querySelectorAll("script"));let i="";for(const g of a){const n=g.getAttribute("src");if(n&&(n.includes("assets/index")||n.includes("src/main.js")||g.type==="module")){i=n;break}}i?s=await(await fetch(i)).text():s='console.error("Main script bundle not found during export.");';const c=A.value;let d="";try{d=await(await fetch("./index.html")).text()}catch{d=`<!DOCTYPE html><html>${document.documentElement.innerHTML}</html>`}const h=/<textarea id="markdown-input"[^>]*>([\s\S]*?)<\/textarea>/,y=c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");d=d.replace(h,`<textarea id="markdown-input" spellcheck="false" placeholder="Write your pitch slides in markdown... Use '---' to separate slides.">${y}</textarea>`),d=d.replace(/<link rel="stylesheet" href="[^"]+">/g,""),d=d.replace(/<script type="module" src="[^"]+"><\/script>/g,""),d=d.replace("</head>",`<style>${e}</style></head>`),d=d.replace("</body>",`<script type="module">${s}<\/script></body>`);const l=new Blob([d],{type:"text/html"}),E=URL.createObjectURL(l),v=document.createElement("a");v.href=E,v.download="interactive_game_design_document.html",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(E),u.playSuccess(),C("OFFLINE GDD EXPORTED SUCCESS")}catch(e){console.error("Error during HTML export:",e),C("EXPORT ERROR: BUNDLING FAILED")}}function He(){const e=Le();A.value=e,P(),C("SYSTEM READY")}He();
