import { NextRequest, NextResponse } from "next/server";
import { comparePassword, getUserByEmail, isAdminEmail } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/security";
import { setSessionCookie, signSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request);
    const limited = rateLimit(`signin:${ip}`, 10, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        {
          status: 429,
          headers: limited.retryAfterSec
            ? { "Retry-After": String(limited.retryAfterSec) }
            : undefined,
        }
      );
    }

    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    if (password.length > 200 || email.length > 254) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = await getUserByEmail(email);
    if (!user?.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    let role = user.role;
    const admin = await isAdminEmail(email);
    if (admin) {
      role = "ADMIN";
      if (user.role.toUpperCase() !== "ADMIN") {
        await prisma.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });
      }
    }

    if (role.toUpperCase() !== "ADMIN") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 });
    }

    const token = await signSession({
      userId: user.id,
      email: user.email,
      role: "ADMIN",
    });

    const response = NextResponse.json({
      message: "Sign in successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: "ADMIN",
      },
    });
    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Sign-in failed:", error);
    const message = error instanceof Error ? error.message : "";
    const dbDown =
      message.includes("Server selection timeout") ||
      message.includes("Can't reach database") ||
      message.includes("P1001") ||
      message.includes("P2010");
    return NextResponse.json(
      {
        error: dbDown
          ? "Database unavailable. Check MongoDB Atlas network access."
          : "Sign in failed",
      },
      { status: dbDown ? 503 : 500 }
    );
  }
}
