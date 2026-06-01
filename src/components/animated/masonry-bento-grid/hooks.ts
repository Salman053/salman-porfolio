import { useState, useEffect, useCallback, useRef } from "react";
import { useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { SPRING } from "./constants";

export const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  
  return reduced;
};

export const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING.tight);
  const springY = useSpring(y, SPRING.tight);
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);
  
  return { x, y, springX, springY };
};

export const use3DTilt = (ref: React.RefObject<HTMLElement | null>) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);
  
  const springX = useSpring(rotateX, SPRING.tight);
  const springY = useSpring(rotateY, SPRING.tight);
  const springScale = useSpring(scale, SPRING.default);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Calculate rotation with bounds (max 8 degrees for subtlety)
    const maxRotation = 8;
    rotateX.set((y / (rect.height / 2)) * -maxRotation);
    rotateY.set((x / (rect.width / 2)) * maxRotation);
  }, [ref, rotateX, rotateY]);

  const handleMouseEnter = useCallback(() => {
    scale.set(1.02);
  }, [scale]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }, [rotateX, rotateY, scale]);

  return { 
    rotateX: springX, 
    rotateY: springY, 
    scale: springScale,
    handleMouseMove, 
    handleMouseEnter,
    handleMouseLeave 
  };
};

export const useImagePreload = (images: string[]) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      try {
        await Promise.all(images.map(src => 
          new Promise<void>((resolve, reject) => {
            const img = document.createElement("img");
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(`Failed to load: ${src}`));
            img.src = src;
          })
        ));
        if (mounted) setLoaded(true);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Image load error");
      }
    };
    
    loadImages();
    return () => { mounted = false; };
  }, [images]);
  
  return { loaded, error };
};

export const useScrollVelocity = (ref: React.RefObject<HTMLElement | null>) => {
  const [velocity, setVelocity] = useState(0);
  const lastY = useRef(0);
  const lastTime = useRef(0);
  
  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (inView) {
      const now = performance.now();
      const delta = now - lastTime.current;
      if (delta > 16) { // ~60fps
        const currentY = window.scrollY;
        const vel = Math.abs(currentY - lastY.current) / delta * 1000;
        setVelocity(prev => prev * 0.9 + vel * 0.1); // Smooth
        lastY.current = currentY;
        lastTime.current = now;
      }
    }
  });
  
  return velocity;
};
