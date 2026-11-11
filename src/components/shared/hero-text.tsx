"use client";

import { motion } from "framer-motion";

// Premium easing curves
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Static SVG decorations — zero RAF cost, no infinite JS animation.
const EcosystemArt = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ecosystem architecture">
    <defs>
      <pattern id="eco-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.06" />
      </pattern>
      <radialGradient id="eco-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#eco-grid)" />
    <circle cx="200" cy="250" r="180" fill="url(#eco-glow)" className="text-primary/20" />

    {/* Floating nodes & cards */}
    <rect x="40" y="120" width="100" height="140" rx="16" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
    <line x1="140" y1="190" x2="220" y2="210" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="6 4" />
    <circle cx="280" cy="160" r="24" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
    <circle cx="280" cy="160" r="10" fill="currentColor" fillOpacity="0.3" />
    <path d="M 80 380 L 160 300 L 240 340 L 320 280" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="320" cy="280" r="6" fill="currentColor" fillOpacity="0.4" />
    <rect x="120" y="200" width="160" height="100" rx="20" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" strokeWidth="2" />
  </svg>
);

const InterfaceArt = () => (
  <svg viewBox="0 0 400 450" className="w-full h-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Interface layout">
    <defs>
      <linearGradient id="ui-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
      </linearGradient>
      <filter id="ui-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="12" />
      </filter>
    </defs>

    {/* Soft gradient blob */}
    <circle cx="200" cy="225" r="140" fill="url(#ui-grad)" filter="url(#ui-blur)" className="text-primary" />

    {/* Device frame & UI blocks */}
    <rect x="100" y="80" width="200" height="280" rx="24" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
    <rect x="115" y="110" width="170" height="12" rx="6" fill="currentColor" fillOpacity="0.15" />
    <rect x="115" y="135" width="100" height="12" rx="6" fill="currentColor" fillOpacity="0.1" />
    <rect x="115" y="160" width="140" height="12" rx="6" fill="currentColor" fillOpacity="0.1" />
    <rect x="115" y="200" width="70" height="90" rx="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
    <rect x="215" y="200" width="70" height="90" rx="12" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />

    {/* Orbit ring */}
    <circle cx="200" cy="225" r="160" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" strokeDasharray="8 12" />

    {/* Pulsing accent (static) */}
    <circle cx="285" cy="310" r="8" fill="currentColor" fillOpacity="0.5" className="text-primary" />
  </svg>
);

export default function HeroText() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animDuration = prefersReducedMotion ? 0.15 : 1.2;
  const reducedMotionDuration = Math.max(0.15, Math.min(0.5, animDuration * 0.5));

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-32 pb-20">
      {/* CSS-only ambient background — grid pattern + radial glow, no canvas RAF loop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top right, var(--color-primary) 0%, transparent 55%), radial-gradient(ellipse at bottom left, var(--color-primary) 0%, transparent 45%)",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 5%, transparent) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Top Text Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 md:mb-32">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration, ease: EASE_PREMIUM }}
            className="lg:col-span-9"
          >
            <h1 className="text-[4rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] leading-[0.9] font-serif tracking-tight text-foreground flex flex-col">
              <motion.span
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotionDuration, ease: EASE_PREMIUM, delay: 0.2 }}
                className="block"
              >
                Meet Salman
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotionDuration, ease: EASE_PREMIUM, delay: 0.4 }}
                className="flex items-center gap-6 md:gap-12 ml-0 md:ml-24"
              >
                <motion.span
                  animate={!prefersReducedMotion ? { rotate: [0, 8, -8, 0] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                  className="font-sans italic text-muted-foreground font-light text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]"
                >
                  /
                </motion.span>
                Khan
              </motion.span>
            </h1>
          </motion.div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE_OUT }}
            className="lg:col-span-3 flex flex-col justify-end lg:pb-12"
          >
            <div className="border-t border-foreground/10 pt-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">Focus</p>
              <p className="text-lg md:text-xl leading-relaxed text-foreground font-serif">
                Specialized in crafting scalable ecosystems and premium digital experiences.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-3 rounded-full bg-foreground text-background text-sm font-bold uppercase tracking-widest overflow-hidden transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Editorial Illustrations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Large Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: EASE_PREMIUM }}
            className="md:col-span-5 h-[50vh] md:h-[600px] relative rounded-[3rem] overflow-hidden bg-muted/30 border border-foreground/5 backdrop-blur-sm"
          >
            <div className="w-full h-full text-foreground">
              <EcosystemArt />
            </div>
          </motion.div>

          {/* Center Space / Detail */}
          <div className="md:col-span-3 hidden md:flex flex-col items-center justify-center h-full pt-32">
            <motion.div
              animate={!prefersReducedMotion ? { rotate: 360 } : {}}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-dashed border-foreground/20 rounded-full flex items-center justify-center relative"
            >
              <motion.div
                animate={!prefersReducedMotion ? { scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 bg-primary rounded-full absolute -top-1 shadow-[0_0_12px_rgba(var(--primary),0.5)]"
              />
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium text-center leading-tight select-none">
                Iterate <br /> & Scale
              </span>
            </motion.div>
          </div>

          {/* Right Floating Pill */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: EASE_PREMIUM }}
            className="md:col-span-4 h-[40vh] md:h-[450px] relative rounded-[3rem] overflow-hidden md:mt-40 bg-muted/30 border border-foreground/5 backdrop-blur-sm"
          >
            <div className="w-full h-full text-foreground">
              <InterfaceArt />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
