import { prisma } from "@/lib/prisma";
import { withTimeout } from "@/lib/db";
import { DEFAULT_HOURS, parseHoursJson, type BusinessHours } from "@/lib/hours";
import type { Locale } from "@/lib/i18n/config";
import { pickLocalized, pickLocalizedNullable } from "@/lib/i18n/pick";
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
  taglineTamil: string | null;
  location: string;
  locationTamil: string | null;
  description: string | null;
  descriptionTamil: string | null;
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
  taglineTamil: string | null;
  subtitle: string;
  subtitleTamil: string | null;
  imageUrl: string;
  videoUrl?: string | null;
  ctaPrimary: string;
  ctaPrimaryTamil: string | null;
  ctaSecondary: string;
  ctaSecondaryTamil: string | null;
};

export type AboutData = {
  eyebrow: string;
  eyebrowTamil: string | null;
  title: string;
  titleTamil: string | null;
  description: string;
  descriptionTamil: string | null;
  details: string;
  detailsTamil: string | null;
  footerNote: string | null;
  footerNoteTamil: string | null;
  imageOneUrl: string | null;
  imageTwoUrl: string | null;
  people: AboutPerson[];
};

export type ServiceData = {
  id: string;
  slug: string;
  title: string;
  titleTamil: string | null;
  description: string;
  descriptionTamil: string | null;
  details: string;
  detailsTamil: string | null;
  icon: string;
  imageUrl: string | null;
  order: number;
};

export type GalleryViewItem = {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  captionTamil: string | null;
  alt: string | null;
  altTamil: string | null;
};

export type LocalizedSite = {
  name: string;
  nameEn: string;
  nameTamil: string | null;
  tagline: string;
  location: string;
  description: string | null;
  contacts: ContactPerson[];
  address: string;
  pincode: string | null;
  hours: BusinessHours;
  mapEmbedUrl: string | null;
  serviceAreas: string[];
  googleReviewsUrl: string | null;
  whatsappPhone: string;
};

export type LocalizedHero = {
  tagline: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string | null;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type LocalizedAbout = {
  eyebrow: string;
  title: string;
  description: string;
  details: string;
  footerNote: string | null;
  imageOneUrl: string | null;
  imageTwoUrl: string | null;
  people: AboutPerson[];
};

export type LocalizedService = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  imageUrl: string | null;
  order: number;
};

export type LocalizedGalleryItem = {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  alt: string | null;
};

export const FALLBACK_SITE: SiteData = {
  name: site.name,
  nameTamil: site.nameTamil,
  tagline: site.tagline,
  taglineTamil: "எங்கள் நோக்கம் உங்கள் திருப்தி",
  location: site.location,
  locationTamil: site.locationTamil,
  description: site.description,
  descriptionTamil:
    "மேவாணியில் தனிப்பயன் உலோக பேப்ரிக்கேஷன் — கதவுகள், கிரில்கள், கூரை, கதவுகள் மற்றும் தொழில்துறை கட்டமைப்புகள்.",
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
  taglineTamil: "எங்கள் நோக்கம் உங்கள் திருப்தி",
  subtitle: `Gates, grills, roofing, and industrial structures — welded with precision in ${site.location}.`,
  subtitleTamil: `கதவுகள், கிரில்கள், கூரை மற்றும் தொழில்துறை கட்டமைப்புகள் — ${site.locationTamil}-ல் துல்லியமாக வெல்டிங்.`,
  imageUrl: "/gallery/hero.jpg",
  videoUrl: "/gallery/hero.mp4",
  ctaPrimary: "Get a Quote",
  ctaPrimaryTamil: "மேற்கோள் பெறுங்கள்",
  ctaSecondary: "Call Now",
  ctaSecondaryTamil: "இப்போது அழைக்கவும்",
};

