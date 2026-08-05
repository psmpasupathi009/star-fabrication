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
    <section id="contact" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Get in touch"
          title="Request a quote"
          description={`Send your project details to ${site.name} by email — or continue on WhatsApp.`}
        />

        <div className="grid gap-8 md:gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="order-2 space-y-3 lg:order-1 lg:col-span-2">
            {contacts.map((c) => (
              <a
                key={c.phone}
                href={telHref(c.phone)}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:gap-4 sm:p-5"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-elevated text-gold-dim sm:size-11">
                  <Phone className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[16px] font-semibold tracking-tight text-foreground sm:text-[17px]">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-gold-dim">{c.title}</span>
                  <span className="mt-1.5 block text-[15px] text-muted sm:mt-2">{c.phoneDisplay}</span>
                </span>
              </a>
            ))}
            <p className="px-1 text-[13px] text-muted sm:text-sm">
              Location: {site.location}
              {site.locationTamil ? ` (${site.locationTamil})` : ""}
            </p>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-3">
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-3xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 sm:space-y-5 sm:p-7 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
              </div>
              <div>
                <Label htmlFor="service">Service</Label>
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
              {success ? <p className="text-sm font-medium text-foreground">{success}</p> : null}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
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
