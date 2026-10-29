import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle } from 'react-leaflet';
import L from 'leaflet';
import MapLegend from './MapLegend.jsx';
import { generatePotholeSvg } from '../../utils/potholeImages.js';
import Icon from '../common/Icon.jsx';

// Codified semantic colors matching DESIGN.md
const SEMANTIC_COLORS = {
  pothole: '#EF4444',
  congestion: '#F97316',
  deficiency: '#F59E0B',
  waterlogging: '#3B82F6',
  incident: '#A855F7',
  fleet: '#10B981',
};

// Safe evidence snapshot component with guaranteed visible pothole and zero broken images
function PopupEvidenceImage({ evt }) {
  const fallback = generatePotholeSvg({
    id: evt.id,
    title: evt.title,
    type: evt.type,
    severity: evt.severity,
    busId: evt.busId,
  });

  const [src, setSrc] = useState(
    evt.evidenceImage && !evt.evidenceImage.startsWith('http')
      ? evt.evidenceImage
      : fallback
  );

  return (
    <div className="mt-2 rounded overflow-hidden aspect-video relative bg-slate-900 border border-slate-700">
      <img
        src={src}
        onError={() => setSrc(fallback)}
        alt="Pothole Telemetry Evidence"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-1 left-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
        {evt.busId || 'BUS-017'} • Edge AI
      </div>
    </div>
  );
}

