// src/components/PostProcessingStudio.jsx
// WebGL Post-Processing Shaders Studio (Bloom, Vignette, Chromatic Aberration).
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sliders, X, Eye, Aperture, Layers } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './PostProcessingStudio.css';

/**
 * Renders the WebGL post-processing shaders control panel.
 * @param {Object} props
 * @param {boolean} props.isOpen - Panel open state.
 * @param {Function} props.onClose - Close panel handler.
 * @param {Object} props.postProps - Post-processing settings state.
 * @param {Function} props.setPostProps - State updater function.
 */
export function PostProcessingStudio({ isOpen, onClose, postProps, setPostProps }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="post-panel"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <div className="pp-header">
          <div className="pp-title-group">
            <Sparkles size={18} className="pp-icon" />
            <h3 className="pp-title">Cinematic Post-Processing FX Studio</h3>
          </div>
          <button className="pp-close-btn" onClick={() => { playClickSound(); onClose(); }}>
            <X size={16} />
          </button>
        </div>

        <div className="pp-body">
          {/* BLOOM INTENSITY */}
          <div className="pp-section">
            <div className="pp-label-row">
              <span className="pp-label-text">
                <Sparkles size={13} /> Screen-Space Bloom Glow
              </span>
              <span className="pp-value">{postProps.bloomIntensity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="2.5"
              step="0.1"
              value={postProps.bloomIntensity}
              onChange={(e) =>
                setPostProps({ ...postProps, bloomIntensity: parseFloat(e.target.value) })
              }
              className="pp-slider"
            />
          </div>

          {/* VIGNETTE DARKNESS */}
          <div className="pp-section">
            <div className="pp-label-row">
              <span className="pp-label-text">
                <Aperture size={13} /> Cinematic Vignette Border
              </span>
              <span className="pp-value">{Math.round(postProps.vignetteDarkness * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={postProps.vignetteDarkness}
              onChange={(e) =>
                setPostProps({ ...postProps, vignetteDarkness: parseFloat(e.target.value) })
              }
              className="pp-slider"
            />
          </div>

          {/* CHROMATIC ABERRATION */}
          <div className="pp-section">
            <div className="pp-label-row">
              <span className="pp-label-text">
                <Eye size={13} /> Chromatic Aberration Fringe
              </span>
              <span className="pp-value">{Math.round(postProps.chromaticAberration * 1000)}ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.008"
              step="0.0005"
              value={postProps.chromaticAberration}
              onChange={(e) =>
                setPostProps({ ...postProps, chromaticAberration: parseFloat(e.target.value) })
              }
              className="pp-slider"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
