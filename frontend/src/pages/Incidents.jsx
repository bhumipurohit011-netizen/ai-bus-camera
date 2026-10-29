import React, { useState } from 'react';
import Icon from '../components/common/Icon.jsx';

const INCIDENTS_DATA = [
  {
    id: 'INC-901',
    type: 'Rash Driving / Speed Violation',
    busId: 'BUS-009',
    timestamp: '8 min ago',
    location: 'Ring Road North Exit (Lane 1)',
    severity: 'High Priority',
    details: 'Vehicle detected traveling at 82 km/h in 40 km/h urban school approach zone. Plate captured by edge camera.',
    plate: 'KA-04-MB-8291',
    status: 'Forwarded to Traffic Police',
  },
  {
    id: 'INC-902',
    type: 'Bus Lane Obstruction',
    busId: 'BUS-017',
    timestamp: '24 min ago',
    location: 'Downtown Central Arterial',
    severity: 'Medium',
    details: 'Commercial delivery truck stalled in dedicated transit lane, causing 8-minute route latency.',
    plate: 'KA-01-TR-4412',
    status: 'Tow Truck Dispatched',
  },
  {
    id: 'INC-903',
    type: 'Near-Miss Pedestrian Crosswalk Event',
    busId: 'BUS-031',
    timestamp: '52 min ago',
    location: '5th Avenue Crossing',
    severity: 'High Priority',
    details: 'SUV failed to yield to pedestrian crossing in designated beacon crosswalk. Emergency driver braking triggered.',
    plate: 'KA-05-NX-1049',
    status: 'Safety Audit Flagged',
  },
  {
    id: 'INC-904',
    type: 'Road Construction Debris Spill',
    busId: 'BUS-088',
    timestamp: '1 hr 15 min ago',
    location: 'South Industrial Beltway Gate 3',
    severity: 'Low',
    details: 'Gravel aggregate and structural debris scattered across active traffic corridor.',
    plate: 'N/A',
    status: 'Cleaned by Municipal Crew',
  },
];

export default function Incidents({ onSelectEvent }) {
  return (
    <div className="flex flex-col gap-space-md">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="warning" size={24} className="text-error" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Road Safety Incidents & Violation Records
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Automated camera detection of rash driving, near-miss crosswalk hazards, and public bus corridor obstructions.
          </p>
        </div>

        <span className="px-space-sm py-space-xs rounded-lg bg-error-container text-on-error-container font-label-md text-label-md font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
          4 Incidents Logged Today
        </span>
      </div>

      {/* Incidents Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="divide-y divide-outline-variant/10">
          {INCIDENTS_DATA.map((inc) => (
            <div
              key={inc.id}
              className="p-space-md hover:bg-surface-container-low transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md"
            >
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-error-container/40 text-error flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="priority_high" size={20} />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-body-sm text-body-sm font-bold text-on-surface">
                      {inc.type}
                    </span>
                    <span className="px-space-xs py-0.2 rounded text-[10px] font-bold bg-surface-container-high text-primary font-mono">
                      {inc.id}
                    </span>
                    <span className="px-space-xs py-0.2 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                      {inc.severity}
                    </span>
                  </div>

                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-1 leading-relaxed">
                    {inc.details}
                  </p>

                  <div className="flex items-center gap-space-md mt-2 text-[11px] text-on-surface-variant">
                    <span className="flex items-center gap-1 font-medium text-on-surface">
                      <Icon name="directions_bus" size={13} className="text-primary" />
                      {inc.busId}
                    </span>
                    <span>•</span>
                    <span>{inc.location}</span>
                    <span>•</span>
                    <span>{inc.timestamp}</span>
                    {inc.plate !== 'N/A' && (
                      <>
                        <span>•</span>
                        <span className="font-mono bg-surface-container-high px-1 rounded text-primary font-semibold">
                          Plate: {inc.plate}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-end justify-between md:justify-center gap-space-xs flex-shrink-0">
                <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-primary text-[11px] font-semibold">
                  {inc.status}
                </span>
                <button
                  onClick={() => alert(`Reviewing HD camera footage for ${inc.id}...`)}
                  className="text-primary font-semibold text-[12px] hover:underline flex items-center gap-1"
                >
                  <Icon name="videocam" size={14} />
                  <span>View Camera Log</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
