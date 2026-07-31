// src/App.jsx
// Main application layout coordinator for Build 56: Three.js 3D Product Viewer.
// Connects to: src/components/Navbar.jsx, src/components/ViewerCanvas.jsx, src/components/ProductInfoPanel.jsx, src/components/MaterialInspector.jsx, src/components/Toolbar.jsx, src/components/HotspotModal.jsx
// Created: 2026-07-31

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ViewerCanvas } from './components/ViewerCanvas';
import { ProductInfoPanel } from './components/ProductInfoPanel';
import { MaterialInspector } from './components/MaterialInspector';
import { Toolbar } from './components/Toolbar';
import { HotspotModal } from './components/HotspotModal';
import { productsList } from './data/productsData';
import { soundFX } from './utils/soundFX';
import './App.css';

/**
 * Main App component orchestrating the Three.js 3D product viewer.
 */
export function App() {
  const [product, setProduct] = useState(productsList[0]);
  const [materialProps, setMaterialProps] = useState({
    hex: productsList[0].colorPresets[0].hex,
    roughness: productsList[0].colorPresets[0].roughness,
    metalness: productsList[0].colorPresets[0].metalness,
    clearcoat: productsList[0].colorPresets[0].clearcoat,
    wireframe: false
  });
  const [envPreset, setEnvPreset] = useState('city');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [explodedFactor, setExplodedFactor] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isMuted, setIsMuted] = useState(soundFX.isMuted);
  const [customTextureUrl, setCustomTextureUrl] = useState(null);
  const [textureConfig, setTextureConfig] = useState({ repeat: 1 });

  // Take high-resolution screenshot snapshot of WebGL canvas
  const handleTakeSnapshot = () => {
    const canvas = document.querySelector('.r3f-canvas canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${product.id}-3d-snapshot.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="app-container">
      {/* FLOATING TOP NAVBAR */}
      <Navbar product={product} setProduct={(p) => {
        setProduct(p);
        setMaterialProps({
          hex: p.colorPresets[0].hex,
          roughness: p.colorPresets[0].roughness,
          metalness: p.colorPresets[0].metalness,
          clearcoat: p.colorPresets[0].clearcoat,
          wireframe: false
        });
        setExplodedFactor(0);
        setCustomTextureUrl(null);
      }} />

      {/* 3D WEBGL CANVAS VIEWPORT */}
      <ViewerCanvas
        product={product}
        materialProps={materialProps}
        envPreset={envPreset}
        isAutoRotate={isAutoRotate}
        explodedFactor={explodedFactor}
        customTextureUrl={customTextureUrl}
        textureConfig={textureConfig}
        onSelectHotspot={setSelectedHotspot}
      />

      {/* LEFT SIDEBAR: PRODUCT INFO & SPECS */}
      <ProductInfoPanel
        product={product}
        setProduct={(p) => {
          setProduct(p);
          setMaterialProps({
            hex: p.colorPresets[0].hex,
            roughness: p.colorPresets[0].roughness,
            metalness: p.colorPresets[0].metalness,
            clearcoat: p.colorPresets[0].clearcoat,
            wireframe: false
          });
          setExplodedFactor(0);
          setCustomTextureUrl(null);
        }}
        explodedFactor={explodedFactor}
        setExplodedFactor={setExplodedFactor}
      />

      {/* RIGHT SIDEBAR: MATERIAL INSPECTOR */}
      <MaterialInspector
        product={product}
        materialProps={materialProps}
        setMaterialProps={setMaterialProps}
        customTextureUrl={customTextureUrl}
        setCustomTextureUrl={setCustomTextureUrl}
        textureConfig={textureConfig}
        setTextureConfig={setTextureConfig}
      />

      {/* BOTTOM FLOATING TOOLBAR */}
      <Toolbar
        isAutoRotate={isAutoRotate}
        setIsAutoRotate={setIsAutoRotate}
        envPreset={envPreset}
        setEnvPreset={setEnvPreset}
        onTakeSnapshot={handleTakeSnapshot}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* HOTSPOT CALLOUT MODAL */}
      <HotspotModal
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
      />
    </div>
  );
}

export default App;
