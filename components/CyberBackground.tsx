"use client"
import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function CyberBackground() {
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [mounted, setMounted] = useState(false);

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
      {/* Animated grid background with red theme */}
      <div className="absolute inset-0 opacity-[0.12] red-grid-bg">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 0, 0, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 0, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 30s linear infinite'
        }} />
      </div>

      {/* Floating particles with red glow */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0.3,
            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.8), rgba(139, 0, 0, 0.4))',
            boxShadow: '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.3)'
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

      {/* Hexagon shapes with red theme */}
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          className="absolute border-2 border-red-500/40 red-neon-border"
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

      {/* Interactive red glow that follows mouse */}
      {isInteracting && (
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none red-shadow-pulse"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.35) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Circuit lines connecting nodes with red theme */}
      <svg className="absolute inset-0 w-full h-full opacity-25">
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 0, 0, 0)" />
            <stop offset="50%" stopColor="rgba(255, 0, 0, 0.9)" />
            <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
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
        
        {/* Circuit nodes as red pulsing dots */}
        {circuitNodes.map((node) => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="3"
            fill="rgba(255, 0, 0, 0.8)"
            opacity="0.9"
            className="red-breathing"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.8))'
            }}
          />
        ))}
      </svg>

      {/* Red binary code rain effect */}
      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500 font-mono text-xs red-glow-text"
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

      {/* Red scanning lines */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent red-scan-container"
        style={{
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.4)'
        }}
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
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
        style={{
          boxShadow: '0 0 8px rgba(255, 0, 0, 0.6)'
        }}
        animate={{
          y: ['100%', '0%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Red corner decorations with glow */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-500/50 opacity-70 red-corner-accents" 
        style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }} />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-500/50 opacity-70" 
        style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-500/50 opacity-70" 
        style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-500/50 opacity-70" 
        style={{ boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)' }} />

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(60px) translateX(60px); }
        }
      `}</style>
    </div>
  );
}
