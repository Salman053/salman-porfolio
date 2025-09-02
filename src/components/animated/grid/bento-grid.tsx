"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./grid.css";
import { WobbleCard } from "@/components/ui/wobble-card";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
  tags?: string[]; // ✅ New tags prop
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

  useEffect(() => {
    setIsClient(true); // Clientseitig einschalten
  }, []);

  // Mouse tracking for glow effect
  useEffect(() => {
    const wrapper: any = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: any) => {
      const rect = wrapper.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      wrapper.style.setProperty("--mouse-x", `${x}%`);
      wrapper.style.setProperty("--mouse-y", `${y}%`);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseEnter = () => {
    const video: any = videoRef.current;
    if (video && !isGif) {
      video.play().catch((e: any) => {
        console.error("Error playing video:", e);
      });
    }
  };

  const handleMouseLeave = () => {
    const video: any = videoRef.current;
    if (video && !isGif) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <WobbleCard containerClassName={cn("", className)}>
      <div
        // className=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Media */}
        {/* <div className="relative w-full h-64 overflow-hidden">
          {isGif ? (
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : isClient ? (
            <video
              ref={videoRef}
              src={src}
              loop
              muted
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : null} */}

        {/* Overlay gradient */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-90" /> */}
        {/* </div> */}
        {/* <StarsCanvas/> */}
        {/* <Encryption/> */}
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            {title}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            {description}
          </p>
        </div>
        {src && (
          <Image
            src={src}
            width={width||500}
            height={height||600}
            alt="linear demo image"
            className={cn(
              "absolute right-4 lg:-right-[10%]  filter -bottom-10 object-contain rounded-2xl",
              imageClassName
            )}
          />
        )}

        {/* Content */}
        <div className=" mt-6 space-y-3  ">
          {/* Tags */}
          {/* {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-background/10 backdrop-blur-md border border-white/20 hover:bg-background/20 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
          )} */}

          {/* Title + Description */}

          {/* Button */}
          <a
            href={buttonHref}
            aria-label={`View ${title} project`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background text-foreground shadow-md hover:shadow-lg hover:bg-primary/90 transition"
          >
            View Project
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </WobbleCard>
  );
};

const CardHomeFeatures = () => {
  return (
    <section id="projects"  className="card-home-features-section  bg-background">
      {/* Floating Background Elements */}
      <div className="card-home-features-orb card-home-features-orb-1"></div>
      <div className="card-home-features-orb card-home-features-orb-2"></div>

      <div className="card-home-features-container">
        {/* Header Section */}
        <header className="card-home-features-intro" id="ScrollToFeatures">
          <h2 className="card-home-features-intro-text text-foreground">
            Featured Projects
          </h2>
          <p className="card-home-features-intro-description">
            Discover our latest work showcasing innovative solutions,
            cutting-edge design, and exceptional craftsmanship across various
            industries.
          </p>
        </header>

        {/* Large Featured Card */}
        <div className="card-home-features-grid-large">
          <Card
            tags={["React", "React", "Tailwind"]}
            src="/erp.PNG"
            title="Enterprise Resource Planning System"
            description="This is combine system demo front end for the educational system like university have many operations in one place with user role based personal systems "
            className="card-home-features-large"
            isGif={true}
            width={700}
            buttonHref="https://pos-management-system-sage.vercel.app/"
          />
        </div>

        {/* Main Feature Grid */}
        <div className="card-home-features-grid-feature">
          <Card
            tags={[
              "React",
              "Typescript",
              "Firebase",
              "Tailwind",
              "Shadcn",
              "Framer Motion",
            ]}
            src="/eazy.PNG"
          
            width={600}
            title="Eazy Point of Sales Management System"
            description=" designed to help shopkeepers, retailers, and small businesses run their stores smarter, not harder.

Built with simplicity and power in mind, Eazy POS combines billing, inventory, customer management, and sales tracking into one intuitive platform."
            className="card-home-features-medium bg-blue-400"
            imageClassName="left-[50%]"
            buttonHref="https://pos-management-system-sage.vercel.app/"
          />
          <Card
            tags={[
              "Next",
              "Typescript",
              "Firebase",
              "Tailwind",
              "Shadcn",
              "Framer Motion",
            ]}
            // src="/pms.PNG"
            title="Personal Management System"
            description=" its my personal system for all-in-one digital companion to stay organized, productive, and in control of your personal and professional life. "
            className="card-home-features-medium bg-gray-500"
            buttonHref="https://personal-management-system-web.vercel.app/"
            isGif
          />
          {/* <Card
            src="/assets/videos/redfire.mp4"
            title="Oblivion"
            description="Let users try products in AR before purchasing, such as furniture or clothes, for confident decision-making."
            className="card-home-features-long"
            buttonHref="/project4"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default CardHomeFeatures;
