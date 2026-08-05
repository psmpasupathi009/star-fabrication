import { NextRequest, NextResponse } from "next/server";
import { hashPassword, isAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyResetPin } from "@/lib/password-reset";
import { clientIp, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`reset:${ip}`, 8, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as {
      email?: string;
      pin?: string;
      password?: string;
    };
    const email = body.email?.trim().toLowerCase() ?? "";
    const pin = body.pin?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !/^\d{6}$/.test(pin) || password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Email, 6-digit code, and password (min 8 characters) are required",
        },
        { status: 400 }
      );
    }

    if (password.length > 200) {
      return NextResponse.json({ error: "Password too long" }, { status: 400 });
    }

    if (!(await isAdminEmail(email))) {
      return NextResponse.json(
        { error: "Invalid email or code" },
        { status: 400 }
      );
    }

    const pinOk = await verifyResetPin(email, pin);
    if (!pinOk) {
      return NextResponse.json(
        { error: "Code is invalid or expired" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashed,
        role: "ADMIN",
        resetPinHash: null,
        resetPinExpires: null,
      },
    });

    return NextResponse.json({
      message: "Password updated. You can sign in now.",
    });
  } catch (error) {
    console.error("Reset password failed:", error);
    return NextResponse.json(
      { error: "Could not reset password" },
      { status: 500 }
    );
  }
}
