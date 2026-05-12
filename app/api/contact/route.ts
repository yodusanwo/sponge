import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { getSiteContent } from "@/lib/site-content";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[POST /api/contact] Missing RESEND_API_KEY");
    return NextResponse.json({ error: "Email is not configured yet." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill out every field." }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const content = await getSiteContent();
    const to = process.env.CONTACT_TO_EMAIL?.trim() || content.contactEmail;
    const from =
      process.env.RESEND_FROM_EMAIL?.trim() || "Chore ClarIDy <onboarding@resend.dev>";

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Chore ClarIDy contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    if (error) {
      console.error("[POST /api/contact] Resend error", error);
      return NextResponse.json(
        { error: "Email could not be sent. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { error: "Email could not be sent. Please try again later." },
      { status: 500 },
    );
  }
}
