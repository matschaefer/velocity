import Image from "next/image";
import { BadgeCheck, Clock, ShieldCheck } from "lucide-react";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Über Velocity</p>
              <h1 className="mt-4 font-display text-7xl leading-none">Sportwagenvermietung mit Haltung.</h1>
              <p className="mt-6 max-w-xl text-muted">
                Velocityrent.de verbindet sorgfältig kuratierte Performance-Fahrzeuge mit persönlichem Service,
                transparenter Verfügbarkeit und einem Buchungsprozess, der sich hochwertig anfühlt.
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
              <Image src="/images/features_image.webp" alt="Velocity Service" fill className="object-cover" />
            </div>
          </div>

          <section className="grid gap-8 py-20 lg:grid-cols-[1fr_1fr]">
            <div className="relative min-h-[360px] overflow-hidden border border-border bg-surface">
              <Image src="/images/hero_background.webp" alt="Velocity Fahrzeug" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-semibold">Unsere Mission</h2>
              <p className="mt-5 text-muted">
                Wir machen Luxusmobilität planbar: klare Preise, reale Verfügbarkeit, geprüfte Fahrzeuge und
                direkte Kommunikation. Für besondere Wochenenden, Business-Termine oder den einen Moment, der hängen bleibt.
              </p>
              <div className="mt-8 grid gap-4">
                <Value icon={<BadgeCheck className="size-5" />} title="Geprüfte Fahrzeuge" />
                <Value icon={<Clock className="size-5" />} title="Flexible Übergaben in Düsseldorf und Mülheim" />
                <Value icon={<ShieldCheck className="size-5" />} title="Sichere Buchungsanfragen mit Admin-Prüfung" />
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Value({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="flex items-center gap-3 border-b border-border pb-4 text-sm font-semibold"><span className="text-primary">{icon}</span>{title}</div>;
}
