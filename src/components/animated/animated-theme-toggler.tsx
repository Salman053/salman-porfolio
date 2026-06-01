import React, { useCallback, useEffect, useRef, useState } from "react"
import { 
  Moon, Sun, Sparkles, Palette, RotateCw, Waves, Orbit, 
  ZoomIn, ZoomOut, Move, FlipHorizontal, FlipVertical,
  Wind, Atom, Flame, Droplet, Cloud, Zap,
  Square, Circle, Triangle, Heart, Star, Camera, Eye,
  Box
} from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"
import { useAppearance, type AnimationVariant } from "@/hooks/use-appearance"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: AnimationVariant
  showIconAnimation?: boolean
  rippleEffect?: boolean
  soundEffect?: boolean
}

interface VariantConfig {
  icon: any
  easing: string
  pseudoElement: string
  customAnimation?: (x: number, y: number, maxRadius: number, progress?: number) => PropertyIndexedKeyframes | Keyframe[]
  crossFade?: boolean
}

const EASINGS = {
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  gentle: "cubic-bezier(0.2, 0.9, 0.4, 1.1)",
  dramatic: "cubic-bezier(0.83, 0, 0.17, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  liquid: "cubic-bezier(0.42, 0, 0.58, 1)",
  accelerate: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  decelerate: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
}

