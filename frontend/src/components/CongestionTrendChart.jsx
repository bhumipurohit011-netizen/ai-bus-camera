import React, { useState } from 'react';

const TREND_POINTS = [
  { time: '00:00', val: 24, x: 55, y: 148 },
  { time: '04:00', val: 12, x: 130, y: 164 },
  { time: '08:00', val: 88, x: 205, y: 63 },
  { time: '12:00', val: 64, x: 280, y: 95 },
  { time: '16:00', val: 92, x: 355, y: 57 },
  { time: '18:00', val: 96, x: 410, y: 52, isPeak: true },
  { time: '20:00', val: 58, x: 460, y: 103 },
  { time: 'Now', val: 38, x: 510, y: 129 },
];

export default function CongestionTrendChart() {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
              Traffic Congestion Trend (Last 24 Hours)
            </h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              Average density sampled in 2-hour sliding windows
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-[11.5px] font-semibold text-blue-700">
              Urban Arterials
            </span>
          </div>
        </div>

        {/* SVG Line Trend Chart */}
        <div className="mt-6 w-full h-56 relative">
          <svg
            className="w-full h-full select-none"
            viewBox="0 0 540 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Shaded Area Underneath Gradient */}
              <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines */}
            <line x1="45" y1="20" x2="520" y2="20" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="60" x2="520" y2="60" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="100" x2="520" y2="100" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="140" x2="520" y2="140" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="180" x2="520" y2="180" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Y-Axis Value Labels (Vehicles/min) */}
            <text x="38" y="24" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              120
            </text>
            <text x="38" y="64" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              90
            </text>
            <text x="38" y="104" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              60
            </text>
            <text x="38" y="144" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              30
            </text>
            <text x="38" y="184" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              0
            </text>

            {/* Horizontal Dashed Threshold Line: Severe Congestion Threshold (at 80 v/min -> y coord 73.3) */}
            <line
              x1="45"
              y1="73"
              x2="520"
              y2="73"
              stroke="#EF4444"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
            <text
              x="515"
              y="67"
              fill="#EF4444"
              fontFamily="Inter"
              fontSize="9.5"
              fontWeight="700"
              textAnchor="end"
            >
              Severe Congestion Threshold (80 v/min)
            </text>

            {/* Shaded Area Underneath Line */}
            <path
              d="M 55 148 C 90 156, 110 164, 130 164 C 165 164, 175 63, 205 63 C 240 63, 255 95, 280 95 C 315 95, 330 57, 355 57 C 380 57, 395 52, 410 52 C 435 52, 445 103, 460 103 C 485 103, 495 129, 510 129 L 510 180 L 55 180 Z"
              fill="url(#trendAreaGradient)"
            />

            {/* Smooth Main Line Graph */}
            <path
              d="M 55 148 C 90 156, 110 164, 130 164 C 165 164, 175 63, 205 63 C 240 63, 255 95, 280 95 C 315 95, 330 57, 355 57 C 380 57, 395 52, 410 52 C 435 52, 445 103, 460 103 C 485 103, 495 129, 510 129"
              stroke="#2563EB"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Control Point Dots with interactive tooltips */}
            {TREND_POINTS.map((pt, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setActivePoint(pt)}
                onMouseLeave={() => setActivePoint(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.isPeak ? 5 : 3.5}
                  fill={pt.isPeak ? '#EF4444' : '#2563EB'}
                  stroke="#FFFFFF"
                  strokeWidth={pt.isPeak ? 2 : 1.5}
                  className="transition-transform duration-150 hover:scale-150"
                />
              </g>
            ))}

            {/* Peak Callout Badge at 18:00 (Peak: 96 v/min) */}
            <g>
              <rect x="355" y="22" width="110" height="22" rx="5" fill="#0F172A" />
              <text
                x="410"
                y="37"
                fill="#FFFFFF"
                fontFamily="Inter"
                fontSize="10.5"
                fontWeight="700"
                textAnchor="middle"
              >
                Peak: 96 v/min
              </text>
              <polygon points="410,48 405,44 415,44" fill="#0F172A" />
            </g>

            {/* X-Axis Hour Labels */}
            <text x="55" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              00:00
            </text>
            <text x="130" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              04:00
            </text>
            <text x="205" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              08:00
            </text>
            <text x="280" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              12:00
            </text>
            <text x="355" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              16:00
            </text>
            <text
              x="410"
              y="198"
              fill="#EF4444"
              fontFamily="Inter"
              fontSize="10.5"
              fontWeight="700"
              textAnchor="middle"
            >
              18:00
            </text>
            <text x="460" y="198" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="middle">
              20:00
            </text>
            <text
              x="510"
              y="198"
              fill="#2563EB"
              fontFamily="Inter"
              fontSize="10.5"
              fontWeight="700"
              textAnchor="middle"
            >
              Now
            </text>
          </svg>

          {/* Dynamic hover tooltip for point */}
          {activePoint && (
            <div
              className="absolute bg-slate-900 text-white text-[11px] px-2 py-1 rounded shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full mb-2"
              style={{
                left: `${(activePoint.x / 540) * 100}%`,
                top: `${(activePoint.y / 210) * 100}%`,
              }}
            >
              <strong>{activePoint.time}</strong>: {activePoint.val} v/min
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11.5px] text-slate-500">
        <span>Evening rush peak duration: <strong className="text-slate-800 font-semibold">114 mins</strong></span>
        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
          Flow Velocity: Normalized
        </span>
      </div>
    </div>
  );
}
