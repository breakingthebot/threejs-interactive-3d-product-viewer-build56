// src/utils/soundFX.js
// Zero-dependency Web Audio API sound design synthesizer.
// Connects to: src/components/Navbar.jsx, src/components/MaterialInspector.jsx, src/components/Toolbar.jsx
// Created: 2026-07-31

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('build_56_sound_muted') === 'true';
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('build_56_sound_muted', this.isMuted.toString());
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.08, volume = 0.1) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio autoplay restrictions gracefully
    }
  }

  playClick() {
    this.playTone(800, 'sine', 0.05, 0.08);
  }

  playMaterialSwap() {
    this.playTone(1200, 'triangle', 0.08, 0.12);
  }

  playModalOpen() {
    this.playTone(520, 'sine', 0.12, 0.1);
  }

  playToggle() {
    this.playTone(640, 'sine', 0.06, 0.08);
  }
}

export const soundFX = new SoundManager();

export const playClickSound = () => soundFX.playClick();
export const playMaterialSound = () => soundFX.playMaterialSwap();
export const playModalOpenSound = () => soundFX.playModalOpen();
export const playToggleSound = () => soundFX.playToggle();
