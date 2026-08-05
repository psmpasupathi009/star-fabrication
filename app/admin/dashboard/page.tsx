import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";
import { AdminDashboardClient } from "@/app/admin/dashboard/dashboard-client";

export default async function AdminDashboardPage() {
  const session = await getServerSession();
  if (!session || session.role.toUpperCase() !== "ADMIN") {
    redirect("/admin/login?callbackUrl=/admin/dashboard");
  }

  return <AdminDashboardClient email={session.email} />;
}
