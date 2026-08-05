import { prisma } from "@/lib/prisma";
import { withTimeout } from "@/lib/db";
import { DEFAULT_HOURS, parseHoursJson, type BusinessHours } from "@/lib/hours";
import { contacts as defaultContacts, services as defaultServices, site } from "@/lib/site";

export type ContactPerson = {
  name: string;
  title: string;
  phone: string;
  phoneDisplay: string;
};

export type AboutPerson = {
  name: string;
  title: string;
  phone: string;
  phoneDisplay: string;
  imageUrl: string | null;
  extra: string | null;
};

export type SiteData = {
  name: string;
  nameTamil: string | null;
  tagline: string;
  location: string;
  locationTamil: string | null;
  description: string | null;
  contacts: ContactPerson[];
  address: string;
  addressTamil: string | null;
  pincode: string | null;
  hours: BusinessHours;
  mapEmbedUrl: string | null;
  serviceAreas: string[];
  googleReviewsUrl: string | null;
  whatsappPhone: string;
};

export type HeroData = {
  tagline: string;
  subtitle: string;
  imageUrl: string;
  /** Optional Apple-style muted loop; falls back to image */
  videoUrl?: string | null;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type AboutData = {
  eyebrow: string;
  title: string;
  description: string;
  details: string;
  footerNote: string | null;
  imageOneUrl: string | null;
  imageTwoUrl: string | null;
  people: AboutPerson[];
};

export type ServiceData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  imageUrl: string | null;
  order: number;
};

export const FALLBACK_SITE: SiteData = {
  name: site.name,
  nameTamil: site.nameTamil,
  tagline: site.tagline,
  location: site.location,
  locationTamil: site.locationTamil,
  description: site.description,
  contacts: defaultContacts.map((c) => ({ ...c })),
  address: site.address,
  addressTamil: site.addressTamil,
  pincode: site.pincode || null,
  hours: DEFAULT_HOURS,
  mapEmbedUrl: site.mapEmbedUrl,
  serviceAreas: [...site.serviceAreas],
  googleReviewsUrl: site.googleReviewsUrl || null,
  whatsappPhone: defaultContacts[0].phone,
};

export const FALLBACK_HERO: HeroData = {
  tagline: site.tagline,
  subtitle: `Gates, grills, roofing, and industrial structures — welded with precision in ${site.location}.`,
  imageUrl: "/gallery/hero.jpg",
  videoUrl: "/gallery/hero.mp4",
  ctaPrimary: "Get a Quote",
  ctaSecondary: "Call Now",
};

export const FALLBACK_ABOUT: AboutData = {
  eyebrow: "About us",
  title: "Built on craft, driven by satisfaction",
  description: `From designer gates to industrial sheds, ${site.name} delivers durable metalwork for homes and businesses across ${site.location} and nearby towns.`,
  details: `${site.name} is a metal fabrication workshop in ${site.location} (${site.locationTamil}), serving Namakkal district for years. We fabricate in mild steel (MS) and stainless steel (SS) — gates, grills, roofing, doors, railings, sheds, and custom welding for homes and businesses.

Our process is simple: measure on site → fabricate in the workshop → install and finish. Every job is built for strength, Tamil Nadu weather, and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.`,
  footerNote: `Based in ${site.location} (${site.locationTamil}) — ${site.nameTamil}.`,
  imageOneUrl: "/gallery/workshop.jpg",
  imageTwoUrl: "/gallery/welder.jpg",
  people: defaultContacts.map((c) => ({
    name: c.name,
    title: c.title,
    phone: c.phone,
    phoneDisplay: c.phoneDisplay,
    imageUrl: null,
    extra: null,
  })),
};

export const FALLBACK_SERVICES: ServiceData[] = defaultServices.map((s, i) => ({
  id: s.id,
  slug: s.id,
  title: s.title,
  description: s.description,
  details: s.details,
  icon: s.id,
  imageUrl: null,
  order: i,
}));

function parseContacts(json: string): ContactPerson[] {
  try {
    const parsed = JSON.parse(json) as ContactPerson[];
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {
    /* ignore */
  }
  return FALLBACK_SITE.contacts;
}

export function parseServiceAreas(json: string | null | undefined): string[] {
  if (!json) return FALLBACK_SITE.serviceAreas;
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return FALLBACK_SITE.serviceAreas;
    const areas = parsed
      .map((a) => String(a ?? "").trim())
      .filter(Boolean)
      .slice(0, 24);
    return areas.length ? areas : FALLBACK_SITE.serviceAreas;
  } catch {
    return FALLBACK_SITE.serviceAreas;
  }
}

