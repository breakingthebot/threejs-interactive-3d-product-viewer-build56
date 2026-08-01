// src/components/Toolbar.jsx
// Floating controls toolbar for Auto-Rotate, Lighting Environment, and Screenshot Export.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Sun, SunMedium, Camera, Volume2, VolumeX, Smartphone, Share2, PlayCircle, Sparkles, Box, Ruler, Download, FileText, Layers } from 'lucide-react';
import { environmentPresets } from '../data/productsData';
import { playClickSound, playToggleSound, soundFX } from '../utils/soundFX';
import { spatialAudio } from '../utils/spatialAudioEngine';
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
 * @param {Function} props.onTogglePolycount - Polycount diagnostic panel toggle handler.
 * @param {boolean} props.isPolycountOpen - Polycount diagnostic open state.
 * @param {Function} props.onToggleRuler - 3D ruler toggle handler.
 * @param {boolean} props.showRuler - 3D ruler visible state.
 * @param {Function} props.onOpen4KRender - 4K scene exporter modal trigger handler.
 * @param {Function} props.onOpenBOM - BOM sheet modal trigger handler.
 * @param {Function} props.onOpenHDR - HDR studio modal trigger handler.
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
  onTogglePolycount,
  isPolycountOpen,
  onToggleRuler,
  showRuler,
  onOpen4KRender,
  onOpenBOM,
  onOpenHDR,
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

      {/* CUSTOM HDR MAP UPLOADER */}
      <button
        className="toolbar-btn"
        onClick={() => {
          playClickSound();
          if (onOpenHDR) onOpenHDR();
        }}
        title="Upload Custom HDR Environment Map"
      >
        <Sun size={15} />
        <span>HDR Studio</span>
      </button>

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

      {/* 3D MEASUREMENT RULER */}
      <button
        className={`toolbar-btn ${showRuler ? 'active' : ''}`}
        onClick={() => {
          playToggleSound();
          if (onToggleRuler) onToggleRuler();
        }}
        title="Toggle Interactive 3D Measurement Ruler Lines"
      >
        <Ruler size={15} />
        <span>3D Ruler</span>
      </button>

      {/* POLYCOUNT & WIREFRAME DIAGNOSTIC */}
      <button
        className={`toolbar-btn ${isPolycountOpen ? 'active' : ''}`}
        onClick={() => {
          playClickSound();
          if (onTogglePolycount) onTogglePolycount();
        }}
        title="Polycount & Wireframe Topology Diagnostic"
      >
        <Box size={15} />
        <span>Polycount</span>
      </button>

      {/* BILL OF MATERIALS (BOM) SHEET */}
      <button
        className="toolbar-btn"
        onClick={() => {
          playClickSound();
          if (onOpenBOM) onOpenBOM();
        }}
        title="Inspect Bill of Materials (BOM) Parts Catalog"
      >
        <FileText size={15} />
        <span>BOM Sheet</span>
      </button>

      {/* 4K STUDIO SCENE RENDERER */}
      <button
        className="toolbar-btn"
        onClick={() => {
          playClickSound();
          if (onOpen4KRender) onOpen4KRender();
        }}
        title="Export High-Resolution 4K Studio Render"
      >
        <Download size={15} />
        <span>4K Render</span>
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

      {/* SOUND & SPATIAL AUDIO TOGGLE */}
      <button
        className="toolbar-btn icon-only"
        onClick={() => {
          spatialAudio.toggleMute();
          const muted = soundFX.toggleMute();
          setIsMuted(muted);
        }}
        title={isMuted ? 'Unmute Audio & Spatial 3D Panner' : 'Mute Audio & Spatial 3D Panner'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  );
}
