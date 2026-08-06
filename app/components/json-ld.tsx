import type { Locale } from "@/lib/i18n/config";
import type { BusinessHours } from "@/lib/hours";
import { hoursToOpeningHoursSpecification } from "@/lib/hours";
import { getSiteUrl } from "@/lib/site";

type JsonLdSite = {
  name: string;
  description: string | null;
  address: string;
  location: string;
  contacts: { phone: string }[];
  hours: BusinessHours;
  serviceAreas: string[];
  googleReviewsUrl: string | null;
  pincode: string | null;
};

type LocalBusinessJsonLdProps = {
  site: JsonLdSite;
  nameEn: string;
  nameTamil?: string | null;
  locale: Locale;
};

export function LocalBusinessJsonLd({
  site,
  nameEn,
  nameTamil,
  locale,
}: LocalBusinessJsonLdProps) {
  const url = getSiteUrl();
  const phones = site.contacts.map((c) => `+91${c.phone}`);
  const alternateName =
    locale === "ta" ? nameEn : nameTamil?.trim() || undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name: site.name,
    alternateName,
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
