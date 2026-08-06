import path from "path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import {
  FALLBACK_ABOUT,
  FALLBACK_HERO,
  FALLBACK_SERVICES,
  FALLBACK_SITE,
} from "../lib/content";
import { services as defaultServices } from "../lib/site";

config({ path: path.join(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

async function main() {
  const { DEFAULT_HOURS } = await import("../lib/hours");

  await prisma.siteSettings.upsert({
    where: { key: "default" },
    update: {
      nameTamil: FALLBACK_SITE.nameTamil,
      taglineTamil: FALLBACK_SITE.taglineTamil,
      location: FALLBACK_SITE.location,
      locationTamil: FALLBACK_SITE.locationTamil,
      description: FALLBACK_SITE.description,
      descriptionTamil: FALLBACK_SITE.descriptionTamil,
      address: FALLBACK_SITE.address,
      addressTamil: FALLBACK_SITE.addressTamil,
      hoursJson: JSON.stringify(DEFAULT_HOURS),
      mapEmbedUrl: FALLBACK_SITE.mapEmbedUrl,
      serviceAreasJson: JSON.stringify(FALLBACK_SITE.serviceAreas),
      whatsappPhone: FALLBACK_SITE.whatsappPhone,
    },
    create: {
      key: "default",
      name: FALLBACK_SITE.name,
      nameTamil: FALLBACK_SITE.nameTamil,
      tagline: FALLBACK_SITE.tagline,
      taglineTamil: FALLBACK_SITE.taglineTamil,
      location: FALLBACK_SITE.location,
      locationTamil: FALLBACK_SITE.locationTamil,
      description: FALLBACK_SITE.description,
      descriptionTamil: FALLBACK_SITE.descriptionTamil,
      contactsJson: JSON.stringify(FALLBACK_SITE.contacts),
      address: FALLBACK_SITE.address,
      addressTamil: FALLBACK_SITE.addressTamil,
      hoursJson: JSON.stringify(DEFAULT_HOURS),
      mapEmbedUrl: FALLBACK_SITE.mapEmbedUrl,
      serviceAreasJson: JSON.stringify(FALLBACK_SITE.serviceAreas),
      whatsappPhone: FALLBACK_SITE.whatsappPhone,
    },
  });

  await prisma.heroContent.upsert({
    where: { key: "default" },
    update: {
      tagline: FALLBACK_HERO.tagline,
      taglineTamil: FALLBACK_HERO.taglineTamil,
      subtitle: FALLBACK_HERO.subtitle,
      subtitleTamil: FALLBACK_HERO.subtitleTamil,
      ctaPrimary: FALLBACK_HERO.ctaPrimary,
      ctaPrimaryTamil: FALLBACK_HERO.ctaPrimaryTamil,
      ctaSecondary: FALLBACK_HERO.ctaSecondary,
      ctaSecondaryTamil: FALLBACK_HERO.ctaSecondaryTamil,
      imageUrl: FALLBACK_HERO.imageUrl,
      videoUrl: FALLBACK_HERO.videoUrl,
    },
    create: {
      key: "default",
      tagline: FALLBACK_HERO.tagline,
      taglineTamil: FALLBACK_HERO.taglineTamil,
      subtitle: FALLBACK_HERO.subtitle,
      subtitleTamil: FALLBACK_HERO.subtitleTamil,
      imageUrl: FALLBACK_HERO.imageUrl,
      videoUrl: FALLBACK_HERO.videoUrl,
      ctaPrimary: FALLBACK_HERO.ctaPrimary,
      ctaPrimaryTamil: FALLBACK_HERO.ctaPrimaryTamil,
      ctaSecondary: FALLBACK_HERO.ctaSecondary,
      ctaSecondaryTamil: FALLBACK_HERO.ctaSecondaryTamil,
    },
  });

  await prisma.aboutContent.upsert({
    where: { key: "default" },
    update: {
      eyebrow: FALLBACK_ABOUT.eyebrow,
      eyebrowTamil: FALLBACK_ABOUT.eyebrowTamil,
      title: FALLBACK_ABOUT.title,
      titleTamil: FALLBACK_ABOUT.titleTamil,
      description: FALLBACK_ABOUT.description,
      descriptionTamil: FALLBACK_ABOUT.descriptionTamil,
      details: FALLBACK_ABOUT.details,
      detailsTamil: FALLBACK_ABOUT.detailsTamil,
      footerNote: FALLBACK_ABOUT.footerNote,
      footerNoteTamil: FALLBACK_ABOUT.footerNoteTamil,
      imageOneUrl: FALLBACK_ABOUT.imageOneUrl,
      imageTwoUrl: FALLBACK_ABOUT.imageTwoUrl,
      peopleJson: JSON.stringify(
        FALLBACK_ABOUT.people.map((c) => ({ ...c, imageUrl: null, extra: null }))
      ),
    },
    create: {
      key: "default",
      eyebrow: FALLBACK_ABOUT.eyebrow,
      eyebrowTamil: FALLBACK_ABOUT.eyebrowTamil,
      title: FALLBACK_ABOUT.title,
      titleTamil: FALLBACK_ABOUT.titleTamil,
      description: FALLBACK_ABOUT.description,
      descriptionTamil: FALLBACK_ABOUT.descriptionTamil,
      details: FALLBACK_ABOUT.details,
      detailsTamil: FALLBACK_ABOUT.detailsTamil,
      footerNote: FALLBACK_ABOUT.footerNote,
      footerNoteTamil: FALLBACK_ABOUT.footerNoteTamil,
      imageOneUrl: FALLBACK_ABOUT.imageOneUrl,
      imageTwoUrl: FALLBACK_ABOUT.imageTwoUrl,
      peopleJson: JSON.stringify(
        FALLBACK_ABOUT.people.map((c) => ({ ...c, imageUrl: null, extra: null }))
      ),
    },
  });

  const { SERVICE_IMAGE_BY_SLUG, DEFAULT_SERVICE_IMAGE } = await import(
    "../lib/service-images"
  );

  for (let i = 0; i < defaultServices.length; i++) {
    const s = defaultServices[i];
    const fb = FALLBACK_SERVICES.find((x) => x.slug === s.id);
    const imageUrl = SERVICE_IMAGE_BY_SLUG[s.id] ?? DEFAULT_SERVICE_IMAGE;
    await prisma.serviceItem.upsert({
      where: { slug: s.id },
      update: {
        title: s.title,
        titleTamil: fb?.titleTamil ?? null,
        description: s.description,
        descriptionTamil: fb?.descriptionTamil ?? null,
        details: s.details,
        detailsTamil: fb?.detailsTamil ?? null,
        icon: s.id,
        imageUrl,
        order: i,
      },
      create: {
        slug: s.id,
        title: s.title,
        titleTamil: fb?.titleTamil ?? null,
        description: s.description,
        descriptionTamil: fb?.descriptionTamil ?? null,
        details: s.details,
        detailsTamil: fb?.detailsTamil ?? null,
        icon: s.id,
        imageUrl,
        order: i,
      },
    });
  }

  console.log("CMS defaults seeded (EN + TA).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
