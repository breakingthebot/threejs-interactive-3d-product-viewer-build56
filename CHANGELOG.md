# Changelog

All notable changes to **Build 56: Three.js Interactive 3D Product Viewer** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v1.8.0.html).

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
