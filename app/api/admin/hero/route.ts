import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { FALLBACK_HERO } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { isAllowedImageUrl } from "@/lib/security";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const row = await prisma.heroContent.findUnique({ where: { key: "default" } });
    if (!row) {
      return NextResponse.json({ key: "default", ...FALLBACK_HERO });
    }
    return NextResponse.json({
      ...row,
      videoUrl: row.videoUrl || FALLBACK_HERO.videoUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load hero" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as {
      tagline?: string;
      subtitle?: string;
      imageUrl?: string | null;
      videoUrl?: string | null;
      ctaPrimary?: string;
      ctaSecondary?: string;
    };

    const imageUrl = body.imageUrl?.trim() || null;
    const videoUrl = body.videoUrl?.trim() || null;
    if (imageUrl && !isAllowedImageUrl(imageUrl)) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }
    if (videoUrl && !isAllowedImageUrl(videoUrl)) {
      return NextResponse.json({ error: "Invalid video URL" }, { status: 400 });
    }

    const row = await prisma.heroContent.upsert({
      where: { key: "default" },
      update: {
        tagline: (body.tagline?.trim() || FALLBACK_HERO.tagline).slice(0, 200),
        subtitle: (body.subtitle?.trim() || FALLBACK_HERO.subtitle).slice(0, 500),
        imageUrl,
        videoUrl,
        ctaPrimary: (body.ctaPrimary?.trim() || FALLBACK_HERO.ctaPrimary).slice(0, 80),
        ctaSecondary: (body.ctaSecondary?.trim() || FALLBACK_HERO.ctaSecondary).slice(0, 80),
      },
      create: {
        key: "default",
        tagline: (body.tagline?.trim() || FALLBACK_HERO.tagline).slice(0, 200),
        subtitle: (body.subtitle?.trim() || FALLBACK_HERO.subtitle).slice(0, 500),
        imageUrl,
        videoUrl,
        ctaPrimary: (body.ctaPrimary?.trim() || FALLBACK_HERO.ctaPrimary).slice(0, 80),
        ctaSecondary: (body.ctaSecondary?.trim() || FALLBACK_HERO.ctaSecondary).slice(0, 80),
      },
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save hero" }, { status: 500 });
  }
}
