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

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await getPrisma().galleryProject.findMany({
    orderBy: [{ priority: "asc" }, { createdAt: "desc" }]
  });

  return NextResponse.json({ projects: projects.map(normalizeProject) });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  const imageUrl = image instanceof File ? await saveUpload(image, "gallery") : null;

  if (!imageUrl) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  const before = formData.get("beforeImage");
  const after = formData.get("afterImage");
  const beforeImageUrl = before instanceof File ? await saveUpload(before, "gallery") : null;
  const afterImageUrl = after instanceof File ? await saveUpload(after, "gallery") : null;

  const project = await getPrisma().galleryProject.create({
    data: {
      titleSq: text(formData, "titleSq"),
      titleSr: text(formData, "titleSr"),
      descriptionSq: text(formData, "descriptionSq"),
      descriptionSr: text(formData, "descriptionSr"),
      location: text(formData, "location") || null,
      projectDate: dateValue(formData, "projectDate"),
      category: categoryValue(formData),
      tags: tagsFromForm(formData.get("tags")),
      imageUrl,
      beforeImageUrl,
      afterImageUrl,
      featured: bool(formData, "featured"),
      showInHero: bool(formData, "showInHero"),
      heroOrder: intValue(formData, "heroOrder", 100),
      priority: intValue(formData, "priority", 100)
    }
  });

  return NextResponse.json({ project: normalizeProject(project) }, { status: 201 });
}
