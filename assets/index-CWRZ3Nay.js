(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();function ot(t){return t?t.split(/\n\s*---\s*\n/).map(o=>{let n="";const a=o.split(`
`);let r=!1,u="",p=[];const f=()=>{r&&(n+=`<ul>${u}</ul>`,u="",r=!1)},s=()=>{p.length>0&&(n+='<div class="slide-grid">',p.forEach(E=>{n+=`
            <div class="tilt-card-wrapper">
              <div class="tilt-card">
                <h3>${E.title}</h3>
                <p>${E.desc}</p>
              </div>
            </div>
          `}),n+="</div>",p=[])};for(let E=0;E<a.length;E++){let g=a[E].trim();if(!g){f(),s();continue}const y=g.match(/^\[card:\s*([^|]+)\s*\|\s*([^\]]+)\]/);if(y){f(),p.push({title:y[1].trim(),desc:y[2].trim()});continue}s();const m=g.match(/^\[loop:\s*([^\]]+)\]/);if(m){f();const d=m[1].split("->").map(h=>h.trim());n+=`<div class="loop-diagram-container" data-nodes="${d.join(",")}"></div>`;continue}const c=g.match(/^\[pacing:\s*([^\]]+)\]/);if(c){f();const d=c[1].split(",").map(h=>h.trim());n+=`<div class="pacing-container" data-points="${d.join(",")}"></div>`;continue}const l=g.match(/^\[state:\s*([^\]]+)\]/);if(l){f();const d=l[1].split("->").map(T=>T.trim()),h=[],k=[];d.forEach(T=>{const S=T.match(/^([^(]+)\s*(?:\(([^)]+)\))?/);S?(h.push(S[1].trim()),k.push(S[2]?S[2].trim():"System monitoring triggers.")):(h.push(T),k.push("System monitoring triggers."))}),n+=`<div class="state-machine-container" data-states="${h.join(",")}" data-descriptions="${k.join("|")}"></div>`;continue}if(g.startsWith("# ")){f();const d=g.substring(2).trim();n+=`<h1>${D(d)}</h1>`;continue}if(g.startsWith("## ")){f();const d=g.substring(3).trim();n+=`<h2>${D(d)}</h2>`;continue}if(g.startsWith("* ")||g.startsWith("- ")){r=!0;const d=g.substring(2).trim();u+=`<li>${D(d)}</li>`;continue}f(),n+=`<p>${D(g)}</p>`}return f(),s(),`<div class="slide-content">${n}</div>`}):['<div class="slide-content"><h1>EMPTY PITCH</h1><p>Start writing your GDD on the left pane.</p></div>']}function D(t){return t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")}class ct{constructor(){this.ctx=null,this.isEnabled=!0,this.isInitialized=!1,this.config={hover:{freq:880,decay:.06,type:"sine"},click:{freq:400,decay:.1,type:"triangle"}}}init(){if(!this.isInitialized)try{window.AudioContext=window.AudioContext||window.webkitAudioContext,this.ctx=new AudioContext,this.isInitialized=!0,console.log("Procedural Audio Engine successfully initialized."),this.playSuccess()}catch(e){console.error("Web Audio API is not supported in this browser.",e)}}setEnabled(e){this.isEnabled=e,this.ctx&&!e?this.ctx.suspend():this.ctx&&e&&this.ctx.resume()}createDecayGain(e,o){const n=this.ctx.createGain();return n.gain.setValueAtTime(e,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+o),n}playHover(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),o=this.createDecayGain(.04,this.config.hover.decay);e.type=this.config.hover.type,e.frequency.setValueAtTime(this.config.hover.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.hover.freq/2,this.ctx.currentTime+this.config.hover.decay),e.connect(o),o.connect(this.ctx.destination),e.start(),e.stop(this.ctx.currentTime+this.config.hover.decay)}playClick(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.createOscillator(),o=this.createDecayGain(.08,this.config.click.decay);e.type=this.config.click.type,e.frequency.setValueAtTime(this.config.click.freq,this.ctx.currentTime),e.frequency.exponentialRampToValueAtTime(this.config.click.freq/5,this.ctx.currentTime+this.config.click.decay);const n=this.ctx.createOscillator(),a=this.createDecayGain(.05,.015);n.type="square",n.frequency.setValueAtTime(1200,this.ctx.currentTime),e.connect(o),o.connect(this.ctx.destination),n.connect(a),a.connect(this.ctx.destination),e.start(),n.start(),e.stop(this.ctx.currentTime+this.config.click.decay),n.stop(this.ctx.currentTime+.02)}playTransition(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.sampleRate*.25,o=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=o.getChannelData(0);for(let p=0;p<e;p++)n[p]=Math.random()*2-1;const a=this.ctx.createBufferSource();a.buffer=o;const r=this.ctx.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(1500,this.ctx.currentTime),r.frequency.exponentialRampToValueAtTime(100,this.ctx.currentTime+.25);const u=this.createDecayGain(.07,.25);a.connect(r),r.connect(u),u.connect(this.ctx.destination),a.start(),a.stop(this.ctx.currentTime+.25)}playSuccess(){if(!this.isEnabled||!this.ctx)return;const e=this.ctx.currentTime,o=[261.63,329.63,392,523.25],n=.08;o.forEach((a,r)=>{const u=this.ctx.createOscillator(),p=this.ctx.createGain();u.type="square",u.frequency.setValueAtTime(a,e+r*n),p.gain.setValueAtTime(.05,e+r*n),p.gain.exponentialRampToValueAtTime(1e-4,e+(r+1)*n+.05),u.connect(p),p.connect(this.ctx.destination),u.start(e+r*n),u.stop(e+(r+2)*n)})}}const i=new ct;function it(t){t.querySelectorAll(".loop-diagram-container").forEach(o=>{const n=o.getAttribute("data-nodes");if(!n)return;const a=n.split(","),r=a.length,u=350,p=350,f=u/2,s=p/2,E=100;let g=`
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
    `;const y=[];for(let m=0;m<r;m++){const c=(m*(360/r)-90)*(Math.PI/180),l=f+E*Math.cos(c),d=s+E*Math.sin(c);y.push({x:l,y:d,angle:c})}for(let m=0;m<r;m++){const c=y[m],l=y[(m+1)%r],d=c.angle+.35,h=l.angle-.35,k=f+E*Math.cos(d),T=s+E*Math.sin(d),S=f+E*Math.cos(h),C=s+E*Math.sin(h);g+=`
        <path class="loop-arrow-path" 
              d="M ${k} ${T} A ${E} ${E} 0 0 1 ${S} ${C}" 
              marker-end="url(#arrow)" />
      `}y.forEach((m,c)=>{const l=a[c],h=Math.max(80,l.length*8+15),k=30,T=m.x-h/2,S=m.y-k/2;g+=`
        <g class="loop-node" data-index="${c}">
          <rect class="loop-node-box" x="${T}" y="${S}" width="${h}" height="${k}" rx="6" ry="6" />
          <text class="loop-node-text" x="${m.x}" y="${m.y}">${l}</text>
        </g>
      `}),g+="</svg>",o.innerHTML=g,o.querySelectorAll(".loop-node").forEach(m=>{m.addEventListener("mouseenter",()=>{i.playHover();const c=parseInt(m.getAttribute("data-index"),10),l=o.querySelectorAll(".loop-arrow-path");l[c]&&(l[c].style.stroke="var(--text-accent)",l[c].setAttribute("marker-end","url(#arrow-active)"))}),m.addEventListener("mouseleave",()=>{const c=parseInt(m.getAttribute("data-index"),10),l=o.querySelectorAll(".loop-arrow-path");l[c]&&(l[c].style.stroke="",l[c].setAttribute("marker-end","url(#arrow)"))}),m.addEventListener("click",()=>{i.playClick()})})})}function rt(t){t.querySelectorAll(".pacing-container").forEach(o=>{const n=o.getAttribute("data-points");if(!n)return;let a=n.split(",").map(c=>{const l=parseInt(c.trim(),10);return isNaN(l)?50:Math.max(0,Math.min(100,l))});const r=a.length;let u=`
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
    `,o.innerHTML=u;const f=o.querySelector(".pacing-canvas"),s=f.getContext("2d"),E=o.querySelectorAll(".pacing-slider"),g=o.querySelectorAll(".btn-preset"),y=()=>{const c=f.width,l=f.height;s.clearRect(0,0,c,l);const d=getComputedStyle(document.documentElement),h=d.getPropertyValue("--text-accent").trim()||"#00ffff",k=d.getPropertyValue("--text-accent-secondary").trim()||"#ff007f",T=d.getPropertyValue("--border-color").trim()||"#1f1f45";s.strokeStyle=T,s.lineWidth=1,s.setLineDash([4,4]);for(let x of[.25,.5,.75]){const b=l*x;s.beginPath(),s.moveTo(0,b),s.lineTo(c,b),s.stroke()}s.setLineDash([]);const S=40,C=c-S*2,v=a.map((x,b)=>{const A=S+b/(r-1)*C,P=l-20-x/100*(l-40);return{x:A,y:P}}),B=s.createLinearGradient(0,0,0,l);B.addColorStop(0,h+"22"),B.addColorStop(1,"transparent"),s.fillStyle=B,s.beginPath(),s.moveTo(v[0].x,l),s.lineTo(v[0].x,v[0].y);for(let x=0;x<v.length-1;x++){const b=v[x],A=v[x+1],P=b.x+(A.x-b.x)/2,R=b.y,N=b.x+(A.x-b.x)/2,V=A.y;s.bezierCurveTo(P,R,N,V,A.x,A.y)}s.lineTo(v[v.length-1].x,l),s.closePath(),s.fill(),s.strokeStyle=h,s.lineWidth=3,s.shadowBlur=10,s.shadowColor=h,s.beginPath(),s.moveTo(v[0].x,v[0].y);for(let x=0;x<v.length-1;x++){const b=v[x],A=v[x+1],P=b.x+(A.x-b.x)/2,R=b.y,N=b.x+(A.x-b.x)/2,V=A.y;s.bezierCurveTo(P,R,N,V,A.x,A.y)}s.stroke(),s.shadowBlur=0,v.forEach((x,b)=>{s.fillStyle=k,s.strokeStyle="#ffffff",s.lineWidth=2,s.beginPath(),s.arc(x.x,x.y,6,0,Math.PI*2),s.fill(),s.stroke(),s.fillStyle="var(--text-main)",s.font="9px monospace",s.textAlign="center",s.fillText(`${a[b]}%`,x.x,x.y-12)})};y();const m=c=>{const l=[...a];let d=0;const h=18,k=()=>{d++;const T=d/h,S=T*(2-T);a=l.map((C,v)=>{const B=c[v]!==void 0?c[v]:50;return Math.round(C+(B-C)*S)}),E.forEach((C,v)=>{C.value=a[v];const B=C.parentElement.querySelector("label"),x=p[v]||`P${v+1}`;B.textContent=`${x}: ${a[v]}%`}),o.setAttribute("data-points",a.join(",")),y(),d<h&&requestAnimationFrame(k)};requestAnimationFrame(k)};E.forEach(c=>{c.addEventListener("input",l=>{const d=parseInt(c.getAttribute("data-index"),10),h=parseInt(l.target.value,10);a[d]=h;const k=c.parentElement.querySelector("label"),T=p[d]||`P${d+1}`;k.textContent=`${T}: ${h}%`,o.setAttribute("data-points",a.join(",")),y()}),c.addEventListener("mousedown",()=>{i.playClick()}),c.addEventListener("mouseenter",()=>{i.playHover()})}),g.forEach(c=>{c.addEventListener("click",()=>{const l=c.getAttribute("data-preset");let d=[];switch(l){case"boss":d=[10,20,30,95,20];break;case"stealth":d=[75,80,25,15,10];break;case"slow":d=[10,30,50,70,90];break;case"flat":d=[40,40,40,40,40];break}i.playSuccess(),m(d)}),c.addEventListener("mouseenter",()=>{i.playHover()})})})}function lt(t){t.querySelectorAll(".state-machine-container").forEach(o=>{const n=o.getAttribute("data-states"),a=o.getAttribute("data-descriptions");if(!n)return;const r=n.split(","),u=a?a.split("|"):[];let p=`
      <div class="state-machine-hud">
        <span class="hud-label">AI STATE MACHINE (CLICK TO TRANSITION)</span>
      </div>
      <div class="state-nodes-row">
    `;r.forEach((y,m)=>{const c=m===0?"active":"",l=u[m]||"System monitoring triggers.";p+=`
        <div class="state-node-wrapper">
          <div class="state-node ${c}" data-index="${m}" data-desc="${l}">
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
    `,o.innerHTML=p;const s=o.querySelectorAll(".state-node"),E=o.querySelector("#active-state-title"),g=o.querySelector("#active-state-desc");s.forEach(y=>{y.addEventListener("click",()=>{if(y.classList.contains("active"))return;s.forEach(h=>h.classList.remove("active")),y.classList.add("active");const m=y.getAttribute("data-index"),c=r[m],l=y.getAttribute("data-desc");E.textContent=c,g.textContent=l,o.querySelectorAll(".connector-arrow path").forEach((h,k)=>{k==m-1&&(h.style.stroke="var(--text-accent-secondary)",setTimeout(()=>{h.style.stroke=""},600))}),i.playSuccess()}),y.addEventListener("mouseenter",()=>{i.playHover()})})})}const X="playable_gdd_draft",F=`# CYBER-PULSE: NEON RUNNER
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
`;function dt(t){try{return localStorage.setItem(X,t),!0}catch(e){return console.error("Failed to save draft to LocalStorage",e),!1}}function ut(){try{const t=localStorage.getItem(X);return t!==null?t:F}catch(t){return console.error("Failed to load draft from LocalStorage",t),F}}let L=0,I=[],Y=null;const w=document.getElementById("markdown-input"),q=document.getElementById("slide-container"),j=document.getElementById("current-slide-num"),mt=document.getElementById("total-slides-num"),_=document.getElementById("prev-slide-btn"),K=document.getElementById("next-slide-btn"),pt=document.getElementById("status-message"),U=document.querySelectorAll("[data-set-theme]"),O=document.getElementById("toggle-crt"),W=document.getElementById("toggle-audio"),G=document.getElementById("toggle-editor"),J=document.getElementById("btn-fullscreen"),Q=document.getElementById("btn-export"),Z=document.getElementById("btn-template"),ht=document.getElementById("audio-modal"),tt=document.getElementById("btn-enable-audio");function M(){const t=w.value;I=ot(t),mt.textContent=I.length,L>=I.length&&(L=Math.max(0,I.length-1)),j.textContent=L+1,q.innerHTML=I[L]||"",it(q),rt(q),lt(q),gt()}function H(t){t<0||t>=I.length||(L=t,j.textContent=L+1,i.playTransition(),document.body.classList.add("glitch-active"),setTimeout(()=>{document.body.classList.remove("glitch-active")},220),M(),$(`VIEWING SLIDE ${L+1}`))}function gt(){q.querySelectorAll(".tilt-card").forEach(e=>{e.addEventListener("mousemove",o=>{const n=e.getBoundingClientRect(),a=o.clientX-n.left,r=o.clientY-n.top,u=n.width,p=n.height,f=(a/u-.5)*20,s=-(r/p-.5)*20;e.style.transform=`rotateX(${s}deg) rotateY(${f}deg) scale(1.03)`}),e.addEventListener("mouseleave",()=>{e.style.transform="rotateX(0deg) rotateY(0deg) scale(1)"}),e.addEventListener("mouseenter",()=>{i.playHover()}),e.addEventListener("click",()=>{i.playClick()})})}function vt(t){const e=w.selectionStart,o=w.value;let n="";switch(t){case"slide":n=`
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
`;break}const a=o.substring(0,e),r=o.substring(e);w.value=a+n+r,w.focus();const u=e+n.length;w.setSelectionRange(u,u),i.playClick(),M(),z()}function z(){$("SAVING..."),Y&&clearTimeout(Y),Y=setTimeout(()=>{dt(w.value),$("SYSTEM READY • AUTO-SAVED")},1e3)}function $(t){pt.textContent=t}document.addEventListener("keydown",t=>{document.activeElement!==w&&(t.key==="ArrowRight"||t.key===" "||t.key==="PageDown"?(t.preventDefault(),L<I.length-1?H(L+1):i.playClick()):t.key==="ArrowLeft"||t.key==="Backspace"||t.key==="PageUp"?(t.preventDefault(),L>0?H(L-1):i.playClick()):t.key.toLowerCase()==="f"?(t.preventDefault(),et()):t.key==="Escape"&&document.body.classList.contains("presentation-fullscreen")&&nt())});function et(){i.playClick(),document.body.classList.contains("presentation-fullscreen")?nt():(document.body.classList.add("presentation-fullscreen"),$("FULLSCREEN PRESENTER MODE ACTIVE"))}function nt(){document.body.classList.remove("presentation-fullscreen"),$("SYSTEM READY")}U.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-set-theme");document.documentElement.setAttribute("data-theme",e),U.forEach(o=>o.classList.remove("active")),t.classList.add("active"),i.playClick(),M()}),t.addEventListener("mouseenter",()=>i.playHover())});G.addEventListener("click",()=>{const t=document.body.classList.toggle("editor-collapsed");G.classList.toggle("active",t),i.playClick(),setTimeout(()=>{M()},320)});G.addEventListener("mouseenter",()=>i.playHover());O.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-crt")==="true";document.documentElement.setAttribute("data-crt",t?"false":"true"),O.classList.toggle("active",!t),i.playClick()});O.addEventListener("mouseenter",()=>i.playHover());W.addEventListener("click",()=>{const t=document.documentElement.getAttribute("data-audio")==="true";document.documentElement.setAttribute("data-audio",t?"false":"true"),W.classList.toggle("active",!t),i.setEnabled(!t),i.playClick()});W.addEventListener("mouseenter",()=>i.playHover());_.addEventListener("click",()=>{L>0&&H(L-1)});_.addEventListener("mouseenter",()=>i.playHover());K.addEventListener("click",()=>{L<I.length-1&&H(L+1)});K.addEventListener("mouseenter",()=>i.playHover());J.addEventListener("click",et);J.addEventListener("mouseenter",()=>i.playHover());Q.addEventListener("click",()=>{i.playClick(),window.print()});Q.addEventListener("mouseenter",()=>i.playHover());Z.addEventListener("click",()=>{confirm("Reset layout with demo GDD? Your unsaved draft will be replaced.")&&(w.value=F,L=0,i.playSuccess(),M(),z())});Z.addEventListener("mouseenter",()=>i.playHover());document.querySelectorAll("[data-inject]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-inject");vt(e)}),t.addEventListener("mouseenter",()=>i.playHover())});w.addEventListener("input",()=>{M(),z()});tt.addEventListener("click",()=>{i.init(),ht.classList.add("hidden")});tt.addEventListener("mouseenter",()=>{});const st=document.getElementById("btn-audio-deck"),at=document.getElementById("btn-close-drawer");document.getElementById("audio-deck-drawer");const ft=document.getElementById("param-hover-freq"),yt=document.getElementById("param-hover-decay"),Et=document.getElementById("param-hover-wave"),xt=document.getElementById("btn-test-hover"),bt=document.getElementById("param-click-freq"),kt=document.getElementById("param-click-decay"),Lt=document.getElementById("param-click-wave"),Tt=document.getElementById("btn-test-click");st.addEventListener("click",()=>{document.body.classList.toggle("drawer-open"),i.playClick()});st.addEventListener("mouseenter",()=>i.playHover());at.addEventListener("click",()=>{document.body.classList.remove("drawer-open"),i.playClick()});at.addEventListener("mouseenter",()=>i.playHover());ft.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-freq").textContent=`${e} Hz`,i.config.hover.freq=parseInt(e,10)});yt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-hover-decay").textContent=`${e}s`,i.config.hover.decay=parseFloat(e)});Et.addEventListener("change",t=>{i.config.hover.type=t.target.value});xt.addEventListener("click",()=>i.playHover());bt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-freq").textContent=`${e} Hz`,i.config.click.freq=parseInt(e,10)});kt.addEventListener("input",t=>{const e=t.target.value;document.getElementById("val-click-decay").textContent=`${e}s`,i.config.click.decay=parseFloat(e)});Lt.addEventListener("change",t=>{i.config.click.type=t.target.value});Tt.addEventListener("click",()=>i.playClick());function St(){const t=ut();w.value=t,M(),$("SYSTEM READY")}St();
