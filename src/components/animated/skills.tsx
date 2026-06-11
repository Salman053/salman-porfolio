"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export const Frontend_skill = [
  { skill_name: "HTML 5", Image: "/html.png", width: 40, height: 40 },
  { skill_name: "CSS", Image: "/css.png", width: 40, height: 40 },
  { skill_name: "JavaScript", Image: "/js.png", width: 35, height: 35 },
  { skill_name: "TypeScript", Image: "/ts.png", width: 40, height: 40 },
  { skill_name: "React", Image: "/react.png", width: 40, height: 40 },
  { skill_name: "Next.js", Image: "/next.png", width: 40, height: 40 },
  { skill_name: "Redux", Image: "/redux.png", width: 40, height: 40 },
  { skill_name: "Tailwind CSS", Image: "/tailwind.png", width: 40, height: 40 },
];

export const Backend_skill = [
  { skill_name: "Node.js", Image: "/node-js.png", width: 40, height: 40 },
  { skill_name: "Express.js", Image: "/express.png", width: 40, height: 40 },
  { skill_name: "MongoDB", Image: "/mongodb.png", width: 30, height: 30 },
  { skill_name: "Firebase", Image: "/Firebase.png", width: 35, height: 35 },
  { skill_name: "MySQL", Image: "/mysql.png", width: 40, height: 40 },
  { skill_name: "Python", Image: "/python.png", width: 40, height: 40 },
  { skill_name: "Laravel", Image: "/Laravel.png", width: 40, height: 40 },
];

export const Other_skill = [
  { skill_name: "Stripe", Image: "/stripe.webp", width: 40, height: 40 },
  { skill_name: "ChatGPT API", Image: "/chatgpt-icon.svg", width: 35, height: 35 },
  { skill_name: "Gemini Cli", Image: "/gemini.webp", width: 35, height: 35 },
];

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const skillCategories = {
    frontend: Frontend_skill,
    backend: Backend_skill,
    other: Other_skill,
  };

  const filteredSkills =
    activeCategory === "all"
      ? [...Frontend_skill, ...Backend_skill, ...Other_skill]
      : skillCategories[activeCategory as keyof typeof skillCategories] || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.15, ease: EASE_PREMIUM },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE_PREMIUM },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="relative py-12 bg-background overflow-hidden">
      {/* Subtle ambient backdrop */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
              Technical Arsenal
            </span>
            <h2 className="text-5xl md:text-7xl font-normal font-serif tracking-tight leading-[0.95] text-foreground">
              The <span className="italic font-light text-muted-foreground">engine</span>
            </h2>
          </div>

          {/* Premium Pill Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-foreground/5 backdrop-blur-sm md:rounded-full border border-foreground/10">
            {["all", "frontend", "backend", "other"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`relative px-3 py-2 md:px-5 md:py-2.5 text-[9px] md:text-xs font-mono uppercase tracking-widest md:rounded-full transition-colors duration-300 ${
                  activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="skill-tab-bg"
                    className="absolute inset-0 bg-foreground/10 md:rounded-full  shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.skill_name}
                layout
                variants={itemVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-background/60 backdrop-blur-sm border border-foreground/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-foreground/15 transition-colors duration-300 overflow-hidden cursor-default"
              >
                {/* Subtle gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                  <Image
                    src={skill.Image}
                    width={skill.width}
                    height={skill.height}
                    alt={skill.skill_name}
                    className="object-contain w-full h-full opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    unoptimized={skill.Image.endsWith(".svg")}
                  />
                </div>

                {/* Label */}
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center select-none">
                  {skill.skill_name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;