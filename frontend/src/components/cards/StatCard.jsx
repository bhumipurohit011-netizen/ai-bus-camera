import React from 'react';
import Icon from '../common/Icon.jsx';

export default function StatCard({
  icon,
  iconBg = 'bg-surface-container-low',
  iconColor = 'text-primary-container',
  badgeText,
  badgeBg = 'bg-surface-container-high',
  badgeColor = 'text-primary',
  badgeIcon = 'arrow_upward',
  value,
  label,
  subtext,
  subDotColor = 'bg-primary',
  subIcon,
  isErrorSub = false,
}) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Icon + Badge */}
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center ${iconColor} flex-shrink-0`}>
          <Icon name={icon} size={22} />
        </div>
        {badgeText && (
          <span className={`inline-flex items-center gap-space-2xs px-space-xs py-space-2xs rounded-full ${badgeBg} ${badgeColor} font-label-sm text-label-sm`}>
            {badgeIcon && (
              <Icon name={badgeIcon} size={14} />
            )}
            <span>{badgeText}</span>
          </span>
        )}
      </div>

      {/* Metric value and label */}
      <div className="mt-space-md">
        <span className="font-data-metric text-data-metric text-on-surface tracking-tight block font-bold tnum">
          {value}
        </span>
        <span className="font-label-md text-label-md text-on-surface-variant">
          {label}
        </span>
      </div>

      {/* Subtext info */}
      <div className={`mt-space-sm pt-space-xs font-label-sm text-label-sm flex items-center gap-space-2xs ${
        isErrorSub ? 'text-error' : 'text-on-surface-variant/70'
      }`}>
        {subIcon ? (
          <Icon name={subIcon} size={14} />
        ) : (
          <span className={`w-1.5 h-1.5 rounded-full ${subDotColor} flex-shrink-0`} />
        )}
        <span className="truncate">{subtext}</span>
      </div>
    </div>
  );
}
