// image-carousel.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  title: string;
  isHovered: boolean;
  onImageChange: (index: number) => void;
  reducedMotion: boolean;
}

export const ImageCarousel = ({ 
  images, 
  title, 
  isHovered, 
  onImageChange,
  reducedMotion 
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Update parent when index changes
  useEffect(() => {
    onImageChange(currentIndex);
  }, [currentIndex, onImageChange]);

  // Auto-play when hovered
  useEffect(() => {
    if (!isHovered || reducedMotion || images.length <= 1) {
      setIsAutoPlaying(false);
      return;
    }

    setIsAutoPlaying(true);
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, reducedMotion, images.length]);

  // If no images, show placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  // Single image
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
    );
  }

  // Multiple images
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ 
            opacity: 0,
            x: direction > 0 ? 300 : -300,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1,
            x: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0,
            x: direction > 0 ? -300 : 300,
            scale: 0.95
          }}
          transition={{ 
            duration: reducedMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Only show on hover */}
      {isHovered && images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection(-1);
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
              setIsAutoPlaying(false);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full 
                       bg-black/40 backdrop-blur-sm flex items-center justify-center
                       text-white hover:bg-black/60 transition-all duration-300
                       opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDirection(1);
              setCurrentIndex((prev) => (prev + 1) % images.length);
              setIsAutoPlaying(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full 
                       bg-black/40 backdrop-blur-sm flex items-center justify-center
                       text-white hover:bg-black/60 transition-all duration-300
                       opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};