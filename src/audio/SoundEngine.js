// Web Audio API Generative Sound Engine for Harbour Intro
// Generates subtle, cinematic ambient soundscapes, sub-bass safety drones, and transition chords.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    this.masterGain = null;
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.filter = null;
    this.currentScene = 0;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient low-frequency safety drone
      this.setupDrone();
      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  setupDrone() {
    if (!this.ctx) return;
    
    // Lowpass filter for smooth warmth
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    // Osc 1: Deep fundamental
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(48, this.ctx.currentTime); // C1 approx

    // Osc 2: Sub-octave detuned harmonic
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(72.3, this.ctx.currentTime); // D2 detuned

    this.droneOsc1.connect(this.filter);
    this.droneOsc2.connect(this.filter);
    this.filter.connect(this.droneGain);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  toggleMute() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.15);
    }
    return !this.isMuted;
  }

  setMute(mute) {
    if (!this.isInitialized && !mute) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended' && !mute) {
      this.ctx.resume();
    }
    this.isMuted = mute;
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : 0.45;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.15);
    }
  }

  // Play subtle chord or pulse when transitioning into scenes
  onSceneChange(sceneIndex) {
    if (this.isMuted || !this.ctx || !this.isInitialized) return;
    this.currentScene = sceneIndex;

    const t = this.ctx.currentTime;

    // Modulate filter frequency based on scene depth
    if (this.filter) {
      const targetFreq = 120 + sceneIndex * 35;
      this.filter.frequency.setTargetAtTime(targetFreq, t, 0.4);
    }

    // Specific scene acoustic signatures
    switch (sceneIndex) {
      case 0: // Singularity
        this.playGlassTone(261.63, 0.15, 2.5); // C4
        break;
      case 1: // Digital Storm
        this.playNoiseSweep(0.12, 1.8);
        this.playChord([196.00, 261.63, 329.63], 0.1, 2.0); // G3, C4, E4
        break;
      case 2: // Payment Focused
        this.playGlassTone(392.00, 0.15, 1.5); // G4
        break;
      case 3: // Risk Scanner
        this.playRadarPing(880, 0.08); // High scan ping
        setTimeout(() => this.playRadarPing(1174.66, 0.06), 250);
        break;
      case 4: // AI Pause Moment
        this.playDeepSubDrop(80, 35, 0.3, 2.0);
        this.playChord([220.00, 277.18, 329.63], 0.2, 3.0); // A maj
        break;
      case 5: // Harbour Forms
        this.playHarmonicResonance([130.81, 196.00, 261.63, 392.00, 523.25], 0.22, 4.0); // Grand C Maj9
        break;
      case 6: // Voice Waveform
        this.playVoiceRibbonTone();
        break;
      case 7: // Protection Barrier
        this.playBarrierAperture();
        break;
      case 8: // Trusted Contact
        this.playEntangledPulse();
        break;
      case 9: // Final Gateway
        this.playHarmonicResonance([130.81, 164.81, 196.00, 246.94, 293.66, 392.00], 0.25, 4.5);
        break;
      default:
        break;
    }
  }

  playGlassTone(freq, volume = 0.15, duration = 2.0) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration);
  }

  playChord(frequencies, volume = 0.1, duration = 2.5) {
    if (!this.ctx || this.isMuted) return;
    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        this.playGlassTone(freq, volume / frequencies.length, duration);
      }, idx * 40);
    });
  }

  playRadarPing(freq, volume = 0.1) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.3);

    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  playDeepSubDrop(startFreq, endFreq, volume = 0.25, duration = 1.8) {
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(volume, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + duration + 0.1);
  }

  playHarmonicResonance(freqs, volume = 0.2, duration = 3.5) {
    if (!this.ctx || this.isMuted) return;
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this.playGlassTone(f, volume * 0.4, duration);
      }, i * 70);
    });
  }

  playVoiceRibbonTone() {
    if (!this.ctx || this.isMuted) return;
    const notes = [329.63, 392.00, 440.00, 493.88]; // E4, G4, A4, B4
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playGlassTone(freq, 0.08, 1.2);
      }, idx * 120);
    });
  }

  playBarrierAperture() {
    this.playGlassTone(261.63, 0.12, 1.5);
    setTimeout(() => {
      this.playGlassTone(329.63, 0.12, 1.8);
    }, 150);
  }

  playEntangledPulse() {
    this.playRadarPing(659.25, 0.08); // E5
    setTimeout(() => {
      this.playRadarPing(987.77, 0.08); // B5
    }, 180);
  }

  playNoiseSweep(volume = 0.1, duration = 1.5) {
    if (!this.ctx || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + duration);
      filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume * 0.4, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
    } catch (e) {
      // Audio buffer fallthrough
    }
  }

  playInteractionClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.playGlassTone(1200, 0.03, 0.08);
    } catch (e) {}
  }

  playClick(freq = 600, duration = 0.04, volume = 0.08) {
    if (this.isMuted || !this.ctx) return;
    try {
      this.playGlassTone(freq, volume, duration);
    } catch (e) {}
  }

  playLaserSweep(volume = 0.12, duration = 0.14) {
    if (this.isMuted || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(340, t + duration);

      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + duration + 0.04);
    } catch (e) {}
  }

  playWarp(volume = 0.25) {
    this.playWarpBoom();
  }

  playWarpBoom() {
    if (this.isMuted || !this.ctx) return;
    try {
      this.playDeepSubDrop(140, 28, 0.45, 3.0);
      this.playHarmonicResonance([130.81, 261.63, 523.25, 1046.50], 0.3, 3.5);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
