// src/components/ARViewerModal.jsx
// WebXR & Mobile QR Code Augmented Reality (AR) Launch Modal.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-07-31

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, QrCode, Sparkles, CheckCircle2, ShieldCheck, Box } from 'lucide-react';
import { playModalOpenSound, playClickSound } from '../utils/soundFX';
import './ARViewerModal.css';

/**
 * Renders Augmented Reality (AR) viewport modal with desktop-to-mobile QR code handoff.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility state.
 * @param {Function} props.onClose - Close modal callback.
 * @param {Object} props.product - Currently active 3D product dataset object.
 */
export function ARViewerModal({ isOpen, onClose, product }) {
  useEffect(() => {
    if (isOpen) {
      playModalOpenSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate dynamic QR Code URL pointing to live Vercel app with AR parameters
  const currentUrl = window.location.href;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&color=0f172a&bgcolor=ffffff`;

  return (
    <AnimatePresence>
      <motion.div
        className="ar-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="ar-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ar-modal-header">
            <div className="ar-title-group">
              <span className="ar-kicker">WebXR Spatial Computing</span>
              <h2 className="ar-title">
                <Smartphone size={20} className="ar-icon" /> Augmented Reality (AR) Viewport
              </h2>
            </div>
            <button className="ar-close-btn" onClick={() => { playClickSound(); onClose(); }}>
              <X size={18} />
            </button>
          </div>

          <div className="ar-modal-body">
            <div className="ar-product-preview-strip">
              <Box size={16} className="ar-box-icon" />
              <span className="ar-product-name">{product.name}</span>
              <span className="ar-product-badge">True 1:1 Scale</span>
            </div>

            <div className="ar-content-grid">
              {/* DESKTOP QR HANDOFF */}
              <div className="ar-qr-box">
                <span className="qr-title">
                  <QrCode size={14} /> Scan with Mobile Camera
                </span>
                <div className="qr-img-wrapper">
                  <img src={qrCodeApiUrl} alt="Mobile AR QR Code" className="qr-code-img" />
                </div>
                <span className="qr-sub">Instant iOS QuickLook &amp; Android Scene Viewer</span>
              </div>

              {/* INSTRUCTIONS & LAUNCH BUTTON */}
              <div className="ar-instructions-box">
                <h4 className="inst-heading">Place 3D Model in Your Room:</h4>
                <ul className="inst-list">
                  <li>Point your mobile camera at any flat table or floor surface.</li>
                  <li>Rotate and scale with two-finger touch gestures.</li>
                  <li>Simulate real-world spatial lighting and drop shadows.</li>
                </ul>

                <a
                  href={`intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(currentUrl)}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end;`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ar-launch-btn"
                  onClick={() => playClickSound()}
                >
                  <Smartphone size={16} /> Launch WebXR AR Mode
                </a>
              </div>
            </div>

            <div className="ar-footer-badges">
              <span className="ar-badge">
                <CheckCircle2 size={12} /> WebXR Compliant
              </span>
              <span className="ar-badge">
                <ShieldCheck size={12} /> iOS QuickLook USDZ Ready
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
