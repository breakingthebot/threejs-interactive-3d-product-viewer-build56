// src/components/HDRStudio.jsx
// Custom HDR Environment Map Drag-and-Drop Ingestion Studio.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-08-01

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Upload, X, Check, Image, Trash2, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './HDRStudio.css';

/**
 * Renders Custom HDR Environment Map Ingestion Modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state.
 * @param {Function} props.onClose - Close modal handler.
 * @param {string|null} props.customHDRUrl - Active custom HDR file URL.
 * @param {Function} props.setCustomHDRUrl - Custom HDR URL updater.
 */
export function HDRStudio({ isOpen, onClose, customHDRUrl, setCustomHDRUrl }) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (file) => {
    if (file) {
      playClickSound();
      const objectUrl = URL.createObjectURL(file);
      setCustomHDRUrl(objectUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="hdr-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="hdr-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hs-header">
            <div className="hs-title-group">
              <span className="hs-kicker">Image-Based Lighting (IBL)</span>
              <h2 className="hs-title">
                <Sun size={20} className="hs-icon" /> Custom HDR Environment Ingestor
              </h2>
            </div>
            <button className="hs-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="hs-body">
            {/* DRAG AND DROP ZONE */}
            <div
              className={`hs-dropzone ${dragActive ? 'active' : ''}`}
              onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              onDragOver={(e) => { e.preventDefault(); }}
              onDrop={handleDrop}
            >
              <Upload size={32} className="hs-upload-icon" />
              <span className="hs-drop-heading">Drag &amp; Drop Custom HDR / EXR Environment Map</span>
              <span className="hs-drop-sub">Supports .hdr, .exr, .jpg high-dynamic-range panoramas</span>

              <label className="hs-browse-btn">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  accept=".hdr,.exr,image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            {/* ACTIVE HDR PREVIEW */}
            {customHDRUrl && (
              <div className="hs-active-card">
                <div className="hs-active-info">
                  <Check size={16} className="green-icon" />
                  <span>Custom HDR Environment Map Loaded</span>
                </div>
                <button
                  className="hs-remove-btn"
                  onClick={() => {
                    playClickSound();
                    setCustomHDRUrl(null);
                  }}
                >
                  <Trash2 size={15} />
                  <span>Reset Default Preset</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
