"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { experience } from "@/content/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const TimelineItem = ({ exp, index, isExpanded, onToggle, isFirst, reducedMotion }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  const itemDuration = reducedMotion ? 0.15 : 0.6;
  const staggerDelay = reducedMotion ? 0 : index * 0.05;

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: itemDuration, delay: staggerDelay, ease: EASE_PREMIUM }}
      className="relative py-14 group"
    >
      {/* Timeline Dot */}
      <motion.div
        className={`absolute left-0 md:left-2 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center
          ${isExpanded ? 'bg-primary border-primary' : 'bg-background border-foreground/30 group-hover:border-primary/60'}
          transition-colors duration-500`}
        animate={{
          scale: isExpanded ? 1.2 : 1,
          backgroundColor: isExpanded ? "hsl(var(--primary))" : "hsl(var(--background))",
        }}
        transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: EASE_SMOOTH }}
      >
        {isExpanded && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-background"
          />
        )}
      </motion.div>

      <div className="pl-8 md:pl-14">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onToggle()}
          aria-expanded={isExpanded}
          aria-controls={`exp-content-${exp.id}`}
        >
          {/* Period */}
          <div className="w-full md:w-1/4 order-2 md:order-1">
            <motion.span
              className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground"
              animate={{ opacity: isExpanded ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              {exp.period}
            </motion.span>
          </div>

          {/* Title & Company */}
          <div className="w-full md:w-2/4 order-1 md:order-2">
            <motion.h3
              className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground tracking-tight leading-tight
                group-hover:text-primary transition-colors duration-300"
              animate={{ x: isExpanded && !reducedMotion ? 4 : 0 }}
              transition={{ duration: 0.4, ease: EASE_SMOOTH }}
            >
              {exp.title}
            </motion.h3>
            <motion.p
              className="text-base md:text-lg text-muted-foreground mt-2 font-serif italic"
              animate={{ opacity: isExpanded ? 1 : 0.7 }}
            >
              {exp.company}
            </motion.p>
          </div>

          {/* Toggle Button */}
          <div className="w-full md:w-1/4 flex justify-start md:justify-end order-3">
            <motion.button
              className="relative w-11 h-11 md:w-12 md:h-12 rounded-full border border-foreground/20
                flex items-center justify-center shrink-0 overflow-hidden
                hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
              whileHover={reducedMotion ? undefined : { scale: 1.05 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            >
              {/* Background fill on hover/expand */}
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ scale: 0 }}
                animate={{ scale: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE_SMOOTH }}
              />

              {/* Icon with rotation */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: EASE_PREMIUM }}
                className={`relative z-10 ${isExpanded ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`}
              >
                {isExpanded ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={`exp-content-${exp.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: EASE_PREMIUM }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: reducedMotion ? 0 : 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0.15 : 0.5 }}
                className="pt-10 pb-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
              >
                <div className="md:col-start-2 md:col-span-3 space-y-10">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-5 flex items-center gap-3">
                      <span className="w-8 h-px bg-foreground/20" />
                      Impact & Execution
                    </h4>
                    <ul className="space-y-5">
                      {exp.details.responsibilities.map((r: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: reducedMotion ? 0 : -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: reducedMotion ? 0 : 0.15 + i * 0.08, duration: 0.5 }}
                          className="text-base md:text-lg font-serif text-foreground/90 leading-relaxed flex items-start gap-4"
                        >
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: reducedMotion ? 0 : 0.2 + i * 0.08, type: "spring", stiffness: 500 }}
                          />
                          <span>{r}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-6 border-t border-foreground/10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-5 flex items-center gap-3">
                      <span className="w-8 h-px bg-foreground/20" />
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {exp.tech.map((t: string, i: number) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reducedMotion ? 0 : 0.25 + i * 0.04, duration: 0.4 }}
                          whileHover={{ y: -2, borderColor: "hsl(var(--primary))" }}
                          className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider rounded-full
                            border border-foreground/15 text-foreground hover:text-primary
                            hover:bg-primary/5 transition-colors cursor-default"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Optional: Link to case study */}
                  {exp.caseStudy && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-4"
                    >
                      <a
                        href={exp.caseStudy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-sm font-medium text-muted-foreground
                          hover:text-primary transition-colors"
                      >
                        View Case Study
                        <motion.span
                          className="inline-block"
                          animate={reducedMotion ? {} : { x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.span>
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function ExperienceTimeline() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  const toggleItem = useCallback((id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-32 md:py-40 w-full bg-background relative overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Header */}
        <motion.header
          style={prefersReducedMotion ? {} : { opacity: headerOpacity, y: headerY }}
          className="mb-20 md:mb-28"
        >
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-5 block"
          >
            The Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1, ease: EASE_PREMIUM, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="text-5xl md:text-7xl lg:text-[7rem] font-serif tracking-tight leading-[0.9] text-foreground"
          >
            Professional <br />
            <span className="italic font-light text-muted-foreground">Evolution</span>
          </motion.h2>
        </motion.header>

        {/* Timeline List */}
        <div className="relative pl-2 md:pl-4 border-l border-foreground/10">
          {experience.map((exp, index) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={index}
              isFirst={index === 0}
              isExpanded={expandedItems.includes(exp.id)}
              onToggle={() => toggleItem(exp.id)}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Subtle CTA Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0.15 : 0.8 }}
          className="mt-20 pt-12 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
            Let&apos;s build something remarkable together
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/15
              text-sm font-medium uppercase tracking-widest hover:bg-foreground hover:text-background
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Get in Touch
            <motion.span
              className="inline-block"
              animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
