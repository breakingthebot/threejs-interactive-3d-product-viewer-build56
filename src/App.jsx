// src/App.jsx
// Main application layout coordinator for Build 56: Three.js 3D Product Viewer.
// Connects to: src/components/Navbar.jsx, src/components/ViewerCanvas.jsx, src/components/ProductInfoPanel.jsx, src/components/MaterialInspector.jsx, src/components/Toolbar.jsx, src/components/HotspotModal.jsx
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ViewerCanvas } from './components/ViewerCanvas';
import { ProductInfoPanel } from './components/ProductInfoPanel';
import { MaterialInspector } from './components/MaterialInspector';
import { Toolbar } from './components/Toolbar';
import { HotspotModal } from './components/HotspotModal';
import { ARViewerModal } from './components/ARViewerModal';
import { StudioLighting } from './components/StudioLighting';
import { ConfiguratorExporter } from './components/ConfiguratorExporter';
import { AssemblyAnimator } from './components/AssemblyAnimator';
import { PostProcessingStudio } from './components/PostProcessingStudio';
import { CameraPresets, cameraPresetsList } from './components/CameraPresets';
import { PolycountDiagnostic } from './components/PolycountDiagnostic';
import { StudioRendererModal } from './components/StudioRendererModal';
import { BOMSheetModal } from './components/BOMSheetModal';
import { HDRStudio } from './components/HDRStudio';
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
  const [customHDRUrl, setCustomHDRUrl] = useState(null);
  const [textureConfig, setTextureConfig] = useState({ repeat: 1 });
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isLightingOpen, setIsLightingOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isAssemblyOpen, setIsAssemblyOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPolycountOpen, setIsPolycountOpen] = useState(false);
  const [is4KRenderOpen, setIs4KRenderOpen] = useState(false);
  const [isBOMModalOpen, setIsBOMModalOpen] = useState(false);
  const [isHDROffOpen, setIsHDROffOpen] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [showThermal, setShowThermal] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [activeCameraPreset, setActiveCameraPreset] = useState('isometric');
  const [cameraTarget, setCameraTarget] = useState(cameraPresetsList[0].target);
  const [lightingProps, setLightingProps] = useState({
    keyLightIntensity: 1.2,
    ambientIntensity: 0.6,
    azimuth: 45,
    elevation: 45
  });
  const [postProps, setPostProps] = useState({
    bloomIntensity: 0.8,
    vignetteDarkness: 0.3,
    chromaticAberration: 0.001
  });

  // Restore preset configuration from URL hash if present
  useEffect(() => {
    if (window.location.hash.includes('preset=')) {
      try {
        const raw = window.location.hash.split('preset=')[1];
        const decoded = JSON.parse(atob(raw));
        const matchedProd = productsList.find((p) => p.id === decoded.pId) || productsList[0];
        setProduct(matchedProd);
        setMaterialProps((prev) => ({
          ...prev,
          hex: decoded.hex || prev.hex,
          roughness: decoded.rough ?? prev.roughness,
          metalness: decoded.metal ?? prev.metalness,
          clearcoat: decoded.coat ?? prev.clearcoat
        }));
      } catch (e) {
        // Ignore invalid preset hash gracefully
      }
    }
  }, []);

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
        customHDRUrl={customHDRUrl}
        textureConfig={textureConfig}
        lightingProps={lightingProps}
        postProps={postProps}
        cameraTarget={cameraTarget}
        showRuler={showRuler}
        showThermal={showThermal}
        showStats={showStats}
        onSelectHotspot={setSelectedHotspot}
      />

      {/* FLOATING CAMERA ANGLE PRESETS */}
      <CameraPresets
        activeCameraPreset={activeCameraPreset}
        onSelectPreset={(preset) => {
          setActiveCameraPreset(preset.id);
          setCameraTarget(preset.target);
        }}
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

      {/* FLOATING STUDIO LIGHTING CONTROLS */}
      <StudioLighting
        isOpen={isLightingOpen}
        onClose={() => setIsLightingOpen(false)}
        lightingProps={lightingProps}
        setLightingProps={setLightingProps}
      />

      {/* FLOATING ASSEMBLY ANIMATOR CONTROLS */}
      <AssemblyAnimator
        isOpen={isAssemblyOpen}
        onClose={() => setIsAssemblyOpen(false)}
        explodedFactor={explodedFactor}
        setExplodedFactor={setExplodedFactor}
        product={product}
      />

      {/* FLOATING POST-PROCESSING FX CONTROLS */}
      <PostProcessingStudio
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
        postProps={postProps}
        setPostProps={setPostProps}
      />

      {/* FLOATING POLYCOUNT DIAGNOSTIC CONTROLS */}
      <PolycountDiagnostic
        isOpen={isPolycountOpen}
        onClose={() => setIsPolycountOpen(false)}
        product={product}
        materialProps={materialProps}
        setMaterialProps={setMaterialProps}
      />

      {/* BOTTOM FLOATING TOOLBAR */}
      <Toolbar
        isAutoRotate={isAutoRotate}
        setIsAutoRotate={setIsAutoRotate}
        envPreset={envPreset}
        setEnvPreset={setEnvPreset}
        onTakeSnapshot={handleTakeSnapshot}
        onOpenAR={() => setIsARModalOpen(true)}
        onToggleLighting={() => setIsLightingOpen(!isLightingOpen)}
        isLightingOpen={isLightingOpen}
        onToggleAssembly={() => setIsAssemblyOpen(!isAssemblyOpen)}
        isAssemblyOpen={isAssemblyOpen}
        onTogglePost={() => setIsPostOpen(!isPostOpen)}
        isPostOpen={isPostOpen}
        onTogglePolycount={() => setIsPolycountOpen(!isPolycountOpen)}
        isPolycountOpen={isPolycountOpen}
        onToggleRuler={() => setShowRuler(!showRuler)}
        showRuler={showRuler}
        onToggleThermal={() => setShowThermal(!showThermal)}
        showThermal={showThermal}
        onToggleStats={() => setShowStats(!showStats)}
        showStats={showStats}
        onOpen4KRender={() => setIs4KRenderOpen(true)}
        onOpenBOM={() => setIsBOMModalOpen(true)}
        onOpenHDR={() => setIsHDROffOpen(true)}
        onOpenPreset={() => setIsPresetModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* HOTSPOT CALLOUT MODAL */}
      <HotspotModal
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
      />

      {/* AUGMENTED REALITY (AR) LAUNCHER MODAL */}
      <ARViewerModal
        isOpen={isARModalOpen}
        onClose={() => setIsARModalOpen(false)}
        product={product}
      />

      {/* COLORWAY CONFIGURATOR PRESET MODAL */}
      <ConfiguratorExporter
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        product={product}
        materialProps={materialProps}
      />

      {/* HIGH-RES 4K STUDIO SCENE RENDERER MODAL */}
      <StudioRendererModal
        isOpen={is4KRenderOpen}
        onClose={() => setIs4KRenderOpen(false)}
        product={product}
      />

      {/* BILL OF MATERIALS (BOM) CATALOG SHEET MODAL */}
      <BOMSheetModal
        isOpen={isBOMModalOpen}
        onClose={() => setIsBOMModalOpen(false)}
        product={product}
      />

      {/* CUSTOM HDR ENVIRONMENT INGESTOR MODAL */}
      <HDRStudio
        isOpen={isHDROffOpen}
        onClose={() => setIsHDROffOpen(false)}
        customHDRUrl={customHDRUrl}
        setCustomHDRUrl={setCustomHDRUrl}
      />
    </div>
  );
}

export default App;
