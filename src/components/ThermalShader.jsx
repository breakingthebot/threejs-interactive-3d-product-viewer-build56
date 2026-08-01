// src/components/ThermalShader.jsx
// Interactive Thermal Stress & Heatmap Simulation Shader Overlay.
// Connects to: src/components/ViewerCanvas.jsx, src/App.jsx
// Created: 2026-08-01

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Flame, Thermometer } from 'lucide-react';
import * as THREE from 'three';
import './ThermalShader.css';

/**
 * Renders 3D Thermal Simulation Heatmap Mesh & Legend.
 * @param {Object} props
 * @param {boolean} props.showThermal - Whether thermal heatmap view is enabled.
 */
export function ThermalShader({ showThermal = false }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (showThermal && meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  if (!showThermal) return null;

  return (
    <group>
      {/* THERMAL SIMULATION HEATMAP SPHERE OVERLAY */}
      <mesh ref={meshRef} scale={[1.8, 1.8, 1.8]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#b91c1c"
          emissiveIntensity={0.6}
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* THERMAL HUD LEGEND BADGE */}
      <Html position={[2.2, 1.5, 0]} center>
        <div className="thermal-legend-card">
          <div className="tl-header">
            <Flame size={16} className="tl-icon" />
            <span>Thermal Heatmap (FLIR)</span>
          </div>
          <div className="tl-gradient-bar" />
          <div className="tl-scale">
            <span>20&deg;C (Cool)</span>
            <span>55&deg;C (Nominal)</span>
            <span>95&deg;C (Peak)</span>
          </div>
          <div className="tl-status">
            <Thermometer size={14} />
            <span>Max Surface Temp: 78.4&deg;C</span>
          </div>
        </div>
      </Html>
    </group>
  );
}
