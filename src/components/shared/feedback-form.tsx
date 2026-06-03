"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "motion/react";
import { Star, MessageSquare, Shield, RefreshCw } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

export function FeedbackModal() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }
    if (note.length < 3) {
      toast.error("Please add more than three characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "portfolio-feedback"), {
        rating: rating,
        note: note,
        email: email,
        timestamp: serverTimestamp(),
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
      });

      toast.success("Thank you for your feedback");
      setSubmitted(true);

      setTimeout(() => {
        setRating(0);
        setNote("");
        setEmail("");
        setIsSubmitting(false);
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error adding document: ", err);
      toast.error("Failed to submit feedback. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Modal>
      <ModalTrigger className="z-[100] fixed bottom-8 right-8 border border-foreground/10 bg-background text-foreground text-xs font-mono uppercase tracking-widest px-6 py-3 rounded-full hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors shadow-sm duration-300">
        Feedback
      </ModalTrigger>
      <ModalBody className="md:mx-0 mx-8">
        <ModalContent className="">
          {!submitted ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-6"
              >
                <h4 className="text-3xl font-serif text-foreground font-normal">
                  Share your <span className="italic font-light text-primary">thoughts</span>
                </h4>
                <p className="text-xs text-neutral-400 mt-2 font-mono uppercase tracking-wider">
                  Your feedback helps shape the work.
                </p>
              </motion.div>

              {/* Rating Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex justify-center mb-8 gap-2"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      size={28}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-primary text-primary stroke-[1.5]"
                          : "text-neutral-200 dark:text-neutral-800 stroke-[1.5]"
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Feedback Form */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-4"
              >
                <textarea
                  required
                  placeholder="What did you think? How can we improve?"
                  className="w-full p-4 border border-foreground/10 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-sm leading-relaxed"
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Your email (optional)"
                  className="w-full p-4 border border-foreground/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>

            
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center justify-center"
            >
              <span className="text-4xl mb-6">✓</span>
              <h4 className="text-2xl font-serif text-foreground mb-2">
                Thank You
              </h4>
              <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                Your response has been logged and helps improve my digital crafts.
              </p>
            </motion.div>
          )}
        </ModalContent>
        <ModalFooter className="w-full flex justify-end">
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-foreground text-background text-xs font-mono uppercase tracking-widest rounded-xl shadow-sm hover:bg-foreground/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit Feedback"}
            </button>
          )}
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
