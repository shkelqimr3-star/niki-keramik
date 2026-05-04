import { redirect } from "next/navigation";
import { AdminDashboardFrame } from "@/components/AdminDashboard";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return <AdminDashboardFrame />;
}
