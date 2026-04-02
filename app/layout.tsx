import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Chore ClarIDy",
  description: "A clickable product prototype for the Chore ClarIDy sponge system.",
  icons: {
    icon: "/ChloreID.svg",
    shortcut: "/ChloreID.svg",
    apple: "/ChloreID.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
