"use client";
import React from "react";
import { HeroHighlight, Highlight } from "../animated/hero-highlight";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { GlobeSection } from "../3d/globe-section";

const backgroundCards = [
  { id: 1, color: "from-purple-500/40 to-pink-500/40", x: 600, y: -50 },
  { id: 2, color: "from-blue-500/40 to-cyan-500/40", x: -500, y: -300 },
  { id: 3, color: "from-green-500/40 to-emerald-500/40", x: -120, y: 300 },
];

const HeroText = () => {
  return (
    <HeroHighlight containerClassName="relative h-screen flex flex-col gap-8 items-center justify-center overflow-hidden">
      <section id="intro">
        {/* <GlobeSection className="absolute top-0 " /> */}
        {/* Background Animated Cards */}
        {/* <div className="absolute inset-0 -z-10 flex justify-center items-center">
          {backgroundCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: card.x > 0 ? 300 : -200, y: card.y }}
              animate={{
                opacity: 1,
                x: [card.x, card.x + 40, card.x - 80, card.x],
                y: [card.y, card.y - 90, card.y + 35, card.y],
                rotate: [0, 3, -3, 0],
                scale: [1, 1.05, 0.98, 1],
              }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                delay: i * 0.9,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={`absolute rounded-full w-64 h-40 bg-gradient-to-br ${card.color} 
              blur-xl shadow-2xl`}
            />
          ))}
        </div> */}

        {/* Hero Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold 
        text-neutral-700 dark:text-white max-w-4xl leading-relaxed 
        lg:leading-snug text-center mx-auto relative z-10"
        >
          Transforming <Highlight className="bg-red-400/20">ideas</Highlight> into{" "}
          <Highlight >digital experiences</Highlight> – I'm{" "}
          <Highlight>Salman Khan</Highlight>, a passionate web developer
        </motion.h1>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex gap-4 mt-4 text-center justify-center"
        >
          {/* Primary button */}
          <a href="#contact">
            <Button
              size={"lg"}
              className="rounded-xl shadow-lg text-lg px-6  bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 transition"
            >
              Contact Me
            </Button>
          </a>

          {/* Secondary button */}
          <a href="#projects">
            <Button
              variant={"outline"}
              size={"lg"}
              className="rounded-xl shadow-md text-lg px-6  hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              My Work
            </Button>
          </a>
        </motion.div>
      </section>
    </HeroHighlight>
  );
};

export default HeroText;
