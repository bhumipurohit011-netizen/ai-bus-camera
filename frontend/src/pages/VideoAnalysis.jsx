import React, { useState, useRef, useEffect } from 'react';
import Icon from '../components/common/Icon.jsx';
import { analyzeVideo, createEvent } from '../api/client.js';
import { generatePotholeSvg } from '../utils/potholeImages.js';

// Sample demonstration bus camera feeds
const SAMPLE_FEEDS = [
  {
    id: 'feed-1',
    title: 'Downtown Arterial — BUS-017',
    desc: 'Severe deep pothole cluster (7.5cm depth) & surface spalls in Lane 2',
    location: 'Downtown Central Arterial (Lane 2)',
    busId: 'BUS-017',
  },
  {
    id: 'feed-2',
    title: 'Sector 4 Industrial Route — BUS-042',
    desc: 'Heavy asphalt fracture and 6.8cm depth rim-damage pothole corridor',
    location: 'Sector 4 Industrial Beltway',
    busId: 'BUS-042',
  },
  {
    id: 'feed-3',
    title: 'Harbor Logistics Underpass — BUS-088',
    desc: '11cm critical sub-base crater & water ponding cavitations',
    location: 'South Harbor Underpass Corridor',
    busId: 'BUS-088',
  },
];

export default function VideoAnalysis({ onSelectEvent }) {
  const [selectedFeed, setSelectedFeed] = useState(SAMPLE_FEEDS[0]);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);
  const [uploadedVideoName, setUploadedVideoName] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(26.0);
  const [detections, setDetections] = useState([]);
  const [activeDetections, setActiveDetections] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const animFrameId = useRef(null);
  const lastTickTime = useRef(performance.now());

  // Load AI detection telemetry for the selected video feed
  useEffect(() => {
    async function loadAnalysis() {
      setIsAnalyzing(true);
      const res = await analyzeVideo({
        videoName: uploadedVideoName || selectedFeed.title,
        sampleId: selectedFeed.id,
      });
      setDetections(res.detections || []);
      setIsAnalyzing(false);
    }
    loadAnalysis();
  }, [selectedFeed, uploadedVideoName]);

  // Handle uploaded video file
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedVideoUrl(url);
      setUploadedVideoName(file.name);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  // Jump to specific timestamp
  const seekToDetection = (sec) => {
    setCurrentTime(sec);
    if (videoRef.current) {
      videoRef.current.currentTime = sec;
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  // Live Canvas AI Bus Camera Renderer (Renders 60 FPS driving road view with active potholes & AI tracking)
  useEffect(() => {
    let animId;

    const renderFrame = (now) => {
      const delta = (now - lastTickTime.current) / 1000;
      lastTickTime.current = now;

      // Update current time if playing
      if (isPlaying && !uploadedVideoUrl) {
        setCurrentTime((prev) => {
          let next = prev + delta;
          if (next >= duration) next = 0; // Loop back
          return next;
        });
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        // 1. Draw Sky & Horizon
        const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.4);
        skyGrad.addColorStop(0, '#020617');
        skyGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h * 0.4);

        // 2. Draw Moving Asphalt Road Perspective
        const roadGrad = ctx.createLinearGradient(0, h * 0.4, 0, h);
        roadGrad.addColorStop(0, '#1e293b');
        roadGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = roadGrad;
        
        ctx.beginPath();
        ctx.moveTo(w * 0.38, h * 0.4);
        ctx.lineTo(w * 0.62, h * 0.4);
        ctx.lineTo(w * 0.95, h);
        ctx.lineTo(w * 0.05, h);
        ctx.closePath();
        ctx.fill();

        // Road Border Lines
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.38, h * 0.4);
        ctx.lineTo(w * 0.05, h);
        ctx.moveTo(w * 0.62, h * 0.4);
        ctx.lineTo(w * 0.95, h);
        ctx.stroke();

        // 3. Animated Moving Lane Lines (Simulating Bus Driving at 45 km/h)
        const offset = (currentTime * 180) % 60;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 20]);
        ctx.lineDashOffset = -offset;

        // Center Double Line
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.4);
        ctx.lineTo(w * 0.5, h);
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // 4. Identify Active Detections based on Current Playback Time
        const t = currentTime;
        const active = detections.filter(
          (d) => t >= d.timeSec - 0.6 && t <= d.endTimeSec + 0.6
        );
        setActiveDetections(active);

        // 5. Render Pothole Cavities on Road Surface when active in video
        active.forEach((det) => {
          // Compute scale and position based on progress in detection window
          const progress = (t - (det.timeSec - 0.6)) / ((det.endTimeSec + 0.6) - (det.timeSec - 0.6));
          const pY = h * 0.4 + progress * (h * 0.52);
          const pX = w * (det.boundingBox.x / 100) + (progress - 0.5) * 40;
          const rx = (det.boundingBox.width * 1.8) * (0.4 + progress * 0.7);
          const ry = (det.boundingBox.height * 1.2) * (0.3 + progress * 0.6);

          // Draw Pothole Crater
          ctx.save();
          ctx.translate(pX, pY);

          // Outer cracked edge
          ctx.beginPath();
          ctx.ellipse(0, 0, rx + 6, ry + 4, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#334155';
          ctx.fill();

          // Dark Inner Cavity
          ctx.beginPath();
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#090d16';
          ctx.fill();

          // Inner Rocks & Depth Shading
          ctx.fillStyle = '#475569';
          ctx.beginPath();
          ctx.arc(-rx * 0.3, -ry * 0.2, rx * 0.15, 0, Math.PI * 2);
          ctx.arc(rx * 0.2, ry * 0.2, rx * 0.18, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();

          // 6. Draw Real-time AI Bounding Box Reticle
          const bx = pX - rx - 15;
          const by = pY - ry - 15;
          const bw = rx * 2 + 30;
          const bh = ry * 2 + 30;

          // Box Fill Shading
          ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
          ctx.fillRect(bx, by, bw, bh);

          // Solid Red Border
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(bx, by, bw, bh);

          // White Reticle Corners
          const cLen = 10;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.5;
          // Top-Left
          ctx.beginPath();
          ctx.moveTo(bx, by + cLen);
          ctx.lineTo(bx, by);
          ctx.lineTo(bx + cLen, by);
          ctx.stroke();
          // Top-Right
          ctx.beginPath();
          ctx.moveTo(bx + bw - cLen, by);
          ctx.lineTo(bx + bw, by);
          ctx.lineTo(bx + bw, by + cLen);
          ctx.stroke();
          // Bottom-Left
          ctx.beginPath();
          ctx.moveTo(bx, by + bh - cLen);
          ctx.lineTo(bx, by + bh);
          ctx.lineTo(bx + cLen, by + bh);
          ctx.stroke();
          // Bottom-Right
          ctx.beginPath();
          ctx.moveTo(bx + bw - cLen, by + bh);
          ctx.lineTo(bx + bw, by + bh);
          ctx.lineTo(bx + bw, by + bh - cLen);
          ctx.stroke();

          // AI Label Tag
          const labelText = `TARGET: ${det.label.toUpperCase()} [${det.confidence}%]`;
          ctx.font = 'bold 11px Inter, sans-serif';
          const textW = ctx.measureText(labelText).width;

          ctx.fillStyle = '#ef4444';
          ctx.fillRect(bx, Math.max(10, by - 22), textW + 14, 22);

          ctx.fillStyle = '#ffffff';
          ctx.fillText(labelText, bx + 7, Math.max(25, by - 7));
        });

        // 7. HUD Watermark Overlays
        // Top Left Status
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(12, 12, 280, 26);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(12, 12, 280, 26);

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(26, 25, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`${selectedFeed.busId} • AI BUS CAM FRONT • 60 FPS`, 38, 29);

        // Top Right Time HUD
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(w - 185, 12, 173, 26);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.strokeRect(w - 185, 12, 173, 26);

        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`TIME: ${currentTime.toFixed(1)}s / ${duration.toFixed(1)}s`, w - 175, 29);
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTime, duration, detections, selectedFeed, uploadedVideoUrl]);

  // Publish spotted defect to Live City Map Database
  const handlePublishToCityMap = async (detection) => {
    const newEvent = {
      title: detection.label,
      type: 'pothole',
      busId: selectedFeed.busId || 'BUS-017',
      confidence: Math.round(detection.confidence),
      severity: detection.severity,
      lat: 12.9716 + (Math.random() - 0.5) * 0.015,
      lng: 77.5946 + (Math.random() - 0.5) * 0.015,
      location: detection.location || selectedFeed.location,
      evidenceImage: generatePotholeSvg({
        id: detection.id,
        title: detection.label,
        type: 'pothole',
        severity: detection.severity,
        busId: selectedFeed.busId,
      }),
    };

    const saved = await createEvent(newEvent);
    setSaveSuccessMsg(`Pothole registered to Live City Map Database as ${saved.id || 'EVT-NEW'}!`);
    setTimeout(() => setSaveSuccessMsg(null), 4500);

    if (onSelectEvent) {
      onSelectEvent(saved);
    }
  };

  return (
    <div className="flex flex-col gap-space-md">
      {/* Top Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs">
            <Icon name="videocam" size={24} className="text-primary" />
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Edge AI Bus Camera Live Pothole Recognition
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            Real-time computer vision camera feed mounted on city transit buses detecting asphalt potholes, cavities, and roadway structural degradation.
          </p>
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-space-sm">
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 hover:bg-primary transition-colors shadow-sm"
          >
            <Icon name="upload_file" size={18} />
            <span>Upload Bus Video</span>
          </button>
        </div>
      </div>

      {/* Preset Demo Bus Camera Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
        {SAMPLE_FEEDS.map((feed) => {
          const isSelected = !uploadedVideoUrl && selectedFeed.id === feed.id;
          return (
            <button
              key={feed.id}
              onClick={() => {
                setUploadedVideoUrl(null);
                setSelectedFeed(feed);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`p-space-sm rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-surface-container-lowest border-primary shadow-sm ring-2 ring-primary/20'
                  : 'bg-surface-container-lowest/70 border-outline-variant/30 hover:bg-surface-container-lowest'
              }`}
            >
              <div className="flex items-center justify-between gap-space-xs">
                <span className="font-label-md text-label-md font-bold text-on-surface truncate">
                  {feed.title}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-surface-container-high text-primary uppercase">
                  Feed
                </span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 line-clamp-1">
                {feed.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Video Analysis Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left (8 Cols): Video Player with Interactive AI Canvas Overlay */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden flex flex-col">
          {/* Canvas & HTML5 Video Workspace */}
          <div className="relative aspect-video bg-slate-950 w-full overflow-hidden flex items-center justify-center">
            {uploadedVideoUrl ? (
              <video
                ref={videoRef}
                src={uploadedVideoUrl}
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration || 26);
                }}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => setIsPlaying(!isPlaying)}
              />
            )}

            {/* Active Pothole Alert Flasher Banner */}
            {activeDetections.length > 0 && (
              <div className="absolute bottom-4 left-4 bg-error text-white px-3 py-1.5 rounded-lg shadow-lg font-bold text-[12px] flex items-center gap-2 z-20 animate-bounce">
                <Icon name="warning" size={16} />
                <span>
                  SPOTTED POTHOLE: {activeDetections[0].label}
                </span>
              </div>
            )}
          </div>

          {/* Video Controls Bar */}
          <div className="p-space-md bg-surface-container-lowest border-t border-outline-variant/20 flex flex-col gap-space-sm">
            {/* Play/Pause & Seek Range Bar */}
            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => {
                  if (uploadedVideoUrl && videoRef.current) {
                    if (isPlaying) videoRef.current.pause();
                    else videoRef.current.play();
                  }
                  setIsPlaying(!isPlaying);
                }}
                className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary transition-colors flex-shrink-0"
              >
                <Icon name={isPlaying ? 'pause' : 'play_arrow'} size={20} />
              </button>

              <input
                type="range"
                min={0}
                max={duration || 26}
                step={0.1}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  seekToDetection(val);
                }}
                className="w-full accent-primary h-1.5 bg-surface-container-high rounded-lg cursor-pointer"
              />

              <span className="font-data-tabular text-label-sm text-on-surface-variant flex-shrink-0 font-mono">
                {Math.floor(currentTime)}s / {Math.floor(duration)}s
              </span>
            </div>

            {/* Jump to Pothole Anomaly Buttons */}
            <div className="flex flex-col gap-1 pt-1 border-t border-outline-variant/10">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold">
                Jump to Captured Pothole in Bus Feed:
              </span>
              <div className="flex flex-wrap gap-space-xs">
                {detections.map((det) => {
                  const isCurrent =
                    currentTime >= det.timeSec - 0.6 && currentTime <= det.endTimeSec + 0.6;
                  return (
                    <button
                      key={det.id}
                      onClick={() => seekToDetection(det.timeSec)}
                      className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium border transition-all flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-error text-white border-error shadow-sm scale-105 font-bold'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high border-outline-variant/30'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-error" />
                      <span>{det.timeSec}s:</span>
                      <span className="truncate max-w-[150px]">{det.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right (4 Cols): Telemetry HUD & Audit stream */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {saveSuccessMsg && (
            <div className="p-space-sm rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-label-md flex items-center gap-2 animate-in fade-in duration-200">
              <Icon name="check_circle" size={18} className="text-emerald-600" />
              <span className="leading-tight">{saveSuccessMsg}</span>
            </div>
          )}

          {/* AI Metrics Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Bus Camera Telemetry
              </span>
              <span className="px-space-xs py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[10px] font-bold">
                Live 60 FPS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-xs">
              <div className="p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-label-sm text-[10.5px] text-on-surface-variant block">
                  Potholes Spotted
                </span>
                <span className="font-data-metric text-[20px] text-error font-bold block tnum">
                  {detections.length}
                </span>
              </div>
              <div className="p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-label-sm text-[10.5px] text-on-surface-variant block">
                  Road Health Index
                </span>
                <span className="font-data-metric text-[20px] text-primary font-bold block tnum">
                  68.5 / 100
                </span>
              </div>
              <div className="p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-label-sm text-[10.5px] text-on-surface-variant block">
                  Est. Repair Backlog
                </span>
                <span className="font-data-metric text-[20px] text-on-surface font-bold block tnum">
                  $2,450
                </span>
              </div>
              <div className="p-space-xs rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="font-label-sm text-[10.5px] text-on-surface-variant block">
                  AI Model Confidence
                </span>
                <span className="font-data-metric text-[20px] text-emerald-600 font-bold block tnum">
                  96.2%
                </span>
              </div>
            </div>
          </div>

          {/* Recognized Potholes Stream */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Spotted Potholes
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {detections.length} Detections
              </span>
            </div>

            <div className="flex flex-col gap-space-xs mt-space-sm max-h-[300px] overflow-y-auto divide-y divide-outline-variant/10">
              {detections.map((det) => (
                <div
                  key={det.id}
                  className="py-2 flex flex-col gap-1 group hover:bg-surface-container-low p-1.5 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body-sm text-[12.5px] font-bold text-on-surface truncate">
                      {det.label}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-primary font-label-sm text-[10px] font-bold">
                      {det.confidence}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>Timestamp: {det.timeSec}s</span>
                    <span className="text-error font-medium">{det.severity}</span>
                  </div>

                  <div className="flex items-center gap-space-xs mt-1">
                    <button
                      onClick={() => seekToDetection(det.timeSec)}
                      className="px-2 py-0.5 rounded bg-surface-container-low text-on-surface hover:bg-surface-container-high text-[11px] font-medium border border-outline-variant/30 transition-colors"
                    >
                      Seek in Video
                    </button>
                    <button
                      onClick={() => handlePublishToCityMap(det)}
                      className="px-2 py-0.5 rounded bg-primary-container text-on-primary hover:bg-primary text-[11px] font-semibold transition-colors flex items-center gap-1"
                    >
                      <Icon name="add_location" size={12} />
                      <span>Log to City Map</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
