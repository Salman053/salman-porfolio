// =========================
// components/ParallaxSection.tsx — experience/education/future
// =========================
"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: any[];
}) {
  const { scrollYProgress } = useScroll({ offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -60]);
  return (
    <section className="section" id={id}>
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">{title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              style={{ x }}
              className="rounded-2xl border p-6 bg-card/60"
            >
              {it.company && (
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {it.role} — {it.company}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {it.period}
                  </span>
                </div>
              )}
              {it.school && (
                <div className="flex justify-between">
                  <h3 className="font-semibold">{it.school}</h3>
                  <span className="text-sm text-muted-foreground">
                    {it.period}
                  </span>
                </div>
              )}
              {it.title && <h3 className="font-semibold">{it.title}</h3>}
              <ul className="mt-3 space-y-2 text-muted-foreground">
                {(it.bullets ?? [it.detail]).map((b: string, j: number) => (
                  <li key={j}>• {b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
