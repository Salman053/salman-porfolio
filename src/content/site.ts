
export const site = {
  name: "Salman's Portfolio",
  tagline: "Full‑Stack Developer • Product‑minded • Motion‑friendly UI",
  hero: {
    title: "I build delightful, scalable web apps",
    subtitle: "Next.js • TypeScript • shadcn/ui • R3F • Firebase",
    ctaPrimary: { label: "View Projects", href: "#projects" },
    ctaSecondary: { label: "Contact Me", href: "#contact" },
    lottie: "/lottie/coding.json",
  },
  social: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourname" },
    { label: "Twitter", href: "https://x.com/yourname" },
  ],
  services: [
    { title: "SaaS Dashboards", description: "Admin panels with analytics, role‑based access, and blazing UX.", icon: "layout-dashboard" },
    { title: "POS Systems", description: "Realtime inventory, billing, returns, and receipts.", icon: "receipt" },
    { title: "AI Integrations", description: "Chat, embeddings, RAG workflows for product value.", icon: "bot" },
    { title: "Mobile Apps", description: "Expo + React Native with native modules.", icon: "smartphone" },
  ],
  tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Firebase", "Postgres", "Three.js", "Expo", "Framer Motion", "Stripe"],
  experience: [
    { company: "Eazy POS", role: "Founder / Full‑Stack", period: "2024 — Present", bullets: ["Built multi‑tenant POS SaaS", "Designed customer/dues/payments flows", "Optimized Firestore writes with batches"] },
    { company: "Freelance", role: "Full‑Stack Developer", period: "2022 — 2024", bullets: ["Delivered 10+ projects", "Focused on DX & UX", "Shipped CI/CD pipelines"] },
  ],
  education: [
    { school: "BS — Computer Science", period: "2019 — 2023", bullets: ["Algorithms, DBMS, Networks", "Capstone on retail systems"] },
  ],
  future: [
    { title: "Realtime 3D store visualizer", detail: "Use R3F to map inventory as an explorable 3D scene." },
    { title: "Extensible plugin system", detail: "Allow partners to ship extensions safely." },
    { title: "Offline‑first mobile", detail: "POS with sync and conflict resolution." },
  ],
  projects: [
    {
      title: "Eazy POS — Multi‑tenant retail platform",
      tags: ["Next.js", "Firestore", "shadcn/ui"],
      image: "/images/eazy-pos.png",
      summary: "Inventory, billing, returns, loyalty, and analytics.",
      href: "https://your-live-demo.com",
      repo: "yourname/eazy-pos",
      details: [
        "Sales/returns modeled to avoid over‑refunds",
        "Atomic writes via Firestore batches",
        "Plan limits via Stripe webhooks",
      ],
    },
    {
      title: "ExamMate — Group study rooms",
      tags: ["Expo", "Next.js", "Supabase"],
      image: "/images/exammate.png",
      summary: "Pomodoro + accountability rooms.",
      href: "https://your-demo.com",
      repo: "yourname/exammate",
      details: ["Web + native", "Realtime presence", "Gamified streaks"],
    },
  ],
};





export const experience = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Rz Technologies (Pvt) Ltd",
    location: "Kohat Development Authority",
    period: "Nov 2025 - Present",
    type: "Work",
    details: {
      responsibilities:
        [
          "Developed full-stack modules for StockMaster and other business applications using Next.js, Laravel, and MySQL.",
          "Built reusable Next.js + TypeScript + Tailwind components, reducing UI development time by 30%.",
          "Implemented server-side rendering (SSR) and static generation (SSG) in Next.js for optimized performance.",
          "Created RESTful APIs with Laravel to handle data management and business logic.",
          "Enhanced UX with Framer Motion animations and implemented accessibility improvements.",
          "Optimized Laravel APIs and database queries for 20% faster response times.",
        ],

      achievements:
        [
          "Improved StockMaster dashboard load time by 40% using Next.js caching strategies.",
          "Delivered 3 major business application modules successfully adopted by multiple clients.",
          "Reduced server-side processing time by 25% through Laravel query optimization.",
          "Recognized by team lead for problem-solving and cross-stack collaboration."
        ]
    },
    tech: [
      "Nextjs",
      "Node.js",
      "MySQl",
      "Laravel",
      "PHP",
      "Inertiajs",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
  {
    id: 5,
    title: "Academy Management System",
    company: "Freelance Local Client Project ",
    location: "Remote",
    period: "2024",
    type: "Project",
    details: {
      responsibilities: [
        "Developed comprehensive dashboard for overview of all academy operations with real-time sync",
        "Built management modules for courses, instructors, students, and batches",
        "Implemented financial tracking system for expenses and fee management",
        "Created project tracking and reporting functionalities",
        "Integrated notifications and reporting for all academy operations",
      ],
      achievements: [
        "Centralized all academy management operations into a single platform",
        "Improved operational efficiency by providing real-time insights into all academy activities",
        "Enhanced financial tracking and reporting capabilities",
      ],
    },
    tech: [
      "React.js with TypeScript",
      "Firebase",
      "shadcn",
      "Framer Motion",
      "Tailwind CSS",
    ],
  },
];