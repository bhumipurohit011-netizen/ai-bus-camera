import React from 'react';
import Icon from './common/Icon.jsx';

const FLEET_BUSES = [
  {
    id: 'BUS-001',
    route: 'Route 104 — Downtown Express',
    status: 'Active',
    isActive: true,
    telemetryPrimary: '60 FPS',
    telemetrySecondary: 'Edge Model v4',
    speed: '34 km/h',
  },
  {
    id: 'BUS-002',
    route: 'Route 42 — Metro Crossline',
    status: 'Active',
    isActive: true,
    telemetryPrimary: 'Optimal',
    telemetrySecondary: 'Stream Sync OK',
    speed: '28 km/h',
  },
  {
    id: 'BUS-003',
    route: 'Route 88 — South Industrial',
    status: 'Active',
    isActive: true,
    telemetryPrimary: 'Optimal',
    telemetrySecondary: 'Stream Sync OK',
    speed: '40 km/h',
  },
  {
    id: 'BUS-004',
    route: 'Route 12 — North Terminal',
    status: 'Offline',
    isActive: false,
    telemetryPrimary: 'In Depot',
    telemetrySecondary: 'Maintenance',
    speed: '0 km/h',
  },
];

export default function BusFleetCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-[15px] font-bold text-slate-900 tracking-tight leading-tight">
            Bus Fleet Status
          </h2>
          <span className="text-[11.5px] text-slate-500 font-medium">
            284 Online • 12 in Depot
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
          <Icon name="hub" size={18} />
        </div>
      </div>

      {/* List of buses BUS-001 to BUS-004 */}
      <div className="flex flex-col gap-2 mt-3">
        {FLEET_BUSES.map((bus) => (
          <div
            key={bus.id}
            className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${
              bus.isActive
                ? 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100/70'
                : 'bg-slate-50/40 border-slate-200/40 opacity-75'
            }`}
          >
            {/* Left: Bus ID + Status Pill + Route Label */}
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-slate-900">
                  {bus.id}
                </span>

                {/* Status Pill: green Active or grey Offline */}
                {bus.isActive ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Offline
                  </span>
                )}
              </div>

              {/* Small Route Label */}
              <span className="text-[11.5px] text-slate-500 truncate mt-0.5 font-medium">
                {bus.route}
              </span>
            </div>

            {/* Right: Edge Telemetry Metrics */}
            <div className="text-right flex-shrink-0">
              <span
                className={`text-[11.5px] font-bold block ${
                  bus.isActive ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {bus.telemetryPrimary}
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {bus.telemetrySecondary}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Camera Telemetry Active
        </span>
        <span>GPS Sync 100%</span>
      </div>
    </div>
  );
}
