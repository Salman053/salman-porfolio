
// =========================
// components/CardSpotlight.tsx — spotlight + hover grow
// =========================
"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function CardSpotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current!;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--y", `${e.clientY - rect.top}px`);
      }}
      className={cn(
        "spotlight rounded-2xl border bg-card/60 backdrop-blur transition-transform will-change-transform",
        " ",
        className
      )}
    >
      {children}
    </div>
  );
}
