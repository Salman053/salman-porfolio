"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Button } from "../ui/button";

export function FeedbackModal() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      // Close modal or reset after success
    }, 2000);
  };

  return (
    <div className="">
      <Modal>
        <ModalTrigger   className="bg-gradient-to-r bg-secondary text-black  fixed bottom-20 right-4 animate-bounce  flex justify-center group/modal-btn px-6  py-3 shadow-lg hover:shadow-xl transition-all duration-700">
              😊 Hi
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            {!submitted ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Share Your Experience
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                    We'd love to hear what you think!
                  </p>
                </motion.div>

                {/* Rating Stars */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-center mb-8"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="cursor-pointer mx-1"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        size={32}
                        className={
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Feedback Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4"
                >
                  <textarea
                    placeholder="What did you like most? How can we improve?"
                    className="w-full p-4 border border-gray-200 dark:border-neutral-700 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-neutral-800"
                    rows={4}
                  />
                  <input
                    type="email"
                    placeholder="Your email (optional)"
                    className="w-full p-4 border border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-neutral-800"
                  />
                </motion.div>

                {/* Happy Customers */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="py-6 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start mx-auto"
                >
                  <div className="flex items-center justify-center">
                    <MessageIcon className="mr-1 text-purple-600 h-4 w-4" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      10+ Reviews
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <HappyIcon className="mr-1 text-purple-600 h-4 w-4" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      75% Satisfaction
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ImproveIcon className="mr-1 text-purple-600 h-4 w-4" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Always Improving
                    </span>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h4 className="text-2xl font-bold text-purple-600 mb-2">
                  Thank You!
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Your feedback means the world to us.
                </p>
              </motion.div>
            )}
          </ModalContent>
          <ModalFooter className="gap-4">
            {!submitted ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-black dark:bg-neutral-800 dark:text-white border border-gray-300 rounded-xl text-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm rounded-xl shadow-lg"
                >
                  Submit Feedback
                </motion.button>
              </>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm rounded-xl"
              >
                Close
              </motion.button>
            )}
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

// New Icons for Feedback Modal
const MessageIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
    </svg>
  );
};

const HappyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 9l.01 0" />
      <path d="M15 9l.01 0" />
      <path d="M8 13a4 4 0 1 0 8 0" />
    </svg>
  );
};

const ImproveIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9.663 17h-2.663a3 3 0 0 1 -3 -3v-3a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v1.5" />
      <path d="M12 15l-2 -2h4l-2 2" />
      <path d="M15 19l2 2l4 -4" />
    </svg>
  );
};
