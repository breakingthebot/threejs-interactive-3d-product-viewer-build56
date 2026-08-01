// src/components/BOMSheetModal.jsx
// Interactive Bill of Materials (BOM) Catalog & Sub-Assembly Inspector.
// Connects to: src/App.jsx, src/components/Toolbar.jsx
// Created: 2026-08-01

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Layers, X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Wrench } from 'lucide-react';
import { playClickSound } from '../utils/soundFX';
import './BOMSheetModal.css';

/**
 * Renders Bill of Materials (BOM) Catalog Drawer.
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state.
 * @param {Function} props.onClose - Close modal handler.
 * @param {Object} props.product - Active product object.
 */
export function BOMSheetModal({ isOpen, onClose, product }) {
  const [selectedPartId, setSelectedPartId] = useState(null);

  if (!isOpen) return null;

  // Detailed Bill of Materials dataset for each product
  const bomData = {
    cyber_headphones: [
      { id: 'p1', name: 'Acoustic Driver Chamber', partNo: 'BOM-HP-001', material: 'Precision Beryllium Alloy', weight: '42g', qty: 2, status: 'In Stock' },
      { id: 'p2', name: 'Memory Foam Earcup Cushion', partNo: 'BOM-HP-002', material: 'Cooling Gel Hybrid Leatherette', weight: '28g', qty: 2, status: 'In Stock' },
      { id: 'p3', name: 'Stainless Steel Headband Frame', partNo: 'BOM-HP-003', material: '316L Brushed Steel', weight: '85g', qty: 1, status: 'In Stock' },
      { id: 'p4', name: 'Active Noise Cancellation PCB', partNo: 'BOM-HP-004', material: 'FR4 Quad-Layer PCB', weight: '12g', qty: 2, status: 'In Stock' },
      { id: 'p5', name: 'Haptic Bass Actuator', partNo: 'BOM-HP-005', material: 'Neodymium N52 Magnet', weight: '18g', qty: 2, status: 'Low Stock' }
    ],
    smart_watch: [
      { id: 'w1', name: 'AMOLED Sapphire Glass Display', partNo: 'BOM-SW-001', material: 'Synthetic Sapphire Crystal', weight: '14g', qty: 1, status: 'In Stock' },
      { id: 'w2', name: 'Titanium Grade 5 Chassis', partNo: 'BOM-SW-002', material: 'Ti-6Al-4V Titanium', weight: '32g', qty: 1, status: 'In Stock' },
      { id: 'w3', name: 'Bio-Sensor PPG Array', partNo: 'BOM-SW-003', material: 'Optical Silicone Lens', weight: '5g', qty: 1, status: 'In Stock' }
    ],
    mechanical_keyboard: [
      { id: 'k1', name: 'Hot-Swappable Switch Plate', partNo: 'BOM-MK-001', material: 'FR4 Anodized Aluminum', weight: '180g', qty: 1, status: 'In Stock' },
      { id: 'k2', name: 'PBT Double-Shot Keycaps', partNo: 'BOM-MK-002', material: 'PBT Thermoplastic', weight: '120g', qty: 1, status: 'In Stock' }
    ]
  }[product.id] || [
    { id: 'gen1', name: 'Primary Composite Shell', partNo: 'BOM-GEN-001', material: 'Carbon Fiber Hybrid', weight: '50g', qty: 1, status: 'In Stock' }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="bom-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bom-modal-card"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bm-header">
            <div className="bm-title-group">
              <span className="bm-kicker">Mechanical Hardware Specification</span>
              <h2 className="bm-title">
                <FileText size={20} className="bm-icon" /> Bill of Materials (BOM) Sheet
              </h2>
            </div>
            <button className="bm-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="bm-body">
            {/* BOM PARTS TABLE */}
            <div className="bm-table-wrap">
              <table className="bm-table">
                <thead>
                  <tr>
                    <th>Part Name</th>
                    <th>Part No.</th>
                    <th>Material</th>
                    <th>Weight</th>
                    <th>Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bomData.map((part) => {
                    const isSelected = selectedPartId === part.id;
                    return (
                      <tr
                        key={part.id}
                        className={`bm-row ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          playClickSound();
                          setSelectedPartId(part.id);
                        }}
                      >
                        <td className="bm-part-name">{part.name}</td>
                        <td className="bm-code">{part.partNo}</td>
                        <td>{part.material}</td>
                        <td>{part.weight}</td>
                        <td>{part.qty}</td>
                        <td>
                          <span className={`bm-status-pill ${part.status === 'In Stock' ? 'green' : 'amber'}`}>
                            {part.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* TOTAL WEIGHT & CERTIFICATION */}
            <div className="bm-footer-row">
              <div className="bm-cert-tag">
                <CheckCircle2 size={15} className="green-icon" />
                <span>ISO-9001 Certified OEM Assembly Standard</span>
              </div>
              <button className="bm-order-btn" onClick={() => playClickSound()}>
                <Wrench size={15} />
                <span>Order Replacement Parts</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
