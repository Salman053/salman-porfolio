"use client";;
import FeedBackModal from "@/components/shared/feeback-Modal";
import Skills from "../components/animated/skills";
import EducationJourney from "../components/shared/educational-timeline";
import ExperienceTimeline from "../components/shared/experience-timeline";
import HeroText from "../components/shared/hero-text";
import ServicesSection from "../components/shared/services";
import TestimonialSection from "../components/shared/testimonal";
import WhyHireMe from "../components/shared/why-hire/why-hire-me";
import { MinimalNavbar } from "../components/system/minimal-navbar";
import Footer from "../components/system/footer";
import FeedbackMarquee from "@/components/shared/feedback-marque";
import MasonryBentoGrid from "../components/animated/masonry-bento-grid";
import SplitScreenAbout from "../components/shared/split-screen-about";
import { SectionWrapper } from "../components/shared/section-wrapper";
import { useHasScrolled } from "@/hooks/useHasScrolled";
import ScrollToTopButton from "@/components/ui/scroll-to-top-button";
import { InteractiveBackground } from "@/components/animated/interactive-background";
export default function Page() {
  const { hasScrolled } = useHasScrolled(100);
  return (
    <main className="relative overflow-x-hidden bg-transparent">
      <InteractiveBackground/>
      <MinimalNavbar />

      <SectionWrapper id="intro">
        <HeroText />
      </SectionWrapper>

      <SectionWrapper id="services">
        <ServicesSection />
      </SectionWrapper>

      <SectionWrapper id="skills">
        <Skills />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <MasonryBentoGrid />
      </SectionWrapper>

      <SectionWrapper id="experience">
        <ExperienceTimeline />
      </SectionWrapper>

      <SectionWrapper id="why">
        <WhyHireMe />
      </SectionWrapper>

      <SectionWrapper id="education">
        <EducationJourney />
      </SectionWrapper>

      <SectionWrapper id="testimonial">
        <TestimonialSection />
      </SectionWrapper>

      <SectionWrapper id="about">
        <SplitScreenAbout />
      </SectionWrapper>

      <SectionWrapper>
        <FeedbackMarquee />
      </SectionWrapper>

      <Footer />
      <FeedBackModal />


      {/* {hasScrolled && <ScrollToTopButton />} */}
    </main>
  );
}