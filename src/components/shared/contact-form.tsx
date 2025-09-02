"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";
import emailjs from 'emailjs-com';

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type Values = z.infer<typeof schema>;

export default function AnimatedContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const [open, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (v: Values) => {
    try {
      // Send email via EmailJS
      await emailjs.sendForm(
        "service_iel8gkg",
        "template_8ebebck",
        formRef.current!,
        "Bi9SqYJ6qUhdXe2_g"
      );
      
      setOpen(true);
      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  // Canvas animation (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }

    const particles: Particle[] = [];
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];

    // Create particles
    const initParticles = () => {
      particles.length = 0;
      const particleCount = Math.min(
        100,
        Math.floor((canvas.width * canvas.height) / 2000)
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    initParticles();

    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 100;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${
              1 - distance / maxDistance
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width)
          particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height)
          particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      });

      // Connect particles
      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900">
        {/* Left Column - Animation */}
        <div className="relative hidden md:block overflow-hidden bg-gradient-to-br from-blue-600/50 to-purple-600/70">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-80"
          />

          <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
            <p className="text-xl mb-8 opacity-90">
              Have a project in mind or just want to say hello? I'd love to hear
              from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-4" size={24} />
                <span>salmankhanm859@gmail.com</span>
              </div>

              <div className="flex items-center">
                <MapPin className="mr-4" size={24} />
                <span>Babri Banda, Kohat, Pakistan</span>
              </div>

              <div className="flex items-center">
                <Phone className="mr-4" size={24} />
                <span>+92 3444991704 | +92 3352313245</span>
              </div>
            </div>

            <div className="flex mt-12 space-x-4">
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Get in Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Fill out the form and I'll get back to you as soon as possible.
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                {...register("name")}
                name="name" // Required for EmailJS
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                name="email" // Required for EmailJS
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                name="message" // Required for EmailJS
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full  px-6 bg-gradient-to-r cur-pointer from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600  hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal
            className="max-w-md w-full rounded-2xl border bg-white dark:bg-slate-900 p-8 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            <h4 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
              Message Sent!
            </h4>

            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Thank you for reaching out. I'll get back to you within 24–48
              hours.
            </p>

            <button
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}