import React from 'react';

export default function BusFleetRow({ bus }) {
  const isOffline = bus.isOffline || bus.status === 'Offline';

  return (
    <div
      className={`p-space-sm rounded-lg flex items-center justify-between transition-colors ${
        isOffline
          ? 'bg-surface-container-low/40 opacity-80'
          : 'bg-surface-container-low/60 hover:bg-surface-container-low'
      }`}
    >
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-space-xs">
          <span
            className={`font-label-md text-label-md font-bold ${
              isOffline ? 'text-on-surface-variant' : 'text-on-surface'
            }`}
          >
            {bus.id}
          </span>
          <span
            className={`px-space-xs py-0.2 rounded-full font-label-sm text-[11px] font-medium flex items-center gap-1 ${
              isOffline
                ? 'bg-surface-container-high text-on-surface-variant'
                : 'bg-surface-container-high text-primary'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOffline ? 'bg-outline' : 'bg-primary'
              }`}
            />
            {bus.status}
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
          {bus.route}
        </span>
      </div>
      <div className="text-right flex-shrink-0">
        <span
          className={`font-label-sm text-label-sm font-semibold block ${
            isOffline ? 'text-on-surface-variant' : bus.metricTopColor || 'text-primary'
          }`}
        >
          {bus.metricTop}
        </span>
        <span className="font-label-sm text-[10px] text-on-surface-variant">
          {bus.metricBottom}
        </span>
      </div>
    </div>
  );
}
