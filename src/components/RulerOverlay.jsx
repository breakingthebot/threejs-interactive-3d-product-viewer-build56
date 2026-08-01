// src/components/RulerOverlay.jsx
// Interactive 3D Product Dimension & Measurement Ruler Lines Overlay.
// Connects to: src/components/ViewerCanvas.jsx
// Created: 2026-08-01

import React from 'react';
import { Html, Line } from '@react-three/drei';
import { Ruler } from 'lucide-react';
import './RulerOverlay.css';

/**
 * Renders 3D dimension measurement vectors & callouts in WebGL space.
 * @param {Object} props
 * @param {boolean} props.showRuler - Whether ruler overlay is enabled.
 * @param {string} props.productId - Active product identifier.
 */
export function RulerOverlay({ showRuler, productId }) {
  if (!showRuler) return null;

  // Real-world dimensions in millimeters
  const dims = {
    cyber_headphones: { width: 185, height: 215, depth: 85, box: [1.85, 2.15, 0.85] },
    smart_watch: { width: 44, height: 44, depth: 11, box: [1.2, 1.2, 0.5] },
    mechanical_keyboard: { width: 360, height: 135, depth: 38, box: [3.2, 0.6, 1.4] }
  }[productId] || { width: 200, height: 200, depth: 100, box: [2.0, 2.0, 1.0] };

  const [w, h, d] = dims.box;
  const offset = 0.3; // Distance offset from mesh surface

  // Bounding line coordinates
  const widthPoints = [
    [-w / 2, -h / 2 - offset, d / 2 + offset],
    [w / 2, -h / 2 - offset, d / 2 + offset]
  ];

  const heightPoints = [
    [-w / 2 - offset, -h / 2, d / 2 + offset],
    [-w / 2 - offset, h / 2, d / 2 + offset]
  ];

  const depthPoints = [
    [w / 2 + offset, -h / 2 - offset, -d / 2],
    [w / 2 + offset, -h / 2 - offset, d / 2]
  ];

  return (
    <group className="ruler-overlay-group">
      {/* WIDTH DIMENSION LINE (X-AXIS) */}
      <Line points={widthPoints} color="#38bdf8" lineWidth={2} dashed dashScale={10} />
      <Html position={[0, -h / 2 - offset - 0.1, d / 2 + offset]} center>
        <div className="ruler-badge cyan">
          <Ruler size={11} />
          <span>Width: {dims.width} mm</span>
        </div>
      </Html>

      {/* HEIGHT DIMENSION LINE (Y-AXIS) */}
      <Line points={heightPoints} color="#c084fc" lineWidth={2} dashed dashScale={10} />
      <Html position={[-w / 2 - offset - 0.2, 0, d / 2 + offset]} center>
        <div className="ruler-badge purple">
          <Ruler size={11} />
          <span>Height: {dims.height} mm</span>
        </div>
      </Html>

      {/* DEPTH DIMENSION LINE (Z-AXIS) */}
      <Line points={depthPoints} color="#34d399" lineWidth={2} dashed dashScale={10} />
      <Html position={[w / 2 + offset + 0.15, -h / 2 - offset, 0]} center>
        <div className="ruler-badge green">
          <Ruler size={11} />
          <span>Depth: {dims.depth} mm</span>
        </div>
      </Html>
    </group>
  );
}
