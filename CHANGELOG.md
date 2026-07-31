# Changelog

All notable changes to **Build 56: Three.js Interactive 3D Product Viewer** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v1.8.0.html).

## [1.5.0] - 2026-07-31

### Added
- Integrated **3D Animation Timeline & Part Assembly Sequence (`AssemblyAnimator.jsx`, `AssemblyAnimator.css`)**.
- Built automated animation frame loop interpolating 3D mesh exploded offsets into assembled product alignment.
- Added stage preset buttons and interactive timeline progress slider.
- Added "Assembly Tour" action button to floating toolbar (`Toolbar.jsx`).

## [1.4.0] - 2026-07-31

### Added
- Integrated **Interactive 3D Product Colorway Configurator & Preset Exporter (`ConfiguratorExporter.jsx`, `ConfiguratorExporter.css`)**.
- Built Base64 URL deep-link state serializer (`#preset=...`) for instant sharing of 3D product material configurations.
- Added automatic URL hash parser on app mount to restore shared colorway presets.
- Added "Share Preset" action button to floating toolbar (`Toolbar.jsx`).

## [1.3.0] - 2026-07-31

### Added
- Integrated **Real-Time Studio Lighting Control & Directional Light Gizmo (`StudioLighting.jsx`, `StudioLighting.css`)**.
- Added dynamic 3D spherical light coordinate positioning (`lightX`, `lightY`, `lightZ`) based on azimuth (0°-360°) and elevation (10°-90°) angle sliders.
- Added "Lighting Studio" button to floating toolbar (`Toolbar.jsx`).

## [1.2.0] - 2026-07-31

### Added
- Integrated **Interactive 3D Product AR (Augmented Reality) Viewport (`ARViewerModal.jsx`, `ARViewerModal.css`)**.
- Built WebXR AR launcher modal with dynamic desktop-to-mobile QR code generator API for smartphone cameras.
- Added "View in AR" action button to bottom floating toolbar (`Toolbar.jsx`).

## [1.1.0] - 2026-07-31

### Added
- Integrated **Custom Texture Image Drag-and-Drop Uploader & UV Decal Studio (`TextureStudio.jsx`, `TextureStudio.css`)**.
- Built drag-and-drop texture upload box supporting `.png`, `.jpg`, and `.webp` images.
- Added dynamic `THREE.TextureLoader` mapping with customizable tile repeat scaling (`ProductMesh.jsx`).
- Embedded texture studio controls inside Material Inspector sidebar panel.

## [1.0.0] - 2026-07-31

### Added
- Initial release of **Build 56: Three.js Interactive 3D Product Viewer**.
- Engineered React Three Fiber 3D WebGL viewport canvas (`ViewerCanvas.jsx`) with OrbitControls and ContactShadows.
- Created procedural 3D model geometry (`ProductMesh.jsx`) for Cyberpunk Headphones, Sci-Fi Smartwatch, and Mechanical Gaming Keyboard.
- Built real-time PBR Material Inspector (`MaterialInspector.jsx`) with Base Color swatches, Roughness, Metalness, Clearcoat sliders, and Wireframe toggle.
- Integrated Drei `<Html>` 3D hotspot callout pin annotations (`HotspotAnnotation.jsx`) anchored to mesh coordinates.
- Added 3D Exploded View Offset Slider (`ProductInfoPanel.jsx`) separating internal mesh components in 3D space.
- Built floating control toolbar (`Toolbar.jsx`) with Auto-Rotate, Environment Lighting maps (City, Studio, Sunset, Warehouse), and PNG Snapshot capture.
- Created zero-dependency Web Audio API sound design synthesizer (`soundFX.js`).
