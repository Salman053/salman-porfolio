"use client";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, Calendar, Building } from "lucide-react";

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
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

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

      <motion.h2 
        className="relative text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Journey</span>
      </motion.h2>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-400/60 via-purple-400/40 to-pink-400/20 rounded-full" />

        <div className="space-y-24 relative">
          {timeline.map((exp, index) => {
            const isExpanded = expandedItems.includes(exp.id);
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex ${isEven ? "justify-start" : "justify-end"} items-stretch`}
              >
                {/* Timeline Dot with Connector */}
                <div className={`absolute top-8 ${isEven ? "left-1/2 -translate-x-1/2" : "right-1/2 translate-x-1/2"} z-20 flex flex-col items-center`}>
                  <motion.div
                    className="w-5 h-5 rounded-full bg-white border-4 border-indigo-500 shadow-lg z-20"
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(99, 102, 241, 0.7)",
                        "0 0 0 10px rgba(99, 102, 241, 0)",
                        "0 0 0 0 rgba(99, 102, 241, 0)"
                      ]
                    }}
                    transition={{ 
                      scale: { duration: 0.2 },
                      boxShadow: { duration: 2, repeat: Infinity, delay: 1 }
                    }}
                  />
                  <div className={`h-16 w-1 bg-gradient-to-b ${isEven ? "from-indigo-500 to-transparent" : "from-transparent to-indigo-500"}`} />
                </div>

                {/* Card */}
                <motion.div 
                  className={`bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl rounded-2xl p-6 w-full md:w-[45%] relative z-10 overflow-hidden group
                    ${isEven ? "md:mr-8" : "md:ml-8"}`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400">
                        {exp.type}
                      </span>
                      <h3 className="text-xl font-bold mt-2 group-hover:text-indigo-400 transition-colors">
                        {exp.title}
                      </h3>
                    </div>
                    <motion.button
                      onClick={() => toggleItem(exp.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-1 rounded-full hover:bg-accent"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </motion.button>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Building size={14} className="mr-1" />
                      {exp.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {exp.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Expandable content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></span>
                          Responsibilities:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {exp.details.responsibilities.map((r, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <span className="text-indigo-400 mr-2">•</span> 
                              {r}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2 flex items-center">
                          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                          Achievements:
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {exp.details.achievements.map((a, i) => (
                            <motion.li 
                              key={i} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <span className="text-green-400 mr-2">•</span> 
                              {a}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tech badges - always visible */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

    
    </section>
  );
}