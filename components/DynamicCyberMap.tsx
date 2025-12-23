"use client";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    mapboxgl: {
      accessToken: string;
      [key: string]: unknown;
    };
    deck: {
      DeckGL: new (config: Record<string, unknown>) => {
        setProps: (props: Record<string, unknown>) => void;
        finalize: () => void;
      };
      TripsLayer: new (config: Record<string, unknown>) => unknown;
    };
  }
}

interface Attack {
  path: number[][];
  timestamps: number[];
  severity: number;
  intensity: number;
}

const DynamicCyberMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [attackCount, setAttackCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const deckglRef = useRef<{
    setProps: (props: Record<string, unknown>) => void;
    finalize: () => void;
  } | null>(null);
  const attacksRef = useRef<Attack[]>([]);
  const currentTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if scripts are already loaded
    if (window.mapboxgl && window.deck) {
      initializeMap();
      return;
    }

    // Load Mapbox GL JS
    const mapboxLink = document.createElement("link");
    mapboxLink.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
    mapboxLink.rel = "stylesheet";
    document.head.appendChild(mapboxLink);

    const mapboxScript = document.createElement("script");
    mapboxScript.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
    mapboxScript.async = true;

    // Load deck.gl
    const deckScript = document.createElement("script");
    deckScript.src = "https://unpkg.com/deck.gl@8.9.28/dist.min.js";
    deckScript.async = true;

    let scriptsLoaded = 0;
    const onScriptLoad = () => {
      scriptsLoaded++;
      if (scriptsLoaded === 2) {
        setTimeout(() => {
          if (window.mapboxgl && window.deck) {
            initializeMap();
          } else {
            setLoadError(true);
          }
        }, 500);
      }
    };

    const onScriptError = () => {
      setLoadError(true);
    };

    mapboxScript.onload = onScriptLoad;
    mapboxScript.onerror = onScriptError;
    deckScript.onload = onScriptLoad;
    deckScript.onerror = onScriptError;

    document.head.appendChild(mapboxScript);
    document.head.appendChild(deckScript);

    function randomCoord() {
      return [
        -180 + Math.random() * 360,
        -60 + Math.random() * 120
      ];
    }

    function spawnAttack(): Attack {
      const src = randomCoord();
      const dst = randomCoord();
      const severity = Math.random() * 10;

      return {
        path: [src, dst],
        timestamps: [0, 200],
        severity,
        intensity: 1
      };
    }

    function initializeMap() {
      if (!window.mapboxgl || !window.deck) return;

      // Use a public Mapbox token (this is a common demo token, should be replaced with user's token)
      window.mapboxgl.accessToken = "pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg";

      const { DeckGL, TripsLayer } = window.deck;

      deckglRef.current = new DeckGL({
        container: mapContainerRef.current,
        mapboxApiAccessToken: window.mapboxgl.accessToken,
        mapStyle: "mapbox://styles/mapbox/dark-v11",
        initialViewState: {
          longitude: 0,
          latitude: 20,
          zoom: 1.4,
          pitch: 45,
          bearing: 0
        },
        controller: true
      });

      setIsLoaded(true);

      function render() {
        if (!deckglRef.current) return;

        deckglRef.current.setProps({
          layers: [
            new TripsLayer({
              id: "attacks",
              data: attacksRef.current,
              getPath: (d: Attack) => d.path,
              getTimestamps: (d: Attack) => d.timestamps,
              getColor: (d: Attack) =>
                d.severity > 7 ? [255, 60, 60] :
                d.severity > 4 ? [255, 170, 0] :
                [80, 200, 180],
              opacity: 0.9,
              widthMinPixels: 2,
              trailLength: 180,
              currentTime: currentTimeRef.current
            })
          ]
        });
      }

      function tick() {
        currentTimeRef.current += 1;

        // Spawn attacks randomly (NO FIXED INTERVAL)
        if (Math.random() > 0.7) {
          attacksRef.current.push(spawnAttack());
        }

        // Fade attacks (IMPORTANT)
        attacksRef.current.forEach((a: Attack) => a.intensity *= 0.98);
        attacksRef.current = attacksRef.current.filter((a: Attack) => a.intensity > 0.1);

        setAttackCount(attacksRef.current.length);

        render();
        animationFrameRef.current = requestAnimationFrame(tick);
      }

      tick();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (deckglRef.current) {
        deckglRef.current.finalize();
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[450px]">
      <div
        ref={mapContainerRef}
        className="w-full h-[450px] rounded-lg"
        style={{ position: "relative" }}
      />

      {/* HUD Overlay */}
      <div className="absolute top-5 left-5 z-10 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-cyan-500/50">
        <h3 className="text-cyan-400 text-sm font-bold mb-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          🔴 Live Threat Monitor
        </h3>
        <p className="text-cyan-300 text-xs font-mono">
          Active Attacks: <span className="text-white font-bold">{attackCount}</span>
        </p>
      </div>

      {/* Disclaimer */}
      <div className="absolute bottom-5 left-5 z-10 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-500/30 max-w-md">
        <p className="text-cyan-300 text-[10px] font-mono">
          ⚠️ This visualization represents simulated cyber attack activity enriched using public threat intelligence patterns. No real infrastructure is targeted.
        </p>
      </div>

      {/* Loading indicator */}
      {!isLoaded && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="text-cyan-400 text-sm font-mono">Initializing Threat Map...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-lg z-20">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="text-red-400 text-4xl">⚠️</div>
            <p className="text-cyan-400 text-sm font-mono">Unable to load threat map visualization</p>
            <p className="text-gray-400 text-xs font-mono max-w-md">
              This map requires external resources. Please ensure you have an active internet connection and refresh the page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicCyberMap;
