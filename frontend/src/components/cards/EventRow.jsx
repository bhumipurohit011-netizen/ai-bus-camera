import React from 'react';
import Icon from '../common/Icon.jsx';

const TYPE_DOT_COLORS = {
  pothole: 'bg-error',
  congestion: 'bg-secondary',
  waterlogging: 'bg-surface-tint',
  incident: 'bg-inverse-surface',
  deficiency: 'bg-surface-variant',
};

export default function EventRow({
  event,
  onClick,
}) {
  const dotColor = TYPE_DOT_COLORS[event.type] || 'bg-error';

  return (
    <div
      onClick={() => onClick && onClick(event)}
      className="p-space-xs rounded-lg hover:bg-surface-container-low transition-colors flex items-start gap-space-sm cursor-pointer group"
    >
      <div className="mt-1 flex-shrink-0">
        <span className={`flex h-2.5 w-2.5 rounded-full ${dotColor} group-hover:scale-110 transition-transform`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-space-xs">
          <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
            {event.title}
          </span>
          <span className="px-space-2xs py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-[10px] font-bold">
            {event.confidence}% Conf.
          </span>
        </div>
        <div className="flex items-center gap-space-sm mt-space-2xs text-on-surface-variant font-label-sm text-label-sm">
          <span className="inline-flex items-center gap-1">
            <Icon name="directions_bus" size={13} className="text-on-surface-variant" />
            <span>{event.busId}</span>
          </span>
          <span>•</span>
          <span>{event.timestamp}</span>
          {event.severity && (
            <>
              <span>•</span>
              <span className={event.severity === 'Urgent' ? 'text-error font-medium' : 'text-on-surface-variant font-medium'}>
                {event.severity}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
