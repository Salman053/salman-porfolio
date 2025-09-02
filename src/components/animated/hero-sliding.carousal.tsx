"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  Github,
  Mail,
  ExternalLink,
  Code2,
  Palette,
  Database,
} from "lucide-react";
import "../../styles/hero-slider.css";

// Professional Portfolio Slides
const defaultSlides = [
  {
    id: 1,
    type: "video",
    src: "/assets/videos/sea.mp4",
    title: "Welcome to My Corner",
    subtitle: "Tips, Tricks & Real Talk",
    description:
      "No fluff, just useful insights and honest advice to help you level up your skills and projects.",
    cta: {
      text: "Coming soon",
      action: () => null,
      // document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }),
      secondary: false,
    },
  },
  {
    id: 2,
    type: "image",
    src: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWN0JTIwanMlMjBjb2RlJTIwZGFya3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Projects That Speak",
    subtitle: "What I've Built, What I've Learned",
    description:
      "A collection of real work, experiments, and passion projects — each with a story behind it.",
    cta: {
      text: "Check Them Out",
      icon: Mail,
      action: () =>
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" }),
      secondary: true,
    },
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2l0aHVifGVufDB8MHwwfHx8MA%3D%3D",
    title: "Looking for the Next Challenge",
    subtitle: "Let's Create Something Together",
    description:
      "If you're looking for someone who cares as much as you do, let's chat and see how we can collaborate.",
    cta: {
      text: "Get in Touch",
      icon: Github,
      action: () =>
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" }),
      secondary: false,
    },
  },
];
// ===================================
// Types
// ===================================
export interface CarouselSlide {
  id: string | number;
  type: "video" | "image";
  src: string;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    text: string;
    action: () => void;
    secondary?: boolean;
    icon?: React.ComponentType<any>;
  };
}

export interface HeroSlidingCarousalProps {
  slides: CarouselSlide[];
  autoplayInterval?: number;
  showProgress?: boolean;
  showNavigation?: boolean;
  showCounter?: boolean;
  showScrollIndicator?: boolean;
  className?: string;
  onSlideChange?: (index: number) => void;
}

// ===================================
// Constants
// ===================================
const DEFAULT_AUTOPLAY_INTERVAL = 6000;
const PROGRESS_UPDATE_INTERVAL = 50;

