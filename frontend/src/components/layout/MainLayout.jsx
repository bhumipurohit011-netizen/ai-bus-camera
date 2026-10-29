import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

export default function MainLayout({
  children,
  activePath = 'dashboard',
  onNavigate,
  searchQuery = '',
  onSearchChange,
  notificationCount = 3,
  onNotificationClick,
  onProfileClick,
  onSyncClick,
  title = 'City Overview',
}) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar activePath={activePath} onNavigate={onNavigate} />

      {/* Main Content Area offset by sidebar */}
      <div className="pl-sidebar-width">
        <Header
          title={title}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
          onSyncClick={onSyncClick}
        />
        <main className="relative pt-16 bg-surface p-space-xl min-h-screen">
          <div className="flex flex-col w-full gap-y-space-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
