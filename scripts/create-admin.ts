import path from "path";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

config({ path: path.join(process.cwd(), ".env"), override: true });

const prisma = new PrismaClient();

async function main() {
  const emailArg = process.argv[2]?.trim().toLowerCase();
  const password = process.argv[3];
  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const email = emailArg || adminEmail;

  if (!email || !password) {
    console.error("Usage: npm run admin:create -- <email> <password>");
    console.error("Email must match ADMIN_EMAIL in .env");
    process.exit(1);
  }

  if (adminEmail && email !== adminEmail) {
    console.error(`Email must match ADMIN_EMAIL (${adminEmail})`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role: "ADMIN" },
    create: { email, password: hashed, role: "ADMIN", name: "Admin" },
  });

  console.log(`Admin ready: ${user.email} (${user.role})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
