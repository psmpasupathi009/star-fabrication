import path from "path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { services as defaultServices } from "../lib/site";

config({ path: path.join(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

const contacts = [
  {
    name: "Boopalan",
    title: "DME",
    phone: "8807920508",
    phoneDisplay: "88079 20508",
  },
  {
    name: "Silambarasan",
    title: "DMET",
    phone: "7708468506",
    phoneDisplay: "770846 8506",
  },
];

async function main() {
  const { DEFAULT_HOURS } = await import("../lib/hours");

  await prisma.siteSettings.upsert({
    where: { key: "default" },
    update: {
      address: "Mevani, Namakkal District, Tamil Nadu",
      addressTamil: "மேவாணி, நாமக்கல் மாவட்டம், தமிழ்நாடு",
      hoursJson: JSON.stringify(DEFAULT_HOURS),
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Mevani,+Namakkal,+Tamil+Nadu&z=14&output=embed",
      serviceAreasJson: JSON.stringify([
        "Mevani",
        "Rasipuram",
        "Namakkal",
        "Tiruchengode",
        "Paramathi",
        "Nearby villages",
      ]),
      whatsappPhone: "8807920508",
    },
    create: {
      key: "default",
      name: "Star Fabrication",
      nameTamil: "ஸ்டார் பேப்ரிக்கேஷன்",
      tagline: "Our Motive Your Satisfaction",
      location: "Mevani",
      locationTamil: "மேவாணி",
      description:
        "Custom metal fabrication in Mevani — gates, grills, roofing, doors, and industrial structures built with craftsmanship.",
      contactsJson: JSON.stringify(contacts),
      address: "Mevani, Namakkal District, Tamil Nadu",
      addressTamil: "மேவாணி, நாமக்கல் மாவட்டம், தமிழ்நாடு",
      hoursJson: JSON.stringify(DEFAULT_HOURS),
      mapEmbedUrl:
        "https://maps.google.com/maps?q=Mevani,+Namakkal,+Tamil+Nadu&z=14&output=embed",
      serviceAreasJson: JSON.stringify([
        "Mevani",
        "Rasipuram",
        "Namakkal",
        "Tiruchengode",
        "Paramathi",
        "Nearby villages",
      ]),
      whatsappPhone: "8807920508",
    },
  });

  await prisma.heroContent.upsert({
    where: { key: "default" },
    update: {
      imageUrl: "/gallery/hero.jpg",
      videoUrl: "/gallery/hero.mp4",
    },
    create: {
      key: "default",
      tagline: "Our Motive Your Satisfaction",
      subtitle:
        "Gates, grills, roofing, and industrial structures — welded with precision in Mevani.",
      imageUrl: "/gallery/hero.jpg",
      videoUrl: "/gallery/hero.mp4",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "Call Now",
    },
  });

  const aboutDetails = `Star Fabrication is a metal fabrication workshop in Mevani (மேவாணி), serving Namakkal district for years. We fabricate in mild steel (MS) and stainless steel (SS) — gates, grills, roofing, doors, railings, sheds, and custom welding for homes and businesses.

Our process is simple: measure on site → fabricate in the workshop → install and finish. Every job is built for strength, Tamil Nadu weather, and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.`;

  await prisma.aboutContent.upsert({
    where: { key: "default" },
    update: {
      details: aboutDetails,
      imageOneUrl: "/gallery/workshop.jpg",
      imageTwoUrl: "/gallery/welder.jpg",
      peopleJson: JSON.stringify(contacts.map((c) => ({ ...c, imageUrl: null, extra: null }))),
    },
    create: {
      key: "default",
      eyebrow: "About us",
      title: "Built on craft, driven by satisfaction",
      description:
        "From designer gates to industrial sheds, Star Fabrication delivers durable metalwork for homes and businesses across Mevani and nearby towns.",
      details: aboutDetails,
      footerNote: "Based in Mevani (மேவாணி) — ஸ்டார் பேப்ரிக்கேஷன்.",
      imageOneUrl: "/gallery/workshop.jpg",
      imageTwoUrl: "/gallery/welder.jpg",
      peopleJson: JSON.stringify(contacts.map((c) => ({ ...c, imageUrl: null, extra: null }))),
    },
  });

  const { SERVICE_IMAGE_BY_SLUG, DEFAULT_SERVICE_IMAGE } = await import(
    "../lib/service-images"
  );

  for (let i = 0; i < defaultServices.length; i++) {
    const s = defaultServices[i];
    const imageUrl = SERVICE_IMAGE_BY_SLUG[s.id] ?? DEFAULT_SERVICE_IMAGE;
    await prisma.serviceItem.upsert({
      where: { slug: s.id },
      update: {
        title: s.title,
        description: s.description,
        details: s.details,
        icon: s.id,
        imageUrl,
        order: i,
      },
      create: {
        slug: s.id,
        title: s.title,
        description: s.description,
        details: s.details,
        icon: s.id,
        imageUrl,
        order: i,
      },
    });
  }

  console.log("CMS defaults seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
