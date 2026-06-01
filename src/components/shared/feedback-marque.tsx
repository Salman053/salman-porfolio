"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, User, ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { useFirestoreData } from "@/hooks/use-firebase-data";
import GridDistortion from "../animated/grid-distortion";
import { FlickeringBackground } from "../animated/flicker-background";
import { FlickeringGrid } from "../magicui/flickering-grid";

interface FeedbackData {
  email: string;
  id?: string;
  note: string;
  rating: number;
  timestamp: string;
}

const mockFeedback: FeedbackData[] = [
  {
    email: "ahmed.raza@hotmail.com",
    note: "Bohat khoobsurat portfolio hai.",
    rating: 5,
    timestamp: "2025-09-02T16:41:53Z",
  },
  {
    email: "fatima_khan@yahoo.com",
    note: "Aap ka kaam bohat acha hai. UI bohat aasan aur khoobsurat hai.",
    rating: 5,
    timestamp: "2025-09-01T09:30:15Z",
  },
  {
    email: "ibrahim.malik@gmail.com",
    note: "Impressive portfolio. Good job",
    rating: 4,
    timestamp: "2025-08-31T06:20:45Z",
  },
  {
    email: "aisha.siddiqui@outlook.com",
    note: "Good! the animation effect are impressive",
    rating: 5,
    timestamp: "2025-08-30T12:15:30Z",
  },
  {
    email: "muhammad.ali@protonmail.com",
    note: "Kamal ka portfolio hai",
    rating: 4,
    timestamp: "2025-08-29T05:10:10Z",
  },
];

const FeedbackShowcase = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { feedbacks, loading, error } = useFirestoreData();

  useEffect(() => {
    const combinedData = [...feedbacks, ...mockFeedback];
    const uniqueData = combinedData.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.email === item.email)
    );
    setFeedbackData(uniqueData);
  }, [feedbacks]);

  useEffect(() => {
    if (isHovered || feedbackData.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbackData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [feedbackData.length, isHovered]);

  if (loading) {
    return <FeedbackLoader />;
  }

  if (error) {
    return null;
  }

  const nextFeedback = () => {
    setActiveIndex((prev) => (prev + 1) % feedbackData.length);
  };

  const prevFeedback = () => {
    setActiveIndex(
      (prev) => (prev - 1 + feedbackData.length) % feedbackData.length
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={12}
            className={
              index < rating 
                ? "fill-primary text-primary stroke-[1.5]" 
                : "text-neutral-200 dark:text-neutral-800 stroke-[1.5]"
            }
          />
        ))}
      </div>
    );
  };

  if (feedbackData.length === 0) return null;

  return (
    <div 
      className="w-full py-12 md:py-40 bg-transparent overflow-hidden relative border-t border-foreground/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

  <FlickeringGrid />
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-3 md:mb-24">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">
            Community Log
          </span>
          <h2 className="text-5xl md:text-8xl font-normal font-serif tracking-tight leading-tight text-foreground">
            Visitor <span className="italic font-light text-primary">reflections</span>
          </h2>
        </div>

        {/* Showcase Slider */}
        <div className="relative max-w-4xl mx-auto min-h-[350px] flex flex-col justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full border border-foreground/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center justify-center text-center bg-neutral-50/10 dark:bg-neutral-900/10"
            >
              {/* Rating stars */}
              <div className="mb-8">
                {renderStars(feedbackData[activeIndex].rating)}
              </div>

              {/* Note */}
              <blockquote className="text-xl md:text-2xl font-serif text-foreground leading-relaxed max-w-2xl mb-10">
                “{feedbackData[activeIndex].note}”
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center bg-background text-neutral-400">
                  <User size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-mono  tracking-widest text-foreground font-bold">
                    {feedbackData[activeIndex].email.split("@")[0] || "Guest Explorer"}
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-400 mt-1">
                    {formatDate(feedbackData[activeIndex].timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-8 md:mt-12">
          <button
            onClick={prevFeedback}
            className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="text-xs font-mono text-neutral-400">
            <span>{(activeIndex + 1).toString().padStart(2, "0")}</span>
            <span className="mx-2 text-neutral-300 dark:text-neutral-700">/</span>
            <span>{feedbackData.length.toString().padStart(2, "0")}</span>
          </div>

          <button
            onClick={nextFeedback}
            className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

// Loading Component
const FeedbackLoader = () => {
  return (
    <div className="w-full py-40 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <motion.div
          className="w-10 h-10 border-t-2 border-primary border-solid rounded-full animate-spin mb-4 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Loading reflections...
        </p>
      </div>
    </div>
  );
};

export default FeedbackShowcase;
