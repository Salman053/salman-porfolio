"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Workflow, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Magnetic } from "../animated/magnetic";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type Values = z.infer<typeof schema>;

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

// Animated background particles for ambient depth
const AmbientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    const init = () => {
      resize();
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(var(--primary), ${p.opacity})`;
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", resize);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
};

// Floating label input component
const FloatingInput = ({ 
  label, 
  id, 
  type = "text", 
  register, 
  error, 
  placeholder, 
  rows,
  isTextarea = false 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  
  return (
    <div className="relative group overflow-hidden">
      <label 
        htmlFor={id}
        className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || hasValue 
            ? "top-2 text-[10px] font-medium  tracking-wide text-primary" 
            : "top-4 text-sm font-black  tracking-wide text-muted-foreground"
          }`}
      >
        {label}
      </label>
      
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          autoComplete="on"

          {...register(id)}
          onFocus={() => { setIsFocused(true); setHasValue(true); }}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => { setHasValue(e.target.value.length > 0); register(id).onChange(e); }}
          className={`w-full  border rounded-2xl p-4 pt-8 
            text-base font-medium text-foreground placeholder-transparent outline-none 
            transition-all duration-300 resize-none
            ${error 
              ? "border-red-500/50 focus:ring-2 focus:ring-red-500/30" 
              : "border-foreground/10 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 hover:border-foreground/20"
            }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          type={type}
          {...register(id)}
          autoComplete="on"
          onFocus={() => { setIsFocused(true); setHasValue(true); }}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => { setHasValue(e.target.value.length > 0); register(id).onChange(e); }}
          className={`w-full   border rounded-2xl p-4 pt-8 
            text-base font-medium text-foreground placeholder-transparent outline-none 
            transition-all duration-300
            ${error 
              ? "border-red-500/50 focus:ring-2 focus:ring-red-500/30" 
              : "border-foreground/10 focus:border-primary/40 focus:ring-2 focus:ring-primary/20 hover:border-foreground/20"
            }`}
          placeholder={placeholder}
        />
      )}
      
      
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-red-500 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3" />
          {error.message}
        </motion.p>
      )}
    </div>
  );
};

export default function AnimatedContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const controls = useAnimation();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (v: Values) => {
    setFormStatus("sending");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(v),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      setFormStatus("success");
      await controls.start({ scale: [1, 1.02, 1], transition: { duration: 0.4 } });
      reset();
      
      // Reset status after delay
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  // Success animation variants
  const successVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.5, ease: EASE_PREMIUM }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="contact-form" className="relative ">
      {/* Ambient particle background */}
      

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {formStatus === "success" ? (
            // ===== SUCCESS STATE =====
            <motion.div
              key="success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center py-16 px-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6"
              >
                <CheckCircle className="w-10 h-10 text-primary" />
              </motion.div>
              
              <motion.h3 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-serif text-foreground mb-3"
              >
                Message Received
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground max-w-md mb-8"
              >
                Thank you for reaching out. I'll review your project brief and respond within 24 hours.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Magnetic strength={0.15}>
                  <button
                    type="button"
                    onClick={() => { setFormStatus("idle"); reset(); }}
                    className="px-8 py-3 rounded-full border border-foreground/15 text-sm font-medium uppercase tracking-widest 
                      hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Send Another
                  </button>
                </Magnetic>
              </motion.div>
            </motion.div>
          ) : (
            // ===== FORM STATE =====
            <motion.form 
              key="form"
              ref={formRef} 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-8"
              animate={controls}
            >
              <FloatingInput
                label="Full Name"
                id="name"
                register={register}
                error={errors.name}
                placeholder="John Doe"
              />

              <FloatingInput
                label="Email Address "
                id="email"
                type="email"
                register={register}
                error={errors.email}
                placeholder="john@consulate.com"
              />

              <FloatingInput
                label="Project Brief"
                id="message"
                register={register}
                error={errors.message}
                placeholder="Define the scope and objectives..."
                rows={5}
                isTextarea
              />

              {/* Status Message */}
              <AnimatePresence>
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Failed to send. Please check your connection and try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Magnetic strength={0.12}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || (formStatus as string) === "success"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 md:py-6 rounded-3xl font-black uppercase tracking-[0.35em]  hover:text-white
                    transition-all duration-300 relative overflow-hidden group
                    ${isSubmitting || (formStatus as string) === "success"
                      ? "bg-foreground/20 text-muted-foreground cursor-not-allowed" 
                      : "bg-foreground text-background hover:bg-primary shadow-lg shadow-primary/10 hover:shadow-primary/20"
                    }`}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent  via-white/20 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative text-[10px] md:text-sm z-10 flex items-center  justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (formStatus as string) === "success" ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Sent Successfully
                      </>
                    ) : (
                      <>
                        Initiate Engagement
                        <Send className="w-3.5 h-3.5  group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </Magnetic>

             
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}