export const FALLBACK_ABOUT: AboutData = {
  eyebrow: "About us",
  eyebrowTamil: "எங்களைப் பற்றி",
  title: "Built on craft, driven by satisfaction",
  titleTamil: "கைவினைப்பணியில் உறுதி, திருப்தியில் இயக்கம்",
  description: `From designer gates to industrial sheds, ${site.name} delivers durable metalwork for homes and businesses across ${site.location} and nearby towns.`,
  descriptionTamil: `வடிவமைப்பு கதவுகள் முதல் தொழில்துறை ஷெட்கள் வரை, ${site.nameTamil} ${site.locationTamil} மற்றும் அருகிலுள்ள ஊர்களில் நீடித்த உலோக வேலைகளை வழங்குகிறது.`,
  details: `${site.name} is a metal fabrication workshop in ${site.location} (${site.locationTamil}), serving Namakkal district for years. We fabricate in mild steel (MS) and stainless steel (SS) — gates, grills, roofing, doors, railings, sheds, and custom welding for homes and businesses.

Our process is simple: measure on site → fabricate in the workshop → install and finish. Every job is built for strength, Tamil Nadu weather, and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.`,
  detailsTamil: `${site.nameTamil} ${site.locationTamil}-ல் உள்ள உலோக பேப்ரிக்கேஷன் பட்டறை. பல ஆண்டுகளாக நாமக்கல் மாவட்டத்திற்கு சேவை செய்கிறோம். மைல்டு ஸ்டீல் (MS) மற்றும் ஸ்டெயின்லெஸ் ஸ்டீல் (SS)-ல் கதவுகள், கிரில்கள், கூரை, ரெயிலிங், ஷெட் மற்றும் தனிப்பயன் வெல்டிங் செய்கிறோம்.

எங்கள் முறை எளிது: இடத்தில் அளவு → பட்டறையில் தயாரிப்பு → பொருத்தி முடித்தல். ஒவ்வொரு பணியும் வலிமைக்கும் தமிழ்நாட்டு வானிலைக்கும் தினசரி பயன்பாட்டிற்கும் ஏற்றது. எங்கள் நோக்கம் உங்கள் திருப்தி.`,
  footerNote: `Based in ${site.location} (${site.locationTamil}) — ${site.nameTamil}.`,
  footerNoteTamil: `${site.locationTamil}-ல் அமைந்துள்ளது — ${site.nameTamil}.`,
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

const SERVICE_TA: Record<string, { title: string; description: string; details: string }> = {
  grill: {
    title: "கிரில் பணிகள்",
    description: "வீட்டிற்கு ஏற்ற பாதுகாப்பு மற்றும் அலங்கார சாளர கிரில்கள்.",
    details:
      "MS மற்றும் வடிவமைப்பு கிரில்கள் — இடத்தில் அளந்து, வலிமைக்காக வெல்டிங், தமிழ்நாட்டு வானிலைக்கு ஏற்ற பூச்சு.",
  },
  gate: {
    title: "கதவு பணிகள்",
    description: "வடிவமைப்பு மற்றும் கனமான கதவுகள் — லேசர் கட் மற்றும் வெல்டிங்.",
    details:
      "முதன்மை கதவுகள், காம்பவுண்ட் கதவுகள், ஸ்லைடிங் கதவுகள். தினசரி பயன்பாட்டிற்கு உறுதியான கட்டுமானம்.",
  },
  railing: {
    title: "ரெயிலிங் பணிகள்",
    description: "சாளரம், பால்கனி, டெரஸ் ரெயிலிங்குகள் — MS மற்றும் SS.",
    details: "பால்கனி, டெரஸ், படிக்கட்டு ரெயிலிங்குகள். சுத்தமான வெல்டிங் மற்றும் பூச்சு.",
  },
  staircase: {
    title: "படிக்கட்டு & ஹேண்ட்ரெயில்",
    description: "வீடுகள் மற்றும் கடைகளுக்கான உலோக படிக்கட்டுகள்.",
    details: "நேர் மற்றும் சுழல் உலோக படிக்கட்டுகள் — பாதுகாப்பான உயரம்/ஓட்டம்.",
  },
  "compound-wall": {
    title: "காம்பவுண்ட் வால் & வேலி",
    description: "எல்லை வேலி மற்றும் காம்பவுண்ட் வால் எஃகு பணிகள்.",
    details: "காம்பவுண்ட் சட்டங்கள், கிரில் வேலி, கதவுடன் இணைந்த எல்லைப் பணிகள்.",
  },
  roofing: {
    title: "கூரை தகடு",
    description: "வீடு, ஷெட், கேனபிக்கான நீடித்த உலோக கூரை.",
    details: "வண்ண பூச்சு மற்றும் GI கூரை தகடுகள் — பருவமழைக்கு ஏற்ற பொருத்துதல்.",
  },
  "cement-sheet": {
    title: "சிமெண்ட் தகடு",
    description: "சிமெண்ட் தகடு கூரை மற்றும் கிளாடிங்.",
    details: "பட்ஜெட் ஷெட்களுக்கான சிமெண்ட் / ஃபைபர் தகடு கூரை.",
  },
  "parking-shed": {
    title: "கார் பார்க்கிங் ஷெட்",
    description: "எஃகு கார் பார்க்கிங் ஷெட் மற்றும் கேனபி.",
    details: "ஒரு மற்றும் பல கார் ஷெட்கள் — குழாய் அல்லது பாக்ஸ் சட்டம்.",
  },
  "rolling-shutter": {
    title: "ரோலிங் ஷட்டர்",
    description: "கடை மற்றும் கேரேஜ் ரோலிங் ஷட்டர்கள்.",
    details: "கடை, கோடவுன், கேரேஜ்களுக்கான MS ரோலிங் ஷட்டர்கள்.",
  },
  stainless: {
    title: "ஸ்டெயின்லெஸ் ஸ்டீல் பணிகள்",
    description: "SS ரெயிலிங், சமையலறை ஸ்டாண்ட், தனிப்பயன் SS.",
    details: "ஸ்டெயின்லெஸ் ரெயிலிங், கிச்சன் பிளாட்ஃபார்ம், காட்சி ஸ்டாண்ட்கள்.",
  },
  "main-door": {
    title: "முதன்மை கதவு பணிகள்",
    description: "வலுவான முதன்மை கதவுகள் — நம்பகமான ஹார்ட்வேர்.",
    details: "MS முதன்மை மற்றும் பாதுகாப்பு கதவுகள் — சட்டம், பூட்டு, பூச்சு.",
  },
  "kerala-set": {
    title: "கேரள பாணி செட்கள்",
    description: "நீடித்த கேரள பாணி ஷெட் மற்றும் செட் பணிகள்.",
    details: "பாரம்பரிய விகிதங்களுடன் கேரள பாணி செட் / ஷெட் கட்டமைப்புகள்.",
  },
  industrial: {
    title: "தொழில்துறை ஷெட்கள்",
    description: "வணிகத்திற்கான கட்டமைப்பு சட்டங்கள் மற்றும் ஷெட்கள்.",
    details: "டிரஸ், தூண்கள், கிளாடிங்குடன் தொழில்துறை / பட்டறை ஷெட்கள்.",
  },
  general: {
    title: "பொது பேப்ரிக்கேஷன்",
    description: "தனிப்பயன் வெல்டிங் மற்றும் உலோக வேலைகள்.",
    details: "பிராக்கெட், சட்டம், பழுது, தனிப்பட்ட உலோக வேலைகள் — மேவாணி மற்றும் அருகில்.",
  },
};

export const FALLBACK_SERVICES: ServiceData[] = defaultServices.map((s, i) => {
  const ta = SERVICE_TA[s.id];
  return {
    id: s.id,
    slug: s.id,
    title: s.title,
    titleTamil: ta?.title ?? null,
    description: s.description,
    descriptionTamil: ta?.description ?? null,
    details: s.details,
    detailsTamil: ta?.details ?? null,
    icon: s.id,
    imageUrl: null,
    order: i,
  };
});

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

export function localizeSite(siteData: SiteData, locale: Locale): LocalizedSite {
  return {
    name: pickLocalized(siteData.name, siteData.nameTamil, locale),
    nameEn: siteData.name,
    nameTamil: siteData.nameTamil,
    tagline: pickLocalized(siteData.tagline, siteData.taglineTamil, locale),
    location: pickLocalized(siteData.location, siteData.locationTamil, locale),
    description: pickLocalizedNullable(
      siteData.description,
      siteData.descriptionTamil,
      locale
    ),
    contacts: siteData.contacts,
    address: pickLocalized(siteData.address, siteData.addressTamil, locale),
    pincode: siteData.pincode,
    hours: siteData.hours,
    mapEmbedUrl: siteData.mapEmbedUrl,
    serviceAreas: siteData.serviceAreas,
    googleReviewsUrl: siteData.googleReviewsUrl,
    whatsappPhone: siteData.whatsappPhone,
  };
}

export function localizeHero(hero: HeroData, locale: Locale): LocalizedHero {
  return {
    tagline: pickLocalized(hero.tagline, hero.taglineTamil, locale),
    subtitle: pickLocalized(hero.subtitle, hero.subtitleTamil, locale),
    imageUrl: hero.imageUrl,
    videoUrl: hero.videoUrl,
    ctaPrimary: pickLocalized(hero.ctaPrimary, hero.ctaPrimaryTamil, locale),
    ctaSecondary: pickLocalized(hero.ctaSecondary, hero.ctaSecondaryTamil, locale),
  };
}

export function localizeAbout(about: AboutData, locale: Locale): LocalizedAbout {
  return {
    eyebrow: pickLocalized(about.eyebrow, about.eyebrowTamil, locale),
    title: pickLocalized(about.title, about.titleTamil, locale),
    description: pickLocalized(about.description, about.descriptionTamil, locale),
    details: pickLocalized(about.details, about.detailsTamil, locale),
    footerNote: pickLocalizedNullable(about.footerNote, about.footerNoteTamil, locale),
    imageOneUrl: about.imageOneUrl,
    imageTwoUrl: about.imageTwoUrl,
    people: about.people,
  };
}

export function localizeService(service: ServiceData, locale: Locale): LocalizedService {
  return {
    id: service.id,
    slug: service.slug,
    title: pickLocalized(service.title, service.titleTamil, locale),
    description: pickLocalized(service.description, service.descriptionTamil, locale),
    details: pickLocalized(service.details, service.detailsTamil, locale),
    icon: service.icon,
    imageUrl: service.imageUrl,
    order: service.order,
  };
}

export function localizeGalleryItem(
  item: GalleryViewItem,
  locale: Locale
): LocalizedGalleryItem {
  return {
    id: item.id,
    url: item.url,
    type: item.type,
    caption: pickLocalizedNullable(item.caption, item.captionTamil, locale),
    alt: pickLocalizedNullable(item.alt, item.altTamil, locale),
  };
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
      taglineTamil: row.taglineTamil ?? FALLBACK_SITE.taglineTamil,
      location: row.location,
      locationTamil: row.locationTamil,
      description: row.description,
      descriptionTamil: row.descriptionTamil ?? FALLBACK_SITE.descriptionTamil,
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
      taglineTamil: row.taglineTamil ?? FALLBACK_HERO.taglineTamil,
      subtitle: row.subtitle,
      subtitleTamil: row.subtitleTamil ?? FALLBACK_HERO.subtitleTamil,
      imageUrl: row.imageUrl || FALLBACK_HERO.imageUrl,
      videoUrl: row.videoUrl?.trim() || FALLBACK_HERO.videoUrl,
      ctaPrimary: row.ctaPrimary,
      ctaPrimaryTamil: row.ctaPrimaryTamil ?? FALLBACK_HERO.ctaPrimaryTamil,
      ctaSecondary: row.ctaSecondary,
      ctaSecondaryTamil: row.ctaSecondaryTamil ?? FALLBACK_HERO.ctaSecondaryTamil,
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
      eyebrowTamil: row.eyebrowTamil ?? FALLBACK_ABOUT.eyebrowTamil,
      title: row.title,
      titleTamil: row.titleTamil ?? FALLBACK_ABOUT.titleTamil,
      description: row.description,
      descriptionTamil: row.descriptionTamil ?? FALLBACK_ABOUT.descriptionTamil,
      details: row.details?.trim() || FALLBACK_ABOUT.details,
      detailsTamil: row.detailsTamil?.trim() || FALLBACK_ABOUT.detailsTamil,
      footerNote: row.footerNote,
      footerNoteTamil: row.footerNoteTamil ?? FALLBACK_ABOUT.footerNoteTamil,
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
    return rows.map((r) => {
      const fallback = FALLBACK_SERVICES.find((s) => s.slug === r.slug);
      return {
        id: r.id,
        slug: r.slug,
        title: r.title,
        titleTamil: r.titleTamil ?? fallback?.titleTamil ?? null,
        description: r.description,
        descriptionTamil: r.descriptionTamil ?? fallback?.descriptionTamil ?? null,
        details: r.details?.trim() || r.description,
        detailsTamil: r.detailsTamil?.trim() || fallback?.detailsTamil || null,
        icon: r.icon,
        imageUrl: r.imageUrl?.trim() || null,
        order: r.order,
      };
    });
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const services = await getServicesData();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getGalleryData(): Promise<GalleryViewItem[]> {
  try {
    return await withTimeout(
      prisma.galleryMedia.findMany({
        orderBy: [{ createdAt: "desc" }, { order: "asc" }],
        select: {
          id: true,
          url: true,
          type: true,
          caption: true,
          captionTamil: true,
          alt: true,
          altTamil: true,
        },
      }),
      4000,
      []
    );
  } catch {
    return [];
  }
}
