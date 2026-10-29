import React from 'react';
import Icon from './common/Icon.jsx';

export default function Header({ searchQuery, onSearchChange, notificationCount = 3 }) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200/80 z-40 px-6 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Title & Live Status Indicator */}
      <div className="flex items-center gap-3">
        <h1 className="text-[17px] font-bold text-slate-900 tracking-tight">
          City Overview
        </h1>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-[11px] font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Real-Time Feed
        </span>
      </div>

      {/* Center & Right Controls */}
      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="relative flex items-center w-80">
          <Icon name="search" size={18} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-12 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[13px] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search road, bus ID, or event code..."
          />
          <span className="absolute right-2 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-slate-400 text-[10px] font-medium pointer-events-none shadow-2xs">
            ⌘K
          </span>
        </div>

        {/* Notifications & Sync */}
        <div className="flex items-center gap-3">
          {/* Sync status */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-500 text-[12px] font-medium pr-3 border-r border-slate-200">
            <Icon name="sync" size={16} className="text-blue-600 animate-spin-slow" />
            <span>Sync 12s ago</span>
          </div>

          {/* Notification Bell */}
          <button
            aria-label="View notifications"
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Icon name="notifications" size={21} />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-xs">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="relative">
              <img
                src="/avatar.png"
                alt="Transit Director"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80';
                }}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-semibold text-slate-900 leading-tight">
                Dr. Elena Vance
              </span>
              <span className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
                Transit Director
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
