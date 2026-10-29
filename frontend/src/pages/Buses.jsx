import React, { useState, useEffect } from 'react';
import Icon from '../components/common/Icon.jsx';
import { fetchBuses } from '../api/client.js';

export default function Buses() {
  const [buses, setBuses] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBuses().then(setBuses);
  }, []);

  const displayedBuses = buses.filter((b) => {
    if (filter === 'active') return b.status === 'Active';
    if (filter === 'offline') return b.status === 'Offline';
    return true;
  });

  return (
    <div className="flex flex-col gap-space-md">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="directions_bus" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Bus Fleet Telemetry & Edge AI Status
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Monitor real-time camera health, edge neural model frame rates, and vehicle velocity across all 284 municipal transit buses.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-surface-container-low p-space-2xs rounded-lg border border-outline-variant/20">
          <button
            onClick={() => setFilter('all')}
            className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Buses ({buses.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
              filter === 'active'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Active (3)
          </button>
          <button
            onClick={() => setFilter('offline')}
            className={`px-space-sm py-space-2xs text-label-sm font-label-sm rounded-md transition-colors ${
              filter === 'offline'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Offline (1)
          </button>
        </div>
      </div>

      {/* Bus Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {displayedBuses.map((bus) => {
          const isOffline = bus.status === 'Offline';
          return (
            <div
              key={bus.id}
              className={`bg-surface-container-lowest rounded-xl p-space-md shadow-sm border transition-all ${
                isOffline ? 'border-outline-variant/40 opacity-80' : 'border-outline-variant/30 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
                <div className="flex items-center gap-space-xs">
                  <Icon name="directions_bus" size={20} className="text-primary" />
                  <span className="font-headline-sm text-[16px] font-bold text-on-surface">
                    {bus.id}
                  </span>
                </div>
                <span
                  className={`px-space-xs py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    isOffline
                      ? 'bg-surface-container-high text-on-surface-variant'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOffline ? 'bg-outline' : 'bg-emerald-500 animate-pulse'
                    }`}
                  />
                  {bus.status}
                </span>
              </div>

              <div className="mt-space-sm space-y-space-xs font-body-sm text-[12.5px]">
                <p className="text-on-surface-variant font-medium truncate">
                  {bus.route}
                </p>
                <div className="flex justify-between text-on-surface">
                  <span className="text-on-surface-variant">Camera FPS:</span>
                  <strong className="text-primary font-mono">{bus.metricTop || '60 FPS'}</strong>
                </div>
                <div className="flex justify-between text-on-surface">
                  <span className="text-on-surface-variant">Model Version:</span>
                  <strong className="font-mono">{bus.metricBottom || 'Edge Model v4'}</strong>
                </div>
                <div className="flex justify-between text-on-surface">
                  <span className="text-on-surface-variant">Speed:</span>
                  <strong className="font-mono">{bus.speed} km/h</strong>
                </div>
                <div className="flex justify-between text-on-surface">
                  <span className="text-on-surface-variant">GPS Coords:</span>
                  <span className="font-mono text-[11px]">{bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}</span>
                </div>
              </div>

              <div className="mt-space-sm pt-space-xs border-t border-outline-variant/10 flex items-center justify-between">
                <button
                  onClick={() => alert(`Connecting live video stream for ${bus.id}...`)}
                  className="text-primary font-semibold text-[11px] hover:underline flex items-center gap-1"
                >
                  <Icon name="videocam" size={13} />
                  <span>View Live Stream</span>
                </button>
                <span className="text-[10px] text-on-surface-variant font-mono">Sync: OK</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
