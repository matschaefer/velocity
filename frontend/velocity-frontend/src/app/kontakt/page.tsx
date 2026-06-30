import { Mail, MessageCircle, Phone } from "lucide-react";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Kontakt</p>
          <h1 className="mt-3 font-display text-7xl">Wir kümmern uns.</h1>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid gap-4">
              <ContactCard icon={<Phone className="size-6" />} title="Telefon" value="+49 211 8799 4200" />
              <ContactCard icon={<Mail className="size-6" />} title="E-Mail" value="booking@velocityrent.de" />
              <ContactCard icon={<MessageCircle className="size-6" />} title="WhatsApp" value="Direkt anfragen" />
            </div>
            <form className="grid gap-4 border border-border bg-surface p-6">
              <input placeholder="Name" className="border border-border bg-background p-4 outline-none focus:border-primary" />
              <input placeholder="E-Mail" className="border border-border bg-background p-4 outline-none focus:border-primary" />
              <textarea placeholder="Nachricht" rows={6} className="border border-border bg-background p-4 outline-none focus:border-primary" />
              <button className="bg-primary px-5 py-4 font-semibold text-primary-foreground">Nachricht senden</button>
            </form>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="border border-border bg-surface p-5">
      <span className="text-primary">{icon}</span>
      <p className="mt-4 text-sm text-muted">{title}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
