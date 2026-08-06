import { About } from "@/app/components/about";
import { Contact } from "@/app/components/contact";
import { Faq } from "@/app/components/faq";
import { Gallery } from "@/app/components/gallery";
import { Hero } from "@/app/components/hero";
import { LocalBusinessJsonLd } from "@/app/components/json-ld";
import { MobileCallBar } from "@/app/components/mobile-call-bar";
import { ServiceAreas } from "@/app/components/service-areas";
import { Services } from "@/app/components/services";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Testimonials } from "@/app/components/testimonials";
import { WhatsAppFab } from "@/app/components/whatsapp-fab";
import {
  getAboutData,
  getGalleryData,
  getHeroData,
  getServicesData,
  getSiteData,
  localizeAbout,
  localizeGalleryItem,
  localizeHero,
  localizeService,
  localizeSite,
} from "@/lib/content";
import { getLocale } from "@/lib/i18n/get-locale";
import { getServerSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getLocale();
  const [siteRaw, heroRaw, aboutRaw, servicesRaw, galleryRaw, session] =
    await Promise.all([
      getSiteData(),
      getHeroData(),
      getAboutData(),
      getServicesData(),
      getGalleryData(),
      getServerSession(),
    ]);

  const siteData = localizeSite(siteRaw, locale);
  const hero = localizeHero(heroRaw, locale);
  const about = localizeAbout(aboutRaw, locale);
  const services = servicesRaw.map((s) => localizeService(s, locale));
  const galleryItems = galleryRaw.map((g) => localizeGalleryItem(g, locale));

  const isAdmin = session?.role?.toUpperCase() === "ADMIN";
  const primaryPhone = siteData.contacts[0]?.phone ?? "8807920508";
  const waPhone = siteData.whatsappPhone || primaryPhone;

  return (
    <>
      <LocalBusinessJsonLd
        site={siteData}
        nameEn={siteRaw.name}
        nameTamil={siteRaw.nameTamil}
        locale={locale}
      />
      <SiteHeader
        contacts={siteData.contacts}
        locale={locale}
        nameEn={siteRaw.name}
        nameTamil={siteRaw.nameTamil}
      />
      <main id="main-content" className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <Hero
          hero={hero}
          primaryPhone={primaryPhone}
          nameEn={siteRaw.name}
          nameTamil={siteRaw.nameTamil}
          locale={locale}
        />
        <About about={about} />
        <Services services={services} />
        <Gallery items={galleryItems} />
        <ServiceAreas areas={siteData.serviceAreas} location={siteData.location} />
        <Faq />
        <Testimonials googleReviewsUrl={siteData.googleReviewsUrl} />
        <Contact site={siteData} contacts={siteData.contacts} services={services} />
      </main>
      <SiteFooter
        site={siteData}
        contacts={siteData.contacts}
        isAdmin={isAdmin}
        nameEn={siteRaw.name}
        nameTamil={siteRaw.nameTamil}
        locale={locale}
      />
      <MobileCallBar contacts={siteData.contacts} whatsappPhone={waPhone} />
      <WhatsAppFab phone={waPhone} />
    </>
  );
}
