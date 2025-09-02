
// =========================
// components/FeedbackForm.tsx — portfolio feedback
// =========================
"use client";
import { useState } from "react";

export default function FeedbackForm() {
  const [sent, setSent] = useState(false);
  async function submit(formData: FormData) {
    // This posts to /api/feedback (server action alternative)
    const res = await fetch("/api/feedback", { method: "POST", body: formData });
    if (res.ok) setSent(true);
  }
  return (
    <div className="rounded-2xl border p-6 bg-card/60">
      <h3 className="text-xl font-semibold mb-4">Feedback</h3>
      {!sent ? (
        <form action={submit} className="space-y-4">
          <input name="name" placeholder="Your name (optional)" className="w-full rounded-xl border bg-background px-3 py-2" />
          <textarea required name="feedback" placeholder="What did you like? What can improve?" rows={4} className="w-full rounded-xl border bg-background px-3 py-2" />
          <button className="px-5 py-2.5 rounded-xl border">Send Feedback</button>
        </form>
      ) : (
        <p className="text-green-600">Thanks for the feedback! 💚</p>
      )}
    </div>
  );
}