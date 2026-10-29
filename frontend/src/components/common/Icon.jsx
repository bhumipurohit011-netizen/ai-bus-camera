import React from 'react';

// Crisp, lightweight, 100% offline inline SVG icon library.
// Prevents ligature text ('directions_bus', 'dashboard', 'warning') from ever spilling or overlapping!

const ICONS = {
  dashboard: (
    <path
      fill="currentColor"
      d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
    />
  ),
  videocam: (
    <path
      fill="currentColor"
      d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
    />
  ),
  map: (
    <path
      fill="currentColor"
      d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
    />
  ),
  event_available: (
    <path
      fill="currentColor"
      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-8.5-2.5l-3-3 1.41-1.41 1.59 1.59 4.59-4.59L16 11l-5.5 5.5z"
    />
  ),
  directions_bus: (
    <path
      fill="currentColor"
      d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"
    />
  ),
  traffic: (
    <path
      fill="currentColor"
      d="M20 10h-3V8.86c1.72-.45 3-2 3-3.86 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 1.86 1.28 3.41 3 3.86V10H7v2h8v2H7v2h8v.14c-1.72.45-3 2-3 3.86 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.86-1.28-3.41-3-3.86V16h3v-2h-3v-2h3v-2zm-4-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    />
  ),
  warning: (
    <path
      fill="currentColor"
      d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
    />
  ),
  report_problem: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  ),
  analytics: (
    <path
      fill="currentColor"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-8h2v8zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2z"
    />
  ),
  settings: (
    <path
      fill="currentColor"
      d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
    />
  ),
  search: (
    <path
      fill="currentColor"
      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  ),
  notifications: (
    <path
      fill="currentColor"
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
    />
  ),
  notifications_active: (
    <path
      fill="currentColor"
      d="M7.58 4.08L6.15 2.65C3.75 4.48 2.22 7.23 2.03 10.35h2c.19-2.58 1.48-4.88 3.55-6.27zm12.39 6.27h2c-.19-3.12-1.72-5.87-4.12-7.7l-1.43 1.43c2.07 1.39 3.36 3.69 3.55 6.27zM18 11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"
    />
  ),
  sync: (
    <path
      fill="currentColor"
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
    />
  ),
  arrow_upward: (
    <path
      fill="currentColor"
      d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
    />
  ),
  arrow_downward: (
    <path
      fill="currentColor"
      d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
    />
  ),
  trending_up: (
    <path
      fill="currentColor"
      d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"
    />
  ),
  water_drop: (
    <path
      fill="currentColor"
      d="M12 2c-4.97 0-9 4.03-9 9 0 3.86 2.45 7.15 5.92 8.41L12 22l3.08-2.59C18.55 18.15 21 14.86 21 11c0-4.97-4.03-9-9-9zm0 17.88l-2.04-1.72C6.98 17.07 5 14.28 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.28-1.98 6.07-4.96 7.16L12 19.88z"
    />
  ),
  water: (
    <path
      fill="currentColor"
      d="M12 2c-4.97 0-9 4.03-9 9 0 3.86 2.45 7.15 5.92 8.41L12 22l3.08-2.59C18.55 18.15 21 14.86 21 11c0-4.97-4.03-9-9-9zm0 17.88l-2.04-1.72C6.98 17.07 5 14.28 5 11c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.28-1.98 6.07-4.96 7.16L12 19.88z"
    />
  ),
  circle: (
    <circle cx="12" cy="12" r="5" fill="currentColor" />
  ),
  priority_high: (
    <path
      fill="currentColor"
      d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
    />
  ),
  location_on: (
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    />
  ),
  tune: (
    <path
      fill="currentColor"
      d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
    />
  ),
  local_fire_department: (
    <path
      fill="currentColor"
      d="M19.48 12.35c-1.57-4.08-7.16-4.3-5.81-10.23.1-.44-.37-.78-.7-.54-3.41 2.5-5.97 6.17-5.97 10.42 0 4.42 3.58 8 8 8 4.42 0 8-3.58 8-8 0-2.92-1.56-5.48-3.52-7.65zm-3.48 6.65c-2.76 0-5-2.24-5-5 0-1.77.92-3.32 2.32-4.22-.32 1.34.12 2.76 1.15 3.65 1.05.9 2.53 1.02 3.53.57.06.66-.02 1.35-.27 2-.73 1.77-2.39 3-4.23 3z"
    />
  ),
  add: (
    <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  ),
  close: (
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  ),
  upload_file: (
    <path
      fill="currentColor"
      d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11 8 15.01z"
    />
  ),
  add_location: (
    <path
      fill="currentColor"
      d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm4 8h-3v3h-2v-3H8V8h3V5h2v3h3v2z"
    />
  ),
  arrow_forward: (
    <path
      fill="currentColor"
      d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
    />
  ),
  check_circle: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  ),
  local_shipping: (
    <path
      fill="currentColor"
      d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
    />
  ),
  play_arrow: (
    <path fill="currentColor" d="M8 5v14l11-7z" />
  ),
  pause: (
    <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  ),
  hub: (
    <path
      fill="currentColor"
      d="M10 3v1.17C7.61 4.71 6 6.88 6 9.5c0 1.95.96 3.69 2.44 4.77L7.02 18H4v3h4v-1.78l1.45-3.81c.8.38 1.68.59 2.55.59s1.75-.21 2.55-.59L16 19.22V21h4v-3h-3.02l-1.42-3.73C17.04 13.19 18 11.45 18 9.5c0-2.62-1.61-4.79-4-5.33V3h-4zm2 4.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"
    />
  ),
  smart_toy: (
    <path
      fill="currentColor"
      d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 10 15 10s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7.5 3h9v1.5h-9V16z"
    />
  ),
  remove: (
    <path fill="currentColor" d="M19 13H5v-2h14v2z" />
  ),
  crop_free: (
    <path
      fill="currentColor"
      d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"
    />
  ),
  picture_as_pdf: (
    <path
      fill="currentColor"
      d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zm4.5 2h1v-3h-1v3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"
    />
  ),
  download: (
    <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
  ),
  info: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    />
  ),
};

export default function Icon({ name, className = '', size = 20, style = {} }) {
  if (!name) return null;

  const cleanName = String(name).trim();
  const iconPath = ICONS[cleanName];

  if (!iconPath) {
    // Fallback: simple dot or warning icon instead of leaking ligature text
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`inline-block flex-shrink-0 ${className}`}
        style={{ verticalAlign: 'middle', ...style }}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`inline-block flex-shrink-0 ${className}`}
      style={{ verticalAlign: 'middle', ...style }}
      aria-hidden="true"
    >
      {iconPath}
    </svg>
  );
}
