import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { isAllowedImageUrl } from "@/lib/security";

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
      description?: string;
      details?: string;
      icon?: string;
      imageUrl?: string | null;
      order?: number;
    };

    if (!body.title?.trim() || !body.slug?.trim()) {
      return NextResponse.json({ error: "slug and title required" }, { status: 400 });
    }

    const imageUrl = body.imageUrl?.trim() || null;
    if (!isAllowedImageUrl(imageUrl)) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    const maxOrder = await prisma.serviceItem.aggregate({ _max: { order: true } });
    const item = await prisma.serviceItem.create({
      data: {
        slug: body.slug.trim().toLowerCase().replace(/\s+/g, "-"),
        title: body.title.trim(),
        description: body.description?.trim() || "",
        details: body.details?.trim() || null,
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
