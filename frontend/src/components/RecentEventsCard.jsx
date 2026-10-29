import React from 'react';
import Icon from './common/Icon.jsx';
import { generatePotholeSvg } from '../utils/potholeImages.js';

const RECENT_EVENTS = [
  {
    id: 'EVT-104',
    dotColor: '#EF4444',
    typeText: 'Severe Deep Pothole (Depth: 7.5cm)',
    busId: 'BUS-017',
    time: '2 min ago',
    confidence: '96%',
    severity: 'Urgent',
    location: 'Downtown Central Arterial',
    evidenceImage: generatePotholeSvg({
      id: 'EVT-104',
      title: 'Severe Deep Pothole',
      type: 'pothole',
      severity: 'Urgent',
      depth: '7.5cm',
      width: '80cm',
      busId: 'BUS-017',
    }),
  },
  {
    id: 'EVT-109',
    dotColor: '#F97316',
    typeText: 'Micro Pothole / Surface Spall (Depth: 1.5cm)',
    busId: 'BUS-003',
    time: '4 min ago',
    confidence: '89%',
    severity: 'Low',
    location: 'Sector 3 North Expressway',
    evidenceImage: generatePotholeSvg({
      id: 'EVT-109',
      title: 'Micro Pothole',
      type: 'pothole',
      severity: 'Low',
      depth: '1.5cm',
      width: '15cm',
      busId: 'BUS-003',
    }),
  },
  {
    id: 'EVT-105',
    dotColor: '#A855F7',
    typeText: 'Traffic congestion bottleneck',
    busId: 'BUS-042',
    time: '5 min ago',
    confidence: '92%',
    severity: 'High',
    location: 'Harbor Logistics Corridor',
    evidenceImage: generatePotholeSvg({
      id: 'EVT-105',
      title: 'Traffic Congestion',
      type: 'congestion',
      severity: 'High',
      busId: 'BUS-042',
    }),
  },
  {
    id: 'EVT-110',
    dotColor: '#EF4444',
    typeText: 'Medium Wheel-Impact Pothole (Depth: 4.2cm)',
    busId: 'BUS-022',
    time: '6 min ago',
    confidence: '94%',
    severity: 'Moderate',
    location: '5th Avenue Junction',
    evidenceImage: generatePotholeSvg({
      id: 'EVT-110',
      title: 'Medium Wheel-Impact Pothole',
      type: 'pothole',
      severity: 'Moderate',
      depth: '4.2cm',
      width: '45cm',
      busId: 'BUS-022',
    }),
  },
  {
    id: 'EVT-111',
    dotColor: '#EF4444',
    typeText: 'Large Rim-Damage Pothole (Depth: 6.8cm)',
    busId: 'BUS-014',
    time: '11 min ago',
    confidence: '97%',
    severity: 'Urgent',
    location: 'Sector 4 Industrial Corridor',
    evidenceImage: generatePotholeSvg({
      id: 'EVT-111',
      title: 'Large Rim-Damage Pothole',
      type: 'pothole',
      severity: 'Urgent',
      depth: '6.8cm',
      width: '70cm',
      busId: 'BUS-014',
    }),
  },
];

export default function RecentEventsCard({ onSelectEvent, events = RECENT_EVENTS }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">
            Recent Events
          </h2>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
        <button
          onClick={() => onSelectEvent && onSelectEvent(events[0])}
          className="text-blue-600 text-[12px] font-semibold hover:underline"
        >
          View All ({events.length})
        </button>
      </div>

      {/* Scrollable list of event rows */}
      <div className="flex flex-col divide-y divide-slate-100 max-h-[235px] overflow-y-auto">
        {events.slice(0, 5).map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEvent && onSelectEvent(evt)}
            className="py-2.5 px-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3"
          >
            {/* Colored dot matching marker color */}
            <div className="mt-1 flex-shrink-0">
              <span
                className="flex h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-xs group-hover:scale-110 transition-transform"
                style={{ backgroundColor: evt.dotColor || '#EF4444' }}
              />
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {evt.title || evt.typeText}
                </span>
                {/* Confidence badge */}
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold flex-shrink-0 border border-blue-100">
                  {evt.confidence}%
                </span>
              </div>

              {/* Bus ID, Time, Location */}
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                  <Icon name="directions_bus" size={13} className="text-slate-400" />
                  {evt.busId}
                </span>
                <span>•</span>
                <span>{evt.timestamp || evt.time}</span>
                <span>•</span>
                <span className="truncate text-slate-400">{evt.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Click any event to review edge AI camera frame</span>
        <span className="text-blue-600 font-medium">Real-Time Ingestion</span>
      </div>
    </div>
  );
}
