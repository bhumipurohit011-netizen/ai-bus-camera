import React from 'react';
import Icon from '../common/Icon.jsx';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from 'recharts';

const DEFAULT_DATA = [
  { type: 'Car', count: 142850, fill: '#004AC6' },
  { type: 'Motorcycle', count: 84210, fill: '#2563EB' },
  { type: 'Bus', count: 18400, fill: '#636E83' },
  { type: 'Truck', count: 24930, fill: '#565E74' },
  { type: 'Bicycle', count: 12340, fill: '#B4C5FF' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-inverse-surface text-inverse-on-surface p-space-xs rounded-lg text-label-sm shadow-md border border-outline/30">
        <p className="font-semibold">{data.type}</p>
        <p className="text-primary-fixed-dim font-data-tabular">
          {data.count.toLocaleString()} vehicles counted
        </p>
      </div>
    );
  }
  return null;
};

// Custom top label for counts on top of bars
const renderCustomBarLabel = ({ x, y, width, value }) => {
  if (value === undefined) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="#0B1C30"
      textAnchor="middle"
      fontSize={11}
      fontFamily="Inter"
      fontWeight={700}
    >
      {value.toLocaleString()}
    </text>
  );
};

export default function VehicleCountBarChart({
  data = DEFAULT_DATA,
  total = '282,730',
  confidence = '99.1%',
  isLoading = false,
}) {
  const chartData = Array.isArray(data) ? data : DEFAULT_DATA;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block">
              Vehicle Count by Type (Today)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              AI object recognition across primary arterial corridors
            </span>
          </div>
          <div className="text-right">
            <span className="font-data-metric text-data-metric text-primary block leading-none font-bold tnum">
              {total}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Total Counted
            </span>
          </div>
        </div>

        {/* Real Recharts Bar Chart */}
        <div className="mt-space-lg w-full h-56 select-none">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-label-md">
              <Icon name="sync" size={18} className="animate-spin text-primary mr-2" />
              Loading Telemetry Data...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 25, right: 20, left: -10, bottom: 0 }}
                barSize={50}
              >
                <CartesianGrid strokeDasharray="0" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="type"
                  stroke="#CBD5E1"
                  tick={{ fill: '#434655', fontSize: 11.5, fontFamily: 'Inter', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={{ stroke: '#CBD5E1', strokeWidth: 1.5 }}
                />
                <YAxis
                  stroke="#94A3B8"
                  domain={[0, 160000]}
                  ticks={[0, 50000, 100000, 150000]}
                  tickFormatter={(v) => (v === 0 ? '0' : `${v / 1000}k`)}
                  tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'Inter' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  <LabelList dataKey="count" content={renderCustomBarLabel} />
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill || '#004AC6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-space-xs font-label-sm text-label-sm text-on-surface-variant">
        <span>Calibration confidence index: {confidence}</span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Active AI Detection
        </span>
      </div>
    </div>
  );
}
