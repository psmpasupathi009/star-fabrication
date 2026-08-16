import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTopFab } from "@/app/components/back-to-top-fab";
import { MobileCallBar } from "@/app/components/mobile-call-bar";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { WhatsAppFab } from "@/app/components/whatsapp-fab";
import {
  getServiceBySlug,
  getServicesData,
  getSiteData,
  localizeService,
  localizeSite,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { resolveServiceImage } from "@/lib/service-images";
import { getSiteUrl, telHref, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServicesData();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const serviceRaw = await getServiceBySlug(slug);
  if (!serviceRaw) return { title: "Service" };
  const service = localizeService(serviceRaw, locale);
  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | Star Fabrication`,
      description: service.description,
      images: [{ url: resolveServiceImage(service.slug, service.imageUrl) }],
    },
  };
}

export const revalidate = 60;

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [serviceRaw, servicesRaw, siteRaw] = await Promise.all([
    getServiceBySlug(slug),
    getServicesData(),
    getSiteData(),
  ]);

  if (!serviceRaw) notFound();

  const service = localizeService(serviceRaw, locale);
  const services = servicesRaw.map((s) => localizeService(s, locale));
  const siteData = localizeSite(siteRaw, locale);

  const isAdmin = false;
  const imageSrc = resolveServiceImage(service.slug, service.imageUrl);
  const primary = siteData.contacts[0];
  const wa = siteData.whatsappPhone || primary?.phone;
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 4);
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.details || service.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteData.name,
      telephone: primary ? `+91${primary.phone}` : undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteData.address,
        addressLocality: siteData.location,
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    areaServed: siteData.serviceAreas,
    url: `${siteUrl}/services/${service.slug}`,
    image: imageSrc.startsWith("http") ? imageSrc : `${siteUrl}${imageSrc}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader
        contacts={siteData.contacts}
        locale={locale}
        nameEn={siteRaw.name}
        nameTamil={siteRaw.nameTamil}
      />
      <main
        id="main-content"
        className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
      >
        <article className="section-shell bg-white">
          <div className="section-inner">
            <p className="text-sm font-semibold text-gold-dim">
              <Link href="/#services" className="hover:underline">
                {dict.servicePage.services}
              </Link>
              <span className="mx-2 text-muted">/</span>
              {service.title}
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-elevated ring-1 ring-black/5 sm:aspect-16/10 lg:aspect-4/5">
                <Image
                  src={imageSrc}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
                  {service.title}
                </h1>
                <p className="mt-4 text-[17px] leading-relaxed text-muted sm:text-[18px]">
                  {service.details || service.description}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/#contact"
                    className={cn(
                      "inline-flex h-12 items-center justify-center rounded-full bg-[#1d1d1f] px-7 text-[15px] font-medium text-white hover:bg-black",
                      "w-full sm:w-auto"
                    )}
                  >
                    {dict.servicePage.requestQuote}
                  </Link>
                  {wa ? (
                    <a
                      href={whatsappUrl(
                        `${dict.whatsapp.quoteGreeting}\n\n${service.title}`,
                        wa
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-7 text-[15px] font-medium text-foreground hover:bg-black/[0.04]",
                        "w-full sm:w-auto"
                      )}
                    >
                      {dict.servicePage.whatsapp}
                    </a>
                  ) : null}
                  {primary ? (
                    <a
                      href={telHref(primary.phone)}
                      className={cn(
                        "inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-medium text-foreground hover:bg-black/[0.04]",
                        "w-full sm:w-auto"
                      )}
                    >
                      {dict.servicePage.callNow} {primary.phoneDisplay}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {related.length > 0 ? (
              <div className="mt-16 border-t border-black/8 pt-12">
                <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                  {dict.servicePage.related}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((s) => {
                    const relatedImage = resolveServiceImage(s.slug, s.imageUrl);
                    return (
                      <li key={s.id}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="group block overflow-hidden rounded-2xl ring-1 ring-black/5 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                        >
                          <div className="relative aspect-4/3 bg-elevated">
                            <Image
                              src={relatedImage}
                              alt={s.title}
                              fill
                              sizes="(max-width: 640px) 100vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>
                          <p className="p-3 text-sm font-semibold tracking-tight text-foreground">
                            {s.title}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <SiteFooter
        site={siteData}
        contacts={siteData.contacts}
        isAdmin={isAdmin}
        locale={locale}
        nameEn={siteRaw.name}
        nameTamil={siteRaw.nameTamil}
      />
      <MobileCallBar contacts={siteData.contacts} whatsappPhone={wa || ""} />
      <WhatsAppFab phone={wa || ""} />
      <BackToTopFab />
    </>
  );
}
