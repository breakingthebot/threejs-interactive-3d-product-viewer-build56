// src/components/TextureStudio.jsx
// Drag-and-Drop Custom Decal & Texture Upload Studio.
// Connects to: src/components/MaterialInspector.jsx, src/App.jsx
// Created: 2026-07-31

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Sparkles, Sliders } from 'lucide-react';
import { playClickSound, playMaterialSound } from '../utils/soundFX';
import './TextureStudio.css';

/**
 * Renders the drag-and-drop texture upload box and UV scaling controls.
 * @param {Object} props
 * @param {string|null} props.customTextureUrl - Active custom image data URL.
 * @param {Function} props.setCustomTextureUrl - Custom image updater.
 * @param {Object} props.textureConfig - Scale and rotation config for custom texture.
 * @param {Function} props.setTextureConfig - Texture config updater.
 */
export function TextureStudio({ customTextureUrl, setCustomTextureUrl, textureConfig, setTextureConfig }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        playMaterialSound();
        setCustomTextureUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    playClickSound();
    setCustomTextureUrl(null);
  };

  return (
    <div className="texture-studio-container">
      <div className="ts-header">
        <ImageIcon size={15} className="ts-icon" />
        <span className="ts-title">Custom Decal &amp; Texture Studio</span>
      </div>

      {/* DRAG AND DROP ZONE */}
      {!customTextureUrl ? (
        <div
          className={`ts-dropzone ${isDragging ? 'dragging' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <Upload size={24} className="dropzone-icon" />
          <span className="dropzone-text">Drag &amp; Drop Decal / Texture Image</span>
          <span className="dropzone-sub">PNG, JPG, WEBP (Max 5MB)</span>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="ts-preview-card">
          <div className="ts-thumbnail-wrap">
            <img src={customTextureUrl} alt="Custom Decal Preview" className="ts-thumbnail" />
            <button className="ts-remove-btn" onClick={handleRemove} title="Remove Custom Texture">
              <Trash2 size={14} />
            </button>
          </div>

          {/* TEXTURE REPEAT SLIDER */}
          <div className="ts-slider-row">
            <span className="ts-slider-lbl">Tile Repeat ({textureConfig.repeat}x)</span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={textureConfig.repeat}
              onChange={(e) =>
                setTextureConfig({ ...textureConfig, repeat: parseInt(e.target.value) })
              }
              className="ts-range"
            />
          </div>
        </div>
      )}
    </div>
  );
}
