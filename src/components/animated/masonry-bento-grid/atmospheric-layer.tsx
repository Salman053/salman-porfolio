import React, { memo, useMemo, useState, useEffect } from "react";
import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { useMousePosition, usePrefersReducedMotion } from "./hooks";

export const AtmosphereLayer = memo(() => {
  const { springX, springY } = useMousePosition();
  const reducedMotion = usePrefersReducedMotion();
  
  // Grid parallax
  const gridX = useTransform(springX, val => val * 0.03);
  const gridY = useTransform(springY, val => val * 0.03);
  
  // Animated gradient orbs
  const orb1X = useTransform(springX, val => 50 + val * 0.02);
  const orb1Y = useTransform(springY, val => 30 + val * 0.02);
  const orb2X = useTransform(springX, val => 70 - val * 0.015);
  const orb2Y = useTransform(springY, val => 80 - val * 0.015);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dynamic Blueprint Grid */}
      <motion.div 
        className="absolute inset-[-20%] opacity-[0.03] dark:opacity-[0.05]"
        style={{ 
          x: reducedMotion ? 0 : gridX, 
          y: reducedMotion ? 0 : gridY,
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Ambient Light Orbs */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 dark:opacity-20"
        style={{ 
          x: reducedMotion ? "10%" : orb1X, 
          y: reducedMotion ? "20%" : orb1Y,
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        }}
        animate={reducedMotion ? {} : { 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 dark:opacity-15"
        style={{ 
          x: reducedMotion ? "60%" : orb2X, 
          y: reducedMotion ? "70%" : orb2Y,
          background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)"
        }}
        animate={reducedMotion ? {} : { 
          scale: [1.05, 1, 1.05],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Particles (Respect reduced motion) */}
      {!reducedMotion && (
        <ParticleField count={8} />
      )}
    </div>
  );
});

export const ParticleField = memo(({ count = 8 }: { count?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(() => 
    [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 1,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.2 + 0.1
    })), [count]
  );

  if (!mounted) return null;

  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-current opacity-[0.2] dark:opacity-[0.4]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size+"px",
            height: p.size+"px",
          }}
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: p.delay
          }}
        />
      ))}
    </>
  );
});
ParticleField.displayName = "ParticleField";

export const LightSpill = memo(({ 
  isHovered, 
  mouseX, 
  mouseY,
  reducedMotion 
}: { 
  isHovered: boolean; 
  mouseX: any; 
  mouseY: any;
  reducedMotion: boolean;
}) => {
  const background = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}px ${mouseY}px, 
      rgba(var(--primary-rgb), ${isHovered ? 0.12 : 0}), 
      transparent 70%
    )
  `;
  
  return (
    <motion.div
      className="absolute inset-[-150px] pointer-events-none z-0"
      style={{ background }}
      animate={{ 
        opacity: reducedMotion ? (isHovered ? 0.3 : 0) : (isHovered ? 1 : 0) 
      }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
    />
  );
});
LightSpill.displayName = "LightSpill";
