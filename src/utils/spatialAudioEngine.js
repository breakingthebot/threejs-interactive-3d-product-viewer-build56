// src/utils/spatialAudioEngine.js
// Web Audio API 3D Spatial Audio Synthesizer (PannerNode & Positional Audio).
// Connects to: src/components/ViewerCanvas.jsx, src/App.jsx
// Created: 2026-08-01

class SpatialAudioEngine {
  constructor() {
    this.ctx = null;
    this.panner = null;
    this.osc = null;
    this.gain = null;
    this.isInitialized = false;
    this.isMuted = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.panner = this.ctx.createPanner();
      this.panner.panningModel = 'HRTF';
      this.panner.distanceModel = 'inverse';
      this.panner.refDistance = 1;
      this.panner.maxDistance = 10000;
      this.panner.rolloffFactor = 1;

      this.gain = this.ctx.createGain();
      this.gain.gain.value = 0.05; // Low ambient hum

      this.panner.connect(this.gain);
      this.gain.connect(this.ctx.destination);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio Spatial API not supported', e);
    }
  }

  /**
   * Updates 3D spatial position & frequency based on camera orbit coordinates.
   * @param {number} x - Camera X coordinate.
   * @param {number} y - Camera Y coordinate.
   * @param {number} z - Camera Z coordinate.
   */
  updatePosition(x, y, z) {
    if (this.isMuted) return;
    if (!this.isInitialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.panner && this.panner.positionX) {
      this.panner.positionX.setValueAtTime(x, this.ctx.currentTime);
      this.panner.positionY.setValueAtTime(y, this.ctx.currentTime);
      this.panner.positionZ.setValueAtTime(z, this.ctx.currentTime);
    }
  }

  /**
   * Trigger interactive spatial audio chime when rotating 3D model.
   * @param {number} speed - Rotation angular velocity.
   */
  playOrbitPulse(speed = 1.0) {
    if (this.isMuted) return;
    if (!this.isInitialized) this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const pulseGain = this.ctx.createGain();

      // Pitch shifts higher when closer to product
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 * speed, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880 * speed, this.ctx.currentTime + 0.15);

      pulseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(this.panner);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {
      // Ignore audio context errors on quick rotation
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.gain) {
      this.gain.gain.value = this.isMuted ? 0 : 0.05;
    }
    return this.isMuted;
  }
}

export const spatialAudio = new SpatialAudioEngine();
