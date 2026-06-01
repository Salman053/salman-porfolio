"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Jasir Khan",
    role: "University Student",
    text: "Eazy POS has completely transformed the way I manage sales. It's fast, intuitive, and makes running my business stress-free!",
  },
  {
    name: "Atta ur Rehman",
    role: "University Student",
    text: "Working with Salman was amazing! His eye for detail and clean coding style made my portfolio shine online.",
  },
  {
    name: "Kamal Ali",
    role: "Business Owner",
    text: "Salman delivers beyond expectations. He built our SaaS platform with performance, scalability, and design excellence in mind.",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonial" className="relative py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Label */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
            Client Impact
          </span>
        </div>

        {/* Big Quote Slider */}
        <div className="relative max-w-5xl mx-auto min-h-[350px] md:min-h-[300px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center text-center"
            >
              <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif italic font-light tracking-tight leading-relaxed text-foreground max-w-4xl">
                “{testimonials[current].text}”
              </blockquote>
              
              <cite className="not-italic mt-12 block">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary">
                  {testimonials[current].name}
                </span>
                <span className="mx-3 text-neutral-300 dark:text-neutral-700">/</span>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                  {testimonials[current].role}
                </span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 mt-16">
          {/* Prev */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Page Indicator */}
          <div className="text-xs font-mono text-neutral-400">
            <span>{(current + 1).toString().padStart(2, "0")}</span>
            <span className="mx-2 text-neutral-300 dark:text-neutral-700">/</span>
            <span>{testimonials.length.toString().padStart(2, "0")}</span>
          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
