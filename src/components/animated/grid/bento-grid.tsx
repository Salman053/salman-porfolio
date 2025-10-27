"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "./bento";
import { ProjectPreviewModal } from "@/components/shared/project-preview";
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
  screenshots?: string[];
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
  screenshots = [],

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <WobbleCard containerClassName={cn("relative h-full", className)}>
      <div
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
          <div className="flex text-white flex-wrap max-w-sm gap-2 mb-4">
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
      </div>
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
      {screenshots.length > 0 && (
        <Button
          onClick={() => setIsPreviewOpen(true)}
          variant="outline"
          className="mt-4 text-foreground border-white/30 hover:bg-white/10"
        >
          Preview Screens
        </Button>
      )}
      {buttonHref && (
        <a
          href={buttonHref}
          className="bg-gray-600/40 p-2 ml-3 rounded-sm hover:underline"
          aria-label={`View ${title} project`}
          target="_blank"
        >Live Preview</a>
      )}

      {/* --- Modal --- */}
      <ProjectPreviewModal
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={title}
        images={screenshots}
      />
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
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
              screenshots={[
                "/eazydashboard.PNG",
                "/eazysales.PNG",
                "/erp (1).PNG",
                "/erp (2).PNG",
                "/erp (3).PNG",
                "/erp (4).PNG",
              ]}
              tags={["React", "Recharts", "Gemini Chat Bot", "Tailwind"]}
              src="/erp.PNG"
              imageClassName="top-[20%]"
              title="Enterprise Resource Planning System"
              description="This is combine system demo front end for the educational system like university have many operations in one place with user role based personal systems"
              isGif={true}
              buttonHref="https://pos-management-system-sage.vercel.app/"
            />
          </BentoGridItem>

          <BentoGridItem span={2}>
            <Card
              tags={[
                "React",
                "MongoDB",
                "Shadcn UI",
                "Node",
                "Gemini ChatBot",
                "Express",
                "Tailwind",
              ]}
              src="/hms (2).PNG"
              screenshots={[
                "/hms (1).PNG",
                "/hms (2).PNG",
                "/hms (3).PNG",
                "/hms (4).PNG",
                "/hms (5).PNG",
              ]}
              className="bg-teal-800"
              title="Health Management System"
              description="Designed to help a hospital management system to manage the appointments of the patient and there lab result and save time of the doctor and the patient."
              imageClassName="-right-[80%] top-[40%] scale-60"
              buttonHref=""
            />
          </BentoGridItem>
          <BentoGridItem span={4}>
            <Card
              tags={[
                "React",
                "MongoDB",
                "Shadcn UI",
                "Node",
                "Express",
                "Tailwind",
              ]}
              src="/skillsfusion(3).PNG"
              screenshots={[
                "/skillsfusion(1).PNG",
                "/skillsfusion(2).PNG",
                "/skillsfusion(3).PNG",
                "/skillsfusion(5).PNG",
              ]}
              title="Skills Fusion Skills and Study Together"
              description="Designed to help students to get real world experience in the tech industry by best tech companies and stay motivated. (This is my FYP Project its not fully completed yet.)"
              imageClassName="-right-[40%] top-[30%] scale-110"
              buttonHref="https://skills-fusion-client.vercel.app/"
            />
          </BentoGridItem>
          <BentoGridItem span={4}>
            <Card
              tags={["React", "Typescript", "Firebase", "Tailwind"]}
              src="/eazy.PNG"
              screenshots={["/eazydashboard.PNG", "/eazysales.PNG"]}
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
              screenshots={[
                "/fitzroy (3).PNG",
                "/fitzroy (1).PNG",
                "/fitzroy (2).PNG",
              ]}
            />
          </BentoGridItem>
          {/* Real Estate - Spans 2 columns */}

          {/* Personal Management - Spans 3 columns */}
          <BentoGridItem span={6}>
            <Card
              tags={[
                "Next",
                "Typescript",
                "Firebase",
                "Tailwind",
                "Shadcn",
                "Next Api",
                "Watsapp Api",
                "Nodemailer",
                "Gemini",
                "Framer Motion",
              ]}
              screenshots={[
                "/personal (1).PNG",
                "/personal (2).PNG",
                "/personal (3).PNG",
                "/personal (4).PNG",
              ]}
              imageClassName="-right-[5%] -bottom-[20%]"
              title="Personal Management"
              className="bg-cyan-900"
              description="All-in-one digital companion to stay organized, productive, and in control of your personal and professional life. This is in my personal use."
              src="/pms.PNG"
              buttonHref="https://personal-management-system-web.vercel.app/"
              isGif
            />
          </BentoGridItem>

          <BentoGridItem span={4}>
            <Card
              src="/type.PNG"
              title="Typing Test"
              description="An interactive typing practice application that measures WPM, accuracy, and provides performance analytics."
              imageClassName="-right-[34%] -bottom-[50%]"
              buttonHref="https://typi-love.netlify.app/"
            />
          </BentoGridItem>
          <BentoGridItem span={2}>
            <Card
              src="/net.PNG"
              className="h-full"
              title="Netflix-clone"
              description="A functional replica of Netflix's interface with movies , and responsive design patterns."
              imageClassName="-right-[30%]"
              buttonHref="https://netflix-clone-jet-iota.vercel.app/"
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
        </BentoGrid>
      </div>
    </section>
  );
};

export default CardHomeFeatures;
