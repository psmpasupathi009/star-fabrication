import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      caption?: string | null;
      alt?: string | null;
      order?: number;
      type?: string;
    };

    const item = await prisma.galleryMedia.update({
      where: { id },
      data: {
        ...(body.caption !== undefined ? { caption: body.caption?.trim() || null } : {}),
        ...(body.alt !== undefined ? { alt: body.alt?.trim() || null } : {}),
        ...(typeof body.order === "number" ? { order: body.order } : {}),
        ...(body.type ? { type: body.type === "video" ? "video" : "image" } : {}),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Gallery update failed:", error);
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await context.params;
    await prisma.galleryMedia.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Gallery delete failed:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
