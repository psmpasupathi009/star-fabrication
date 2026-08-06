import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/security";

function sanitize(value: string, max: number) {
  return value.trim().slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`contact:${ip}`, 8, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many messages. Try again later." },
        { status: 429 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    if (!adminEmail) {
      return NextResponse.json(
        { error: "Contact form is not configured" },
        { status: 503 }
      );
    }

    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      service?: string;
      message?: string;
    };

    const name = sanitize(body.name ?? "", 120);
    const phone = sanitize(body.phone ?? "", 40);
    const emailRaw = sanitize(body.email ?? "", 120);
    const email = emailRaw && isValidEmail(emailRaw) ? emailRaw : "";
    const service = sanitize(body.service ?? "", 120);
    const message = sanitize(body.message ?? "", 2000);

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    if (emailRaw && !email) {
      return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
    }

    const text = [
      "New quote request from Star Fabrication website",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Service: ${service || "—"}`,
      "",
      "Message:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    await sendMail({
      to: adminEmail,
      subject: `Quote request — ${name} (${service || "General"})`,
      text,
      replyTo: email || undefined,
    });

    if (email) {
      try {
        await sendMail({
          to: email,
          subject: "We received your quote request — Star Fabrication",
          text: [
            `Hi ${name},`,
            ``,
            `Thanks for contacting Star Fabrication. We received your request about ${service || "fabrication work"} and will get back to you soon on ${phone}${email ? ` or ${email}` : ""}.`,
            ``,
            `— Star Fabrication, Andhiyur, Mevani`,
          ].join("\n"),
        });
      } catch (err) {
        console.error("Auto-reply failed:", err);
      }
    }

    return NextResponse.json({
      message: "Thanks — your message was sent. We’ll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form failed:", error);
    return NextResponse.json(
      { error: "Could not send message. Please try WhatsApp or call us." },
      { status: 500 }
    );
  }
}
