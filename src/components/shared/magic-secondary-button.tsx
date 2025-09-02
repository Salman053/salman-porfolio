"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const MagicSecondaryButton = ({ 
  text = "My Work", 
  onClick = () => {} 
}: { 
  text?: string; 
  onClick?: () => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleId = useRef(0);

  useEffect(() => {
    if (isHovered) {
      // Create particles on hover
      const newParticles: Particle[] = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: particleId.current++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 1 + 0.5,
          delay: Math.random() * 0.3,
        });
      }
      setParticles(newParticles);
    } else {
      // Clear particles when not hovered
      const timeout = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timeout);
    }
  }, [isHovered]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative px-5 py-3 rounded-2xl overflow-hidden border-0 outline-none cursor-pointer bg-transparent"
      style={{
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        transform: "translateZ(0)",
        willChange: "transform",
        border: "2px solid transparent",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-secondary"
        style={{
        //    background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
          backgroundSize: "300% 300%",
          
          margin: "-2px",
          opacity: isHovered ? 1 : 0,
        }}
        animate={{ 
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{ 
          backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.3 },
        }}
      />
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
              }}
              initial={{ 
                opacity: 0,
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [`${particle.y}%`, `${particle.y - 40}%`],
                x: [
                  `${particle.x}%`,
                  `${particle.x + (Math.random() * 30 - 15)}%`
                ],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.span
          className="text-lg font-semibold tracking-wide bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
          animate={{ 
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {text}
        </motion.span>
        
        {/* Animated icon */}
        <motion.div
          animate={{ 
            x: isHovered ? 5 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="ml-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M10 20L14 4M14 4L18 8M14 4L6 12"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: isHovered ? 0.2 : 0 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      
      {/* Ripple effect on click */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-10"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MagicSecondaryButton;