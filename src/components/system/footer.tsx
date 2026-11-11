"use client";

import React from "react";
import { Github, Linkedin, Mail, MapPin, Heart, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="relative bg-background overflow-hidden border-t border-foreground/10">
      {/* Oversized watermark wordmark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 select-none pointer-events-none flex justify-center overflow-hidden"
      >
        <span className="text-[18vw] leading-none font-serif font-bold tracking-tighter text-foreground/[0.04] translate-y-[22%] whitespace-nowrap">
          SALMAN&nbsp;.
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-24">

          {/* Brand section */}
          <div className="lg:col-span-4">
            <div className="text-4xl font-bold font-serif tracking-tight text-foreground mb-6">
              Salman<span className="text-primary font-normal">&nbsp;.</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs leading-relaxed">
              Engineering high-impact digital experiences through clean software architecture and intuitive, human-centered design.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="stroke-[1.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Specialties */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-5">Specialties</h4>
            <ul className="flex flex-col gap-3.5 text-sm text-neutral-500 dark:text-neutral-400">
              {specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
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
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center text-[11px] font-mono text-neutral-400">
            <span>© {currentYear} MSK</span>
            <span className="mx-3 text-neutral-200 dark:text-neutral-800">|</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart size={10} className="text-primary fill-primary" aria-label="love" /> for the web
            </span>
          </div>

          <a
            href="#intro"
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-400 hover:text-primary transition-colors"
          >
            Back to top ↑
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
