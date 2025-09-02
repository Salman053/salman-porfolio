"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const techs = [
  { id: 1, name: "React", logo: "/tech/react.svg" },
  { id: 2, name: "Next.js", logo: "/tech/nextjs.svg" },
  { id: 3, name: "Node.js", logo: "/tech/nodejs.svg" },
  { id: 4, name: "Tailwind", logo: "/tech/tailwind.svg" },
  { id: 5, name: "TypeScript", logo: "/tech/typescript.svg" },
  { id: 6, name: "Firebase", logo: "/tech/firebase.svg" },
  { id: 7, name: "MongoDB", logo: "/tech/mongodb.svg" },
  { id: 8, name: "Express", logo: "/tech/express.svg" },
];

// Duplicate array for seamless loop
const loopTechs = [...techs, ...techs];

const TechMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 py-6">
      <motion.div
        className="flex gap-16 items-center"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopTechs.map((tech) => (
          <div
            key={tech.id + Math.random()}
            className="flex flex-col items-center justify-center w-28"
          >
            <Image
              src={tech.logo}
              alt={tech.name}
              width={48}
              height={48}
              className="drop-shadow-md hover:scale-110 transition-transform duration-300"
            />
            <span className="text-sm mt-2 text-neutral-600 dark:text-neutral-300">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* gradient fade edges */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent pointer-events-none" />
    </div>
  );
};

export default TechMarquee;
