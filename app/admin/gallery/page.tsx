import { redirect } from "next/navigation";
import { AdminGalleryFrame } from "@/components/AdminGalleryManager";
import { isAdminAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  return <AdminGalleryFrame />;
}
