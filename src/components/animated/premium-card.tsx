"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./magnetic";
interface PremiumCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
  className?: string;
}

export const PremiumCard = ({
  title,
  description,
  image,
  tags,
  href,
  className,
}: PremiumCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 300 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative h-full w-full rounded-[2.5rem] border border-white/5 bg-neutral-900/40 p-10 md:p-12 overflow-hidden transition-all duration-700 hover:border-primary/30 shadow-2xl",
        className
      )}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(var(--primary),0.1)_0%,transparent_80%)]" 
              style={{ 
                // @ts-ignore
                "--mouse-x": `${(x.get() + 0.5) * 100}%`,
                "--mouse-y": `${(y.get() + 0.5) * 100}%`
              }} 
         />
      </div>

      <div
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 flex h-full flex-col justify-between"
      >
        <div className="max-w-md">
          <div className="flex justify-between items-start mb-8">
             <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">Digital Asset</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none group-hover:text-primary transition-colors duration-500">
                  {title}
                </h3>
             </div>
             {href && (
                <Magnetic strength={0.3}>
                  <a href={href} target="_blank" className="w-14 h-14 rounded-2xl glass hover:bg-primary/10 transition-all flex items-center justify-center group/link">
                      <ArrowUpRight size={24} className="text-neutral-400 group-hover/link:text-primary transition-colors" />
                  </a>
                </Magnetic>
             )}
          </div>
          
          <p className="text-neutral-400 text-lg leading-relaxed mb-10 tracking-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            {description}
          </p>

          <div className="flex flex-wrap gap-3">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-xl bg-white/5 border border-white/10 text-neutral-500 group-hover:text-primary transition-all duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {image && (
        <motion.div 
          style={{
            transform: "translateZ(30px)",
          }}
          className="absolute -bottom-16 -right-16 w-3/4 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-6 group-hover:-translate-y-6"
        >
          <img src={image} alt={title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-1000" />
        </motion.div>
      )}
    </motion.div>
  );
};
