"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  motionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { CursorGlowBackground, useFinePointer } from "../animated/cursor-glow-background";

type Ease = [number, number, number, number];
const EASE: Ease = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  Node graph (hero-specific)                                                 */
/* -------------------------------------------------------------------------- */
const NODES = [
  { x: 90, y: 90, r: 5, depth: 0.6 },
  { x: 220, y: 60, r: 8, depth: 1.0 },
  { x: 330, y: 150, r: 5, depth: 0.7 },
  { x: 170, y: 210, r: 11, depth: 1.5 },
  { x: 300, y: 290, r: 6, depth: 0.9 },
  { x: 70, y: 320, r: 5, depth: 0.5 },
];
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 2],
  [3, 4],
  [3, 5],
];

function NodeGraph({
  animate,
  nx,
  ny,
}: {
  animate: boolean;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  const pos = useMemo(
    () => NODES.map((n) => ({ x: motionValue(n.x), y: motionValue(n.y) })),
    []
  );

  const update = () => {
    NODES.forEach((n, i) => {
      pos[i].x.set(n.x + nx.get() * n.depth * 46);
      pos[i].y.set(n.y + ny.get() * n.depth * 46);
    });
  };
  useMotionValueEvent(nx, "change", update);
  useMotionValueEvent(ny, "change", update);

  return (
    <svg
      viewBox="0 0 400 380"
      className="h-full w-full overflow-visible text-foreground"
      fill="none"
      aria-hidden="true"
    >
      {LINKS.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={pos[a].x}
          y1={pos[a].y}
          x2={pos[b].x}
          y2={pos[b].y}
          stroke="currentColor"
          strokeOpacity={0.24}
          strokeWidth={1}
          initial={animate ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.1 + i * 0.12, ease: EASE }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={pos[i].x}
          cy={pos[i].y}
          r={n.r}
          className={i === 3 ? "fill-primary" : "fill-foreground"}
          fillOpacity={i === 3 ? 0.9 : 0.35}
          initial={animate ? { opacity: 0, scale: 0.4 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 + i * 0.1, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Magnetic (hero-specific CTA wrapper)                                       */
/* -------------------------------------------------------------------------- */
function Magnetic({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.3 });

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block p-3 -m-3"
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */
export default function HeroText() {
  const reduce = useReducedMotion();
  const motionOn = !reduce;
  const finePointer = useFinePointer();
  const interactive = motionOn && finePointer;

  const sectionRef = useRef<HTMLElement>(null);

  // Pointer signal for the node graph parallax.
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const snx = useSpring(nx, { stiffness: 50, damping: 16 });
  const sny = useSpring(ny, { stiffness: 50, damping: 16 });

  // Feed pointer coords into the node graph (its own small listener; the
  // heavy lift for the glow lives inside <CursorGlowBackground />).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !interactive) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx.set((e.clientX - r.left) / r.width - 0.5);
      ny.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      nx.set(0);
      ny.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, nx, ny]);

  const line: Variants = {
    hidden: { y: "108%" },
    show: (i: number) => ({
      y: "0%",
      transition: { duration: 1.1, delay: 0.15 + i * 0.14, ease: EASE },
    }),
  };
  const fade: Variants = {
    hidden: { opacity: 0 },
    show: (delay: number) => ({
      opacity: 1,
      transition: { duration: 0.8, delay, ease: "easeOut" },
    }),
  };
  const initial = motionOn ? "hidden" : false;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-background pt-28 pb-10 md:pt-32 md:pb-14"
    >
      {/* Reusable decorative background */}
      <CursorGlowBackground
        showlitGridImage={true}
        targetRef={sectionRef}
        enabled={interactive}
      />

      {/* Node graph, top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-28 z-0 hidden h-[22rem] w-[24rem] opacity-80 lg:block xl:right-16"
      >
        <NodeGraph animate={motionOn} nx={snx} ny={sny} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-6 md:px-12">
        {/* Availability */}
        <motion.div
          variants={fade}
          custom={0.1}
          initial={initial}
          animate="show"
          className="flex items-center gap-3 text-sm text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Available for new projects
        </motion.div>

        {/* Headline */}
        <h1 className="mt-10 flex flex-col font-serif font-normal tracking-[-0.035em] text-foreground md:mt-16">
          <span className="block overflow-hidden pb-[0.12em] pr-[0.05em]">
            <motion.span
              custom={0}
              variants={line}
              initial={initial}
              animate="show"
              className="block text-[clamp(3.5rem,13vw,11.5rem)] leading-[0.92]"
            >
              Meet Salman
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] pr-[0.05em] md:ml-[8vw]">
            <motion.span
              custom={1}
              variants={line}
              initial={initial}
              animate="show"
              className="flex items-baseline gap-[0.12em] text-[clamp(3.5rem,13vw,11.5rem)] leading-[0.92]"
            >
              <span className="font-sans font-extralight italic text-primary">
                /
              </span>
              Khan
            </motion.span>
          </span>
        </h1>

        <div className="flex-1" />

        {/* Info row */}
        <motion.div
          variants={fade}
          custom={0.9}
          initial={initial}
          animate="show"
          className="mt-16 grid grid-cols-1 gap-10 border-t border-foreground/15 pt-8 md:mt-24 lg:grid-cols-12 lg:gap-8"
        >
          <p className="max-w-[34ch] font-serif text-xl leading-relaxed text-foreground md:text-2xl lg:col-span-5">
            I design and build scalable ecosystems and premium digital
            experiences.
          </p>

          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-4">
            <div>
              <dt className="text-sm font-medium text-foreground">Systems</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Architecture, APIs and platforms that grow with the product.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-foreground">
                Interfaces
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Fast, considered front ends that feel right on every device.
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-3 lg:justify-end">
            <Magnetic enabled={interactive}>
              <motion.a
                href="#contact"
                whileHover={motionOn ? { scale: 1.03 } : undefined}
                whileTap={motionOn ? { scale: 0.98 } : undefined}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start a project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            </Magnetic>

            <a
              href="#work"
              className="rounded-full px-5 py-3.5 text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              See selected work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}