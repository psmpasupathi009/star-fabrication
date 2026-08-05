import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { generateResetPin, saveResetPin } from "@/lib/password-reset";
import { clientIp, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`forgot:${ip}`, 5, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? "";

    const okMessage = {
      message:
        "If that email is registered as admin, a 6-digit code has been sent. Check inbox and spam.",
    };

    if (!email) {
      return NextResponse.json(okMessage);
    }

    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    if (!adminEmail || email !== adminEmail) {
      return NextResponse.json(okMessage);
    }

    if (!(await isAdminEmail(email))) {
      return NextResponse.json(okMessage);
    }

    await prisma.user.upsert({
      where: { email },
      update: { role: "ADMIN" },
      create: { email, role: "ADMIN", name: "Admin" },
    });

    const pin = generateResetPin();
    await saveResetPin(email, pin);

    await sendMail({
      to: email,
      subject: "Star Fabrication — your password reset code",
      text: [
        "You requested a password reset for Star Fabrication admin.",
        "",
        `Your 6-digit code: ${pin}`,
        "",
        "Enter this code on the reset password page within 15 minutes.",
        "If you did not request this, ignore this email.",
      ].join("\n"),
    });

    return NextResponse.json(okMessage);
  } catch (error) {
    console.error("Forgot password failed:", error);
    return NextResponse.json(
      {
        error:
          "Could not send reset code. Check MongoDB connection and EMAIL_* SMTP settings.",
      },
      { status: 500 }
    );
  }
}
