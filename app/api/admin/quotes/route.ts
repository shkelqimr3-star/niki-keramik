import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const quotes = await getPrisma().quoteRequest.findMany({
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ quotes });
}
