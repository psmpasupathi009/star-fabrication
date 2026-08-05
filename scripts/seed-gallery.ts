import { readFileSync, readdirSync } from "fs";
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
  { file: "gate.jpg", caption: "Designer Gate", alt: "Designer metal gate with intricate fabrication" },
  { file: "canopy.jpg", caption: "Residential Canopy", alt: "Curved metal canopy over residential driveway" },
  { file: "shed.jpg", caption: "Industrial Shed", alt: "Industrial shed with blue roof and open frame" },
  { file: "roof.jpg", caption: "Roofing Work", alt: "Multi-tier residential roof structure" },
  { file: "welder.jpg", caption: "Precision Welding", alt: "Welder at work with sparks flying" },
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
  const existing = await prisma.galleryMedia.count();
  if (existing > 0) {
    console.log(`Gallery already has ${existing} item(s). Skipping seed.`);
    return;
  }

  const available = new Set(readdirSync(galleryDir));
  let order = 0;

  for (const item of SEED_FILES) {
    if (!available.has(item.file)) {
      console.warn(`Missing ${item.file}, skip`);
      continue;
    }
    const buffer = readFileSync(path.join(galleryDir, item.file));
    const publicId = path.parse(item.file).name;
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
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
