// src/components/ConfiguratorExporter.jsx
// 3D Material Colorway Preset Manager & URL Hash Serializer Modal.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-07-31

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check, Bookmark, Download, Sparkles, Code } from 'lucide-react';
import { playClickSound, playModalOpenSound } from '../utils/soundFX';
import './ConfiguratorExporter.css';

/**
 * Renders Colorway Configurator & Deep-Link Preset Exporter Modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state.
 * @param {Function} props.onClose - Modal close handler.
 * @param {Object} props.product - Selected product data.
 * @param {Object} props.materialProps - Current material state.
 * @param {Function} props.onApplyPreset - Preset application callback.
 */
export function ConfiguratorExporter({ isOpen, onClose, product, materialProps, onApplyPreset }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [presetName, setPresetName] = useState('Custom Cyber Edition');

  if (!isOpen) return null;

  // Construct URL deep-link hash payload encoding active state
  const configPayload = {
    pId: product.id,
    hex: materialProps.hex,
    rough: materialProps.roughness,
    metal: materialProps.metalness,
    coat: materialProps.clearcoat,
    name: presetName
  };

  const encodedState = btoa(JSON.stringify(configPayload));
  const shareableUrl = `${window.location.origin}${window.location.pathname}#preset=${encodedState}`;
  const jsonOutput = JSON.stringify(configPayload, null, 2);

  const handleCopyLink = () => {
    playClickSound();
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyJson = () => {
    playClickSound();
    navigator.clipboard.writeText(jsonOutput);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="preset-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="preset-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pm-header">
            <div className="pm-title-group">
              <span className="pm-kicker">3D State Serialization</span>
              <h2 className="pm-title">
                <Share2 size={20} className="pm-icon" /> Colorway Configurator &amp; Preset Exporter
              </h2>
            </div>
            <button className="pm-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="pm-body">
            {/* PRESET NAME INPUT */}
            <div className="pm-section">
              <label className="pm-label">Preset Name</label>
              <input
                type="text"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="pm-input"
                placeholder="Enter custom preset title..."
              />
            </div>

            {/* DEEP LINK URL COPY */}
            <div className="pm-section">
              <label className="pm-label">Shareable Deep-Link URL</label>
              <div className="pm-copy-row">
                <input type="text" readOnly value={shareableUrl} className="pm-input read-only" />
                <button className="pm-copy-btn" onClick={handleCopyLink}>
                  {copiedLink ? <Check size={16} className="green" /> : <Copy size={16} />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* JSON CONFIGURATION SCHEMA */}
            <div className="pm-section">
              <div className="pm-label-row">
                <label className="pm-label">
                  <Code size={13} /> JSON Material Payload
                </label>
                <button className="pm-text-btn" onClick={handleCopyJson}>
                  {copiedJson ? 'JSON Copied' : 'Copy JSON'}
                </button>
              </div>
              <pre className="pm-json-box">{jsonOutput}</pre>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
