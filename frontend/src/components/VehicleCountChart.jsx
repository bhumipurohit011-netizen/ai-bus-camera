import React, { useState } from 'react';

const VEHICLE_DATA = [
  { type: 'Car', count: 142850, countFormatted: '142,850', color: '#004AC6', share: '50.5%' },
  { type: 'Motorcycle', count: 84210, countFormatted: '84,210', color: '#2563EB', share: '29.8%' },
  { type: 'Bus', count: 18400, countFormatted: '18,400', color: '#636E83', share: '6.5%' },
  { type: 'Truck', count: 24930, countFormatted: '24,930', color: '#475569', share: '8.8%' },
  { type: 'Bicycle', count: 12340, countFormatted: '12,340', color: '#93C5FD', share: '4.4%' },
];

export default function VehicleCountChart() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Maximum value for scaling (150k max)
  const MAX_VAL = 160000;
  const CHART_HEIGHT = 135; // px

  return (
    <div className="bg-white rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
              Vehicle Count by Type (Today)
            </h2>
            <p className="text-[12px] text-slate-500 mt-0.5">
              AI object recognition across primary arterial corridors
            </p>
          </div>
          <div className="text-right">
            <span className="text-[24px] font-bold text-blue-600 block leading-none font-sans">
              282,730
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Total Counted
            </span>
          </div>
        </div>

        {/* Bar Chart Canvas with labeled counts on top */}
        <div className="mt-6 w-full h-56">
          <svg
            className="w-full h-full select-none"
            viewBox="0 0 540 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background horizontal grid lines */}
            <line x1="45" y1="20" x2="520" y2="20" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="65" x2="520" y2="65" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="110" x2="520" y2="110" stroke="#F1F5F9" strokeWidth="1.5" />
            <line x1="45" y1="155" x2="520" y2="155" stroke="#F1F5F9" strokeWidth="1.5" />

            {/* Y-Axis Value Labels */}
            <text x="38" y="24" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              150k
            </text>
            <text x="38" y="69" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              100k
            </text>
            <text x="38" y="114" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              50k
            </text>
            <text x="38" y="159" fill="#94A3B8" fontFamily="Inter" fontSize="10" textAnchor="end">
              0
            </text>

            {/* Bars with labeled counts on top */}
            {/* 1. Car: 142,850 */}
            <g
              onMouseEnter={() => setHoveredIdx(0)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x="75"
                y="27"
                width="50"
                height="128"
                rx="5"
                fill="#004AC6"
                className="transition-all duration-200 hover:opacity-90 hover:brightness-110"
              />
              {/* Count labeled on top */}
              <text
                x="100"
                y="20"
                fill="#0F172A"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                142,850
              </text>
              <text
                x="100"
                y="175"
                fill="#475569"
                fontFamily="Inter"
                fontSize="11.5"
                fontWeight="600"
                textAnchor="middle"
              >
                Car
              </text>
            </g>

            {/* 2. Motorcycle: 84,210 */}
            <g
              onMouseEnter={() => setHoveredIdx(1)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x="170"
                y="79"
                width="50"
                height="76"
                rx="5"
                fill="#2563EB"
                className="transition-all duration-200 hover:opacity-90 hover:brightness-110"
              />
              {/* Count labeled on top */}
              <text
                x="195"
                y="72"
                fill="#0F172A"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                84,210
              </text>
              <text
                x="195"
                y="175"
                fill="#475569"
                fontFamily="Inter"
                fontSize="11.5"
                fontWeight="600"
                textAnchor="middle"
              >
                Motorcycle
              </text>
            </g>

            {/* 3. Bus: 18,400 */}
            <g
              onMouseEnter={() => setHoveredIdx(2)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x="265"
                y="138"
                width="50"
                height="17"
                rx="4"
                fill="#636E83"
                className="transition-all duration-200 hover:opacity-90 hover:brightness-110"
              />
              {/* Count labeled on top */}
              <text
                x="290"
                y="131"
                fill="#0F172A"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                18,400
              </text>
              <text
                x="290"
                y="175"
                fill="#475569"
                fontFamily="Inter"
                fontSize="11.5"
                fontWeight="600"
                textAnchor="middle"
              >
                Bus
              </text>
            </g>

            {/* 4. Truck: 24,930 */}
            <g
              onMouseEnter={() => setHoveredIdx(3)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x="360"
                y="133"
                width="50"
                height="22"
                rx="4"
                fill="#475569"
                className="transition-all duration-200 hover:opacity-90 hover:brightness-110"
              />
              {/* Count labeled on top */}
              <text
                x="385"
                y="126"
                fill="#0F172A"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                24,930
              </text>
              <text
                x="385"
                y="175"
                fill="#475569"
                fontFamily="Inter"
                fontSize="11.5"
                fontWeight="600"
                textAnchor="middle"
              >
                Truck
              </text>
            </g>

            {/* 5. Bicycle: 12,340 */}
            <g
              onMouseEnter={() => setHoveredIdx(4)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer"
            >
              <rect
                x="455"
                y="144"
                width="50"
                height="11"
                rx="3"
                fill="#93C5FD"
                className="transition-all duration-200 hover:opacity-90 hover:brightness-110"
              />
              {/* Count labeled on top */}
              <text
                x="480"
                y="137"
                fill="#0F172A"
                fontFamily="Inter"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                12,340
              </text>
              <text
                x="480"
                y="175"
                fill="#475569"
                fontFamily="Inter"
                fontSize="11.5"
                fontWeight="600"
                textAnchor="middle"
              >
                Bicycle
              </text>
            </g>

            {/* Baseline axis */}
            <line x1="45" y1="155" x2="520" y2="155" stroke="#CBD5E1" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Chart Footer with Calibration index */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11.5px] text-slate-500">
        <span>Calibration confidence index: <strong className="text-slate-800 font-semibold">99.1%</strong></span>
        <span className="flex items-center gap-1.5 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Active AI Detection
        </span>
      </div>
    </div>
  );
}
