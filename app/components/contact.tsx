"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import type { ContactPerson, ServiceData, SiteData } from "@/lib/content";
import { buildQuoteMessage, telHref, whatsappUrl } from "@/lib/site";

type ContactProps = {
  site: SiteData;
  contacts: ContactPerson[];
  services: ServiceData[];
};

export function Contact({ site, contacts, services }: ContactProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0]?.title ?? "General Fabrication");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const primary = contacts[0];

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, message }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Could not send message");
        return;
      }
      setSuccess(data.message || "Message sent.");
      setName("");
      setPhone("");
      setMessage("");
      setService(services[0]?.title ?? "General Fabrication");
    } catch {
      setError("Could not send message. Please try WhatsApp or call us.");
    } finally {
      setLoading(false);
    }
  }

  function openWhatsApp() {
    const text = buildQuoteMessage({ name, phone, service, message });
    window.open(whatsappUrl(text, primary?.phone), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Request a quote"
          description={`Send your project details to ${site.name} by email — or continue on WhatsApp.`}
        />

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-3 lg:col-span-2">
            {contacts.map((c) => (
              <a
                key={c.phone}
                href={telHref(c.phone)}
                className="flex items-start gap-4 border border-white/10 bg-surface/60 p-5 hover:border-gold/45 hover:bg-surface-hover"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center border border-gold/35 bg-gold/10 text-gold">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block font-display text-lg uppercase tracking-wide text-foreground">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-xs uppercase tracking-wider text-gold">
                    {c.title}
                  </span>
                  <span className="mt-2 block text-muted">{c.phoneDisplay}</span>
                </span>
              </a>
            ))}
            <p className="text-sm text-muted">
              Location: {site.location}
              {site.locationTamil ? ` (${site.locationTamil})` : ""}
            </p>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="space-y-4 border border-gold/15 bg-surface/85 p-6 sm:p-8"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="flex h-11 w-full border border-white/15 bg-surface px-3.5 text-sm text-foreground outline-none focus:border-gold/55 focus:ring-1 focus:ring-gold/35"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, size, and timeline"
                />
              </div>
              {error ? <p className="text-sm text-accent-red">{error}</p> : null}
              {success ? <p className="text-sm text-gold">{success}</p> : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                  <Send className="size-4" />
                  {loading ? "Sending…" : "Send message"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
