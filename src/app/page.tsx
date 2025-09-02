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

export default function Page() {
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
      <Footer/> 
          <FeedBackModal/>
    </main>
  );
}
