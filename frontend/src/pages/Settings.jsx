import React, { useState } from 'react';
import Icon from '../components/common/Icon.jsx';

export default function Settings() {
  const [potholeThreshold, setPotholeThreshold] = useState(85);
  const [congestionThreshold, setCongestionThreshold] = useState(80);
  const [fpsRate, setFpsRate] = useState('60');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [nightModeInference, setNightModeInference] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-space-md max-w-4xl">
      {/* Header */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="settings" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Platform & Edge AI Camera Settings
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Configure edge neural inference parameters, computer vision confidence cutoffs, and municipal dispatch webhooks.
          </p>
        </div>

        {saved && (
          <span className="px-space-sm py-1 rounded bg-emerald-50 text-emerald-700 text-label-sm font-bold border border-emerald-300">
            Settings Saved!
          </span>
        )}
      </div>

      {/* Settings Sections */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-outline-variant/30 space-y-space-lg">
        {/* Section 1: Edge AI Inference */}
        <div className="space-y-space-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant/20 pb-space-xs">
            Computer Vision Inference Thresholds
          </h3>

          <div className="space-y-space-md pt-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                  Pothole Detection Confidence Cutoff ({potholeThreshold}%)
                </label>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Current: {potholeThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="98"
                value={potholeThreshold}
                onChange={(e) => setPotholeThreshold(e.target.value)}
                className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-on-surface-variant mt-1">
                Detections below this score are flagged for manual operator verification instead of automated alerting.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-body-sm text-body-sm font-semibold text-on-surface">
                  Severe Congestion Alarm Line ({congestionThreshold} vehicles/min)
                </label>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Current: {congestionThreshold} v/min
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="110"
                value={congestionThreshold}
                onChange={(e) => setCongestionThreshold(e.target.value)}
                className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-on-surface-variant mt-1">
                Triggers visual alert overlay on the Live Map when arterial density exceeds threshold.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Camera Telemetry Rate */}
        <div className="space-y-space-sm pt-space-sm border-t border-outline-variant/20">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">
            Hardware Sensor & Edge Camera Streaming
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
            <div>
              <label className="font-body-sm text-body-sm font-semibold text-on-surface block mb-1">
                Edge Camera Video Sampling Rate
              </label>
              <select
                value={fpsRate}
                onChange={(e) => setFpsRate(e.target.value)}
                className="w-full p-2 bg-surface-container-low border border-outline-variant/40 rounded-lg text-body-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="30">30 FPS (Standard Urban Ingestion)</option>
                <option value="60">60 FPS (High-Speed Expressway Precision)</option>
                <option value="15">15 FPS (Power Saver Mode)</option>
              </select>
            </div>

            <div className="flex flex-col justify-center gap-space-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoDispatch}
                  onChange={(e) => setAutoDispatch(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="font-body-sm text-body-sm font-medium text-on-surface">
                  Auto-generate Roadwork Dispatch for Urgent Cavities (&gt;6cm)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={nightModeInference}
                  onChange={(e) => setNightModeInference(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span className="font-body-sm text-body-sm font-medium text-on-surface">
                  Nocturnal Infrared AI Neural Weights (Night Mode)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-space-sm border-t border-outline-variant/20 flex justify-end">
          <button
            onClick={handleSave}
            className="px-space-lg py-space-xs bg-primary-container text-on-primary font-semibold text-label-md rounded-lg hover:bg-primary transition-colors shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
