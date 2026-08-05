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
  await prisma.siteSettings.upsert({
    where: { key: "default" },
    update: {},
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
    },
  });

  await prisma.heroContent.upsert({
    where: { key: "default" },
    update: {
      imageUrl: "/gallery/hero.jpg",
    },
    create: {
      key: "default",
      tagline: "Our Motive Your Satisfaction",
      subtitle:
        "Gates, grills, roofing, and industrial structures — welded with precision in Mevani.",
      imageUrl: "/gallery/hero.jpg",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "Call Now",
    },
  });

  await prisma.aboutContent.upsert({
    where: { key: "default" },
    update: {
      details:
        "Star Fabrication is a metal fabrication workshop in Mevani (மேவாணி). We take on grill works, gates, roofing, doors, railings, sheds, and custom welding for homes and businesses.\n\nEvery job is measured on site, fabricated with care, and finished for strength and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.",
      peopleJson: JSON.stringify(contacts.map((c) => ({ ...c, imageUrl: null, extra: null }))),
    },
    create: {
      key: "default",
      eyebrow: "About us",
      title: "Built on craft, driven by satisfaction",
      description:
        "From designer gates to industrial sheds, Star Fabrication delivers durable metalwork for homes and businesses across Mevani.",
      details:
        "Star Fabrication is a metal fabrication workshop in Mevani (மேவாணி). We take on grill works, gates, roofing, doors, railings, sheds, and custom welding for homes and businesses.\n\nEvery job is measured on site, fabricated with care, and finished for strength and daily use. Our motive is your satisfaction — clear communication, solid workmanship, and on-time delivery.",
      footerNote:
        "Based in Mevani (மேவாணி) — ஸ்டார் பேப்ரிக்கேஷன்.",
      peopleJson: JSON.stringify(contacts.map((c) => ({ ...c, imageUrl: null, extra: null }))),
    },
  });

  for (let i = 0; i < defaultServices.length; i++) {
    const s = defaultServices[i];
    await prisma.serviceItem.upsert({
      where: { slug: s.id },
      update: {
        title: s.title,
        description: s.description,
        details: s.details,
        icon: s.id,
        order: i,
      },
      create: {
        slug: s.id,
        title: s.title,
        description: s.description,
        details: s.details,
        icon: s.id,
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
