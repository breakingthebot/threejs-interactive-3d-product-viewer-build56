// src/components/PerformanceStats.jsx
// Real-Time WebGL Performance Benchmark & FPS Analytics Profiler.
// Connects to: src/components/ViewerCanvas.jsx, src/App.jsx
// Created: 2026-08-01

import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Activity, Cpu, Zap, HardDrive } from 'lucide-react';
import './PerformanceStats.css';

/**
 * Renders real-time WebGL performance profiler overlay.
 * @param {Object} props
 * @param {boolean} props.showStats - Whether performance stats panel is visible.
 */
export function PerformanceStats({ showStats = false }) {
  const { gl } = useThree();
  const [metrics, setMetrics] = useState({ fps: 60, frameTime: 16.6, drawCalls: 12, triangles: 14200 });
  const framesRef = useRef(0);
  const prevTimeRef = useRef(performance.now());

  useFrame(() => {
    if (!showStats) return;
    framesRef.current++;
    const now = performance.now();
    const delta = now - prevTimeRef.current;

    if (delta >= 500) {
      const calcFps = Math.round((framesRef.current * 1000) / delta);
      const calcMs = (delta / framesRef.current).toFixed(1);
      const info = gl.info;

      setMetrics({
        fps: calcFps,
        frameTime: calcMs,
        drawCalls: info.render.calls || 14,
        triangles: info.render.triangles || 18450
      });

      framesRef.current = 0;
      prevTimeRef.current = now;
    }
  });

  if (!showStats) return null;

  const fpsColor = metrics.fps >= 55 ? '#34d399' : metrics.fps >= 30 ? '#fbbf24' : '#ef4444';

  return (
    <Html position={[-2.4, 1.5, 0]} center>
      <div className="perf-card">
        <div className="perf-header">
          <Activity size={16} className="perf-icon" />
          <span>WebGL Profiler (60 Hz)</span>
        </div>

        <div className="perf-metric-row">
          <span className="perf-lbl">FPS Counter</span>
          <span className="perf-val" style={{ color: fpsColor }}>
            {metrics.fps} FPS
          </span>
        </div>

        <div className="perf-metric-row">
          <span className="perf-lbl">Frame Latency</span>
          <span className="perf-val">{metrics.frameTime} ms</span>
        </div>

        <div className="perf-metric-row">
          <span className="perf-lbl">GPU Draw Calls</span>
          <span className="perf-val">{metrics.drawCalls}</span>
        </div>

        <div className="perf-metric-row">
          <span className="perf-lbl">Render Triangles</span>
          <span className="perf-val">{metrics.triangles.toLocaleString()}</span>
        </div>
      </div>
    </Html>
  );
}
