import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Star {
  id: string;
  position: string;
  animationDelay?: string;
  animationDuration?: string;
}

interface EarthBannerProps {
  size?: number;
  earthImage?: string;
  stars?: Star[];
  rotationDuration?: number;
  className?: string;
}

const defaultStars: Star[] = [
  { id: "star-1", position: "-left-5 top-0", animationDuration: "3s" },
  { id: "star-2", position: "-left-10 top-8", animationDuration: "2s" },
  { id: "star-3", position: "left-80 top-20", animationDuration: "4s" },
  { id: "star-4", position: "left-48 top-72", animationDuration: "3s" },
  { id: "star-5", position: "left-12 top-64", animationDuration: "1.5s" },
  { id: "star-6", position: "left-60 -top-12", animationDuration: "4s" },
  { id: "star-7", position: "left-72 top-14", animationDuration: "2s" },
];

const StarComponent: React.FC<{ star: Star; isParentHovered: boolean }> = ({
  star,
  isParentHovered,
}) => (
  <motion.div
    className={`absolute ${star.position}`}
    initial={{ scale: 1, rotate: 0 }}
    animate={{
      scale: isParentHovered ? 1.3 : 1,
      rotate: isParentHovered ? 180 : 0,
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.6,
    }}
    style={{
      animation: `twinkling ${star.animationDuration || "3s"} infinite`,
      filter: isParentHovered
        ? "brightness(2) drop-shadow(0 0 8px white)"
        : "brightness(1)",
    }}
  >
    <div className="flex relative">
      <div className="w-1 h-1.5 overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
          animate={{
            boxShadow: isParentHovered
              ? "5px 5px 0 0 #87CEEB, 0 0 10px rgba(255,255,255,0.8)"
              : "5px 5px 0 0 white",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="w-1 h-1.5 overflow-hidden relative">
        <motion.div
          className="absolute bottom-0 left-0 w-2 h-2 rounded-full"
          animate={{
            boxShadow: isParentHovered
              ? "-5px 5px 0 0 #87CEEB, 0 0 10px rgba(255,255,255,0.8)"
              : "-5px 5px 0 0 white",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
    <div className="flex relative">
      <div className="w-1 h-1.5 overflow-hidden relative">
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 rounded-full"
          animate={{
            boxShadow: isParentHovered
              ? "5px -5px 0 0 #87CEEB, 0 0 10px rgba(255,255,255,0.8)"
              : "5px -5px 0 0 white",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="w-1 h-1.5 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 rounded-full"
          animate={{
            boxShadow: isParentHovered
              ? "-5px -5px 0 0 #87CEEB, 0 0 10px rgba(255,255,255,0.8)"
              : "-5px -5px 0 0 white",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  </motion.div>
);

export default function EarthBanner({
  size = 250,
  earthImage = "earth.jpeg",
  stars = defaultStars,
  rotationDuration = 30,
  className = "",
}: EarthBannerProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth following
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <style jsx>{`
        @keyframes earthRotate {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 400px 0;
          }
        }
        @keyframes twinkling {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 1;
          }
        }
        .earth-container {
          cursor: pointer;
          perspective: 1000px;
        }
      `}</style>

      <motion.div
        className={`relative earth-container ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {/* Animated Orbit Rings */}
        {[1.3, 1.5, 1.7].map((multiplier, index) => (
          <motion.div
            key={`orbit-${index}`}
            className="absolute border-2 border-white/20 rounded-full pointer-events-none"
            style={{
              width: `${size * multiplier}px`,
              height: `${size * multiplier}px`,
              left: `${(-size * (multiplier - 1)) / 2}px`,
              top: `${(-size * (multiplier - 1)) / 2}px`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? [0.8, 1.2, 1] : 0,
              opacity: isHovered ? [0, 0.6, 0.3] : 0,
            }}
            transition={{
              duration: 1.2,
              delay: index * 0.2,
              ease: "easeOut",
              repeat: isHovered ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 0.5,
            }}
          />
        ))}

        {/* Main Earth */}
        <motion.div
          className="relative rounded-full transform-gpu"
          style={{
            height: `${size}px`,
            width: `${size}px`,
            backgroundImage: `url("${earthImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "left",
            rotateX,
            rotateY,
            ...{
              animation: `earthRotate ${
                isHovered ? rotationDuration / 2 : rotationDuration
              }s linear infinite`,
            },
          }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            // filter: isHovered
            //   ? "brightness(0.7) saturate(1.1) drop-shadow(0 0 30px rgba(255,255,255,0.3))"
            //   : "brightness(0.8) saturate(1)",
            boxShadow: isHovered
              ? [
                  "0px 0 50px rgba(255, 255, 255, 0.3)",
                  "-5px 0px 15px #c3f4ff inset",
                  "15px 2px 40px #000 inset",
                  "-24px -2px 50px #c3f4ff99 inset",
                  `${size}px 0px 60px #00000066 inset`,
                  `${Math.floor(size * 0.6)}px 0px 55px #000000aa inset`,
                ].join(", ")
              : [
                  "0px 0 20px rgba(255, 255, 255, 0.2)",
                  "-5px 0px 8px #c3f4ff inset",
                  "15px 2px 25px #000 inset",
                  "-24px -2px 34px #c3f4ff99 inset",
                  `${size}px 0px 44px #00000066 inset`,
                  `${Math.floor(size * 0.6)}px 0px 38px #000000aa inset`,
                ].join(", "),
            animationDuration: isHovered
              ? `${rotationDuration / 2}s`
              : `${rotationDuration}s`,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            duration: 0.8,
          }}
        >
          {/* Stars with enhanced animations */}
          {stars.map((star) => (
            <StarComponent
              key={star.id}
              star={star}
              isParentHovered={isHovered}
            />
          ))}

          {/* Atmospheric Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              background: isHovered
                ? "radial-gradient(circle at 30% 30%, rgba(135, 206, 235, 0.3) 0%, transparent 40%)"
                : "transparent",
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Floating Particles */}
        {isHovered && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * size * 1.5}px`,
                  top: `${Math.random() * size * 1.5}px`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -50, -100],
                  x: [
                    (Math.random() - 0.5) * 20,
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 60,
                  ],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </>
  );
}
