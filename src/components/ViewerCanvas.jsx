// src/components/ViewerCanvas.jsx
// React Three Fiber 3D Product Canvas Viewport with OrbitControls & Lighting Environments.
// Connects to: src/App.jsx, src/components/ProductMesh.jsx, src/components/HotspotAnnotation.jsx
// Created: 2026-07-31

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { ProductMesh } from './ProductMesh';
import { HotspotAnnotation } from './HotspotAnnotation';
import './ViewerCanvas.css';

/**
 * Renders the primary 3D WebGL viewport canvas.
 * @param {Object} props
 * @param {Object} props.product - Active product dataset object.
 * @param {Object} props.materialProps - Material properties (hex, roughness, metalness, clearcoat, wireframe).
 * @param {string} props.envPreset - Environment map preset ('city' | 'studio' | 'sunset' | 'warehouse').
 * @param {boolean} props.isAutoRotate - Whether OrbitControls auto-rotates.
 * @param {number} props.explodedFactor - Exploded view offset multiplier (0.0 to 1.0).
 * @param {Function} props.onSelectHotspot - Callback when a 3D hotspot is clicked.
 */
export function ViewerCanvas({
  product,
  materialProps,
  envPreset = 'city',
  isAutoRotate = true,
  explodedFactor = 0,
  customTextureUrl,
  textureConfig,
  onSelectHotspot
}) {
  const controlsRef = useRef();

  return (
    <div className="viewer-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="r3f-canvas"
      >
        {/* LIGHTING & ENVIRONMENT */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#38bdf8" />
        <spotLight position={[0, 15, 0]} intensity={0.8} penumbra={1} angle={0.6} />

        <Environment preset={envPreset} />

        {/* 3D PRODUCT MODEL */}
        <ProductMesh
          productId={product.id}
          materialProps={materialProps}
          explodedFactor={explodedFactor}
          customTextureUrl={customTextureUrl}
          textureConfig={textureConfig}
        />

        {/* 3D HOTSPOT ANNOTATIONS */}
        {product.hotspots.map((hp) => (
          <HotspotAnnotation key={hp.id} hotspot={hp} onSelect={onSelectHotspot} />
        ))}

        {/* CONTACT SHADOWS */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.65}
          scale={10}
          blur={2.5}
          far={4}
        />

        {/* ORBIT CAMERA CONTROLS */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          minDistance={2.5}
          maxDistance={9.0}
          autoRotate={isAutoRotate}
          autoRotateSpeed={1.8}
        />
      </Canvas>
    </div>
  );
}
