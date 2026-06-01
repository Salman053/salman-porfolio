"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Activity, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    num: "01",
    title: "Clean Architecture",
    desc: "Well-structured, maintainable code following industry best practices, patterns, and modern standards.",
  },
  {
    num: "02",
    title: "Adaptive Design",
    desc: "Seamlessly fluid experiences across all devices, from compact mobile formats to high-resolution displays.",
  },
  {
    num: "03",
    title: "Pixel Precision",
    desc: "Meticulous translation of complex designs and layout hierarchies into high-fidelity production code.",
  },
  {
    num: "04",
    title: "Interactive Logic",
    desc: "Dynamic, performant components that elevate user engagement and brand perception.",
  },
  {
    num: "05",
    title: "Strategic Planning",
    desc: "Logical structure and user-centric flows mapped systematically from initial concept to deployment.",
  },
  {
    num: "06",
    title: "Professionalism",
    desc: "Clear communication, reliable delivery, and a continuous focus on long-term client success.",
  },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as  const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as  const;

const WhyHireMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });

  const stats = [
    { icon: ShieldCheck, text: "Trusted & Secure", delay: 0 },
    { icon: Activity, text: "High Performance", delay: 0.15 },
    { icon: Sparkles, text: "Creative Solutions", delay: 0.3 },
  ];

  return (
    <section id="why" className="relative py-12 bg-background overflow-hidden">
      {/* Ambient backdrop gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div ref={containerRef} className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Editorial Heading */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-start"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_SMOOTH }}
              className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground mb-6 block"
            >
              Our Philosophy
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE_PREMIUM }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal font-serif tracking-tight leading-[0.95] mb-8"
            >
              Why partner <br />
              with <span className="italic font-light text-primary relative inline-block">
                MSK
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-px bg-primary/40"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.8, ease: EASE_PREMIUM }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_SMOOTH }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed mb-12"
            >
              We do not just write code. We build digital assets designed to scale, perform, and leave an indelible impression.
            </motion.p>

            {/* Desktop Stats - Glassmorphic Cards */}
            <div className="hidden lg:flex flex-col gap-4 pt-8 border-t border-foreground/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + stat.delay, ease: EASE_SMOOTH }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:border-primary/30 transition-colors cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
                  >
                    <stat.icon className="w-4 h-4 stroke-[1.5]" />
                  </motion.div>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                    {stat.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Features List */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="border-t border-foreground/10">
              {features.map((feature, i) => (
                <motion.div 
                  key={feature.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: EASE_PREMIUM }}
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.4)" }}
                  className="relative py-9 md:py-10 border-b border-foreground/10 px-3 md:px-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start group transition-colors duration-300 rounded-xl"
                >
                  {/* Subtle left accent line on hover */}
                  <motion.div
                    className="absolute left-0 top-3 bottom-3 w-px bg-primary/0 group-hover:bg-primary/40 transition-colors duration-400 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />

                  {/* Number Badge */}
                  <div className="sm:col-span-2 flex items-center">
                    <motion.span 
                      className="text-sm font-mono text-muted-foreground tabular-nums group-hover:text-primary transition-colors duration-300"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    >
                      {feature.num}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="sm:col-span-10">
                    <motion.h3 
                      className="text-lg md:text-xl lg:text-2xl font-serif text-foreground tracking-tight mb-2.5 group-hover:text-primary transition-colors duration-300"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl group-hover:text-foreground/80 transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {feature.desc}
                    </motion.p>
                  </div>

                  {/* Hover Arrow Indicator */}
                  <motion.div
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -8 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

     

        {/* Subtle CTA Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="pt-12 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
         
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/15 
              text-sm font-medium uppercase tracking-widest hover:bg-foreground hover:text-background 
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Let's Collaborate
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHireMe;