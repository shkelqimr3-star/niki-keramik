import { mkdir, writeFile } from "fs/promises";
import path from "path";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function saveUpload(file: File, folder: "quotes" | "gallery") {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const directory = path.join(uploadRoot, folder);
  await mkdir(directory, { recursive: true });
  const fileName = `${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name || "upload.jpg")}`;
  const destination = path.join(directory, fileName);

  // Storage adapter boundary: replace this local write with Vercel Blob,
  // Cloudinary, Supabase Storage, or S3 without changing the API contracts.
  await writeFile(destination, bytes);

  return `/uploads/${folder}/${fileName}`;
}

export function tagsFromForm(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
