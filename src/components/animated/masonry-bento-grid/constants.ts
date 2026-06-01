export const EASE = {
  premium: [0.22, 1, 0.36, 1] as const,
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const SPRING = {
  default: { stiffness: 100, damping: 30, mass: 0.5 },
  tight: { stiffness: 400, damping: 25, mass: 0.3 },
  loose: { stiffness: 50, damping: 20, mass: 1 },
  magnetic: { stiffness: 150, damping: 15, mass: 0.1 },
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1440,
} as const;
