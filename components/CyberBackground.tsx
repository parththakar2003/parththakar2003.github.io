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
  const [logEntries, setLogEntries] = useState<string[]>([]);
  const [networkPackets, setNetworkPackets] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [exploitChain, setExploitChain] = useState(0);
  const [lastLogIndex, setLastLogIndex] = useState(-1);
  const [packetCounter, setPacketCounter] = useState(0);

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

  // Live log messages for scrolling effect
  const logMessages = useMemo(() => [
    '[ALERT] Unauthorized access attempt detected',
    '[INFO] Firewall rule updated successfully',
    '[WARN] Unusual outbound traffic on port 8080',
    '[OK] IDS signature database updated',
    '[INFO] SSL certificate expires in 30 days',
    '[CRIT] Multiple failed login attempts from 192.168.1.105',
    '[OK] Backup completed successfully',
    '[INFO] New device connected to network',
    '[WARN] High memory usage detected',
    '[OK] Vulnerability scan completed',
    '[ALERT] Potential SQL injection attempt blocked',
    '[INFO] Service restart scheduled',
  ], []);

  // Exploit chain steps
  const exploitSteps = useMemo(() => [
    'Reconnaissance',
    'Scanning',
    'Exploitation',
    'Post-Exploitation',
    'Covering Tracks',
  ], []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle terminal commands every 3 seconds with typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTerminal((prev) => (prev + 1) % terminalCommands.length);
      setTypingText('');
    }, 4000);
    return () => clearInterval(interval);
  }, [terminalCommands.length]);

  // Typing animation for terminal
  useEffect(() => {
    const command = terminalCommands[activeTerminal];
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex < command.length) {
        setTypingText(command.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [activeTerminal, terminalCommands]);

  // Add new log entries every 2 seconds (avoid consecutive duplicates)
  useEffect(() => {
    const interval = setInterval(() => {
      setLogEntries(prev => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * logMessages.length);
        } while (newIndex === lastLogIndex && logMessages.length > 1);
        
        setLastLogIndex(newIndex);
        const newEntry = logMessages[newIndex];
        return [...prev.slice(-4), newEntry];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [logMessages, lastLogIndex]);

  // Generate network packets with unique IDs
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCounter(prev => prev + 1);
      const newPacket = {
        id: packetCounter,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      };
      setNetworkPackets(prev => [...prev.slice(-8), newPacket]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Update scan progress
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev + 1) % 101);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Cycle exploit chain
  useEffect(() => {
    const interval = setInterval(() => {
      setExploitChain(prev => (prev + 1) % exploitSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [exploitSteps.length]);

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
            linear-gradient(rgba(239, 68, 68, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }} />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500"
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
          className="absolute border border-red-500/30"
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
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)',
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
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
            <stop offset="50%" stopColor="rgba(239, 68, 68, 0.8)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
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
            fill="rgba(239, 68, 68, 0.6)"
            opacity="0.7"
          />
        ))}
      </svg>

      {/* Binary code rain effect (subtle) */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500 font-mono text-xs"
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

      {/* Live Scrolling Log Window */}
      <motion.div
        className="absolute backdrop-blur-sm bg-black/40 border border-red-500/40 rounded-lg overflow-hidden shadow-lg shadow-red-500/20"
        style={{
          left: '15%',
          top: '20%',
          width: '240px',
          height: '120px',
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7], 
          scale: 1,
          y: [0, -5, 0]
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Window Header */}
        <div className="bg-gradient-to-r from-red-900/50 to-rose-900/50 px-2 py-1 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
          </div>
          <span className="text-[10px] text-red-300/80 font-mono">system.log</span>
        </div>
        {/* Scrolling Log Content */}
        <div className="p-2 h-[88px] overflow-hidden">
          <AnimatePresence initial={false}>
            {logEntries.slice(-5).map((entry, i) => (
              <motion.div
                key={`${entry}-${i}`}
                className="text-[9px] font-mono text-green-400/70 whitespace-nowrap overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-red-400/60">{'>'}</span> {entry}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Live Network Monitor with Scan Progress */}
      <motion.div
        className="absolute backdrop-blur-sm bg-black/40 border border-red-500/40 rounded-lg overflow-hidden shadow-lg shadow-red-500/20"
        style={{
          left: '70%',
          top: '15%',
          width: '220px',
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7], 
          scale: 1,
          y: [0, -3, 0]
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
        }}
      >
        {/* Window Header */}
        <div className="bg-gradient-to-r from-red-900/50 to-rose-900/50 px-2 py-1 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/70 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
          </div>
          <span className="text-[10px] text-red-300/80 font-mono">vuln.scan</span>
        </div>
        {/* Scan Progress */}
        <div className="p-2 space-y-2">
          <div className="text-[10px] font-mono text-green-400/70">
            <span className="text-red-400/60">{'>'}</span> Scanning targets...
          </div>
          <div className="w-full bg-red-900/20 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-orange-500"
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="text-[10px] font-mono text-red-400/80">
            {scanProgress}% complete
          </div>
          <div className="text-[9px] font-mono text-green-400/60">
            Found: {Math.floor(scanProgress / 10)} vulnerabilities
          </div>
        </div>
      </motion.div>

      {/* Exploit Chain Visualizer */}
      <motion.div
        className="absolute backdrop-blur-sm bg-black/40 border border-red-500/40 rounded-lg overflow-hidden shadow-lg shadow-red-500/20"
        style={{
          left: '20%',
          top: '65%',
          width: '200px',
        }}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: [0.7, 0.9, 0.7], 
          scale: 1,
          y: [0, -4, 0]
        }}
        transition={{
          opacity: { duration: 3, repeat: Infinity, delay: 1 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
        }}
      >
        {/* Window Header */}
        <div className="bg-gradient-to-r from-red-900/50 to-rose-900/50 px-2 py-1 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/70 animate-pulse"></div>
          </div>
          <span className="text-[10px] text-red-300/80 font-mono">exploit.chain</span>
        </div>
        {/* Exploit Steps */}
        <div className="p-2 space-y-1">
          {exploitSteps.map((step, i) => (
            <motion.div
              key={i}
              className={`text-[10px] font-mono flex items-center gap-2 ${
                i === exploitChain ? 'text-red-400' : i < exploitChain ? 'text-green-400/70' : 'text-gray-500/50'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${
                i === exploitChain ? 'bg-red-500 animate-pulse' : i < exploitChain ? 'bg-green-500' : 'bg-gray-600'
              }`} />
              {step}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Network Packet Visualization */}
      <AnimatePresence>
        {networkPackets.map((packet) => (
          <motion.div
            key={packet.id}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: `${packet.x}%`,
              top: `${packet.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
      </AnimatePresence>

      {/* Floating Terminal with Typing Effect */}
      <motion.div
        className="absolute top-[40%] left-[50%] transform -translate-x-1/2 backdrop-blur-md bg-black/50 border border-red-500/40 rounded-lg px-4 py-2 shadow-xl shadow-red-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-xs font-mono text-red-300/90">
            $ {typingText}
            <span className="animate-pulse">|</span>
          </span>
        </div>
      </motion.div>

      {/* System Stats Panel */}
      <motion.div
        className="absolute top-[10%] right-[8%] backdrop-blur-sm bg-black/30 border border-red-500/40 rounded-lg p-3 w-48 shadow-lg shadow-red-500/20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="text-[10px] font-mono text-red-300/80 space-y-1.5">
          <div className="flex justify-between border-b border-red-500/20 pb-1">
            <span>SYSTEM STATUS</span>
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">CPU:</span>
            <span className="text-red-400">{Math.floor(Math.random() * 30 + 20)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">RAM:</span>
            <span className="text-red-400">{Math.floor(Math.random() * 40 + 40)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">NET:</span>
            <span className="text-green-400">↑{Math.floor(Math.random() * 50 + 10)}KB/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">TIME:</span>
            <span className="text-red-400">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>
        </div>
      </motion.div>

      {/* Data Stream Visualization */}
      <div className="absolute bottom-[15%] left-[10%] flex gap-1 opacity-40">
        {dataStreamBars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-1 bg-gradient-to-t from-red-500 to-transparent rounded-full"
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
        className="absolute inset-0 bg-red-500/5 pointer-events-none mix-blend-screen"
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
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"
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
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
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
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-500/30 opacity-60" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-500/30 opacity-60" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-500/30 opacity-60" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-500/30 opacity-60" />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(60px) translateX(60px); }
        }
      `}</style>
    </div>
  );
}
