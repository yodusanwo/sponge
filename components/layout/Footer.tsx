import Link from "next/link";

import { amazonUrl } from "@/lib/site-data";

const footerLinks = [
  { label: "The sponges", href: "#the-sponges" },
  { label: "Wholesale", href: "#who-its-for" },
  { label: "Contact", href: "mailto:hello@choreclaridy.com" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link aria-label="Chore ClarIDy home" className="brand brand--footer" href="#top">
            <span className="brand__chore">chore</span>
            <span className="brand__claridy">
              ClarIDy<span className="brand__mark">TM</span>
            </span>
          </Link>
        </div>

        <div className="footer-links">
          <Link className="footer-badge" href={amazonUrl} target="_blank" rel="noreferrer">
            Shop Amazon
          </Link>
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-socials" aria-label="Social links">
          <Link href="https://www.tiktok.com" rel="noreferrer" target="_blank">
            TikTok
          </Link>
          <Link href="https://www.instagram.com" rel="noreferrer" target="_blank">
            Instagram
          </Link>
        </div>
      </div>

      <div className="shell footer-credits">
        <p>© 2026 Chore ClarIDy. All rights reserved.</p>
      </div>
    </footer>
  );
}
