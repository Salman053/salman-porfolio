"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Jasir Khan",
    role: "University student",
    // image: "/avatars/ali.jpg",
    text: "Eazy POS has completely transformed the way I manage sales. It's fast, intuitive, and makes running my business stress-free!",
  },
  {
    name: "Atta ur rehman",
    role: "University student",
    // image: "/avatars/sara.jpg",
    text: "Working with Salman was amazing! His eye for detail and clean coding style made my portfolio shine online.",
  },
  {
    name: "Kamal Ali",
    role: "Shoe Shop Owner",
    // image: "/avatars/david.jpg",
    text: "Salman delivers beyond expectations. He built our SaaS platform with performance, scalability, and design excellence in mind.",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 6s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonial" className="relative py-24 overflow-hidden">
      {/* === Animated Blobs Background === */}
      <motion.div
        className="absolute -bottom-4 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          What People <span className="text-primary">Say</span>
        </h2>

        {/* Testimonial Card */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-xl border rounded-2xl p-10 shadow-2xl relative"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            “{testimonials[current].text}”
          </p>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-14 h-14">
              {/* <AvatarImage src={testimonials[current]?.image || ""} alt={testimonials[current].name} /> */}
              <AvatarFallback>{testimonials[current].name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{testimonials[current].name}</h4>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>

          {/* Speech-bubble tail */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-card border-b border-r"></div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-primary" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
