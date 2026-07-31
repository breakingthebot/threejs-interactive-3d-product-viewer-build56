// src/components/HotspotModal.jsx
// Technical Callout & 3D Hotspot Specification Modal.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, ShieldCheck, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import { playModalOpenSound } from '../utils/soundFX';
import './HotspotModal.css';

/**
 * Renders technical detail modal when a 3D hotspot is selected.
 * @param {Object} props
 * @param {Object|null} props.hotspot - Selected hotspot object.
 * @param {Function} props.onClose - Close modal callback handler.
 */
export function HotspotModal({ hotspot, onClose }) {
  useEffect(() => {
    if (hotspot) {
      playModalOpenSound();
    }
  }, [hotspot]);

  if (!hotspot) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="hotspot-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="hotspot-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hm-header">
            <div className="hm-title-group">
              <span className="hm-kicker">3D Hotspot Feature Inspector</span>
              <h2 className="hm-title">{hotspot.title}</h2>
            </div>
            <button className="hm-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="hm-body">
            <p className="hm-details">{hotspot.details}</p>

            <div className="hm-spec-box">
              <div className="hm-spec-item">
                <span className="hm-spec-label">{hotspot.specKey}</span>
                <span className="hm-spec-val">{hotspot.specValue}</span>
              </div>
            </div>

            <div className="hm-badge-strip">
              <span className="hm-badge green">
                <CheckCircle2 size={12} /> Verified Hardware Metric
              </span>
              <span className="hm-badge blue">
                <ShieldCheck size={12} /> Military Grade Spec
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
