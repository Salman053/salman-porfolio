"use client";
import { motion } from "framer-motion";
import { Code2, Rocket, Sparkles } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AboutSection() {
  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* === Animated Background Elements === */}
      {/* <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* === Left Side (Illustration / Image) === */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full bg-gradient-to-tr from-blue-500/50 via-purple-500/40 to-pink-500/40 p-1 shadow-2xl">
            <div className="w-full h-full bg-gray-500/20 rounded-full  flex items-center justify-center text-white text-5xl font-bold">
              <Avatar className="w-full h-full">
                <AvatarFallback>
                  <span className=" ">MSK</span>
                </AvatarFallback>
                <AvatarImage src={'/salman1.png'}/>
              </Avatar>
            </div>
            <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
        </motion.div>

        {/* === Right Side (Content) === */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            I’m <span className="font-semibold">Muhammad Salman Khan</span>, a
            passionate full-stack developer with a love for building modern,
            scalable, and user-centric applications. I enjoy turning complex
            problems into elegant digital solutions — blending creativity with
            clean code.
          </p>

          {/* === Info Highlights === */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-xl bg-card/80 backdrop-blur-xl border shadow-lg flex items-center gap-3"
            >
              <Code2 className="text-primary w-6 h-6" />
              <div>
                <h4 className="font-semibold">Fullstack Developer</h4>
                <p className="text-sm text-muted-foreground">
                  React, Next.js, Node.js
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-5 rounded-xl bg-card/80 backdrop-blur-xl border shadow-lg flex items-center gap-3"
            >
              <Rocket className="text-primary w-6 h-6" />
              <div>
                <h4 className="font-semibold">SaaS Builder</h4>
                <p className="text-sm text-muted-foreground">
                  POS, Scalable Apps
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
