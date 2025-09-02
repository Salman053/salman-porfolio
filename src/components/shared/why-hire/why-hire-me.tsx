"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Code,
  MonitorSmartphone,
  Paintbrush2,
  Wand2,
  LayoutTemplate,
  Sparkles,
  CodeXml,
  FolderHeart,
  Activity,
} from "lucide-react";
import "./why-hire-me.css";

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  highlight,
}: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState<any>({ x: 0, y: 0 });
  const cardRef = useRef<any>(null);

  const handleMouseMove = (e: any) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`feature-card border mt-7 border-border bg-background text-black${className} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }as any}
    >
      {/* Background Effects */}
      <div className="card-background"></div>
      {/* <div className="particle-field">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`particle p-${i + 1}`}></div>
        ))}
      </div> */}

      {/* Content */}
      <div className="card-content pt-9 ">
        <h3 className="feature-title">
          <span className="title-text ">{title}</span>
          <span className="title-highlight">{highlight}</span>
        </h3>

        <p className="feature-description ">{description}</p>

        {/* Icon - in der Box */}
        {/* <div className="feature-icon">
          <Icon size={32} />
        </div> */}
      </div>

      {/* Border Effects */}
      <div className="animated-border"></div>
      <div className="corner-highlights">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
    </div>
  );
};

const WhyHireMe = () => {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: "Clean Code",
      highlight: "Best Practices",
      description:
        "Well-structured, readable code that is easy to maintain and built to last. I follow modern standards and focus on quality.",
      // icon: Code,
      className: "card-1",
    },
    {
      title: "Responsive Design",
      highlight: "Mobile First",
      description:
        "I create layouts that adapt perfectly to any device. From mobile to desktop, the experience stays consistent and intuitive.",
      // icon: MonitorSmartphone,
      className: "card-2",
    },
    {
      title: "Pixel-Perfect ",
      highlight: "Exact Design to Code",
      description:
        "I specialize in transforming Figma into production-ready code with precision. Ensuring the final product mirrors.",
      // icon: Code2,  // you can swap with a coding-related icon like `Code2` from lucide-react
      className: "card-3",
    },
    {
      title: "Smart Features",
      highlight: "Modern Frontend",
      description:
        "Interactive logic and dynamic components enhance the experience and make your site stand out. Built with clean, modern JavaScript.",
      // icon: Wand2,
      className: "card-4",
    },
    {
      title: "Website Planning",
      highlight: "Structure",
      description:
        "Every project starts with structure. I focus on clear layouts and logical flow, from the first idea to the final result.",
      // icon: LayoutTemplate,
      className: "card-5",
    },
    {
      title: "Reliable & Professional",
      highlight: "Work Ethic",
      description:
        "I communicate clearly, deliver on time, and stay solution-oriented. My goal is to create results that clients are proud of.",
      // icon: Sparkles,
      className: "card-6",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="why"
      className={`bg-background p-5 ${sectionVisible ? "visible" : ""}`}
    >
      {/* Background Elements Blue Circle */}
      <div className="section-background">
        <div className="bg-grid"></div>
        <div className="floating-elements">
          <div className="float-orb orb-1"></div>
          <div className="float-orb orb-2"></div>
          <div className="float-orb orb-3"></div>
        </div>
      </div>

      <div className="features-container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-main ">Why Hire</span>
            <span className="title-accent  ">Me?</span>
          </h2>
          <p className="section-subtitle text-foreground   text-xl">
            Every detail matters: I create visually stunning and intuitive
            interfaces that reflect your brand&apos;s personality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              style={{ "--index": index }}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="features-stats text-foreground cursor-default">
          <div className="stat-group">
            <CodeXml size={20} />
            <span>Trusted, Secure Code</span>
          </div>
          <div className="stat-group">
            <FolderHeart size={20} />
            <span>Ongoing Partnership</span>
          </div>
          <div className="stat-group">
            <Activity size={20} />
            <span>Crafting with Care and Passion</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
