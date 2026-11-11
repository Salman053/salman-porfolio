"use client";

import { motion, useInView } from "framer-motion";
import { Code, Palette, Rocket, Cpu, Cloud, Lock, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const services = [
  {
    num: "01",
    title: "Web Architecture",
    description: "Engineering scalable, high-performance web ecosystems using Next.js and modern cloud infrastructure.",
    icon: <Code className="w-5 h-5 stroke-[1.5]" />,
  },
  {
    num: "02",
    title: "Experience Design",
    description: "Crafting immersive, conversion-focused interfaces that prioritize user flow and brand identity.",
    icon: <Palette className="w-5 h-5 stroke-[1.5]" />,
  },
  {
    num: "03",
    title: "AI Integration",
    description: "Implementing cognitive capabilities through LLM orchestration and intelligent automation workflows.",
    icon: <Cpu className="w-5 h-5 stroke-[1.5]" />,
  },
  {
    num: "04",
    title: "Cloud Operations",
    description: "Designing resilient CI/CD pipelines and automated deployment strategies for zero-downtime scaling.",
    icon: <Cloud className="w-5 h-5 stroke-[1.5]" />,
  },
  {
    num: "05",
    title: "Product Strategy",
    description: "Accelerating the journey from MVP to market leader through data-driven engineering and rapid iteration.",
    icon: <Rocket className="w-5 h-5 stroke-[1.5]" />,
  },
  {
    num: "06",
    title: "Secure Engineering",
    description: "Hardening digital assets with advanced encryption and proactive security protocols.",
    icon: <Lock className="w-5 h-5 stroke-[1.5]" />,
  },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  const prefersReducedMotion = useReducedMotion();
  const animDuration = prefersReducedMotion ? 0.15 : 0.6;

  return (
    <section id="services" className="relative py-12 md:px-0 px-8 bg-background overflow-hidden">
      {/* Subtle ambient backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <header className="mb-16 md:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
            What we do
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal font-serif tracking-tight leading-[0.95] text-foreground">
            Selected <span className="italic font-light text-muted-foreground">capabilities</span>
          </h2>
        </header>

        <div ref={containerRef} className="relative border-t border-foreground/10" role="list">
          {services.map((service, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={service.num}
                role="listitem"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: animDuration, delay: prefersReducedMotion ? 0 : i * 0.08, ease: EASE_PREMIUM }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative border-b border-foreground/10 px-4 md:px-8 py-8 md:py-12 cursor-pointer group overflow-hidden"
              >
                {/* Hover Background Slide */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-foreground/3 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "0%" : "-100%" }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                />

                {/* Left Accent Line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500"
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  style={{ transformOrigin: "left" }}
                />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
                  {/* Number & Icon */}
                  <div className="md:col-span-2 flex items-center gap-4 md:gap-6">
                    <span className="text-sm font-mono text-muted-foreground tabular-nums group-hover:text-primary transition-colors duration-300">
                      {service.num}
                    </span>
                    <motion.div
                      animate={{ scale: isHovered ? 1.15 : 1 }}
                      className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
                    >
                      {service.icon}
                    </motion.div>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-4">
                    <motion.h3
                      className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground tracking-tight group-hover:text-primary transition-colors duration-300"
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                    >
                      {service.title}
                    </motion.h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5 mt-2 md:mt-0">
                    <motion.p
                      className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl group-hover:text-foreground/80 transition-colors duration-300"
                      animate={{ opacity: isHovered ? 1 : 0.6, x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                    >
                      {service.description}
                    </motion.p>
                  </div>

                  {/* Arrow */}
                  <div className="md:col-span-1 flex justify-end">
                    <motion.div
                      className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground/60"
                      animate={{
                        scale: isHovered ? 1 : 0.85,
                        opacity: isHovered ? 1 : 0.4,
                        backgroundColor: isHovered ? "hsl(var(--primary))" : "transparent",
                        borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground)/0.1)",
                        color: isHovered ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
                        rotate: isHovered ? 45 : 0,
                      }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
