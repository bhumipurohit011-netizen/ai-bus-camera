import React from 'react';
import CityMap from '../components/map/CityMap.jsx';

export default function LiveMap({ onSelectEvent }) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Live City Map — Full Telemetry View
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Full-screen GIS view with live edge camera detections and moving bus fleet coordinates.
          </p>
        </div>
      </div>
      <CityMap onSelectEvent={onSelectEvent} />
    </div>
  );
}
