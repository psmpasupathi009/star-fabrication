import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { FALLBACK_SITE, type ContactPerson } from "@/lib/content";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const row = await prisma.siteSettings.findUnique({ where: { key: "default" } });
    if (!row) {
      return NextResponse.json({
        key: "default",
        ...FALLBACK_SITE,
        contactsJson: JSON.stringify(FALLBACK_SITE.contacts),
      });
    }
    return NextResponse.json(row);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load site" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = (await request.json()) as {
      name?: string;
      nameTamil?: string | null;
      tagline?: string;
      location?: string;
      locationTamil?: string | null;
      description?: string | null;
      contacts?: ContactPerson[];
    };

    const contactsRaw =
      Array.isArray(body.contacts) && body.contacts.length
        ? body.contacts
        : FALLBACK_SITE.contacts;

    const contacts = contactsRaw.slice(0, 5).map((c) => ({
      name: String(c.name ?? "").slice(0, 80),
      title: String(c.title ?? "").slice(0, 40),
      phone: String(c.phone ?? "").replace(/\D/g, "").slice(0, 15),
      phoneDisplay: String(c.phoneDisplay ?? "").slice(0, 40),
    }));

    const row = await prisma.siteSettings.upsert({
      where: { key: "default" },
      update: {
        name: (body.name?.trim() || FALLBACK_SITE.name).slice(0, 120),
        nameTamil: body.nameTamil?.trim()?.slice(0, 120) || null,
        tagline: (body.tagline?.trim() || FALLBACK_SITE.tagline).slice(0, 200),
        location: (body.location?.trim() || FALLBACK_SITE.location).slice(0, 120),
        locationTamil: body.locationTamil?.trim()?.slice(0, 120) || null,
        description: body.description?.trim()?.slice(0, 1000) || null,
        contactsJson: JSON.stringify(contacts),
      },
      create: {
        key: "default",
        name: (body.name?.trim() || FALLBACK_SITE.name).slice(0, 120),
        nameTamil: body.nameTamil?.trim()?.slice(0, 120) || null,
        tagline: (body.tagline?.trim() || FALLBACK_SITE.tagline).slice(0, 200),
        location: (body.location?.trim() || FALLBACK_SITE.location).slice(0, 120),
        locationTamil: body.locationTamil?.trim()?.slice(0, 120) || null,
        description: body.description?.trim()?.slice(0, 1000) || null,
        contactsJson: JSON.stringify(contacts),
      },
    });

    return NextResponse.json(row);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save site" }, { status: 500 });
  }
}
