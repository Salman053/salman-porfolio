"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    school: "Kohat University of Science and Technologies",
    period: "2021 – 2025",
    achievements: [
      "Graduated with Honors 3.23/4 CGPA",
      "Actively learning new technologies trends",
    ],
  },
  {
    id: 2,
    degree: "Intermediate in Pre-Computer Science",
    school: "Karwan Modal College Kohat",
    period: "2019 – 2021",
    achievements: ["2nd position in Kohat Board", "Top Student Award"],
  },
];

export default function EducationJourney() {
  return (
    <section id="education" className="relative py-24 overflow-hidden">
      {/* === Animated Background === */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === Title & Subtitle === */}
      <h2 className="text-5xl font-bold text-center mb-4 relative z-10">
        Education
      </h2>
      <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-16 relative z-10">
        My academic journey shaped not only my technical skills but also my
        mindset as a lifelong learner. Here’s a snapshot of my key milestones.
      </p>

      {/* === Horizontal Journey === */}
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12 md:gap-6 relative z-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-card/80 backdrop-blur-lg border border-border shadow-xl rounded-2xl p-6 w-full md:w-[45%] hover:scale-[1.03] transition-transform"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  {edu.period}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
              <p className="text-muted-foreground">{edu.school}</p>

              <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {edu.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>

              {/* Connector Dot */}
              <div className="hidden md:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary/10 rounded-full shadow-md" />
            </motion.div>
          ))}
        </div>

        {/* Line Connector (only for md and above) */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 rounded-full -z-0 overflow-hidden">
          <div className="w-[200%] h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-flow" />
        </div>
      </div>
    </section>
  );
}
