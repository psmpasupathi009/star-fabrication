import { PrismaClient } from "@prisma/client";
import { SERVICE_IMAGE_BY_SLUG, DEFAULT_SERVICE_IMAGE } from "../lib/service-images";

const prisma = new PrismaClient();

async function main() {
  const rows = await prisma.serviceItem.findMany();
  for (const r of rows) {
    const url = SERVICE_IMAGE_BY_SLUG[r.slug] || DEFAULT_SERVICE_IMAGE;
    await prisma.serviceItem.update({
      where: { id: r.id },
      data: { imageUrl: url },
    });
    console.log(`${r.slug} → ${url}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
