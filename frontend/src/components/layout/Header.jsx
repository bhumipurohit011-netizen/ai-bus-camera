import React, { useState } from 'react';
import Icon from '../common/Icon.jsx';

export default function Header({
  title = 'City Overview',
  searchQuery = '',
  onSearchChange,
  notificationCount = 3,
  onNotificationClick,
  onProfileClick,
  onSyncClick,
}) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    if (onSyncClick) await onSyncClick();
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <header className="fixed top-0 left-sidebar-width right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/30 z-40 px-space-xl flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      {/* Title & Real-Time Badge */}
      <div className="flex items-center gap-space-md">
        <span className="font-headline-sm text-headline-sm text-on-surface">
          {title}
        </span>
        <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container-low border border-primary/20 text-primary font-label-sm text-label-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>Real-Time Feed</span>
        </span>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-space-lg">
        {/* Search Bar */}
        <div className="relative flex items-center w-80">
          <span className="absolute left-3 text-on-surface-variant flex items-center pointer-events-none">
            <Icon name="search" size={18} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-9 pr-12 py-space-xs rounded-md bg-surface-container-low border border-outline-variant/50 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
            placeholder="Search road, bus ID, or event code..."
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-2 text-on-surface-variant hover:text-on-surface text-[12px]"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-2 px-space-xs py-space-2xs rounded border border-outline-variant/50 bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm pointer-events-none">
              ⌘K
            </span>
          )}
        </div>

        {/* Notifications & Admin Profile */}
        <div className="flex items-center gap-space-md">
          {/* Notification Bell */}
          <button
            onClick={onNotificationClick}
            aria-label="Notifications"
            title="View System Alerts"
            className="relative p-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center"
          >
            <Icon name="notifications" size={20} />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-bold bg-error text-on-error">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Sync Button */}
          <button
            onClick={handleSync}
            title="Trigger Telemetry Refresh"
            className="hidden md:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm border-l border-outline-variant/30 pl-space-md hover:text-primary transition-colors cursor-pointer"
          >
            <Icon
              name="sync"
              size={16}
              className={isSyncing ? 'animate-spin text-primary' : ''}
            />
            <span>{isSyncing ? 'Syncing...' : 'Sync 12s ago'}</span>
          </button>

          {/* Admin Profile Avatar */}
          <div
            onClick={onProfileClick}
            title="Open Admin Profile"
            className="flex items-center gap-space-md pl-space-md border-l border-outline-variant/30 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-outline-variant/50"
              src="/avatar.png"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNDFquVsNw0poZCHuH6vDpIP-Vft_uE25rDnrYMeeGCFUKncq6BDgmxrfrobB-w0PjMztAR3OtVwTvcS2IapYmaudKHVg0dTaDX_aVOXLwDzqFho2wfMsph33S2_FX381RDWyW8XfmOOfdHm9Gdk524-J2vRNz8ErN-YgxugGXuDKLOwJhZs0Y9dfe_-FVVgTY_E4q-7tqpeLULVKAeJj3Gr1zsoxqmRLLuFZURmEIl8sYxxelvQ';
              }}
            />
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface leading-none">
                Dr. Elena Vance
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-space-2xs">
                Transit Director
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
