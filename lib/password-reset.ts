import { randomInt } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const PIN_TTL_MS = 15 * 60 * 1000;
const PIN_LENGTH = 6;

/** Cryptographically random 6-digit PIN (000000–999999). */
export function generateResetPin(): string {
  return String(randomInt(0, 1_000_000)).padStart(PIN_LENGTH, "0");
}

export async function hashResetPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 12);
}

export async function saveResetPin(email: string, pin: string): Promise<void> {
  const resetPinHash = await hashResetPin(pin);
  const resetPinExpires = new Date(Date.now() + PIN_TTL_MS);
  await prisma.user.update({
    where: { email: email.toLowerCase() },
    data: { resetPinHash, resetPinExpires },
  });
}

/**
 * Verifies PIN against stored hash. Returns true only if valid and not expired.
 * Does not clear the PIN — caller clears after successful password update.
 */
export async function verifyResetPin(
  email: string,
  pin: string
): Promise<boolean> {
  const normalized = pin.trim();
  if (!/^\d{6}$/.test(normalized)) return false;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { resetPinHash: true, resetPinExpires: true },
  });

  if (!user?.resetPinHash || !user.resetPinExpires) return false;
  if (user.resetPinExpires.getTime() < Date.now()) return false;

  return bcrypt.compare(normalized, user.resetPinHash);
}
