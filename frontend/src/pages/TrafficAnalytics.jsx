import React, { useState, useEffect } from 'react';
import Icon from '../components/common/Icon.jsx';
import VehicleCountBarChart from '../components/charts/VehicleCountBarChart.jsx';
import CongestionLineChart from '../components/charts/CongestionLineChart.jsx';
import { fetchVehicleCounts, fetchCongestionTrend } from '../api/client.js';

export default function TrafficAnalytics() {
  const [vehicleCounts, setVehicleCounts] = useState(null);
  const [congestionTrend, setCongestionTrend] = useState(null);

  useEffect(() => {
    fetchVehicleCounts().then(setVehicleCounts);
    fetchCongestionTrend().then(setCongestionTrend);
  }, []);

  return (
    <div className="flex flex-col gap-space-md">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="traffic" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Municipal Traffic Analytics & Flow Optimization
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Aggregated vehicular volume metrics, arterial congestion thresholds, and machine vision classification curves.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting 24h Traffic Data to CSV...')}
          className="px-space-md py-space-xs rounded-lg bg-surface-container-low border border-outline-variant/30 text-on-surface hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-1.5 transition-colors"
        >
          <Icon name="download" size={18} />
          <span>Export Analytics</span>
        </button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Total 24h Vehicles</span>
          <span className="font-data-metric text-[26px] text-primary font-bold block tnum mt-1">282,730</span>
          <span className="text-[11px] text-emerald-600 font-semibold">+6.4% vs last week</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Arterial Avg Speed</span>
          <span className="font-data-metric text-[26px] text-on-surface font-bold block tnum mt-1">32.4 km/h</span>
          <span className="text-[11px] text-on-surface-variant">Nominal urban flow</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Peak Rush Volume</span>
          <span className="font-data-metric text-[26px] text-error font-bold block tnum mt-1">96 v/min</span>
          <span className="text-[11px] text-error font-semibold">18:00 Peak (114 mins)</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Signal Delay Index</span>
          <span className="font-data-metric text-[26px] text-secondary font-bold block tnum mt-1">1.8 mins</span>
          <span className="text-[11px] text-emerald-600 font-semibold">-12% adaptive AI savings</span>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        <VehicleCountBarChart
          data={vehicleCounts?.data}
          total={vehicleCounts?.total}
          confidence={vehicleCounts?.confidenceIndex}
        />
        <CongestionLineChart
          data={congestionTrend?.data}
          threshold={congestionTrend?.threshold}
          peakText={congestionTrend?.peakInfo}
          durationText={congestionTrend?.durationInfo}
        />
      </div>
    </div>
  );
}
