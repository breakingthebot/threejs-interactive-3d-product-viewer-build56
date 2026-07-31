// src/components/StudioLighting.jsx
// Studio Lighting Control Panel for Light Angles, Intensities, and Shadow Softness.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sliders, X, Sparkles, Compass, Eye } from 'lucide-react';
import { playClickSound, playToggleSound } from '../utils/soundFX';
import './StudioLighting.css';

/**
 * Renders the studio lighting control panel.
 * @param {Object} props
 * @param {boolean} props.isOpen - Panel open state.
 * @param {Function} props.onClose - Close panel handler.
 * @param {Object} props.lightingProps - State object for keyLightIntensity, ambientIntensity, azimuth, elevation.
 * @param {Function} props.setLightingProps - State updater function.
 */
export function StudioLighting({ isOpen, onClose, lightingProps, setLightingProps }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="lighting-panel"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <div className="lp-header">
          <div className="lp-title-group">
            <Sun size={18} className="lp-icon" />
            <h3 className="lp-title">Studio Lighting &amp; Shadow Controls</h3>
          </div>
          <button className="lp-close-btn" onClick={() => { playClickSound(); onClose(); }}>
            <X size={16} />
          </button>
        </div>

        <div className="lp-body">
          {/* KEY LIGHT INTENSITY */}
          <div className="lp-section">
            <div className="lp-label-row">
              <span className="lp-label-text">Key Light Intensity</span>
              <span className="lp-value">{lightingProps.keyLightIntensity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={lightingProps.keyLightIntensity}
              onChange={(e) =>
                setLightingProps({ ...lightingProps, keyLightIntensity: parseFloat(e.target.value) })
              }
              className="lp-slider"
            />
          </div>

          {/* AMBIENT LIGHT INTENSITY */}
          <div className="lp-section">
            <div className="lp-label-row">
              <span className="lp-label-text">Ambient Fill Light</span>
              <span className="lp-value">{lightingProps.ambientIntensity.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={lightingProps.ambientIntensity}
              onChange={(e) =>
                setLightingProps({ ...lightingProps, ambientIntensity: parseFloat(e.target.value) })
              }
              className="lp-slider"
            />
          </div>

          {/* LIGHT AZIMUTH ANGLE */}
          <div className="lp-section">
            <div className="lp-label-row">
              <span className="lp-label-text">
                <Compass size={13} /> Light Azimuth Angle ({lightingProps.azimuth}°)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={lightingProps.azimuth}
              onChange={(e) =>
                setLightingProps({ ...lightingProps, azimuth: parseInt(e.target.value) })
              }
              className="lp-slider"
            />
          </div>

          {/* LIGHT ELEVATION ANGLE */}
          <div className="lp-section">
            <div className="lp-label-row">
              <span className="lp-label-text">Light Elevation ({lightingProps.elevation}°)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="2"
              value={lightingProps.elevation}
              onChange={(e) =>
                setLightingProps({ ...lightingProps, elevation: parseInt(e.target.value) })
              }
              className="lp-slider"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
