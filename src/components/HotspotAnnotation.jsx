// src/components/HotspotAnnotation.jsx
// React Three Fiber 3D Hotspot Callout Pin Component.
// Connects to: src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React from 'react';
import { Html } from '@react-three/drei';
import { Info } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './HotspotAnnotation.css';

/**
 * Renders an HTML 3D hotspot callout pin anchored to specific 3D model coordinates.
 * @param {Object} props
 * @param {Object} props.hotspot - Hotspot object with id, title, position, details.
 * @param {Function} props.onSelect - Click handler to open detail modal.
 */
export function HotspotAnnotation({ hotspot, onSelect }) {
  return (
    <Html position={hotspot.position} distanceFactor={10} zIndexRange={[100, 0]}>
      <button
        className="hotspot-pin-btn"
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          onSelect(hotspot);
        }}
        title={`View ${hotspot.title}`}
      >
        <span className="pin-pulse" />
        <Info size={14} className="pin-icon" />
        <span className="pin-tooltip">{hotspot.title}</span>
      </button>
    </Html>
  );
}
