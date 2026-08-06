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

/** Local gallery when Mongo/Cloudinary is slow or empty */
export const FALLBACK_GALLERY: GalleryViewItem[] = [
  {
    id: "local-gate",
    url: "/gallery/services/gate-v2.jpg",
    type: "image",
    caption: "Designer Gate",
    captionTamil: "வடிவமைப்பு கதவு",
    alt: "Ornate wrought iron gate",
    altTamil: null,
  },
  {
    id: "local-grill",
    url: "/gallery/services/grill-v2.jpg",
    type: "image",
    caption: "Window Grills",
    captionTamil: "சாளரக் கிரில்",
    alt: "House with window security grills",
    altTamil: null,
  },
  {
    id: "local-railing",
    url: "/gallery/services/railing-v2.jpg",
    type: "image",
    caption: "Balcony Railings",
    captionTamil: "பால்கனி கைப்பிடி",
    alt: "Metal balcony railings",
    altTamil: null,
  },
  {
    id: "local-staircase",
    url: "/gallery/services/staircase-v2.jpg",
    type: "image",
    caption: "Staircase Handrail",
    captionTamil: "படிக்கட்டு கைப்பிடி",
    alt: "Interior metal stair railing",
    altTamil: null,
  },
  {
    id: "local-fence",
    url: "/gallery/services/fence-v2.jpg",
    type: "image",
    caption: "Compound Fencing",
    captionTamil: "கூட்டு வேலி",
    alt: "Security metal gate and fencing",
    altTamil: null,
  },
  {
    id: "local-roof",
    url: "/gallery/services/roof-v2.jpg",
    type: "image",
    caption: "Roofing Work",
    captionTamil: "கூரை வேலை",
    alt: "Corrugated metal roofing and cladding",
    altTamil: null,
  },
  {
    id: "local-parking",
    url: "/gallery/services/parking-v2.jpg",
    type: "image",
    caption: "Parking Structure",
    captionTamil: "பார்க்கிங் ஷெட்",
    alt: "Steel car parking shed",
    altTamil: null,
  },
  {
    id: "local-shutter",
    url: "/gallery/services/shutter-v2.jpg",
    type: "image",
    caption: "Rolling Shutter",
    captionTamil: "ரோலிங் ஷட்டர்",
    alt: "Industrial metal door and shutter",
    altTamil: null,
  },
  {
    id: "local-industrial",
    url: "/gallery/services/industrial-v2.jpg",
    type: "image",
    caption: "Industrial Shed",
    captionTamil: "தொழிற்சாலை ஷெட்",
    alt: "Fabrication workshop interior",
    altTamil: null,
  },
  {
    id: "local-stainless",
    url: "/gallery/services/stainless-v2.jpg",
    type: "image",
    caption: "Stainless Works",
    captionTamil: "ஸ்டெயின்லெஸ் வேலை",
    alt: "Stainless steel fabrication",
    altTamil: null,
  },
  {
    id: "local-weld",
    url: "/gallery/services/weld-v2.jpg",
    type: "image",
    caption: "Precision Welding",
    captionTamil: "துல்லிய வெல்டிங்",
    alt: "Welding sparks on metalwork",
    altTamil: null,
  },
  {
    id: "local-welder",
    url: "/gallery/welder.jpg",
    type: "image",
    caption: "Workshop Welding",
    captionTamil: "பட்டறை வெல்டிங்",
    alt: "Welder at work with sparks",
    altTamil: null,
  },
  {
    id: "local-workshop",
    url: "/gallery/workshop.jpg",
    type: "image",
    caption: "Our Workshop",
    captionTamil: "எங்கள் பட்டறை",
    alt: "Star Fabrication workshop",
    altTamil: null,
  },
];

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
  taglineTamil: "எங்கள் நோக்கம் — உங்கள் திருப்தி",
  location: site.location,
  locationTamil: site.locationTamil,
  description: site.description,
  descriptionTamil:
    "அந்தியூர், மேவாணியில் தனிப்பயன் உலோக வேலைகள் — கதவு, சாளரக் கிரில், கூரை, கைப்பிடி, ஷெட். தமிழ்நாடு, கேரளா, கர்நாடகா முழுவதும் சேவை.",
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
  taglineTamil: "எங்கள் நோக்கம் — உங்கள் திருப்தி",
  subtitle: `Gates, grills, roofing, and industrial structures — welded with precision in ${site.location}.`,
  subtitleTamil: `கதவு, சாளரக் கிரில், கூரை மற்றும் தொழிற்சாலை கட்டமைப்புகள் — ${site.locationTamil}-ல் துல்லியமாக வெல்டிங் செய்கிறோம்.`,
  imageUrl: "/gallery/hero.jpg",
  videoUrl: "/gallery/hero.mp4",
  ctaPrimary: "Get a Quote",
  ctaPrimaryTamil: "விலை மதிப்பீடு கேட்க",
  ctaSecondary: "Call Now",
  ctaSecondaryTamil: "இப்போது அழைக்க",
};

