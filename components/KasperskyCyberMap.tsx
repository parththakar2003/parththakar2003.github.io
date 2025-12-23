"use client"
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaShieldAlt, FaGlobe } from "react-icons/fa";

const KasperskyCyberMap = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if iframe failed to load after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Give iframe 5 seconds to load

    return () => clearTimeout(timer);
  }, []);

  // Fallback component when iframe fails or is blocked
  const CyberMapFallback = () => (
    <div className="w-full h-full min-h-[450px] rounded-xl bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <FaGlobe className="text-6xl text-cyan-400 animate-pulse" />
            <FaShieldAlt className="absolute -bottom-1 -right-1 text-2xl text-blue-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-semibold">
          Global Cyber Threat Map
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed">
          Live global cyber attack visualization by Kaspersky. 
          View real-time threat intelligence and attack patterns worldwide.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
            <span>Real-time Data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>Global Coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>Attack Vectors</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            <span>Threat Intelligence</span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://cybermap.kaspersky.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/50 font-medium"
        >
          <span>View Live Cyber Map</span>
          <FaArrowRight className="text-sm" />
        </a>

        {/* Additional info */}
        <p className="text-xs text-slate-500">
          Opens in new tab • Powered by Kaspersky Security Network
        </p>
      </div>
    </div>
  );

  if (error) {
    return <CyberMapFallback />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "50%",
        minHeight: "450px",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 rounded-xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm">Loading cyber threat map...</p>
          </div>
        </div>
      )}
      <iframe
        src="https://cybermap.kaspersky.com/en/widget/dynamic/dark"
        title="Kaspersky Global Cyber Threat Map"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        onError={() => setError(true)}
        onLoad={() => setIsLoading(false)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

export default KasperskyCyberMap;
