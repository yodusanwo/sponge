import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";

import {
  apiErrorResponse,
  MAX_IMAGE_BYTES,
  requireBlobToken,
  validateFileSize,
} from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";

const DEFAULT_ID = "default";

async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "Please log in to the admin area first." }, { status: 401 });
  }
  return null;
}

const str = (v: FormDataEntryValue | null) => (v == null ? "" : String(v).trim());

/** GET — public: saved row (same values the site uses when merged with defaults) */
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ configured: false, row: null });
  }
  try {
    const row = await prisma.siteContent.findUnique({ where: { id: DEFAULT_ID } });
    return NextResponse.json({ configured: true, row });
  } catch (e) {
    console.error("[GET /api/site-content]", e);
    return NextResponse.json({ configured: false, row: null });
  }
}

/** PUT — admin only: multipart form (text fields + optional image uploads) */
export async function PUT(request: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "Database not configured (DATABASE_URL)." }, { status: 503 });
  }

  try {
    const formData = await request.formData();
    const clearHero = str(formData.get("clearHeroImage")) === "true";
    const clearOg = str(formData.get("clearOgImage")) === "true";
    const heroFile = formData.get("heroFile") as File | null;
    const ogFile = formData.get("ogFile") as File | null;

    let heroImageUrl: string | null = clearHero ? null : str(formData.get("heroImageUrlExisting")) || null;
    let ogImageUrl: string | null = clearOg ? null : str(formData.get("ogImageUrlExisting")) || null;

    const siteName = str(formData.get("siteName")) || null;
    const siteDescription = str(formData.get("siteDescription")) || null;
    const amazonUrl = str(formData.get("amazonUrl")) || null;
    const contactEmail = str(formData.get("contactEmail")) || null;
    const heroTitle = str(formData.get("heroTitle")) || null;
    const heroLead = str(formData.get("heroLead")) || null;

    const hasUpload = (heroFile?.size ?? 0) > 0 || (ogFile?.size ?? 0) > 0;
    const blobErr = requireBlobToken(hasUpload);
    if (blobErr) return blobErr;

    const e1 = validateFileSize(heroFile, MAX_IMAGE_BYTES, "Hero image");
    const e2 = validateFileSize(ogFile, MAX_IMAGE_BYTES, "Social preview image");
    if (e1) return NextResponse.json({ error: e1 }, { status: 413 });
    if (e2) return NextResponse.json({ error: e2 }, { status: 413 });

    if (!clearHero && heroFile && heroFile.size > 0) {
      const blob = await put(`site/${Date.now()}-${heroFile.name}`, heroFile, { access: "public" });
      heroImageUrl = blob.url;
    }
    if (!clearOg && ogFile && ogFile.size > 0) {
      const blob = await put(`site/${Date.now()}-${ogFile.name}`, ogFile, { access: "public" });
      ogImageUrl = blob.url;
    }

    const updated = await prisma.siteContent.upsert({
      where: { id: DEFAULT_ID },
      create: {
        id: DEFAULT_ID,
        siteName,
        siteDescription,
        amazonUrl,
        contactEmail,
        heroTitle,
        heroLead,
        heroImageUrl,
        ogImageUrl,
      },
      update: {
        siteName,
        siteDescription,
        amazonUrl,
        contactEmail,
        heroTitle,
        heroLead,
        heroImageUrl,
        ogImageUrl,
      },
    });

    return NextResponse.json({ ok: true, row: updated });
  } catch (error) {
    return apiErrorResponse(error, "PUT /api/site-content");
  }
}
