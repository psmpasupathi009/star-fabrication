import { NextRequest, NextResponse } from "next/server";
import {
  getSessionFromRequest,
  SESSION_COOKIE_NAME,
  verifySession,
} from "@/lib/session";
import { isSafeAdminCallback } from "@/lib/security";

function securityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect mutating admin/upload APIs at the edge
  const isProtectedApi =
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/api/upload") ||
    (pathname.startsWith("/api/gallery") &&
      request.method !== "GET" &&
      request.method !== "HEAD");

  if (isProtectedApi) {
    const session = await getSessionFromRequest(request);
    if (!session || session.role.toUpperCase() !== "ADMIN") {
      return securityHeaders(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      );
    }
    return securityHeaders(NextResponse.next());
  }

  if (!pathname.startsWith("/admin")) {
    return securityHeaders(NextResponse.next());
  }

  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/") ||
    pathname === "/admin/forgot-password" ||
    pathname.startsWith("/admin/forgot-password/") ||
    pathname === "/admin/reset-password" ||
    pathname.startsWith("/admin/reset-password/")
  ) {
    const session = await getSessionFromRequest(request);
    if (session?.role?.toUpperCase() === "ADMIN") {
      return securityHeaders(
        NextResponse.redirect(new URL("/admin/dashboard", request.url))
      );
    }
    return securityHeaders(NextResponse.next());
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySession(token);

  if (!session) {
    const login = new URL("/admin/login", request.url);
    const callback = pathname + request.nextUrl.search;
    if (isSafeAdminCallback(callback)) {
      login.searchParams.set("callbackUrl", callback);
    }
    return securityHeaders(NextResponse.redirect(login));
  }

  if (session.role.toUpperCase() !== "ADMIN") {
    return securityHeaders(NextResponse.redirect(new URL("/", request.url)));
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/upload/:path*",
    "/api/gallery",
    "/api/gallery/:path*",
  ],
};
