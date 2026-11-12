"use client";

import React, { useRef } from "react";
import { Github, Linkedin, Mail, MapPin, Heart, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reduce = useReducedMotion();
  const motionOn = !reduce;

  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });

  // All transforms declared unconditionally (rules of hooks).
  const watermarkY = useTransform(smooth, [0, 1], ["18%", "0%"]);
  const watermarkScale = useTransform(smooth, [0, 1], [0.94, 1]);
  const brandY = useTransform(smooth, [0, 1], [40, 0]);
  const linksY = useTransform(smooth, [0, 1], [60, 0]);
  const contactY = useTransform(smooth, [0, 1], [80, 0]);
  const topRowY = useTransform(smooth, [0, 1], [30, 0]);
  const opacity = useTransform(smooth, [0, 0.35], [0, 1]);

  const glowY = useTransform(smooth, [0, 1], [80, -40]);
  const glowOpacity = useTransform(smooth, [0, 0.5, 1], [0, 0.06, 0.1]);

  const socialY0 = useTransform(smooth, [0, 1], [20, 0]);
  const socialY1 = useTransform(smooth, [0, 1], [28, 0]);
  const socialY2 = useTransform(smooth, [0, 1], [36, 0]);
  const socialYs = [socialY0, socialY1, socialY2];

  const socials = [
    { icon: Github, href: "https://github.com/Salman053", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/muhammadsalmankhan12", label: "LinkedIn" },
    { icon: Mail, href: "mailto:salmankhanm859@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const specialties = [
    "Full-Stack Systems",
    "SaaS Architecture",
    "Experience Design",
    "Cloud Integration",
    "AI Orchestration",
  ];

  const parallax = (y: typeof brandY) => (motionOn ? { y } : undefined);

  return (
    <footer
      ref={footerRef}
      className="relative bg-background overflow-hidden border-t border-foreground/10"
    >
      {/* Watermark — slowest layer */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none flex justify-center overflow-hidden"
        style={
          motionOn ? { y: watermarkY, scale: watermarkScale, opacity } : undefined
        }
      >
        <span className="text-[20vw] leading-none font-serif font-bold tracking-tighter text-primary/[0.3] blur-xs translate-y-[22%] whitespace-nowrap">
          SALMAN&nbsp;
          <span className="text-[30vw] absolute bottom-0">.</span>
        </span>
      </motion.div>

      {/* Rising glow accent */}
      {motionOn && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            y: glowY,
            opacity: glowOpacity,
            background: "var(--color-primary)",
          }}
        />
      )}

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-24"
          style={parallax(topRowY)}
        >
          {/* Brand — fastest reveal */}
          <motion.div className="lg:col-span-4" style={parallax(brandY)}>
            <div className="text-4xl font-bold font-serif tracking-tight text-foreground mb-6">
              Salman<span className="text-primary font-normal">&nbsp;.</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs leading-relaxed">
              Engineering high-impact digital experiences through clean software architecture and intuitive, human-centered design.
            </p>

            <div className="flex items-center gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={motionOn ? { y: socialYs[i] } : undefined}
                  className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="stroke-[1.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div className="lg:col-span-2" style={parallax(linksY)}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Explore</h4>
            <nav className="flex flex-col gap-3.5" aria-label="Footer navigation">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors font-sans"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Specialties */}
          <motion.div className="lg:col-span-3" style={parallax(linksY)}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Specialties</h4>
            <ul className="flex flex-col gap-3.5 text-sm text-neutral-500 dark:text-neutral-400">
              {specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Contact — deepest layer */}
          <motion.div className="lg:col-span-3" style={parallax(contactY)}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Get in Touch</h4>
            <div className="flex flex-col gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <a
                href="mailto:salmankhanm859@gmail.com"
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail size={15} className="text-neutral-400 stroke-[1.5] shrink-0 group-hover:text-primary transition-colors" />
                <span className="truncate">salmankhanm859@gmail.com</span>
                <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-neutral-400 stroke-[1.5] shrink-0" />
                <span>Kohat, Pakistan</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-6"
          style={parallax(topRowY)}
        >
          <div className="flex items-center text-[11px] font-mono text-neutral-400">
            <span>© {currentYear} MUHAMMAD SALMAN KHAN</span>
            <span className="mx-3 text-neutral-200 dark:text-neutral-800">|</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart size={10} className="text-primary fill-primary" aria-label="love" /> for the web
            </span>
          </div>

          {/* <a
            href="#intro"
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 hover:text-primary transition-colors"
          >
            Back to top ↑
          </a> */}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;