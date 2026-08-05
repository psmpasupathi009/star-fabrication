"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { LogOut, Plus, Save, Trash2, Upload } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { StarLogo } from "@/app/components/star-logo";
import type { ContactPerson } from "@/lib/content";
import { cn } from "@/lib/utils/cn";

type Tab = "hero" | "about" | "services" | "gallery" | "site";

type GalleryItem = {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  alt: string | null;
  order: number;
};

type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  details: string | null;
  icon: string;
  imageUrl: string | null;
  order: number;
};

type AboutPersonForm = {
  name: string;
  title: string;
  phone: string;
  phoneDisplay: string;
  imageUrl: string;
  extra: string;
};

const TABS: { id: Tab; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "site", label: "Site" },
];

export function AdminDashboardClient({ email }: { email: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("hero");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Hero
  const [hero, setHero] = useState({
    tagline: "",
    subtitle: "",
    imageUrl: "",
    ctaPrimary: "",
    ctaSecondary: "",
  });

  // About
  const [about, setAbout] = useState({
    eyebrow: "",
    title: "",
    description: "",
    details: "",
    footerNote: "",
    imageOneUrl: "",
    imageTwoUrl: "",
  });
  const [aboutPeople, setAboutPeople] = useState<AboutPersonForm[]>([
    { name: "", title: "", phone: "", phoneDisplay: "", imageUrl: "", extra: "" },
    { name: "", title: "", phone: "", phoneDisplay: "", imageUrl: "", extra: "" },
  ]);

  // Site
  const [siteForm, setSiteForm] = useState({
    name: "",
    nameTamil: "",
    tagline: "",
    location: "",
    locationTamil: "",
    description: "",
  });
  const [contacts, setContacts] = useState<ContactPerson[]>([
    { name: "", title: "", phone: "", phoneDisplay: "" },
    { name: "", title: "", phone: "", phoneDisplay: "" },
  ]);

  // Services
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [newService, setNewService] = useState({
    slug: "",
    title: "",
    description: "",
    details: "",
    icon: "general",
    imageUrl: "",
  });
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galleryFile, setGalleryFile] = useState<File | null>(null);
  const [galleryCaption, setGalleryCaption] = useState("");
  const [saving, setSaving] = useState(false);

  const loadAll = useCallback(async () => {
    setError("");
    try {
      const [heroRes, aboutRes, siteRes, servicesRes, galleryRes] = await Promise.all([
        fetch("/api/admin/hero"),
        fetch("/api/admin/about"),
        fetch("/api/admin/site"),
        fetch("/api/admin/services"),
        fetch("/api/gallery"),
      ]);

      if (heroRes.ok) {
        const h = await heroRes.json();
        setHero({
          tagline: h.tagline ?? "",
          subtitle: h.subtitle ?? "",
          imageUrl: h.imageUrl ?? "",
          ctaPrimary: h.ctaPrimary ?? "",
          ctaSecondary: h.ctaSecondary ?? "",
        });
      }
      if (aboutRes.ok) {
        const a = await aboutRes.json();
        setAbout({
          eyebrow: a.eyebrow ?? "",
          title: a.title ?? "",
          description: a.description ?? "",
          details: a.details ?? "",
          footerNote: a.footerNote ?? "",
          imageOneUrl: a.imageOneUrl ?? "",
          imageTwoUrl: a.imageTwoUrl ?? "",
        });
        const people = (Array.isArray(a.people) ? a.people : []) as AboutPersonForm[];
        setAboutPeople([
          {
            name: people[0]?.name ?? "",
            title: people[0]?.title ?? "",
            phone: people[0]?.phone ?? "",
            phoneDisplay: people[0]?.phoneDisplay ?? "",
            imageUrl: people[0]?.imageUrl ?? "",
            extra: people[0]?.extra ?? "",
          },
          {
            name: people[1]?.name ?? "",
            title: people[1]?.title ?? "",
            phone: people[1]?.phone ?? "",
            phoneDisplay: people[1]?.phoneDisplay ?? "",
            imageUrl: people[1]?.imageUrl ?? "",
            extra: people[1]?.extra ?? "",
          },
        ]);
      }
      if (siteRes.ok) {
        const s = await siteRes.json();
        setSiteForm({
          name: s.name ?? "",
          nameTamil: s.nameTamil ?? "",
          tagline: s.tagline ?? "",
          location: s.location ?? "",
          locationTamil: s.locationTamil ?? "",
          description: s.description ?? "",
        });
        try {
          const parsed = JSON.parse(s.contactsJson || "[]") as ContactPerson[];
          if (parsed.length) setContacts(parsed);
        } catch {
          /* keep default */
        }
      }
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (galleryRes.ok) setGallery(await galleryRes.json());
    } catch {
      setError("Failed to load dashboard data");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await loadAll();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [loadAll]);

  async function logout() {
    await fetch("/api/auth/me", { method: "DELETE" });
    router.push("/admin/login");
  }

  async function uploadFile(file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload/media", {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) throw new Error(data.error || "Upload failed");
    return data.url;
  }

  async function saveHero(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");
    try {
      let imageUrl = hero.imageUrl;
      if (heroFile) imageUrl = await uploadFile(heroFile);
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...hero, imageUrl }),
      });
      if (!res.ok) throw new Error("Save failed");
      setHeroFile(null);
      setStatus("Hero saved");
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function saveAbout(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");
    try {
      const people = aboutPeople
        .filter((p) => p.name.trim())
        .map((p) => ({
          name: p.name.trim(),
          title: p.title.trim(),
          phone: p.phone.trim(),
          phoneDisplay: p.phoneDisplay.trim() || p.phone.trim(),
          imageUrl: p.imageUrl.trim() || null,
          extra: p.extra.trim() || null,
        }));

      const res = await fetch("/api/admin/about", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eyebrow: about.eyebrow,
          title: about.title,
          description: about.description,
          details: about.details,
          footerNote: about.footerNote,
          people,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("About saved");
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function saveSite(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    setError("");
    try {
      const res = await fetch("/api/admin/site", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...siteForm, contacts }),
      });
      if (!res.ok) throw new Error("Save failed");
      setStatus("Site settings saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function addService(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newService,
          imageUrl: newService.imageUrl || null,
        }),
      });
      if (!res.ok) throw new Error("Create failed");
      setNewService({
        slug: "",
        title: "",
        description: "",
        details: "",
        icon: "general",
        imageUrl: "",
      });
      setStatus("Service added");
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setSaving(false);
    }
  }

  async function saveService(item: ServiceItem) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/services/${item.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Update failed");
      setStatus("Service updated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/admin/services/${id}`, { method: "DELETE", credentials: "include" });
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  async function uploadGallery(e: FormEvent) {
    e.preventDefault();
    if (!galleryFile) {
      setError("Choose a file");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = await uploadFile(galleryFile);
      const res = await fetch("/api/gallery", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          type: galleryFile.type.startsWith("video/") ? "video" : "image",
          caption: galleryCaption || null,
          alt: galleryCaption || galleryFile.name,
        }),
      });
      if (!res.ok) throw new Error("Failed to save gallery item");
      setGalleryFile(null);
      setGalleryCaption("");
      setStatus("Gallery item added");
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteGallery(id: string) {
    if (!confirm("Delete this gallery item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE", credentials: "include" });
    setGallery((prev) => prev.filter((g) => g.id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-black/6 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-6">
        <div>
          <StarLogo size="sm" tone="on-light" />
          <h1 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
            Admin dashboard
          </h1>
          <p className="mt-1 text-sm text-muted">{email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="inline-flex">
            <Button type="button" variant="outline" size="sm">
              View site
            </Button>
          </Link>
          <Button type="button" variant="ghost" size="sm" onClick={logout}>
            <LogOut className="size-4" />
            Log out
          </Button>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap gap-2 rounded-full bg-white/80 p-1.5 ring-1 ring-black/6">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setStatus("");
              setError("");
            }}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-colors",
              tab === t.id
                ? "bg-[#1d1d1f] text-white shadow-sm"
                : "text-muted hover:bg-black/[0.04] hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {status ? (
        <p className="mb-4 rounded-2xl bg-gold/20 px-4 py-3 text-sm font-medium text-foreground">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-2xl bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
          {error}
        </p>
      ) : null}

      {tab === "hero" ? (
        <form onSubmit={saveHero} className="admin-panel space-y-4">
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={hero.tagline}
              onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="ctaPrimary">Primary CTA</Label>
              <Input
                id="ctaPrimary"
                value={hero.ctaPrimary}
                onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="ctaSecondary">Secondary CTA</Label>
              <Input
                id="ctaSecondary"
                value={hero.ctaSecondary}
                onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="heroImage">Hero image (Cloudinary upload)</Label>
            <Input
              id="heroImage"
              type="file"
              accept="image/*"
              onChange={(e) => setHeroFile(e.target.files?.[0] ?? null)}
            />
            {hero.imageUrl ? (
              <p className="mt-2 truncate text-xs text-muted">{hero.imageUrl}</p>
            ) : null}
          </div>
          <Button type="submit" disabled={saving}>
            <Save className="size-4" />
            Save hero
          </Button>
        </form>
      ) : null}

      {tab === "about" ? (
        <form onSubmit={saveAbout} className="admin-panel space-y-4">
          <div>
            <Label htmlFor="eyebrow">Eyebrow</Label>
            <Input
              id="eyebrow"
              value={about.eyebrow}
              onChange={(e) => setAbout({ ...about, eyebrow: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="aboutTitle">Title</Label>
            <Input
              id="aboutTitle"
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="aboutDesc">Short description (on page)</Label>
            <Textarea
              id="aboutDesc"
              value={about.description}
              onChange={(e) => setAbout({ ...about, description: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="aboutDetails">Full details (opens on button click)</Label>
            <Textarea
              id="aboutDetails"
              className="min-h-36"
              value={about.details}
              onChange={(e) => setAbout({ ...about, details: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="footerNote">Footer note</Label>
            <Textarea
              id="footerNote"
              value={about.footerNote}
              onChange={(e) => setAbout({ ...about, footerNote: e.target.value })}
            />
          </div>

          <p className="text-sm font-semibold text-foreground">
            Owners (shown in Learn more — photo, name, mobile, extra)
          </p>
          {aboutPeople.map((p, i) => (
            <div key={i} className="space-y-3 rounded-2xl bg-elevated p-4">
              <p className="text-xs font-medium text-muted">Owner {i + 1}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) => {
                    const next = [...aboutPeople];
                    next[i] = { ...next[i], name: e.target.value };
                    setAboutPeople(next);
                  }}
                />
                <Input
                  placeholder="Title"
                  value={p.title}
                  onChange={(e) => {
                    const next = [...aboutPeople];
                    next[i] = { ...next[i], title: e.target.value };
                    setAboutPeople(next);
                  }}
                />
                <Input
                  placeholder="Phone digits"
                  value={p.phone}
                  onChange={(e) => {
                    const next = [...aboutPeople];
                    next[i] = { ...next[i], phone: e.target.value };
                    setAboutPeople(next);
                  }}
                />
                <Input
                  placeholder="Phone display"
                  value={p.phoneDisplay}
                  onChange={(e) => {
                    const next = [...aboutPeople];
                    next[i] = { ...next[i], phoneDisplay: e.target.value };
                    setAboutPeople(next);
                  }}
                />
              </div>
              <Textarea
                placeholder="Extra note"
                value={p.extra}
                onChange={(e) => {
                  const next = [...aboutPeople];
                  next[i] = { ...next[i], extra: e.target.value };
                  setAboutPeople(next);
                }}
              />
              {p.imageUrl ? (
                <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-black/5">
                  <Image src={p.imageUrl} alt={p.name || "Person"} fill className="object-cover" />
                </div>
              ) : null}
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadFile(file);
                    const next = [...aboutPeople];
                    next[i] = { ...next[i], imageUrl: url };
                    setAboutPeople(next);
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Upload failed");
                  }
                }}
              />
            </div>
          ))}

          <Button type="submit" disabled={saving}>
            <Save className="size-4" />
            Save about
          </Button>
        </form>
      ) : null}

      {tab === "site" ? (
        <form onSubmit={saveSite} className="admin-panel space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="siteName">Business name</Label>
              <Input
                id="siteName"
                value={siteForm.name}
                onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="nameTamil">Tamil name</Label>
              <Input
                id="nameTamil"
                value={siteForm.nameTamil}
                onChange={(e) => setSiteForm({ ...siteForm, nameTamil: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="siteTagline">Tagline</Label>
            <Input
              id="siteTagline"
              value={siteForm.tagline}
              onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={siteForm.location}
                onChange={(e) => setSiteForm({ ...siteForm, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="locationTamil">Location (Tamil)</Label>
              <Input
                id="locationTamil"
                value={siteForm.locationTamil}
                onChange={(e) => setSiteForm({ ...siteForm, locationTamil: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="siteDesc">Description</Label>
            <Textarea
              id="siteDesc"
              value={siteForm.description}
              onChange={(e) => setSiteForm({ ...siteForm, description: e.target.value })}
            />
          </div>
          <p className="text-sm font-semibold text-foreground">Contacts</p>
          {contacts.map((c, i) => (
            <div key={i} className="grid gap-3 rounded-2xl bg-elevated p-4 sm:grid-cols-2">
              <Input
                placeholder="Name"
                value={c.name}
                onChange={(e) => {
                  const next = [...contacts];
                  next[i] = { ...next[i], name: e.target.value };
                  setContacts(next);
                }}
              />
              <Input
                placeholder="Title"
                value={c.title}
                onChange={(e) => {
                  const next = [...contacts];
                  next[i] = { ...next[i], title: e.target.value };
                  setContacts(next);
                }}
              />
              <Input
                placeholder="Phone digits"
                value={c.phone}
                onChange={(e) => {
                  const next = [...contacts];
                  next[i] = { ...next[i], phone: e.target.value };
                  setContacts(next);
                }}
              />
              <Input
                placeholder="Phone display"
                value={c.phoneDisplay}
                onChange={(e) => {
                  const next = [...contacts];
                  next[i] = { ...next[i], phoneDisplay: e.target.value };
                  setContacts(next);
                }}
              />
            </div>
          ))}
          <Button type="submit" disabled={saving}>
            <Save className="size-4" />
            Save site
          </Button>
        </form>
      ) : null}

      {tab === "services" ? (
        <div className="space-y-6">
          <form onSubmit={addService} className="admin-panel space-y-3">
            <p className="text-sm font-semibold text-foreground">Add service</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Slug (e.g. grill)"
                value={newService.slug}
                onChange={(e) => setNewService({ ...newService, slug: e.target.value })}
                required
              />
              <Input
                placeholder="Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                required
              />
            </div>
            <Textarea
              placeholder="Short description (card)"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            />
            <Textarea
              placeholder="Full details (modal)"
              value={newService.details}
              onChange={(e) => setNewService({ ...newService, details: e.target.value })}
            />
            <div>
              <Label htmlFor="newServiceImage">Card image (optional)</Label>
              <Input
                id="newServiceImage"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await uploadFile(file);
                    setNewService((prev) => ({ ...prev, imageUrl: url }));
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Upload failed");
                  }
                }}
              />
              {newService.imageUrl ? (
                <p className="mt-1 truncate text-xs text-muted">{newService.imageUrl}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={saving}>
              <Plus className="size-4" />
              Add
            </Button>
          </form>

          <ul className="space-y-4">
            {services.map((item) => (
              <li key={item.id} className="admin-panel space-y-3 !p-4">
                <div className="grid gap-3 sm:grid-cols-[7rem_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-elevated">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-2 text-center text-[11px] text-muted">
                        Stock image
                      </div>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === item.id ? { ...s, title: e.target.value } : s
                          )
                        )
                      }
                    />
                    <Input
                      value={item.icon}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === item.id ? { ...s, icon: e.target.value } : s
                          )
                        )
                      }
                      placeholder="Icon key"
                    />
                  </div>
                </div>
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s) =>
                        s.id === item.id ? { ...s, description: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Short description"
                />
                <Textarea
                  value={item.details ?? ""}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s) =>
                        s.id === item.id ? { ...s, details: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Full details"
                />
                <div>
                  <Label htmlFor={`service-img-${item.id}`}>Replace image</Label>
                  <Input
                    id={`service-img-${item.id}`}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const url = await uploadFile(file);
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === item.id ? { ...s, imageUrl: url } : s
                          )
                        );
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Upload failed");
                      }
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={() => saveService(item)} disabled={saving}>
                    <Save className="size-4" />
                    Save
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => deleteService(item.id)}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {tab === "gallery" ? (
        <div className="space-y-6">
          <form onSubmit={uploadGallery} className="admin-panel space-y-3">
            <p className="text-sm font-semibold text-foreground">Upload media</p>
            <Input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setGalleryFile(e.target.files?.[0] ?? null)}
            />
            <Input
              placeholder="Caption"
              value={galleryCaption}
              onChange={(e) => setGalleryCaption(e.target.value)}
            />
            <Button type="submit" disabled={saving}>
              <Upload className="size-4" />
              Upload
            </Button>
          </form>

          <ul className="space-y-3">
            {gallery.map((item) => (
              <li
                key={item.id}
                className="admin-panel flex flex-col gap-4 !p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-elevated sm:w-36">
                  {item.type === "video" ? (
                    <video src={item.url} className="h-full w-full object-cover" muted />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.alt || item.caption || "Gallery"}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.caption || "Untitled"}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted">{item.url}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => deleteGallery(item.id)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
