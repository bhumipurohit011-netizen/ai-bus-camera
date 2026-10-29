import React from 'react';
import Icon from './common/Icon.jsx';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'live-map', label: 'Live Map', icon: 'map' },
  { id: 'events', label: 'Events', icon: 'event_available' },
  { id: 'buses', label: 'Buses', icon: 'directions_bus' },
  { id: 'traffic-analytics', label: 'Traffic Analytics', icon: 'traffic' },
  { id: 'incidents', label: 'Incidents', icon: 'warning' },
  { id: 'reports', label: 'Reports', icon: 'analytics' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ activeTab, onSelectTab }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0F172A] text-slate-200 z-50 flex flex-col justify-between shadow-lg border-r border-slate-800">
      {/* Top Brand / Logo */}
      <div className="flex flex-col">
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80 bg-[#0B132B]">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-inner">
            <Icon name="smart_toy" size={22} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[15px] tracking-tight text-white truncate leading-tight">
              Urban Intel
            </span>
            <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase truncate">
              Civic Vision AI
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 p-3 mt-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                }`}
              >
                <Icon name={item.icon} size={20} className="flex-shrink-0" />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Live System Indicator */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0B132B]/60">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-300">
                Fleet Stream
              </span>
              <span className="px-1.5 py-0.2 text-[9px] rounded font-bold bg-emerald-500/20 text-emerald-400">
                LIVE
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              99.8% Online • 284 units
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
