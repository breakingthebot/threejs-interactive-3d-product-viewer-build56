// src/components/AssemblyAnimator.jsx
// Interactive 3D Part Assembly Sequence & Keyframe Timeline Controller.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-07-31

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Layers, Sparkles, FastForward, CheckCircle2 } from 'lucide-react';
import { playClickSound, playToggleSound } from '../utils/soundFX';
import './AssemblyAnimator.css';

/**
 * Renders 3D Part Assembly Timeline Controller.
 * @param {Object} props
 * @param {boolean} props.isOpen - Panel open state.
 * @param {Function} props.onClose - Close panel handler.
 * @param {number} props.explodedFactor - Current exploded view factor (0.0 to 1.0).
 * @param {Function} props.setExplodedFactor - Exploded view factor updater.
 * @param {Object} props.product - Active product dataset.
 */
export function AssemblyAnimator({ isOpen, onClose, explodedFactor, setExplodedFactor, product }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animSpeed, setAnimSpeed] = useState(1.0);

  // Animation frame loop interpolating explodedFactor from 1.0 (Exploded) to 0.0 (Assembled)
  useEffect(() => {
    let animId;
    if (isPlaying) {
      const step = () => {
        setExplodedFactor((prev) => {
          const next = prev - 0.008 * animSpeed;
          if (next <= 0) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, animSpeed, setExplodedFactor]);

  if (!isOpen) return null;

  const stepsList = [
    { label: 'Unassembled Explosion', factor: 1.0 },
    { label: 'Acoustic / PCB Layer Align', factor: 0.65 },
    { label: 'Driver & Housing Snap', factor: 0.35 },
    { label: 'Final Hardware Lock', factor: 0.0 }
  ];

  const handlePlayPause = () => {
    playToggleSound();
    if (!isPlaying && explodedFactor <= 0) {
      setExplodedFactor(1.0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    playClickSound();
    setIsPlaying(false);
    setExplodedFactor(1.0);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="assembly-panel"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <div className="ap-header">
          <div className="ap-title-group">
            <Layers size={18} className="ap-icon" />
            <h3 className="ap-title">3D Part Assembly Animation Sequence</h3>
          </div>
          <button className="ap-close-btn" onClick={() => { playClickSound(); onClose(); }}>
            <X size={16} />
          </button>
        </div>

        <div className="ap-body">
          {/* PLAYBACK CONTROLS */}
          <div className="ap-controls-row">
            <button className="ap-play-btn" onClick={handlePlayPause}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause Sequence' : 'Play Assembly Tour'}</span>
            </button>
            <button className="ap-reset-btn" onClick={handleReset} title="Reset to Exploded View">
              <RotateCcw size={16} />
            </button>
          </div>

          {/* TIMELINE PROGRESS SLIDER */}
          <div className="ap-timeline-box">
            <div className="ap-timeline-lbl-row">
              <span className="ap-lbl">Assembly Completion</span>
              <span className="ap-val">{Math.round((1 - explodedFactor) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={1 - explodedFactor}
              onChange={(e) => {
                setIsPlaying(false);
                setExplodedFactor(1 - parseFloat(e.target.value));
              }}
              className="ap-slider"
            />
          </div>

          {/* STEP PRESETS */}
          <div className="ap-steps-list">
            {stepsList.map((st, idx) => {
              const isActive = Math.abs(explodedFactor - st.factor) < 0.15;
              return (
                <button
                  key={idx}
                  className={`ap-step-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    playClickSound();
                    setIsPlaying(false);
                    setExplodedFactor(st.factor);
                  }}
                >
                  <CheckCircle2 size={13} />
                  <span>Stage {idx + 1}: {st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
