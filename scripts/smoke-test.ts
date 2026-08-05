#!/usr/bin/env npx tsx
/**
 * Smoke tests for public + auth + proxy security.
 * Run: npx tsx scripts/smoke-test.ts
 * Requires: npm run dev on localhost:3000
 */
const BASE = process.env.SMOKE_BASE || "http://localhost:3000";

async function check(
  name: string,
  path: string,
  init?: RequestInit,
  expectStatus?: number | number[]
) {
  const expected = Array.isArray(expectStatus)
    ? expectStatus
    : [expectStatus ?? 200];
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  const ok = expected.includes(res.status);
  console.log(`${ok ? "PASS" : "FAIL"} ${name} → ${res.status} (want ${expected.join("|")})`);
  return { ok, res };
}

async function main() {
  let failed = 0;
  const assert = (r: { ok: boolean }) => {
    if (!r.ok) failed += 1;
  };

  assert(await check("Home", "/"));
  assert(await check("Login page", "/admin/login"));
  assert(await check("Dashboard redirect", "/admin/dashboard", undefined, [307, 302]));
  assert(await check("Admin hero blocked", "/api/admin/hero", undefined, 401));
  assert(
    await check("Upload blocked", "/api/upload/media", { method: "POST" }, 401)
  );
  assert(await check("Gallery public GET", "/api/gallery", undefined, [200]));
  assert(
    await check(
      "Contact form",
      "/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Smoke Test",
          phone: "9999999999",
          service: "Gate Works",
          message: "Automated smoke contact check",
        }),
      },
      [200, 429, 503]
    )
  );
  assert(
    await check(
      "Gallery POST blocked",
      "/api/gallery",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "https://evil.com/x.jpg" }),
      },
      401
    )
  );
  assert(
    await check(
      "Bad login",
      "/api/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "x@y.com", password: "wrong" }),
      },
      [401, 503, 500]
    )
  );

  const home = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(15000) });
  const html = await home.text();
  for (const needle of ["Star Fabrication", "Get a Quote", "Fabrication services"]) {
    const ok = html.includes(needle);
    console.log(`${ok ? "PASS" : "FAIL"} Home contains "${needle}"`);
    if (!ok) failed += 1;
  }

  const headers = home.headers;
  for (const h of ["x-content-type-options", "x-frame-options", "referrer-policy"]) {
    const ok = Boolean(headers.get(h));
    console.log(`${ok ? "PASS" : "FAIL"} Header ${h}`);
    if (!ok) failed += 1;
  }

  console.log(failed ? `\n${failed} failure(s)` : "\nAll smoke checks passed");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
