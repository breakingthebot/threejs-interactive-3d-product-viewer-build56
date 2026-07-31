// src/components/MaterialInspector.jsx
// Material & Texture Customizer Panel for Base Color, Roughness, Metalness & Wireframe.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sliders, Eye, Sparkles, Layers, Check } from 'lucide-react';
import { playMaterialSound, playToggleSound } from '../utils/soundFX';
import './MaterialInspector.css';

/**
 * Renders the material inspector panel.
 * @param {Object} props
 * @param {Object} props.product - Selected product data object.
 * @param {Object} props.materialProps - Material properties state.
 * @param {Function} props.setMaterialProps - Material properties updater function.
 */
export function MaterialInspector({ product, materialProps, setMaterialProps }) {
  const handleColorChange = (preset) => {
    playMaterialSound();
    setMaterialProps({
      ...materialProps,
      hex: preset.hex,
      roughness: preset.roughness,
      metalness: preset.metalness,
      clearcoat: preset.clearcoat
    });
  };

  return (
    <motion.div
      className="material-inspector-panel"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="inspector-header">
        <Sliders size={18} className="inspector-icon" />
        <h3 className="inspector-title">Material &amp; Finish Inspector</h3>
      </div>

      {/* COLOR PRESETS SWATCHES */}
      <div className="inspector-section">
        <label className="section-label">
          <Palette size={14} /> Finish Presets &amp; Albedo Color
        </label>
        <div className="swatches-grid">
          {product.colorPresets.map((preset) => {
            const isSelected = materialProps.hex === preset.hex;
            return (
              <button
                key={preset.id}
                className={`swatch-btn ${isSelected ? 'selected' : ''}`}
                style={{ backgroundColor: preset.hex }}
                onClick={() => handleColorChange(preset)}
                title={preset.name}
              >
                {isSelected && <Check size={14} className="swatch-check" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ROUGHNESS SLIDER */}
      <div className="inspector-section">
        <div className="slider-label-row">
          <span className="slider-title">Micro-Surface Roughness</span>
          <span className="slider-value">{Math.round((materialProps.roughness ?? 0.25) * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={materialProps.roughness ?? 0.25}
          onChange={(e) =>
            setMaterialProps({ ...materialProps, roughness: parseFloat(e.target.value) })
          }
          className="inspector-slider"
        />
      </div>

      {/* METALNESS SLIDER */}
      <div className="inspector-section">
        <div className="slider-label-row">
          <span className="slider-title">Metallic Reflectivity</span>
          <span className="slider-value">{Math.round((materialProps.metalness ?? 0.85) * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={materialProps.metalness ?? 0.85}
          onChange={(e) =>
            setMaterialProps({ ...materialProps, metalness: parseFloat(e.target.value) })
          }
          className="inspector-slider"
        />
      </div>

      {/* CLEARCOAT SLIDER */}
      <div className="inspector-section">
        <div className="slider-label-row">
          <span className="slider-title">Gloss Clearcoat Layer</span>
          <span className="slider-value">{Math.round((materialProps.clearcoat ?? 0.4) * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={materialProps.clearcoat ?? 0.4}
          onChange={(e) =>
            setMaterialProps({ ...materialProps, clearcoat: parseFloat(e.target.value) })
          }
          className="inspector-slider"
        />
      </div>

      {/* WIREFRAME TOGGLE */}
      <div className="inspector-section toggle-row">
        <span className="toggle-title">
          <Layers size={14} /> Wireframe Mesh View
        </span>
        <button
          className={`toggle-switch ${materialProps.wireframe ? 'active' : ''}`}
          onClick={() => {
            playToggleSound();
            setMaterialProps({ ...materialProps, wireframe: !materialProps.wireframe });
          }}
        >
          <span className="toggle-thumb" />
        </button>
      </div>
    </motion.div>
  );
}
