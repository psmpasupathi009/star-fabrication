import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { FALLBACK_ABOUT, parseAboutPeople, type AboutPerson } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { isAllowedImageUrl } from "@/lib/security";

function normalizePeople(raw: unknown): AboutPerson[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .slice(0, 2)
    .map((p) => {
      const row = p as Partial<AboutPerson>;
      const phone = String(row.phone ?? "")
        .replace(/\D/g, "")
        .slice(0, 15);
      const imageUrl = row.imageUrl?.trim() || null;
      if (imageUrl && !isAllowedImageUrl(imageUrl)) {
        return null;
      }
      return {
        name: String(row.name ?? "").trim(),
        title: String(row.title ?? "").trim(),
        phone,
        phoneDisplay: String(row.phoneDisplay ?? row.phone ?? "").trim(),
        imageUrl,
        extra: String(row.extra ?? "").trim().slice(0, 500) || null,
      };
    })
    .filter((p): p is AboutPerson => Boolean(p && p.name));
}

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const row = await prisma.aboutContent.findUnique({ where: { key: "default" } });
    if (!row) {
      return NextResponse.json({
        key: "default",
        ...FALLBACK_ABOUT,
        people: FALLBACK_ABOUT.people,
      });
    }
    return NextResponse.json({
      ...row,
      people: parseAboutPeople(row.peopleJson),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load about" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as {
      eyebrow?: string;
      eyebrowTamil?: string | null;
      title?: string;
      titleTamil?: string | null;
      description?: string;
      descriptionTamil?: string | null;
      details?: string | null;
      detailsTamil?: string | null;
      footerNote?: string | null;
      footerNoteTamil?: string | null;
      imageOneUrl?: string | null;
      imageTwoUrl?: string | null;
      people?: AboutPerson[];
      peopleJson?: string;
    };

    const imageOneUrl = body.imageOneUrl?.trim() || null;
    const imageTwoUrl = body.imageTwoUrl?.trim() || null;
    if (!isAllowedImageUrl(imageOneUrl) || !isAllowedImageUrl(imageTwoUrl)) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    let people: AboutPerson[] = [];
    if (Array.isArray(body.people)) {
      people = normalizePeople(body.people);
    } else if (typeof body.peopleJson === "string") {
      people = parseAboutPeople(body.peopleJson);
    }
    const peopleJson = JSON.stringify(people);

    const data = {
      eyebrow: body.eyebrow?.trim() || FALLBACK_ABOUT.eyebrow,
      eyebrowTamil: body.eyebrowTamil?.trim() || null,
      title: body.title?.trim() || FALLBACK_ABOUT.title,
      titleTamil: body.titleTamil?.trim() || null,
      description: body.description?.trim() || FALLBACK_ABOUT.description,
      descriptionTamil: body.descriptionTamil?.trim() || null,
      details: body.details?.trim() || FALLBACK_ABOUT.details,
      detailsTamil: body.detailsTamil?.trim() || null,
      footerNote: body.footerNote?.trim() || null,
      footerNoteTamil: body.footerNoteTamil?.trim() || null,
      imageOneUrl,
      imageTwoUrl,
      peopleJson,
    };

    const row = await prisma.aboutContent.upsert({
      where: { key: "default" },
      update: data,
      create: { key: "default", ...data },
    });

    return NextResponse.json({
      ...row,
      people: parseAboutPeople(row.peopleJson),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save about" }, { status: 500 });
  }
}
