"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import type { ContactPerson, LocalizedService, LocalizedSite } from "@/lib/content";
import { formatHoursLines } from "@/lib/hours";
import { useLocale } from "@/lib/i18n/locale-provider";
import { buildQuoteMessage, telHref, whatsappUrl } from "@/lib/site";

type ContactProps = {
  site: LocalizedSite;
  contacts: ContactPerson[];
  services: LocalizedService[];
};

export function Contact({ site, contacts, services }: ContactProps) {
  const { dict } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "General Fabrication");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const primary = contacts[0];
  const waPhone = site.whatsappPhone || primary?.phone;
  const hoursLines = formatHoursLines(site.hours, {
    weekdays: dict.hours.weekdays,
    short: dict.hours.short,
    closed: dict.hours.closed,
  });
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address + (site.pincode ? ` ${site.pincode}` : "")
  )}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email: email || undefined, service, message }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || dict.contact.sendFailed);
        return;
      }
      setSuccess(data.message || "Message sent.");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setService(services[0]?.title ?? "General Fabrication");
    } catch {
      setError(dict.contact.sendFailed);
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError(dict.contact.fillRequired);
      return;
    }
    const text = buildQuoteMessage(
      { name, phone, email, service, message },
      {
        greeting: dict.whatsapp.quoteGreeting,
        nameLabel: dict.whatsapp.nameLabel,
        phoneLabel: dict.whatsapp.phoneLabel,
        emailLabel: dict.whatsapp.emailLabel,
        serviceLabel: dict.whatsapp.serviceLabel,
      }
    );
    window.open(whatsappUrl(text, waPhone), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
          description={dict.contact.description.replace("{name}", site.name)}
        />

        <div className="grid gap-10 md:gap-12 lg:grid-cols-5">
          <div className="order-2 space-y-4 lg:order-1 lg:col-span-2">
            {contacts.map((c) => (
              <a
                key={c.phone}
                href={telHref(c.phone)}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:gap-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-elevated text-gold-dim sm:size-11">
                  <Phone className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[17px] font-semibold tracking-tight text-foreground">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-gold-dim">{c.title}</span>
                  <span className="mt-2 block text-[15px] text-muted">{c.phoneDisplay}</span>
                </span>
              </a>
            ))}

            <div className="space-y-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-dim" />
                <div>
                  <p className="text-[15px] font-medium text-foreground sm:text-[17px]">
                    {site.address}
                  </p>
                  {site.pincode ? (
                    <p className="mt-0.5 text-sm text-muted">PIN {site.pincode}</p>
                  ) : null}
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-gold-dim hover:underline"
                  >
                    {dict.contact.openMaps}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-black/5 pt-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold-dim" />
                <ul className="space-y-0.5 text-sm text-muted">
                  {hoursLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            {site.mapEmbedUrl ? (
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                <iframe
                  title={`${site.name} location map`}
                  src={site.mapEmbedUrl}
                  className="aspect-4/3 w-full border-0 bg-elevated"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2 lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:p-7 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div>
                  <Label htmlFor="name">{dict.contact.name}</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={dict.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{dict.contact.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={dict.contact.phonePlaceholder}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">{dict.contact.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.contact.emailPlaceholder}
                />
              </div>
              <div>
                <Label htmlFor="service">{dict.contact.service}</Label>
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-border bg-surface px-4 text-[16px] text-foreground outline-none focus:ring-2 focus:ring-[var(--ring)] sm:text-[17px]"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="message">{dict.contact.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={dict.contact.messagePlaceholder}
                />
              </div>
              {error ? (
                <p role="alert" className="text-sm text-accent-red">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p role="status" aria-live="polite" className="text-sm font-medium text-foreground">
                  {success}
                </p>
              ) : null}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  <Send className="size-4" />
                  {loading ? dict.contact.sending : dict.contact.send}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={openWhatsApp}
                  disabled={loading}
                >
                  <MessageCircle className="size-4" />
                  {dict.contact.whatsapp}
                </Button>
              </div>
              <p className="text-[12px] text-muted">
                {dict.contact.privacyAgree}{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  {dict.contact.privacyLink}
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
