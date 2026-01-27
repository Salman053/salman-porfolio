"use client";

import * as React from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section className="relative bg-transparent py-20 px-6 md:px-12 overflow-hidden">
      {/* soft global glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* LEFT: FORM */}
        <div className="group relative">
          {/* animated border frame */}
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="rounded-2xl border border-border/80 bg-card/90 p-8 shadow-sm backdrop-blur-md">
            <header className="mb-6">
              <h2 className="text-3xl font-semibold text-foreground">Contact Us</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell me briefly what you need. I’ll get back within 24 hours.
              </p>
            </header>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle form here
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" id="name">
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-foreground placeholder:text-muted-foreground/70 outline-none ring-0 transition focus:border-blue-400 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Muhammad Salman Khan"
                  />
                </Field>
                <Field label="Email" id="email">
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-foreground placeholder:text-muted-foreground/70 outline-none ring-0 transition focus:border-blue-400 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>

              <Field label="Subject" id="subject">
                <input
                  id="subject"
                  required
                  className="h-11 w-full rounded-xl border border-border/70 bg-background/60 px-3 text-foreground placeholder:text-muted-foreground/70 outline-none ring-0 transition focus:border-blue-400 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Project inquiry / Collaboration"
                />
              </Field>

              <Field label="Message" id="message">
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full rounded-xl border border-border/70 bg-background/60 p-3 text-foreground placeholder:text-muted-foreground/70 outline-none ring-0 transition focus:border-blue-400 focus:bg-background/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="A short summary of your idea, scope, and timeline…"
                />
              </Field>

              <motion.button
                whileTap={{ scale: 0.98 }}
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl border border-border/80 bg-foreground text-background transition hover:bg-foreground/90"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>

        {/* RIGHT: ANIMATED THREADS PANEL */}
        <div className="relative">
          {/* subtle grid texture */}
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md"
          />
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6">
            {/* flowing lines */}
            <AnimatedThreads />

            {/* floating nodes */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-6 top-8 h-24 w-24 rounded-full bg-white/5 blur-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute bottom-8 right-10 h-16 w-16 rounded-full bg-blue-500/10 blur-lg"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* caption card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 mt-44 rounded-xl border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur"
            >
              <h3 className="text-lg font-medium text-foreground">
                Let’s build something reliable.
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Clean code, predictable delivery, and clear communication.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small helpers ---------- */

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block text-sm font-medium text-foreground/90">
        {label}
      </span>
      {children}
    </label>
  );
}

/* ---------- animated threads (minimal + professional) ---------- */

function AnimatedThreads() {
  return (
    <svg
      viewBox="0 0 640 360"
      className="mx-auto block h-[340px] w-full text-foreground/15"
      role="img"
      aria-label="Animated decorative connection threads"
    >
      {/* base paths */}
      <motion.path
        d="M10 60 C 160 30, 260 120, 400 80 S 560 30, 630 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 10"
        animate={{ strokeDashoffset: [0, -140] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M10 150 C 140 140, 260 200, 380 150 S 520 120, 630 200"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 12"
        animate={{ strokeDashoffset: [0, -160] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.path
        d="M10 240 C 140 280, 260 220, 380 260 S 520 300, 630 250"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 9"
        animate={{ strokeDashoffset: [0, -120] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      {/* accent pulse travelling along mid path */}
      {/* <motion.circle
        r="4"
        fill="currentColor"
        className="text-blue-500/50"
      >
        <motion.
          path="M10 150 C 140 140, 260 200, 380 150 S 520 120, 630 200"
          dur="6s"
          repeatCount="indefinite"
          rotate="auto"
        />
      </motion.circle> */}
    </svg>
  );
}
