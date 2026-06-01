"use client";

import React from "react";
import { Github, Linkedin, Mail, MapPin, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background pt-32 pb-16 overflow-hidden border-t border-foreground/10">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="text-4xl font-normal font-serif tracking-tight text-foreground mb-6">
              MSK<span className="text-primary">.</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs leading-relaxed">
              Engineering high-impact digital experiences through clean software architecture and intuitive, human-centered design.
            </p>
            
            {/* Minimal Social Links */}
            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/Salman053", label: "Github" },
                { icon: Linkedin, href: "https://linkedin.com/in/muhammadsalmankhan12", label: "LinkedIn" },
                { icon: Mail, href: "mailto:salmankhanm859@gmail.com", label: "Email" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="stroke-[1.5]" />
                  <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-6">Explore</h4>
            <div className="flex flex-col gap-4">
              {["Services", "Projects", "Experience", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-neutral-500 hover:text-foreground transition-colors font-sans"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-6">Specialties</h4>
            <div className="flex flex-col gap-4 text-sm text-neutral-500">
              <p>Full-Stack Systems</p>
              <p>SaaS Architecture</p>
              <p>Experience Design</p>
              <p>Cloud Integration</p>
              <p>AI Orchestration</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-6">Location</h4>
            <div className="flex flex-col gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-400 stroke-[1.5]" />
                <span>salmankhanm859@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-neutral-400 stroke-[1.5]" />
                <span>Kohat, Pakistan</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center text-xs font-mono text-neutral-400">
            <span>© {currentYear} MSK</span>
            <span className="mx-3 text-neutral-200 dark:text-neutral-800">|</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart size={10} className="text-primary fill-primary" /> for the web
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            
          
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
