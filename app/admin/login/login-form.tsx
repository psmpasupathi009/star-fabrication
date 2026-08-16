"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { StarLogo } from "@/app/components/star-logo";
import { isSafeAdminCallback } from "@/lib/security";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { error?: string; user?: { role: string } };
      if (!res.ok || !data.user) {
        setError(data.error || "Invalid email or password");
        return;
      }
      const callback = searchParams.get("callbackUrl");
      const target = isSafeAdminCallback(callback) ? callback! : "/admin/dashboard";
      router.replace(target);
      router.refresh();
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-10 sm:px-6 sm:py-12">
      <StarLogo size="sm" tone="on-light" className="mb-6 sm:mb-8" />
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
        Admin login
      </h1>
      <p className="mt-2 text-[14px] text-muted sm:text-[15px]">
        Sign in with your admin email to manage the website.
      </p>

      <form onSubmit={onSubmit} className="admin-panel mt-6 space-y-4 sm:mt-8">
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
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>
            <a
              href="/admin/forgot-password"
              className="text-xs font-medium text-muted hover:text-foreground"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? <p className="text-sm text-accent-red">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
