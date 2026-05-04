import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/storage";

export const runtime = "nodejs";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = clean(formData.get("name"));
    const phone = clean(formData.get("phone"));
    const location = clean(formData.get("location"));
    const workType = clean(formData.get("workType"));
    const description = clean(formData.get("description"));

    if (!name || !phone || !location || !workType || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const photoUrls: string[] = [];
    const photos = formData.getAll("photos").filter((item): item is File => item instanceof File && item.size > 0);

    for (const photo of photos.slice(0, 6)) {
      const url = await saveUpload(photo, "quotes");
      if (url) {
        photoUrls.push(url);
      }
    }

    const desiredDateValue = clean(formData.get("desiredDate"));
    const quote = await getPrisma().quoteRequest.create({
      data: {
        name,
        phone,
        whatsapp: clean(formData.get("whatsapp")) || null,
        location,
        workType,
        squareMeters: clean(formData.get("squareMeters")) || null,
        desiredDate: desiredDateValue ? new Date(desiredDateValue) : null,
        materialStatus: clean(formData.get("materialStatus")) || null,
        description,
        photoUrls
      }
    });

    return NextResponse.json({ id: quote.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Quote request failed" }, { status: 500 });
  }
}
