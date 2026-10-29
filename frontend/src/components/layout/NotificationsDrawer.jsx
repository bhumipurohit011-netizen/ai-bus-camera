import React from 'react';
import Icon from '../common/Icon.jsx';

export default function NotificationsDrawer({
  isOpen,
  onClose,
  notifications = [],
  onMarkRead,
  onClearAll,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl border-l border-outline-variant/30 flex flex-col">
          {/* Header */}
          <div className="p-space-base bg-inverse-surface text-inverse-on-surface flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <Icon name="notifications_active" size={22} className="text-primary-fixed" />
              <div>
                <h3 className="font-headline-sm text-headline-sm text-surface-bright leading-tight">
                  System Alerts & Telemetry
                </h3>
                <span className="font-label-sm text-label-sm text-outline-variant">
                  {notifications.filter((n) => !n.read).length} Unread Notifications
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-outline-variant hover:text-surface-bright hover:bg-tertiary-container/40 transition-colors"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Actions Bar */}
          <div className="px-space-base py-space-xs bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between text-label-sm font-label-sm">
            <span className="text-on-surface-variant font-medium">Real-Time Ingestion</span>
            <button
              onClick={onClearAll}
              className="text-primary font-semibold hover:underline"
            >
              Mark All Read
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-space-base divide-y divide-outline-variant/10 space-y-space-sm">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`pt-space-sm first:pt-0 p-space-sm rounded-lg transition-colors ${
                  !n.read ? 'bg-surface-container-low/60' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-space-xs">
                  <div className="flex items-center gap-space-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        n.type === 'critical'
                          ? 'bg-error animate-pulse'
                          : n.type === 'warning'
                          ? 'bg-secondary'
                          : 'bg-primary'
                      }`}
                    />
                    <h4 className="font-body-sm text-body-sm font-bold text-on-surface leading-tight">
                      {n.title}
                    </h4>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant">
                    {n.time}
                  </span>
                </div>
                <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {n.message}
                </p>
                <div className="mt-space-xs flex items-center justify-between">
                  <span
                    className={`px-space-2xs py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      n.type === 'critical'
                        ? 'bg-error-container text-on-error-container'
                        : n.type === 'warning'
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-high text-primary'
                    }`}
                  >
                    {n.type}
                  </span>
                  {!n.read && (
                    <button
                      onClick={() => onMarkRead && onMarkRead(n.id)}
                      className="text-primary text-[11px] font-semibold hover:underline"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Drawer Footer */}
          <div className="p-space-base bg-surface-container-lowest border-t border-outline-variant/20 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Urban Intel Protocol v2.4
            </span>
            <button
              onClick={onClose}
              className="px-space-md py-space-xs bg-primary-container text-on-primary rounded-lg text-label-sm font-semibold hover:bg-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
