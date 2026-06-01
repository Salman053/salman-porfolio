"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Trophy } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    school: "Kohat University of Science and Technology",
    period: "2021 – 2025",
    achievements: [
      "Graduated with Honors (3.23 CGPA)",
      "Specialized in Software Engineering and Distributed Web Systems",
    ],
  },
  {
    id: 2,
    degree: "Intermediate in Pre-Computer Science",
    school: "Karwan Model College Kohat",
    period: "2019 – 2021",
    achievements: [
      "Secured 2nd Position in Kohat Board exams",
      "Recipient of the Top Academic Performer Award",
    ],
  },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const EducationRow = ({ edu, index, isFirst }: { edu: any; index: number; isFirst: boolean }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_PREMIUM }}
      className="relative py-12 md:py-14 border-b border-foreground/10 pl-8 md:pl-12 group cursor-default"
    >
      {/* Ambient Hover Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
      />

      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-2 top-12 md:top-14 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-primary/30 bg-background z-10 flex items-center justify-center shadow-sm">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 400, damping: 10 }}
        />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Period */}
        <div className="md:col-span-3">
          <span className="text-xs font-mono text-foreground tabular-nums tracking-wider opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            {edu.period}
          </span>
        </div>

        {/* Degree & School */}
        <div className="md:col-span-5">
          <motion.h3
            className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors duration-300"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          >
            {edu.degree}
          </motion.h3>
          <p className="text-sm md:text-base text-foreground font-sans leading-relaxed">
            {edu.school}
          </p>
        </div>

        {/* Achievements */}
        <div className="md:col-span-4 pt-2 md:pt-0">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-3.5 h-3.5 text-primary/70" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">
              Key Milestones
            </span>
          </div>
          <ul className="space-y-3">
            {edu.achievements.map((ach: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="text-sm text-foreground leading-relaxed flex items-start gap-3 group/item"
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 flex-shrink-0 group-hover/item:bg-primary transition-colors duration-300"
                  whileHover={{ scale: 1.3 }}
                />
                <span className="group-hover/item:text-foreground/90 transition-colors duration-300">
                  {ach}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function EducationJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });

  return (
    <section id="education" ref={containerRef} className="relative md:py-26 overflow-hidden bg-background">
      {/* Ambient backdrop gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE_PREMIUM }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground mb-5 block">
              Academic Foundation
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal font-serif tracking-tight leading-[0.95] text-foreground">
              Strategic <span className="italic font-light text-primary">learning</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_SMOOTH }}
            className="max-w-sm text-base md:text-lg text-muted-foreground leading-relaxed pt-4 md:pt-0"
          >
            A systematic commitment to continuous education, theoretical foundations, and mastery of modern technology.
          </motion.p>
        </header>

        {/* Timeline Grid */}
        <div className="relative border-t border-foreground/10 pl-4 md:pl-8">
          {education.map((edu, index) => (
            <EducationRow 
              key={edu.id} 
              edu={edu} 
              index={index} 
              isFirst={index === 0} 
            />
          ))}
        </div>

        
      </div>
    </section>
  );
}