import Link from "next/link";

import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-screen place-items-center bg-background pt-24">
        <Container>
          <div className="max-w-2xl border border-border bg-surface p-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary">404</p>
            <h1 className="mt-3 font-display text-7xl">Route verpasst.</h1>
            <p className="mt-4 text-muted">Diese Seite existiert nicht oder wurde verschoben.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="bg-primary px-5 py-3 font-semibold text-primary-foreground">Zur Startseite</Link>
              <Link href="/fahrzeuge" className="border border-border px-5 py-3 font-semibold">Fahrzeuge ansehen</Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
