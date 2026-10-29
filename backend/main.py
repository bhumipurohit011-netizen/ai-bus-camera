from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import List, Optional
from pydantic import BaseModel
import time
import base64
import os

def generate_svg_evidence(evt_id: str, title: str, evt_type: str = "pothole", severity: str = "Urgent", depth: str = "6.5cm", width: str = "65cm", bus_id: str = "BUS-017") -> str:
    is_pothole = evt_type == "pothole"
    is_water = evt_type == "waterlogging"
    is_congestion = evt_type == "congestion"

    if is_pothole:
        specific = f'''
  <g transform="translate(420, 245)">
    <path d="M -130 -30 L -170 -55 M -110 65 L -150 100 M 120 -40 L 160 -65 M 100 70 L 140 105 M 0 -85 L 15 -115" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M -120 -20 L -70 -65 L 60 -75 L 125 -25 L 115 55 L 25 80 L -80 70 Z" fill="#000000" opacity="0.6" />
    <ellipse cx="0" cy="0" rx="110" ry="58" fill="url(#potholeGrad)" stroke="#64748b" stroke-width="3.5" />
    <ellipse cx="-40" cy="-12" rx="24" ry="14" fill="#334155" opacity="0.95" />
    <ellipse cx="35" cy="18" rx="28" ry="16" fill="#1e293b" opacity="0.95" />
    <circle cx="15" cy="-22" r="8" fill="#64748b" />
    <circle cx="-55" cy="18" r="10" fill="#475569" />
    <circle cx="55" cy="-12" r="9" fill="#94a3b8" />
    <line x1="-110" y1="78" x2="110" y2="78" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5" />
    <line x1="-110" y1="72" x2="-110" y2="84" stroke="#ef4444" stroke-width="2" />
    <line x1="110" y1="72" x2="110" y2="84" stroke="#ef4444" stroke-width="2" />
    <text x="0" y="98" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">WIDTH: {width} | DEPTH: {depth}</text>
  </g>
  <rect x="270" y="155" width="300" height="180" fill="rgba(239, 68, 68, 0.14)" stroke="#ef4444" stroke-width="3" rx="4" />
  <path d="M 270 175 L 270 155 L 290 155 M 550 155 L 570 155 L 570 175 M 270 315 L 270 335 L 290 335 M 550 335 L 570 335 L 570 315" stroke="#ffffff" stroke-width="3" fill="none"/>
  <rect x="270" y="125" width="280" height="28" fill="#ef4444" rx="4" />
  <text x="282" y="144" fill="#ffffff" font-size="13" font-weight="bold">TARGET: POTHOLE (97%) [{depth}]</text>
'''
    elif is_water:
        specific = '''
  <g transform="translate(400, 260)">
    <ellipse cx="0" cy="0" rx="190" ry="80" fill="url(#waterGrad)" stroke="#60a5fa" stroke-width="2.5" />
    <ellipse cx="-40" cy="-10" rx="90" ry="30" fill="#60a5fa" opacity="0.3" />
    <ellipse cx="30" cy="20" rx="70" ry="25" fill="none" stroke="#93c5fd" stroke-width="2" opacity="0.7" />
    <text x="0" y="8" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">WATER PONDING (DEPTH: 12cm)</text>
  </g>
  <rect x="180" y="170" width="440" height="180" fill="rgba(59, 130, 246, 0.14)" stroke="#3b82f6" stroke-width="3" rx="4" />
  <rect x="180" y="140" width="270" height="28" fill="#3b82f6" rx="4" />
  <text x="192" y="159" fill="#ffffff" font-size="13" font-weight="bold">TARGET: WATERLOGGING (95%)</text>
'''
    elif is_congestion:
        specific = '''
  <g transform="translate(400, 240)">
    <rect x="-140" y="-30" width="75" height="42" fill="#ef4444" rx="6" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="-50" y="-50" width="85" height="48" fill="#3b82f6" rx="6" stroke="#ffffff" stroke-width="1.5"/>
    <rect x="50" y="-20" width="80" height="42" fill="#64748b" rx="6" stroke="#ffffff" stroke-width="1.5"/>
  </g>
  <rect x="230" y="165" width="330" height="150" fill="rgba(249, 115, 22, 0.14)" stroke="#f97316" stroke-width="3" rx="4" />
  <rect x="230" y="135" width="260" height="28" fill="#f97316" rx="4" />
  <text x="242" y="154" fill="#ffffff" font-size="13" font-weight="bold">TARGET: CONGESTION (92%)</text>
'''
    else:
        specific = '''
  <g transform="translate(580, 200)">
    <line x1="0" y1="130" x2="0" y2="-45" stroke="#94a3b8" stroke-width="9" />
    <polygon points="-35,-45 0,-80 35,-80 70,-45 70,-10 35,25 0,25 -35,-10" fill="#ef4444" stroke="#ffffff" stroke-width="3.5" transform="rotate(-15)"/>
    <text x="15" y="-30" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle" transform="rotate(-15)">STOP</text>
  </g>
  <rect x="510" y="105" width="145" height="165" fill="rgba(245, 158, 11, 0.14)" stroke="#f59e0b" stroke-width="3" rx="4" />
  <rect x="510" y="75" width="230" height="28" fill="#f59e0b" rx="4" />
  <text x="522" y="94" fill="#ffffff" font-size="13" font-weight="bold">TARGET: DEFICIENCY (91%)</text>
'''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450" style="background:#0f172a; font-family: system-ui, -apple-system, sans-serif;">
  <defs>
    <radialGradient id="potholeGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#090d16"/>
      <stop offset="85%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#475569"/>
    </radialGradient>
    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="#1e293b" />
  <polygon points="350,110 450,110 760,450 40,450" fill="#0f172a" opacity="0.6" />
  <line x1="395" y1="110" x2="380" y2="450" stroke="#eab308" stroke-width="5" />
  <line x1="405" y1="110" x2="420" y2="450" stroke="#eab308" stroke-width="5" />
  <line x1="200" y1="110" x2="90" y2="450" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="25,25" opacity="0.85" />
  <line x1="600" y1="110" x2="710" y2="450" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="25,25" opacity="0.85" />
  {specific}
  <rect x="15" y="15" width="280" height="32" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <circle cx="32" cy="31" r="5" fill="#ef4444" />
  <text x="46" y="36" fill="#ffffff" font-size="12" font-weight="bold" font-family="monospace">{bus_id} • AI BUS CAMERA • 60 FPS</text>
  <rect x="15" y="405" width="240" height="28" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <text x="26" y="423" fill="#94a3b8" font-size="12" font-family="monospace">GPS: 12.9716° N, 77.5946° E</text>
  <rect x="620" y="405" width="165" height="28" fill="#000000" opacity="0.8" rx="4" stroke="#334155" stroke-width="1" />
  <text x="632" y="423" fill="#00f2fe" font-size="12" font-weight="bold" font-family="monospace">ID: {evt_id}</text>
