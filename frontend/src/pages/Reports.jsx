import React, { useState, useEffect } from 'react';
import Icon from '../components/common/Icon.jsx';
import { fetchReports } from '../api/client.js';

export default function Reports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    fetchReports().then(setReports);
  }, []);

  return (
    <div className="flex flex-col gap-space-md">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="analytics" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Municipal Road Health & Maintenance Scorecard
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Automated civil engineering quality audit derived from cumulative bus camera computer vision telemetry.
          </p>
        </div>

        <button
          onClick={() => alert('Generating Comprehensive Municipal Audit Report (PDF)...')}
          className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary transition-colors shadow-sm"
        >
          <Icon name="picture_as_pdf" size={18} />
          <span>Download PDF Report</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Total Kilometers Audited</span>
          <span className="font-data-metric text-[26px] text-primary font-bold block tnum mt-1">14,820 km</span>
          <span className="text-[11px] text-on-surface-variant">Continuous bus coverage</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Avg Road Health Score</span>
          <span className="font-data-metric text-[26px] text-emerald-600 font-bold block tnum mt-1">76.4 / 100</span>
          <span className="text-[11px] text-emerald-600 font-semibold">+2.1% improvement YoY</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Pothole Density</span>
          <span className="font-data-metric text-[26px] text-error font-bold block tnum mt-1">0.32 / km</span>
          <span className="text-[11px] text-error font-semibold">Highest in Sector 4</span>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
          <span className="font-label-sm text-label-sm text-on-surface-variant block">Est. Repair Budget</span>
          <span className="font-data-metric text-[26px] text-on-surface font-bold block tnum mt-1">$142,500</span>
          <span className="text-[11px] text-primary font-semibold">Priority repair schedule</span>
        </div>
      </div>

      {/* Sector Quality Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-space-md border-b border-outline-variant/20 flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Municipal Sector Road Quality Breakdown
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Last Updated: Today 18:00
          </span>
        </div>

        <table className="w-full text-left font-body-sm text-[13px]">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-sm uppercase tracking-wider border-b border-outline-variant/20">
            <tr>
              <th className="p-space-md">Sector Corridor</th>
              <th className="p-space-md">Health Index</th>
              <th className="p-space-md">Potholes Detected</th>
              <th className="p-space-md">Intervention Status</th>
              <th className="p-space-md text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {(reports?.sectors || []).map((sec, idx) => (
              <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                <td className="p-space-md font-semibold text-on-surface">{sec.sector}</td>
                <td className="p-space-md">
                  <div className="flex items-center gap-2">
                    <span className="font-bold tnum text-on-surface">{sec.health}%</span>
                    <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          sec.health > 75
                            ? 'bg-emerald-500'
                            : sec.health > 65
                            ? 'bg-secondary'
                            : 'bg-error'
                        }`}
                        style={{ width: `${sec.health}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-space-md font-bold text-error tnum">{sec.potholes}</td>
                <td className="p-space-md">
                  <span
                    className={`px-space-xs py-0.5 rounded text-[11px] font-bold ${
                      sec.health < 65
                        ? 'bg-error-container text-on-error-container'
                        : sec.health < 75
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {sec.status}
                  </span>
                </td>
                <td className="p-space-md text-right">
                  <button
                    onClick={() => alert(`Dispatching work order for ${sec.sector}...`)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Dispatch Maintenance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
