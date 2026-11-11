"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedContactForm from "./contact-form";
import { Mail, MapPin, ArrowUpRight, Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export default function SplitScreenAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects — disabled for reduced motion
  const aboutY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);
  const contactY = useTransform(scrollYProgress, [0.6, 1], [40, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]);

  // View triggers
  const aboutInView = useInView(aboutRef, { once: true, margin: "-10%" });
  const contactInView = useInView(contactRef, { once: true, margin: "-10%" });

  // Form focus state for ambient glow
  const [formFocused, setFormFocused] = useState(false);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-12 md:py-40 w-full bg-background border-t border-foreground/10"
    >
      {/* Ambient scroll-linked backdrop — static for reduced motion */}
      <motion.div
        style={prefersReducedMotion ? { opacity: 0.15 } : { opacity: bgOpacity }}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* ===== ABOUT SECTION ===== */}
        <motion.div
          ref={aboutRef}
          style={prefersReducedMotion ? {} : { y: aboutY }}
          className="flex flex-col lg:flex-row-reverse items-start gap-16 lg:gap-24 mb-12 md:mb-40"
        >
          {/* Left: Editorial Heading */}
          <div className="w-full lg:w-[40%]">
            <motion.span
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_SMOOTH }}
              className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-8 block"
            >
              The Architect
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: prefersReducedMotion ? 0 : 0.15, ease: EASE_PREMIUM }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[0.95]"
            >
              Bridging <br />
              <span className="italic font-light text-muted-foreground relative inline-block">
                Logic &amp;
                <motion.span
                  className="absolute -bottom-1.5 left-0 w-full h-px bg-primary/40"
                  initial={{ scaleX: 0 }}
                  animate={aboutInView ? { scaleX: 1 } : {}}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 1.2, delay: prefersReducedMotion ? 0 : 0.6, ease: EASE_PREMIUM }}
                />
              </span>{" "}
              <br />Aesthetic
            </motion.h2>
          </div>

          {/* Right: Content with Parallax */}
          <motion.div
            className="w-full lg:w-[60%] space-y-8 lg:pt-12"
          >
            <div className="space-y-6 text-lg md:text-xl lg:text-2xl text-foreground font-serif leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.3, ease: EASE_SMOOTH }}
              >
                I am <span className="font-bold text-primary">Muhammad Salman Khan</span>. I construct high-performance digital ecosystems.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.45, ease: EASE_SMOOTH }}
                className="text-muted-foreground"
              >
                My practice is defined by a rigorous approach to scalable engineering and a relentless pursuit of beautiful, intuitive user experiences. We don&apos;t just write code; we design structural elegance.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.8, delay: prefersReducedMotion ? 0 : 0.6, ease: EASE_PREMIUM }}
              className="grid sm:grid-cols-2 gap-8 md:gap-12 pt-12 border-t border-foreground/10"
            >
              <div className="group">
                <h4 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  Systems
                </h4>
                <p className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary/60" />
                  Next.js / Node.js / Cloud / Laravel / CMS
                </p>
              </div>
              <div className="group">
                <h4 className="font-serif text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  Innovation
                </h4>
                <p className="text-sm font-mono uppercase text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-primary/60" />
                  SOLVING REAL PROBLEMS WITH CREATIVE TECH
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ===== CONTACT SECTION ===== */}
        <motion.div
          ref={contactRef}
          id="contact"
          style={prefersReducedMotion ? {} : { y: contactY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative mt-2 md:mt-32 pt-24 md:pt-32 border-t border-foreground/10 items-start"
        >
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            >
              <span className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-6 block">
                Let&apos;s Talk
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tight leading-[0.95] mb-8">
                Ready to <br />
                <span className="italic font-light text-muted-foreground">Collaborate?</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground font-serif italic max-w-md leading-relaxed">
                Whether you have a specific project in mind or just want to explore possibilities, I&apos;m ready to help you build something extraordinary.
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: prefersReducedMotion ? 0 : 0.2, ease: EASE_SMOOTH }}
              className="space-y-6 pt-4"
            >
              <a
                href="mailto:salmankhanm859@gmail.com"
                className="group flex items-start gap-4 p-4 rounded-xl hover:bg-foreground/5 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-mono uppercase text-muted-foreground mb-1">Email</p>
                  <p className="text-lg font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                    salmankhanm859@gmail.com
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-auto" />
              </a>

              <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-foreground/5 transition-colors duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-mono uppercase text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-serif text-foreground">
                    Worldwide <span className="text-muted-foreground font-normal italic">(Remote-First)</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={contactInView ? { opacity: 1 } : {}}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: 0.6 }}
              className="pt-6 flex items-center gap-4"
            >
              <div className="flex gap-2">
                {[{
                  label: "GitHub",
                  href: "https://github.com/salman053",
                  icon: <Github className="w-4 h-4" />
                }, {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/muhammadsalmankhan12",
                  icon: <Linkedin className="w-4 h-4" />
                }, {
                  label: "Mail",
                  href: "mailto:salmankhanm859@gmail.com",
                  icon: <Mail className="w-4 h-4" />
                }].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    whileHover={prefersReducedMotion ? undefined : { y: -2, backgroundColor: "hsl(var(--primary))" }}
                    className="px-3 py-1.5 text-sm font-mono uppercase tracking-wider rounded-md border border-foreground/15 text-muted-foreground hover:border-primary transition-colors duration-300 flex items-center gap-1"
                  >
                    {social.icon}
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Glassmorphic Form Container */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, delay: prefersReducedMotion ? 0 : 0.3, ease: EASE_PREMIUM }}
          >
            {/* Ambient glow behind form */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-[2.25rem] blur-xl opacity-0"
              animate={{ opacity: formFocused ? 0.6 : 0 }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />

            <div
              className={`relative p-6 md:p-10 rounded-[2rem] border transition-all duration-500 ${
                formFocused
                  ? "border-primary/40 bg-background/80 shadow-[0_8px_32px_rgba(var(--primary),0.15)]"
                  : "border-foreground/10 bg-muted/30 backdrop-blur-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-serif text-foreground">Send a Message</h3>
                <motion.div
                  animate={{ rotate: formFocused ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-muted-foreground"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Form with focus tracking */}
              <div onFocus={() => setFormFocused(true)} onBlur={() => setFormFocused(false)}>
                <AnimatedContactForm />
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
