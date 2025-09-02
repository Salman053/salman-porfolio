"use client";
import React from "react";
import { HeroHighlight, Highlight } from "../animated/hero-highlight";
import { motion } from "framer-motion";
import MagicButton from "./magic-button";
import MagicSecondaryButton from "./magic-secondary-button";
import { Sparkles, ArrowDown, Github, Linkedin, Download } from "lucide-react";
import EarthBanner from "./earth-banner";

const HeroText = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroHighlight 
      containerClassName="relative h-screen  flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <EarthBanner className="absolute opacity-75 top-20 flex items-center justify-center"/>

      {/* Main content */}
      <section id="intro" className="relative z-10 -mt-6  flex flex-col items-center justify-center text-center px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-purple-300 mb-8 border border-purple-500/20 shadow-lg"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Available for new projects
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl md:text-4xl  font-bold text-neutral-700 dark:text-white max-w-6xl leading-tight lg:leading-tight mb-6"
        >
          Transforming <Highlight className="bg-purple-500/20 text-purple-300">ideas</Highlight> into{" "}
          <Highlight className="bg-cyan-500/20 text-cyan-300">digital experiences</Highlight>
          <br />
          I'm <Highlight className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Salman Khan</Highlight>, a passionate developer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mb-10 font-light"
        >
          I craft responsive, performant web applications with modern technologies and creative solutions.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <MagicButton
            text="Get In Touch"
            onClick={() => scrollToSection("contact")}
          />
          <MagicSecondaryButton
            text="View My Work"
            onClick={() => scrollToSection("projects")}
          />
        </motion.div>

       
      </section>

      
    </HeroHighlight>
  );
};

export default HeroText;