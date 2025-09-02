import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedButtonProps {
  initialText?: string;
  hoverText?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'purple' | 'blue' | 'green' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const colorVariants = {
  purple: {
    primary: '#8e26e2',
    secondary: '#5e2b83',
    light: '#f4b1fd',
    accent: '#d190ff',
    text: '#ffe7ff'
  },
  blue: {
    primary: '#2563eb',
    secondary: '#1e40af',
    light: '#93c5fd',
    accent: '#60a5fa',
    text: '#eff6ff'
  },
  green: {
    primary: '#059669',
    secondary: '#047857',
    light: '#86efac',
    accent: '#4ade80',
    text: '#ecfdf5'
  },
  orange: {
    primary: '#ea580c',
    secondary: '#c2410c',
    light: '#fdba74',
    accent: '#fb923c',
    text: '#fff7ed'
  }
};

const sizeVariants = {
  sm: { width: 160, height: 50, fontSize: 16 },
  md: { width: 220, height: 80, fontSize: 20 },
  lg: { width: 280, height: 100, fontSize: 24 }
};

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  initialText = "Join Today",
  hoverText = "Join Now",
  onClick,
  className = "",
  variant = 'purple',
  size = 'md',
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const colors = colorVariants[variant];
  const dimensions = sizeVariants[size];
  const scaleFactor = size === 'sm' ? 0.7 : size === 'lg' ? 1.3 : 1;

  const splitText = (text: string) => text.split('').map((char, index) => ({ char, index }));

  const charVariants = {
    initial: { y: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { y: -70, opacity: 0, filter: 'blur(3px)' },
    enter: { 
      y: [50, 70, -15, 0], 
      opacity: [0, 1, 1, 1], 
      filter: ['blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
    }
  };

  return (
    <>
      <style jsx>{`
        .animated-button {
          --primary: ${colors.primary};
          --secondary: ${colors.secondary};
          --light: ${colors.light};
          --accent: ${colors.accent};
          --text: ${colors.text};
          --radius: ${18 * scaleFactor}px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes swingArrow {
          50% { transform: translateX(${5 * scaleFactor}px) scale(${0.9 * scaleFactor}); }
        }

        @keyframes rotateArrowLine {
          50% { transform: rotate(30deg); }
          80% { transform: rotate(55deg); }
        }

        @keyframes rotateArrowLine2 {
          50% { transform: rotate(330deg); }
          80% { transform: rotate(300deg); }
        }

        @keyframes splash {
          to {
            stroke-dasharray: 2 60;
            stroke-dashoffset: -60;
          }
        }

        @keyframes path {
          from { stroke: white; }
          to {
            stroke-dashoffset: -480;
            stroke: ${colors.light};
          }
        }
      `}</style>

      <motion.button
        className={`animated-button relative cursor-pointer bg-transparent border-0 outline-none font-semibold ${className}`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          fontSize: dimensions.fontSize,
          borderRadius: 'var(--radius)',
          transform: `rotate(353deg) skewX(4deg)`,
          letterSpacing: '-1px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background with shadow */}
        <motion.div
          className="absolute inset-0 rounded-[inherit]"
          style={{ filter: 'blur(1px)' }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              borderRadius: 'calc(var(--radius) * 1.1)',
              background: 'var(--secondary)',
              filter: 'blur(5px)',
            }}
            animate={{
              boxShadow: isActive ? [
                `-${7 * scaleFactor}px ${6 * scaleFactor}px 0 0 rgb(115 75 155 / 40%)`,
                `-${14 * scaleFactor}px ${12 * scaleFactor}px 0 0 rgb(115 75 155 / 25%)`,
                `-${21 * scaleFactor}px ${18 * scaleFactor}px ${4 * scaleFactor}px 0 rgb(115 75 155 / 15%)`
              ].join(', ') : [
                `-${7 * scaleFactor}px ${6 * scaleFactor}px 0 0 rgb(115 75 155 / 40%)`,
                `-${14 * scaleFactor}px ${12 * scaleFactor}px 0 0 rgb(115 75 155 / 30%)`,
                `-${21 * scaleFactor}px ${18 * scaleFactor}px ${4 * scaleFactor}px 0 rgb(115 75 155 / 25%)`,
                `-${28 * scaleFactor}px ${24 * scaleFactor}px ${8 * scaleFactor}px 0 rgb(115 75 155 / 15%)`,
                `-${35 * scaleFactor}px ${30 * scaleFactor}px ${12 * scaleFactor}px 0 rgb(115 75 155 / 12%)`,
                `-${42 * scaleFactor}px ${36 * scaleFactor}px ${16 * scaleFactor}px 0 rgb(115 75 155 / 8%)`,
                `-${56 * scaleFactor}px ${42 * scaleFactor}px ${20 * scaleFactor}px 0 rgb(115 75 155 / 5%)`
              ].join(', ')
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Wrap container */}
        <motion.div
          className="relative h-full overflow-hidden rounded-[inherit]"
          style={{
            padding: 3 * scaleFactor,
            background: `linear-gradient(to bottom, var(--light) 0%, var(--primary) 100%)`
          }}
          animate={{
            transform: isActive 
              ? `translate(${3 * scaleFactor}px, ${-3 * scaleFactor}px)`
              : isHovered 
                ? `translate(${8 * scaleFactor}px, ${-8 * scaleFactor}px)`
                : `translate(${6 * scaleFactor}px, ${-6 * scaleFactor}px)`
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Outline shimmer effect */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] overflow-hidden"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-[2px] w-[120px] h-[300px] m-auto"
              style={{
                background: 'linear-gradient(to right, transparent 0%, white 50%, transparent 100%)'
              }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            className="relative h-full flex items-center justify-center z-10 font-semibold pointer-events-none"
            style={{
              gap: 16 * scaleFactor,
              borderRadius: 'calc(var(--radius) * 0.85)',
              background: `linear-gradient(to bottom, var(--accent) 0%, var(--primary) 100%)`,
            }}
            animate={{
              boxShadow: isActive ? [
                `inset ${-1 * scaleFactor}px ${12 * scaleFactor}px ${8 * scaleFactor}px ${-5 * scaleFactor}px rgba(71, 0, 137, 0.4)`,
                `inset 0px ${-3 * scaleFactor}px ${8 * scaleFactor}px 0px var(--light)`
              ].join(', ') : [
                `inset ${-2 * scaleFactor}px ${12 * scaleFactor}px ${11 * scaleFactor}px ${-5 * scaleFactor}px var(--light)`,
                `inset ${1 * scaleFactor}px ${-3 * scaleFactor}px ${11 * scaleFactor}px 0px rgb(0 0 0 / 35%)`
              ].join(', ')
            }}
          >
            {/* Content overlay */}
            <div 
              className="absolute inset-0 z-10 opacity-70 m-auto"
              style={{
                width: '80%',
                top: '45%',
                bottom: '35%',
                background: 'linear-gradient(to bottom, transparent, var(--primary))',
                filter: 'brightness(1.3) blur(5px)'
              }}
            />

            {/* Text Animation */}
            <div className="relative z-20 flex">
              <AnimatePresence mode="wait">
                {!isFocused ? (
                  <motion.div key="initial" className="flex">
                    {splitText(initialText).map(({ char, index }) => (
                      <motion.span
                        key={`initial-${index}`}
                        className="block"
                        style={{
                          color: 'var(--text)',
                          textShadow: `-1px 1px 2px var(--secondary)`,
                          marginLeft: char === ' ' ? `${5 * scaleFactor}px` : '0'
                        }}
                        variants={charVariants}
                        initial="initial"
                        animate={isHovered ? "enter" : "initial"}
                        exit="exit"
                        transition={{ 
                          duration: isHovered ? 0.7 : 1.2, 
                          delay: index * 0.03,
                          ease: "easeOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="hover" className="flex">
                    {splitText(hoverText).map(({ char, index }) => (
                      <motion.span
                        key={`hover-${index}`}
                        className="block"
                        style={{
                          color: 'var(--text)',
                          textShadow: `-1px 1px 2px var(--secondary)`,
                          marginLeft: char === ' ' ? `${5 * scaleFactor}px` : '0'
                        }}
                        variants={charVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.03,
                          ease: "easeOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Arrow Icon */}
            <motion.div
              className="relative z-20"
              animate={{
                x: isFocused ? -128 * scaleFactor : 0
              }}
              transition={{ duration: 1, ease: [0.7, -0.5, 0.3, 1.5] }}
            >
              <motion.div
                className="relative"
                style={{
                  width: 24 * scaleFactor,
                  height: 3 * scaleFactor,
                  borderRadius: 1 * scaleFactor,
                  background: 'linear-gradient(to bottom, var(--text), var(--light))',
                  boxShadow: `-2px 2px 5px var(--primary)`,
                  transform: `scale(${0.9 * scaleFactor})`
                }}
                animate={isHovered ? { x: [0, 5 * scaleFactor, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute"
                  style={{
                    width: 14 * scaleFactor,
                    height: 3 * scaleFactor,
                    borderRadius: 15 * scaleFactor,
                    right: 0,
                    top: 1 * scaleFactor,
                    background: 'linear-gradient(to bottom, var(--text), var(--light))',
                    boxShadow: '1px -2px 3px -1px var(--primary)',
                    transformOrigin: 'center right'
                  }}
                  animate={{
                    rotate: isHovered ? [44, 30, 55, 44] : 44
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute"
                  style={{
                    width: 14 * scaleFactor,
                    height: 3 * scaleFactor,
                    borderRadius: 15 * scaleFactor,
                    right: 0,
                    bottom: 1 * scaleFactor,
                    background: 'linear-gradient(200deg, var(--text), var(--light))',
                    boxShadow: '-2px 2px 3px 0 var(--primary)',
                    transformOrigin: 'center right'
                  }}
                  animate={{
                    rotate: isHovered ? [316, 330, 300, 316] : 316
                  }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Border path */}
          <svg 
            className="absolute bottom-0 left-0 right-0 z-[12] pointer-events-none"
            width={dimensions.width * 0.8} 
            height={dimensions.height * 0.5}
            viewBox="0 0 221 42"
          >
            <motion.path
              strokeLinecap="round"
              strokeWidth={3}
              fill="none"
              d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
              strokeDasharray="150 480"
              strokeDashoffset="150"
              animate={{
                strokeDashoffset: isFocused ? -480 : 150,
                stroke: isFocused ? colors.light : 'white'
              }}
              transition={{ duration: 1.6, delay: 0.2, ease: "easeOut" }}
            />
          </svg>
        </motion.div>

        {/* Splash effect */}
        <motion.svg
          className="absolute top-0 left-0 pointer-events-none"
          width={342 * scaleFactor}
          height={208 * scaleFactor}
          viewBox="0 0 342 208"
          style={{
            transform: 'translate(-17%, -31%)',
            stroke: colors.accent
          }}
          animate={{
            strokeDasharray: isActive ? "2 60" : "60 60",
            strokeDashoffset: isActive ? -60 : 60
          }}
          transition={{ duration: 0.8, ease: [0.3, 0, 0, 1], delay: 0.05 }}
        >
          <path strokeLinecap="round" strokeWidth={3} d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362" />
          <path strokeLinecap="round" strokeWidth={3} d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272" />
          <path strokeLinecap="round" strokeWidth={3} strokeOpacity="0.3" d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449" />
          <path strokeLinecap="round" strokeWidth={3} d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998" />
          <path strokeLinecap="round" strokeWidth={3} d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976" />
        </motion.svg>
      </motion.button>
    </>
  );
};

export default AnimatedButton;