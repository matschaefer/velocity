import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";

import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";

export default function PaymentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Container>
          <div className="max-w-3xl border border-border bg-surface p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Zahlung</p>
            <h1 className="mt-3 font-display text-6xl">Buchung abschließen</h1>
            <p className="mt-4 text-muted">
              Online-Zahlung wird vorbereitet. Bis Stripe oder ein anderer Zahlungsanbieter aktiv ist,
              kannst du deine Anfrage verbindlich absenden und die Zahlung später mit Velocity klären.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-border bg-background p-5">
                <CreditCard className="size-6 text-primary" />
                <p className="mt-4 font-semibold">Online-Zahlung</p>
                <p className="mt-2 text-sm text-muted">Demnächst verfügbar.</p>
              </div>
              <div className="border border-border bg-background p-5">
                <ShieldCheck className="size-6 text-primary" />
                <p className="mt-4 font-semibold">Zahlung später</p>
                <p className="mt-2 text-sm text-muted">Bestätigung und Zahlungsdetails per E-Mail.</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/konto" className="bg-primary px-5 py-3 font-semibold text-primary-foreground">Zu meinen Buchungen</Link>
              <Link href="/kontakt" className="border border-border px-5 py-3 font-semibold">Kontakt aufnehmen</Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
