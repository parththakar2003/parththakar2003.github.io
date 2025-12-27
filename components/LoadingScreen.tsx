"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Animation timing constants
const PROGRESS_UPDATE_INTERVAL = 200;
const PROGRESS_INCREMENT_MAX = 15;
const LINE_UPDATE_INTERVAL = 300;
const GLITCH_START_DELAY = 2000;
const GLITCH_DURATION = 800;
const INSTALL_COMPLETE_DELAY = 3000;
const HIDE_SCREEN_DELAY = 4500;

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
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [installComplete, setInstallComplete] = useState(false);

  useEffect(() => {
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
      setTimeout(() => setShowGlitch(false), GLITCH_DURATION);
    }, GLITCH_START_DELAY);

    // Show install complete message
    const completeTimeout = setTimeout(() => {
      setInstallComplete(true);
    }, INSTALL_COMPLETE_DELAY);

    // Hide loading screen
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, HIDE_SCREEN_DELAY);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(glitchTimeout);
      clearTimeout(completeTimeout);
      clearTimeout(hideTimeout);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
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
              animate={{ y: [0, 600, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translateY(0); }
              100% { transform: translateY(50px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