const variantConfigs: Record<AnimationVariant, VariantConfig> = {
  // Original variants (optimized)
  circle: {
    icon: Circle,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
  },
  fade: {
    icon: Eye,
    easing: EASINGS.gentle,
    pseudoElement: "::view-transition-old(root)",
    customAnimation: () => [
      { opacity: 1, filter: "blur(0px)" },
      { opacity: 0, filter: "blur(2px)" }
    ],
    crossFade: true,
  },
  "slide-up": {
    icon: Sun,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "translateY(100%)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  "slide-down": {
    icon: Moon,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "translateY(-100%)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateY(0)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  "slide-left": {
    icon: Move,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "translateX(100%)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateX(0)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  "slide-right": {
    icon: Move,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "translateX(-100%)", opacity: 0, filter: "blur(4px)" },
      { transform: "translateX(0)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  rotate: {
    icon: RotateCw,
    easing: EASINGS.elastic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "rotate(-180deg) scale(0.5)", opacity: 0 },
      { transform: "rotate(0) scale(1)", opacity: 1 }
    ]
  },
  scale: {
    icon: ZoomIn,
    easing: EASINGS.spring,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scale(0)", opacity: 0 },
      { transform: "scale(1.05)", opacity: 1, offset: 0.7 },
      { transform: "scale(1)", opacity: 1 }
    ]
  },
  blur: {
    icon: Wind,
    easing: EASINGS.gentle,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "blur(12px)", opacity: 0, transform: "scale(1.1)" },
      { filter: "blur(0px)", opacity: 1, transform: "scale(1)" }
    ]
  },
  flip: {
    icon: FlipHorizontal,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "rotateY(90deg)", opacity: 0 },
      { transform: "rotateY(0deg)", opacity: 1 }
    ]
  },
  bounce: {
    icon: Zap,
    easing: EASINGS.bounce,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scale(0) translateY(100px)", opacity: 0 },
      { transform: "scale(1.1) translateY(-10px)", opacity: 1, offset: 0.7 },
      { transform: "scale(1) translateY(0)", opacity: 1 }
    ]
  },
  wave: {
    icon: Waves,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x, y, maxRadius) => [
      { clipPath: `circle(0% at ${x}px ${y}px)`, opacity: 0 },
      { clipPath: `circle(150% at ${x}px ${y}px)`, opacity: 1 }
    ]
  },
  glow: {
    icon: Sparkles,
    easing: EASINGS.gentle,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "brightness(0) blur(8px)", opacity: 0 },
      { filter: "brightness(1.2) blur(0px)", opacity: 1, offset: 0.8 },
      { filter: "brightness(1) blur(0px)", opacity: 1 }
    ]
  },
  spiral: {
    icon: Orbit,
    easing: EASINGS.dramatic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scale(0) rotate(-720deg)", opacity: 0 },
      { transform: "scale(1) rotate(0deg)", opacity: 1 }
    ]
  },
  none: {
    icon: Sun,
    easing: EASINGS.sharp,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [{ opacity: 1 }]
  },

  // New enhanced variants
  "morph-square": {
    icon: Square,
    easing: EASINGS.elastic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { clipPath: "inset(50% round 100%)", opacity: 0, transform: "scale(0.8)" },
      { clipPath: "inset(0% round 0%)", opacity: 1, transform: "scale(1)" }
    ]
  },
  "morph-heart": {
    icon: Heart,
    easing: EASINGS.bounce,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { clipPath: "polygon(50% 30%, 65% 15%, 85% 25%, 85% 50%, 50% 85%, 15% 50%, 15% 25%, 35% 15%)", opacity: 0 },
      { clipPath: "inset(0%)", opacity: 1 }
    ]
  },
  "perspective": {
    icon: Box,
    easing: EASINGS.dramatic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "perspective(500px) rotateX(90deg) translateZ(-100px)", opacity: 0 },
      { transform: "perspective(500px) rotateX(0deg) translateZ(0px)", opacity: 1 }
    ]
  },
  "fire": {
    icon: Flame,
    easing: EASINGS.elastic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "blur(8px) brightness(2)", transform: "scale(0.8)", opacity: 0 },
      { filter: "blur(0px) brightness(1)", transform: "scale(1)", opacity: 1 }
    ]
  },
  "water": {
    icon: Droplet,
    easing: EASINGS.liquid,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x, y) => [
      { clipPath: `circle(0% at ${x}px ${y}px)`, filter: "blur(4px)" },
      { clipPath: `circle(150% at ${x}px ${y}px)`, filter: "blur(0px)" }
    ]
  },
  "cloud": {
    icon: Cloud,
    easing: EASINGS.gentle,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "blur(16px)", opacity: 0, transform: "translateY(20px)" },
      { filter: "blur(0px)", opacity: 1, transform: "translateY(0px)" }
    ]
  },
  "star-burst": {
    icon: Star,
    easing: EASINGS.bounce,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", opacity: 0 },
      { clipPath: "inset(0%)", opacity: 1 }
    ]
  },
  "accordion": {
    icon: Move,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scaleX(0)", opacity: 0 },
      { transform: "scaleX(1)", opacity: 1 }
    ]
  },
  "accordion-vertical": {
    icon: Move,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scaleY(0)", opacity: 0 },
      { transform: "scaleY(1)", opacity: 1 }
    ]
  },
  "flip-vertical": {
    icon: FlipVertical,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "rotateX(90deg)", opacity: 0 },
      { transform: "rotateX(0deg)", opacity: 1 }
    ]
  },
  "zoom-out": {
    icon: ZoomOut,
    easing: EASINGS.spring,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scale(2)", opacity: 0, filter: "blur(8px)" },
      { transform: "scale(1)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  "shutter": {
    icon: Camera,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { clipPath: "polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%)", opacity: 0 },
      { clipPath: "inset(0%)", opacity: 1 }
    ]
  },
  "shutter-horizontal": {
    icon: Camera,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { clipPath: "polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)", opacity: 0 },
      { clipPath: "inset(0%)", opacity: 1 }
    ]
  },
  "ripple": {
    icon: Waves,
    easing: EASINGS.elastic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: (x, y) => [
      { boxShadow: `0 0 0 0px rgba(255,255,255,0)`, opacity: 0 },
      { boxShadow: `0 0 0 ${Math.max(window.innerWidth, window.innerHeight)}px rgba(255,255,255,0.1)`, opacity: 1 }
    ]
  },
  "explode": {
    icon: Atom,
    easing: EASINGS.dramatic,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "scale(0.5)", opacity: 0, filter: "blur(12px)" },
      { transform: "scale(1.1)", opacity: 0.8, offset: 0.5 },
      { transform: "scale(1)", opacity: 1, filter: "blur(0px)" }
    ]
  },
  "implode": {
    icon: Orbit,
    easing: EASINGS.dramatic,
    pseudoElement: "::view-transition-old(root)",
    customAnimation: () => [
      { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
      { transform: "scale(0)", opacity: 0, filter: "blur(12px)" }
    ],
    crossFade: true,
  },
  "color-wave": {
    icon: Palette,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "hue-rotate(0deg)", opacity: 0 },
      { filter: "hue-rotate(180deg)", opacity: 0.5, offset: 0.5 },
      { filter: "hue-rotate(0deg)", opacity: 1 }
    ]
  },
  "flash": {
    icon: Zap,
    easing: EASINGS.sharp,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { backgroundColor: "white", opacity: 0 },
      { backgroundColor: "white", opacity: 1, offset: 0.3 },
      { backgroundColor: "transparent", opacity: 1 }
    ]
  },
  "shatter": {
    icon:  Box,
    easing: EASINGS.dramatic,
    pseudoElement: "::view-transition-old(root)",
    customAnimation: () => [
      { transform: "translateX(0) translateY(0) rotate(0deg)", opacity: 1 },
      { transform: "translateX(-20px) translateY(20px) rotate(-5deg)", opacity: 0, offset: 0.5 },
      { transform: "translateX(20px) translateY(-20px) rotate(5deg)", opacity: 0 }
    ],
    crossFade: true,
  },
  "mosaic": {
    icon: Square,
    easing: EASINGS.gentle,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { filter: "blur(20px) brightness(0.5)", transform: "scale(0.95)", opacity: 0 },
      { filter: "blur(0px) brightness(1)", transform: "scale(1)", opacity: 1 }
    ]
  },
  "glitch": {
    icon: Sparkles,
    easing: EASINGS.smooth,
    pseudoElement: "::view-transition-new(root)",
    customAnimation: () => [
      { transform: "skew(0deg)", opacity: 0, filter: "blur(0px)" },
      { transform: "skew(10deg)", opacity: 0.5, offset: 0.2, filter: "blur(2px)" },
      { transform: "skew(-5deg)", opacity: 0.8, offset: 0.4, filter: "blur(0px)" },
      { transform: "skew(0deg)", opacity: 1 }
    ]
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 1200,
  variant,
  showIconAnimation = true,
  rippleEffect = true,
  soundEffect = false,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { appearance, updateAppearance, animationVariant: globalVariant } = useAppearance()
  const currentVariant = variant || globalVariant
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Play subtle sound effect if enabled
  const playSound = useCallback(() => {
    if (!soundEffect) return
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = isDark ? 880 : 440
    gainNode.gain.value = 0.1
    
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.3)
    oscillator.stop(audioContext.currentTime + 0.3)
  }, [isDark, soundEffect])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [appearance])

  const getCircleAnimation = useCallback((x: number, y: number, maxRadius: number) => {
    return {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    }
  }, [])

  const getCustomAnimation = useCallback((
    variant: AnimationVariant,
    x: number,
    y: number,
    maxRadius: number
  ) => {
    const config = variantConfigs[variant]
    if (config?.customAnimation) {
      return config.customAnimation(x, y, maxRadius)
    }
    return getCircleAnimation(x, y, maxRadius)
  }, [getCircleAnimation])

  const toggleTheme = useCallback(async () => {
    const button = buttonRef.current
    if (!button || isAnimating) return

    setIsAnimating(true)

    // Icon animation
    if (showIconAnimation) {
      button.classList.add("animate-icon-bounce")
      await new Promise(resolve => setTimeout(resolve, 300))
      button.classList.remove("animate-icon-bounce")
    }

    // Sound effect
    playSound()

    // Ripple effect
    if (rippleEffect) {
      const ripple = document.createElement("span")
      ripple.className = "absolute inset-0 rounded-full bg-white/20 scale-0"
      button.appendChild(ripple)
      requestAnimationFrame(() => {
        ripple.style.transform = "scale(4)"
        ripple.style.opacity = "0"
      })
      setTimeout(() => ripple.remove(), 500)
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark")
      updateAppearance(isCurrentlyDark ? "light" : "dark")
    }

    if (currentVariant === "none" || typeof document.startViewTransition !== "function") {
      applyTheme()
      setIsAnimating(false)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        const config = variantConfigs[currentVariant]
        const animation = getCustomAnimation(currentVariant, x, y, maxRadius)

        // Animate old root out if cross-fade
        if (config?.crossFade) {
          document.documentElement.animate(
            [
              { opacity: 1, filter: "blur(0px)" },
              { opacity: 0, filter: "blur(4px)" }
            ],
            {
              duration: duration / 2,
              easing: EASINGS.gentle,
              pseudoElement: "::view-transition-old(root)",
            }
          )
        }

        // Animate new root in
        document.documentElement.animate(
          animation as PropertyIndexedKeyframes | Keyframe[],
          {
            duration,
            easing: config?.easing || EASINGS.smooth,
            pseudoElement: config?.pseudoElement,
          }
        )

        // Reset animating state after animation completes
        setTimeout(() => {
          setIsAnimating(false)
        }, duration)
      })
    }
  }, [currentVariant, duration, getCustomAnimation, showIconAnimation, rippleEffect, soundEffect, isAnimating, updateAppearance, playSound])

  const CurrentIcon = variantConfigs[currentVariant]?.icon || Sun

  return (
    <>
      <style>{`
        @keyframes icon-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(15deg); }
        }

        @keyframes icon-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.5; }
        }

        @keyframes icon-flash {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }

        .animate-icon-bounce {
          animation: icon-bounce 0.3s ease-in-out;
        }

        .animate-icon-spin {
          animation: icon-spin 0.5s ease-in-out;
        }

        .animate-icon-pulse {
          animation: icon-pulse 0.3s ease-in-out;
        }

        .animate-icon-flash {
          animation: icon-flash 0.3s ease-in-out;
        }

        ::view-transition-old(root) {
          animation: none !important;
        }

        ::view-transition-new(root) {
          animation: none !important;
        }
      `}</style>

      <button
        type="button"
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "relative overflow-hidden rounded-full p-2.5 transition-all duration-300",
          "hover:scale-110 active:scale-95",
          "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
          "shadow-lg hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isAnimating && "pointer-events-none",
          className
        )}
        disabled={isAnimating}
        {...props}
      >
        <div className="relative z-10">
          <CurrentIcon className={cn(
            "size-5 transition-transform duration-200",
            showIconAnimation && "group-hover:rotate-12"
          )} />
        </div>

        {/* Ripple effect on click */}
        {isAnimating && rippleEffect && (
          <span className="absolute inset-0 animate-pulse rounded-full bg-blue-500/20" />
        )}

        <span className="sr-only">Toggle theme</span>
      </button>
    </>
  )
}

