"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 1000);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Subtle animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-purple-600/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
        {/* Animated logo/name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Muhammad Salman Khan
            </span>
          </h1>
          <p className="mt-2 text-slate-400 font-light">Creative Web Developer</p>
        </motion.div>

        {/* Elegant progress indicator */}
        <div className="w-80 max-w-full mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-light">
            <span>Loading Portfolio</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-px w-full bg-slate-700 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Minimalist rotating element */}
        <motion.div
          className="relative mb-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full border border-slate-600/50 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-slate-500/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
          </div>
        </motion.div>

        {/* Subtle status messages */}
        <motion.div
          className="text-sm text-slate-400 font-light max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>Curating the best of my work for you...</p>
        </motion.div>
      </div>

      {/* Subtle corner elements */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-slate-500/40"></div>
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-slate-500/40"></div>
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-slate-500/40"></div>
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-slate-500/40"></div>
    </div>
  );
}