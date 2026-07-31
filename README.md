# Build 56: Three.js Interactive 3D Product Viewer

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel)](https://threejs-interactive-3d-product-viewer-build56.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/breakingthebot/threejs-interactive-3d-product-viewer-build56)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Release](https://img.shields.io/badge/Release-v1.0.0-indigo?style=for-the-badge)](CHANGELOG.md)

---

## 🌟 Overview

**Three.js Interactive 3D Product Viewer (Build 56)** is a standalone, production-grade 3D WebGL product visualization application engineered with **React 19**, **Three.js**, **React Three Fiber (@react-three/fiber)**, **Drei (@react-three/drei)**, and **Vite**.

Designed to showcase high-fidelity 3D product rendering, this application features procedural 3D models (*AeroPulse Cyberpunk Headphones*, *Chronos-X Holographic Smartwatch*, *CyberBoard Pro Mechanical Keyboard*), real-time PBR material property controls (*Albedo/Base Color*, *Micro-Surface Roughness*, *Metallic Reflectivity*, *Gloss Clearcoat*, *Wireframe Toggle*), 3D hotspot callout pin annotations anchored to mesh coordinates, 3D exploded view mesh translation offsets, studio/city environment map lighting switcher, OrbitControls rotation physics, high-resolution snapshot exporter (`.png`), zero-dependency Web Audio API sound synthesis (`soundFX.js`), and a glassmorphic cyber design system.

### 🌐 Live Production & Repository Links
- **Live Vercel Application**: [https://threejs-interactive-3d-product-viewer-build56.vercel.app](https://threejs-interactive-3d-product-viewer-build56.vercel.app)
- **GitHub Codebase**: [https://github.com/breakingthebot/threejs-interactive-3d-product-viewer-build56](https://github.com/breakingthebot/threejs-interactive-3d-product-viewer-build56)
- **License**: [MIT License](LICENSE)

---

## 📂 Directory Architecture

```
Build_56/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Floating glassmorphism navbar & product switcher
│   │   ├── Navbar.css
│   │   ├── ViewerCanvas.jsx       # React Three Fiber 3D WebGL viewport canvas
│   │   ├── ViewerCanvas.css
│   │   ├── ProductMesh.jsx        # Procedural 3D model geometry & PBR materials
│   │   ├── HotspotAnnotation.jsx  # Drei <Html> 3D hotspot callout pins
│   │   ├── HotspotAnnotation.css
│   │   ├── MaterialInspector.jsx  # Material finish customizer & sliders
│   │   ├── MaterialInspector.css
│   │   ├── ProductInfoPanel.jsx   # Specs grid & exploded view offset slider
│   │   ├── ProductInfoPanel.css
│   │   ├── Toolbar.jsx            # Auto-rotate, environment, & snapshot controls
│   │   ├── Toolbar.css
│   │   ├── HotspotModal.jsx       # Technical callout specification modal
│   │   └── HotspotModal.css
│   ├── utils/
│   │   └── soundFX.js             # Zero-dependency Web Audio API synthesizer
│   ├── data/
│   │   └── productsData.js        # 3D product configurations & hotspot coordinates
│   ├── styles/
│   │   └── index.css              # Dark glassmorphic design tokens
│   ├── App.jsx                    # Main 3D viewer layout coordinator
│   ├── App.css
│   └── main.jsx                   # Application entry point
```
