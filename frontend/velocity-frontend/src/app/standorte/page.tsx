import { MapPin, Navigation, Phone } from "lucide-react";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const locations = [
  {
    name: "Düsseldorf",
    address: "Königsallee 27, 40212 Düsseldorf",
    phone: "+49 211 8799 4200",
    detail: "City, Messe und Flughafen Düsseldorf.",
  },
  {
    name: "Mülheim",
    address: "Ruhrorter Straße 21, 45478 Mülheim an der Ruhr",
    phone: "+49 208 3099 1800",
    detail: "Perfekt für Ruhrgebiet, Essen, Duisburg und Umgebung.",
  },
];

export default function StandortePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Standorte</p>
          <h1 className="mt-3 font-display text-7xl">Düsseldorf & Mülheim</h1>
          <div className="mt-8 flex gap-8 border-b border-border text-sm font-bold uppercase">
            <span className="border-b-2 border-primary pb-3 text-primary">Locations</span>
            <span className="pb-3 text-muted">Übergabe</span>
            <span className="pb-3 text-muted">Service</span>
          </div>

          <div className="mt-8 grid gap-8">
            {locations.map((location) => (
              <article key={location.name} className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[1fr_420px]">
                <div className="grid gap-3 sm:grid-cols-[1fr_1fr]">
                  <div>
                    <h2 className="text-3xl font-semibold">Velocity {location.name}</h2>
                    <p className="mt-2 text-muted">{location.detail}</p>
                    <a href={`tel:${location.phone.replaceAll(" ", "")}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      <Phone className="size-4" />
                      {location.phone}
                    </a>
                  </div>
                  <div className="text-muted">
                    <p className="font-semibold text-foreground">Adresse</p>
                    <p className="mt-2">{location.address}</p>
                    <p className="mt-5 font-semibold text-foreground">Ausstattung</p>
                    <p className="mt-2">Diskrete Übergabe, Fahrzeugbriefing, flexible Rückgabe nach Absprache.</p>
                  </div>
                </div>
                <div className="relative min-h-[220px] overflow-hidden border border-border bg-surface">
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary">
                    <MapPin className="size-14" />
                  </div>
                  <a className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank">
                    <Navigation className="size-4" />
                    Route planen
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
