"use client";;
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { archiveProjects } from "@/content/site";
import { usePrefersReducedMotion } from "./hooks";
import { AtmosphereLayer } from "./atmospheric-layer";
import { CinematicCard } from "./cinematic-card";
import { EASE } from "./constants";

export default function MasonryBentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  
  // Header Animation Variants
  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.2
      }
    }
  }), [reducedMotion]);
  
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: reducedMotion ? 0 : 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: reducedMotion ? 0 : 0.6, 
        ease: EASE.premium 
      }
    }
  }), [reducedMotion]);
  
  // Parallax Multipliers for staggered columns
  const parallaxMultipliers = useMemo(() => [1.0, 1.4, 0.8], []);

  return (
    <section 
      ref={containerRef} 
      className="md:py-32 md:px-0 px-3 relative w-full overflow-hidden bg-background text-foreground" 
      id="projects"
      role="region"
      aria-labelledby="archive-heading"
    >
      {/* Theme Configuration */}
      <style jsx global>{`
        :root {
          --primary-rgb: 124, 58, 237;
          --secondary-rgb: 236, 72, 153;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
      
      <AtmosphereLayer />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Editorial Header */}
        <motion.header 
          className="flex flex-col  gap-12 border-b border-border/50 pb-24"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="max-w-4xl">
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 mb-10"
            >
              
            </motion.div>
            
            <motion.h2
              id="archive-heading"
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-serif 
                        tracking-tighter leading-[0.85] text-foreground"
            >
              Selected <br />
              <span 
                className="italic font-light text-primary block mt-2"
                // initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -30 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ 
                //   duration: reducedMotion ? 0 : 1.2, 
                //   delay: reducedMotion ? 0 : 0.5,
                //   ease: EASE.premium 
                // }}
              >
                Artifacts
              </span>
            </motion.h2>
          </div>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground font-light max-w-xl leading-relaxed"
          >
            A curated ledger of technical explorations and spatial interfaces, 
            documented through high-fidelity functional prototypes and research modules.
          </motion.p>
        </motion.header>
        
        {/* The Grid - 3 Column Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 md:gap-x-16 items-start">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col">
              {archiveProjects
                .filter((_, i) => i % 3 === colIndex)
                .map((project, i) => (
                  <CinematicCard 
                    key={project.id} 
                    project={project} 
                    index={i} 
                    parallaxMultiplier={parallaxMultipliers[colIndex]}
                    reducedMotion={reducedMotion}
                  />
                ))}
            </div>
          ))}
        </div>
        
   
      </div>
      
      {/* <CursorFollower reducedMotion={reducedMotion} /> */}
    </section>
  );
}
