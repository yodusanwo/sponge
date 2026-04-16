import Image from "next/image";
import Link from "next/link";

import { FooterContactLinks } from "@/components/contact/FooterContactLinks";
import { amazonUrl } from "@/lib/site-data";

const footerLinks = [
  { label: "The sponges", href: "#the-sponges" },
  { label: "Wholesale", href: "#who-its-for" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <Link aria-label="Chore ClarIDy home" className="footer-logo" href="#top">
          <Image
            alt="Chore ClarIDy"
            className="footer-logo__image"
            height={114.5}
            src="/Logo_TM 1.png"
            width={192.493}
          />
        </Link>

        <div className="footer-links footer-links--center">
          <Link className="footer-badge" href={amazonUrl} target="_blank" rel="noreferrer">
            <Image
              alt="Available at Amazon"
              height={44.476}
              src="/app-store-badge-amazon 1.png"
              width={149.5}
            />
          </Link>
          <FooterContactLinks links={footerLinks} />
        </div>

        <div className="footer-socials footer-socials--right" aria-label="Social links">
          <Link href="https://www.tiktok.com/@choreclaridy" rel="noreferrer" target="_blank">
            <Image alt="TikTok" height={21} src="/TikTok.svg" width={18} />
          </Link>
          <Link href="https://www.instagram.com/@choreclaridy" rel="noreferrer" target="_blank">
            <Image alt="Instagram" height={24} src="/Instagram.svg" width={24} />
          </Link>
        </div>
      </div>

      <div className="shell footer-credits">
        <p>© 2026 Chore ClarIDy. All rights reserved.</p>
      </div>
    </footer>
  );
}
