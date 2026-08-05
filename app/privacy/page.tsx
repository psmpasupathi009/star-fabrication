import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { getSiteData } from "@/lib/content";
import { getServerSession } from "@/lib/session";
import { site as siteDefaults } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteDefaults.name} collects and uses contact details from quote requests.`,
};

export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const [siteData, session] = await Promise.all([getSiteData(), getServerSession()]);
  const isAdmin = session?.role?.toUpperCase() === "ADMIN";

  return (
    <>
      <SiteHeader contacts={siteData.contacts} />
      <main className="flex-1">
        <article className="section-shell bg-white">
          <div className="section-inner max-w-2xl">
            <p className="text-sm font-semibold text-gold-dim">Legal</p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[15px] text-muted">
              Last updated: August 2026
            </p>

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
                {siteData.contacts[0]
                  ? siteData.contacts[0].phoneDisplay
                  : "us"}{" "}
                or write via the{" "}
                <Link href="/#contact" className="text-foreground underline">
                  contact form
                </Link>
                .
              </p>
            </div>

            <p className="mt-12">
              <Link href="/" className="text-sm font-medium text-gold-dim hover:underline">
                ← Back to home
              </Link>
            </p>
          </div>
        </article>
      </main>
      <SiteFooter site={siteData} contacts={siteData.contacts} isAdmin={isAdmin} />
    </>
  );
}
