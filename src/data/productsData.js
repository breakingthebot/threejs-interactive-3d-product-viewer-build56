// src/data/productsData.js
// 3D Product models dataset with material presets, hotspot annotations, and technical specifications.
// Connects to: src/components/ViewerCanvas.jsx, src/components/ProductInfoPanel.jsx, src/components/MaterialInspector.jsx
// Created: 2026-07-31

export const productsList = [
  {
    id: 'cyber-headphones',
    name: 'AeroPulse Cyberpunk Wireless Headphones',
    subtitle: 'Flagship Active Noise Cancelling Planar Magnetic Headset',
    category: 'Premium Audio',
    price: '$349.00',
    rating: 4.9,
    description: 'Engineered with 50mm Planar Magnetic Drivers, dual-chamber acoustic seals, and active ANC algorithm processing 1,000 noise samples/sec. Designed for audiophile fidelity and ultra-low latency wireless streaming.',
    colorPresets: [
      { id: 'carbon-black', name: 'Carbon Stealth', hex: '#0f172a', roughness: 0.25, metalness: 0.85, clearcoat: 0.3 },
      { id: 'anodized-titanium', name: 'Titanium Silver', hex: '#94a3b8', roughness: 0.3, metalness: 0.95, clearcoat: 0.5 },
      { id: 'cyber-crimson', name: 'Cyber Crimson', hex: '#ef4444', roughness: 0.2, metalness: 0.7, clearcoat: 0.8 },
      { id: 'emerald-glow', name: 'Neon Emerald', hex: '#10b981', roughness: 0.15, metalness: 0.6, clearcoat: 0.9 },
      { id: 'solar-gold', name: 'Solar Amber', hex: '#f59e0b', roughness: 0.2, metalness: 0.9, clearcoat: 0.6 }
    ],
    hotspots: [
      {
        id: 'hp-1',
        title: '50mm Planar Drivers',
        position: [1.4, 0.2, 0.4],
        details: 'Custom ultrathin neodymium diaphragm delivers 5Hz–40kHz frequency response with sub-0.05% total harmonic distortion.',
        specKey: 'Frequency Response',
        specValue: '5Hz - 40,000Hz'
      },
      {
        id: 'hp-2',
        title: 'Tactile Volume & ANC Dial',
        position: [-1.4, -0.6, 0.5],
        details: 'Aircraft-grade aluminum knurled rotary dial providing precise 64-step digital volume and ANC mode selection.',
        specKey: 'Control Feedback',
        specValue: '64-Step Haptic Rotary'
      },
      {
        id: 'hp-3',
        title: 'Memory Foam Cushioning',
        position: [1.2, 0.8, -0.2],
        details: 'Infused cooling-gel memory foam earcups wrapped in breathable protein leather for all-day listening ergonomics.',
        specKey: 'Earcup Material',
        specValue: 'Cooling-Gel Memory Foam'
      }
    ],
    specs: [
      { label: 'Driver Type', value: '50mm Planar Magnetic' },
      { label: 'Battery Life', value: '45 Hours (ANC On)' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 + 2.4GHz Dongle' },
      { label: 'Weight', value: '298 grams' },
      { label: 'Fast Charge', value: '15 min charge = 8 hours' }
    ]
  },
  {
    id: 'scifi-watch',
    name: 'Chronos-X Holographic Smartwatch',
    subtitle: 'Titanium-Ceramic Tactical Bio-Monitoring Timepiece',
    category: 'Wearable Tech',
    price: '$499.00',
    rating: 4.95,
    description: 'Forged from Grade-5 Titanium with a sapphire glass lens casing. Powered by a bi-spectral optical sensor array for real-time ECG, blood oxygen, and micro-motion spatial tracking.',
    colorPresets: [
      { id: 'titanium-dark', name: 'Space Black', hex: '#1e293b', roughness: 0.2, metalness: 0.95, clearcoat: 0.4 },
      { id: 'frost-silver', name: 'Frost Silver', hex: '#e2e8f0', roughness: 0.15, metalness: 0.98, clearcoat: 0.7 },
      { id: 'plasma-violet', name: 'Plasma Violet', hex: '#8b5cf6', roughness: 0.25, metalness: 0.65, clearcoat: 0.8 }
    ],
    hotspots: [
      {
        id: 'hp-watch-1',
        title: 'Sapphire Crystal Lens',
        position: [0, 0.4, 0.8],
        details: '9H Mohs hardness rating sapphire crystal casing resistant to scratch, impact, and high-pressure water depths up to 100 meters.',
        specKey: 'Water Resistance',
        specValue: '10 ATM (100 Meters)'
      },
      {
        id: 'hp-watch-2',
        title: 'Bio-Sensor Array',
        position: [0, -0.4, -0.8],
        details: 'Quad-channel PPG optical sensor sampling heart rate variability, SpO2, and skin temperature at 100Hz frequency.',
        specKey: 'Sensors',
        specValue: 'PPG / ECG / Accelerometer'
      }
    ],
    specs: [
      { label: 'Case Material', value: 'Grade-5 Titanium & Ceramic' },
      { label: 'Display', value: '1.4" AMOLED 1000 nits' },
      { label: 'Water Rating', value: '10 ATM (100m)' },
      { label: 'Battery', value: '14 Days Typical Use' },
      { label: 'Sensors', value: 'Dual-Frequency GPS + ECG' }
    ]
  },
  {
    id: 'mech-keyboard',
    name: 'CyberBoard Pro Mechanical Keyboard',
    subtitle: 'Gasket-Mounted Hot-Swappable RGB Mechanical Keyboard',
    category: 'Peripherals',
    price: '$219.00',
    rating: 4.88,
    description: 'Precision CNC machined aluminum chassis with a 5-layer acoustic dampening gasket structure, PBT double-shot keycaps, and pre-lubed linear switches for creamy sound profiles.',
    colorPresets: [
      { id: 'slate-blue', name: 'Deep Space Blue', hex: '#0f172a', roughness: 0.3, metalness: 0.8, clearcoat: 0.2 },
      { id: 'cyber-green', name: 'Cyber Matrix', hex: '#064e3b', roughness: 0.25, metalness: 0.7, clearcoat: 0.5 },
      { id: 'hyper-pink', name: 'Neon Cyberpunk', hex: '#ec4899', roughness: 0.18, metalness: 0.6, clearcoat: 0.85 }
    ],
    hotspots: [
      {
        id: 'hp-kb-1',
        title: 'Gasket Mounting System',
        position: [0, 0.3, 0.5],
        details: 'PORON foam gasket mounting isolates switch vibrations, producing a deep thocky acoustic signature.',
        specKey: 'Mounting Style',
        specValue: 'Poron Gasket Mount'
      },
      {
        id: 'hp-kb-2',
        title: 'Hot-Swappable PCB',
        position: [-1.2, 0.1, 0.3],
        details: '5-pin hot-swappable PCB sockets compatible with MX-style 3-pin and 5-pin mechanical switches.',
        specKey: 'PCB Socket',
        specValue: '5-Pin Universal Hotswap'
      }
    ],
    specs: [
      { label: 'Case Material', value: 'CNC Anodized Aluminum' },
      { label: 'Keycaps', value: 'PBT Double-Shot Cherry Profile' },
      { label: 'Polling Rate', value: '8,000Hz Ultra-Fast' },
      { label: 'Connection', value: 'Tri-Mode (Type-C / 2.4G / BT)' },
      { label: 'Weight', value: '1,850 grams' }
    ]
  }
];

export const environmentPresets = [
  { id: 'city', name: 'Cyberpunk City Neon' },
  { id: 'studio', name: 'Neutral Photo Studio' },
  { id: 'sunset', name: 'Sunset Warm Accent' },
  { id: 'warehouse', name: 'Industrial Warehouse' }
];
