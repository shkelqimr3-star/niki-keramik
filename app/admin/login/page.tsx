import { redirect } from "next/navigation";
import { AdminLoginFrame } from "@/components/AdminLogin";
import { isAdminAuthed } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) {
    redirect("/admin");
  }

  return <AdminLoginFrame />;
}