export const FALLBACK_ABOUT: AboutData = {
  eyebrow: "About us",
  eyebrowTamil: "எங்களைப் பற்றி",
  title: "Built on craft, driven by satisfaction",
  titleTamil: "நுணுக்கமான வேலை, உங்கள் திருப்தியே எங்கள் இலக்கு",
  description: `From designer gates to industrial sheds, ${site.name} delivers durable metalwork for homes and businesses across Tamil Nadu, Kerala, and Karnataka — from our workshop in ${site.location}.`,
  descriptionTamil: `அலங்கார கதவு முதல் தொழிற்சாலை ஷெட் வரை, ${site.nameTamil} தமிழ்நாடு, கேரளா, கர்நாடகா முழுவதும் வீடுகள் மற்றும் கடைகளுக்கு உறுதியான உலோக வேலைகளைச் செய்கிறது — எங்கள் பட்டறை ${site.locationTamil}-ல்.`,
  details: `${site.name} is a metal fabrication workshop in ${site.location} (${site.locationTamil}). We fabricate and install across Tamil Nadu, Kerala, and Karnataka. We work in mild steel (MS) and stainless steel (SS) — gates, grills, roofing, doors, railings, sheds, and custom welding for homes and businesses.

Our process is simple: measure on site → fabricate in the workshop → install and finish. Every job is built for strength, local weather, and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.`,
  detailsTamil: `${site.nameTamil} ${site.locationTamil}-ல் இயங்கும் உலோக வேலைப் பட்டறை. தமிழ்நாடு, கேரளா, கர்நாடகா முழுவதும் அளந்து பொருத்தித் தருகிறோம். மைல்டு ஸ்டீல் (MS) மற்றும் ஸ்டெயின்லெஸ் ஸ்டீல் (SS)-ல் கதவு, சாளரக் கிரில், கூரை, கைப்பிடி, ஷெட் மற்றும் தனிப்பயன் வெல்டிங் செய்கிறோம்.

எங்கள் முறை எளிது: இடத்தில் அளவு → பட்டறையில் தயாரிப்பு → பொருத்தி முடித்தல். ஒவ்வொரு பணியும் வலிமை, உள்ளூர் வானிலை, தினசரி பயன்பாடு ஆகியவற்றுக்கு ஏற்றது. எங்கள் நோக்கம் உங்கள் திருப்தி — தெளிவான பேச்சு, உறுதியான வேலை, சரியான நேரத்தில் ஒப்படைப்பு.`,
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
    title: "சாளரக் கிரில் பணிகள்",
    description: "வீட்டிற்கு ஏற்ற பாதுகாப்பு மற்றும் அழகான சாளரக் கிரில்கள்.",
    details:
      "மைல்டு ஸ்டீல் மற்றும் வடிவமைப்பு கிரில்கள் — இடத்தில் அளந்து, வலிமைக்காக வெல்டிங், தமிழ்நாட்டு வானிலைக்கு ஏற்ற பூச்சு. வீடு, அபார்ட்மெண்ட், கடைகளுக்கு ஏற்றது.",
  },
  gate: {
    title: "கதவு பணிகள்",
    description: "அலங்கார மற்றும் கனமான முதன்மைக் கதவுகள் — லேசர் கட் மற்றும் வெல்டிங்.",
    details:
      "முதன்மை கதவு, காம்பவுண்ட் கதவு, ஸ்லைடிங் கதவு. தினசரி பயன்பாட்டிற்கு உறுதியான சட்டம், ஹிஞ்ச் அல்லது ரோலர்.",
  },
  railing: {
    title: "கைப்பிடி / ரெயிலிங் பணிகள்",
    description: "சாளரம், பால்கனி, டெரஸ் கைப்பிடிகள் — MS மற்றும் SS.",
    details:
      "பால்கனி, டெரஸ், படிக்கட்டு கைப்பிடிகள். சுத்தமான வெல்டிங் மற்றும் பூச்சு அல்லது பளபளப்பு.",
  },
  staircase: {
    title: "படிக்கட்டு மற்றும் கைப்பிடி",
    description: "வீடுகள் மற்றும் கடைகளுக்கான உலோகப் படிக்கட்டுகள்.",
    details:
      "நேர் மற்றும் சுழல் உலோகப் படிக்கட்டுகள் — பாதுகாப்பான உயரம்/படி அகலம், வீடு மற்றும் கடை மேஜானின்களுக்கு ஏற்றது.",
  },
  "compound-wall": {
    title: "சுற்றுச்சுவர் மற்றும் வேலி",
    description: "எல்லை வேலி மற்றும் சுற்றுச்சுவர் இரும்புப் பணிகள்.",
    details:
      "சுற்றுச்சுவர் சட்டம், கிரில் வேலி, கதவுடன் இணைந்த எல்லைப் பணிகள். வீட்டு மனை மற்றும் கிடங்கு எல்லைகளுக்கு ஏற்றது.",
  },
  roofing: {
    title: "கூரை தகடு பணிகள்",
    description: "வீடு, ஷெட், கேனபிக்கான நீடித்த உலோகக் கூரை.",
    details:
      "வண்ணப் பூச்சு மற்றும் GI கூரைத் தகடுகள் — சாய்வு திட்டம், பர்லின், மழைக்கு ஏற்ற பொருத்துதல்.",
  },
  "cement-sheet": {
    title: "சிமெண்ட் தகடு பணிகள்",
    description: "சிமெண்ட் தகடு கூரை மற்றும் சுவர் மூடல்.",
    details:
      "குறைந்த செலவில் ஷெட் மற்றும் வெளிக் கட்டிடங்களுக்கு சிமெண்ட் / ஃபைபர் தகடு கூரை — சரியான மேற்பொருத்துதல்.",
  },
  "parking-shed": {
    title: "கார் நிறுத்த ஷெட்",
    description: "இரும்பு கார் நிறுத்த ஷெட் மற்றும் கேனபி.",
    details:
      "ஒரு மற்றும் பல கார் ஷெட்கள் — குழாய் அல்லது பாக்ஸ் சட்டம், தகடுக் கூரை. வீட்டு முன் மற்றும் அபார்ட்மெண்ட் பார்க்கிங்கிற்கு ஏற்றது.",
  },
  "rolling-shutter": {
    title: "ரோலிங் ஷட்டர்",
    description: "கடை மற்றும் கேரேஜ் ரோலிங் ஷட்டர்கள் — தயாரித்துப் பொருத்துதல்.",
    details:
      "கடை, கோடவுன், கேரேஜ்களுக்கான MS ரோலிங் ஷட்டர் — திறப்பு அளவுக்கு ஏற்ப, சீரான இயக்கம்.",
  },
  stainless: {
    title: "ஸ்டெயின்லெஸ் ஸ்டீல் பணிகள்",
    description: "SS கைப்பிடி, சமையலறை ஸ்டாண்ட், தனிப்பயன் SS வேலை.",
    details:
      "ஸ்டெயின்லெஸ் கைப்பிடி, சமையலறை மேடை, காட்சி ஸ்டாண்ட் — வீடு, ஹோட்டல், கடைகளுக்கு பளபளப்பு பூச்சு.",
  },
  "main-door": {
    title: "முதன்மைக் கதவு பணிகள்",
    description: "வலுவான முதன்மைக் கதவுகள் — நம்பகமான பூட்டு மற்றும் பூச்சு.",
    details:
      "MS முதன்மை மற்றும் பாதுகாப்புக் கதவுகள் — சட்டம், பூட்டு, தெருப் பக்க அழகுக்கான பூச்சு.",
  },
  "kerala-set": {
    title: "கேரள பாணி செட் / ஷெட்",
    description: "நீடித்த கேரள பாணி ஷெட் மற்றும் செட் பணிகள்.",
    details:
      "பாரம்பரிய விகிதங்களுடன் கேரள பாணி செட் / ஷெட் — வெளி இருக்கை மற்றும் மூடிய முற்றம் ஆகியவற்றுக்கு ஏற்றது.",
  },
  industrial: {
    title: "தொழிற்சாலை ஷெட்கள்",
    description: "வணிகத்திற்கான கட்டமைப்பு சட்டங்கள் மற்றும் ஷெட்கள்.",
    details:
      "தொழிற்சாலை மற்றும் பட்டறை ஷெட்கள் — டிரஸ், தூண், கிளாடிங். சிறிய ஆலை, வெல்டிங் பட்டறை, சேமிப்புக்கு ஏற்ற அளவு.",
  },
  general: {
    title: "பொது உலோக வேலைகள்",
    description: "தனிப்பயன் வெல்டிங் மற்றும் அனைத்து வகை இரும்பு வேலைகள்.",
    details:
      "பிராக்கெட், சட்டம், பழுது, தனிப்பட்ட உலோக வேலைகள். அளவு அல்லது ஸ்கெட்ச் கொடுங்கள் — தமிழ்நாடு, கேரளா, கர்நாடகா முழுவதும் தயாரித்துத் தருகிறோம்.",
  },
};

const AREA_TA: Record<string, string> = {
  "Tamil Nadu": "தமிழ்நாடு",
  Kerala: "கேரளா",
  Karnataka: "கர்நாடகா",
  Mevani: "மேவாணி",
  "Andhiyur, Mevani": "அந்தியூர், மேவாணி",
  Rasipuram: "ராசிபுரம்",
  Namakkal: "நாமக்கல்",
  Tiruchengode: "திருச்செங்கோடு",
  Paramathi: "பரமத்தி",
  "Nearby villages": "அருகிலுள்ள கிராமங்கள்",
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
    serviceAreas:
      locale === "ta"
        ? siteData.serviceAreas.map((a) => AREA_TA[a] ?? a)
        : siteData.serviceAreas,
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
    const rows = await withTimeout(
      prisma.galleryMedia.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
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
      8000,
      null
    );
    if (!rows?.length) return FALLBACK_GALLERY;
    return rows;
  } catch {
    return FALLBACK_GALLERY;
  }
}
