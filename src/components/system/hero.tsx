// =========================
"use client";
import { motion } from "framer-motion";
import { site } from "@/content/site";
import GitHubStarButton from "../animated/github-star-button";
import Scene from "../3d/scene";
import GridDistortion from "../animated/grid-distortion";
import image from "@/assets/images/background.webp";

export default function Hero() {
  return (
    <section className="section pt-28">
      <div style={{ width: "100%", height: "900px", position: "absolute" }}>
        <GridDistortion
          imageSrc={image.src}
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="custom-class"
        />
      </div>
      <div className=" grid md:grid-cols-2 items-center gap-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            {site.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4"
          >
            {site.tagline}
          </motion.p>
          <div className="mt-6 flex gap-4">
            <a
              href={site.hero.ctaPrimary.href}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground"
            >
              {site.hero.ctaPrimary.label}
            </a>
            <a
              href={site.hero.ctaSecondary.href}
              className="px-5 py-2.5 rounded-xl border"
            >
              {site.hero.ctaSecondary.label}
            </a>
          </div>
          <div className="mt-6 flex gap-4">
            <GitHubStarButton repo={site.projects[0].repo} />
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl border hover:bg-accent/50"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <Scene />
        </div>
      </div>
    </section>
  );
}
