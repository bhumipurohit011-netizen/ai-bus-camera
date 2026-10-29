import React, { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VideoAnalysis from './pages/VideoAnalysis.jsx';
import LiveMap from './pages/LiveMap.jsx';
import Events from './pages/Events.jsx';
import Buses from './pages/Buses.jsx';
import TrafficAnalytics from './pages/TrafficAnalytics.jsx';
import Incidents from './pages/Incidents.jsx';
import Reports from './pages/Reports.jsx';
import Settings from './pages/Settings.jsx';
import EventInspectionModal from './components/EventInspectionModal.jsx';
import NotificationsDrawer from './components/layout/NotificationsDrawer.jsx';
import ProfileModal from './components/layout/ProfileModal.jsx';
import { fetchNotifications, markNotificationAsRead } from './api/client.js';

const PAGE_TITLES = {
  dashboard: 'City Overview',
  'video-analysis': 'AI Video Road Damage & Pothole Recognition',
  'live-map': 'Live City GIS Telemetry Map',
  events: 'Road Events & Defect Audit Feed',
  buses: 'Transit Bus Fleet Telemetry',
  'traffic-analytics': 'Municipal Traffic Analytics & Flow Optimization',
  incidents: 'Road Safety Incidents & Violations',
  reports: 'Municipal Road Health Scorecards & Reports',
  settings: 'System & Edge AI Parameters',
};

export default function App() {
  const [activePath, setActivePath] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load notifications from backend
  useEffect(() => {
    fetchNotifications().then(setNotifications);
  }, [refreshKey]);

  const handleMarkRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSync = async () => {
    setRefreshKey((k) => k + 1);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const renderContent = () => {
    switch (activePath) {
      case 'video-analysis':
        return <VideoAnalysis onSelectEvent={setSelectedEvent} />;
      case 'live-map':
        return <LiveMap onSelectEvent={setSelectedEvent} />;
      case 'events':
        return <Events onSelectEvent={setSelectedEvent} searchQuery={searchQuery} />;
      case 'buses':
        return <Buses />;
      case 'traffic-analytics':
        return <TrafficAnalytics />;
      case 'incidents':
        return <Incidents onSelectEvent={setSelectedEvent} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return (
          <Dashboard
            key={refreshKey}
            onSelectEvent={setSelectedEvent}
            onNavigate={setActivePath}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <MainLayout
      activePath={activePath}
      onNavigate={setActivePath}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      notificationCount={unreadCount}
      onNotificationClick={() => setNotificationsOpen(true)}
      onProfileClick={() => setProfileOpen(true)}
      onSyncClick={handleSync}
      title={PAGE_TITLES[activePath] || 'City Overview'}
    >
      {/* Active Page View */}
      {renderContent()}

      {/* Interactive Modal for inspecting camera snapshots */}
      {selectedEvent && (
        <EventInspectionModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkRead}
        onClearAll={handleClearAll}
      />

      {/* Transit Director Profile Modal */}
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </MainLayout>
  );
}
