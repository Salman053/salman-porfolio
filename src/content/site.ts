
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
      { school: "BS — Computer Science", period: "2019 — 2023", bullets: ["Algorithms, DBMS, Networks", "Capstone on retail systems"]},
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
  