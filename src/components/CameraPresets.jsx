// src/components/CameraPresets.jsx
// Floating Camera Viewport Bookmark Presets (Front, Top, Side, Close-Up, Isometric).
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-08-01

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, ArrowUp, ArrowRight, Maximize2, Compass } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './CameraPresets.css';

export const cameraPresetsList = [
  { id: 'isometric', label: 'Isometric 3D', icon: Compass, target: [0, 0, 5.5], lookAt: [0, 0, 0] },
  { id: 'front', label: 'Front View', icon: Eye, target: [0, 0, 4.8], lookAt: [0, 0, 0] },
  { id: 'top', label: 'Top View', icon: ArrowUp, target: [0, 4.8, 0.01], lookAt: [0, 0, 0] },
  { id: 'side', label: 'Side Profile', icon: ArrowRight, target: [4.8, 0, 0], lookAt: [0, 0, 0] },
  { id: 'macro', label: 'Close-Up Macro', icon: Maximize2, target: [0, 0, 2.8], lookAt: [0, 0, 0] }
];

/**
 * Renders floating camera view angle presets bar.
 * @param {Object} props
 * @param {string} props.activeCameraPreset - Selected preset ID.
 * @param {Function} props.onSelectPreset - Camera preset selection callback.
 */
export function CameraPresets({ activeCameraPreset, onSelectPreset }) {
  return (
    <motion.div
      className="camera-presets-strip"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="cp-header">
        <Camera size={13} className="cp-icon" />
        <span className="cp-title">Camera Angles</span>
      </div>

      <div className="cp-buttons-group">
        {cameraPresetsList.map((preset) => {
          const Icon = preset.icon;
          const isActive = activeCameraPreset === preset.id;
          return (
            <button
              key={preset.id}
              className={`cp-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                onSelectPreset(preset);
              }}
              title={`Switch to ${preset.label}`}
            >
              <Icon size={13} />
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
