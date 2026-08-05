export const site = {
  name: "Star Fabrication",
  nameTamil: "ஸ்டார் பேப்ரிக்கேஷன்",
  tagline: "Our Motive Your Satisfaction",
  location: "Mevani",
  locationTamil: "மேவாணி",
  address: "Mevani, Namakkal District, Tamil Nadu",
  addressTamil: "மேவாணி, நாமக்கல் மாவட்டம், தமிழ்நாடு",
  pincode: "",
  description:
    "Custom metal fabrication in Mevani — gates, grills, roofing, doors, and industrial structures built with craftsmanship.",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Mevani,+Namakkal,+Tamil+Nadu&z=14&output=embed",
  serviceAreas: [
    "Mevani",
    "Rasipuram",
    "Namakkal",
    "Tiruchengode",
    "Paramathi",
    "Nearby villages",
  ],
  googleReviewsUrl: "",
} as const;

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw).origin;
    } catch {
      /* fall through */
    }
  }
  return "https://starfabrication.local";
}

export const contacts = [
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
] as const;

export const primaryContact = contacts[0];

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "grill",
    title: "Grill Works",
    description: "Security and decorative window grills crafted to fit your home.",
    details:
      "Window and balcony grills in MS and designer patterns — measured on site, welded for strength, and finished for Tamil Nadu weather. Ideal for homes, flats, and shops needing security without blocking light.",
  },
  {
    id: "gate",
    title: "Gate Works",
    description: "Designer and heavy-duty gates with laser-cut and welded detail.",
    details:
      "Main gates, compound gates, and sliding gates with laser-cut panels, box frames, and reliable hinges or rollers. Built for daily use in Indian residential and commercial compounds.",
  },
  {
    id: "railing",
    title: "Railing Works",
    description: "Window, balcony, and terrace railings in MS and stainless.",
    details:
      "Balcony and terrace railings, staircase handrails, and safety barriers. Options in mild steel and stainless steel with clean welds and powder-coat or polish finishes.",
  },
  {
    id: "staircase",
    title: "Staircase & Handrail",
    description: "Metal staircases and sturdy handrails for homes and shops.",
    details:
      "Straight and spiral metal staircases with solid stringers and handrails. Designed for homes, duplexes, and shop mezzanines with safe rise/run and local building needs in mind.",
  },
  {
    id: "compound-wall",
    title: "Compound Wall & Fencing",
    description: "Boundary fencing and compound wall steel work.",
    details:
      "Compound wall frames, grill fencing, and gate-integrated boundary work. Strong posts and panels suited to Indian plot boundaries and farm or warehouse perimeters.",
  },
  {
    id: "roofing",
    title: "Roofing Sheet",
    description: "Durable metal roofing sheets for homes, sheds, and canopies.",
    details:
      "Colour-coated and GI roofing sheets for homes, shops, and sheds — including slope planning, purlins, and leak-conscious fixing for monsoon conditions.",
  },
  {
    id: "cement-sheet",
    title: "Cement Sheet",
    description: "Cement sheet roofing and cladding installed with precision.",
    details:
      "Cement / fibre sheet roofing and cladding for budget-friendly sheds and outbuildings, installed with proper overlap and support framing.",
  },
  {
    id: "parking-shed",
    title: "Car Parking Shed",
    description: "Steel car parking sheds and canopy structures.",
    details:
      "Single and multi-car parking sheds with pipe or box-section frames and sheet roofing. Compact footprints for house frontages and apartment parking.",
  },
  {
    id: "rolling-shutter",
    title: "Rolling Shutter",
    description: "Shop and garage rolling shutters fabricated and fitted.",
    details:
      "MS rolling shutters for shops, godowns, and garages — measured for clear opening, with guides, spring balance, and smooth operation.",
  },
  {
    id: "stainless",
    title: "Stainless Steel Works",
    description: "SS railings, kitchen stands, and custom stainless fabrication.",
    details:
      "Stainless steel railings, kitchen platforms, display stands, and custom SS fabrication with polish finishes for homes, hotels, and commercial spaces.",
  },
  {
    id: "main-door",
    title: "Main Door Works",
    description: "Strong main doors with clean finishes and reliable hardware.",
    details:
      "MS main doors and security doors with frames, locks, and finish options. Built for strength and a neat street-facing look.",
  },
  {
    id: "kerala-set",
    title: "Kerala-Style Sets",
    description: "Classic Kerala-style shed and set works for lasting shelter.",
    details:
      "Kerala-style set / shed structures with traditional proportions and durable steel framing — popular for outdoor seating and covered yards.",
  },
  {
    id: "industrial",
    title: "Industrial Sheds",
    description: "Structural frames and industrial shed fabrication for business.",
    details:
      "Industrial and workshop sheds with trusses, columns, and cladding ready for machinery floors. Sized for small factories, welding shops, and storage.",
  },
  {
    id: "general",
    title: "General Fabrication",
    description: "Custom welding and metalwork — all types done with care.",
    details:
      "Custom brackets, frames, repairs, and one-off metalwork. Bring a sketch or measurement — we fabricate to site needs across Mevani and nearby areas.",
  },
] as const;

export function telHref(phone: string) {
  return `tel:+91${phone}`;
}

export function whatsappUrl(message: string, phone: string = primaryContact.phone) {
  const text = encodeURIComponent(message);
  return `https://wa.me/91${phone}?text=${text}`;
}

export function buildQuoteMessage(input: {
  name: string;
  phone: string;
  service: string;
  message: string;
  email?: string;
}) {
  return [
    `Hello Star Fabrication,`,
    ``,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    input.email ? `Email: ${input.email}` : null,
    `Service: ${input.service}`,
    ``,
    input.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
