"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StarLogo } from "@/app/components/star-logo";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setSuccess(data.message || "Check your email for a 6-digit code.");
      const q = email.trim()
        ? `?email=${encodeURIComponent(email.trim().toLowerCase())}`
        : "";
      setTimeout(() => router.push(`/admin/reset-password${q}`), 1200);
    } catch {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12">
      <StarLogo size="sm" tone="on-light" className="mb-8" />
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
        Forgot password
      </h1>
      <p className="mt-2 text-[15px] text-muted">
        Enter your admin email and we’ll send a 6-digit code if it’s registered.
      </p>

      <form onSubmit={onSubmit} className="admin-panel mt-8 space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
        {error ? <p className="text-sm text-accent-red">{error}</p> : null}
        {success ? <p className="text-sm font-medium text-gold-dim">{success}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending…" : "Send code"}
        </Button>
        <p className="text-center text-xs text-muted">
          Already have a code?{" "}
          <Link href="/admin/reset-password" className="font-medium text-foreground hover:underline">
            Enter it here
          </Link>
        </p>
        <p className="text-center text-xs text-muted">
          <Link href="/admin/login" className="font-medium text-foreground hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
