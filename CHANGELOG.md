# Changelog

All notable changes to **Build 56: Three.js Interactive 3D Product Viewer** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v1.8.0.html).

## [2.4.0] - 2026-08-01

### Added
- Integrated **3D Heatmap Stress & Thermal Simulation Shader (`ThermalShader.jsx`, `ThermalShader.css`)**.
- Rendered 3D wireframe thermal dissipation heatmap sphere overlay.
- Added FLIR-style color temperature gradient legend badge (*20°C Cool Blue -> 55°C Nominal Amber -> 95°C Peak Red*).
- Added "Thermal View" action button to floating toolbar (`Toolbar.jsx`).

## [2.3.0] - 2026-08-01

### Added
- Integrated **Custom HDR Environment Map File Drag-and-Drop Ingestor (`HDRStudio.jsx`, `HDRStudio.css`)**.
- Added drag-and-drop file ingestion support for `.hdr`, `.exr`, and `.jpg` high-dynamic-range panoramas.
- Connected custom environment map lighting to R3F canvas `<Environment files={customHDRUrl} background />`.
- Added "HDR Studio" action button to floating toolbar (`Toolbar.jsx`).

## [2.2.0] - 2026-08-01

### Added
- Integrated **Interactive 3D Exploded View Part Inspector & BOM Sheet (`BOMSheetModal.jsx`, `BOMSheetModal.css`)**.
- Added Bill of Materials mechanical part table with OEM part numbers, materials, weights, and stock availability.
- Added ISO-9001 certification badges and replacement part ordering trigger buttons.
- Added "BOM Sheet" action button to floating toolbar (`Toolbar.jsx`).

## [2.1.0] - 2026-08-01

### Added
- Integrated **High-Res 4K Studio Scene Renderer & Watermark Exporter (`StudioRendererModal.jsx`, `StudioRendererModal.css`)**.
- Added 1080p, 1440p 2K, and 2160p 4K resolution render presets.
- Added Transparent PNG vs Dark Glass Studio background toggles and brand watermark options.
- Added "4K Render" action button to floating toolbar (`Toolbar.jsx`).

## [2.0.0] - 2026-08-01 - Major Milestone Release

### Added
- Integrated **SoundFX Audio Frequency & Spatial 3D Audio Engine (`spatialAudioEngine.js`)**.
- Built Web Audio API `HRTF` `PannerNode` positional audio engine updating camera X/Y/Z coordinates per frame.
- Added pitch shifting and spatial stereo panning during 3D model orbit navigation.
- Connected spatial audio mute control to floating toolbar sound button (`Toolbar.jsx`).

## [1.9.0] - 2026-08-01

### Added
- Integrated **Interactive 3D Product Dimension & Measurement Ruler (`RulerOverlay.jsx`, `RulerOverlay.css`)**.
- Rendered 3D dashed dimension vectors for Width (X-axis), Height (Y-axis), and Depth (Z-axis).
- Added real-time millimeter (mm) callout badges anchored in WebGL space.
- Added "3D Ruler" action button to floating toolbar (`Toolbar.jsx`).

## [1.8.0] - 2026-08-01

### Added
- Integrated **Interactive 3D Wireframe Polycount Diagnostic Mode (`PolycountDiagnostic.jsx`, `PolycountDiagnostic.css`)**.
- Added live triangle/vertex counters, WebGL draw call metrics, and VRAM memory footprint tracking.
- Added interactive Wireframe Shader Mode toggle switch.
- Added "Polycount" action button to floating toolbar (`Toolbar.jsx`).

## [1.7.0] - 2026-08-01

### Added
- Integrated **Camera Viewport Bookmark Presets (`CameraPresets.jsx`, `CameraPresets.css`)**.
- Built R3F `<CameraRig />` frame loop lerp interpolator for smooth camera angle transitions.
- Added quick camera view buttons (Isometric 3D, Front View, Top View, Side Profile, Close-Up Macro).

## [1.6.0] - 2026-07-31

### Added
- Integrated **Post-Processing Bloom & Cinematic Depth-of-Field Studio (`PostProcessingStudio.jsx`, `PostProcessingStudio.css`)**.
- Integrated `@react-three/postprocessing` shader pipeline (`EffectComposer`, `Bloom`, `Vignette`, `ChromaticAberration`).
- Added "VFX Studio" action button to floating toolbar (`Toolbar.jsx`).

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
