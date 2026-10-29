import axios from 'axios';
import { mockStats, mockEvents } from '../data/mockEvents.js';
import { mockBuses } from '../data/mockBuses.js';
import { mockVehicleCounts, mockCongestionTrend } from '../data/mockAnalytics.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchStats = async () => {
  try {
    const res = await api.get('/stats');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/stats unreachable, using fallback mock data.', err.message);
    return mockStats;
  }
};

export const fetchEvents = async () => {
  try {
    const res = await api.get('/events');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/events unreachable, using fallback mock data.', err.message);
    return mockEvents;
  }
};

export const createEvent = async (eventData) => {
  try {
    const res = await api.post('/events', eventData);
    return res.data;
  } catch (err) {
    console.warn('Backend POST /api/events unreachable, creating locally.', err.message);
    const localEvent = {
      id: `EVT-${Date.now().toString().slice(-3)}`,
      ...eventData,
      timestamp: 'Just now',
    };
    return localEvent;
  }
};

export const fetchBuses = async () => {
  try {
    const res = await api.get('/buses');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/buses unreachable, using fallback mock data.', err.message);
    return mockBuses;
  }
};

export const fetchVehicleCounts = async () => {
  try {
    const res = await api.get('/analytics/vehicle-counts');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/analytics/vehicle-counts unreachable, using fallback mock data.', err.message);
    return mockVehicleCounts;
  }
};

export const fetchCongestionTrend = async () => {
  try {
    const res = await api.get('/analytics/congestion-trend');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/analytics/congestion-trend unreachable, using fallback mock data.', err.message);
    return mockCongestionTrend;
  }
};

export const fetchNotifications = async () => {
  try {
    const res = await api.get('/notifications');
    return res.data;
  } catch (err) {
    console.warn('Backend /api/notifications unreachable, using fallback mock data.', err.message);
    return [
      {
        id: 'notif-1',
        title: 'Severe Pothole Cluster Detected',
        message: 'BUS-017 logged an urgent 6cm depth cavity on Downtown Arterial. Traffic speed reduced by 30%.',
        time: '2 min ago',
        type: 'critical',
        read: false,
      },
      {
        id: 'notif-2',
        title: 'Underpass Water Accumulation',
        message: 'BUS-088 detected 12m water ponding at South Harbor Underpass. Warning dispatched to control.',
        time: '14 min ago',
        type: 'warning',
        read: false,
      },
      {
        id: 'notif-3',
        title: 'Severe Congestion Threshold Exceeded',
        message: 'Evening rush reached 96 v/min in Sector 2 corridor, crossing 80 v/min safety limit.',
        time: '45 min ago',
        type: 'critical',
        read: false,
      },
    ];
  }
};

export const markNotificationAsRead = async (notifId) => {
  try {
    const res = await api.put(`/notifications/${notifId}/read`);
    return res.data;
  } catch (err) {
    return { status: 'success', id: notifId };
  }
};

export const fetchReports = async () => {
  try {
    const res = await api.get('/reports');
    return res.data;
  } catch (err) {
    return {
      totalAuditKm: 14820,
      potholesPerKm: 0.32,
      roadHealthScore: 76.4,
      sectors: [
        { sector: 'Sector 1 (Downtown)', health: 68, potholes: 18, status: 'Requires Resurfacing' },
        { sector: 'Sector 2 (Harbor)', health: 74, potholes: 12, status: 'Fair Condition' },
        { sector: 'Sector 3 (North Expressway)', health: 89, potholes: 4, status: 'Good Condition' },
        { sector: 'Sector 4 (Industrial Belt)', health: 61, potholes: 24, status: 'Critical Intervention' },
        { sector: 'Sector 5 (Suburban West)', health: 85, potholes: 6, status: 'Normal Wear' },
      ],
      estimatedRepairCost: '$142,500',
    };
  }
};

export const analyzeVideo = async (requestData) => {
  try {
    const res = await api.post('/ai/analyze-video', requestData);
    return res.data;
  } catch (err) {
    console.warn('Backend /api/ai/analyze-video unreachable, using local inference simulation.', err.message);
    return {
      status: 'success',
      videoName: requestData.videoName,
      processedFps: 60,
      totalFrames: 780,
      durationSec: 26.0,
      defectsFound: 5,
      roadHealthScore: 68.5,
      detections: [
        {
          id: 'DET-01',
          timeSec: 2.4,
          endTimeSec: 5.1,
          type: 'pothole',
          label: 'Severe Pothole (Depth: 6.2cm)',
          severity: 'Urgent',
          confidence: 96.4,
          boundingBox: { x: 38, y: 62, width: 24, height: 18 },
          location: 'Downtown Central Arterial (Lane 2)',
          estimatedRepairCost: '$450',
          roadDamageIndex: 84,
        },
        {
          id: 'DET-02',
          timeSec: 6.8,
          endTimeSec: 9.2,
          type: 'road_damage',
          label: 'Transverse Asphalt Fracture / Crack',
          severity: 'Moderate',
          confidence: 89.1,
          boundingBox: { x: 25, y: 55, width: 48, height: 14 },
          location: 'Downtown Central Arterial (Crosswalk Approach)',
          estimatedRepairCost: '$280',
          roadDamageIndex: 62,
        },
        {
          id: 'DET-03',
          timeSec: 11.5,
          endTimeSec: 14.0,
          type: 'pothole',
          label: 'Surface Cavity / Aggregate Loss',
          severity: 'High',
          confidence: 93.8,
          boundingBox: { x: 58, y: 68, width: 20, height: 16 },
          location: 'Downtown Central Arterial (Near Curbside)',
          estimatedRepairCost: '$350',
          roadDamageIndex: 78,
        },
        {
          id: 'DET-04',
          timeSec: 16.2,
          endTimeSec: 19.5,
          type: 'waterlogging',
          label: 'Standing Surface Ponding (10m)',
          severity: 'Moderate',
          confidence: 94.5,
          boundingBox: { x: 42, y: 70, width: 38, height: 20 },
          location: 'Downtown Central Arterial (Depressed Drainage)',
          estimatedRepairCost: '$600',
          roadDamageIndex: 71,
        },
        {
          id: 'DET-05',
          timeSec: 22.0,
          endTimeSec: 25.5,
          type: 'pothole',
          label: 'Deep Edge Pothole (Depth: 7.5cm)',
          severity: 'Urgent',
          confidence: 97.2,
          boundingBox: { x: 30, y: 64, width: 26, height: 22 },
          location: 'Downtown Central Arterial (Interchange Ramp)',
          estimatedRepairCost: '$520',
          roadDamageIndex: 89,
        },
      ],
    };
  }
};

export default api;
