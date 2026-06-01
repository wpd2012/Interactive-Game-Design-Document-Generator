(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const c of a)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function i(a){const c={};return a.integrity&&(c.integrity=a.integrity),a.referrerPolicy&&(c.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?c.credentials="include":a.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(a){if(a.ep)return;a.ep=!0;const c=i(a);fetch(a.href,c)}})();function ue(e){return e?e.split(/\n\s*---\s*\n/).map(i=>{let n="";const a=i.split(`
`);let c=!1,u="",p=[];const h=()=>{c&&(n+=`<ul>${u}</ul>`,u="",c=!1)},s=()=>{p.length>0&&(n+='<div class="slide-grid">',p.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",p=[])};for(let E=0;E<a.length;E++){let f=a[E].trim();if(!f){h(),s();continue}const y=f.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(y){h(),p.push({title:y[1].trim(),desc:y[2].trim()});continue}s();const m=f.match(/^\[loop:\s*([^\]]+)\]/);if(m){h();const d=m[1].split("->").map(l=>l.trim());n+=`<div class="loop-diagram-container" data-nodes="${d.join(",")}"></div>`;continue}const g=f.match(/^\[pacing:\s*([^\]]+)\]/);if(g){h();const d=g[1].split(",").map(l=>l.trim());n+=`<div class="pacing-container" data-points="${d.join(",")}"></div>`;continue}const r=f.match(/^\[state:\s*([^\]]+)\]/);if(r){h();const d=r[1].split("->").map(L=>L.trim()),l=[],v=[];d.forEach(L=>{const T=L.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);T?(l.push(T[1].trim()),v.push(T[2]?T[2].trim():"System monitoring triggers.")):(l.push(L),v.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${l.join(",")}" data-descriptions="${v.join("|")}"></div>`;continue}if(f.startsWith("# ")){h();const d=f.substring(2).trim();n+=`<h1>${O(d)}</h1>`;continue}if(f.startsWith("## ")){h();const d=f.substring(3).trim();n+=`<h2>${O(d)}</h2>`;continue}if(f.startsWith("* ")||f.startsWith("- ")){c=!0;const d=f.substring(2).trim();u+=`<li>${O(d)}</li>`;continue}h(),n+=`<p>${O(f)}</p>`}return h(),s(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function O(e){return e.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class me{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(t){console.error("Web Audio API is not supported in this browser.",t)}}setEnabled(t){this.isEnabled=t,this.ctx&&!t?this.ctx.suspend():this.ctx&&t&&this.ctx.resume()}createDecayGain(t,i){const n=this.ctx.createGain();return n.gain.setValueAtTime(t,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+i),n}playHover(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.createOscillator(),i=this.createDecayGain(.04,this.config.hover.decay);t.type=this.config.hover.type,t.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),t.connect(i),i.connect(this.ctx.destination),t.start(),t.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.createOscillator(),i=this.createDecayGain(.08,this.config.click.decay);t.type=this.config.click.type,t.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),a=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),t.connect(i),i.connect(this.ctx.destination),n.connect(a),a.connect(this.ctx.destination),t.start(),n.start(),t.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.sampleRate*.25,i=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=i.getChannelData(0);for(let p=0;p<t;p++)n[p]=Math.random()*2-1;const a=this.ctx.createBufferSource();a.buffer=i;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.setValueAtTime(1500,this.ctx.currentTime),c.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);a.connect(c),c.connect(u),u.connect(this.ctx.destination),a.start(),a.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const t=this.ctx.currentTime,i=[261.63,329.63,392,523.25],n=.08;i.forEach((a,c)=>{const u=this.ctx.createOscillator(),p=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(a,t+c*n),p.gain.setValueAtTime(.05,t+c*n),p.gain.exponentialRampToValueAtTime(1e-4,t+(c+1)*n+.05),u.connect(p),p.connect(this.ctx.destination),u.start(t+c*n),u.stop(t+(c+2)*n)})}}const o=new me;function pe(e){e.querySelectorAll(".loop-diagram-container").forEach(i=>{const n=i.getAttribute("data-nodes");if(!n)return;const a=n.split(","),c=a.length,u=350,p=350,h=u/2,s=p/2,E=100;let f=`
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
    `;const y=[];for(let m=0;m<c;m++){const g=(m*(360/c)-90)*(Math.PI/180),r=h+E*Math.cos(g),d=s+E*Math.sin(g);y.push({x:r,y:d,angle:g})}for(let m=0;m<c;m++){const g=y[m],r=y[(m+1)%c],d=g.angle+.35,l=r.angle-.35,v=h+E*Math.cos(d),L=s+E*Math.sin(d),T=h+E*Math.cos(l),H=s+E*Math.sin(l);f+=`
        <path class="loop-arrow-path" 
              d="M ${v} ${L} A ${E} ${E} 0 0 1 ${T} ${H}" 
              marker-end="url(#arrow)" />
      `}y.forEach((m,g)=>{const r=a[g],l=Math.max(80,r.length*8+15),v=30,L=m.x-l/2,T=m.y-v/2;f+=`
        <g class="loop-node" data-index="${g}">
          <rect class="loop-node-box" x="${L}" y="${T}" width="${l}" height="${v}" rx="6" ry="6" />
          <text class="loop-node-text" x="${m.x}" y="${m.y}">${r}</text>
        </g>
      `}),f+="</svg>",i.innerHTML=f,i.querySelectorAll(".loop-node").forEach(m=>{m.addEventListener("mouseenter",()=>{o.playHover();const g=parseInt(m.getAttribute("data-index"),10),r=i.querySelectorAll(".loop-arrow-path");r[g]&&(r[g].style.stroke="var(--text-accent)",r[g].setAttribute("marker-end","url(#arrow-active)"))}),m.addEventListener("mouseleave",()=>{const g=parseInt(m.getAttribute("data-index"),10),r=i.querySelectorAll(".loop-arrow-path");r[g]&&(r[g].style.stroke="",r[g].setAttribute("marker-end","url(#arrow)"))}),m.addEventListener("click",()=>{o.playClick()})})})}function he(e){e.querySelectorAll(".pacing-container").forEach(i=>{const n=i.getAttribute("data-points");if(!n)return;let a=n.split(",").map(r=>{const d=parseInt(r.trim(),10);return isNaN(d)?50:Math.max(0,Math.min(100,d))});const c=a.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas"></canvas>
      <div class="pacing-controls">
    `;const p=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];a.forEach((r,d)=>{const l=p[d]||`P${d+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${l}: ${r}%</label>
          <input type="range" class="pacing-slider" data-index="${d}" min="0" max="100" value="${r}">
        </div>
      `}),u+="</div>",u+=`
      <div class="pacing-presets-row">
        <span class="hud-label" style="font-size: 0.6rem; margin-right: 4px;">PRESETS:</span>
        <button class="btn-preset" data-preset="boss">BOSS FIGHT</button>
        <button class="btn-preset" data-preset="stealth">STEALTH RUN</button>
        <button class="btn-preset" data-preset="slow">SLOW BUILD</button>
        <button class="btn-preset" data-preset="flat">FLAT LINE</button>
      </div>
    `,i.innerHTML=u;const h=i.querySelector(".pacing-canvas"),s=h.getContext("2d"),E=i.querySelectorAll(".pacing-slider"),f=i.querySelectorAll(".btn-preset"),y=()=>{const r=h.clientWidth,d=h.clientHeight;if(r===0||d===0)return;(h.width!==r||h.height!==d)&&(h.width=r,h.height=d);const l=h.width,v=h.height;s.clearRect(0,0,l,v);const L=getComputedStyle(document.documentElement),T=L.getPropertyValue("--text-accent").trim()||"#00ffff",H=L.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",D=L.getPropertyValue("--border-color").trim()||"#1f1f45";s.strokeStyle=D,s.lineWidth=1,s.setLineDash([4,4]);for(let b of[.25,.5,.75]){const x=v*b;s.beginPath(),s.moveTo(0,x),s.lineTo(l,x),s.stroke()}s.setLineDash([]);const I=40,q=l-I*2,S=a.map((b,x)=>{const w=I+x/(c-1)*q,R=v-20-b/100*(v-40);return{x:w,y:R}}),F=s.createLinearGradient(0,0,0,v);F.addColorStop(0,T+"22"),F.addColorStop(1,"transparent"),s.fillStyle=F,s.beginPath(),s.moveTo(S[0].x,v),s.lineTo(S[0].x,S[0].y);for(let b=0;b<S.length-1;b++){const x=S[b],w=S[b+1],R=x.x+(w.x-x.x)/2,G=x.y,z=x.x+(w.x-x.x)/2,U=w.y;s.bezierCurveTo(R,G,z,U,w.x,w.y)}s.lineTo(S[S.length-1].x,v),s.closePath(),s.fill(),s.strokeStyle=T,s.lineWidth=3,s.shadowBlur=10,s.shadowColor=T,s.beginPath(),s.moveTo(S[0].x,S[0].y);for(let b=0;b<S.length-1;b++){const x=S[b],w=S[b+1],R=x.x+(w.x-x.x)/2,G=x.y,z=x.x+(w.x-x.x)/2,U=w.y;s.bezierCurveTo(R,G,z,U,w.x,w.y)}s.stroke(),s.shadowBlur=0,S.forEach((b,x)=>{s.fillStyle=H,s.strokeStyle="#ffffff",s.lineWidth=2,s.beginPath(),s.arc(b.x,b.y,6,0,Math.PI*2),s.fill(),s.stroke(),s.fillStyle="var(--text-main)",s.font="9px monospace",s.textAlign="center",s.fillText(`${a[x]}%`,b.x,b.y-12)})};y(),new ResizeObserver(()=>{y()}).observe(h);const g=r=>{const d=[...a];let l=0;const v=18,L=()=>{l++;const T=l/v,H=T*(2-T);a=d.map((D,I)=>{const q=r[I]!==void 0?r[I]:50;return Math.round(D+(q-D)*H)}),E.forEach((D,I)=>{D.value=a[I];const q=D.parentElement.querySelector("label"),S=p[I]||`P${I+1}`;q.textContent=`${S}: ${a[I]}%`}),i.setAttribute("data-points",a.join(",")),y(),l<v&&requestAnimationFrame(L)};requestAnimationFrame(L)};E.forEach(r=>{r.addEventListener("input",d=>{const l=parseInt(r.getAttribute("data-index"),10),v=parseInt(d.target.value,10);a[l]=v;const L=r.parentElement.querySelector("label"),T=p[l]||`P${l+1}`;L.textContent=`${T}: ${v}%`,i.setAttribute("data-points",a.join(",")),y()}),r.addEventListener("mousedown",()=>{o.playClick()}),r.addEventListener("mouseenter",()=>{o.playHover()})}),f.forEach(r=>{r.addEventListener("click",()=>{const d=r.getAttribute("data-preset");let l=[];switch(d){case"boss":l=[10,20,30,95,20];break;case"stealth":l=[75,80,25,15,10];break;case"slow":l=[10,30,50,70,90];break;case"flat":l=[40,40,40,40,40];break}o.playSuccess(),g(l)}),r.addEventListener("mouseenter",()=>{o.playHover()})})})}function ge(e){e.querySelectorAll(".state-machine-container").forEach(i=>{const n=i.getAttribute("data-states"),a=i.getAttribute("data-descriptions");if(!n)return;const c=n.split(","),u=a?a.split("|"):[];let p=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;c.forEach((y,m)=>{const g=m===0?"active":"",r=u[m]||"System monitoring triggers.";p+=`
        <div class="state-node-wrapper">
          <div class="state-node ${g}" data-index="${m}" data-desc="${r}">
            <div class="state-indicator"></div>
            <span class="state-name">${y}</span>
          </div>
      `,m<c.length-1&&(p+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),p+="</div>"});const h=u[0]||"System monitoring triggers.";p+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${c[0]}</strong></span>
        <p id="active-state-desc">${h}</p>
      </div>
    `,i.innerHTML=p;const s=i.querySelectorAll(".state-node"),E=i.querySelector("#active-state-title"),f=i.querySelector("#active-state-desc");s.forEach(y=>{y.addEventListener("click",()=>{if(y.classList.contains("active"))return;s.forEach(l=>l.classList.remove("active")),y.classList.add("active");const m=y.getAttribute("data-index"),g=c[m],r=y.getAttribute("data-desc");E.textContent=g,f.textContent=r,i.querySelectorAll(".connector-arrow path").forEach((l,v)=>{v==m-1&&(l.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{l.style.stroke=""},600))}),o.playSuccess()}),y.addEventListener("mouseenter",()=>{o.playHover()})})})}const Q="playable_gdd_draft",j=`# CYBER-PULSE: NEON RUNNER
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
`;function ve(e){try{return localStorage.setItem(Q,e),!0}catch(t){return console.error("Failed to save draft to LocalStorage",t),!1}}function fe(){try{const e=localStorage.getItem(Q);return e!==null?e:j}catch(e){return console.error("Failed to load draft from LocalStorage",e),j}}let k=0,B=[],X=null,P=!1,M=!1;const A=document.getElementById("markdown-input"),N=document.getElementById("slide-container"),ee=document.getElementById("current-slide-num"),ye=document.getElementById("total-slides-num"),te=document.getElementById("prev-slide-btn"),ne=document.getElementById("next-slide-btn"),Ee=document.getElementById("status-message"),J=document.querySelectorAll("[data-set-theme]"),_=document.getElementById("toggle-crt"),K=document.getElementById("toggle-audio"),V=document.getElementById("toggle-editor"),W=document.getElementById("toggle-doc"),se=document.getElementById("btn-fullscreen"),ae=document.getElementById("btn-export"),oe=document.getElementById("btn-template"),be=document.getElementById("audio-modal"),ie=document.getElementById("btn-enable-audio");function $(){const e=A.value;B=ue(e),ye.textContent=B.length,k>=B.length&&(k=Math.max(0,B.length-1)),ee.textContent=k+1,N.innerHTML=B[k]||"",pe(N),he(N),ge(N),xe()}function Y(e){e<0||e>=B.length||(k=e,ee.textContent=k+1,o.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),$(),C(`VIEWING SLIDE ${k+1}`))}function xe(){N.querySelectorAll(".tilt-card").forEach(t=>{t.addEventListener("mousemove",i=>{const n=t.getBoundingClientRect(),a=i.clientX-n.left,c=i.clientY-n.top,u=n.width,p=n.height,h=(a/u-.5)*20,s=-(c/p-.5)*20;t.style.transform=`rotateX(${s}deg) rotateY(${h}deg) scale(1.03)`}),t.addEventListener("mouseleave",()=>{t.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),t.addEventListener("mouseenter",()=>{o.playHover()}),t.addEventListener("click",()=>{o.playClick()})})}function ke(e){const t=A.selectionStart,i=A.value;let n="";switch(e){case"slide":n=`
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
`;break}const a=i.substring(0,t),c=i.substring(t);A.value=a+n+c,A.focus();const u=t+n.length;A.setSelectionRange(u,u),o.playClick(),$(),Z()}function Z(){C("SAVING..."),X&&clearTimeout(X),X=setTimeout(()=>{ve(A.value),C("SYSTEM READY • AUTO-SAVED")},1e3)}function C(e){Ee.textContent=e}document.addEventListener("keydown",e=>{document.activeElement!==A&&(M||(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"?(e.preventDefault(),k<B.length-1?Y(k+1):o.playClick()):e.key==="ArrowLeft"||e.key==="Backspace"||e.key==="PageUp"?(e.preventDefault(),k>0?Y(k-1):o.playClick()):e.key.toLowerCase()==="f"?(e.preventDefault(),ce()):e.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&re()))});function ce(){o.playClick(),document.body.classList.contains("presentation-fullscreen")?re():(document.body.classList.add("presentation-fullscreen"),C("FULLSCREEN PRESENTER MODE ACTIVE"))}function re(){document.body.classList.remove("presentation-fullscreen"),C("SYSTEM READY")}J.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-set-theme");document.documentElement.setAttribute("data-theme",t),J.forEach(i=>i.classList.remove("active")),e.classList.add("active"),o.playClick(),$()}),e.addEventListener("mouseenter",()=>o.playHover())});V.addEventListener("click",()=>{P=!P,document.body.classList.toggle("live-solo",P),V.classList.toggle("active",P),P&&(M=!1,document.body.classList.remove("markdown-solo"),W.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),o.playClick(),setTimeout(()=>{$(),C(P?"LIVE PRESENTATION MAXIMIZED":`VIEWING SLIDE ${k+1}`)},320)});V.addEventListener("mouseenter",()=>o.playHover());W.addEventListener("click",()=>{M=!M,document.body.classList.toggle("markdown-solo",M),W.classList.toggle("active",M),M&&(P=!1,document.body.classList.remove("live-solo"),V.classList.remove("active")),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),o.playClick(),setTimeout(()=>{$(),C(M?"GDD SOURCE CODE MAXIMIZED":`VIEWING SLIDE ${k+1}`)},320)});W.addEventListener("mouseenter",()=>o.playHover());_.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",e?"false":"true"),_.classList.toggle("active",!e),o.playClick()});_.addEventListener("mouseenter",()=>o.playHover());K.addEventListener("click",()=>{const e=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",e?"false":"true"),K.classList.toggle("active",!e),o.setEnabled(!e),o.playClick()});K.addEventListener("mouseenter",()=>o.playHover());te.addEventListener("click",()=>{k>0&&Y(k-1)});te.addEventListener("mouseenter",()=>o.playHover());ne.addEventListener("click",()=>{k<B.length-1&&Y(k+1)});ne.addEventListener("mouseenter",()=>o.playHover());se.addEventListener("click",ce);se.addEventListener("mouseenter",()=>o.playHover());ae.addEventListener("click",()=>{o.playClick(),window.print()});ae.addEventListener("mouseenter",()=>o.playHover());oe.addEventListener("click",()=>{confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(A.value=j,k=0,o.playSuccess(),$(),Z())});oe.addEventListener("mouseenter",()=>o.playHover());document.querySelectorAll("[data-inject]").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-inject");ke(t)}),e.addEventListener("mouseenter",()=>o.playHover())});A.addEventListener("input",()=>{$(),Z()});ie.addEventListener("click",()=>{o.init(),be.classList.add("hidden")});ie.addEventListener("mouseenter",()=>{});const le=document.getElementById("btn-audio-deck"),de=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const Le=document.getElementById("param-hover-freq"),Te=document.getElementById("param-hover-decay"),Se=document.getElementById("param-hover-wave"),we=document.getElementById("btn-test-hover"),Ae=document.getElementById("param-click-freq"),Ie=document.getElementById("param-click-decay"),Ce=document.getElementById("param-click-wave"),Me=document.getElementById("btn-test-click");le.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),o.playClick()});le.addEventListener("mouseenter",()=>o.playHover());de.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),o.playClick()});de.addEventListener("mouseenter",()=>o.playHover());Le.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-hover-freq").textContent=`${t} Hz`,o.config.hover.freq=parseInt(t,10)});Te.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-hover-decay").textContent=`${t}s`,o.config.hover.decay=parseFloat(t)});Se.addEventListener("change",e=>{o.config.hover.type=e.target.value});we.addEventListener("click",()=>o.playHover());Ae.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-click-freq").textContent=`${t} Hz`,o.config.click.freq=parseInt(t,10)});Ie.addEventListener("input",e=>{const t=e.target.value;document.getElementById("val-click-decay").textContent=`${t}s`,o.config.click.decay=parseFloat(t)});Ce.addEventListener("change",e=>{o.config.click.type=e.target.value});Me.addEventListener("click",()=>o.playClick());function Be(){const e=fe();A.value=e,$(),C("SYSTEM READY")}Be();
