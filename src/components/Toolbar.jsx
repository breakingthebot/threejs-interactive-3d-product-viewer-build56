// src/components/Toolbar.jsx
// Floating controls toolbar for Auto-Rotate, Lighting Environment, and Screenshot Export.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Sun, SunMedium, Camera, Volume2, VolumeX, Smartphone, Share2, PlayCircle, Sparkles, Layers } from 'lucide-react';
import { environmentPresets } from '../data/productsData';
import { playClickSound, playToggleSound, soundFX } from '../utils/soundFX';
import './Toolbar.css';

/**
 * Renders floating viewport control toolbar.
 * @param {Object} props
 * @param {boolean} props.isAutoRotate - Whether OrbitControls auto-rotates.
 * @param {Function} props.setIsAutoRotate - Auto-rotate toggle updater.
 * @param {string} props.envPreset - Selected environment preset ID.
 * @param {Function} props.setEnvPreset - Environment preset updater.
 * @param {Function} props.onTakeSnapshot - Screenshot PNG export handler.
 * @param {Function} props.onOpenAR - AR launcher modal trigger handler.
 * @param {Function} props.onToggleLighting - Studio lighting panel toggle handler.
 * @param {boolean} props.isLightingOpen - Lighting studio open state.
 * @param {Function} props.onToggleAssembly - Assembly animator toggle handler.
 * @param {boolean} props.isAssemblyOpen - Assembly animator open state.
 * @param {Function} props.onOpenPreset - Preset exporter modal trigger handler.
 * @param {boolean} props.isMuted - Sound state.
 * @param {Function} props.setIsMuted - Sound state updater.
 */
export function Toolbar({
  isAutoRotate,
  setIsAutoRotate,
  envPreset,
  setEnvPreset,
  onTakeSnapshot,
  onOpenAR,
  onToggleLighting,
  isLightingOpen,
  onToggleAssembly,
  isAssemblyOpen,
  onTogglePost,
  isPostOpen,
  onOpenPreset,
  isMuted,
  setIsMuted
}) {
  return (
    <motion.div
      className="floating-toolbar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* AUTO ROTATE TOGGLE */}
      <button
        className={`toolbar-btn ${isAutoRotate ? 'active' : ''}`}
        onClick={() => {
          playToggleSound();
          setIsAutoRotate(!isAutoRotate);
        }}
        title="Toggle 3D Auto-Rotation"
      >
        <RotateCw size={15} className={isAutoRotate ? 'spinning-icon' : ''} />
        <span>Auto-Rotate</span>
      </button>

      {/* LIGHTING ENVIRONMENT SELECTOR */}
      <div className="env-selector-wrap">
        <Sun size={15} className="env-icon" />
        <select
          value={envPreset}
          onChange={(e) => {
            playClickSound();
            setEnvPreset(e.target.value);
          }}
          className="env-select"
        >
          {environmentPresets.map((env) => (
            <option key={env.id} value={env.id}>
              {env.name}
            </option>
          ))}
        </select>
      </div>

      {/* STUDIO LIGHTING CONTROLS */}
      <button
        className={`toolbar-btn ${isLightingOpen ? 'active' : ''}`}
        onClick={() => {
          playClickSound();
          if (onToggleLighting) onToggleLighting();
        }}
        title="Studio Lighting & Shadow Controls"
      >
        <SunMedium size={15} />
        <span>Lighting Studio</span>
      </button>

      {/* CINEMATIC POST-PROCESSING FX */}
      <button
        className={`toolbar-btn ${isPostOpen ? 'active' : ''}`}
        onClick={() => {
          playClickSound();
          if (onTogglePost) onTogglePost();
        }}
        title="Cinematic Post-Processing FX (Bloom, Vignette)"
      >
        <Sparkles size={15} />
        <span>VFX Studio</span>
      </button>

      {/* ASSEMBLY ANIMATOR TOUR */}
      <button
        className={`toolbar-btn ${isAssemblyOpen ? 'active' : ''}`}
        onClick={() => {
          playClickSound();
          if (onToggleAssembly) onToggleAssembly();
        }}
        title="3D Part Assembly Tour Animation"
      >
        <PlayCircle size={15} />
        <span>Assembly Tour</span>
      </button>

      {/* AR AUGMENTED REALITY LAUNCHER */}
      <button
        className="toolbar-btn"
        onClick={() => {
          playClickSound();
          if (onOpenAR) onOpenAR();
        }}
        title="View Product in Augmented Reality (AR)"
      >
        <Smartphone size={15} />
        <span>View in AR</span>
      </button>

      {/* SHARE COLORWAY PRESET */}
      <button
        className="toolbar-btn"
        onClick={() => {
          playClickSound();
          if (onOpenPreset) onOpenPreset();
        }}
        title="Share & Export Colorway Preset"
      >
        <Share2 size={15} />
        <span>Share Preset</span>
      </button>

      {/* SCREENSHOT SNAPSHOT EXPORTER */}
      <button className="toolbar-btn primary" onClick={onTakeSnapshot} title="Capture 3D Snapshot (PNG)">
        <Camera size={15} />
        <span>Snapshot</span>
      </button>

      {/* SOUND TOGGLE */}
      <button
        className="toolbar-btn icon-only"
        onClick={() => {
          const muted = soundFX.toggleMute();
          setIsMuted(muted);
        }}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  );
}
