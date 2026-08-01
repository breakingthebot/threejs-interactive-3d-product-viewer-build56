// src/components/VoiceNavigator.jsx
// Multilingual Voice Command Viewport Navigator using Web Speech API.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-08-01

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { playClickSound, playToggleSound } from '../utils/soundFX';
import './VoiceNavigator.css';

/**
 * Renders Web Speech API Voice Navigator HUD component.
 * @param {Object} props
 * @param {boolean} props.isActive - Voice listening state.
 * @param {Function} props.setIsActive - Active state updater.
 * @param {Object} props.actions - Callback dictionary for recognized commands.
 */
export function VoiceNavigator({ isActive, setIsActive, actions }) {
  const [transcript, setTranscript] = useState('');
  const [lastCommand, setLastCommand] = useState(null);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript.toLowerCase().trim();
        setTranscript(text);

        if (event.results[current].isFinal) {
          handleVoiceCommand(text);
        }
      };

      rec.onerror = (e) => {
        console.warn('Speech recognition error', e);
      };

      setRecognition(rec);
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      if (isActive) {
        try {
          recognition.start();
        } catch (e) {}
      } else {
        try {
          recognition.stop();
        } catch (e) {}
      }
    }
  }, [isActive, recognition]);

  const handleVoiceCommand = (text) => {
    if (text.includes('explode') || text.includes('assembly')) {
      if (actions.onExplode) actions.onExplode();
      setLastCommand('Explode Model View');
    } else if (text.includes('ruler') || text.includes('measure')) {
      if (actions.onRuler) actions.onRuler();
      setLastCommand('Toggle 3D Ruler');
    } else if (text.includes('wireframe') || text.includes('poly')) {
      if (actions.onWireframe) actions.onWireframe();
      setLastCommand('Toggle Wireframe Mode');
    } else if (text.includes('rotate') || text.includes('turn')) {
      if (actions.onAutoRotate) actions.onAutoRotate();
      setLastCommand('Toggle Auto-Rotate');
    } else if (text.includes('thermal') || text.includes('heat')) {
      if (actions.onThermal) actions.onThermal();
      setLastCommand('Toggle Thermal Heatmap');
    } else if (text.includes('reset') || text.includes('home')) {
      if (actions.onReset) actions.onReset();
      setLastCommand('Reset Viewport');
    }
    playToggleSound();
  };

  if (!isActive) return null;

  return (
    <motion.div
      className="voice-hud-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="vh-badge">
        <div className="vh-mic-pulse">
          <Mic size={16} className="vh-mic-icon" />
        </div>
        <div className="vh-text-group">
          <span className="vh-title">Voice Control Active</span>
          <span className="vh-transcript">{transcript ? `"${transcript}"` : 'Listening for "Explode", "Ruler", "Rotate"...'}</span>
        </div>
        {lastCommand && (
          <div className="vh-cmd-tag">
            <CheckCircle2 size={13} />
            <span>{lastCommand}</span>
          </div>
        )}
        <button className="vh-stop-btn" onClick={() => setIsActive(false)}>
          <MicOff size={14} />
        </button>
      </div>
    </motion.div>
  );
}
