"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("✅ Feedback submitted! Thank you.");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="Your Name" required />
      <Input type="email" placeholder="Your Email" required />
      <Textarea placeholder="Your Feedback" rows={4} required />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Sending..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
