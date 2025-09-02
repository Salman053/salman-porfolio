
// =========================
// app/api/feedback/route.ts — demo handler (edge-friendly)
// =========================
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const form = await req.formData();
    // TODO: persist to your DB or send to Slack
    console.log("Feedback:", Object.fromEntries(form.entries()));
    return NextResponse.json({ ok: true });
}