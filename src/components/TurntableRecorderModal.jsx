// src/components/TurntableRecorderModal.jsx
// Interactive 3D Turntable 360 Video & Animation Showcase Recorder.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-08-01

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Square, Download, X, Film, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './TurntableRecorderModal.css';

/**
 * Renders 360 Turntable Video Recorder Modal.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility.
 * @param {Function} props.onClose - Modal close handler.
 * @param {Object} props.product - Active product object.
 */
export function TurntableRecorderModal({ isOpen, onClose, product }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  if (!isOpen) return null;

  const handleStartRecording = () => {
    playClickSound();
    setVideoUrl(null);
    setProgress(0);
    recordedChunksRef.current = [];

    const canvas = document.querySelector('.r3f-canvas canvas');
    if (!canvas) return;

    try {
      const stream = canvas.captureStream(30); // 30 FPS stream
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsRecording(false);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);

      // Simulate 5-second 360 rotation recording interval
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        }
      }, 500);
    } catch (e) {
      console.warn('MediaRecorder canvas capture error', e);
      setIsRecording(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="turntable-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="turntable-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tm-header">
            <div className="tm-title-group">
              <span className="tm-kicker">360 Showcase Studio</span>
              <h2 className="tm-title">
                <Video size={20} className="tm-icon" /> 360 Video &amp; Animation Recorder
              </h2>
            </div>
            <button className="tm-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="tm-body">
            {/* RECORDING STATUS / PROGRESS BAR */}
            {isRecording ? (
              <div className="tm-recording-box">
                <div className="tm-pulse-red" />
                <span className="tm-rec-text">Recording 360 Product Rotation ({progress}%)</span>
                <div className="tm-progress-bar">
                  <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : (
              <div className="tm-info-box">
                <Film size={24} className="tm-film-icon" />
                <div className="tm-info-text">
                  <span className="tm-info-head">High-Definition 360 WebM Capture</span>
                  <span className="tm-info-sub">Captures full 360-degree rotation stream from WebGL canvas at 30 FPS</span>
                </div>
              </div>
            )}

            {/* PREVIEW AND DOWNLOAD */}
            {videoUrl && (
              <div className="tm-video-preview-card">
                <div className="tm-success-tag">
                  <CheckCircle2 size={16} className="green-icon" />
                  <span>360 Video Render Complete!</span>
                </div>
                <video src={videoUrl} controls autoPlay loop className="tm-video-player" />
                <a
                  href={videoUrl}
                  download={`${product.id}-360-turntable.webm`}
                  className="tm-download-btn"
                  onClick={() => playClickSound()}
                >
                  <Download size={16} />
                  <span>Download WebM Video Showcase</span>
                </a>
              </div>
            )}

            {/* TRIGGER RECORD BUTTON */}
            {!videoUrl && (
              <button
                className="tm-rec-btn"
                onClick={handleStartRecording}
                disabled={isRecording}
              >
                <Play size={18} />
                <span>{isRecording ? 'Recording in progress...' : 'Start 360 Turntable Recording'}</span>
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
