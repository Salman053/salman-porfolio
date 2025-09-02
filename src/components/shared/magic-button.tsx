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

const MagicButton = ({ 
  text = "Contact Me", 
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
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: particleId.current++,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
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
      className="relative px-5 py-2 rounded-2xl overflow-hidden border-0 outline-none cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        boxShadow: "0 10px 30px rgba(118, 75, 162, 0.5)",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 15px 40px rgba(118, 75, 162, 0.7)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-0 rounded-2xl"
        animate={{
          opacity: isHovered ? 0.1 : 0,
          background: "linear-gradient(45deg, #ff6b6b, #48dbfb, #feca57)",
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%", skewX: "-20deg" }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              initial={{ 
                opacity: 0,
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [`${particle.y}%`, `${particle.y - 50}%`],
                x: [
                  `${particle.x}%`,
                  `${particle.x + (Math.random() * 40 - 20)}%`
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
      
      {/* Button text with gradient */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.span
          className="text-white text-lg font-semibold tracking-wide"
          animate={{ 
            scale: isHovered ? 1.04 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {text}
        </motion.span>
        
        {/* Animated icon */}
        <motion.div
          animate={{ 
            x: isHovered ? 5 : 0,
            rotate: isHovered ? 45 : 0,
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
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: isHovered ? 0.2 : 0 }}
            />
          </svg>
        </motion.div>
      </div>
      
      {/* Border animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(45deg, #ff6b6b, #48dbfb, #feca57, #ff6b6b)",
          backgroundSize: "300% 300%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "2px",
        }}
        animate={{ 
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ 
          backgroundPosition: { duration: 1.5, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.3 },
        }}
      />
    </motion.button>
  );
};

export default MagicButton;