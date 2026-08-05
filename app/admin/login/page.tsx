import { Suspense } from "react";
import AdminLoginPage from "./login-form";

export default function AdminLoginRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center text-muted">Loading…</div>
      }
    >
      <AdminLoginPage />
    </Suspense>
  );
}
