import React from 'react';
import Icon from '../common/Icon.jsx';

const MARKER_CONFIG = {
  pothole: {
    bg: 'bg-error',
    ping: 'bg-error',
    textColor: 'text-on-error',
    icon: null,
  },
  congestion: {
    bg: 'bg-secondary',
    ping: 'bg-secondary',
    textColor: 'text-on-secondary',
    icon: 'traffic',
  },
  waterlogging: {
    bg: 'bg-surface-tint',
    ping: 'bg-surface-tint',
    textColor: 'text-on-primary',
    icon: 'water',
  },
  incident: {
    bg: 'bg-inverse-surface',
    ping: 'bg-tertiary-container',
    textColor: 'text-surface-bright',
    icon: 'priority_high',
  },
  deficiency: {
    bg: 'bg-surface-variant',
    ping: 'bg-surface-variant',
    textColor: 'text-primary',
    icon: null,
  },
};

export default function EventMarker({
  event,
  onClick,
  top = '50%',
  left = '50%',
}) {
  const config = MARKER_CONFIG[event.type] || MARKER_CONFIG.pothole;

  return (
    <div
      onClick={() => onClick && onClick(event)}
      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
      style={{ top, left }}
    >
      <div className="relative flex items-center justify-center">
        <span
          className={`animate-ping absolute inline-flex h-7 w-7 rounded-full ${config.ping} opacity-60`}
        />
        <div
          className={`w-4 h-4 rounded-full ${config.bg} flex items-center justify-center ${config.textColor} shadow-sm transition-transform group-hover:scale-125`}
        >
          {config.icon ? (
            <Icon name={config.icon} size={10} />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest" />
          )}
        </div>
      </div>

      {/* Hover Tooltip */}
      <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-space-xs py-space-2xs rounded text-label-sm whitespace-nowrap shadow-md z-40 pointer-events-none">
        {event.title || event.label}
      </div>
    </div>
  );
}
