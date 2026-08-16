import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/** When ADMIN_EMAIL is set, only that account is admin (matches requireAdminSession). */
export async function isAdminEmail(email: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const normalized = email.toLowerCase();
  if (adminEmail) {
    return normalized === adminEmail;
  }

  const user = await prisma.user.findUnique({
    where: { email: normalized },
    select: { role: true },
  });

  return user?.role?.toUpperCase() === "ADMIN";
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}
