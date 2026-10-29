import React from 'react';

export default function MapLegend({ counts = { pothole: 47, congestion: 18, waterlogging: 6, incident: 9, deficiency: 14 } }) {
  return (
    <div className="absolute bottom-space-md left-space-md bg-surface-container-lowest/95 backdrop-blur-sm rounded-lg p-space-sm shadow-md flex flex-col gap-space-xs z-20 max-w-xs select-none">
      <div className="flex items-center justify-between gap-space-lg pb-space-2xs">
        <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface tracking-wider">
          Map Telemetry
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Active Layer
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-space-md gap-y-space-2xs font-label-sm text-label-sm">
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-error" />
          <span className="text-on-surface-variant">
            Pothole <strong className="text-on-surface font-semibold">({counts.pothole})</strong>
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <span className="text-on-surface-variant">
            Congestion <strong className="text-on-surface font-semibold">({counts.congestion})</strong>
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-surface-tint" />
          <span className="text-on-surface-variant">
            Waterlogging <strong className="text-on-surface font-semibold">({counts.waterlogging})</strong>
          </span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-inverse-surface" />
          <span className="text-on-surface-variant">
            Incidents <strong className="text-on-surface font-semibold">({counts.incident})</strong>
          </span>
        </div>
        <div className="col-span-2 flex items-center gap-space-xs pt-space-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-surface-variant" />
          <span className="text-on-surface-variant">
            Deficiency / Signage <strong className="text-on-surface font-semibold">({counts.deficiency})</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
