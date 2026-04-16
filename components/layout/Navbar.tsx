import Image from "next/image";
import Link from "next/link";

import { amazonUrl, navItems } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="shell navbar">
        <Link
          aria-label="Chore ClarIDy home"
          className="brand brand--image"
          href="#top"
        >
          <Image
            alt="Chore ClarIDy"
            className="brand__logo"
            height={104}
            priority
            src="/Logo_TM 1.png"
            width={175}
          />
        </Link>

        <nav aria-label="Primary" className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <Button ctaLocation="nav_desktop" href={amazonUrl}>
            Buy on Amazon
          </Button>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Open navigation menu" className="mobile-menu__toggle">
            <span />
            <span />
            <span />
          </summary>
          <div className="mobile-menu__panel">
            <nav aria-label="Mobile navigation" className="mobile-menu__links">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Button ctaLocation="nav_mobile" href={amazonUrl}>
                Buy on Amazon
              </Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
