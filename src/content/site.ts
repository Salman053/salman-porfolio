
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



export const archiveProjects = [
  {
    id: "erp-demo",
    title: "ERP Demo",
    category: "ERP Business",
    description: "Frontend only ERP solution with clean ui  ",
    images: ["/erp.PNG", "/erp (1).PNG", "/erp (2).PNG", "/erp (3).PNG"],
    colSpan: "md:col-span-2",
    href: "https://erp-product.vercel.app/",
    tags: ["Next.js Core", "PostgreSQL", "Cloud Operations"],
    metrics: { users: "10k+", uptime: "99.9%" },
    year: "2024"
  },
  {
    id: "eazy-pos",
    title: "Eazy POS",
    category: "POS",
    description: "Headless POS system with inventory sync, payment orchestration, and offline-first architecture.",
    images: ["/eazy.PNG"],
    colSpan: "md:col-span-2",
    href: "https://pos-management-system-sage.vercel.app/",
    tags: ["POS SYSTEM", "PWA"],
    metrics: { transactions: "50k+" },
    year: "2023"
  },
  {
    id: "personal-management",
    title: "Personal System ",
    category: "Personal Workflow",
    description: "AI-powered personal management system with LLM integration, task automation, and contextual awareness.",
    images: ["/pms.PNG", "/personal (1).PNG", "/personal (2).PNG", "/personal (4).PNG"],
    colSpan: "md:col-span-2",
    href: "https://personal-management-system-web.vercel.app/",
    tags: ["LLM Integration", "Edge Compute", "Vector Streams"],
    metrics: { responses: "<200ms", models: "3+" },
    year: "2024"
  },
  {
    id: "health-core",
    title: "Health Core",
    category: "Security First",
    description: "HIPAA-compliant health management platform with end-to-end encryption and audit trails.",
    images: ["/hms (2).PNG","/hms (3).PNG","/hms (4).PNG","/hms (6).PNG"],
    colSpan: "md:col-span-1",
    href: "#",
    tags: ["Security First", "Node.js", "HIPAA"],
    metrics: { compliance: "100%" },
    year: "2023"
  },
  {
    id: "skills-fusion",
    title: "Skills Fusion",
    category: "Real-time",
    description: "Live collaborative learning platform with WebRTC, real-time code execution, and peer reviews.",
    images: ["/skillsfusion(3).PNG","/skillsfusion(2).PNG","/skillsfusion(1).PNG","/skillsfusion(5).PNG"],
    colSpan: "md:col-span-1",
    href: "https://skills-fusion-client.vercel.app/",
    tags: ["Real-time", "Firebase", "WebRTC"],
    metrics: { latency: "<50ms" },
    year: "2024"
  },
  
  {
    id: "type-lab",
    title: "Type Lab",
    category: "Performance",
    description: "Minimalist typing benchmark with real-time WPM analytics, accuracy heatmaps, and progressive challenges.",
    images: ["/type.PNG"],
    colSpan: "md:col-span-1",
    href: "https://typi-love.netlify.app/",
    tags: ["Performance", "Canvas API"],
    metrics: { fps: "60" },
    year: "2023"
  },
  {
    id: "streaming-engine",
    title: "Streaming Engine",
    category: "Framer Engine",
    description: "Netflix-inspired streaming UI with infinite scroll, predictive prefetching, and gesture navigation.",
    images: ["/net.PNG"],
    colSpan: "md:col-span-1",
    href: "https://netflix-clone-jet-iota.vercel.app/",
    tags: ["Framer Engine", "Intersection Observer"],
    metrics: { preload: "95%" },
    year: "2024"
  },
  {
    id: "chronos-ui",
    title: "Chronos UI",
    category: "Experimental",
    description: "Conceptual time-management interface exploring fluid animations, spatial audio, and haptic feedback.",
    images: ["/clock.PNG"],
    colSpan: "md:col-span-1",
    href: "https://clock-amazing.netlify.app/",
    tags: ["Experimental", "Web Audio API"],
    metrics: { interactions: "12+" },
    year: "2024"
  },
];


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