// =========================
// components/ProjectGallery.tsx — cards + modal details
// =========================
"use client";
import { useState } from "react";
import CardSpotlight from "@/components/animated/card-spotlight";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectGallery({ projects }: { projects: any[] }) {
  const [active, setActive] = useState<any | null>(null);
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <button
            key={p.title}
            className="text-left"
            onClick={() => setActive(p)}
          >
            <CardSpotlight className="overflow-hidden">
              <div className="relative h-44">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-muted-foreground">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t: string) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-md border bg-background/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </CardSpotlight>
          </button>
        ))}
      </div>

      {/* Details modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal
              className="max-w-2xl w-full rounded-2xl border bg-background"
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56">
                <Image
                  src={active.image}
                  alt=""
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{active.title}</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {active.details.map((d: string) => (
                    <li key={d}>• {d}</li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-3">
                  <a
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"
                    href={active.href}
                    target="_blank"
                  >
                    Live
                  </a>
                  <a
                    className="px-4 py-2 rounded-xl border"
                    href={`https://github.com/${active.repo}`}
                    target="_blank"
                  >
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
