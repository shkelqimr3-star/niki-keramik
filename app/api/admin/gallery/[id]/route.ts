import { NextResponse } from "next/server";
import { editableCategoryKeys } from "@/lib/content";
import { isAdminAuthed } from "@/lib/auth";
import { normalizeProject } from "@/lib/gallery";
import { getPrisma } from "@/lib/prisma";
import { saveUpload, tagsFromForm } from "@/lib/storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function bool(formData: FormData, key: string) {
  return text(formData, key) === "true" || text(formData, key) === "on";
}

function intValue(formData: FormData, key: string, fallback: number) {
  const parsed = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function dateValue(formData: FormData, key: string) {
  const value = text(formData, key);
  return value ? new Date(value) : null;
}

function categoryValue(formData: FormData) {
  const category = text(formData, "category");
  return editableCategoryKeys.includes(category as never) ? category : "OTHER";
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await request.formData();
  const image = formData.get("image");
  const before = formData.get("beforeImage");
  const after = formData.get("afterImage");
  const imageUrl = image instanceof File && image.size > 0 ? await saveUpload(image, "gallery") : null;
  const beforeImageUrl = before instanceof File && before.size > 0 ? await saveUpload(before, "gallery") : undefined;
  const afterImageUrl = after instanceof File && after.size > 0 ? await saveUpload(after, "gallery") : undefined;

  const project = await getPrisma().galleryProject.update({
    where: { id },
    data: {
      titleSq: text(formData, "titleSq"),
      titleSr: text(formData, "titleSr"),
      descriptionSq: text(formData, "descriptionSq"),
      descriptionSr: text(formData, "descriptionSr"),
      location: text(formData, "location") || null,
      projectDate: dateValue(formData, "projectDate"),
      category: categoryValue(formData),
      tags: tagsFromForm(formData.get("tags")),
      ...(imageUrl ? { imageUrl } : {}),
      ...(beforeImageUrl !== undefined ? { beforeImageUrl } : {}),
      ...(afterImageUrl !== undefined ? { afterImageUrl } : {}),
      featured: bool(formData, "featured"),
      showInHero: bool(formData, "showInHero"),
      heroOrder: intValue(formData, "heroOrder", 100),
      priority: intValue(formData, "priority", 100)
    }
  });

  return NextResponse.json({ project: normalizeProject(project) });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await getPrisma().galleryProject.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
