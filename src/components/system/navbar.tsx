"use client";

import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const navItems = [
  {
    name: "Services",
    link: "#services",
  },
  {
    name: "Projects",
    link: "#projects",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Education",
    link: "#education",
  },
  {
    name: "Why",
    link: "#why",
  },
  {
    name: "Testimonial",
    link: "#testimonial",
  },
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Contact",
    link: "#contact",
  },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
const [feedbackModalOpen,setFeedbackModalOpen]=useState(false)
  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full select-none">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="navbar-glass-effect bg-background/30 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg backdrop-blur-md border border-white/10 dark:border-gray-800/30">
          {/* Logo */}
          <a href="#intro" className="navbar-logo flex items-center mr-8">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-background-500 to-secondary-500 flex items-center justify-center text-foreground font-bold shadow-lg">
              Sk
            </div>
            <span className="ml-2 text-nowrap font-semibold text-foreground ">
              Salman Dev
            </span>
          </a>

          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="nav-item px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-accent/50 hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-6 p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors duration-300 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed  top-0 left-0 right-0 z-50">
        <div className="navbar-glass-effect px-4 py-3 flex items-center justify-between backdrop-blur-md border-b border-white/10 dark:border-gray-800/30">
          {/* Logo */}
          <a href="#" className="navbar-logo flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
              SK
            </div>
            <span className="ml-2 font-semibold text-foreground">
              Fusion Dev
            </span>
          </a>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-accent/50 hover:bg-accent transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full cursor-pointer bg-accent/50 hover:bg-accent transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="navbar-glass-effect backdrop-blur-md border-b border-white/10 dark:border-gray-800/30">
            <div className="px-4 py-3 flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="nav-item px-4 py-3  rounded-xl text-base font-medium transition-all duration-300 hover:bg-accent/50 hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
