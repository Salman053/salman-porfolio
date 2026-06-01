"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight, Download, Check, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import AnimatedThemeToggler from "../animated/animated-theme-toggler";

// Premium easing curves
const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_SOFT = [0.4, 0, 0.2, 1] as const;

interface NavItem {
  name: string;
  href: string;
  isButton?: boolean;
  action?: "download";
}

const navItems: NavItem[] = [
  { name: "Intro", href: "#intro" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Works", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Why Hire Me", href: "#why" },
  { name: "Education", href: "#education" },
  { name: "About", href: "#about" },
  { name: "Resume", href: "#resume", isButton: true, action: "download" },
];

const HEADER_HEIGHT = 80;
const SCROLL_THRESHOLD = 64;

export const MinimalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD], 
    ["transparent", "hsl(var(--background) / 0.92)"]
  );
  
  const headerBlur = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD], 
    [0, 24]
  );
  
  const headerShadow = useTransform(
    scrollY, 
    [0, SCROLL_THRESHOLD], 
    ["0 0 0 transparent", "0 4px 24px -8px hsl(var(--foreground) / 0.15)"]
  );

  const backdropFilterValue = useTransform(headerBlur, (v) => 
    v > 12 ? `blur(${v}px) saturate(180%)` : "none"
  );

  // Optimized scroll handler
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > SCROLL_THRESHOLD;
    if (shouldBeScrolled !== (document.body.dataset.scrolled === "true")) {
      document.body.dataset.scrolled = String(shouldBeScrolled);
    }
  });

  // Memoized scroll function
  const scrollToSection = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = HEADER_HEIGHT + 16;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      const sectionId = href.replace("#", "");
      setActiveSection(sectionId);
      window.history.pushState(null, "", href);
    }
  }, []);

  // Optimized download handler
  const downloadResume = useCallback(() => {
    try {
      const link = document.createElement("a");
      link.href = "/Salman_Resume.pdf";
      link.download = "Salman_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, []);

  const handleNavClick = useCallback((item: NavItem) => {
    setIsOpen(false);
    
    if (item.isButton && item.action === "download") {
      downloadResume();
      return;
    }
    
    scrollToSection(item.href);
  }, [downloadResume, scrollToSection]);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

          if (visible[0]?.target.id) {
            const newSection = visible[0].target.id;
            if (newSection !== activeSection) {
              setActiveSection(newSection);
              if (window.location.hash !== `#${newSection}`) {
                window.history.replaceState(null, "", `#${newSection}`);
              }
            }
          }
        },
        {
          threshold: [0.25, 0.5, 1],
          rootMargin: `-${HEADER_HEIGHT}px 0px -40% 0px`
        }
      );

      navItems
        .filter(item => !item.isButton)
        .forEach(item => {
          const el = document.getElementById(item.href.slice(1));
          if (el) observerRef.current?.observe(el);
        });
    }, 300);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [mounted, activeSection]);

  useEffect(() => {
    setMounted(true);
    
    const hash = window.location.hash.slice(1);
    if (hash && navItems.some(item => item.href === `#${hash}`)) {
      setActiveSection(hash);
      setTimeout(() => scrollToSection(`#${hash}`), 50);
    }
  }, [scrollToSection]);

  useEffect(() => {
    if (!isOpen) return;
    
    const scrollYPos = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${scrollYPos}px`;
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollYPos);
    };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, item: NavItem) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavClick(item);
    }
  }, [handleNavClick]);

  // Loading skeleton
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-12 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-8 w-28 bg-muted/50 rounded-lg animate-pulse" />
          <div className="hidden md:flex items-center gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 w-14 bg-muted/50 rounded animate-pulse" />
            ))}
            <div className="h-9 w-9 bg-muted/50 rounded-full animate-pulse ml-4" />
            <div className="h-9 w-20 bg-muted/50 rounded-full animate-pulse ml-2" />
          </div>
          <div className="md:hidden flex gap-2">
            <div className="h-9 w-9 bg-muted/50 rounded-full animate-pulse" />
            <div className="h-9 w-9 bg-muted/50 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Skip to content */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-background focus:border focus:border-primary focus:rounded-lg focus:text-foreground focus:font-medium transition-all"
      >
        Skip to content
      </a>

      <motion.header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-12 py-4 transition-all duration-300"
        style={{
          backgroundColor: headerBg,
          backdropFilter: backdropFilterValue,
          boxShadow: headerShadow,
          borderBottom: "1px solid transparent"
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <motion.a
            href="#intro"
            onClick={(e) => { e.preventDefault(); handleNavClick({ name: "Intro", href: "#intro" }); }}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE_PREMIUM }}
            className="group flex items-center gap-1.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-serif">
              Salman
            </span>
            <motion.span 
              className="text-primary text-xl sm:text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              .
            </motion.span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = !item.isButton && activeSection === sectionId;
              
              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, item)}
                  role="menuitem"
                  className={`relative px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer
                    ${isActive 
                      ? "text-foreground bg-primary/5" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                  
                  {item.isButton && (
                    <span className="inline-flex items-center ml-1.5">
                      <AnimatePresence mode="wait" initial={false}>
                        {downloadSuccess && item.name === "Resume" ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Check size={12} className="text-primary" />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="download"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                          >
                            <Download size={12} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-border/60">
            <AnimatedThemeToggler variant="glitch" />

            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick({ name: "Contact", href: "#contact" }); }}
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border/60 
                text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground
                hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Contact
                <ArrowUpRight 
                  size={11} 
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 
                transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-foreground hover:bg-muted/60 transition-colors 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_SOFT }}
            className="fixed inset-0 z-[110] bg-background/98 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.02, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              />
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { 
                  transition: { 
                    staggerChildren: 0.06, 
                    delayChildren: 0.1 
                  } 
                }
              }}
              className="relative flex flex-col h-full px-6 pt-28 pb-8"
            >
              <motion.button
                onClick={() => setIsOpen(false)}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                className="absolute top-5 right-5 p-2.5 rounded-xl text-muted-foreground hover:text-foreground 
                  hover:bg-muted/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer"
                aria-label="Close menu"
                whileTap={{ scale: 0.92 }}
              >
                <X size={22} strokeWidth={2.5} />
              </motion.button>

              <nav className="flex flex-col gap-2 flex-1 overflow-y-auto" role="menu">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = !item.isButton && activeSection === sectionId;
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      role="menuitem"
                      variants={{ 
                        hidden: { opacity: 0, x: -24, y: 8 }, 
                        visible: { opacity: 1, x: 0, y: 0 } 
                      }}
                      className={`group relative text-left py-4 px-2 rounded-xl transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                        ${isActive 
                          ? "text-foreground bg-muted/40" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        }`}
                      whileTap={{ scale: 0.99 }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={`text-3xl font-serif tracking-tight font-medium ${isActive ? "text-foreground" : ""}`}>
                        {item.name}
                      </span>
                      
                      {item.isButton && (
                        <span className="inline-flex items-center ml-3 align-middle">
                          <AnimatePresence mode="wait" initial={false}>
                            {downloadSuccess && item.name === "Resume" ? (
                              <motion.span
                                key="check-mobile"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check size={22} className="text-primary" />
                              </motion.span>
                            ) : (
                              <Download size={20} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                            )}
                          </AnimatePresence>
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                className="pt-6 border-t border-border/60"
              >
                <motion.button
                  onClick={() => { setIsOpen(false); handleNavClick({ name: "Contact", href: "#contact" }); }}
                  className="group inline-flex items-center gap-2.5 text-lg font-medium text-muted-foreground 
                    hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 py-1 cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Collaborate 
                  <ArrowUpRight 
                    size={18} 
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" 
                  />
                </motion.button>

                <div className="mt-5 flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Theme</span>
                  <AnimatedThemeToggler variant="glitch" />
                </div>

                <p className="mt-8 text-xs font-mono text-muted-foreground/60 tracking-wide">
                  © {new Date().getFullYear()} Salman Khan. All rights reserved.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};