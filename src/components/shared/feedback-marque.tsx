"use client";
import React, { useEffect, useState, useRef, useDebugValue } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { collection, Firestore, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { formatDate } from "@/lib/date-utils";
import { useFirestoreData } from "@/hooks/use-firebase-data";

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
    note: "Impressive porfolio. Good job",
    rating: 4,
    timestamp: "2025-08-31T06:20:45Z",
  },
  {
    email: "aisha.siddiqui@outlook.com",
    note: "Good! the animation effect are impressive ",
    rating: 5,
    timestamp: "2025-08-30T12:15:30Z",
  },
  {
    email: "muhammad.ali@protonmail.com",
    note: "Kamal ka portfolio hai",
    rating: 4,
    timestamp: "2025-08-29T05:10:10Z",
  },
  {
    email: "zainab.akram@gmail.com",
    note: "Acha hai lekin mazeed project examples ka izafa karein to behtar ho ga.",
    rating: 3,
    timestamp: "2025-08-28T10:45:22Z",
  },
  {
    email: "usman.qureshi@icloud.com",
    note: "Salman bhai kamal kia hai",
    rating: 5,
    timestamp: "2025-09-03T08:22:17Z",
  },
];

const FeedbackShowcase = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { feedbacks, loading, error } = useFirestoreData();

  useEffect(() => {
    const combinedData = [...feedbacks, ...mockFeedback];

    // Remove duplicates based on email (optional)
    const uniqueData = combinedData.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.email === item.email)
    );

    setFeedbackData(uniqueData);
  }, [feedbacks]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered || feedbackData.length === 0) return; // Pause when user hovers or no data

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % feedbackData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [feedbackData.length, isHovered]);

  // Display loading/error states in your component
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

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  // Get unique color based on email for consistency
  const getColorFromEmail = (email: string) => {
    const colors = [
      "from-purple-500/20 to-pink-500/20",
      "from-blue-500/20 to-cyan-500/20",
      "from-green-500/20 to-emerald-500/20",
      "from-orange-500/20 to-amber-500/20",
      "from-rose-500/20 to-red-500/20",
      "from-indigo-500/20 to-violet-500/20",
    ];

    const hash = email
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="w-full py-16 mt-12 rounded-3xl overflow-hidden relative">
      {/* Background blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          Visitor Feedback
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-600 dark:text-neutral-400 mt-3 text-lg"
        >
          What people are saying about my portfolio
        </motion.p>
      </div>

      {/* Main showcase */}
      <div
        className="relative max-w-5xl mx-auto h-96"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Central card */}
        <div className="relative h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`absolute w-11/12 md:w-3/4  ${getColorFromEmail(
                feedbackData[activeIndex].email
              )} backdrop-blur-md bg-background/80 rounded-3xl p-8 shadow-2xl border border-white/10`}
            >
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/20" />
              <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-white/20 rotate-180" />

              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 italic mb-6 text-center">
                    "{feedbackData[activeIndex].note}"
                  </p>
                </div>

                <div className="flex flex-col items-center mt-6">
                  <div className="flex mb-3">
                    {renderStars(feedbackData[activeIndex].rating)}
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                        <User size={20} className="text-white" />
                      </div>
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">
                        {feedbackData[activeIndex].email.split("@")[0] ||
                          "Unknown"}
                      </p>
                    </div>

                    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                      <Calendar size={16} className="mr-2" />
                      {formatDate(feedbackData[activeIndex].timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevFeedback}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-purple-500/20 transition-colors"
        >
          <ChevronLeft className="text-neutral-800 dark:text-neutral-200" />
        </button>

        <button
          onClick={nextFeedback}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-purple-500/20 transition-colors"
        >
          <ChevronRight className="text-neutral-800 dark:text-neutral-200" />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {feedbackData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-purple-500 scale-125"
                  : "bg-gray-300 dark:bg-gray-700 hover:bg-purple-300 dark:hover:bg-purple-700"
              }`}
            />
          ))}
        </div>

        <AnimatedBackground />
      </div>
    </div>
  );
};

export default FeedbackShowcase;

// Background Animation Component (Separate as requested)
const AnimatedBackground = () => {
  return (
    <div className="absolute  inset-0 overflow-hidden pointer-events-none">
      {/* Animated floating elements */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-30 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent 
        bg-[size:50px_50px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%),linear-gradient(to_right,black_0%,black_10%,transparent_10%,transparent_90%,black_90%,black_100%)] 
        opacity-10"
      />
    </div>
  );
};

// Loading Component
const FeedbackLoader = () => {
  return (
    <div className="w-full py-16 rounded-3xl overflow-hidden relative flex items-center justify-center h-96">
      <AnimatedBackground />

      <div className="text-center mb-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          Visitor Feedback
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-600 dark:text-neutral-400 mt-3 text-lg"
        >
          What people are saying about my work
        </motion.p>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-neutral-600 dark:text-neutral-400"
          >
            Loading testimonials...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
