// src/components/Navbar.jsx
// Floating Glassmorphic Top Navbar with product model switcher and GitHub repo link.
// Connects to: src/App.jsx, src/data/productsData.js
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Box, ExternalLink, Sparkles, Move3d } from 'lucide-react';
import { productsList } from '../data/productsData';
import { playClickSound } from '../utils/soundFX';
import './Navbar.css';

/**
 * Renders top floating navigation bar.
 * @param {Object} props
 * @param {Object} props.product - Active selected product data.
 * @param {Function} props.setProduct - Product updater.
 */
export function Navbar({ product, setProduct }) {
  return (
    <motion.header
      className="floating-navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="nav-brand">
        <div className="logo-box">
          <Move3d size={18} className="logo-icon" />
        </div>
        <div className="brand-titles">
          <span className="brand-name">Build 56: Three.js 3D Viewer</span>
          <span className="brand-tag">Interactive 3D Texture &amp; Model Engine</span>
        </div>
      </div>

      <div className="nav-product-tabs">
        {productsList.map((p) => {
          const isActive = p.id === product.id;
          return (
            <button
              key={p.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setProduct(p);
              }}
            >
              <Box size={14} />
              <span>{p.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="nav-actions">
        <a
          href="https://github.com/breakingthebot/threejs-interactive-3d-product-viewer-build56"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-github-btn"
          onClick={() => playClickSound()}
        >
          <ExternalLink size={15} />
          <span>GitHub Code</span>
        </a>
      </div>
    </motion.header>
  );
}
