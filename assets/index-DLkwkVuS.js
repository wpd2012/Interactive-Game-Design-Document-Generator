(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function c(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=c(a);fetch(a.href,r)}})();function rt(t){return t?t.split(/\n\s*---\s*\n/).map(c=>{let n="";const a=c.split(`
`);let r=!1,u="",p=[];const f=()=>{r&&(n+=`<ul>${u}</ul>`,u="",r=!1)},s=()=>{p.length>0&&(n+='<div class="slide-grid">',p.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",p=[])};for(let E=0;E<a.length;E++){let g=a[E].trim();if(!g){f(),s();continue}const y=g.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(y){f(),p.push({title:y[1].trim(),desc:y[2].trim()});continue}s();const m=g.match(/^\[loop:\s*([^\]]+)\]/);if(m){f();const d=m[1].split("->").map(h=>h.trim());n+=`<div class="loop-diagram-container" data-nodes="${d.join(",")}"></div>`;continue}const i=g.match(/^\[pacing:\s*([^\]]+)\]/);if(i){f();const d=i[1].split(",").map(h=>h.trim());n+=`<div class="pacing-container" data-points="${d.join(",")}"></div>`;continue}const l=g.match(/^\[state:\s*([^\]]+)\]/);if(l){f();const d=l[1].split("->").map(T=>T.trim()),h=[],L=[];d.forEach(T=>{const S=T.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);S?(h.push(S[1].trim()),L.push(S[2]?S[2].trim():"System monitoring triggers.")):(h.push(T),L.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${h.join(",")}" data-descriptions="${L.join("|")}"></div>`;continue}if(g.startsWith("# ")){f();const d=g.substring(2).trim();n+=`<h1>${N(d)}</h1>`;continue}if(g.startsWith("## ")){f();const d=g.substring(3).trim();n+=`<h2>${N(d)}</h2>`;continue}if(g.startsWith("* ")||g.startsWith("- ")){r=!0;const d=g.substring(2).trim();u+=`<li>${N(d)}</li>`;continue}f(),n+=`<p>${N(g)}</p>`}return f(),s(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function N(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class lt{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(e){console.error("Web Audio API is not supported in this browser.",e)}}setEnabled(e){this.isEnabled=e,this.ctx&&!e?this.ctx.suspend():this.ctx&&e&&this.ctx.resume()}createDecayGain(e,c){const n=this.ctx.createGain();return n.gain.setValueAtTime(e,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+c),n}playHover(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),c=this.createDecayGain(.04,this.config.hover.decay);e.type=this.config.hover.type,e.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),e.connect(c),c.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),c=this.createDecayGain(.08,this.config.click.decay);e.type=this.config.click.type,e.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),a=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),e.connect(c),c.connect(this.ctx.destination),n.connect(a),a.connect(this.ctx.destination),e.start(),n.start(),e.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.sampleRate*.25,c=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=c.getChannelData(0);for(let p=0;p<e;p++)n[p]=Math.random()*2-1;const a=this.ctx.createBufferSource();a.buffer=c;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1500,this.ctx.currentTime),r.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);a.connect(r),r.connect(u),u.connect(this.ctx.destination),a.start(),a.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.currentTime,c=[261.63,329.63,392,523.25],n=.08;c.forEach((a,r)=>{const u=this.ctx.createOscillator(),p=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(a,e+r*n),p.gain.setValueAtTime(.05,e+r*n),p.gain.exponentialRampToValueAtTime(1e-4,e+(r+1)*n+.05),u.connect(p),p.connect(this.ctx.destination),u.start(e+r*n),u.stop(e+(r+2)*n)})}}const o=new lt;function dt(t){t.querySelectorAll(".loop-diagram-container").forEach(c=>{const n=c.getAttribute("data-nodes");if(!n)return;const a=n.split(","),r=a.length,u=350,p=350,f=u/2,s=p/2,E=100;let g=`
      <svg class="loop-diagram-svg" viewBox="0 0 ${u} ${p}" xmlns="http://www.w3.org/2000/svg">
        <!-- SVG Definitions for Markers (Arrowheads) -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-muted)" />
          </marker>
          <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--text-accent)" />
          </marker>
        </defs>
    `;const y=[];for(let m=0;m<r;m++){const i=(m*(360/r)-90)*(Math.PI/180),l=f+E*Math.cos(i),d=s+E*Math.sin(i);y.push({x:l,y:d,angle:i})}for(let m=0;m<r;m++){const i=y[m],l=y[(m+1)%r],d=i.angle+.35,h=l.angle-.35,L=f+E*Math.cos(d),T=s+E*Math.sin(d),S=f+E*Math.cos(h),C=s+E*Math.sin(h);g+=`
        <path class="loop-arrow-path" 
              d="M ${L} ${T} A ${E} ${E} 0 0 1 ${S} ${C}" 
              marker-end="url(#arrow)" />
      `}y.forEach((m,i)=>{const l=a[i],h=Math.max(80,l.length*8+15),L=30,T=m.x-h/2,S=m.y-L/2;g+=`
        <g class="loop-node" data-index="${i}">
          <rect class="loop-node-box" x="${T}" y="${S}" width="${h}" height="${L}" rx="6" ry="6" />
          <text class="loop-node-text" x="${m.x}" y="${m.y}">${l}</text>
        </g>
      `}),g+="</svg>",c.innerHTML=g,c.querySelectorAll(".loop-node").forEach(m=>{m.addEventListener("mouseenter",()=>{o.playHover();const i=parseInt(m.getAttribute("data-index"),10),l=c.querySelectorAll(".loop-arrow-path");l[i]&&(l[i].style.stroke="var(--text-accent)",l[i].setAttribute("marker-end","url(#arrow-active)"))}),m.addEventListener("mouseleave",()=>{const i=parseInt(m.getAttribute("data-index"),10),l=c.querySelectorAll(".loop-arrow-path");l[i]&&(l[i].style.stroke="",l[i].setAttribute("marker-end","url(#arrow)"))}),m.addEventListener("click",()=>{o.playClick()})})})}function ut(t){t.querySelectorAll(".pacing-container").forEach(c=>{const n=c.getAttribute("data-points");if(!n)return;let a=n.split(",").map(i=>{const l=parseInt(i.trim(),10);return isNaN(l)?50:Math.max(0,Math.min(100,l))});const r=a.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas" width="600" height="200"></canvas>
      <div class="pacing-controls">
    `;const p=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];a.forEach((i,l)=>{const d=p[l]||`P${l+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${d}: ${i}%</label>
          <input type="range" class="pacing-slider" data-index="${l}" min="0" max="100" value="${i}">
        </div>
      `}),u+="</div>",u+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,c.innerHTML=u;const f=c.querySelector(".pacing-canvas"),s=f.getContext("2d"),E=c.querySelectorAll(".pacing-slider"),g=c.querySelectorAll(".btn-preset"),y=()=>{const i=f.width,l=f.height;s.clearRect(0,0,i,l);const d=getComputedStyle(document.documentElement),h=d.getPropertyValue("--text-accent").trim()||"#00ffff",L=d.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",T=d.getPropertyValue("--border-color").trim()||"#1f1f45";s.strokeStyle=T,s.lineWidth=1,s.setLineDash([4,4]);for(let x of[.25,.5,.75]){const b=l*x;s.beginPath(),s.moveTo(0,b),s.lineTo(i,b),s.stroke()}s.setLineDash([]);const S=40,C=i-S*2,v=a.map((x,b)=>{const A=S+b/(r-1)*C,H=l-20-x/100*(l-40);return{x:A,y:H}}),D=s.createLinearGradient(0,0,0,l);D.addColorStop(0,h+"22"),D.addColorStop(1,"transparent"),s.fillStyle=D,s.beginPath(),s.moveTo(v[0].x,l),s.lineTo(v[0].x,v[0].y);for(let x=0;x<v.length-1;x++){const b=v[x],A=v[x+1],H=b.x+(A.x-b.x)/2,Y=b.y,F=b.x+(A.x-b.x)/2,W=A.y;s.bezierCurveTo(H,Y,F,W,A.x,A.y)}s.lineTo(v[v.length-1].x,l),s.closePath(),s.fill(),s.strokeStyle=h,s.lineWidth=3,s.shadowBlur=10,s.shadowColor=h,s.beginPath(),s.moveTo(v[0].x,v[0].y);for(let x=0;x<v.length-1;x++){const b=v[x],A=v[x+1],H=b.x+(A.x-b.x)/2,Y=b.y,F=b.x+(A.x-b.x)/2,W=A.y;s.bezierCurveTo(H,Y,F,W,A.x,A.y)}s.stroke(),s.shadowBlur=0,v.forEach((x,b)=>{s.fillStyle=L,s.strokeStyle="#ffffff",s.lineWidth=2,s.beginPath(),s.arc(x.x,x.y,6,0,Math.PI*2),s.fill(),s.stroke(),s.fillStyle="var(--text-main)",s.font="9px monospace",s.textAlign="center",s.fillText(`${a[b]}%`,x.x,x.y-12)})};y();const m=i=>{const l=[...a];let d=0;const h=18,L=()=>{d++;const T=d/h,S=T*(2-T);a=l.map((C,v)=>{const D=i[v]!==void 0?i[v]:50;return Math.round(C+(D-C)*S)}),E.forEach((C,v)=>{C.value=a[v];const D=C.parentElement.querySelector("label"),x=p[v]||`P${v+1}`;D.textContent=`${x}: ${a[v]}%`}),c.setAttribute("data-points",a.join(",")),y(),d<h&&requestAnimationFrame(L)};requestAnimationFrame(L)};E.forEach(i=>{i.addEventListener("input",l=>{const d=parseInt(i.getAttribute("data-index"),10),h=parseInt(l.target.value,10);a[d]=h;const L=i.parentElement.querySelector("label"),T=p[d]||`P${d+1}`;L.textContent=`${T}: ${h}%`,c.setAttribute("data-points",a.join(",")),y()}),i.addEventListener("mousedown",()=>{o.playClick()}),i.addEventListener("mouseenter",()=>{o.playHover()})}),g.forEach(i=>{i.addEventListener("click",()=>{const l=i.getAttribute("data-preset");let d=[];switch(l){case"boss":d=[10,20,30,95,20];break;case"stealth":d=[75,80,25,15,10];break;case"slow":d=[10,30,50,70,90];break;case"flat":d=[40,40,40,40,40];break}o.playSuccess(),m(d)}),i.addEventListener("mouseenter",()=>{o.playHover()})})})}function mt(t){t.querySelectorAll(".state-machine-container").forEach(c=>{const n=c.getAttribute("data-states"),a=c.getAttribute("data-descriptions");if(!n)return;const r=n.split(","),u=a?a.split("|"):[];let p=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;r.forEach((y,m)=>{const i=m===0?"active":"",l=u[m]||"System monitoring triggers.";p+=`
        <div class="state-node-wrapper">
          <div class="state-node ${i}" data-index="${m}" data-desc="${l}">
            <div class="state-indicator"></div>
            <span class="state-name">${y}</span>
          </div>
      `,m<r.length-1&&(p+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),p+="</div>"});const f=u[0]||"System monitoring triggers.";p+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${r[0]}</strong></span>
        <p id="active-state-desc">${f}</p>
      </div>
    `,c.innerHTML=p;const s=c.querySelectorAll(".state-node"),E=c.querySelector("#active-state-title"),g=c.querySelector("#active-state-desc");s.forEach(y=>{y.addEventListener("click",()=>{if(y.classList.contains("active"))return;s.forEach(h=>h.classList.remove("active")),y.classList.add("active");const m=y.getAttribute("data-index"),i=r[m],l=y.getAttribute("data-desc");E.textContent=i,g.textContent=l,c.querySelectorAll(".connector-arrow path").forEach((h,L)=>{L==m-1&&(h.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{h.style.stroke=""},600))}),o.playSuccess()}),y.addEventListener("mouseenter",()=>{o.playHover()})})})}const K="playable_gdd_draft",U=`# CYBER-PULSE: NEON RUNNER
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

# ROADMAP & METRICS
## Iteration Milestones
*   **Prototype V1** (Week 4): Physics blockout and movement mechanics validation.
*   **Alpha Build** (Week 8): Card systems and combat loop integration.
*   **Beta Demo** (Week 12): Full level pacing and polished audiovisual cue systems.

**Target platforms**: PC (Steam), Nintendo Switch.
`;function pt(t){try{return localStorage.setItem(K,t),!0}catch(e){return console.error("Failed to save draft to LocalStorage",e),!1}}function ht(){try{const t=localStorage.getItem(K);return t!==null?t:U}catch(t){return console.error("Failed to load draft from LocalStorage",t),U}}let k=0,B=[],G=null,P=!1,M=!1;const w=document.getElementById("markdown-input"),q=document.getElementById("slide-container"),Z=document.getElementById("current-slide-num"),gt=document.getElementById("total-slides-num"),J=document.getElementById("prev-slide-btn"),Q=document.getElementById("next-slide-btn"),vt=document.getElementById("status-message"),_=document.querySelectorAll("[data-set-theme]"),X=document.getElementById("toggle-crt"),z=document.getElementById("toggle-audio"),R=document.getElementById("toggle-editor"),V=document.getElementById("toggle-doc"),tt=document.getElementById("btn-fullscreen"),et=document.getElementById("btn-export"),nt=document.getElementById("btn-template"),ft=document.getElementById("audio-modal"),st=document.getElementById("btn-enable-audio");function $(){const t=w.value;B=rt(t),gt.textContent=B.length,k>=B.length&&(k=Math.max(0,B.length-1)),Z.textContent=k+1,q.innerHTML=B[k]||"",dt(q),ut(q),mt(q),yt()}function O(t){t<0||t>=B.length||(k=t,Z.textContent=k+1,o.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),$(),I(`VIEWING SLIDE ${k+1}`))}function yt(){q.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",c=>{const n=e.getBoundingClientRect(),a=c.clientX-n.left,r=c.clientY-n.top,u=n.width,p=n.height,f=(a/u-.5)*20,s=-(r/p-.5)*20;e.style.transform=`rotateX(${s}deg) rotateY(${f}deg) scale(1.03)`}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),e.addEventListener("mouseenter",()=>{o.playHover()}),e.addEventListener("click",()=>{o.playClick()})})}function Et(t){const e=w.selectionStart,c=w.value;let n="";switch(t){case"slide":n=`
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
`;break}const a=c.substring(0,e),r=c.substring(e);w.value=a+n+r,w.focus();const u=e+n.length;w.setSelectionRange(u,u),o.playClick(),$(),j()}function j(){I("SAVING..."),G&&clearTimeout(G),G=setTimeout(()=>{pt(w.value),I("SYSTEM READY • AUTO-SAVED")},1e3)}function I(t){vt.textContent=t}document.addEventListener("keydown",t=>{document.activeElement!==w&&(M||(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),k<B.length-1?O(k+1):o.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),k>0?O(k-1):o.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),at()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&ot()))});function at(){o.playClick(),document.body.classList.contains("presentation-fullscreen")?ot():(document.body.classList.add("presentation-fullscreen"),I("FULLSCREEN PRESENTER MODE ACTIVE"))}function ot(){document.body.classList.remove("presentation-fullscreen"),I("SYSTEM READY")}_.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-set-theme");document.documentElement.setAttribute("data-theme",e),_.forEach(c=>c.classList.remove("active")),t.classList.add("active"),o.playClick(),$()}),t.addEventListener("mouseenter",()=>o.playHover())});R.addEventListener("click",()=>{P=!P,document.body.classList.toggle("live-solo",P),R.classList.toggle("active",P),P&&(M=!1,document.body.classList.remove("markdown-solo"),V.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),o.playClick(),setTimeout(()=>{$(),I(P?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${k+1}`)},320)});R.addEventListener("mouseenter",()=>o.playHover());V.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),V.classList.toggle("active",M),M&&(P=!1,document.body.classList.remove("live-solo"),R.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),o.playClick(),setTimeout(()=>{$(),I(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${k+1}`)},320)});V.addEventListener("mouseenter",()=>o.playHover());X.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",t?"false":"true"),X.classList.toggle("active",!t),o.playClick()});X.addEventListener("mouseenter",()=>o.playHover());z.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",t?"false":"true"),z.classList.toggle("active",!t),o.setEnabled(!t),o.playClick()});z.addEventListener("mouseenter",()=>o.playHover());J.addEventListener("click",()=>{k>0&&O(k-1)});J.addEventListener("mouseenter",()=>o.playHover());Q.addEventListener("click",()=>{k<B.length-1&&O(k+1)});Q.addEventListener("mouseenter",()=>o.playHover());tt.addEventListener("click",at);tt.addEventListener("mouseenter",()=>o.playHover());et.addEventListener("click",()=>{o.playClick(),window.print()});et.addEventListener("mouseenter",()=>o.playHover());nt.addEventListener("click",()=>{confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(w.value=U,k=0,o.playSuccess(),$(),j())});nt.addEventListener("mouseenter",()=>o.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-inject");Et(e)}),t.addEventListener("mouseenter",()=>o.playHover())});w.addEventListener("input",()=>{$(),j()});st.addEventListener("click",()=>{o.init(),ft.classList.add("hidden")});st.addEventListener("mouseenter",()=>{});const ct=document.getElementById("btn-audio-deck"),it=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const xt=document.getElementById("param-hover-freq"),bt=document.getElementById("param-hover-decay"),kt=document.getElementById("param-hover-wave"),Lt=document.getElementById("btn-test-hover"),Tt=document.getElementById("param-click-freq"),St=document.getElementById("param-click-decay"),At=document.getElementById("param-click-wave"),wt=document.getElementById("btn-test-click");ct.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),o.playClick()});ct.addEventListener("mouseenter",()=>o.playHover());it.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),o.playClick()});it.addEventListener("mouseenter",()=>o.playHover());xt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-freq").textContent=`${e} Hz`,o.config.hover.freq=parseInt(e,10)});bt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-decay").textContent=`${e}s`,o.config.hover.decay=parseFloat(e)});kt.addEventListener("change",t=>{o.config.hover.type=t.target.value});Lt.addEventListener("click",()=>o.playHover());Tt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-freq").textContent=`${e} Hz`,o.config.click.freq=parseInt(e,10)});St.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-decay").textContent=`${e}s`,o.config.click.decay=parseFloat(e)});At.addEventListener("change",t=>{o.config.click.type=t.target.value});wt.addEventListener("click",()=>o.playClick());function It(){const t=ht();w.value=t,$(),I("SYSTEM READY")}It();
