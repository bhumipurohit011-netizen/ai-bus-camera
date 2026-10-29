import React from 'react';
import Icon from './common/Icon.jsx';

const STATS_CONFIG = [
  {
    id: 'buses',
    label: 'Total Active Buses',
    value: '284',
    change: '+4.2%',
    trend: 'up',
    trendColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    subtext: 'vs. 272 yesterday',
    icon: 'directions_bus',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    accentColor: '#2563EB',
  },
  {
    id: 'potholes',
    label: 'Potholes Detected Today',
    value: '47',
    change: '+12%',
    trend: 'up',
    trendColor: 'text-red-700 bg-red-50 border-red-200/60',
    subtext: 'vs. 41 yesterday • Escalation',
    icon: 'warning',
    iconBg: 'bg-red-50 text-red-600 border border-red-100',
    accentColor: '#EF4444',
  },
  {
    id: 'incidents',
    label: 'Traffic Incidents',
    value: '18',
    change: '-8.5%',
    trend: 'down',
    trendColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    subtext: 'vs. 20 yesterday • 14 resolved',
    icon: 'report_problem',
    iconBg: 'bg-orange-50 text-orange-600 border border-orange-100',
    accentColor: '#F97316',
  },
  {
    id: 'waterlogging',
    label: 'Waterlogging Events',
    value: '6',
    change: '+2 New',
    trend: 'up',
    trendColor: 'text-blue-700 bg-blue-50 border-blue-200/60',
    subtext: 'vs. 4 yesterday • Harbor sector',
    icon: 'water_drop',
    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
    accentColor: '#3B82F6',
  },
  {
    id: 'alerts',
    label: 'Active Alerts',
    value: '9',
    change: '3 Critical',
    trend: 'alert',
    trendColor: 'text-purple-700 bg-purple-50 border-purple-200/60',
    subtext: 'Action required (Dispatch)',
    icon: 'notifications_active',
    iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
    accentColor: '#A855F7',
  },
];

export default function StatCardsRow() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {STATS_CONFIG.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
        >
          {/* Top: Icon + Trend Badge */}
          <div className="flex items-center justify-between">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}
            >
              <Icon name={card.icon} size={22} />
            </div>

            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${card.trendColor}`}
            >
              {card.trend === 'up' && (
                <Icon name="arrow_upward" size={13} />
              )}
              {card.trend === 'down' && (
                <Icon name="arrow_downward" size={13} />
              )}
              {card.trend === 'alert' && (
                <Icon name="priority_high" size={13} />
              )}
              <span>{card.change}</span>
            </span>
          </div>

          {/* Number & Label */}
          <div className="mt-4">
            <span className="text-[28px] font-bold text-slate-900 tracking-tight block leading-tight font-sans">
              {card.value}
            </span>
            <span className="text-[12.5px] font-medium text-slate-500 block mt-0.5">
              {card.label}
            </span>
          </div>

          {/* Context subtext */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: card.accentColor }}
            />
            <span className="truncate">{card.subtext}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
