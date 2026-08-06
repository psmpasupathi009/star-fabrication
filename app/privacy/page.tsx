import type { Metadata } from "next";
import Link from "next/link";
import { MobileCallBar } from "@/app/components/mobile-call-bar";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { WhatsAppFab } from "@/app/components/whatsapp-fab";
import { getSiteData, localizeSite } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getLocale } from "@/lib/i18n/get-locale";
import { getServerSession } from "@/lib/session";
import { site as siteDefaults } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteDefaults.name} collects and uses contact details from quote requests.`,
};

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [siteRaw, session] = await Promise.all([getSiteData(), getServerSession()]);
  const siteData = localizeSite(siteRaw, locale);
  const isAdmin = session?.role?.toUpperCase() === "ADMIN";
  const waPhone =
    siteData.whatsappPhone || siteData.contacts[0]?.phone || "8807920508";
  const phoneLabel = siteData.contacts[0]?.phoneDisplay || "us";

  return (
    <>
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
          <div className="section-inner max-w-2xl">
            <p className="text-sm font-semibold text-gold-dim">{dict.privacy.legal}</p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              {dict.privacy.title}
            </h1>
            <p className="mt-4 text-[15px] text-muted">{dict.privacy.updated}</p>

            <div className="mt-8 rounded-2xl bg-elevated p-5 text-[16px] leading-relaxed text-muted sm:p-6 sm:text-[17px]">
              <p>{dict.privacy.summary}</p>
            </div>

            <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-muted sm:text-[17px]">
              <p>
                {dict.privacy.intro
                  .replace("{name}", siteData.name)
                  .replace("{location}", siteData.location)}
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                {dict.privacy.collectTitle}
              </h2>
              <p>{dict.privacy.collectBody}</p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                {dict.privacy.useTitle}
              </h2>
              <p>{dict.privacy.useBody}</p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                {dict.privacy.emailTitle}
              </h2>
              <p>{dict.privacy.emailBody}</p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                {dict.privacy.retentionTitle}
              </h2>
              <p>{dict.privacy.retentionBody}</p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                {dict.privacy.contactTitle}
              </h2>
              <p>
                {dict.privacy.contactBody.replace("{phone}", phoneLabel)}{" "}
                <Link href="/#contact" className="text-foreground underline">
                  {dict.privacy.contactForm}
                </Link>
                .
              </p>
            </div>

            <p className="mt-12">
              <Link href="/" className="text-sm font-medium text-gold-dim hover:underline">
                ← {dict.privacy.backHome}
              </Link>
            </p>
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
      <MobileCallBar contacts={siteData.contacts} whatsappPhone={waPhone} />
      <WhatsAppFab phone={waPhone} />
    </>
  );
}
