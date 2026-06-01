"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const InteractiveBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Texture Layer: Premium Grain */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

      {/* Interactive Radial Bloom */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          x: springX,
          y: springY,
          left: -400,
          top: -400,
          background: "radial-gradient(circle, rgba(var(--primary), 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Ambient Drifting Blooms */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[120px] opacity-[0.05]"
            style={{
              width: 600 + i * 100,
              height: 600 + i * 100,
              background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 60, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
