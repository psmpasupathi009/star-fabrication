import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { isAllowedImageUrl, sanitizeServiceSlug } from "@/lib/security";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const items = await prisma.serviceItem.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as {
      slug?: string;
      title?: string;
      titleTamil?: string | null;
      description?: string;
      descriptionTamil?: string | null;
      details?: string;
      detailsTamil?: string | null;
      icon?: string;
      imageUrl?: string | null;
      order?: number;
    };

    if (!body.title?.trim() || !body.slug?.trim()) {
      return NextResponse.json({ error: "slug and title required" }, { status: 400 });
    }

    const slug = sanitizeServiceSlug(body.slug);
    if (!slug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    const imageUrl = body.imageUrl?.trim() || null;
    if (!isAllowedImageUrl(imageUrl)) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    const maxOrder = await prisma.serviceItem.aggregate({ _max: { order: true } });
    const item = await prisma.serviceItem.create({
      data: {
        slug,
        title: body.title.trim(),
        titleTamil: body.titleTamil?.trim() || null,
        description: body.description?.trim() || "",
        descriptionTamil: body.descriptionTamil?.trim() || null,
        details: body.details?.trim() || null,
        detailsTamil: body.detailsTamil?.trim() || null,
        icon: body.icon?.trim() || "general",
        imageUrl,
        order: typeof body.order === "number" ? body.order : (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