// ===================================
// Main Component
// ===================================
const HeroSlidingCarousal: React.FC<HeroSlidingCarousalProps> = ({
  slides = defaultSlides,
  autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  showProgress = true,
  showNavigation = true,
  showCounter = true,
  showScrollIndicator = true,
  className = "",
  onSlideChange,
}) => {
  // ===================================
  // State & Refs
  // ===================================
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ===================================
  // Effects
  // ===================================
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(activeSlide);
    }
  }, [activeSlide, onSlideChange]);

  // ===================================
  // Autoplay Management
  // ===================================
  const startAutoplay = useCallback(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    // Clear existing timers
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }

    let currentProgress = 0;
    setProgress(0);

    progressTimer.current = setInterval(() => {
      currentProgress += (PROGRESS_UPDATE_INTERVAL / autoplayInterval) * 100;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(progressTimer.current as NodeJS.Timeout);
        nextSlide();
      }
    }, PROGRESS_UPDATE_INTERVAL);
  }, [isAutoPlaying, autoplayInterval, slides?.length]);

  const stopAutoplay = useCallback(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
    setProgress(0);
  }, []);

  // Initialize autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isAutoPlaying, startAutoplay, stopAutoplay]);

  // Pause on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsAutoPlaying(false);
        stopAutoplay();
      } else {
        setIsAutoPlaying(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [stopAutoplay]);

  // ===================================
  // Navigation Functions
  // ===================================
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides?.length]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides?.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveSlide(index);
      setIsAutoPlaying(false);
      stopAutoplay();
      setTimeout(() => setIsAutoPlaying(true), 100);
    },
    [stopAutoplay]
  );

  // ===================================
  // Touch/Swipe Handling
  // ===================================
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const touch = e.type.includes("touch")
      ? (e as React.TouchEvent).touches[0]
      : (e as React.MouseEvent);

    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsAutoPlaying(false);
    stopAutoplay();
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    const touch = e.type.includes("touch")
      ? (e as React.TouchEvent).changedTouches[0]
      : (e as React.MouseEvent);

    const deltaX = touchStart.x - touch.clientX;
    const deltaY = Math.abs(touchStart.y - touch.clientY);

    // Only trigger navigation for horizontal swipes with minimal vertical movement
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTimeout(() => setIsAutoPlaying(true), 100);
  };

  // ===================================
  // CTA Mouse Effects
  // ===================================
  const handleCTAMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCTAMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--mouse-x", `${x}px`);
    button.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCTAMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.setProperty("--mouse-x", "-100px");
    button.style.setProperty("--mouse-y", "-100px");
  };

  // ===================================
  // Keyboard Navigation
  // ===================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === " ") {
        setIsAutoPlaying((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // ===================================
  // Render Functions
  // ===================================
  const renderMedia = (slide: CarouselSlide) => {
    if (!isClient) return null;

    return slide.type === "video" ? (
      <video
        className="landing-carousel__video"
        autoPlay
        loop
        muted
        playsInline
        key={slide.src}
      >
        <source src={slide.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        className="landing-carousel__image"
        src={slide.src}
        alt={slide.title}
        loading="lazy"
      />
    );
  };

  const renderNavigation = () => {
    if (!showNavigation || slides.length <= 1) return null;

    return (
      <nav className="landing-carousel__nav">
        <div className="landing-carousel__nav-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`landing-carousel__nav-dot ${
                index === activeSlide ? "landing-carousel__nav-dot--active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : "false"}
            >
              {index === activeSlide && showProgress && (
                <div
                  className="landing-carousel__nav-progress"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>

        {showCounter && (
          <div className="landing-carousel__counter">
            <span className="landing-carousel__counter-current">
              {String(activeSlide + 1).padStart(2, "0")}
            </span>
            <span className="landing-carousel__counter-separator">/</span>
            <span className="landing-carousel__counter-total">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </nav>
    );
  };

  const renderScrollIndicator = () => {
    if (!showScrollIndicator) return null;

    return (
      <div className="scroll-indicator">
        <div
          className="scroll-arrow"
          onClick={() =>
            document
              .getElementById("ScrollToFeatures")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll to next section"
        >
          <ArrowRight className="scroll-arrow-icon" size={24} />
        </div>
        <span className="scroll-text">Scroll for more</span>
      </div>
    );
  };

  // ===================================
  // Main Render
  // ===================================
  if (!slides || slides.length === 0) {
    return (
      <div className="landing-carousel landing-carousel--empty">
        <p>No slides to display</p>
      </div>
    );
  }

  return (
    <section
      className={`landing-carousel select-none bg-background ${className}`}
    >
      {/* Background Elements */}
      <div className="landing-carousel__bg-orb landing-carousel__bg-orb--1"></div>
      <div className="landing-carousel__bg-orb landing-carousel__bg-orb--2"></div>

      {/* Main Carousel Container */}
      <div
        ref={containerRef}
        className="landing-carousel__container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => setIsAutoPlaying(true)}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {/* Slides */}
        <div className="landing-carousel__slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`landing-carousel__slide ${
                index === activeSlide ? "landing-carousel__slide--active" : ""
              }`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}: ${
                slide.title
              }`}
              hidden={index !== activeSlide}
            >
              {/* Media Content */}
              <div className="landing-carousel__media">
                {renderMedia(slide as any)}
                <div className="landing-carousel__overlay"></div>
              </div>

              {/* Content */}
              <div className="landing-carousel__content">
                <div className="landing-carousel__text">
                  <p className="landing-carousel__subtitle">{slide.subtitle}</p>
                  <h1 className="landing-carousel__title">{slide.title}</h1>
                  <p className="landing-carousel__description">
                    {slide.description}
                  </p>

                  {/* Call to Action button */}
                  <button
                    className={`landing-carousel__cta ${
                      slide.cta.secondary
                        ? "landing-carousel__cta--secondary"
                        : ""
                    }`}
                    onClick={slide.cta.action}
                    onMouseMove={handleCTAMouseMove}
                    onMouseEnter={handleCTAMouseEnter}
                    onMouseLeave={handleCTAMouseLeave}
                  >
                    {slide.cta.icon && (
                      <slide.cta.icon size={20} aria-hidden="true" />
                    )}
                    <span>{slide.cta.text}</span>
                    <ArrowRight
                      className="landing-carousel__cta-icon"
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        {renderNavigation()}
      </div>

      {/* Scroll Indicator */}
      {renderScrollIndicator()}

      {/* Play/Pause Button for accessibility */}
      <button
        className="landing-carousel__autoplay-toggle"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
      >
        {isAutoPlaying ? "⏸" : "▶"}
      </button>
    </section>
  );
};

export default HeroSlidingCarousal;
