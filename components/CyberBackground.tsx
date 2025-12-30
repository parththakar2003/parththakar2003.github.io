"use client"
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function CyberBackground() {
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [activeTerminal, setActiveTerminal] = useState(0);

  // Generate particles for background
  const particles = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
  }, []);

  // Generate hexagons
  const hexagons = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 3,
    }));
  }, []);

  // Generate circuit nodes
  const circuitNodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, []);

  // Generate floating GUI windows
  const guiWindows = useMemo(() => [
    { 
      id: 1, 
      x: 15, 
      y: 20, 
      width: 220, 
      title: 'system.log',
      lines: ['[OK] Service started', '[INFO] Port 443 open', '[WARN] High CPU usage']
    },
    { 
      id: 2, 
      x: 70, 
      y: 15, 
      width: 200, 
      title: 'network.monitor',
      lines: ['192.168.1.1 → ACTIVE', 'Latency: 12ms', 'Throughput: 98.2%']
    },
    { 
      id: 3, 
      x: 20, 
      y: 65, 
      width: 180, 
      title: 'security.scan',
      lines: ['Scanning...', 'Threats: 0', 'Last scan: 00:42']
    },
  ], []);

  // Terminal commands that cycle
  const terminalCommands = useMemo(() => [
    'nmap -sV 192.168.1.0/24',
    'wireshark -i eth0',
    'sudo tcpdump -i any',
    'netstat -tuln | grep LISTEN',
  ], []);

  // Data stream bars configuration (memoized to avoid re-calculating random values)
  const dataStreamBars = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      maxHeight: Math.random() * 40 + 20,
      duration: Math.random() * 1.5 + 1,
    }))
  , []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle terminal commands every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTerminal((prev) => (prev + 1) % terminalCommands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [terminalCommands.length]);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ 
      x: (e.clientX / window.innerWidth) * 100, 
      y: (e.clientY / window.innerHeight) * 100 
    });
    setIsInteracting(true);
    
    // Reset interaction state after no movement
    const timeout = setTimeout(() => setIsInteracting(false), 150);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, mounted]);

  if (!mounted || !darkMode) return null; // Only show in dark mode after mounting

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hexagon shapes */}
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
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: hex.duration,
            repeat: Infinity,
            delay: hex.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Interactive glow that follows mouse */}
      {isInteracting && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Circuit lines connecting nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0)" />
            <stop offset="50%" stopColor="rgba(6, 182, 212, 0.8)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>
        {circuitNodes.map((node, i) => {
          if (i === circuitNodes.length - 1) return null;
          const nextNode = circuitNodes[i + 1];
          return (
            <motion.line
              key={i}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="url(#circuitGradient)"
              strokeWidth="1"
              animate={{
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
        
        {/* Circuit nodes as dots */}
        {circuitNodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2"
            fill="rgba(6, 182, 212, 0.6)"
            opacity="0.7"
          />
        ))}
      </svg>

      {/* Binary code rain effect (subtle) */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 font-mono text-xs"
            style={{
              left: `${(i * 8.33) % 100}%`,
              top: '-5%',
            }}
            animate={{
              y: ['0vh', '110vh'],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j} className="my-1">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Interactive GUI Windows */}
      <AnimatePresence>
        {guiWindows.map((window, idx) => (
          <motion.div
            key={window.id}
            className="absolute backdrop-blur-sm bg-black/30 border border-cyan-500/40 rounded-lg overflow-hidden shadow-lg shadow-cyan-500/20"
            style={{
              left: `${window.x}%`,
              top: `${window.y}%`,
              width: `${window.width}px`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: [0.6, 0.8, 0.6], 
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{
              opacity: { duration: 3, repeat: Infinity, delay: idx * 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }
            }}
          >
            {/* Window Header */}
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 px-2 py-1 flex items-center justify-between border-b border-cyan-500/30">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
              </div>
              <span className="text-[10px] text-cyan-300/80 font-mono">{window.title}</span>
            </div>
            {/* Window Content */}
            <div className="p-2 space-y-1">
              {window.lines.map((line, i) => (
                <motion.div
                  key={i}
                  className="text-[10px] font-mono text-green-400/70"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + idx * 0.3 }}
                >
                  <span className="text-cyan-400/60">{'>'}</span> {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Terminal Command Display */}
      <motion.div
        className="absolute top-[40%] left-[50%] transform -translate-x-1/2 backdrop-blur-md bg-black/40 border border-cyan-500/30 rounded-lg px-4 py-2 shadow-xl shadow-cyan-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs font-mono text-cyan-300/80">
            $ {terminalCommands[activeTerminal]}
          </span>
        </div>
      </motion.div>

      {/* System Stats Panel */}
      <motion.div
        className="absolute top-[10%] right-[8%] backdrop-blur-sm bg-black/30 border border-cyan-500/40 rounded-lg p-3 w-48 shadow-lg shadow-cyan-500/20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-[10px] font-mono text-cyan-300/80 space-y-1.5">
          <div className="flex justify-between border-b border-cyan-500/20 pb-1">
            <span>SYSTEM STATUS</span>
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">CPU:</span>
            <span className="text-cyan-400">{Math.floor(Math.random() * 30 + 20)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">RAM:</span>
            <span className="text-cyan-400">{Math.floor(Math.random() * 40 + 40)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">NET:</span>
            <span className="text-green-400">↑{Math.floor(Math.random() * 50 + 10)}KB/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">TIME:</span>
            <span className="text-cyan-400">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </motion.div>

      {/* Data Stream Visualization */}
      <div className="absolute bottom-[15%] left-[10%] flex gap-1 opacity-40">
        {dataStreamBars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-1 bg-gradient-to-t from-cyan-500 to-transparent rounded-full"
            animate={{
              height: [10, bar.maxHeight, 10],
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              delay: bar.id * 0.1,
            }}
          />
        ))}
      </div>

      {/* Glitch Effect Overlay (occasional) */}
      <motion.div
        className="absolute inset-0 bg-cyan-500/5 pointer-events-none mix-blend-screen"
        animate={{
          opacity: [0, 0, 0, 0.3, 0, 0, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          times: [0, 0.3, 0.35, 0.4, 0.45, 0.5, 1],
        }}
      />

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{
          y: ['0%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        animate={{
          y: ['100%', '0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-500/30 opacity-60" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-cyan-500/30 opacity-60" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30 opacity-60" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-500/30 opacity-60" />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(60px) translateX(60px); }
        }
      `}</style>
    </div>
  );
}
