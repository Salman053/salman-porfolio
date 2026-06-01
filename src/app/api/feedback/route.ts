
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const form = await req.formData();
    console.log("Feedback:", Object.fromEntries(form.entries()));
    return NextResponse.json({ ok: true });
}