"use client";

import React, { useRef, useState, memo, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { use3DTilt, useMousePosition } from "./hooks";
import { LightSpill } from "./atmospheric-layer";
import { ImageCarousel } from "./image-carousel";
import { EASE } from "./constants";
import { Project } from "./types";

interface CinematicCardProps {
  project: Project;
  index: number;
  parallaxMultiplier: number;
  reducedMotion: boolean;
}

export const CinematicCard = memo(({ 
  project, 
  index,
  parallaxMultiplier,
  reducedMotion
}: CinematicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // Scroll-linked parallax
  const yOffset = useTransform(
    scrollYProgress, 
    [0, 1], 
    reducedMotion ? [0, 0] : [0, 60 * parallaxMultiplier]
  );
  
  // 3D Tilt
  const { rotateX, rotateY, scale, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt(cardRef);
  
  // Entrance Animation
  const isInView = useInView(cardRef, { once: true, margin: "-150px" });
  
  const { x: globalMouseX, y: globalMouseY } = useMousePosition();
  
  // Combined hover/focus state
  const isActive = isHovered || isFocused;
  const hasValidUrl = project.href && project.href !== "#";
  
  // Handle image change from carousel
  const handleImageChange = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);
  
  // Validate images array
  const hasValidImages = project.images && project.images.length > 0;
  
  return (
    <motion.div
      ref={cardRef}
      style={{ y: reducedMotion ? 0 : yOffset }}
      className="relative group perspective-1000 mb-32 md:mb-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveImageIndex(0);
        handleMouseLeave();
      }}
      onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
    >
   

      <motion.div
        style={{ 
          rotateX: reducedMotion ? 0 : rotateX, 
          rotateY: reducedMotion ? 0 : rotateY,
          scale: reducedMotion ? 1 : scale,
          transformStyle: "preserve-3d" 
        }}
        initial={{ opacity: 0, y: 80 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: reducedMotion ? 0 : 0.8, 
            delay: reducedMotion ? 0 : index * 0.1, 
            ease: EASE.premium 
          }
        } : {}}
      >
        <div
          className="relative block w-full rounded-3xl overflow-hidden 
                    bg-card/60 backdrop-blur-xl border border-border/50 
                    shadow-2xl shadow-black/10 dark:shadow-black/30 transition-all duration-500
                    group-hover:border-primary/30 group-hover:bg-card/80
                    group-hover:shadow-2xl group-hover:shadow-primary/5"
          onMouseEnter={handleMouseEnter}
          onFocus={() => { setIsFocused(true); handleMouseEnter(); }}
          onBlur={() => setIsFocused(false)}
        >
          {/* Top Metadata Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-border/50 
                        font-mono text-xs tracking-widest text-muted-foreground uppercase bg-background/20">
            <div className="flex items-center gap-4">
              <span className="text-primary/80 font-bold">{project.id?.toUpperCase() || "PROJECT"}</span>
              <span className="text-muted-foreground/50">|</span>
              <span className="text-muted-foreground">{project.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary animate-pulse' : 'bg-primary/40'}`} />
              <span className="text-[10px] font-mono text-muted-foreground/60">
                {hasValidImages ? `${project.images.length} ${project.images.length === 1 ? 'VIEW' : 'VIEWS'}` : 'NO IMAGES'}
              </span>
            </div>
          </div>

          {/* Main Visual Content - Image Carousel */}
          <div className="relative aspect-[16/9] md:aspect-[20/12] overflow-hidden bg-gradient-to-br from-background/50 to-background/20">
            {hasValidImages ? (
              <motion.div
                className="w-full h-full"
                style={{ 
                  transformStyle: "preserve-3d", 
                  translateZ: reducedMotion ? 0 : 60 
                }}
              >
                <ImageCarousel 
                  images={project.images} 
                  title={project.title} 
                  isHovered={isActive}
                  onImageChange={handleImageChange}
                  reducedMotion={reducedMotion}
                />
              </motion.div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-foreground/5 to-foreground/10">
                <span className="text-muted-foreground text-sm">No images available</span>
              </div>
            )}
            
           
            
            {/* Progress Indicator */}
            {hasValidImages && project.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImageIndex(i);
                      handleImageChange(i);
                    }}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${
                      i === activeImageIndex 
                        ? "w-6 h-1.5 bg-primary" 
                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            )}
            
            {/* Image Counter */}
            {hasValidImages && project.images.length > 1 && (
              <div className="absolute top-6 right-6 z-20 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white/90 text-[10px] font-mono">
                {activeImageIndex + 1}/{project.images.length}
              </div>
            )}
          </div>

          {/* Project Details Footer */}
          <div className="p-8 md:p-10 pt-8 md:pt-10">
            <div className="flex items-start justify-between gap-6 mb-5">
              <div className="space-y-2 min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 block">
                  {project.category || "Featured Work"}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-foreground 
                             tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
              
              {hasValidUrl ? (
                <motion.a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-border/50 
                            flex items-center justify-center transition-all duration-500 
                            hover:bg-foreground hover:text-background hover:scale-110 hover:border-primary/50
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label={`View live project: ${project.title}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="text-xl font-light"
                    animate={isActive && !reducedMotion ? { x: [0, 6, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  >
                    →
                  </motion.span>
                </motion.a>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-border/30 
                                flex items-center justify-center text-muted/30">
                  <span className="text-xl font-light">→</span>
                </div>
              )}
            </div>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light max-w-2xl 
                        line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
              {project.description}
            </p>
            
            {/* Project Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300">
                {project.tags.slice(0, 4).map(tag => (
                  <span 
                    key={tag} 
                    className="px-2.5 py-1 rounded-md border border-border/50 text-[9px] font-mono 
                              tracking-tighter uppercase text-muted-foreground 
                              hover:bg-primary/10 hover:border-primary/30 hover:text-primary
                              transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2.5 py-1 rounded-md border border-border/50 text-[9px] font-mono 
                                 tracking-tighter uppercase text-muted-foreground">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Border Glow on Active */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            style={{
              boxShadow: isActive 
                ? "0 0 0 2px rgba(var(--primary-rgb), 0.2), 0 25px 50px -12px rgba(0,0,0,0.25)" 
                : "none"
            }}
          />
          
          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

CinematicCard.displayName = "CinematicCard";