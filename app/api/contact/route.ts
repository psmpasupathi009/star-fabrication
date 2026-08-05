import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { clientIp, rateLimit } from "@/lib/security";

function sanitize(value: string, max: number) {
  return value.trim().slice(0, max);
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
      service?: string;
      message?: string;
    };

    const name = sanitize(body.name ?? "", 120);
    const phone = sanitize(body.phone ?? "", 40);
    const service = sanitize(body.service ?? "", 120);
    const message = sanitize(body.message ?? "", 2000);

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    const text = [
      "New quote request from Star Fabrication website",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await sendMail({
      to: adminEmail,
      subject: `Quote request — ${name} (${service || "General"})`,
      text,
    });

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
