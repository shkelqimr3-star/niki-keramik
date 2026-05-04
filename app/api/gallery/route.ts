import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { normalizeProject, sampleProjects } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getPrisma().galleryProject.findMany({
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }]
    });

    return NextResponse.json({
      projects: projects.length ? projects.map(normalizeProject) : sampleProjects,
      usingPlaceholders: projects.length === 0
    });
  } catch {
    return NextResponse.json({ projects: sampleProjects, usingPlaceholders: true });
  }
}
