/** Default HD fabrication photos when a service has no CMS imageUrl.
 *  Free stock metalwork stills (Unsplash/Pexels) — not visiting-card crops.
 */
export const SERVICE_IMAGE_BY_SLUG: Record<string, string> = {
  // Decorative / security metalwork
  grill: "/gallery/services/grill.jpg",
  gate: "/gallery/services/gate.jpg",
  railing: "/gallery/services/railing.jpg",
  "compound-wall": "/gallery/services/fence.jpg",
  "main-door": "/gallery/services/main-door.jpg",

  // Structures & roofing
  staircase: "/gallery/services/staircase.jpg",
  roofing: "/gallery/services/roof.jpg",
  "cement-sheet": "/gallery/services/cement.jpg",
  "parking-shed": "/gallery/services/parking.jpg",
  "kerala-set": "/gallery/services/canopy.jpg",
  industrial: "/gallery/services/industrial.jpg",
  "rolling-shutter": "/gallery/services/shutter.jpg",

  // Material / general fabrication
  stainless: "/gallery/services/stainless.jpg",
  general: "/gallery/services/general.jpg",
};

export const DEFAULT_SERVICE_IMAGE = "/gallery/services/weld.jpg";

export function resolveServiceImage(
  slug: string,
  imageUrl?: string | null
): string {
  const custom = imageUrl?.trim();
  if (custom) return custom;
  return SERVICE_IMAGE_BY_SLUG[slug] ?? DEFAULT_SERVICE_IMAGE;
}
