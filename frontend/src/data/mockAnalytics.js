export const mockVehicleCounts = {
  total: "282,730",
  confidenceIndex: "99.1%",
  data: [
    { type: "Car", count: 142850, fill: "#004AC6" },
    { type: "Motorcycle", count: 84210, fill: "#2563EB" },
    { type: "Bus", count: 18400, fill: "#636E83" },
    { type: "Truck", count: 24930, fill: "#565E74" },
    { type: "Bicycle", count: 12340, fill: "#B4C5FF" },
  ]
};

export const mockCongestionTrend = {
  threshold: 80,
  peakInfo: "Peak: 96 v/min",
  durationInfo: "Evening rush peak duration: 114 mins",
  flowVelocity: "Normalized",
  data: [
    { time: "00:00", density: 24 },
    { time: "04:00", density: 12 },
    { time: "08:00", density: 88 },
    { time: "12:00", density: 64 },
    { time: "16:00", density: 92 },
    { time: "18:00", density: 96, isPeak: true },
    { time: "20:00", density: 58 },
    { time: "Now", density: 38 },
  ]
};