// Enhanced variant selector with categories
interface ThemeVariantSelectorProps {
  currentVariant: AnimationVariant
  onVariantChange: (variant: AnimationVariant) => void
  compact?: boolean
}

export const ThemeVariantSelector = ({ currentVariant, onVariantChange, compact = false }: ThemeVariantSelectorProps) => {
  const variantGroups = [
    {
      category: "Classic",
      variants: [
        { value: "circle", label: "Circle", icon: Circle },
        { value: "fade", label: "Fade", icon: Eye },
        { value: "none", label: "None", icon: Sun },
      ]
    },
    {
      category: "Slide",
      variants: [
        { value: "slide-up", label: "Up", icon: Sun },
        { value: "slide-down", label: "Down", icon: Moon },
        { value: "slide-left", label: "Left", icon: Move },
        { value: "slide-right", label: "Right", icon: Move },
      ]
    },
    {
      category: "Transform",
      variants: [
        { value: "rotate", label: "Rotate", icon: RotateCw },
        { value: "scale", label: "Scale", icon: ZoomIn },
        { value: "zoom-out", label: "Zoom Out", icon: ZoomOut },
        { value: "flip", label: "Flip H", icon: FlipHorizontal },
        { value: "flip-vertical", label: "Flip V", icon: FlipVertical },
        { value: "perspective", label: "3D", icon: Cube },
      ]
    },
    {
      category: "Organic",
      variants: [
        { value: "bounce", label: "Bounce", icon: Zap },
        { value: "wave", label: "Wave", icon: Waves },
        { value: "ripple", label: "Ripple", icon: Waves },
        { value: "water", label: "Water", icon: Droplet },
        { value: "fire", label: "Fire", icon: Flame },
        { value: "cloud", label: "Cloud", icon: Cloud },
      ]
    },
    {
      category: "Morph",
      variants: [
        { value: "morph-square", label: "Square", icon: Square },
        { value: "morph-heart", label: "Heart", icon: Heart },
        { value: "star-burst", label: "Star", icon: Star },
        { value: "accordion", label: "Accordion", icon: Move },
        { value: "accordion-vertical", label: "Accordion V", icon: Move },
      ]
    },
    {
      category: "Cinematic",
      variants: [
        { value: "shutter", label: "Shutter", icon: Camera },
        { value: "shutter-horizontal", label: "Shutter H", icon: Camera },
        { value: "explode", label: "Explode", icon: Atom },
        { value: "implode", label: "Implode", icon: Orbit },
        { value: "shatter", label: "Shatter", icon: Cube },
      ]
    },
    {
      category: "Effects",
      variants: [
        { value: "blur", label: "Blur", icon: Wind },
        { value: "glow", label: "Glow", icon: Sparkles },
        { value: "glitch", label: "Glitch", icon: Sparkles },
        { value: "flash", label: "Flash", icon: Zap },
        { value: "color-wave", label: "Color Wave", icon: Palette },
      ]
    },
    {
      category: "Premium",
      variants: [
        { value: "spiral", label: "Spiral", icon: Orbit },
        { value: "mosaic", label: "Mosaic", icon: Square },
        { value: "sparkle", label: "Sparkle", icon: Sparkles },
      ]
    }
  ]

  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5 p-3">
        {Object.entries(variantConfigs).map(([key, config]) => {
          const Icon = config.icon
          return (
            <button
              key={key}
              onClick={() => onVariantChange(key as AnimationVariant)}
              className={cn(
                "rounded-lg p-2 transition-all",
                currentVariant === key
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              )}
              title={key.replace("-", " ")}
            >
              <Icon className="size-4" />
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      {variantGroups.map((group) => (
        <div key={group.category}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {group.category}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {group.variants.map((variant) => {
              const Icon = variant.icon
              return (
                <button
                  key={variant.value}
                  onClick={() => onVariantChange(variant.value as AnimationVariant)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs transition-all",
                    currentVariant === variant.value
                      ? "bg-blue-500 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{variant.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Helper component to preview animations
export const AnimationPreview = ({ variant, duration = 500 }: { variant: AnimationVariant; duration?: number }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const playPreview = useCallback(() => {
    if (!previewRef.current || isPlaying) return
    
    setIsPlaying(true)
    const config = variantConfigs[variant]
    const element = previewRef.current
    
    const animation = element.animate(
      config.customAnimation?.(
        element.clientWidth / 2,
        element.clientHeight / 2,
        Math.hypot(element.clientWidth, element.clientHeight)
      ) || [
        { opacity: 0, transform: "scale(0.8)" },
        { opacity: 1, transform: "scale(1)" }
      ],
      {
        duration,
        easing: config.easing,
        fill: "forwards"
      }
    )
    
    animation.onfinish = () => setIsPlaying(false)
  }, [variant, duration, isPlaying])

  return (
    <div
      ref={previewRef}
      onClick={playPreview}
      className={cn(
        "relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-xl transition-all",
        "bg-gradient-to-br from-blue-500 to-purple-600",
        "hover:scale-105 active:scale-95",
        isPlaying && "pointer-events-none"
      )}
    >
      <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
        {React.createElement(variantConfigs[variant]?.icon || Sun, {
          className: "size-8 text-white"
        })}
      </div>
      <div className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
        Preview
      </div>
    </div>
  )
}

// Missing Cube icon import
const Cube = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M12 22V12" />
    <path d="M9 8.7l3-1.7 3 1.7" />
    <path d="M5.5 10.2L12 14l6.5-3.8" />
  </svg>
)

export default AnimatedThemeToggler