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
            <p className="text-sm font-semibold text-gold-dim">Legal</p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              {dict.privacy.title}
            </h1>
            <p className="mt-4 text-[15px] text-muted">
              {locale === "ta" ? "கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2026" : "Last updated: August 2026"}
            </p>

            <div className="mt-8 rounded-2xl bg-elevated p-5 text-[16px] leading-relaxed text-muted sm:p-6 sm:text-[17px]">
              <p>{dict.privacy.summary}</p>
            </div>

            <div className="mt-10 space-y-6 text-[16px] leading-relaxed text-muted sm:text-[17px]">
              <p>
                {siteData.name} (“we”) operates this website to share our metal fabrication
                services and receive quote requests from customers in {siteData.location} and
                nearby areas.
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Information we collect
              </h2>
              <p>
                When you use the quote form, we collect the name, phone number, optional email
                address, service interest, and message you provide. If you contact us on WhatsApp
                or by phone, we receive whatever details you choose to share in that conversation.
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                How we use it
              </h2>
              <p>
                We use this information only to respond to your enquiry, prepare quotes, schedule
                site visits or installation, and follow up about your project. We do not sell your
                personal information.
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Email confirmation
              </h2>
              <p>
                If you provide an email address, we may send a short confirmation that we received
                your request. We do not use your email for unrelated marketing unless you ask us to.
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Retention
              </h2>
              <p>
                Quote emails are kept as long as needed to handle your request and for ordinary
                business records, then deleted or archived according to our normal practice.
              </p>

              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
                Contact
              </h2>
              <p>
                Questions about this policy: call{" "}
                {siteData.contacts[0] ? siteData.contacts[0].phoneDisplay : "us"} or write via the{" "}
                <Link href="/#contact" className="text-foreground underline">
                  contact form
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
