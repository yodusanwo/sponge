import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminCredentialsString = process.env.ADMIN_CREDENTIALS;
    const legacyEmail = process.env.ADMIN_EMAIL;
    const legacyPassword = process.env.ADMIN_PASSWORD;

    let isAuthenticated = false;

    if (adminCredentialsString) {
      const adminCredentials = adminCredentialsString.split(";").map((cred) => {
        const [credEmail, credPassword] = cred.split(":");
        return { email: credEmail?.trim(), password: credPassword?.trim() };
      });

      isAuthenticated = adminCredentials.some(
        (admin) => admin.email === email && admin.password === password
      );
    }

    if (!isAuthenticated && legacyEmail && legacyPassword) {
      isAuthenticated = email === legacyEmail && password === legacyPassword;
    }

    if (!adminCredentialsString && !legacyEmail) {
      return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
    }

    if (isAuthenticated) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 });
  }
}
