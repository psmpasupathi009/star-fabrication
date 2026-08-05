import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { FALLBACK_SITE, parseServiceAreas, type ContactPerson } from "@/lib/content";
import { DEFAULT_HOURS, parseHoursJson, type BusinessHours } from "@/lib/hours";
import { prisma } from "@/lib/prisma";

function serializeHours(hours: BusinessHours | undefined): string {
  if (!hours) return JSON.stringify(DEFAULT_HOURS);
  return JSON.stringify(parseHoursJson(JSON.stringify(hours)));
}

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
        hoursJson: JSON.stringify(FALLBACK_SITE.hours),
        serviceAreasJson: JSON.stringify(FALLBACK_SITE.serviceAreas),
      });
    }
    return NextResponse.json({
      ...row,
      hours: parseHoursJson(row.hoursJson),
      serviceAreas: parseServiceAreas(row.serviceAreasJson),
    });
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
      address?: string | null;
      addressTamil?: string | null;
      pincode?: string | null;
      hours?: BusinessHours;
      hoursJson?: string;
      mapEmbedUrl?: string | null;
      serviceAreas?: string[];
      serviceAreasJson?: string;
      googleReviewsUrl?: string | null;
      whatsappPhone?: string | null;
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

    const hoursJson =
      typeof body.hoursJson === "string"
        ? JSON.stringify(parseHoursJson(body.hoursJson))
        : serializeHours(body.hours);

    const serviceAreas = Array.isArray(body.serviceAreas)
      ? body.serviceAreas
          .map((a) => String(a ?? "").trim())
          .filter(Boolean)
          .slice(0, 24)
      : typeof body.serviceAreasJson === "string"
        ? parseServiceAreas(body.serviceAreasJson)
        : FALLBACK_SITE.serviceAreas;

    const whatsappPhone =
      body.whatsappPhone?.replace(/\D/g, "").slice(0, 15) ||
      contacts[0]?.phone ||
      FALLBACK_SITE.whatsappPhone;

    const data = {
      name: (body.name?.trim() || FALLBACK_SITE.name).slice(0, 120),
      nameTamil: body.nameTamil?.trim()?.slice(0, 120) || null,
      tagline: (body.tagline?.trim() || FALLBACK_SITE.tagline).slice(0, 200),
      location: (body.location?.trim() || FALLBACK_SITE.location).slice(0, 120),
      locationTamil: body.locationTamil?.trim()?.slice(0, 120) || null,
      description: body.description?.trim()?.slice(0, 1000) || null,
      contactsJson: JSON.stringify(contacts),
      address: (body.address?.trim() || FALLBACK_SITE.address).slice(0, 240),
      addressTamil: body.addressTamil?.trim()?.slice(0, 240) || null,
      pincode: body.pincode?.replace(/\D/g, "").slice(0, 10) || null,
      hoursJson,
      mapEmbedUrl: body.mapEmbedUrl?.trim()?.slice(0, 800) || null,
      serviceAreasJson: JSON.stringify(
        serviceAreas.length ? serviceAreas : FALLBACK_SITE.serviceAreas
      ),
      googleReviewsUrl: body.googleReviewsUrl?.trim()?.slice(0, 500) || null,
      whatsappPhone,
    };

    const row = await prisma.siteSettings.upsert({
      where: { key: "default" },
      update: data,
      create: { key: "default", ...data },
    });

    return NextResponse.json({
      ...row,
      hours: parseHoursJson(row.hoursJson),
      serviceAreas: parseServiceAreas(row.serviceAreasJson),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save site" }, { status: 500 });
  }
}
