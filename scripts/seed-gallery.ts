import { readFileSync, existsSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";

config({ path: path.join(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

const url = process.env.CLOUDINARY_URL;
if (url) {
  cloudinary.config({ url });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const SEED_FILES = [
  { file: "services/gate.jpg", caption: "Designer Gate", alt: "Ornate wrought iron gate" },
  { file: "services/grill.jpg", caption: "Window Grills", alt: "House with window security grills" },
  { file: "services/railing.jpg", caption: "Balcony Railings", alt: "Metal balcony railings" },
  { file: "services/staircase.jpg", caption: "Staircase Handrail", alt: "Interior metal stair railing" },
  { file: "services/fence.jpg", caption: "Compound Fencing", alt: "Security metal gate and fencing" },
  { file: "services/roof.jpg", caption: "Roofing Work", alt: "Corrugated metal roofing and cladding" },
  { file: "services/parking.jpg", caption: "Parking Structure", alt: "Architectural metal cladding" },
  { file: "services/canopy.jpg", caption: "Canopy & Cladding", alt: "Home with metal canopy and railings" },
  { file: "services/shutter.jpg", caption: "Rolling Shutter", alt: "Industrial metal door and shutter" },
  { file: "services/industrial.jpg", caption: "Industrial Shed", alt: "Fabrication workshop interior" },
  { file: "services/stainless.jpg", caption: "Stainless Works", alt: "Stainless steel piping fabrication" },
  { file: "services/weld.jpg", caption: "Precision Welding", alt: "Welding sparks on metalwork" },
  { file: "welder.jpg", caption: "Workshop Welding", alt: "Welder at work with sparks" },
  { file: "workshop.jpg", caption: "Our Workshop", alt: "Star Fabrication workshop" },
] as const;

async function uploadBuffer(buffer: Buffer, publicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "star-fabrication/gallery",
          public_id: publicId,
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else if (result?.secure_url) resolve(result.secure_url);
          else reject(new Error("No URL returned"));
        }
      )
      .end(buffer);
  });
}

async function main() {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  const existingRows = await prisma.galleryMedia.findMany({
    select: { caption: true },
  });
  const existingCaptions = new Set(
    existingRows.map((r) => r.caption?.trim().toLowerCase()).filter(Boolean)
  );

  let order = existingRows.length;
  let added = 0;

  for (const item of SEED_FILES) {
    if (existingCaptions.has(item.caption.toLowerCase())) continue;
    const fullPath = path.join(galleryDir, item.file);
    if (!existsSync(fullPath)) {
      console.warn(`Missing ${item.file}, skip`);
      continue;
    }
    const buffer = readFileSync(fullPath);
    const publicId = `seed-${path.parse(item.file).name}`;
    console.log(`Uploading ${item.file}…`);
    const secureUrl = await uploadBuffer(buffer, publicId);
    await prisma.galleryMedia.create({
      data: {
        url: secureUrl,
        type: "image",
        caption: item.caption,
        alt: item.alt,
        order: order++,
      },
    });
    console.log(`  → ${secureUrl}`);
    added += 1;
  }

  if (added === 0) {
    console.log(`Gallery already covered (${existingRows.length} item(s)). Nothing to add.`);
  } else {
    console.log(`Added ${added} gallery item(s). Total target captions: ${SEED_FILES.length}.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
