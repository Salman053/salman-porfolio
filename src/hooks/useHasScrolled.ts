import { useState, useEffect } from "react";

export function useHasScrolled(threshold = 100) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      setScrollProgress(progress);
      
      
      if (scrollTop > threshold) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { hasScrolled, scrollProgress };
}