"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DEFAULT_HERO_LEAD,
  DEFAULT_HERO_TITLE,
} from "@/lib/site-content";
import {
  amazonUrl as defaultAmazon,
  contactEmail as defaultEmail,
  siteDescription as defaultDescription,
  siteName as defaultSiteName,
} from "@/lib/site-data";

import "./admin.css";

type Row = {
  siteName: string | null;
  siteDescription: string | null;
  amazonUrl: string | null;
  contactEmail: string | null;
  heroTitle: string | null;
  heroLead: string | null;
  heroImageUrl: string | null;
  ogImageUrl: string | null;
};

export default function AdminSiteEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [dbConfigured, setDbConfigured] = useState(true);

  const [siteName, setSiteName] = useState(defaultSiteName);
  const [siteDescription, setSiteDescription] = useState(defaultDescription);
  const [amazonUrl, setAmazonUrl] = useState(defaultAmazon);
  const [contactEmail, setContactEmailState] = useState(defaultEmail);
  const [heroTitle, setHeroTitle] = useState(DEFAULT_HERO_TITLE);
  const [heroLead, setHeroLead] = useState(DEFAULT_HERO_LEAD);
  const [heroExisting, setHeroExisting] = useState<string | null>(null);
  const [ogExisting, setOgExisting] = useState<string | null>(null);
  const [clearHeroFlag, setClearHeroFlag] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-content");
        const data = await res.json();
        if (cancelled) return;
        setDbConfigured(data.configured !== false);
        const row = data.row as Row | null;
        if (row) {
          setSiteName(row.siteName ?? defaultSiteName);
          setSiteDescription(row.siteDescription ?? defaultDescription);
          setAmazonUrl(row.amazonUrl ?? defaultAmazon);
          setContactEmailState(row.contactEmail ?? defaultEmail);
          setHeroTitle(row.heroTitle ?? DEFAULT_HERO_TITLE);
          setHeroLead(row.heroLead ?? DEFAULT_HERO_LEAD);
          setHeroExisting(row.heroImageUrl);
          setOgExisting(row.ogImageUrl);
        }
      } catch {
        setError("Could not load saved content.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("siteName", siteName);
    fd.set("siteDescription", siteDescription);
    fd.set("amazonUrl", amazonUrl);
    fd.set("contactEmail", contactEmail);
    fd.set("heroTitle", heroTitle);
    fd.set("heroLead", heroLead);
    fd.set("heroImageUrlExisting", clearHeroFlag ? "" : (heroExisting ?? ""));
    fd.set("ogImageUrlExisting", ogExisting ?? "");
    if (clearHeroFlag) {
      fd.set("clearHeroImage", "true");
    }
    const heroInput = form.querySelector<HTMLInputElement>('input[name="heroFile"]');
    const hasNewHeroFile = heroInput?.files?.[0] && heroInput.files[0].size > 0;
    if (hasNewHeroFile) {
      fd.delete("clearHeroImage");
    }

    try {
      const res = await fetch("/api/site-content", { method: "PUT", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Save failed.");
      }
      setMessage("Saved. The public site will show these updates on the next visit.");
      setClearHeroFlag(false);
      if (data.row) {
        setHeroExisting(data.row.heroImageUrl ?? null);
        setOgExisting(data.row.ogImageUrl ?? null);
      }
      form.querySelectorAll('input[type="file"]').forEach((el) => {
        (el as HTMLInputElement).value = "";
      });
      setTimeout(() => setMessage(""), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-page__header">
        <div className="admin-page__header-inner">
          <div>
            <h1 className="admin-page__title">Site content</h1>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.9rem", color: "#5f6472" }}>
              Update copy and images for the marketing site.
            </p>
          </div>
          <div className="admin-page__actions">
            <Link className="admin-btn admin-btn--ghost" href="/">
              View site
            </Link>
            <button className="admin-btn admin-btn--ghost" type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="admin-page__main">
        {!dbConfigured ? (
          <div className="admin-banner admin-banner--warn" style={{ marginBottom: "1rem" }}>
            <strong>Database not connected.</strong> Set <code>DATABASE_URL</code> in{" "}
            <code>.env.local</code> and run <code>npx prisma migrate deploy</code>. Until then, the
            public site uses built-in defaults only.
          </div>
        ) : null}

        {error ? (
          <div className="admin-banner admin-banner--error" style={{ marginBottom: "1rem" }}>
            {error}
          </div>
        ) : null}
        {message ? (
          <div className="admin-banner admin-banner--ok" style={{ marginBottom: "1rem" }}>
            {message}
          </div>
        ) : null}

        <form className="admin-form" onSubmit={handleSubmit}>
          <h2 className="admin-section-title">Company &amp; SEO</h2>
          <div className="admin-field">
            <label htmlFor="siteName">Site name</label>
            <input
              id="siteName"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="admin-field admin-field--wide">
            <label htmlFor="siteDescription">Short description (meta / sharing)</label>
            <textarea
              id="siteDescription"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="amazonUrl">Amazon product URL</label>
            <input
              id="amazonUrl"
              value={amazonUrl}
              onChange={(e) => setAmazonUrl(e.target.value)}
              type="url"
            />
          </div>
          <div className="admin-field">
            <label htmlFor="contactEmail">Contact email</label>
            <input
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmailState(e.target.value)}
              type="email"
            />
          </div>

          <h2 className="admin-section-title">Hero</h2>
          <div className="admin-field">
            <label htmlFor="heroTitle">Hero headline</label>
            <input id="heroTitle" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
          </div>
          <div className="admin-field admin-field--wide">
            <label htmlFor="heroLead">Hero supporting text</label>
            <textarea id="heroLead" value={heroLead} onChange={(e) => setHeroLead(e.target.value)} />
          </div>

          <div className="admin-field">
            <label htmlFor="heroFile">Hero background image</label>
            <input id="heroFile" name="heroFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
            <p style={{ fontSize: "0.8rem", color: "#5f6472", margin: "0.35rem 0 0" }}>
              Optional. Upload replaces the default optimized hero. Max 10 MB. Requires{" "}
              <code>BLOB_READ_WRITE_TOKEN</code> on Vercel.
            </p>
            {heroExisting ? (
              <div className="admin-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroExisting} alt="" />
              </div>
            ) : (
              <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Using bundled default hero image from the codebase.
              </p>
            )}
            {heroExisting ? (
              <button
                className="admin-btn admin-btn--muted"
                type="button"
                onClick={() => {
                  setClearHeroFlag(true);
                  setHeroExisting(null);
                }}
              >
                Mark to use default hero on next Save
              </button>
            ) : null}
          </div>

          <div className="admin-field">
            <label htmlFor="ogFile">Social / OG preview image</label>
            <input id="ogFile" name="ogFile" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
            <p style={{ fontSize: "0.8rem", color: "#5f6472", margin: "0.35rem 0 0" }}>
              Optional. Used when sharing links (Open Graph / Twitter). Falls back to hero image or
              default.
            </p>
            {ogExisting ? (
              <div className="admin-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ogExisting} alt="" />
              </div>
            ) : null}
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button className="admin-btn admin-btn--primary" disabled={saving || !dbConfigured} type="submit">
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
