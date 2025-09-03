"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "./bento";
// import Image from "next/image";

interface CardProps {
  src?: string;
  title: string;
  description?: string;
  className?: string;
  imageClassName?: string;
  buttonHref: string;
  height?: number;
  width?: number;
  isGif?: boolean;
  tags?: string[];
}

const Card = ({
  src,
  title,
  tags = [],
  description,
  className,
  height,
  width,
  buttonHref,
  imageClassName,
  isGif,
}: CardProps) => {
  const [isClient, setIsClient] = useState(false);
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setIsClient(true); // Clientseitig einschalten
  }, []);
  // Mouse tracking for wobble effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isGif) {
      videoRef.current.play().catch((e) => {
        console.error("Error playing video:", e);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isGif) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Calculate wobble effect based on mouse position
  const wobbleX = (mousePosition.x - 50) / 4;
  const wobbleY = (mousePosition.y - 50) / 4;
  const rotation = (mousePosition.x - 50) / 20;

  return (
    <WobbleCard containerClassName={cn("relative h-full", className)}>
      {/* Animated gradient border effect
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 pointer-events-none"
           style={{ opacity: isHovered ? 1 : 0 }} /> */}

      {/* Content */}
      <a
        href={buttonHref}
        aria-label={`View ${title} project`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          " z-[100] cursor-pointer col-span-2  px-2 py-1 h-full flex flex-col"
        )}
      >
        <div className="max-w-xs mb-4">
          <h2 className="text-left text-balance text-xl md:text-2xl font-semibold tracking-[-0.015em] text-white">
            {title}
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            {description}
          </p>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap max-w-sm gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/30  border border-neutral-700/30 backdrop-blur-md transition-all "
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}

        {/* Button */}
      </a>
      <div
        className={cn(
          "absolute  -right-[10%] md:block hidden -bottom-[10%] rounded-md z-[-1] transition-transform duration-700  hover:-translate-x-3 w-[700px] h-[400px]  overflow-hidden",
          imageClassName
        )}
      >
        {src ? (
          <img
            src={src}
            alt={title}
            className="w-full h-full     transition-transform duration-700 group-hover:scale-110"
          />
        ) : isClient ? (
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : null}
      </div>
      {/* Shine effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translateX(${mousePosition.x * 2 - 100}%) translateY(${
            mousePosition.y * 2 - 100
          }%)`,
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
    </WobbleCard>
  );
};

const CardHomeFeatures = () => {
  return (
    <section
      id="projects"
      className="relative bg-background py-20 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-medium"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16" id="ScrollToFeatures">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Discover our latest work showcasing innovative solutions,
            cutting-edge design, and exceptional craftsmanship across various
            industries.
          </p>
        </header>

        {/* Main Feature Grid */}
        <BentoGrid>
          {/* Large Featured Card - Full Width */}
          <BentoGridItem span={6}>
            <Card
              tags={["React", "React", "Tailwind"]}
              src="/erp.PNG"
              imageClassName="top-[20%]"
              title="Enterprise Resource Planning System"
              description="This is combine system demo front end for the educational system like university have many operations in one place with user role based personal systems"
              isGif={true}
              buttonHref="https://pos-management-system-sage.vercel.app/"
            />
          </BentoGridItem>

          {/* Main POS System - Spans 4 columns */}
          <BentoGridItem span={4}>
            <Card
              tags={["React", "Typescript", "Firebase", "Tailwind"]}
              src="/eazy.PNG"
              title="Eazy Point of Sales Management System"
              description="Designed to help shopkeepers, retailers, and small businesses run their stores smarter, not harder."
              imageClassName="-right-[30%] top-[20%] scale-90"
              buttonHref="https://pos-management-system-sage.vercel.app/"
            />
          </BentoGridItem>
          <BentoGridItem span={2}>
            <Card
              // src="/assets/videos/redfire.mp4"
              title="Travel Showcase Website (Fitzroy-clone)"
              description="A visually stunning travel platform featuring world destinations with parallax effects and immersive galleries."
              className="bg-slate-600 h-full"
              buttonHref="https://fitzroydemi.netlify.app/"
            />
          </BentoGridItem>
          {/* Real Estate - Spans 2 columns */}
         
          <BentoGridItem span={2}>
            <Card
              title="Vision Pro"
              description="A reimagined Apple Vision Pro website with enhanced visual elements and interactive 3D product showcases."
              className="bg-violet-900 h-full"
              buttonHref="https://salman053.github.io/Vision-Pro-New-Design/"
            />
          </BentoGridItem>
           <BentoGridItem span={4}>
            <Card
              src="/real.PNG"
              title="Real Estate Landing Page"
              tags={["HTML", "CSS", "Javascript"]}
              imageClassName="-right-[30%] -bottom-[35%]"
              description="A modern real estate website with fluid animations and responsive design, showcasing property listings with an elegant UI."
              buttonHref="https://salman053.github.io/Real-Estate/"
            />
          </BentoGridItem>
          {/* Personal Management - Spans 3 columns */}
          <BentoGridItem span={4}>
            <Card
              tags={[
                "Next",
                "Typescript",
                "Firebase",
                "Tailwind",
                "Shadcn",
                "Framer Motion",
              ]}
              imageClassName="-right-[35%] -bottom-[40%]"
              title="Personal Management"
              className="bg-cyan-900"
              description="Your all-in-one digital companion to stay organized, productive, and in control of your personal and professional life."
              src="/pms.PNG"
              buttonHref="https://personal-management-system-web.vercel.app/"
              isGif
            />
          </BentoGridItem>

            <BentoGridItem span={2}>
            <Card
              title="Hongo-clone"
              className="bg-green-600"
              description="My first React project - a complete online shopping experience with product filtering and cart functionality."
              buttonHref="https://funny-tapioca-961899.netlify.app/"
            />
          </BentoGridItem>
          <BentoGridItem span={2}>
            <Card
              src="/net.PNG"
              className="h-full"
              title="Netflix-clone"
              description="A functional replica of Netflix's interface with movie browsing, categories, and responsive design patterns."
              imageClassName="-right-[30%]"
              buttonHref="https://netflix-clone-jet-iota.vercel.app/"
            />
          </BentoGridItem>

          {/* Hongo Clone - Spans 2 columns */}
        

          {/* Works Brand - Spans 4 columns */}
          <BentoGridItem span={4}>
            <Card
              src="/works.PNG"
              className="bg-brown-600"
              title="Works Brand"
              description="A clean, modern landing page for a creative agency with smooth scroll animations and portfolio showcases."
              imageClassName="-right-[30%] top-[30%]"
              buttonHref="https://salman053.github.io/Works-Brand-Landing-Page/"
            />
          </BentoGridItem>

          {/* Digital Clock - Spans 2 columns */}
          <BentoGridItem span={4}>
            <Card
              src="/clock.PNG"
              className="bg-rose-800"
              title="Amazing Digital Clock"
              description="An elegant timepiece application with multiple themes, weather integration, and customizable display options."
              imageClassName="-right-[34%] -bottom-[40%]"
              buttonHref="https://clock-amazing.netlify.app/"
            />
          </BentoGridItem>
           <BentoGridItem span={2}>
            <Card
              title="Random Rapid User Generator"
              description="A tool that instantly generates realistic user profiles with photos and demographics."
              buttonHref="https://randperson.netlify.app/"
            />
          </BentoGridItem>

<BentoGridItem span={2}>
            <Card
              title="Eazy Calculator"
              className="bg-sky-700"

              description="A sleek, user-friendly calculator with responsive keypad design."
              buttonHref="https://easy-calculator-demo.netlify.app/"
            />
          </BentoGridItem>
          {/* Typing Test - Spans 2 columns */}
          <BentoGridItem span={4}>
            <Card
              src="/type.PNG"
              title="Typing Test"
              description="An interactive typing practice application that measures WPM, accuracy, and provides performance analytics."
              imageClassName="-right-[34%] -bottom-[50%]"

              buttonHref="https://typi-love.netlify.app/"
            />
          </BentoGridItem>

          {/* Calculator - Spans 2 columns */}
          

          {/* Random User Generator - Spans 2 columns */}
         
        </BentoGrid>
      </div>
    </section>
  );
};

export default CardHomeFeatures;
