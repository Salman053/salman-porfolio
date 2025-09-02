"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

export const timeline = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Infusible Coders",
    location: "Kohat",
    period: "Jun 2024 – Feb 2025",
    type: "Work",
    details: {
      responsibilities: [
        "Developed ERP system modules (finance, academics, HR) with React.js, Node.js, and Firebase.",
        "Built reusable React + TypeScript + Tailwind components, reducing UI time by 30%.",
        "Integrated real-time updates with Firebase for teachers, students, and admins.",
        "Enhanced UX with Framer Motion animations and accessibility improvements.",
        "Optimized APIs for 20% faster responses.",
        "Mentored 2 junior developers and conducted weekly reviews.",
      ],
      achievements: [
        "Improved ERP dashboard load time by 40%.",
        "Delivered 3 major ERP modules adopted by institutions.",
        "Recognized by team lead for problem-solving & collaboration.",
      ],
    },
    tech: [
      "React.js",
      "Node.js",
      "Firebase",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    id: 2,
    title: "EazyPOS – POS SaaS Application",
    company: "Freelance Client Project",
    location: "Remote",
    period: "2025",
    type: "Project",
    details: {
      responsibilities: [
        "Built an admin dashboard with real-time sales/stock alerts.",
        "Developed customer, product, and sales management with Firestore.",
        "Implemented subscription-based SaaS features with user data isolation.",
      ],
      achievements: [
        "Adopted by multiple retailers for daily operations.",
        "Improved shop management efficiency by 50%.",
      ],
    },
    tech: [
      "React.js",
      "Firebase",
      "Tailwind CSS",
      "Shadcn/UI",
      "TypeScript",
      "Recharts",
    ],
  },
  {
    id: 3,
    title: "Hospital Management System",
    company: "Freelance Client Project",
    location: "Remote",
    period: "2025",
    type: "Project",
    details: {
      responsibilities: [
        "Built patient registration, doctor scheduling, and billing with role-based access.",
        "Developed dashboards for doctors, staff, and admins with real-time sync.",
        "Integrated notifications and reporting for appointments and financials.",
      ],
      achievements: ["Reduced scheduling errors by 35% through automation."],
    },
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="relative mb-12 py-20 overflow-hidden">
      {/* === Animated Background Elements === */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-400/20 blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/10 to-pink-500/10 blur-[200px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <h2 className="relative text-4xl font-bold text-center mb-16">
        My Experience
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-400/60 to-purple-400/20 rounded-full" />

        <div className="space-y-16 relative">
          {timeline.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Card */}
              <div className="bg-card border border-border shadow-lg rounded-2xl p-6 w-[90%] md:w-[45%] relative z-10">
                <span className="text-sm font-medium text-indigo-500">
                  {exp.period}
                </span>
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-muted-foreground">{exp.company}</p>

                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-2">
                    Responsibilities:
                  </h4>
                  <ul className=" list-inside text-sm space-y-1 text-muted-foreground">
                    {exp.details.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-sm mb-2">Achievements:</h4>
                  <ul className=" list-inside text-sm space-y-1 text-muted-foreground">
                    {exp.details.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tech.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Dot */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-indigo-500 shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
