import React, { useState, useEffect, memo } from "react";
import { motion, useTransform } from "framer-motion";
import { useMousePosition } from "./hooks";
import { BREAKPOINTS } from "./constants";

export const CursorFollower = memo(({ reducedMotion }: { reducedMotion: boolean }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const { x, y, springX, springY } = useMousePosition();

  // Define all hooks at the top level to follow the Rules of Hooks
  const ringX = useTransform(springX, val => val - 22);
  const ringY = useTransform(springY, val => val - 22);
  
  const labelX = useTransform(springX, v => v + 35);
  const labelY = useTransform(springY, v => v - 25);
  
  const xCoord = useTransform(x, v => Math.round(v));
  const yCoord = useTransform(y, v => Math.round(v));
  
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= BREAKPOINTS.tablet);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop || reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
      {/* Magnetic Outer Ring */}
      <motion.div
        className="absolute w-11 h-11 rounded-full border border-primary/40 
                  mix-blend-difference flex items-center justify-center"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-primary rounded-full" 
          animate={{ scale: [1, 2.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Coordinate Label */}
      <motion.div
        className="absolute font-mono text-[9px] text-muted-foreground/60 whitespace-nowrap 
                  tracking-tighter uppercase"
        style={{ x: labelX, y: labelY }}
      >
        <span className="opacity-40">POS_</span>
        <motion.span className="text-foreground/40">{xCoord}</motion.span>
        <span className="mx-1 opacity-20">/</span>
        <motion.span className="text-foreground/40">{yCoord}</motion.span>
      </motion.div>
    </div>
  );
});
CursorFollower.displayName = "CursorFollower";
