import React, { useRef, useCallback, useEffect, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING } from "./constants";

type MagneticButtonProps = Omit<React.ComponentPropsWithoutRef<typeof motion.button>, "ref"> & {
  children: React.ReactNode;
  reducedMotion: boolean;
};

export const MagneticButton = memo(({ 
  children, 
  onClick, 
  className = "",
  reducedMotion,
  ...props 
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const xSpring = useSpring(x, SPRING.magnetic);
  const ySpring = useSpring(y, SPRING.magnetic);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || reducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    // Falloff curve for natural feel
    if (distance < 120) {
      const strength = 0.25 * (1 - distance / 120);
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  }, [reducedMotion, x, y]);
  
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, reducedMotion]);
  
  return (
    <motion.button
      ref={ref}
      style={{ 
        x: reducedMotion ? 0 : xSpring, 
        y: reducedMotion ? 0 : ySpring 
      }}
      onClick={onClick}
      className={`relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full ${className}`}
      whileTap={reducedMotion ? {} : { scale: 0.96 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});
MagneticButton.displayName = "MagneticButton";
