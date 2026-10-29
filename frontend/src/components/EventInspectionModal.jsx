import React, { useState } from 'react';
import Icon from './common/Icon.jsx';
import { generatePotholeSvg } from '../utils/potholeImages.js';

export default function EventInspectionModal({ event, onClose }) {
  if (!event) return null;

  const defaultSvg = generatePotholeSvg({
    id: event.id || 'EVT-104',
    title: event.title || event.label || 'Road Defect',
    type: event.type || 'pothole',
    severity: event.severity || 'Urgent',
    depth: event.depth || '6.5cm',
    width: event.width || '65cm',
    busId: event.busId || 'BUS-017',
  });

  const [imgSrc, setImgSrc] = useState(event.evidenceImage || defaultSvg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: event.color || event.dotColor || '#EF4444' }}
            />
            <div>
              <h3 className="text-[15px] font-bold tracking-tight">
                {event.title || event.label || event.typeText || 'Telemetry Event'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {event.id} • AI Bus Camera Telemetry Feed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {/* Edge Camera Evidence Snapshot (Guaranteed Visible, 0 Humans) */}
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video flex items-center justify-center group">
            <img
              src={imgSrc}
              onError={() => setImgSrc(defaultSvg)}
              alt="Edge Camera Evidence"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Video overlay watermark */}
            <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>BUS-CAM • 60 FPS</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
              GPS: {event.lat ? `${event.lat.toFixed(4)}° N, ${event.lng.toFixed(4)}° E` : '12.9716° N, 77.5946° E'}
            </div>
          </div>

          {/* Telemetry metadata grid */}
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">
                Reporting Transit Bus
              </span>
              <span className="font-bold text-slate-800 text-[13px] flex items-center gap-1 mt-0.5">
                <Icon name="directions_bus" size={15} className="text-blue-600" />
                {event.busId || 'BUS-017'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">
                Confidence Rating
              </span>
              <span className="font-bold text-blue-600 text-[13px] mt-0.5 block">
                {event.confidence || 96}% (Validated by Edge Model v4)
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">
                Location / Corridor
              </span>
              <span className="font-medium text-slate-800 text-[12px] mt-0.5 block truncate">
                {event.location || 'Downtown Central Arterial'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10.5px] uppercase font-semibold">
                Severity Classification
              </span>
              <span className="font-bold text-red-600 text-[12px] mt-0.5 flex items-center gap-1">
                <Icon name="warning" size={14} />
                {event.severity || 'Urgent Priority'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-[12.5px] font-semibold hover:bg-white transition-colors"
          >
            Dismiss
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Maintenance dispatch ticket created for ${event.id || 'EVT'}`);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-[12.5px] font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Icon name="local_shipping" size={16} />
              <span>Dispatch Repair Crew</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
