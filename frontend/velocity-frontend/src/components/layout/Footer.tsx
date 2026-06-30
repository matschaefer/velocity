import Image from "next/image";
import Link from "next/link";
import { Camera, Clapperboard, Globe } from "lucide-react";

import Container from "@/components/layout/Container";
import { navigation } from "@/constants/navigation";

const serviceLinks = [
  { label: "FAQ", href: "/#faq" },
  { label: "AGB", href: "/agb" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="grid gap-12 py-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">
          <div>
            <Link href="/" aria-label="Velocity - Startseite">
              <Image src="/images/velocity_logo.png" alt="Velocity" width={120} height={40} className="h-16 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted">
              Exklusive Fahrzeuge. Erstklassiger Service. Unvergessliche Erlebnisse.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { label: "Instagram", icon: Camera },
                { label: "Facebook", icon: Globe },
                { label: "YouTube", icon: Clapperboard },
              ].map(({ label, icon: Icon }) => (
                <Link key={label} href="/kontakt" aria-label={label} className="flex h-10 w-10 items-center justify-center border border-border text-muted transition-all duration-300 hover:border-primary hover:text-primary">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
          <FooterColumn title="Navigation" links={navigation} />
          <FooterColumn title="Service" links={serviceLinks} />
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Kontakt</h2>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li>+49 211 8799 4200</li>
              <li>booking@velocityrent.de</li>
              <li>24/7 für dich da</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted">
          © 2026 Velocity. Alle Rechte vorbehalten.
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">{title}</h2>
      <ul className="mt-6 space-y-3">
        {links.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-sm text-muted transition-colors hover:text-primary">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
