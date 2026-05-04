import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import { allStatuses } from "@/lib/content";
import { getPrisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const allowedStatuses = new Set<string>(allStatuses);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as {
    status?: string;
    notes?: string;
  };

  if (body.status && !allowedStatuses.has(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const quote = await getPrisma().quoteRequest.update({
    where: { id },
    data: {
      status: body.status,
      notes: typeof body.notes === "string" ? body.notes : undefined
    }
  });

  return NextResponse.json({ quote });
}
