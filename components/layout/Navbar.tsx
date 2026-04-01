import Link from "next/link";

import { amazonUrl, navItems } from "@/lib/site-data";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="site-header">
      <div className="shell navbar">
        <Link aria-label="Chore ClarIDy home" className="brand" href="#top">
          <span className="brand__chore">chore</span>
          <span className="brand__claridy">
            ClarIDy<span className="brand__mark">TM</span>
          </span>
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