// Create custom animated circular HTML marker
const createLeafletEventIcon = (type) => {
  const color = SEMANTIC_COLORS[type] || '#EF4444';
  return L.divIcon({
    className: 'custom-leaflet-event-icon',
    html: `
      <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <span style="position: absolute; width: 26px; height: 26px; border-radius: 9999px; background-color: ${color}; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="width: 16px; height: 16px; border-radius: 9999px; background-color: ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.25); border: 2px solid #ffffff;">
          <span style="width: 5px; height: 5px; border-radius: 9999px; background-color: #ffffff;"></span>
        </div>
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14],
  });
};

// Create custom bus badge marker
const createLeafletBusIcon = (busId) => {
  return L.divIcon({
    className: 'custom-leaflet-bus-icon',
    html: `
      <div style="background-color: #0F172A; color: #F8FAFC; padding: 3px 8px; border-radius: 9999px; display: flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 1px solid #334155; font-family: Inter, sans-serif; font-size: 11px; font-weight: 700; white-space: nowrap;">
        <svg viewBox="0 0 24 24" width="13" height="13" style="fill: #60A5FA; vertical-align: middle; flex-shrink: 0;"><path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/></svg>
        <span>${busId}</span>
      </div>
    `,
    iconSize: [76, 24],
    iconAnchor: [38, 12],
    popupAnchor: [0, -12],
  });
};

const HEATMAP_CIRCLES = [
  { center: [12.9716, 77.5946], radius: 650, color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.35 },
  { center: [12.9780, 77.6050], radius: 850, color: '#F97316', fillColor: '#F97316', fillOpacity: 0.3 },
  { center: [12.9650, 77.6100], radius: 550, color: '#F59E0B', fillColor: '#F59E0B', fillOpacity: 0.25 },
];

export default function CityMap({ events = [], buses = [], onSelectEvent }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Filter events based on active button
  const displayedEvents = events.filter((evt) => {
    if (activeFilter === 'critical') return evt.severity === 'Urgent' || evt.severity === 'High';
    if (activeFilter === 'routes') return evt.busId;
    return true;
  });

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm flex flex-col overflow-hidden border border-outline-variant/30">
      {/* Map Header Bar */}
      <div className="px-space-base py-space-sm bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-sm border-b border-outline-variant/30 z-20">
        <div className="flex items-center gap-space-sm">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Live City Telemetry Map
          </span>
          <div className="flex items-center gap-space-xs px-space-xs py-space-2xs bg-surface-container-low rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="font-label-sm text-label-sm text-primary font-medium">
              30s Live Poll
            </span>
          </div>
        </div>

        {/* Controls & Filter Pills */}
        <div className="flex items-center gap-space-xs">
          {/* Layer Filter Tabs */}
          <div className="flex bg-surface-container-low p-space-2xs rounded-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
                activeFilter === 'all'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveFilter('routes')}
              className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
                activeFilter === 'routes'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Transit Routes
            </button>
            <button
              onClick={() => setActiveFilter('critical')}
              className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
                activeFilter === 'critical'
                  ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Critical Only
            </button>
          </div>

          {/* Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-space-sm py-space-2xs rounded-lg text-label-sm font-label-sm border transition-colors flex items-center gap-1 ${
              showHeatmap
                ? 'bg-secondary-container text-on-secondary-container border-secondary/30 font-semibold'
                : 'bg-surface-container-low text-on-surface-variant border-transparent'
            }`}
          >
            <Icon name="local_fire_department" size={15} />
            <span>Heatmap</span>
          </button>
        </div>
      </div>

      {/* Real Leaflet Map Container */}
      <div className="relative w-full h-[520px] bg-[#EEF2F6] overflow-hidden select-none z-10">
        <MapContainer
          center={[12.9730, 77.5950]}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%', zIndex: 1 }}
        >
          {/* OpenStreetMap Tile Layer (Clean muted street map style) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Zoom Controls placed in Top-Right Corner */}
          <ZoomControl position="topright" />

          {/* Translucent Heatmap Overlay Layer */}
          {showHeatmap &&
            HEATMAP_CIRCLES.map((heat, idx) => (
              <Circle
                key={`heat-${idx}`}
                center={heat.center}
                radius={heat.radius}
                pathOptions={{
                  color: heat.color,
                  fillColor: heat.fillColor,
                  fillOpacity: heat.fillOpacity,
                  weight: 0,
                }}
              />
            ))}

          {/* Real Leaflet Markers per event type */}
          {displayedEvents.map((evt) => (
            <Marker
              key={evt.id}
              position={[evt.lat, evt.lng]}
              icon={createLeafletEventIcon(evt.type)}
              eventHandlers={{
                click: () => onSelectEvent && onSelectEvent(evt),
              }}
            >
              {/* Marker Popup showing event type, bus ID, timestamp, GPS coords, confidence, severity, snapshot */}
              <Popup className="custom-telemetry-popup">
                <div className="p-1 max-w-[260px] font-sans">
                  <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100">
                    <span className="font-bold text-[13px] text-slate-900 leading-tight">
                      {evt.title}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                      {evt.confidence}% Conf.
                    </span>
                  </div>

                  {/* Pothole / Defect Evidence Snapshot */}
                  <PopupEvidenceImage evt={evt} />

                  <div className="mt-2 space-y-1 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Reporting Bus:</span>
                      <strong className="text-slate-800">{evt.busId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time:</span>
                      <span>{evt.timestamp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">GPS Coords:</span>
                      <span className="font-mono text-[10px]">{evt.lat.toFixed(4)}, {evt.lng.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Severity:</span>
                      <strong className={evt.severity === 'Urgent' ? 'text-red-600 font-bold' : 'text-slate-800'}>
                        {evt.severity}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectEvent && onSelectEvent(evt)}
                    className="mt-2 w-full py-1 bg-blue-600 text-white rounded text-[11px] font-semibold hover:bg-blue-700 transition-colors text-center"
                  >
                    Inspect Telemetry
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Active Bus Fleet Markers */}
          {buses.map((bus) => (
            <Marker
              key={bus.id}
              position={[bus.lat, bus.lng]}
              icon={createLeafletBusIcon(bus.id)}
            >
              <Popup>
                <div className="p-1 font-sans text-[12px]">
                  <p className="font-bold text-slate-900">{bus.id}</p>
                  <p className="text-slate-500">{bus.route}</p>
                  <p className="text-emerald-600 font-semibold mt-1">
                    Status: {bus.status} ({bus.speed} km/h)
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend Box matching mockup in bottom-left */}
        <MapLegend />
      </div>
    </div>
  );
}
