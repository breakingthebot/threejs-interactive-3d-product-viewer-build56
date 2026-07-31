// src/components/ProductInfoPanel.jsx
// Left Sidebar Panel displaying Product Meta, Specs, Exploded View Slider, and Model Selection.
// Connects to: src/App.jsx, src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { motion } from 'framer-motion';
import { Box, Star, Info, Zap, Sparkles, Move3d, Layers } from 'lucide-react';
import { productsList } from '../data/productsData';
import { playClickSound, playToggleSound } from '../utils/soundFX';
import './ProductInfoPanel.css';

/**
 * Renders the product info panel with model switcher, specs list, and exploded view offset slider.
 * @param {Object} props
 * @param {Object} props.product - Active product dataset.
 * @param {Function} props.setProduct - Product updater function.
 * @param {number} props.explodedFactor - Exploded view offset factor (0.0 to 1.0).
 * @param {Function} props.setExplodedFactor - Exploded view offset updater.
 */
export function ProductInfoPanel({ product, setProduct, explodedFactor, setExplodedFactor }) {
  return (
    <motion.div
      className="product-info-panel"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* 3D PRODUCT MODEL SELECTOR */}
      <div className="product-selector-strip">
        {productsList.map((p) => {
          const isActive = p.id === product.id;
          return (
            <button
              key={p.id}
              className={`product-select-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                setProduct(p);
              }}
            >
              <Box size={14} />
              <span>{p.category}</span>
            </button>
          );
        })}
      </div>

      {/* PRODUCT TITLE & PRICE */}
      <div className="product-info-header">
        <div className="category-badge">
          <Sparkles size={12} /> {product.category}
        </div>
        <h1 className="product-title">{product.name}</h1>
        <p className="product-subtitle">{product.subtitle}</p>

        <div className="price-rating-row">
          <span className="product-price">{product.price}</span>
          <div className="rating-pill">
            <Star size={13} fill="#fbbf24" color="#fbbf24" />
            <span>{product.rating} / 5.0</span>
          </div>
        </div>
      </div>

      {/* EXPLODED VIEW CONTROL SLIDER */}
      <div className="exploded-view-card">
        <div className="ev-header">
          <Move3d size={16} className="ev-icon" />
          <div className="ev-title-group">
            <span className="ev-title">3D Exploded View Offset</span>
            <span className="ev-subtitle">Separate internal mesh components</span>
          </div>
          <span className="ev-val">{Math.round(explodedFactor * 100)}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={explodedFactor}
          onChange={(e) => {
            playToggleSound();
            setExplodedFactor(parseFloat(e.target.value));
          }}
          className="ev-slider"
        />
      </div>

      {/* TECHNICAL SPECIFICATIONS GRID */}
      <div className="specs-card">
        <div className="specs-header">
          <Zap size={14} className="specs-icon" />
          <span className="specs-title">Hardware Specifications</span>
        </div>

        <div className="specs-list">
          {product.specs.map((s, idx) => (
            <div key={idx} className="spec-row">
              <span className="spec-label">{s.label}</span>
              <span className="spec-val">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
