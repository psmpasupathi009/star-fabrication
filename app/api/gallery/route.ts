import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { withTimeout } from "@/lib/db";
import { prisma } from "@/lib/prisma";

function isCloudinaryUrl(url: string) {
  try {
    const host = new URL(url).hostname;
    return host === "res.cloudinary.com" || host.endsWith(".cloudinary.com");
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const items = await withTimeout(
      prisma.galleryMedia.findMany({
        orderBy: [{ createdAt: "desc" }, { order: "asc" }],
      }),
      4000,
      []
    );
    return NextResponse.json(items);
  } catch (error) {
    console.error("Gallery list failed:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as {
      url?: string;
      type?: string;
      caption?: string | null;
      alt?: string | null;
      order?: number;
    };

    const url = body.url?.trim() ?? "";
    if (!url || !isCloudinaryUrl(url)) {
      return NextResponse.json({ error: "Invalid media URL" }, { status: 400 });
    }

    const type = body.type === "video" ? "video" : "image";
    const maxOrder = await prisma.galleryMedia.aggregate({ _max: { order: true } });
    const order =
      typeof body.order === "number" ? body.order : (maxOrder._max.order ?? -1) + 1;

    const item = await prisma.galleryMedia.create({
      data: {
        url,
        type,
        caption: body.caption?.trim()?.slice(0, 200) || null,
        alt: body.alt?.trim()?.slice(0, 200) || null,
        order,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Gallery create failed:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}
