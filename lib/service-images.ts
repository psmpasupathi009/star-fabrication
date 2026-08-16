/** Service card / page images — subject-matched files in public/gallery/services.
 *  *-v2.jpg names bust Next.js image cache after replacements.
 */
export const SERVICE_IMAGE_BY_SLUG: Record<string, string> = {
  grill: "/gallery/services/grill-v2.jpg",
  gate: "/gallery/services/gate-v2.jpg",
  railing: "/gallery/services/railing-v2.jpg",
  "compound-wall": "/gallery/services/fence-v2.jpg",
  "main-door": "/gallery/services/main-door-v2.jpg",

  staircase: "/gallery/services/staircase-v2.jpg",
  roofing: "/gallery/services/roof-v2.jpg",
  "cement-sheet": "/gallery/services/cement-v2.jpg",
  "parking-shed": "/gallery/services/parking-v2.jpg",
  "kerala-set": "/gallery/services/canopy-v2.jpg",
  industrial: "/gallery/services/industrial-v2.jpg",
  "rolling-shutter": "/gallery/services/shutter-v2.jpg",

  stainless: "/gallery/services/stainless-v2.jpg",
  general: "/gallery/services/general-v2.jpg",
};

export const DEFAULT_SERVICE_IMAGE = "/gallery/services/weld-v2.jpg";

export function resolveServiceImage(
  slug: string,
  imageUrl?: string | null
): string {
  const custom = imageUrl?.trim();
  if (custom) return custom;
  return SERVICE_IMAGE_BY_SLUG[slug] ?? DEFAULT_SERVICE_IMAGE;
}
