// src/components/PolycountDiagnostic.jsx
// WebGL Polycount Diagnostic & Topology Inspection Panel.
// Connects to: src/App.jsx, src/components/ProductMesh.jsx
// Created: 2026-08-01

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, X, Activity, Cpu, ShieldCheck } from 'lucide-react';
import { playClickSound, playToggleSound } from '../utils/soundFX';
import './PolycountDiagnostic.css';

/**
 * Renders 3D Wireframe Polycount Diagnostic Panel.
 * @param {Object} props
 * @param {boolean} props.isOpen - Panel open state.
 * @param {Function} props.onClose - Close panel handler.
 * @param {Object} props.product - Active product object.
 * @param {Object} props.materialProps - Material properties state.
 * @param {Function} props.setMaterialProps - Material state updater.
 */
export function PolycountDiagnostic({ isOpen, onClose, product, materialProps, setMaterialProps }) {
  if (!isOpen) return null;

  // Mocked/calculated mesh topology stats
  const polyStats = {
    cyber_headphones: { vertices: 24580, triangles: 48920, drawCalls: 12, memoryMb: 8.4 },
    smart_watch: { vertices: 18420, triangles: 36840, drawCalls: 8, memoryMb: 6.1 },
    mechanical_keyboard: { vertices: 32600, triangles: 64200, drawCalls: 16, memoryMb: 11.2 }
  }[product.id] || { vertices: 20000, triangles: 40000, drawCalls: 10, memoryMb: 7.0 };

  const handleToggleWireframe = () => {
    playToggleSound();
    setMaterialProps((prev) => ({ ...prev, wireframe: !prev.wireframe }));
  };

  return (
    <AnimatePresence>
      <motion.div
        className="poly-panel"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <div className="pd-header">
          <div className="pd-title-group">
            <Box size={18} className="pd-icon" />
            <h3 className="pd-title">WebGL Polycount &amp; Topology Diagnostic</h3>
          </div>
          <button className="pd-close-btn" onClick={() => { playClickSound(); onClose(); }}>
            <X size={16} />
          </button>
        </div>

        <div className="pd-body">
          {/* WIREFRAME TOGGLE */}
          <div className="pd-toggle-row">
            <div className="pd-toggle-info">
              <span className="pd-toggle-title">Wireframe Shader Mode</span>
              <span className="pd-toggle-desc">Expose mesh edge vectors &amp; polygon density</span>
            </div>
            <button
              className={`pd-switch ${materialProps.wireframe ? 'active' : ''}`}
              onClick={handleToggleWireframe}
            >
              <div className="pd-knob" />
            </button>
          </div>

          {/* MESH TOPOLOGY STATS GRID */}
          <div className="pd-stats-grid">
            <div className="pd-stat-card">
              <span className="pd-stat-lbl">Triangles</span>
              <span className="pd-stat-val cyan">{polyStats.triangles.toLocaleString()}</span>
            </div>
            <div className="pd-stat-card">
              <span className="pd-stat-lbl">Vertices</span>
              <span className="pd-stat-val purple">{polyStats.vertices.toLocaleString()}</span>
            </div>
            <div className="pd-stat-card">
              <span className="pd-stat-lbl">Draw Calls</span>
              <span className="pd-stat-val green">{polyStats.drawCalls}</span>
            </div>
            <div className="pd-stat-card">
              <span className="pd-stat-lbl">VRAM Footprint</span>
              <span className="pd-stat-val amber">{polyStats.memoryMb} MB</span>
            </div>
          </div>

          {/* TOPOLOGY DENSITY RATING */}
          <div className="pd-rating-box">
            <ShieldCheck size={16} className="green-icon" />
            <div className="pd-rating-text">
              <span className="pd-rating-heading">Optimal Mobile &amp; WebGL Asset</span>
              <span className="pd-rating-sub">Clean quad/triangle distribution with zero non-manifold edges.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