export function parseAboutPeople(json: string | null | undefined): AboutPerson[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as Partial<AboutPerson>[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .slice(0, 2)
      .map((p) => ({
        name: (p.name ?? "").trim(),
        title: (p.title ?? "").trim(),
        phone: (p.phone ?? "").replace(/\D/g, "").slice(0, 15),
        phoneDisplay: (p.phoneDisplay ?? p.phone ?? "").trim(),
        imageUrl: p.imageUrl?.trim() || null,
        extra: p.extra?.trim() || null,
      }))
      .filter((p) => p.name.length > 0);
  } catch {
    return [];
  }
}

export async function getSiteData(): Promise<SiteData> {
  try {
    const row = await withTimeout(
      prisma.siteSettings.findUnique({ where: { key: "default" } }),
      4000,
      null
    );
    if (!row) return FALLBACK_SITE;
    const contacts = parseContacts(row.contactsJson);
    const whatsappPhone =
      row.whatsappPhone?.replace(/\D/g, "").slice(0, 15) ||
      contacts[0]?.phone ||
      FALLBACK_SITE.whatsappPhone;
    return {
      name: row.name,
      nameTamil: row.nameTamil,
      tagline: row.tagline,
      location: row.location,
      locationTamil: row.locationTamil,
      description: row.description,
      contacts,
      address: row.address?.trim() || FALLBACK_SITE.address,
      addressTamil: row.addressTamil?.trim() || FALLBACK_SITE.addressTamil,
      pincode: row.pincode?.trim() || null,
      hours: parseHoursJson(row.hoursJson),
      mapEmbedUrl: row.mapEmbedUrl?.trim() || FALLBACK_SITE.mapEmbedUrl,
      serviceAreas: parseServiceAreas(row.serviceAreasJson),
      googleReviewsUrl: row.googleReviewsUrl?.trim() || null,
      whatsappPhone,
    };
  } catch {
    return FALLBACK_SITE;
  }
}

export async function getHeroData(): Promise<HeroData> {
  try {
    const row = await withTimeout(
      prisma.heroContent.findUnique({ where: { key: "default" } }),
      4000,
      null
    );
    if (!row) return FALLBACK_HERO;
    return {
      tagline: row.tagline,
      subtitle: row.subtitle,
      imageUrl: row.imageUrl || FALLBACK_HERO.imageUrl,
      videoUrl: row.videoUrl?.trim() || FALLBACK_HERO.videoUrl,
      ctaPrimary: row.ctaPrimary,
      ctaSecondary: row.ctaSecondary,
    };
  } catch {
    return FALLBACK_HERO;
  }
}

export async function getAboutData(): Promise<AboutData> {
  try {
    const row = await withTimeout(
      prisma.aboutContent.findUnique({ where: { key: "default" } }),
      4000,
      null
    );
    if (!row) return FALLBACK_ABOUT;
    const people = parseAboutPeople(row.peopleJson);
    return {
      eyebrow: row.eyebrow,
      title: row.title,
      description: row.description,
      details: row.details?.trim() || FALLBACK_ABOUT.details,
      footerNote: row.footerNote,
      imageOneUrl: row.imageOneUrl || FALLBACK_ABOUT.imageOneUrl,
      imageTwoUrl: row.imageTwoUrl || FALLBACK_ABOUT.imageTwoUrl,
      people: people.length ? people : FALLBACK_ABOUT.people,
    };
  } catch {
    return FALLBACK_ABOUT;
  }
}

export async function getServicesData(): Promise<ServiceData[]> {
  try {
    const rows = await withTimeout(
      prisma.serviceItem.findMany({ orderBy: { order: "asc" } }),
      4000,
      []
    );
    if (!rows.length) return FALLBACK_SERVICES;
    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      details: r.details?.trim() || r.description,
      icon: r.icon,
      imageUrl: r.imageUrl?.trim() || null,
      order: r.order,
    }));
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const services = await getServicesData();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getGalleryData() {
  try {
    return await withTimeout(
      prisma.galleryMedia.findMany({
        orderBy: [{ createdAt: "desc" }, { order: "asc" }],
        select: { id: true, url: true, type: true, caption: true, alt: true },
      }),
      4000,
      []
    );
  } catch {
    return [];
  }
}
