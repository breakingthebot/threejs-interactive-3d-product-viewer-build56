// src/components/ProductMesh.jsx
// Procedural 3D Product Mesh Renderer with Material Customization & Exploded View offsets.
// Connects to: src/components/ViewerCanvas.jsx
// Created: 2026-07-31

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Renders procedural 3D product geometry based on active product selection, material settings, and exploded view offsets.
 * @param {Object} props
 * @param {string} props.productId - Selected product ID ('cyber-headphones' | 'scifi-watch' | 'mech-keyboard').
 * @param {Object} props.materialProps - Base color, roughness, metalness, clearcoat, wireframe.
 * @param {number} props.explodedFactor - Offset multiplier (0.0 to 1.0) separating 3D mesh components.
 */
export function ProductMesh({ productId, materialProps, explodedFactor, customTextureUrl, textureConfig }) {
  const groupRef = useRef();

  // Load custom texture if present
  const loadedTexture = React.useMemo(() => {
    if (!customTextureUrl) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(customTextureUrl);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(textureConfig?.repeat || 1, textureConfig?.repeat || 1);
    return tex;
  }, [customTextureUrl, textureConfig]);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;
    }
  });

  const material = (
    <meshPhysicalMaterial
      color={loadedTexture ? '#ffffff' : (materialProps.hex || '#0f172a')}
      map={loadedTexture || null}
      roughness={materialProps.roughness ?? 0.25}
      metalness={materialProps.metalness ?? 0.85}
      clearcoat={materialProps.clearcoat ?? 0.4}
      clearcoatRoughness={0.1}
      wireframe={materialProps.wireframe || false}
      envMapIntensity={1.5}
    />
  );

  const accentMaterial = (
    <meshStandardMaterial
      color="#38bdf8"
      metalness={0.9}
      roughness={0.1}
      emissive="#38bdf8"
      emissiveIntensity={0.6}
      wireframe={materialProps.wireframe || false}
    />
  );

  const goldAccentMaterial = (
    <meshStandardMaterial
      color="#f59e0b"
      metalness={0.95}
      roughness={0.15}
      wireframe={materialProps.wireframe || false}
    />
  );

  if (productId === 'scifi-watch') {
    return (
      <group ref={groupRef}>
        {/* WATCH BEZEL / CASE */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
          {material}
        </mesh>

        {/* SAPPHIRE GLASS SCREEN */}
        <mesh position={[0, 0.22 + explodedFactor * 0.5, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.04, 64]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transparent
            opacity={0.7}
            roughness={0.05}
            transmission={0.9}
            ior={1.5}
            wireframe={materialProps.wireframe || false}
          />
        </mesh>

        {/* WATCH STRAPS */}
        <mesh position={[0, 0, 1.5 + explodedFactor * 0.8]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[1.1, 0.15, 1.8]} />
          {material}
        </mesh>
        <mesh position={[0, 0, -1.5 - explodedFactor * 0.8]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[1.1, 0.15, 1.8]} />
          {material}
        </mesh>

        {/* BIO SENSOR BACKING */}
        <mesh position={[0, -0.25 - explodedFactor * 0.5, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.08, 32]} />
          {accentMaterial}
        </mesh>
      </group>
    );
  }

  if (productId === 'mech-keyboard') {
    return (
      <group ref={groupRef} rotation={[0.25, -0.2, 0]}>
        {/* CHASSIS BASE */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[4.2, 0.4, 2.2]} />
          {material}
        </mesh>

        {/* GASKET PLATE LAYER */}
        <mesh position={[0, 0.05 + explodedFactor * 0.6, 0]}>
          <boxGeometry args={[3.9, 0.08, 1.9]} />
          {accentMaterial}
        </mesh>

        {/* KEYCAP MATRIX */}
        <group position={[0, 0.25 + explodedFactor * 1.2, 0]}>
          {[-1.5, -0.9, -0.3, 0.3, 0.9, 1.5].map((x, i) =>
            [-0.6, 0, 0.6].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, 0, z]}>
                <boxGeometry args={[0.48, 0.22, 0.48]} />
                {j % 2 === 0 ? material : goldAccentMaterial}
              </mesh>
            ))
          )}
        </group>
      </group>
    );
  }

  // DEFAULT: CYBER HEADPHONES
  return (
    <group ref={groupRef}>
      {/* HEADBAND ARC */}
      <mesh position={[0, 1.6 + explodedFactor * 0.6, 0]}>
        <torusGeometry args={[1.6, 0.12, 32, 64, Math.PI]} />
        {material}
      </mesh>

      {/* LEFT EAR CUP */}
      <group position={[-1.7 - explodedFactor * 0.8, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.9, 0.9, 0.5, 64]} />
          {material}
        </mesh>
        {/* EAR CUSHION */}
        <mesh position={[-0.3 - explodedFactor * 0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.75, 0.2, 32, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* PLANAR DRIVER ACCENT */}
        <mesh position={[0, 0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.52, 32]} />
          {accentMaterial}
        </mesh>
      </group>

      {/* RIGHT EAR CUP */}
      <group position={[1.7 + explodedFactor * 0.8, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.9, 0.9, 0.5, 64]} />
          {material}
        </mesh>
        {/* EAR CUSHION */}
        <mesh position={[0.3 + explodedFactor * 0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.75, 0.2, 32, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* PLANAR DRIVER ACCENT */}
        <mesh position={[0, 0, 0.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.52, 32]} />
          {goldAccentMaterial}
        </mesh>
      </group>
    </group>
  );
}
