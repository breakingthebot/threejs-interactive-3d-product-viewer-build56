// src/components/Toolbar.jsx
// Ultra-Clean Categorized Floating Viewport Toolbar with Collapsible Tools Drawer.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCw, Sun, SunMedium, Camera, Volume2, VolumeX, Smartphone, Share2,
  PlayCircle, Sparkles, Box, Ruler, Download, FileText, Flame, Activity, Video, Sliders, ChevronUp, X
} from 'lucide-react';
import { environmentPresets } from '../data/productsData';
import { playClickSound, playToggleSound, soundFX } from '../utils/soundFX';
import { spatialAudio } from '../utils/spatialAudioEngine';
import './Toolbar.css';

/**
 * Renders streamlined categorized floating viewport control toolbar.
 * @param {Object} props
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
  onToggleThermal,
  showThermal,
  onToggleStats,
  showStats,
  onOpen4KRender,
  onOpenTurntable,
  onOpenBOM,
  onOpenHDR,
  onOpenPreset,
  isMuted,
  setIsMuted
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('view'); // 'view' | 'studio' | 'export'

  return (
    <div className="toolbar-root-wrapper">
      {/* EXPANDABLE TOOLS DRAWER POPOVER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="tools-drawer-popover"
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* CATEGORY TAB STRIP */}
            <div className="td-tabs">
              <button
                className={`td-tab ${activeTab === 'view' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setActiveTab('view'); }}
              >
                View &amp; Mesh
              </button>
              <button
                className={`td-tab ${activeTab === 'studio' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setActiveTab('studio'); }}
              >
                Lighting &amp; VFX
              </button>
              <button
                className={`td-tab ${activeTab === 'export' ? 'active' : ''}`}
                onClick={() => { playClickSound(); setActiveTab('export'); }}
              >
                CAD &amp; Export
              </button>
              <button
                className="td-close-btn"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={14} />
              </button>
            </div>

            {/* TAB CONTENT GRID */}
            <div className="td-grid">
              {activeTab === 'view' && (
                <>
                  <button
                    className={`td-action-btn ${showRuler ? 'active' : ''}`}
                    onClick={() => { playToggleSound(); if (onToggleRuler) onToggleRuler(); }}
                  >
                    <Ruler size={15} /> <span>3D Ruler</span>
                  </button>
                  <button
                    className={`td-action-btn ${showThermal ? 'active' : ''}`}
                    onClick={() => { playToggleSound(); if (onToggleThermal) onToggleThermal(); }}
                  >
                    <Flame size={15} /> <span>Thermal View</span>
                  </button>
                  <button
                    className={`td-action-btn ${showStats ? 'active' : ''}`}
                    onClick={() => { playToggleSound(); if (onToggleStats) onToggleStats(); }}
                  >
                    <Activity size={15} /> <span>Performance Stats</span>
                  </button>
                  <button
                    className={`td-action-btn ${isPolycountOpen ? 'active' : ''}`}
                    onClick={() => { playClickSound(); if (onTogglePolycount) onTogglePolycount(); }}
                  >
                    <Box size={15} /> <span>Polycount</span>
                  </button>
                  <button
                    className={`td-action-btn ${isAssemblyOpen ? 'active' : ''}`}
                    onClick={() => { playClickSound(); if (onToggleAssembly) onToggleAssembly(); }}
                  >
                    <PlayCircle size={15} /> <span>Assembly Tour</span>
                  </button>
                </>
              )}

              {activeTab === 'studio' && (
                <>
                  <div className="td-env-select-wrap">
                    <Sun size={15} />
                    <select
                      value={envPreset}
                      onChange={(e) => { playClickSound(); setEnvPreset(e.target.value); }}
                    >
                      {environmentPresets.map((env) => (
                        <option key={env.id} value={env.id}>{env.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpenHDR) onOpenHDR(); }}
                  >
                    <Sun size={15} /> <span>HDR Studio</span>
                  </button>
                  <button
                    className={`td-action-btn ${isLightingOpen ? 'active' : ''}`}
                    onClick={() => { playClickSound(); if (onToggleLighting) onToggleLighting(); }}
                  >
                    <SunMedium size={15} /> <span>Lighting Studio</span>
                  </button>
                  <button
                    className={`td-action-btn ${isPostOpen ? 'active' : ''}`}
                    onClick={() => { playClickSound(); if (onTogglePost) onTogglePost(); }}
                  >
                    <Sparkles size={15} /> <span>VFX Studio</span>
                  </button>
                </>
              )}

              {activeTab === 'export' && (
                <>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpenBOM) onOpenBOM(); }}
                  >
                    <FileText size={15} /> <span>BOM Sheet</span>
                  </button>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpen4KRender) onOpen4KRender(); }}
                  >
                    <Download size={15} /> <span>4K Render</span>
                  </button>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpenTurntable) onOpenTurntable(); }}
                  >
                    <Video size={15} /> <span>360 Video Studio</span>
                  </button>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpenAR) onOpenAR(); }}
                  >
                    <Smartphone size={15} /> <span>View in AR</span>
                  </button>
                  <button
                    className="td-action-btn"
                    onClick={() => { playClickSound(); if (onOpenPreset) onOpenPreset(); }}
                  >
                    <Share2 size={15} /> <span>Share Preset</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STREAMLINED PRIMARY FLOATING TOOLBAR */}
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

        {/* EXPANDABLE TOOLS MENU DRAWER BUTTON */}
        <button
          className={`toolbar-btn ${isDrawerOpen ? 'active' : ''}`}
          onClick={() => {
            playClickSound();
            setIsDrawerOpen(!isDrawerOpen);
          }}
          title="Open Studio Tools & CAD Drawer"
        >
          <Sliders size={15} />
          <span>Studio Tools</span>
          <ChevronUp size={14} className={`chevron-icon ${isDrawerOpen ? 'open' : ''}`} />
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
    </div>
  );
}
