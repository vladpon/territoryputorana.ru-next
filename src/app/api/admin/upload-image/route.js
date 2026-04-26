import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import sharp from "sharp";

import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp"
]);

const MIME_TO_EXTENSION = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

function sanitizeSegment(value, fallback = "default") {
  if (typeof value !== "string") return fallback;

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || fallback;
}

export async function POST(request) {
  try {
    await requireAdmin();

    const formData = await request.formData();

    const file = formData.get("file");
    const tourId = sanitizeSegment(formData.get("tourId"), "unknown-tour");
    const kind = sanitizeSegment(formData.get("kind"), "general");
    const alt = typeof formData.get("alt") === "string" ? formData.get("alt") : "";

    if (!(file instanceof File)) {
      return Response.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return Response.json(
        { error: "Разрешены только JPG, PNG и WebP" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { error: "Файл слишком большой. Максимум 10 MB" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    const outputBuffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: 1920,
        withoutEnlargement: true,
        fit: "inside"
      })
      .webp({ quality: 80 })
      .toBuffer();

    const metadata = await sharp(outputBuffer).metadata();

    const fileName = `${kind}-${Date.now()}-${randomUUID()}.webp`;

    const diskDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "tours",
      tourId,
      kind
    );

    await mkdir(diskDir, { recursive: true });

    const diskPath = path.join(diskDir, fileName);
    await writeFile(diskPath, outputBuffer);

    const src = `/uploads/tours/${tourId}/${kind}/${fileName}`;

    return Response.json({
      src,
      alt,
      width: metadata.width || null,
      height: metadata.height || null,
      originalName: file.name,
      originalMimeType: file.type,
      originalExtension: MIME_TO_EXTENSION[file.type] || ""
    });
  } catch (error) {
    console.error(error);

    const message =
      error?.message === "Unauthorized"
        ? "Unauthorized"
        : "Не удалось загрузить изображение";

    const status = error?.message === "Unauthorized" ? 401 : 500;

    return Response.json({ error: message }, { status });
  }
}