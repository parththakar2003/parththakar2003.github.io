"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
import "leaflet/dist/leaflet.css";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Simulated cyber attack data based on public threat intelligence patterns
const attackData = [
  { lat: 37.7749, lng: -122.4194, type: "DDoS Attack", country: "USA", protocol: "HTTP", severity: "high" },
  { lat: 55.7558, lng: 37.6173, type: "Brute Force", country: "Russia", protocol: "SSH", severity: "critical" },
  { lat: 28.6139, lng: 77.209, type: "Malware", country: "India", protocol: "SMTP", severity: "medium" },
  { lat: 39.9042, lng: 116.4074, type: "Port Scan", country: "China", protocol: "TCP", severity: "low" },
  { lat: 51.5074, lng: -0.1278, type: "Phishing", country: "UK", protocol: "HTTPS", severity: "high" },
  { lat: -23.5505, lng: -46.6333, type: "Ransomware", country: "Brazil", protocol: "RDP", severity: "critical" },
  { lat: 35.6762, lng: 139.6503, type: "SQL Injection", country: "Japan", protocol: "HTTP", severity: "high" },
  { lat: 52.52, lng: 13.405, type: "XSS Attack", country: "Germany", protocol: "HTTPS", severity: "medium" },
  { lat: 1.3521, lng: 103.8198, type: "DDoS Attack", country: "Singapore", protocol: "UDP", severity: "high" },
  { lat: -33.8688, lng: 151.2093, type: "Credential Stuffing", country: "Australia", protocol: "HTTP", severity: "medium" },
  { lat: 40.7128, lng: -74.006, type: "Zero-Day Exploit", country: "USA", protocol: "HTTPS", severity: "critical" },
  { lat: 48.8566, lng: 2.3522, type: "Botnet Activity", country: "France", protocol: "IRC", severity: "high" },
  { lat: -1.2921, lng: 36.8219, type: "Malware", country: "Kenya", protocol: "SMTP", severity: "low" },
  { lat: 19.4326, lng: -99.1332, type: "Brute Force", country: "Mexico", protocol: "FTP", severity: "medium" },
  { lat: 25.2048, lng: 55.2708, type: "DDoS Attack", country: "UAE", protocol: "DNS", severity: "high" },
];

const CustomCyberMap = () => {
  const { darkMode } = useTheme();
  const [activeAttacks, setActiveAttacks] = useState<number[]>([]);
  const [attackCount, setAttackCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Simulate live attack activity
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      // Randomly select 3-5 attacks to pulse
      const numActive = Math.floor(Math.random() * 3) + 3;
      const active: number[] = [];
      for (let i = 0; i < numActive; i++) {
        active.push(Math.floor(Math.random() * attackData.length));
      }
      setActiveAttacks(active);
      setAttackCount(prev => prev + numActive);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Get color based on severity
  const getSeverityColor = (severity: string, isActive: boolean) => {
    const colors = {
      critical: isActive ? "#ef4444" : "#dc2626",
      high: isActive ? "#f59e0b" : "#d97706",
      medium: isActive ? "#eab308" : "#ca8a04",
      low: isActive ? "#22c55e" : "#16a34a",
    };
    return colors[severity as keyof typeof colors] || colors.medium;
  };

  if (!mounted) {
    return (
      <div className="w-full h-full min-h-[450px] rounded-xl bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[450px]">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "12px",
          zIndex: 1,
        }}
        className="cyber-map"
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {attackData.map((attack, index) => {
          const isActive = activeAttacks.includes(index);
          return (
            <CircleMarker
              key={index}
              center={[attack.lat, attack.lng]}
              radius={isActive ? 12 : 8}
              pathOptions={{
                color: getSeverityColor(attack.severity, isActive),
                fillColor: getSeverityColor(attack.severity, isActive),
                fillOpacity: isActive ? 0.8 : 0.6,
                weight: isActive ? 3 : 2,
              }}
              className={isActive ? "pulse-marker" : ""}
            >
              <Popup>
                <div className="text-gray-900 p-1">
                  <div className="font-bold text-sm">{attack.type}</div>
                  <div className="text-xs mt-1">
                    <div>📍 {attack.country}</div>
                    <div>🔗 Protocol: {attack.protocol}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getSeverityColor(attack.severity, false),
                        }}
                      ></span>
                      <span className="capitalize">{attack.severity}</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Attack Statistics Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-4 py-3 text-white border border-cyan-500/30">
        <div className="text-xs font-mono">
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-semibold">LIVE THREAT MONITOR</span>
          </div>
          <div className="text-cyan-300 mt-2">
            Active Threats: <span className="font-bold text-white">{attackData.length}</span>
          </div>
          <div className="text-cyan-300">
            Events Detected: <span className="font-bold text-white">{attackCount}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-4 py-3 text-white border border-cyan-500/30">
        <div className="text-xs font-mono">
          <div className="font-semibold mb-2 text-cyan-400">Severity Levels</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
              <span>High</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 text-white border border-cyan-500/30 max-w-md">
        <div className="text-[10px] font-mono text-cyan-300">
          ⚠️ Simulated global cyber attack activity based on public threat intelligence feeds
        </div>
      </div>
    </div>
  );
};

export default CustomCyberMap;
