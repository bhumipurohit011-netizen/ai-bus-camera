import React, { useState } from 'react';
import Icon from './common/Icon.jsx';

export const MAP_EVENTS = [
  {
    id: 'EVT-104',
    type: 'pothole',
    color: '#EF4444',
    label: 'Severe Pothole (6cm)',
    busId: 'BUS-017',
    time: '2 min ago',
    confidence: 96,
    x: 45,
    y: 52,
    location: 'Downtown Central Arterial',
    severity: 'Urgent',
  },
  {
    id: 'EVT-109',
    type: 'pothole',
    color: '#EF4444',
    label: 'Surface Fissure / Pothole',
    busId: 'BUS-017',
    time: '6 min ago',
    confidence: 91,
    x: 24,
    y: 28,
    location: 'North Corridor Approach',
    severity: 'Medium',
  },
  {
    id: 'EVT-110',
    type: 'pothole',
    color: '#EF4444',
    label: 'Road Cavity / Asphalt Loss',
    busId: 'BUS-042',
    time: '18 min ago',
    confidence: 94,
    x: 78,
    y: 68,
    location: 'South Waterfront Bay',
    severity: 'Urgent',
  },
  {
    id: 'EVT-111',
    type: 'pothole',
    color: '#EF4444',
    label: 'Edge Pothole Near Curb',
    busId: 'BUS-009',
    time: '29 min ago',
    confidence: 89,
    x: 34,
    y: 75,
    location: 'West Residential Spur',
    severity: 'Low',
  },
  {
    id: 'EVT-105',
    type: 'congestion',
    color: '#F97316',
    label: 'Traffic Congestion (Level 4)',
    busId: 'BUS-042',
    time: '5 min ago',
    confidence: 92,
    x: 49,
    y: 56,
    location: 'Downtown Central Junction',
    severity: 'High',
  },
  {
    id: 'EVT-112',
    type: 'congestion',
    color: '#F97316',
    label: 'Heavy Bottleneck / Queue',
    busId: 'BUS-001',
    time: '12 min ago',
    confidence: 90,
    x: 73,
    y: 37,
    location: 'Harbor Logistics Gate 2',
    severity: 'High',
  },
  {
    id: 'EVT-113',
    type: 'congestion',
    color: '#F97316',
    label: 'Slow Moving Arterial Flow',
    busId: 'BUS-088',
    time: '22 min ago',
    confidence: 87,
    x: 23,
    y: 72,
    location: 'South Beltway Interchange',
    severity: 'Moderate',
  },
  {
    id: 'EVT-107',
    type: 'waterlogging',
    color: '#3B82F6',
    label: 'Waterlogging (12m ponding)',
    busId: 'BUS-088',
    time: '14 min ago',
    confidence: 95,
    x: 58,
    y: 48,
    location: 'South Harbor Underpass',
    severity: 'Moderate',
  },
  {
    id: 'EVT-106',
    type: 'incident',
    color: '#A855F7',
    label: 'Rash Driving / Near-Miss',
    busId: 'BUS-009',
    time: '8 min ago',
    confidence: 88,
    x: 48,
    y: 16,
    location: 'Ring Road North Exit',
    severity: 'High',
  },
  {
    id: 'EVT-108',
    type: 'deficiency',
    color: '#F59E0B',
    label: 'Obscured Pedestrian Sign',
    busId: 'BUS-031',
    time: '21 min ago',
    confidence: 91,
    x: 32,
    y: 34,
    location: '5th Avenue Crossing',
    severity: 'Low',
  },
];

const BUS_MARKERS = [
  { id: 'BUS-017', x: 41, y: 49, route: 'Route 104', status: 'Online' },
  { id: 'BUS-042', x: 68, y: 32, route: 'Route 42', status: 'Online' },
  { id: 'BUS-088', x: 64, y: 70, route: 'Route 88', status: 'Online' },
];

