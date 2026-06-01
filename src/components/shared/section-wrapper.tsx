"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
}

export const SectionWrapper = ({
  children,
  className = "",
  id,
  stagger = true,
}: SectionWrapperProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.2 : 0,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={containerVariants}
      className={` ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={itemVariants as any}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};