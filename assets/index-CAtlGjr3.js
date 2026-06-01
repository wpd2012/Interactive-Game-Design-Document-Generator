(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();function at(t){return t?t.split(/\n\s*---\s*\n/).map(o=>{let n="";const a=o.split(`
`);let i=!1,u="",p=[];const v=()=>{i&&(n+=`<ul>${u}</ul>`,u="",i=!1)},s=()=>{p.length>0&&(n+='<div class="slide-grid">',p.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",p=[])};for(let E=0;E<a.length;E++){let g=a[E].trim();if(!g){v(),s();continue}const y=g.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(y){v(),p.push({title:y[1].trim(),desc:y[2].trim()});continue}s();const m=g.match(/^\[loop:\s*([^\]]+)\]/);if(m){v();const d=m[1].split("->").map(h=>h.trim());n+=`<div class="loop-diagram-container" data-nodes="${d.join(",")}"></div>`;continue}const c=g.match(/^\[pacing:\s*([^\]]+)\]/);if(c){v();const d=c[1].split(",").map(h=>h.trim());n+=`<div class="pacing-container" data-points="${d.join(",")}"></div>`;continue}const l=g.match(/^\[state:\s*([^\]]+)\]/);if(l){v();const d=l[1].split("->").map(T=>T.trim()),h=[],k=[];d.forEach(T=>{const S=T.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);S?(h.push(S[1].trim()),k.push(S[2]?S[2].trim():"System monitoring triggers.")):(h.push(T),k.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${h.join(",")}" data-descriptions="${k.join("|")}"></div>`;continue}if(g.startsWith("# ")){v();const d=g.substring(2).trim();n+=`<h1>${D(d)}</h1>`;continue}if(g.startsWith("## ")){v();const d=g.substring(3).trim();n+=`<h2>${D(d)}</h2>`;continue}if(g.startsWith("* ")||g.startsWith("- ")){i=!0;const d=g.substring(2).trim();u+=`<li>${D(d)}</li>`;continue}v(),n+=`<p>${D(g)}</p>`}return v(),s(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function D(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class ot{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(e){console.error("Web Audio API is not supported in this browser.",e)}}setEnabled(e){this.isEnabled=e,this.ctx&&!e?this.ctx.suspend():this.ctx&&e&&this.ctx.resume()}createDecayGain(e,o){const n=this.ctx.createGain();return n.gain.setValueAtTime(e,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+o),n}playHover(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),o=this.createDecayGain(.04,this.config.hover.decay);e.type=this.config.hover.type,e.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),e.connect(o),o.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),o=this.createDecayGain(.08,this.config.click.decay);e.type=this.config.click.type,e.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),a=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),e.connect(o),o.connect(this.ctx.destination),n.connect(a),a.connect(this.ctx.destination),e.start(),n.start(),e.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.sampleRate*.25,o=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=o.getChannelData(0);for(let p=0;p<e;p++)n[p]=Math.random()*2-1;const a=this.ctx.createBufferSource();a.buffer=o;const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(1500,this.ctx.currentTime),i.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);a.connect(i),i.connect(u),u.connect(this.ctx.destination),a.start(),a.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.currentTime,o=[261.63,329.63,392,523.25],n=.08;o.forEach((a,i)=>{const u=this.ctx.createOscillator(),p=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(a,e+i*n),p.gain.setValueAtTime(.05,e+i*n),p.gain.exponentialRampToValueAtTime(1e-4,e+(i+1)*n+.05),u.connect(p),p.connect(this.ctx.destination),u.start(e+i*n),u.stop(e+(i+2)*n)})}}const r=new ot;function ct(t){t.querySelectorAll(".loop-diagram-container").forEach(o=>{const n=o.getAttribute("data-nodes");if(!n)return;const a=n.split(","),i=a.length,u=350,p=350,v=u/2,s=p/2,E=100;let g=`
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
    `;const y=[];for(let m=0;m<i;m++){const c=(m*(360/i)-90)*(Math.PI/180),l=v+E*Math.cos(c),d=s+E*Math.sin(c);y.push({x:l,y:d,angle:c})}for(let m=0;m<i;m++){const c=y[m],l=y[(m+1)%i],d=c.angle+.35,h=l.angle-.35,k=v+E*Math.cos(d),T=s+E*Math.sin(d),S=v+E*Math.cos(h),C=s+E*Math.sin(h);g+=`
        <path class="loop-arrow-path" 
              d="M ${k} ${T} A ${E} ${E} 0 0 1 ${S} ${C}" 
              marker-end="url(#arrow)" />
      `}y.forEach((m,c)=>{const l=a[c],h=Math.max(80,l.length*8+15),k=30,T=m.x-h/2,S=m.y-k/2;g+=`
        <g class="loop-node" data-index="${c}">
          <rect class="loop-node-box" x="${T}" y="${S}" width="${h}" height="${k}" rx="6" ry="6" />
          <text class="loop-node-text" x="${m.x}" y="${m.y}">${l}</text>
        </g>
      `}),g+="</svg>",o.innerHTML=g,o.querySelectorAll(".loop-node").forEach(m=>{m.addEventListener("mouseenter",()=>{r.playHover();const c=parseInt(m.getAttribute("data-index"),10),l=o.querySelectorAll(".loop-arrow-path");l[c]&&(l[c].style.stroke="var(--text-accent)",l[c].setAttribute("marker-end","url(#arrow-active)"))}),m.addEventListener("mouseleave",()=>{const c=parseInt(m.getAttribute("data-index"),10),l=o.querySelectorAll(".loop-arrow-path");l[c]&&(l[c].style.stroke="",l[c].setAttribute("marker-end","url(#arrow)"))}),m.addEventListener("click",()=>{r.playClick()})})})}function it(t){t.querySelectorAll(".pacing-container").forEach(o=>{const n=o.getAttribute("data-points");if(!n)return;let a=n.split(",").map(c=>{const l=parseInt(c.trim(),10);return isNaN(l)?50:Math.max(0,Math.min(100,l))});const i=a.length;let u=`
      <div class="pacing-header">
        <span class="pacing-title">INTENSITY / CHALLENGE CURVE</span>
        <span class="pacing-title" id="pacing-status-val">INTERACTIVE PREVIEW</span>
      </div>
      <canvas class="pacing-canvas" width="600" height="200"></canvas>
      <div class="pacing-controls">
    `;const p=["Intro","Rising","Midpoint","Climax","Ending","P6","P7","P8"];a.forEach((c,l)=>{const d=p[l]||`P${l+1}`;u+=`
        <div class="pacing-slider-group">
          <label>${d}: ${c}%</label>
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
    `,o.innerHTML=u;const v=o.querySelector(".pacing-canvas"),s=v.getContext("2d"),E=o.querySelectorAll(".pacing-slider"),g=o.querySelectorAll(".btn-preset"),y=()=>{const c=v.width,l=v.height;s.clearRect(0,0,c,l);const d=getComputedStyle(document.documentElement),h=d.getPropertyValue("--text-accent").trim()||"#00ffff",k=d.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",T=d.getPropertyValue("--border-color").trim()||"#1f1f45";s.strokeStyle=T,s.lineWidth=1,s.setLineDash([4,4]);for(let x of[.25,.5,.75]){const b=l*x;s.beginPath(),s.moveTo(0,b),s.lineTo(c,b),s.stroke()}s.setLineDash([]);const S=40,C=c-S*2,f=a.map((x,b)=>{const A=S+b/(i-1)*C,P=l-20-x/100*(l-40);return{x:A,y:P}}),M=s.createLinearGradient(0,0,0,l);M.addColorStop(0,h+"22"),M.addColorStop(1,"transparent"),s.fillStyle=M,s.beginPath(),s.moveTo(f[0].x,l),s.lineTo(f[0].x,f[0].y);for(let x=0;x<f.length-1;x++){const b=f[x],A=f[x+1],P=b.x+(A.x-b.x)/2,R=b.y,N=b.x+(A.x-b.x)/2,V=A.y;s.bezierCurveTo(P,R,N,V,A.x,A.y)}s.lineTo(f[f.length-1].x,l),s.closePath(),s.fill(),s.strokeStyle=h,s.lineWidth=3,s.shadowBlur=10,s.shadowColor=h,s.beginPath(),s.moveTo(f[0].x,f[0].y);for(let x=0;x<f.length-1;x++){const b=f[x],A=f[x+1],P=b.x+(A.x-b.x)/2,R=b.y,N=b.x+(A.x-b.x)/2,V=A.y;s.bezierCurveTo(P,R,N,V,A.x,A.y)}s.stroke(),s.shadowBlur=0,f.forEach((x,b)=>{s.fillStyle=k,s.strokeStyle="#ffffff",s.lineWidth=2,s.beginPath(),s.arc(x.x,x.y,6,0,Math.PI*2),s.fill(),s.stroke(),s.fillStyle="var(--text-main)",s.font="9px monospace",s.textAlign="center",s.fillText(`${a[b]}%`,x.x,x.y-12)})};y();const m=c=>{const l=[...a];let d=0;const h=18,k=()=>{d++;const T=d/h,S=T*(2-T);a=l.map((C,f)=>{const M=c[f]!==void 0?c[f]:50;return Math.round(C+(M-C)*S)}),E.forEach((C,f)=>{C.value=a[f];const M=C.parentElement.querySelector("label"),x=p[f]||`P${f+1}`;M.textContent=`${x}: ${a[f]}%`}),o.setAttribute("data-points",a.join(",")),y(),d<h&&requestAnimationFrame(k)};requestAnimationFrame(k)};E.forEach(c=>{c.addEventListener("input",l=>{const d=parseInt(c.getAttribute("data-index"),10),h=parseInt(l.target.value,10);a[d]=h;const k=c.parentElement.querySelector("label"),T=p[d]||`P${d+1}`;k.textContent=`${T}: ${h}%`,o.setAttribute("data-points",a.join(",")),y()}),c.addEventListener("mousedown",()=>{r.playClick()}),c.addEventListener("mouseenter",()=>{r.playHover()})}),g.forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-preset");let d=[];switch(l){case"boss":d=[10,20,30,95,20];break;case"stealth":d=[75,80,25,15,10];break;case"slow":d=[10,30,50,70,90];break;case"flat":d=[40,40,40,40,40];break}r.playSuccess(),m(d)}),c.addEventListener("mouseenter",()=>{r.playHover()})})})}function rt(t){t.querySelectorAll(".state-machine-container").forEach(o=>{const n=o.getAttribute("data-states"),a=o.getAttribute("data-descriptions");if(!n)return;const i=n.split(","),u=a?a.split("|"):[];let p=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;i.forEach((y,m)=>{const c=m===0?"active":"",l=u[m]||"System monitoring triggers.";p+=`
        <div class="state-node-wrapper">
          <div class="state-node ${c}" data-index="${m}" data-desc="${l}">
            <div class="state-indicator"></div>
            <span class="state-name">${y}</span>
          </div>
      `,m<i.length-1&&(p+=`
          <div class="state-connector">
            <svg viewBox="0 0 24 24" class="connector-arrow">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
        `),p+="</div>"});const v=u[0]||"System monitoring triggers.";p+=`
      </div>
      <div class="state-details-box">
        <span class="details-title">ACTIVE STATE: <strong id="active-state-title">${i[0]}</strong></span>
        <p id="active-state-desc">${v}</p>
      </div>
    `,o.innerHTML=p;const s=o.querySelectorAll(".state-node"),E=o.querySelector("#active-state-title"),g=o.querySelector("#active-state-desc");s.forEach(y=>{y.addEventListener("click",()=>{if(y.classList.contains("active"))return;s.forEach(h=>h.classList.remove("active")),y.classList.add("active");const m=y.getAttribute("data-index"),c=i[m],l=y.getAttribute("data-desc");E.textContent=c,g.textContent=l,o.querySelectorAll(".connector-arrow path").forEach((h,k)=>{k==m-1&&(h.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{h.style.stroke=""},600))}),r.playSuccess()}),y.addEventListener("mouseenter",()=>{r.playHover()})})})}const U="playable_gdd_draft",F=`# CYBER-PULSE: NEON RUNNER
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
`;function lt(t){try{return localStorage.setItem(U,t),!0}catch(e){return console.error("Failed to save draft to LocalStorage",e),!1}}function dt(){try{const t=localStorage.getItem(U);return t!==null?t:F}catch(t){return console.error("Failed to load draft from LocalStorage",t),F}}let L=0,I=[],Y=null;const w=document.getElementById("markdown-input"),q=document.getElementById("slide-container"),X=document.getElementById("current-slide-num"),ut=document.getElementById("total-slides-num"),j=document.getElementById("prev-slide-btn"),_=document.getElementById("next-slide-btn"),mt=document.getElementById("status-message"),z=document.querySelectorAll("[data-set-theme]"),O=document.getElementById("toggle-crt"),W=document.getElementById("toggle-audio"),K=document.getElementById("btn-fullscreen"),J=document.getElementById("btn-export"),Q=document.getElementById("btn-template"),pt=document.getElementById("audio-modal"),Z=document.getElementById("btn-enable-audio");function $(){const t=w.value;I=at(t),ut.textContent=I.length,L>=I.length&&(L=Math.max(0,I.length-1)),X.textContent=L+1,q.innerHTML=I[L]||"",ct(q),it(q),rt(q),ht()}function H(t){t<0||t>=I.length||(L=t,X.textContent=L+1,r.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),$(),B(`VIEWING SLIDE ${L+1}`))}function ht(){q.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",o=>{const n=e.getBoundingClientRect(),a=o.clientX-n.left,i=o.clientY-n.top,u=n.width,p=n.height,v=(a/u-.5)*20,s=-(i/p-.5)*20;e.style.transform=`rotateX(${s}deg) rotateY(${v}deg) scale(1.03)`}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),e.addEventListener("mouseenter",()=>{r.playHover()}),e.addEventListener("click",()=>{r.playClick()})})}function gt(t){const e=w.selectionStart,o=w.value;let n="";switch(t){case"slide":n=`
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
`;break}const a=o.substring(0,e),i=o.substring(e);w.value=a+n+i,w.focus();const u=e+n.length;w.setSelectionRange(u,u),r.playClick(),$(),G()}function G(){B("SAVING..."),Y&&clearTimeout(Y),Y=setTimeout(()=>{lt(w.value),B("SYSTEM READY • AUTO-SAVED")},1e3)}function B(t){mt.textContent=t}document.addEventListener("keydown",t=>{document.activeElement!==w&&(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),L<I.length-1?H(L+1):r.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),L>0?H(L-1):r.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),tt()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&et())});function tt(){r.playClick(),document.body.classList.contains("presentation-fullscreen")?et():(document.body.classList.add("presentation-fullscreen"),B("FULLSCREEN PRESENTER MODE ACTIVE"))}function et(){document.body.classList.remove("presentation-fullscreen"),B("SYSTEM READY")}z.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-set-theme");document.documentElement.setAttribute("data-theme",e),z.forEach(o=>o.classList.remove("active")),t.classList.add("active"),r.playClick(),$()}),t.addEventListener("mouseenter",()=>r.playHover())});O.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",t?"false":"true"),O.classList.toggle("active",!t),r.playClick()});O.addEventListener("mouseenter",()=>r.playHover());W.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",t?"false":"true"),W.classList.toggle("active",!t),r.setEnabled(!t),r.playClick()});W.addEventListener("mouseenter",()=>r.playHover());j.addEventListener("click",()=>{L>0&&H(L-1)});j.addEventListener("mouseenter",()=>r.playHover());_.addEventListener("click",()=>{L<I.length-1&&H(L+1)});_.addEventListener("mouseenter",()=>r.playHover());K.addEventListener("click",tt);K.addEventListener("mouseenter",()=>r.playHover());J.addEventListener("click",()=>{r.playClick(),window.print()});J.addEventListener("mouseenter",()=>r.playHover());Q.addEventListener("click",()=>{confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(w.value=F,L=0,r.playSuccess(),$(),G())});Q.addEventListener("mouseenter",()=>r.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-inject");gt(e)}),t.addEventListener("mouseenter",()=>r.playHover())});w.addEventListener("input",()=>{$(),G()});Z.addEventListener("click",()=>{r.init(),pt.classList.add("hidden")});Z.addEventListener("mouseenter",()=>{});const nt=document.getElementById("btn-audio-deck"),st=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const ft=document.getElementById("param-hover-freq"),vt=document.getElementById("param-hover-decay"),yt=document.getElementById("param-hover-wave"),Et=document.getElementById("btn-test-hover"),xt=document.getElementById("param-click-freq"),bt=document.getElementById("param-click-decay"),kt=document.getElementById("param-click-wave"),Lt=document.getElementById("btn-test-click");nt.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),r.playClick()});nt.addEventListener("mouseenter",()=>r.playHover());st.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),r.playClick()});st.addEventListener("mouseenter",()=>r.playHover());ft.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-freq").textContent=`${e} Hz`,r.config.hover.freq=parseInt(e,10)});vt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-decay").textContent=`${e}s`,r.config.hover.decay=parseFloat(e)});yt.addEventListener("change",t=>{r.config.hover.type=t.target.value});Et.addEventListener("click",()=>r.playHover());xt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-freq").textContent=`${e} Hz`,r.config.click.freq=parseInt(e,10)});bt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-decay").textContent=`${e}s`,r.config.click.decay=parseFloat(e)});kt.addEventListener("change",t=>{r.config.click.type=t.target.value});Lt.addEventListener("click",()=>r.playClick());function Tt(){const t=dt();w.value=t,$(),B("SYSTEM READY")}Tt();
