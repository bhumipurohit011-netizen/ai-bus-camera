// Utility to generate clean, 100% reliable SVG base64 data URIs for road telemetry & pothole evidence snapshots.
// Guarantees NO humans in any picture, NO broken external image URLs, and clear visible potholes!

export const generatePotholeSvg = ({
  id = 'EVT',
  title = 'Road Damage',
  type = 'pothole',
  severity = 'Urgent',
  depth = '6.5cm',
  width = '65cm',
  busId = 'BUS-017',
}) => {
  const isPothole = type === 'pothole';
  const isWater = type === 'waterlogging';
  const isCongestion = type === 'congestion';
  const isIncident = type === 'incident';

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" style="background:#0f172a; font-family: system-ui, -apple-system, sans-serif;">
  <defs>
    <!-- Asphalt Road Texture Pattern -->
    <pattern id="asphalt" width="100" height="100" patternUnits="userSpaceOnUse">
      <rect width="100" height="100" fill="#1e293b"/>
      <circle cx="15" cy="20" r="1.5" fill="#334155"/>
      <circle cx="75" cy="80" r="2" fill="#334155"/>
      <circle cx="40" cy="50" r="1" fill="#475569"/>
      <circle cx="85" cy="15" r="1.5" fill="#475569"/>
      <path d="M 0 30 Q 20 35 40 30 T 80 30" stroke="#334155" stroke-width="0.5" fill="none"/>
    </pattern>

    <!-- Pothole Deep Gradient -->
    <radialGradient id="potholeGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#090d16"/>
      <stop offset="85%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#475569"/>
    </radialGradient>

    <!-- Water Reflection Gradient -->
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.95"/>
    </linearGradient>

    <!-- HUD Grid Line -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.05"/>
    </pattern>
  </defs>

  <!-- Base Road Canvas -->
  <rect width="800" height="450" fill="url(#asphalt)" />
  <rect width="800" height="450" fill="url(#grid)" />

  <!-- Road Horizon & Perspective Markings -->
  <polygon points="350,110 450,110 760,450 40,450" fill="#1e293b" opacity="0.5" />
  
  <!-- Yellow Double Center Lane Lines -->
  <line x1="395" y1="110" x2="380" y2="450" stroke="#eab308" stroke-width="5" />
  <line x1="405" y1="110" x2="420" y2="450" stroke="#eab308" stroke-width="5" />
  
  <!-- Dashed White Lane Lines -->
  <line x1="200" y1="110" x2="90" y2="450" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="25,25" opacity="0.85" />
  <line x1="600" y1="110" x2="710" y2="450" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="25,25" opacity="0.85" />

  ${
    isPothole
      ? `
  <!-- PROMINENT VISIBLE POTHOLE DAMAGE (100% ROAD, 0% HUMANS) -->
  <g transform="translate(420, 245)">
    <!-- Radiating Asphalt Stress Cracks -->
    <path d="M -130 -30 L -170 -55 M -110 65 L -150 100 M 120 -40 L 160 -65 M 100 70 L 140 105 M 0 -85 L 15 -115" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M -120 -20 L -70 -65 L 60 -75 L 125 -25 L 115 55 L 25 80 L -80 70 Z" fill="#000000" opacity="0.6" />
    
    <!-- Main Pothole Crater Body -->
    <ellipse cx="0" cy="0" rx="110" ry="58" fill="url(#potholeGrad)" stroke="#64748b" stroke-width="3.5" />
    
    <!-- Exposed Aggregate Rocks & Gravel inside Cavity -->
    <ellipse cx="-40" cy="-12" rx="24" ry="14" fill="#334155" opacity="0.95" />
    <ellipse cx="35" cy="18" rx="28" ry="16" fill="#1e293b" opacity="0.95" />
    <circle cx="15" cy="-22" r="8" fill="#64748b" />
    <circle cx="-55" cy="18" r="10" fill="#475569" />
    <circle cx="55" cy="-12" r="9" fill="#94a3b8" />
    <circle cx="-10" cy="25" r="7" fill="#64748b" />
    
    <!-- Measurement Dimensions Callout -->
    <line x1="-110" y1="78" x2="110" y2="78" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" />
    <line x1="-110" y1="72" x2="-110" y2="84" stroke="#ef4444" stroke-width="2" />
    <line x1="110" y1="72" x2="110" y2="84" stroke="#ef4444" stroke-width="2" />
    <text x="0" y="98" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">WIDTH: ${width} | DEPTH: ${depth}</text>
  </g>

  <!-- AI Bounding Box Overlay -->
  <rect x="270" y="155" width="300" height="180" fill="rgba(239, 68, 68, 0.14)" stroke="#ef4444" stroke-width="3" rx="4" />
  
  <!-- Reticle Corners -->
  <path d="M 270 175 L 270 155 L 290 155 M 550 155 L 570 155 L 570 175 M 270 315 L 270 335 L 290 335 M 550 335 L 570 335 L 570 315" stroke="#ffffff" stroke-width="3" fill="none"/>

  <!-- AI Detection Tag -->
  <rect x="270" y="125" width="280" height="28" fill="#ef4444" rx="4" />
  <text x="282" y="144" fill="#ffffff" font-size="13" font-weight="bold">TARGET: POTHOLE (97%) [${depth}]</text>
  `
      : isWater
      ? `
  <!-- WATERLOGGING HAZARD (0% HUMANS) -->
  <g transform="translate(400, 260)">
    <ellipse cx="0" cy="0" rx="190" ry="80" fill="url(#waterGrad)" stroke="#60a5fa" stroke-width="2.5" />
    <ellipse cx="-40" cy="-10" rx="90" ry="30" fill="#60a5fa" opacity="0.3" />
    <ellipse cx="30" cy="20" rx="70" ry="25" fill="none" stroke="#93c5fd" stroke-width="2" opacity="0.7" />
    <text x="0" y="8" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">WATER PONDING (DEPTH: 12cm)</text>
  </g>
  <rect x="180" y="170" width="440" height="180" fill="rgba(59, 130, 246, 0.14)" stroke="#3b82f6" stroke-width="3" rx="4" />
  <rect x="180" y="140" width="270" height="28" fill="#3b82f6" rx="4" />
  <text x="192" y="159" fill="#ffffff" font-size="13" font-weight="bold">TARGET: WATERLOGGING (95%)</text>
  `
      : isCongestion
      ? `
  <!-- TRAFFIC BOTTLENECK (0% HUMANS) -->
  <g transform="translate(400, 240)">
    <rect x="-140" y="-30" width="75" height="42" fill="#ef4444" rx="6" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="-50" y="-50" width="85" height="48" fill="#3b82f6" rx="6" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="50" y="-20" width="80" height="42" fill="#64748b" rx="6" stroke="#ffffff" stroke-width="1.5"/>
  </g>
  <rect x="230" y="165" width="330" height="150" fill="rgba(249, 115, 22, 0.14)" stroke="#f97316" stroke-width="3" rx="4" />
  <rect x="230" y="135" width="260" height="28" fill="#f97316" rx="4" />
  <text x="242" y="154" fill="#ffffff" font-size="13" font-weight="bold">TARGET: CONGESTION (92%)</text>
  `
      : `
  <!-- TRAFFIC SIGN DEFICIENCY (0% HUMANS) -->
  <g transform="translate(580, 200)">
    <line x1="0" y1="130" x2="0" y2="-45" stroke="#94a3b8" stroke-width="9" />
    <polygon points="-35,-45 0,-80 35,-80 70,-45 70,-10 35,25 0,25 -35,-10" fill="#ef4444" stroke="#ffffff" stroke-width="3.5" transform="rotate(-15)"/>
    <text x="15" y="-30" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" transform="rotate(-15)">STOP</text>
  </g>
  <rect x="510" y="105" width="145" height="165" fill="rgba(245, 158, 11, 0.14)" stroke="#f59e0b" stroke-width="3" rx="4" />
  <rect x="510" y="75" width="230" height="28" fill="#f59e0b" rx="4" />
  <text x="522" y="94" fill="#ffffff" font-size="13" font-weight="bold">TARGET: DEFICIENCY (91%)</text>
  `
  }

  <!-- Top Edge Telemetry HUD Watermark -->
  <rect x="15" y="15" width="280" height="32" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <circle cx="32" cy="31" r="5" fill="#ef4444" />
  <text x="46" y="36" fill="#ffffff" font-size="12" font-weight="bold" font-family="monospace">${busId} • AI BUS CAMERA • 60 FPS</text>

  <!-- Bottom GPS Coordinates Watermark -->
  <rect x="15" y="405" width="240" height="28" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <text x="26" y="423" fill="#94a3b8" font-size="12" font-family="monospace">GPS: 12.9716° N, 77.5946° E</text>

  <!-- Bottom Right Timestamp -->
  <rect x="620" y="405" width="165" height="28" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <text x="632" y="423" fill="#00f2fe" font-size="12" font-weight="bold" font-family="monospace">ID: ${id}</text>
</svg>`;

  try {
    if (typeof window !== 'undefined' && window.btoa) {
      return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgContent)))}`;
    }
  } catch (err) {
    // Fallback if btoa fails
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
};
