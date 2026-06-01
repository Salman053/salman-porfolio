"use client";

import { useRef, useCallback, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "@/lib/utils";

const ScrollToTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  
  const handleClick = useCallback(() => {
    scrollToTop();
  }, []);
  
  // Direct DOM manipulation - zero re-renders
  useEffect(() => {
    let ticking = false;
    
    const updateProgress = () => {
      if (!progressCircleRef.current) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      const strokeDashoffset = 138.23 - (138.23 * progress);
      progressCircleRef.current.style.strokeDashoffset = String(strokeDashoffset);
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    
    // Show/hide button based on scroll position
    const handleVisibility = () => {
      if (!buttonRef.current) return;
      const shouldShow = window.scrollY > 100;
      buttonRef.current.style.opacity = shouldShow ? "1" : "0";
      buttonRef.current.style.visibility = shouldShow ? "visible" : "hidden";
      buttonRef.current.style.transform = shouldShow ? "scale(1)" : "scale(0.8)";
    };
    
    const combinedHandler = () => {
      handleScroll();
      handleVisibility();
    };
    
    window.addEventListener("scroll", combinedHandler, { passive: true });
    combinedHandler(); // Initial call
    
    return () => {
      window.removeEventListener("scroll", combinedHandler);
    };
  }, []);
  
  return (
    <button
      ref={buttonRef}
      title="Scroll to top"
      onClick={handleClick}
      className="fixed bottom-28 sm:bottom-36 right-4 sm:right-3.5 z-50 group transition-all duration-200 hover:scale-105 active:scale-95"
      aria-label="Scroll to top"
      style={{ opacity: 0, visibility: "hidden", transform: "scale(0.8)" }}
    >
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        {/* Static background */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-foreground/10"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Animated progress - Direct DOM manipulation */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            ref={progressCircleRef}
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-primary"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: "138.23",
              strokeDashoffset: "138.23",
              transition: "stroke-dashoffset 0.016s linear"
            }}
          />
        </svg>
        
        {/* Button center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-foreground/10 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors duration-200">
            <ArrowUp size={14} className="sm:size-16 stroke-[1.5]" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ScrollToTopButton;