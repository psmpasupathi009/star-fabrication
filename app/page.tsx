import { About } from "@/app/components/about";
import { Contact } from "@/app/components/contact";
import { Gallery } from "@/app/components/gallery";
import { Hero } from "@/app/components/hero";
import { MobileCallBar } from "@/app/components/mobile-call-bar";
import { Services } from "@/app/components/services";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import {
  getAboutData,
  getGalleryData,
  getHeroData,
  getServicesData,
  getSiteData,
} from "@/lib/content";
import { getServerSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [siteData, hero, about, services, galleryItems, session] = await Promise.all([
    getSiteData(),
    getHeroData(),
    getAboutData(),
    getServicesData(),
    getGalleryData(),
    getServerSession(),
  ]);

  const isAdmin = session?.role?.toUpperCase() === "ADMIN";
  const primaryPhone = siteData.contacts[0]?.phone ?? "8807920508";

  return (
    <>
      <SiteHeader contacts={siteData.contacts} />
      <main className="flex-1 pb-14 md:pb-0">
        <Hero hero={hero} primaryPhone={primaryPhone} nameTamil={siteData.nameTamil} />
        <About about={about} />
        <Services services={services} />
        <Gallery items={galleryItems} />
        <Contact site={siteData} contacts={siteData.contacts} services={services} />
      </main>
      <SiteFooter site={siteData} contacts={siteData.contacts} isAdmin={isAdmin} />
      <MobileCallBar contacts={siteData.contacts} />
    </>
  );
}
