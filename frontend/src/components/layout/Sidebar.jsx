import React from 'react';
import Icon from '../common/Icon.jsx';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'video-analysis', label: 'AI Video Analysis', icon: 'videocam', isNew: true },
  { id: 'live-map', label: 'Live Map', icon: 'map' },
  { id: 'events', label: 'Events', icon: 'event_available' },
  { id: 'buses', label: 'Buses', icon: 'directions_bus' },
  { id: 'traffic-analytics', label: 'Traffic Analytics', icon: 'traffic' },
  { id: 'incidents', label: 'Incidents', icon: 'warning' },
  { id: 'reports', label: 'Reports', icon: 'analytics' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ activePath = 'dashboard', onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-inverse-surface text-inverse-on-surface z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.08)]">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-base flex items-center gap-space-md border-b border-outline/20 bg-inverse-surface">
          <img
            alt="Urban Intelligence Platform Emblem"
            className="h-8 w-auto object-contain"
            src="/emblem.png"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                'https://lh3.googleusercontent.com/aida/AEtjO1XFKg2MstX_SVKukOu4IYfV9fyX_VEnU37LsyW8Q11QEB6alnW52eD3CQMcO3SGXtBXrIlIxjP-U9b1H3hbYsGmeZ-H3hIpFk9P5-DZTZPRo03ij2VhrBKcNB6qp3PrPhxLV8uagKpFLD6btA2w8Tv27byBqk-Fna8oBXvTXA7d3OjBqzh8s_VljEJQkE6WcMT5qXEpzpguQIL-ScHt14K-h6cbVKtysgoO3PUI6IWnprMauBA_et1b';
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm tracking-tight text-surface-bright truncate">
              Urban Intel
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant truncate">
              Civic Vision AI
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col gap-space-xs p-space-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activePath === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between gap-space-md px-space-md py-space-sm rounded-lg transition-colors text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-headline-sm shadow-sm'
                    : 'text-outline-variant hover:bg-tertiary-container/30 hover:text-surface-bright'
                }`}
              >
                <div className="flex items-center gap-space-md min-w-0">
                  <Icon name={item.icon} size={20} className="flex-shrink-0" />
                  <span className="font-body-md text-body-md truncate">{item.label}</span>
                </div>
                {item.isNew && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-error text-on-error uppercase tracking-wider">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Fleet Stream Indicator Footer */}
      <div className="p-space-base border-t border-outline/20">
        <div className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-inverse-surface/80 border border-outline/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-fixed"></span>
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-surface-bright font-semibold">
              Fleet Stream
            </span>
            <span className="font-label-sm text-label-sm text-outline-variant">
              99.8% Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
