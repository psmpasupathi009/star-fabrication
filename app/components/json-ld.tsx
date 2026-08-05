import type { SiteData } from "@/lib/content";
import { hoursToOpeningHoursSpecification } from "@/lib/hours";
import { getSiteUrl } from "@/lib/site";

export function LocalBusinessJsonLd({ site }: { site: SiteData }) {
  const url = getSiteUrl();
  const phones = site.contacts.map((c) => `+91${c.phone}`);

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name: site.name,
    alternateName: site.nameTamil || undefined,
    description: site.description || undefined,
    url,
    telephone: phones[0],
    image: `${url}/gallery/og.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.location,
      addressRegion: "Tamil Nadu",
      postalCode: site.pincode || undefined,
      addressCountry: "IN",
    },
    areaServed: site.serviceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
    openingHoursSpecification: hoursToOpeningHoursSpecification(site.hours),
    sameAs: site.googleReviewsUrl ? [site.googleReviewsUrl] : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
