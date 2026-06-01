"use client";
import { motion } from "framer-motion";
import { Code2, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Magnetic } from "../animated/magnetic";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-40 overflow-hidden bg-background">
      {/* Billion-Dollar Agency Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.03)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-end justify-between gap-12"
          >
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6 block">Identity & Vision</span>
              <h2 className="text-5xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-8">
                The Mind <br />
                <span className="text-primary italic">Behind</span>
              </h2>
            </div>
            <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-sm border-l-2 border-primary/20 pl-8 pb-2">
              A commitment to excellence through strategic engineering and visionary design.
            </p>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left Side: Brand Image */}
          <div className="relative flex justify-center lg:justify-start">
            <Magnetic strength={0.05}>
              <div className="relative w-72 h-72 md:w-[35rem] md:h-[35rem] rounded-full p-3 bg-gradient-to-tr from-primary via-secondary/50 to-primary/30 animate-gradient-flow shadow-2xl">
                 <div className="w-full h-full rounded-full overflow-hidden border-8 border-background bg-muted shadow-inner relative group">
                    <Avatar className="w-full h-full">
                      <AvatarFallback className="text-8xl font-black">SK</AvatarFallback>
                      <AvatarImage src={'/salman1.png'} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    </Avatar>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 </div>
                 
                 {/* Floating Strategic Markers */}
                 <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -top-6 -right-6 p-6 glass-premium rounded-[2rem] border border-white/10 shadow-2xl"
                 >
                   <Sparkles className="w-8 h-8 text-primary" />
                 </motion.div>
              </div>
            </Magnetic>
          </div>

          {/* Right Side: Narrative */}
          <div className="max-w-2xl">
            <div className="space-y-8 text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
              <p>
                I am <span className="text-foreground font-black">Muhammad Salman Khan</span>, a Full-Stack Architect specialized in constructing high-performance digital ecosystems.
              </p>
              <p>
                My practice is defined by a rigorous approach to scalable engineering and a relentless pursuit of aesthetic perfection. I bridge the gap between complex logic and visceral human experience.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-16">
              {[
                { icon: Code2, title: "System Architecture", desc: "Next.js, Node.js, Cloud-Native" },
                { icon: Rocket, title: "SaaS Innovation", desc: "From Concept to Global Scale" }
              ].map((item, i) => (
                <Magnetic key={i} strength={0.03}>
                  <div className="p-8 rounded-[2.5rem] glass-premium border border-white/5 hover:border-primary/20 transition-all duration-700 group h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <item.icon size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-base text-neutral-500 leading-relaxed">{item.desc}</p>
                  </div>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
