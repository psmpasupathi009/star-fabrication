import { NextRequest } from "next/server";
import { requireAdminSession } from "@/lib/session";

/** @deprecated Prefer requireAdminSession — kept for gallery API compatibility */
export async function requireAdmin(request: NextRequest) {
  const { error } = await requireAdminSession(request);
  return error;
}

export async function isAdminRequest(request: NextRequest) {
  const { session } = await requireAdminSession(request);
  return Boolean(session);
}
