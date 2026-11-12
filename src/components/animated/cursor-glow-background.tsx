"use client";

import {
    useEffect,
    useState,
    type PointerEvent as ReactPointerEvent,
    type RefObject,
} from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";

type Props = {
    /** Section/element whose bounds define the glow coordinate space. */
    targetRef: RefObject<HTMLElement | null>;
    /** Grid cell size in px. Default 48. */
    gridSize?: number;
    /** Radius of the radial mask that lights up the grid. Default 240. */
    spotlightRadius?: number;
    /** Diameter of the trailing glow blob in px. Default 512. */
    glowSize?: number;
    /** Peak opacity of the trailing glow. Default 0.12. */
    glowIntensity?: number;
    /** Show the base faint grid. Default true. */
    showBaseGrid?: boolean;
    /** Show the always-on corner glow (also the touch fallback). Default true. */
    showStaticGlow?: boolean;
    /** Whether to enable cursor effects (pass false on touch / reduced-motion). */
    enabled: boolean;
    showlitGridImage?: boolean;
    className?: string;
};

/**
 * Drop-in decorative background:
 *  - faint base grid
 *  - static corner glow
 *  - cursor-lit grid (only near the pointer)
 *  - soft glow blob trailing the cursor
 *
 * Purely presentational, pointer-events-none. Parent owns pointer tracking.
 */
export function CursorGlowBackground({
    targetRef,
    gridSize = 48,
    spotlightRadius = 240,
    glowSize = 520,
    glowIntensity = 0.12,
    showBaseGrid = false,
    showStaticGlow = false,
    enabled,
    showlitGridImage = false,
    className,
}: Props) {
    const reduce = useReducedMotion();
    const active = enabled && !reduce;

    // Raw pointer position in px (section-local).
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const presence = useMotionValue(0);

    // Smoothed copies.
    const sx = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.4 });
    const sy = useSpring(my, { stiffness: 140, damping: 22, mass: 0.4 });
    const sPresence = useSpring(presence, { stiffness: 60, damping: 20 });

    // Cursor-lit grid mask.
    const litMask = useMotionTemplate`radial-gradient(${spotlightRadius}px circle at ${sx}px ${sy}px, black 0%, transparent 70%)`;

    // Trailing glow.
    const half = glowSize / 2;
    const glowX = useTransform(sx, (v) => v - half);
    const glowY = useTransform(sy, (v) => v - half);
    const glowOpacity = useTransform(sPresence, (v) => v * glowIntensity);

    // Parent-wired pointer tracking lives here so callers don't repeat it.
    // We attach listeners to the target element directly via a portal-free ref.
    useEffect(() => {
        const el = targetRef.current;
        if (!el || !active) return;

        const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            // Jump straight to the cursor on first entry so it doesn't sweep in.
            if (presence.get() === 0) {
                sx.jump(x);
                sy.jump(y);
            }
            mx.set(x);
            my.set(y);
            presence.set(1);
        };
        const onLeave = () => presence.set(0);

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
        };
    }, [targetRef, active, mx, my, presence, sx, sy]);

    const baseGridImage =
        "linear-gradient(to right, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--foreground) 6%, transparent) 1px, transparent 1px)";
    const litGridImage =
        "linear-gradient(to right, color-mix(in srgb, var(--color-primary) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-primary) 55%, transparent) 1px, transparent 1px)";

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-0 ${className ?? ""}`}
        >
            {showBaseGrid && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: baseGridImage,
                        backgroundSize: `${gridSize}px ${gridSize}px`,
                        maskImage:
                            "radial-gradient(ellipse 80% 70% at 30% 35%, black 0%, transparent 75%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse 80% 70% at 30% 35%, black 0%, transparent 75%)",
                    }}
                />
            )}

            {showStaticGlow && (
                <div
                    className="absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-[0.10] blur-3xl"
                    style={{ background: "var(--color-primary)" }}
                />
            )}

            {active && (
                <>
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: showlitGridImage ? litGridImage : '',
                            backgroundSize: `${gridSize}px ${gridSize}px`,
                            maskImage: litMask,
                            WebkitMaskImage: litMask,
                            opacity: sPresence,
                        }}
                    />
                    <motion.div
                        className="absolute left-0 top-0 rounded-full blur-3xl"
                        style={{
                            width: glowSize,
                            height: glowSize,
                            x: glowX,
                            y: glowY,
                            opacity: glowOpacity,
                            background: "var(--color-primary)",
                        }}
                    />
                </>
            )}
        </div>
    );
}

/**
 * Helper hook: enables cursor effects only when the device has a fine
 * pointer (mouse/trackpad). Use the returned boolean for the `enabled` prop.
 */
export function useFinePointer() {
    const [fine, setFine] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
        const sync = () => setFine(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);
    return fine;
}