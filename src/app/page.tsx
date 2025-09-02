"use client";

import FeedBackModal from "@/components/shared/feeback-Modal";
import BentoGrid from "../components/animated/grid/bento-grid";
import Skills from "../components/animated/skills";
import AboutSection from "../components/shared/about-section";
import AnimatedContactForm from "../components/shared/contact-form";
import EducationJourney from "../components/shared/educational-timeline";
import ExperienceTimeline from "../components/shared/experience-timeline";
import HeroText from "../components/shared/hero-text";
import ServicesSection from "../components/shared/services";
import TestimonialSection from "../components/shared/testimonal";
import WhyHireMe from "../components/shared/why-hire/why-hire-me";
import Footer from "../components/system/footer";
import Navbar from "../components/system/navbar";
import { useEffect, useState } from "react";
import LoadingScreen from "./loading";
import FeedbackMarquee from "@/components/shared/feedback-marque";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading your portfolio content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust based on your actual load time

    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <main className="relative overflow-hidden">
      {/* <CardSwapComp/> */}
      <Navbar />
      <HeroText />
      <ServicesSection />
      <Skills />
      <BentoGrid />
      <ExperienceTimeline />
      <WhyHireMe />
      <EducationJourney />
      <TestimonialSection />
      <AboutSection />
      <AnimatedContactForm />
      <FeedbackMarquee />

      <Footer />
      <FeedBackModal />
    </main>
  );
}