export default function InteractiveMap({ onSelectEvent, filterType = 'all' }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'routes', 'critical'
  const [hoveredEvent, setHoveredEvent] = useState(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  // Filter markers based on active layer filter
  const displayedEvents = MAP_EVENTS.filter((evt) => {
    if (activeFilter === 'critical') {
      return evt.severity === 'Urgent' || evt.severity === 'High';
    }
    if (activeFilter === 'routes') {
      return evt.busId;
    }
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 flex flex-col overflow-hidden">
      {/* Map Card Header Bar */}
      <div className="px-5 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Live City Map — Event & Congestion Overview
          </h2>
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 rounded-full border border-blue-200/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-[11px] text-blue-700 font-semibold">
              30s Live Poll
            </span>
          </div>
        </div>

        {/* Layer Controls & Zoom Buttons */}
        <div className="flex items-center gap-2">
          {/* Layer Filter Tabs */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 text-[12px] font-medium">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-blue-600 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Layers
            </button>
            <button
              onClick={() => setActiveFilter('routes')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'routes'
                  ? 'bg-white text-blue-600 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Transit Routes
            </button>
            <button
              onClick={() => setActiveFilter('critical')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                activeFilter === 'critical'
                  ? 'bg-white text-blue-600 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Critical Only
            </button>
          </div>

          {/* Heatmap Toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 rounded-lg text-[12px] font-medium border flex items-center gap-1 transition-colors ${
              showHeatmap
                ? 'bg-orange-50 border-orange-200 text-orange-700 font-semibold'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
            title="Toggle Traffic Density Heatmap"
          >
            <Icon name="local_fire_department" size={15} />
            <span>Heatmap</span>
          </button>

          {/* Zoom In / Out / Reset Controls */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
            <button
              onClick={handleZoomIn}
              aria-label="Zoom in"
              title="Zoom In"
              className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs transition-all"
            >
              <Icon name="add" size={17} />
            </button>
            <button
              onClick={handleZoomOut}
              aria-label="Zoom out"
              title="Zoom Out"
              className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs transition-all"
            >
              <Icon name="remove" size={17} />
            </button>
            <button
              onClick={handleResetZoom}
              aria-label="Reset zoom"
              title="Reset View"
              className="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-2xs transition-all"
            >
              <Icon name="crop_free" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Vector GIS Street Map Canvas */}
      <div className="relative w-full h-[520px] bg-[#F4F6F8] overflow-hidden select-none">
        {/* Transform container for zoom */}
        <div
          className="w-full h-full relative transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Base SVG Map Grid & City Streets */}
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1000 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* River Gradient */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </linearGradient>

              {/* Heatmap Radial Gradients (Red to Yellow to Transparent) */}
              <radialGradient id="heatDowntown" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.55" />
                <stop offset="40%" stopColor="#F97316" stopOpacity="0.4" />
                <stop offset="75%" stopColor="#EAB308" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="heatHarbor" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
                <stop offset="55%" stopColor="#FBBF24" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="heatBeltway" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.45" />
                <stop offset="65%" stopColor="#FB923C" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FED7AA" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background City Landmass */}
            <rect width="1000" height="600" fill="#F8FAFC" />

            {/* Municipal Parks & Green Belts */}
            <path
              d="M 60 70 C 130 60, 180 110, 170 190 C 120 230, 40 210, 30 140 Z"
              fill="#E2FAD9"
              opacity="0.9"
            />
            <path
              d="M 680 40 C 760 30, 840 70, 830 160 C 760 180, 710 140, 670 100 Z"
              fill="#E2FAD9"
              opacity="0.9"
            />
            <path
              d="M 800 390 C 910 380, 960 450, 940 540 C 860 560, 810 500, 790 440 Z"
              fill="#E2FAD9"
              opacity="0.9"
            />

            {/* River & Estuary Basin */}
            <path
              d="M 380 0 C 410 130, 480 220, 520 280 C 580 370, 610 470, 600 600 L 480 600 C 490 510, 470 410, 420 330 C 370 250, 310 150, 270 0 Z"
              fill="url(#riverGrad)"
            />
            <path
              d="M 520 280 Q 640 290 750 260 T 920 280 L 930 320 Q 770 300 650 330 T 500 320 Z"
              fill="url(#riverGrad)"
              opacity="0.8"
            />

            {/* Minor Street Grid Network (Muted Grey/Beige) */}
            <g stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round">
              <line x1="80" y1="100" x2="260" y2="100" />
              <line x1="60" y1="160" x2="260" y2="160" />
              <line x1="50" y1="220" x2="330" y2="220" />
              <line x1="60" y1="280" x2="350" y2="280" />
              <line x1="80" y1="360" x2="400" y2="360" />
              <line x1="120" y1="440" x2="440" y2="440" />
              <line x1="150" y1="510" x2="460" y2="510" />
              <line x1="550" y1="90" x2="940" y2="90" />
              <line x1="570" y1="160" x2="960" y2="160" />
              <line x1="580" y1="220" x2="980" y2="220" />
              <line x1="640" y1="360" x2="960" y2="360" />
              <line x1="630" y1="430" x2="940" y2="430" />
              <line x1="620" y1="500" x2="910" y2="500" />
              <line x1="120" y1="40" x2="120" y2="540" />
              <line x1="190" y1="40" x2="190" y2="550" />
              <line x1="260" y1="120" x2="260" y2="560" />
              <line x1="330" y1="220" x2="330" y2="560" />
              <line x1="660" y1="50" x2="660" y2="560" />
              <line x1="740" y1="50" x2="740" y2="560" />
              <line x1="820" y1="50" x2="820" y2="560" />
              <line x1="900" y1="80" x2="900" y2="560" />
            </g>

            {/* Primary Arterials & Expressways (Base width) */}
            <g stroke="#CBD5E1" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 20 480 Q 280 430 460 310 T 880 140" />
              <path d="M 90 40 Q 520 120 920 70" />
              <path d="M 240 580 C 320 450 420 300 680 180 T 960 120" />
              <path d="M 80 320 Q 380 340 560 410 T 940 480" />
            </g>

            {/* Active Core Line Overlay for Transit Arterials */}
            <g stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 20 480 Q 280 430 460 310 T 880 140" />
              <path d="M 90 40 Q 520 120 920 70" />
              <path d="M 240 580 C 320 450 420 300 680 180 T 960 120" />
              <path d="M 80 320 Q 380 340 560 410 T 940 480" />
            </g>

            {/* Bridges across Waterway */}
            <g stroke="#475569" strokeWidth="4">
              <line x1="390" y1="285" x2="435" y2="305" />
              <line x1="480" y1="365" x2="520" y2="380" />
              <line x1="560" y1="465" x2="605" y2="475" />
            </g>

            {/* Translucent Heatmap Blobs (Toggled by user) */}
            {showHeatmap && (
              <g className="transition-opacity duration-300">
                <circle cx="485" cy="340" r="115" fill="url(#heatDowntown)" />
                <circle cx="730" cy="220" r="95" fill="url(#heatHarbor)" />
                <circle cx="230" cy="440" r="85" fill="url(#heatBeltway)" />
              </g>
            )}

            {/* District Typographic Labels */}
            <text x="140" y="80" fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="700" letterSpacing="0.12em">
              NORTH CORRIDOR
            </text>
            <text x="170" y="310" fill="#475569" fontFamily="Inter" fontSize="12" fontWeight="700" letterSpacing="0.15em">
              MIDTOWN ARTERIAL
            </text>
            <text x="440" y="260" fill="#0F172A" fontFamily="Inter" fontSize="13" fontWeight="800" letterSpacing="0.16em">
              DOWNTOWN CENTRAL
            </text>
            <text x="730" y="140" fill="#64748B" fontFamily="Inter" fontSize="11" fontWeight="700" letterSpacing="0.12em">
              HARBOR LOGISTICS
            </text>
            <text x="680" y="470" fill="#475569" fontFamily="Inter" fontSize="12" fontWeight="700" letterSpacing="0.15em">
              SOUTH WATERFRONT
            </text>
          </svg>

          {/* Dynamic Colored Circular Markers Layer */}
          {displayedEvents.map((evt) => (
            <div
              key={evt.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
              style={{ left: `${evt.x}%`, top: `${evt.y}%` }}
              onClick={() => onSelectEvent && onSelectEvent(evt)}
              onMouseEnter={() => setHoveredEvent(evt)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className="relative flex items-center justify-center">
                {/* Radar ping animation for urgent/critical events */}
                <span
                  className="animate-ping absolute inline-flex h-7 w-7 rounded-full opacity-60"
                  style={{ backgroundColor: evt.color }}
                />
                {/* Main colored circular marker */}
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center text-white shadow-md border border-white transition-transform duration-150 group-hover:scale-125"
                  style={{ backgroundColor: evt.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-2xs" />
                </div>
              </div>

              {/* Hover Tooltip */}
              <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-[11px] whitespace-nowrap shadow-xl z-40 border border-slate-700 pointer-events-none">
                <div className="font-semibold text-[11.5px] flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: evt.color }}
                  />
                  <span>{evt.label}</span>
                </div>
                <div className="text-slate-300 text-[10px] mt-0.5 flex items-center gap-2">
                  <span>{evt.busId}</span>
                  <span>•</span>
                  <span>{evt.time}</span>
                  <span>•</span>
                  <span className="text-blue-300">{evt.confidence}% Conf.</span>
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Click to inspect edge snapshot
                </div>
              </div>
            </div>
          ))}

          {/* Active Bus Markers moving along routes */}
          {BUS_MARKERS.map((bus) => (
            <div
              key={bus.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 shadow-md bg-slate-900/95 text-white px-2 py-0.5 rounded-full flex items-center gap-1 z-20 border border-slate-700 hover:scale-105 transition-transform cursor-pointer"
              style={{ left: `${bus.x}%`, top: `${bus.y}%` }}
              title={`${bus.id} (${bus.route})`}
            >
              <Icon name="directions_bus" size={13} className="text-blue-400" />
              <span className="text-[11px] font-bold tracking-tight">
                {bus.id}
              </span>
            </div>
          ))}
        </div>

        {/* Small Legend Box in Bottom-Left Corner */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-lg p-3 shadow-md border border-slate-200/80 flex flex-col gap-1.5 z-30 max-w-xs select-none">
          <div className="flex items-center justify-between gap-6 pb-1 border-b border-slate-100">
            <span className="text-[10.5px] uppercase font-bold text-slate-800 tracking-wider">
              Map Telemetry Legend
            </span>
            <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.2 rounded">
              Active Layer
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11.5px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] shadow-xs" />
              <span>
                Pothole <strong className="text-slate-900 font-bold">(47)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shadow-xs" />
              <span>
                Congestion <strong className="text-slate-900 font-bold">(18)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-xs" />
              <span>
                Waterlogging <strong className="text-slate-900 font-bold">(6)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-xs" />
              <span>
                Incident <strong className="text-slate-900 font-bold">(9)</strong>
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-2 pt-0.5 border-t border-slate-100">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-xs" />
              <span>
                Deficiency / Missing Sign <strong className="text-slate-900 font-bold">(14)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
