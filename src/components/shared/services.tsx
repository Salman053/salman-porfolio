"use client";

import { motion, useInView } from "framer-motion";
import { Code, Palette, Rocket, Cpu, Cloud, Lock } from "lucide-react";
import { useRef, useState } from "react";

const services = [
  {
    title: "Web Development",
    description:
      "Responsive, fast, and scalable websites tailored to your business.",
    icon: <Code className="w-7 h-7 text-blue-500" />,
    color: "blue",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive and elegant interfaces with modern design systems.",
    icon: <Palette className="w-7 h-7 text-pink-500" />,
    color: "pink",
  },
  {
    title: "AI Solutions",
    description: "Smart applications powered with AI to enhance your workflow.",
    icon: <Cpu className="w-7 h-7 text-purple-500" />,
    color: "purple",
  },
  {
    title: "Deployments",
    description:
      "Reliable cloud architecture with seamless deployment pipelines.",
    icon: <Cloud className="w-7 h-7 text-cyan-500" />,
    color: "cyan",
  },
  {
    title: "Product Launch",
    description: "From MVP to scaling — helping you launch and grow faster.",
    icon: <Rocket className="w-7 h-7 text-green-500" />,
    color: "green",
  },
  {
    title: "Security",
    description: "Making sure that the system is secure with latest algorithms",
    icon: <Lock className="w-7 h-7 text-green-500" />,
    color: "green",
  },
];
export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `linear-gradient(45deg, ${
                ["#3b82f6", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"][i % 5]
              }, transparent)`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground">
          Our <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
        </h2>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Delivering clean, reliable, and scalable solutions that bring real
          value.
        </motion.p>
      </motion.div>

      {/* Grid */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

const ServiceCard = ({ service, index, isInView }: { service: any; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg transition-all duration-500 group overflow-hidden"
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 -z-10 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.3" />
          <line x1="30" y1="0" x2="30" y2="100" stroke="currentColor" strokeWidth="0.3" />
          <line x1="60" y1="0" x2="60" y2="100" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>
      
      {/* Animated gradient orb */}
      <motion.div
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-20 group-hover:opacity-30 blur-xl"
        animate={{
          background: isHovered 
            ? [`radial-gradient(circle, #3b82f6, transparent)`, `radial-gradient(circle, #ec4899, transparent)`]
            : `radial-gradient(circle, #8b5cf6, transparent)`,
          scale: isHovered ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with floating animation */}
        <motion.div
          animate={{ 
            y: isHovered ? [-5, 5, -5] : 0,
            rotate: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{ 
            duration: 3, 
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 text-white shadow-lg"
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
          {service.title}
        </h3>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-500"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
        >
          {service.description}
        </motion.p>
        
        {/* Hover indicator line */}
        <motion.div 
          className="h-1 mt-4 bg-gradient-to-r from-blue-500/10 to-purple-500/20 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `linear-gradient(45deg, ${service.color || "#3b82f6"}, ${service.accentColor || "#8b5cf6"})`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: [0, -40],
                x: [0, (Math.random() - 0.5) * 30],
              }}
              transition={{
                duration: Math.random() * 1.5 + 1,
                ease: "easeOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
      
      {/* Subtle border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
        initial={{ opacity: 0, borderColor: "transparent" }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          borderColor: isHovered ? ["#3b82f6", "#8b5cf6", "#3b82f6"] : "transparent"
        }}
        transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
      />
    </motion.div>
  );
};