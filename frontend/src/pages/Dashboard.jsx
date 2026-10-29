import React, { useState, useEffect } from 'react';
import StatCard from '../components/cards/StatCard.jsx';
import EventRow from '../components/cards/EventRow.jsx';
import BusFleetRow from '../components/cards/BusFleetRow.jsx';
import CityMap from '../components/map/CityMap.jsx';
import VehicleCountBarChart from '../components/charts/VehicleCountBarChart.jsx';
import CongestionLineChart from '../components/charts/CongestionLineChart.jsx';
import Icon from '../components/common/Icon.jsx';
import {
  fetchStats,
  fetchEvents,
  fetchBuses,
  fetchVehicleCounts,
  fetchCongestionTrend,
} from '../api/client.js';

export default function Dashboard({ onSelectEvent, onNavigate, searchQuery = '' }) {
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [buses, setBuses] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState(null);
  const [congestionTrend, setCongestionTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsData, eventsData, busesData, countsData, trendData] =
          await Promise.all([
            fetchStats(),
            fetchEvents(),
            fetchBuses(),
            fetchVehicleCounts(),
            fetchCongestionTrend(),
          ]);

        if (isMounted) {
          setStats(statsData);
          setEvents(eventsData);
          setBuses(busesData);
          setVehicleCounts(countsData);
          setCongestionTrend(trendData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load telemetry data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();

    // Poll every 30 seconds to simulate real-time telemetry stream
    const interval = setInterval(loadDashboardData, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter events and buses based on search query
  const filteredEvents = events.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      e.busId.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    );
  });

  const filteredBuses = buses.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.route.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Search active notification */}
      {searchQuery && (
        <div className="p-space-sm bg-primary-container/10 border border-primary/20 rounded-lg text-body-sm flex items-center justify-between text-primary">
          <span>
            Filtering by search: <strong className="underline">{searchQuery}</strong> (Found {filteredEvents.length} events, {filteredBuses.length} buses)
          </span>
        </div>
      )}

      {/* Optional Error Banner */}
      {error && (
        <div className="p-space-sm bg-error-container text-on-error-container rounded-lg text-body-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* 1. TOP STATS BAR (5 COLUMNS) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
            badgeText={stat.change}
            badgeBg={stat.badgeBg}
            badgeColor={stat.badgeColor}
            badgeIcon={
              stat.changeDirection === 'up'
                ? stat.id === 'potholes-today'
                  ? 'trending_up'
                  : 'arrow_upward'
                : stat.changeDirection === 'down'
                ? 'arrow_downward'
                : null
            }
            value={stat.value}
            label={stat.label}
            subtext={stat.subtext}
            subIcon={stat.subIcon}
            isErrorSub={stat.isErrorSub}
          />
        ))}
      </section>

      {/* 2. MIDDLE WORKSPACE (REAL LEAFLET GIS MAP & RIGHT STACK) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* LEFT COLUMN: REAL LEAFLET MAP (~65% -> 8 of 12 cols) */}
        <div className="lg:col-span-8">
          <CityMap
            events={filteredEvents}
            buses={filteredBuses}
            onSelectEvent={onSelectEvent}
          />
        </div>

        {/* RIGHT COLUMN: RECENT EVENTS & BUS FLEET STATUS (~35% -> 4 of 12 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Card 1: Recent Events Feed */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Recent Events
                </span>
                <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              </div>
              <button
                onClick={() => onNavigate && onNavigate('events')}
                className="text-primary font-label-sm text-label-sm font-semibold hover:underline"
              >
                View All ({events.length})
              </button>
            </div>
            <div className="flex flex-col gap-space-xs mt-space-sm divide-y-0 max-h-[235px] overflow-y-auto">
              {filteredEvents.slice(0, 5).map((evt) => (
                <EventRow key={evt.id} event={evt} onClick={onSelectEvent} />
              ))}
            </div>
          </div>

          {/* Card 2: Bus Fleet Status */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
              <div>
                <span className="font-headline-sm text-headline-sm text-on-surface block">
                  Bus Fleet Telemetry
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  284 Online • 12 in Depot
                </span>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('buses')}
                title="View All Buses"
                className="text-primary font-label-sm text-label-sm font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Fleet</span>
                <Icon name="arrow_forward" size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-space-sm mt-space-sm">
              {filteredBuses.slice(0, 4).map((bus) => (
                <BusFleetRow key={bus.id} bus={bus} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. BOTTOM ANALYTICS ROW (2 CHARTS WITH RECHARTS) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* LEFT CARD: Vehicle Count by Type */}
        <VehicleCountBarChart
          data={vehicleCounts?.data}
          total={vehicleCounts?.total || '282,730'}
          confidence={vehicleCounts?.confidenceIndex || '99.1%'}
          isLoading={loading}
        />

        {/* RIGHT CARD: Traffic Congestion Trend */}
        <CongestionLineChart
          data={congestionTrend?.data}
          threshold={congestionTrend?.threshold || 80}
          peakText={congestionTrend?.peakInfo || 'Peak: 96 v/min'}
          durationText={congestionTrend?.durationInfo || 'Evening rush peak duration: 114 mins'}
          isLoading={loading}
        />
      </section>
    </>
  );
}
