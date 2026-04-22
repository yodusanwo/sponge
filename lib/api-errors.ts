import { NextResponse } from "next/server";

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

type PrismaErrorLike = { code?: string; errorCode?: string; message?: string };

function isPrismaError(error: unknown): error is PrismaErrorLike {
  if (typeof error !== "object" || error === null) return false;
  return "code" in error || "errorCode" in error;
}

export function apiErrorResponse(error: unknown, context = "Request"): NextResponse {
  const message = error instanceof Error ? error.message : String(error);

  if (isPrismaError(error)) {
    console.error(`[${context}]`, error.code, message);
    return NextResponse.json(
      { error: "We're having trouble saving right now. Please try again in a few minutes." },
      { status: 503 }
    );
  }

  if (/blob|vercel|token|upload/i.test(message)) {
    console.error(`[${context}]`, message);
    return NextResponse.json(
      { error: "File upload is not configured or failed. Try pasting an image URL instead." },
      { status: 503 }
    );
  }

  console.error(`[${context}]`, message);
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}

export function requireBlobToken(hasUpload: boolean): NextResponse | null {
  if (!hasUpload) return null;
  if (process.env.BLOB_READ_WRITE_TOKEN) return null;
  console.error("[requireBlobToken] Set BLOB_READ_WRITE_TOKEN for uploads (Vercel Blob).");
  return NextResponse.json(
    { error: "File upload is not configured. Paste an image URL or ask your developer to add BLOB_READ_WRITE_TOKEN." },
    { status: 503 }
  );
}

export function validateFileSize(
  file: File | null,
  maxBytes: number,
  label: string
): string | null {
  if (!file || file.size <= 0) return null;
  if (file.size <= maxBytes) return null;
  const maxMB = Math.round(maxBytes / (1024 * 1024));
  return `${label} is too large (max ${maxMB} MB).`;
}
