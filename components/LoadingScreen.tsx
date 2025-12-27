"use client"
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation timing constants
const PROGRESS_UPDATE_INTERVAL = 200;
const PROGRESS_INCREMENT_MAX = 15;
const LINE_UPDATE_INTERVAL = 300;
const GLITCH_START_DELAY = 2000;
const GLITCH_DURATION = 800;
const INSTALL_COMPLETE_DELAY = 3000;
const HIDE_SCREEN_DELAY = 4500;
const Z_INDEX_OVERLAY = 9999;
const SCANNING_LINE_HEIGHT = 600;
const GRID_TRANSLATE_Y = 50;

const installLines = [
  '> Initializing Security System...',
  '> Loading Defense Modules...',
  '> Establishing Encrypted Connection...',
  '> Scanning for Vulnerabilities...',
  '> Deploying Firewall Protocols...',
  '> Activating Intrusion Detection...',
  '> Verifying Digital Signatures...',
  '> Mounting Security Framework...',
];

export default function LoadingScreen() {
  // Check if loading screen has been shown in this session
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const hasShown = sessionStorage.getItem('loadingScreenShown');
      return !hasShown;
    }
    return true;
  });
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [installComplete, setInstallComplete] = useState(false);

  // Generate random particles for cyber background
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  // Generate hexagons for cyber background
  const hexagons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      size: Math.random() * 40 + 30,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    // Skip all animations if loading screen shouldn't be shown
    if (!isVisible) {
      document.body.style.overflow = 'unset';
      return;
    }

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * PROGRESS_INCREMENT_MAX;
      });
    }, PROGRESS_UPDATE_INTERVAL);

    // Terminal line animation
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= installLines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, LINE_UPDATE_INTERVAL);

    // Trigger glitch effect
    const glitchTimeout = setTimeout(() => {
      setShowGlitch(true);
    }, GLITCH_START_DELAY);

    // End glitch effect
    const glitchEndTimeout = setTimeout(() => {
      setShowGlitch(false);
    }, GLITCH_START_DELAY + GLITCH_DURATION);

    // Show install complete message
    const completeTimeout = setTimeout(() => {
      setInstallComplete(true);
    }, INSTALL_COMPLETE_DELAY);

    // Hide loading screen and mark as shown in session
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('loadingScreenShown', 'true');
      }
    }, HIDE_SCREEN_DELAY);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(glitchTimeout);
      clearTimeout(glitchEndTimeout);
      clearTimeout(completeTimeout);
      clearTimeout(hideTimeout);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ zIndex: Z_INDEX_OVERLAY }}
          className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-cyan-400"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Hexagon shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {hexagons.map((hex) => (
              <motion.div
                key={hex.id}
                className="absolute border border-cyan-500/30"
                style={{
                  left: `${hex.x}%`,
                  top: `${hex.y}%`,
                  width: `${hex.size}px`,
                  height: `${hex.size}px`,
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: hex.duration,
                  repeat: Infinity,
                  delay: hex.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Binary rain effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-400 font-mono text-xs"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: '-20px',
                }}
                animate={{
                  y: ['0vh', '120vh'],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              >
                {Array.from({ length: 10 }).map((_, j) => (
                  <div key={j}>
                    {Math.random() > 0.5 ? '1' : '0'}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Circuit lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
                <stop offset="50%" stopColor="rgba(6, 182, 212, 0.6)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
            </defs>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.line
                key={i}
                x1={`${Math.random() * 100}%`}
                y1={`${Math.random() * 100}%`}
                x2={`${Math.random() * 100}%`}
                y2={`${Math.random() * 100}%`}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </svg>

          {/* Glitch overlay */}
          {showGlitch && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-red-500 mix-blend-screen"
                style={{ clipPath: 'inset(20% 0 60% 0)' }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute inset-0 bg-cyan-500 mix-blend-screen"
                style={{ clipPath: 'inset(40% 0 40% 0)' }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 bg-green-500 mix-blend-screen"
                style={{ clipPath: 'inset(60% 0 20% 0)' }}
              />
            </div>
          )}

          {/* Main content */}
          <div className="relative z-10 w-full max-w-2xl px-6">
            {/* Terminal window */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: showGlitch ? [1, 1.02, 0.98, 1] : 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-cyan-500/30 shadow-2xl overflow-hidden"
            >
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-cyan-400 text-sm font-mono">
                  SYSTEM_INIT.exe
                </div>
                <div className="w-16" />
              </div>

              {/* Terminal body */}
              <div className="p-6 space-y-3">
                {/* System info */}
                <div className="text-green-400 font-mono text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">╔═══════════════════════════════════════╗</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="text-cyan-400">║</span>
                    <span className="text-white">CYBERSECURITY SYSTEM v2.0</span>
                    <span className="text-cyan-400 ml-auto">║</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">╚═══════════════════════════════════════╝</span>
                  </div>
                </div>

                {/* Installation lines */}
                <div className="space-y-2 min-h-[200px]">
                  {installLines.slice(0, currentLine + 1).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: showGlitch && i === currentLine ? [1, 0, 1, 0, 1] : 1, 
                        x: showGlitch && i === currentLine ? [0, -5, 5, -5, 0] : 0 
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-green-400 font-mono text-sm flex items-center gap-2"
                    >
                      <span className="text-cyan-400">▸</span>
                      <span className={showGlitch && i === currentLine ? 'text-red-400' : ''}>
                        {line}
                      </span>
                      {i === currentLine && !installComplete && (
                        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
                      )}
                      {i < currentLine && (
                        <span className="text-green-500 ml-2">✓</span>
                      )}
                    </motion.div>
                  ))}

                  {/* Glitch error messages */}
                  {showGlitch && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0, 1, 0] }}
                      className="text-red-500 font-mono text-sm space-y-1"
                    >
                      <div>⚠ WARNING: SECURITY BREACH DETECTED</div>
                      <div>⚠ SYSTEM INTEGRITY COMPROMISED</div>
                      <div>⚠ INITIATING COUNTERMEASURES...</div>
                    </motion.div>
                  )}

                  {/* Success message */}
                  {installComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 space-y-2"
                    >
                      <div className="text-green-400 font-mono text-sm flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-green-500 font-bold">SYSTEM SECURED</span>
                      </div>
                      <div className="text-cyan-400 font-mono text-sm">
                        → All security protocols active
                      </div>
                      <div className="text-cyan-400 font-mono text-sm">
                        → Launching portfolio...
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>Installation Progress</span>
                    <span>{Math.min(Math.round(progress), 100)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-500/30">
                    <motion.div
                      className={`h-full rounded-full ${
                        showGlitch 
                          ? 'bg-gradient-to-r from-red-500 to-yellow-500' 
                          : installComplete
                            ? 'bg-gradient-to-r from-green-500 to-cyan-500'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${Math.min(progress, 100)}%`,
                        opacity: showGlitch ? [1, 0.5, 1, 0.5, 1] : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Scanning line effect */}
            <motion.div
              className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
              animate={{ y: [0, SCANNING_LINE_HEIGHT, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translateY(0); }
              100% { transform: translateY(${GRID_TRANSLATE_Y}px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
