"use client"
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { darkMode } = useTheme();
  const darkModeRef = useRef(darkMode);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 75;
    const MAX_DIST = 140;
    const REPEL_RADIUS = 110;
    const REPEL_FORCE = 0.6;
    const MAX_SPEED = 1.8;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialise particles on resize
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.35 + 0.15,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = darkModeRef.current;
      // Particle/line color: cyan in dark, teal in light
      const pr = isDark ? 6 : 14;
      const pg = isDark ? 182 : 165;
      const pb = isDark ? 212 : 233;

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update particles
      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const repelSq = REPEL_RADIUS * REPEL_RADIUS;

        if (distSq < repelSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        else if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        else if (p.y > canvas.height) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / MAX_DIST) * (isDark ? 0.25 : 0.15);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${pr},${pg},${pb},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const glowAlpha = p.opacity * (isDark ? 1 : 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${glowAlpha})`;
        ctx.fill();

        // Soft glow
        if (isDark) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.opacity * 0.04})`;
          ctx.fill();
        }
      }

      // Mouse glow
      if (mx > -1000) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        gradient.addColorStop(0, `rgba(${pr},${pg},${pb},${isDark ? 0.12 : 0.06})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - 180, my - 180, 360, 360);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Canvas particle network */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: darkMode ? 1 : 0.5 }}
      />

      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: darkMode
            ? `linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px),
               linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner brackets */}
      {darkMode && (
        <>
          <div className="fixed top-0 left-0 w-20 h-20 border-t border-l border-cyan-500/20 pointer-events-none" style={{ zIndex: 0 }} />
          <div className="fixed top-0 right-0 w-20 h-20 border-t border-r border-cyan-500/20 pointer-events-none" style={{ zIndex: 0 }} />
          <div className="fixed bottom-0 left-0 w-20 h-20 border-b border-l border-cyan-500/20 pointer-events-none" style={{ zIndex: 0 }} />
          <div className="fixed bottom-0 right-0 w-20 h-20 border-b border-r border-cyan-500/20 pointer-events-none" style={{ zIndex: 0 }} />
        </>
      )}
    </>
  );
}
