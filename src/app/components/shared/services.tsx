"use client";

import { motion } from "framer-motion";
import { Code, Palette, Rocket, Cpu, Cloud } from "lucide-react";
import StarsCanvas from "../animated/start-background";

const services = [
  {
    title: "Web Development",
    description:
      "Responsive, fast, and scalable websites tailored to your business.",
    icon: <Code className="w-7 h-7 text-blue-500" />,
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive and elegant interfaces with modern design systems.",
    icon: <Palette className="w-7 h-7 text-pink-500" />,
  },
  {
    title: "AI Solutions",
    description: "Smart applications powered with AI to enhance your workflow.",
    icon: <Cpu className="w-7 h-7 text-purple-500" />,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Reliable cloud architecture with seamless deployment pipelines.",
    icon: <Cloud className="w-7 h-7 text-cyan-500" />,
  },
  {
    title: "Product Launch",
    description: "From MVP to scaling — helping you launch and grow faster.",
    icon: <Rocket className="w-7 h-7 text-green-500" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-6 md:px-12 bg-background overflow-hidden">
  
      {/* Animated background threads */}
      <div className="absolute inset-0 -z-10">
        {/* Horizontal thread */}
        <motion.div
          animate={{ x: ["0%", "10%", "0%"] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/40 to-transparent"
        />
        {/* Diagonal thread */}
        <motion.div
          animate={{ y: ["0%", "15%", "0%"] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"
        />
        {/* Another soft layer */}
        <motion.div
          animate={{ x: ["0%", "-8%", "0%"], y: ["0%", "8%", "0%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute right-1/4 bottom-0 h-full w-px bg-gradient-to-b from-transparent via-pink-500/20 to-transparent"
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Our <span className="text-gradient">Services</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Delivering clean, reliable, and scalable solutions that bring real
          value.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg transition-all duration-500 group"
          >
            {/* Border animation */}
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/40 transition-all duration-500" />

            {/* Icon */}
            <div className="mb-6">{service.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
