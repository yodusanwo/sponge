"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import "../admin.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="admin-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "linear-gradient(145deg, #d4e2ee 0%, #f3ecf6 50%, #ffffff 100%)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 18px 40px rgba(25, 48, 74, 0.12)",
          padding: "2rem",
          width: "100%",
          maxWidth: "26rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
          <Image
            alt="Chore ClarIDy"
            className="object-contain"
            height={72}
            src="/Logo_TM 1.png"
            width={120}
          />
        </div>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, textAlign: "center", margin: "0 0 0.5rem" }}>
          Admin login
        </h1>
        <p style={{ textAlign: "center", color: "#5f6472", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          Sign in to edit site copy and images
        </p>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="username"
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="current-password"
              disabled={isLoading}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              value={password}
            />
          </div>

          {error ? (
            <div className="admin-banner admin-banner--error" style={{ marginTop: "0.5rem" }}>
              {error}
            </div>
          ) : null}

          <button
            className="admin-btn admin-btn--primary"
            disabled={isLoading}
            style={{ width: "100%", marginTop: "0.5rem" }}
            type="submit"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div style={{ marginTop: "1.25rem", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "0.9rem", color: "var(--blue-700, #2a6fad)" }}>
            ← Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
