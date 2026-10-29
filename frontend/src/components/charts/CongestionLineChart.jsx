import React from 'react';
import Icon from '../common/Icon.jsx';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

const DEFAULT_TREND_DATA = [
  { time: '00:00', density: 24 },
  { time: '04:00', density: 12 },
  { time: '08:00', density: 88 },
  { time: '12:00', density: 64 },
  { time: '16:00', density: 92 },
  { time: '18:00', density: 96, isPeak: true },
  { time: '20:00', density: 58 },
  { time: 'Now', density: 38 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    return (
      <div className="bg-inverse-surface text-inverse-on-surface p-space-xs rounded-lg text-label-sm shadow-md border border-outline/30">
        <p className="font-semibold">{label}</p>
        <p className="text-primary-fixed font-data-tabular">
          {val} vehicles/min
        </p>
        {val >= 80 && (
          <p className="text-error-container text-[10px] font-bold">
            Exceeds Severe Threshold
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function CongestionLineChart({
  data = DEFAULT_TREND_DATA,
  threshold = 80,
  peakInfo = 'Peak: 96 v/min',
  durationInfo = 'Evening rush peak duration: 114 mins',
  isLoading = false,
}) {
  const chartData = Array.isArray(data) ? data : DEFAULT_TREND_DATA;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block">
              Traffic Congestion Trend (Last 24 Hours)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Average density sampled in 2-hour sliding windows
            </span>
          </div>
          <div className="flex items-center gap-space-xs px-space-xs py-space-2xs bg-surface-container-low rounded-lg">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-label-sm text-label-sm font-semibold text-primary">
              Urban Arterials
            </span>
          </div>
        </div>

        {/* Real Recharts Line / Area Chart */}
        <div className="mt-space-lg w-full h-56 select-none relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-label-md">
              <Icon name="sync" size={18} className="animate-spin text-primary mr-2" />
              Loading Telemetry Data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 25, right: 20, left: -15, bottom: 0 }}
              >
                <defs>
                  {/* Shaded Area Underneath Gradient */}
                  <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#CBD5E1"
                  tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'Inter' }}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1', strokeWidth: 1.5 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  domain={[0, 120]}
                  ticks={[0, 30, 60, 90, 120]}
                  tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'Inter' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Horizontal Dashed Threshold Line */}
                <ReferenceLine
                  y={threshold}
                  stroke="#BA1A1A"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{
                    value: `Severe Congestion Threshold (${threshold} v/min)`,
                    position: 'insideTopRight',
                    fill: '#BA1A1A',
                    fontSize: 9.5,
                    fontFamily: 'Inter',
                    fontWeight: 600,
                  }}
                />

                {/* Smooth Main Line Graph with Shaded Gradient */}
                <Area
                  type="monotone"
                  dataKey="density"
                  stroke="#004AC6"
                  strokeWidth={2.75}
                  fillOpacity={1}
                  fill="url(#colorDensity)"
                  dot={{ r: 3.5, fill: '#004AC6', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                  activeDot={{ r: 5, fill: '#BA1A1A', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {/* Peak Callout Badge (matching screen.png) */}
          <div className="absolute top-2 right-24 hidden sm:flex flex-col items-center pointer-events-none">
            <div className="bg-inverse-surface text-surface-bright px-2.5 py-0.5 rounded text-[10.5px] font-bold shadow-sm">
              {peakInfo}
            </div>
            <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-inverse-surface" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
        <span>{durationInfo}</span>
        <span className="text-on-surface font-medium">Flow Velocity: Normalized</span>
      </div>
    </div>
  );
}
