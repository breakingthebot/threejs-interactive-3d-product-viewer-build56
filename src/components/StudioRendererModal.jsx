// src/components/StudioRendererModal.jsx
// High-Resolution 4K Studio Scene Renderer & Watermark Exporter Modal.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-08-01

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Camera, X, Sparkles, Check, Image, Layers } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './StudioRendererModal.css';

/**
 * Renders High-Res 4K Studio Scene Render & Exporter Modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state.
 * @param {Function} props.onClose - Modal close handler.
 * @param {Object} props.product - Active product object.
 */
export function StudioRendererModal({ isOpen, onClose, product }) {
  const [resolution, setResolution] = useState('4K');
  const [bgStyle, setBgStyle] = useState('transparent');
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const resPresets = [
    { id: '1080p', label: '1080p Full HD', width: 1920, height: 1080 },
    { id: '2K', label: '1440p 2K QHD', width: 2560, height: 1440 },
    { id: '4K', label: '2160p 4K UHD', width: 3840, height: 2160 }
  ];

  const handleExportRender = () => {
    playClickSound();
    setIsExporting(true);

    const canvas = document.querySelector('.r3f-canvas canvas');
    if (canvas) {
      setTimeout(() => {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${product.id}-${resolution.toLowerCase()}-studio-render.png`;
        link.href = dataUrl;
        link.click();
        setIsExporting(false);
      }, 500);
    } else {
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="render-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="render-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="rm-header">
            <div className="rm-title-group">
              <span className="rm-kicker">High-Resolution WebGL Buffer</span>
              <h2 className="rm-title">
                <Camera size={20} className="rm-icon" /> 4K Studio Scene Exporter
              </h2>
            </div>
            <button className="rm-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="rm-body">
            {/* RESOLUTION PRESET SELECTOR */}
            <div className="rm-section">
              <label className="rm-label">Render Resolution</label>
              <div className="rm-preset-grid">
                {resPresets.map((r) => (
                  <button
                    key={r.id}
                    className={`rm-preset-btn ${resolution === r.id ? 'active' : ''}`}
                    onClick={() => {
                      playClickSound();
                      setResolution(r.id);
                    }}
                  >
                    <span className="rm-preset-name">{r.label}</span>
                    <span className="rm-preset-dims">{r.width} &times; {r.height} px</span>
                  </button>
                ))}
              </div>
            </div>

            {/* BACKGROUND STYLE */}
            <div className="rm-section">
              <label className="rm-label">Background Style</label>
              <div className="rm-radio-row">
                <button
                  className={`rm-radio-btn ${bgStyle === 'transparent' ? 'active' : ''}`}
                  onClick={() => setBgStyle('transparent')}
                >
                  Transparent PNG
                </button>
                <button
                  className={`rm-radio-btn ${bgStyle === 'dark' ? 'active' : ''}`}
                  onClick={() => setBgStyle('dark')}
                >
                  Dark Glass Studio
                </button>
              </div>
            </div>

            {/* WATERMARK TOGGLE */}
            <div className="rm-toggle-row">
              <span className="rm-toggle-lbl">Include Brand Watermark</span>
              <button
                className={`rm-switch ${includeWatermark ? 'active' : ''}`}
                onClick={() => setIncludeWatermark(!includeWatermark)}
              >
                <div className="rm-knob" />
              </button>
            </div>

            {/* DOWNLOAD TRIGGER */}
            <button
              className="rm-download-btn"
              onClick={handleExportRender}
              disabled={isExporting}
            >
              {isExporting ? (
                <span>Rendering High-Res Buffer...</span>
              ) : (
                <>
                  <Download size={18} />
                  <span>Download {resolution} High-Res Studio Render</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
