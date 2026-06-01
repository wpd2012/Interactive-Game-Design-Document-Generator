// ==========================================================================
// PROCEDURAL AUDIO SYNTHESIZER (WEB AUDIO API)
// ==========================================================================

class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = true;
    this.isInitialized = false;
    
    // Custom Synth Config
    this.config = {
      hover: {
        freq: 880,
        decay: 0.06,
        type: 'sine'
      },
      click: {
        freq: 400,
        decay: 0.1,
        type: 'triangle'
      }
    };
  }

  // Initialize the Audio Context (must be triggered by a user gesture)
  init() {
    if (this.isInitialized) return;
    
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.isInitialized = true;
      console.log("Procedural Audio Engine successfully initialized.");
      this.playSuccess(); // Play a startup sound
    } catch (e) {
      console.error("Web Audio API is not supported in this browser.", e);
    }
  }

  // Set whether sounds should play
  setEnabled(enabled) {
    this.isEnabled = enabled;
    if (this.ctx && !enabled) {
      this.ctx.suspend();
    } else if (this.ctx && enabled) {
      this.ctx.resume();
    }
  }

  // Helper: Create a standard gain node with exponential decay
  createDecayGain(startVol, duration) {
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(startVol, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
    return gainNode;
  }

  // Hover Blip (Subtle Sine Wave)
  playHover() {
    if (!this.isEnabled || !this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.createDecayGain(0.04, this.config.hover.decay);
    
    osc.type = this.config.hover.type;
    osc.frequency.setValueAtTime(this.config.hover.freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(this.config.hover.freq / 2, this.ctx.currentTime + this.config.hover.decay);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + this.config.hover.decay);
  }

  // Click Sound (Crisp Retro Square Wave)
  playClick() {
    if (!this.isEnabled || !this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.createDecayGain(0.08, this.config.click.decay);
    
    osc.type = this.config.click.type;
    osc.frequency.setValueAtTime(this.config.click.freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(this.config.click.freq / 5, this.ctx.currentTime + this.config.click.decay);
    
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.createDecayGain(0.05, 0.015);
    clickOsc.type = 'square';
    clickOsc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    
    osc.start();
    clickOsc.start();
    osc.stop(this.ctx.currentTime + this.config.click.decay);
    clickOsc.stop(this.ctx.currentTime + 0.02);
  }

  // Transition Sweep (Filtered White Noise Sweep)
  playTransition() {
    if (!this.isEnabled || !this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.25; // 0.25 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill buffer with random noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    // Lowpass filter to sweep frequency down
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.25);
    
    const gain = this.createDecayGain(0.07, 0.25);
    
    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    noiseNode.start();
    noiseNode.stop(this.ctx.currentTime + 0.25);
  }

  // Success Arpeggio (Triumphant Retro Melody)
  playSuccess() {
    if (!this.isEnabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    const noteDuration = 0.08;
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + idx * noteDuration);
      
      gain.gain.setValueAtTime(0.05, now + idx * noteDuration);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (idx + 1) * noteDuration + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + idx * noteDuration);
      osc.stop(now + (idx + 2) * noteDuration);
    });
  }
}

export const AudioEngine = new ProceduralAudioEngine();
