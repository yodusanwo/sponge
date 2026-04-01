import Image from "next/image";
import Link from "next/link";

import { amazonUrl, navItems } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="shell navbar">
        <Link aria-label="Chore ClarIDy home" className="brand brand--image" href="#top">
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
          <Button href={amazonUrl}>Buy on Amazon</Button>
        </div>
      </div>
    </header>
  );
}