</svg>'''
    b64 = base64.b64encode(svg.encode('utf-8')).decode('ascii')
    return f"data:image/svg+xml;base64,{b64}"


app = FastAPI(
    title="Urban Intelligence Platform API",
    description="Backend API for Smart City Bus Camera Telemetry & Road Intelligence",
    version="1.1.0",
)

# Enable CORS for frontend development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(STATIC_DIR):
    assets_path = os.path.join(STATIC_DIR, "assets")
    if os.path.exists(assets_path):
        app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

# -----------------
# DATA MODELS
# -----------------
class EventItem(BaseModel):
    id: Optional[str] = None
    title: str
    type: str  # pothole, congestion, incident, waterlogging, deficiency
    busId: str
    timestamp: Optional[str] = "Just now"
    confidence: int
    severity: str
    lat: float
    lng: float
    location: str
    evidenceImage: Optional[str] = None

class VideoAnalysisRequest(BaseModel):
    videoName: str
    sampleId: Optional[str] = None
    confidenceThreshold: Optional[float] = 0.75

class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    time: str
    type: str  # critical, warning, info
    read: bool

# -----------------
# IN-MEMORY DATA STORE
# -----------------
MOCK_STATS = [
    {
        "id": "active-buses",
        "label": "Total Active Buses",
        "value": "284",
        "change": "+4.2%",
        "changeDirection": "up",
        "subtext": "vs. 272 yesterday",
        "subIcon": "circle",
        "icon": "directions_bus",
        "iconBg": "bg-surface-container-low",
        "iconColor": "text-primary-container",
        "badgeBg": "bg-surface-container-high",
        "badgeColor": "text-primary",
    },
    {
        "id": "potholes-today",
        "label": "Potholes Detected Today",
        "value": "47",
        "change": "+12%",
        "changeDirection": "up",
        "subtext": "Escalation in Sector 4",
        "subIcon": "priority_high",
        "isErrorSub": True,
        "icon": "warning",
        "iconBg": "bg-error-container/40",
        "iconColor": "text-error",
        "badgeBg": "bg-error-container",
        "badgeColor": "text-on-error-container",
    },
    {
        "id": "traffic-incidents",
        "label": "Traffic Incidents",
        "value": "18",
        "change": "-8.5%",
        "changeDirection": "down",
        "subtext": "14 resolved, 4 ongoing",
        "subIcon": "circle",
        "icon": "report_problem",
        "iconBg": "bg-secondary-container/60",
        "iconColor": "text-on-secondary-container",
        "badgeBg": "bg-surface-container",
        "badgeColor": "text-primary",
    },
    {
        "id": "waterlogging-events",
        "label": "Waterlogging Events",
        "value": "6",
        "change": "+2 New",
        "changeDirection": "neutral",
        "subtext": "South Harbor Underpass",
        "subIcon": "location_on",
        "icon": "water_drop",
        "iconBg": "bg-surface-container-high",
        "iconColor": "text-surface-tint",
        "badgeBg": "bg-surface-container",
        "badgeColor": "text-surface-tint",
    },
    {
        "id": "system-alerts",
        "label": "Active System Alerts",
        "value": "9",
        "change": "3 Critical",
        "changeDirection": "critical",
        "subtext": "Action required (Dispatch)",
        "subIcon": "tune",
        "icon": "notifications_active",
        "iconBg": "bg-tertiary-fixed",
        "iconColor": "text-on-tertiary-fixed",
        "badgeBg": "bg-error-container",
        "badgeColor": "text-on-error-container font-semibold",
    },
]

MOCK_EVENTS = [
    {
        "id": "EVT-104",
        "title": "Severe Deep Pothole (Depth: 7.5cm, Width: 80cm)",
        "type": "pothole",
        "busId": "BUS-017",
        "timestamp": "2 min ago",
        "confidence": 96,
        "severity": "Urgent",
        "lat": 12.9716,
        "lng": 77.5946,
        "location": "Downtown Central Arterial (Lane 2)",
        "evidenceImage": generate_svg_evidence("EVT-104", "Severe Deep Pothole", "pothole", "Urgent", "7.5cm", "80cm", "BUS-017"),
    },
    {
        "id": "EVT-109",
        "title": "Micro Pothole / Surface Spall (Depth: 1.5cm, Width: 15cm)",
        "type": "pothole",
        "busId": "BUS-003",
        "timestamp": "4 min ago",
        "confidence": 89,
        "severity": "Low",
        "lat": 12.9762,
        "lng": 77.5890,
        "location": "Sector 3 North Expressway",
        "evidenceImage": generate_svg_evidence("EVT-109", "Micro Pothole", "pothole", "Low", "1.5cm", "15cm", "BUS-003"),
    },
    {
        "id": "EVT-105",
        "title": "Heavy Bottleneck / Jam",
        "type": "congestion",
        "busId": "BUS-042",
        "timestamp": "5 min ago",
        "confidence": 92,
        "severity": "High",
        "lat": 12.9780,
        "lng": 77.6050,
        "location": "Harbor Logistics Corridor",
        "evidenceImage": generate_svg_evidence("EVT-105", "Heavy Bottleneck", "congestion", "High", "N/A", "N/A", "BUS-042"),
    },
    {
        "id": "EVT-110",
        "title": "Medium Wheel-Impact Pothole (Depth: 4.2cm, Width: 45cm)",
        "type": "pothole",
        "busId": "BUS-022",
        "timestamp": "6 min ago",
        "confidence": 94,
        "severity": "Moderate",
        "lat": 12.9705,
        "lng": 77.6010,
        "location": "5th Avenue Junction",
        "evidenceImage": generate_svg_evidence("EVT-110", "Medium Wheel-Impact Pothole", "pothole", "Moderate", "4.2cm", "45cm", "BUS-022"),
    },
    {
        "id": "EVT-106",
        "title": "Rash Driving / Near-miss",
        "type": "incident",
        "busId": "BUS-009",
        "timestamp": "8 min ago",
        "confidence": 88,
        "severity": "High",
        "lat": 12.9850,
        "lng": 77.5900,
        "location": "Ring Road North Exit",
        "evidenceImage": generate_svg_evidence("EVT-106", "Near-miss Incident", "incident", "High", "N/A", "N/A", "BUS-009"),
    },
    {
        "id": "EVT-111",
        "title": "Large Rim-Damage Pothole (Depth: 6.8cm, Width: 70cm)",
        "type": "pothole",
        "busId": "BUS-014",
        "timestamp": "11 min ago",
        "confidence": 97,
        "severity": "Urgent",
        "lat": 12.9680,
        "lng": 77.5990,
        "location": "Sector 4 Industrial Corridor",
        "evidenceImage": generate_svg_evidence("EVT-111", "Large Rim-Damage Pothole", "pothole", "Urgent", "6.8cm", "70cm", "BUS-014"),
    },
    {
        "id": "EVT-107",
        "title": "Water Accumulation (12m)",
        "type": "waterlogging",
        "busId": "BUS-088",
        "timestamp": "14 min ago",
        "confidence": 95,
        "severity": "Moderate",
        "lat": 12.9650,
        "lng": 77.6100,
        "location": "South Harbor Underpass",
        "evidenceImage": generate_svg_evidence("EVT-107", "Water Accumulation", "waterlogging", "Moderate", "12cm", "12m", "BUS-088"),
    },
    {
        "id": "EVT-112",
        "title": "Shallow Asphalt Depression (Depth: 2.2cm, Width: 30cm)",
        "type": "pothole",
        "busId": "BUS-005",
        "timestamp": "17 min ago",
        "confidence": 91,
        "severity": "Low",
        "lat": 12.9750,
        "lng": 77.6120,
        "location": "Suburban West Route 12",
        "evidenceImage": generate_svg_evidence("EVT-112", "Shallow Asphalt Depression", "pothole", "Low", "2.2cm", "30cm", "BUS-005"),
    },
    {
        "id": "EVT-108",
        "title": "Obscured Pedestrian Sign",
        "type": "deficiency",
        "busId": "BUS-031",
        "timestamp": "21 min ago",
        "confidence": 91,
        "severity": "Low",
        "lat": 12.9730,
        "lng": 77.5800,
        "location": "5th Avenue Crossing",
        "evidenceImage": generate_svg_evidence("EVT-108", "Obscured Pedestrian Sign", "deficiency", "Low", "N/A", "N/A", "BUS-031"),
    },
    {
        "id": "EVT-113",
        "title": "Critical Sub-base Crater (Depth: 11.0cm, Width: 120cm)",
        "type": "pothole",
        "busId": "BUS-055",
        "timestamp": "25 min ago",
        "confidence": 98,
        "severity": "Urgent",
        "lat": 12.9610,
        "lng": 77.5920,
        "location": "Metro Crossline Underpass",
        "evidenceImage": generate_svg_evidence("EVT-113", "Critical Sub-base Crater", "pothole", "Urgent", "11.0cm", "120cm", "BUS-055"),
    },
    {
        "id": "EVT-114",
        "title": "Wide Transverse Trench Pothole (Depth: 5.5cm, Width: 150cm)",
        "type": "pothole",
        "busId": "BUS-071",
        "timestamp": "29 min ago",
        "confidence": 93,
        "severity": "High",
        "lat": 12.9820,
        "lng": 77.5980,
        "location": "Ring Road East Ingress",
        "evidenceImage": generate_svg_evidence("EVT-114", "Wide Transverse Trench Pothole", "pothole", "High", "5.5cm", "150cm", "BUS-071"),
    },
    {
        "id": "EVT-115",
        "title": "Small Edge-Break Pothole (Depth: 3.0cm, Width: 20cm)",
        "type": "pothole",
        "busId": "BUS-019",
        "timestamp": "33 min ago",
        "confidence": 90,
        "severity": "Moderate",
        "lat": 12.9790,
        "lng": 77.5840,
        "location": "Harbor Logistics Lane 1",
        "evidenceImage": generate_svg_evidence("EVT-115", "Small Edge-Break Pothole", "pothole", "Moderate", "3.0cm", "20cm", "BUS-019"),
    },
]

MOCK_BUSES = [
    {
        "id": "BUS-001",
        "route": "Route 104 — Downtown Express",
        "status": "Active",
        "statusColor": "bg-primary",
        "badgeBg": "bg-surface-container-high",
        "badgeColor": "text-primary",
        "metricTop": "60 FPS",
        "metricTopColor": "text-primary",
        "metricBottom": "Edge Model v4",
        "lat": 12.9720,
        "lng": 77.5930,
        "speed": 34,
        "heading": 85,
        "driver": "Marcus Vance",
        "cameraHealth": "100%",
        "temp": "38°C",
    },
    {
        "id": "BUS-002",
        "route": "Route 42 — Metro Crossline",
        "status": "Active",
        "statusColor": "bg-primary",
        "badgeBg": "bg-surface-container-high",
        "badgeColor": "text-primary",
        "metricTop": "Optimal",
        "metricTopColor": "text-on-surface",
        "metricBottom": "Stream Sync OK",
        "lat": 12.9775,
        "lng": 77.6045,
        "speed": 28,
        "heading": 120,
        "driver": "Sunita Rao",
        "cameraHealth": "99.4%",
        "temp": "36°C",
    },
    {
        "id": "BUS-003",
        "route": "Route 88 — South Industrial",
        "status": "Active",
        "statusColor": "bg-primary",
        "badgeBg": "bg-surface-container-high",
        "badgeColor": "text-primary",
        "metricTop": "Optimal",
        "metricTopColor": "text-on-surface",
        "metricBottom": "Stream Sync OK",
        "lat": 12.9645,
        "lng": 77.6095,
        "speed": 40,
        "heading": 210,
        "driver": "Ahmed Khan",
        "cameraHealth": "98.8%",
        "temp": "39°C",
    },
    {
        "id": "BUS-004",
        "route": "Route 12 — North Terminal",
        "status": "Offline",
        "statusColor": "bg-outline",
        "badgeBg": "bg-surface-container-high",
        "badgeColor": "text-on-surface-variant",
        "metricTop": "In Depot",
        "metricTopColor": "text-on-surface-variant",
        "metricBottom": "Maintenance",
        "isOffline": True,
        "lat": 12.9860,
        "lng": 77.5880,
        "speed": 0,
        "heading": 0,
        "driver": "Unassigned",
        "cameraHealth": "Calibration Req",
        "temp": "24°C",
    },
]

MOCK_VEHICLE_COUNTS = {
    "total": "282,730",
    "confidenceIndex": "99.1%",
    "data": [
        {"type": "Car", "count": 142850, "fill": "#004AC6", "share": "50.5%"},
        {"type": "Motorcycle", "count": 84210, "fill": "#2563EB", "share": "29.8%"},
        {"type": "Bus", "count": 18400, "fill": "#636E83", "share": "6.5%"},
        {"type": "Truck", "count": 24930, "fill": "#565E74", "share": "8.8%"},
        {"type": "Bicycle", "count": 12340, "fill": "#B4C5FF", "share": "4.4%"},
    ],
}

MOCK_CONGESTION_TREND = {
    "threshold": 80,
    "peakInfo": "Peak: 96 v/min",
    "durationInfo": "Evening rush peak duration: 114 mins",
    "flowVelocity": "Normalized",
    "data": [
        {"time": "00:00", "density": 24},
        {"time": "04:00", "density": 12},
        {"time": "08:00", "density": 88},
        {"time": "12:00", "density": 64},
        {"time": "16:00", "density": 92},
        {"time": "18:00", "density": 96, "isPeak": True},
        {"time": "20:00", "density": 58},
        {"time": "Now", "density": 38},
    ],
}

MOCK_NOTIFICATIONS = [
    {
        "id": "notif-1",
        "title": "Severe Pothole Cluster Detected",
        "message": "BUS-017 logged an urgent 6cm depth cavity on Downtown Arterial. Traffic speed reduced by 30%.",
        "time": "2 min ago",
        "type": "critical",
        "read": False,
    },
    {
        "id": "notif-2",
        "title": "Underpass Water Accumulation",
        "message": "BUS-088 detected 12m water ponding at South Harbor Underpass. Warning dispatched to control.",
        "time": "14 min ago",
        "type": "warning",
        "read": False,
    },
    {
        "id": "notif-3",
        "title": "Severe Congestion Threshold Exceeded",
        "message": "Evening rush reached 96 v/min in Sector 2 corridor, crossing 80 v/min safety limit.",
        "time": "45 min ago",
        "type": "critical",
        "read": False,
    },
    {
        "id": "notif-4",
        "title": "Fleet Model v4 Sync Complete",
        "message": "All 284 active buses updated edge AI neural weights for nocturnal pothole inference.",
        "time": "2 hours ago",
        "type": "info",
        "read": True,
    },
]

MOCK_REPORTS = {
    "totalAuditKm": 14820,
    "potholesPerKm": 0.32,
    "roadHealthScore": 76.4,
    "sectors": [
        {"sector": "Sector 1 (Downtown)", "health": 68, "potholes": 18, "status": "Requires Resurfacing"},
        {"sector": "Sector 2 (Harbor)", "health": 74, "potholes": 12, "status": "Fair Condition"},
        {"sector": "Sector 3 (North Expressway)", "health": 89, "potholes": 4, "status": "Good Condition"},
        {"sector": "Sector 4 (Industrial Belt)", "health": 61, "potholes": 24, "status": "Critical Intervention"},
        {"sector": "Sector 5 (Suburban West)", "health": 85, "potholes": 6, "status": "Normal Wear"},
    ],
    "estimatedRepairCost": "$142,500",
}

# -----------------
# API ENDPOINTS
# -----------------
@app.get("/api/health")
@app.get("/api")
def api_status():
    return {
        "platform": "AI-Powered Urban Intelligence Platform",
        "status": "Operational",
        "version": "1.1.0",
        "docs_url": "/docs",
    }

@app.get("/")
def read_root():
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return api_status()

@app.get("/api/stats")
def get_stats():
    return MOCK_STATS

@app.get("/api/events")
def get_events():
    return MOCK_EVENTS

@app.post("/api/events")
def create_event(event: EventItem):
    new_id = f"EVT-{100 + len(MOCK_EVENTS) + 1}"
    new_item = {
        "id": new_id,
        "title": event.title,
        "type": event.type,
        "busId": event.busId or "BUS-CAM",
        "timestamp": event.timestamp or "Just now",
        "confidence": event.confidence or 94,
        "severity": event.severity or "Medium",
        "lat": event.lat or 12.9730,
        "lng": event.lng or 77.5950,
        "location": event.location or "Reported from Video AI",
        "evidenceImage": event.evidenceImage or generate_svg_evidence(new_id, event.title, event.type, event.severity, "6.5cm", "60cm", event.busId or "BUS-CAM"),
    }
    MOCK_EVENTS.insert(0, new_item)
    # Update potholes today stat if pothole
    if event.type == "pothole":
        for stat in MOCK_STATS:
            if stat["id"] == "potholes-today":
                try:
                    stat["value"] = str(int(stat["value"]) + 1)
                except:
                    pass
    return new_item

@app.get("/api/buses")
def get_buses():
    return MOCK_BUSES

@app.get("/api/analytics/vehicle-counts")
def get_vehicle_counts():
    return MOCK_VEHICLE_COUNTS

@app.get("/api/analytics/congestion-trend")
def get_congestion_trend():
    return MOCK_CONGESTION_TREND

@app.get("/api/notifications")
def get_notifications():
    return MOCK_NOTIFICATIONS

@app.put("/api/notifications/{notif_id}/read")
def mark_notification_read(notif_id: str):
    for n in MOCK_NOTIFICATIONS:
        if n["id"] == notif_id:
            n["read"] = True
            return {"status": "success", "id": notif_id}
    raise HTTPException(status_code=404, detail="Notification not found")

@app.get("/api/reports")
def get_reports():
    return MOCK_REPORTS

# -----------------
# AI VIDEO ANALYSIS ENDPOINT
# -----------------
@app.post("/api/ai/analyze-video")
def analyze_video(req: VideoAnalysisRequest):
    """
    Simulates / processes bus camera video stream for real-time pothole and road damage detection.
    Returns timestamped bounding boxes, damage types, severity, depth estimations, and confidence.
    """
    # Sample detections mapped to video timestamp ranges (in seconds)
    detections = [
        {
            "id": "DET-01",
            "timeSec": 2.4,
            "endTimeSec": 5.1,
            "type": "pothole",
            "label": "Severe Deep Pothole (Depth: 7.5cm, Width: 80cm)",
            "severity": "Urgent",
            "confidence": 96.4,
            "boundingBox": {"x": 38, "y": 62, "width": 24, "height": 18},
            "location": "Downtown Central Arterial (Lane 2)",
            "estimatedRepairCost": "$450",
            "roadDamageIndex": 84,
        },
        {
            "id": "DET-02",
            "timeSec": 6.8,
            "endTimeSec": 9.2,
            "type": "pothole",
            "label": "Micro Pothole / Surface Spall (Depth: 1.5cm, Width: 15cm)",
            "severity": "Low",
            "confidence": 89.1,
            "boundingBox": {"x": 25, "y": 55, "width": 14, "height": 10},
            "location": "Downtown Central Arterial (Lane 1)",
            "estimatedRepairCost": "$120",
            "roadDamageIndex": 35,
        },
        {
            "id": "DET-03",
            "timeSec": 11.5,
            "endTimeSec": 14.0,
            "type": "pothole",
            "label": "Medium Wheel-Impact Pothole (Depth: 4.2cm, Width: 45cm)",
            "severity": "Moderate",
            "confidence": 93.8,
            "boundingBox": {"x": 58, "y": 68, "width": 20, "height": 16},
            "location": "Downtown Central Arterial (Near Curbside)",
            "estimatedRepairCost": "$350",
            "roadDamageIndex": 68,
        },
        {
            "id": "DET-04",
            "timeSec": 16.2,
            "endTimeSec": 19.5,
            "type": "pothole",
            "label": "Large Rim-Damage Pothole (Depth: 6.8cm, Width: 70cm)",
            "severity": "Urgent",
            "confidence": 97.5,
            "boundingBox": {"x": 42, "y": 65, "width": 30, "height": 20},
            "location": "Downtown Central Arterial (Center Lane)",
            "estimatedRepairCost": "$580",
            "roadDamageIndex": 82,
        },
        {
            "id": "DET-05",
            "timeSec": 22.0,
            "endTimeSec": 25.5,
            "type": "pothole",
            "label": "Critical Sub-base Crater (Depth: 11.0cm, Width: 120cm)",
            "severity": "Urgent",
            "confidence": 98.2,
            "boundingBox": {"x": 30, "y": 64, "width": 36, "height": 26},
            "location": "Downtown Central Arterial (Interchange Ramp)",
            "estimatedRepairCost": "$950",
            "roadDamageIndex": 94,
        },
    ]
    
    return {
        "status": "success",
        "videoName": req.videoName,
        "processedFps": 60,
        "totalFrames": 780,
        "durationSec": 26.0,
        "defectsFound": len(detections),
        "roadHealthScore": 68.5,
        "detections": detections,
    }

if os.path.exists(STATIC_DIR):
    @app.get("/{full_path:path}")
    def serve_frontend_spa(full_path: str):
        if full_path.startswith("api/") or full_path in ["docs", "redoc", "openapi.json"]:
            raise HTTPException(status_code=404, detail="Not Found")
        
        target_file = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        
        index_file = os.path.join(STATIC_DIR, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return api_status()
