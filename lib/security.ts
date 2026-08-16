/**
 * Shared security helpers for admin APIs and redirects.
 */

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB (hero video)
const ALLOWED_UPLOAD_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

export function isSafeAdminCallback(url: string | null | undefined): boolean {
  if (!url) return false;
  if (!url.startsWith("/")) return false;
  if (url.startsWith("//")) return false;
  if (url.includes("\\") || url.includes("@")) return false;
  try {
    const parsed = new URL(url, "http://localhost");
    if (parsed.origin !== "http://localhost") return false;
    return parsed.pathname === "/admin" || parsed.pathname.startsWith("/admin/");
  } catch {
    return false;
  }
}

export function isAllowedImageUrl(url: string | null | undefined): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith("/")) {
    return !trimmed.startsWith("//") && !trimmed.includes("\\");
  }
  try {
    const parsed = new URL(trimmed);
    return (
      parsed.protocol === "https:" &&
      (parsed.hostname === "res.cloudinary.com" ||
        parsed.hostname.endsWith(".cloudinary.com"))
    );
  } catch {
    return false;
  }
}

/** Allow only Google Maps embed URLs in iframes. */
export function isAllowedMapEmbedUrl(url: string | null | undefined): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (!trimmed) return true;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase();
    if (host === "www.google.com" || host === "google.com") {
      return parsed.pathname.startsWith("/maps");
    }
    return (
      host === "maps.google.com" ||
      host === "maps.google.co.in" ||
      /^maps\.google\.[a-z.]+$/.test(host)
    );
  } catch {
    return false;
  }
}

export function sanitizeServiceSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function validateUploadFile(file: File): string | null {
  if (!(file instanceof File) || file.size === 0) {
    return "No file provided";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "File too large (max 20MB)";
  }
  const type = file.type || "";
  if (!ALLOWED_UPLOAD_TYPES.has(type)) {
    return "Unsupported file type";
  }
  return null;
}

/** Simple in-memory rate limit (per process). */
const attempts = new Map<string, { count: number; resetAt: number }>();

function pruneRateLimits(now: number) {
  if (attempts.size < 200) return;
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) attempts.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit = 8,
  windowMs = 15 * 60 * 1000
): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  pruneRateLimits(now);
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  entry.count += 1;
  return { ok: true };
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}
