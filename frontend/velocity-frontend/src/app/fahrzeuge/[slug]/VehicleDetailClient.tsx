"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Gauge, MessageCircle, ShieldCheck, Users } from "lucide-react";

import { DateTimePicker } from "@/components/booking/VelocityBookingControls";
import { useAuth } from "@/components/auth/AuthProvider";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { apiFetch, Availability, CarDetail } from "@/lib/api";
import { formatDateTime, formatEuro, toIsoDateTime } from "@/lib/booking";

type Props = { slug: string; location?: string; pickupAt?: string; dropoffAt?: string };

export default function VehicleDetailClient({ slug, location, pickupAt, dropoffAt }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const initialPickup = pickupAt ? new Date(pickupAt) : null;
  const initialDropoff = dropoffAt ? new Date(dropoffAt) : null;
  const [car, setCar] = useState<CarDetail | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pickupDate, setPickupDate] = useState(() => initialPickup?.toISOString().slice(0, 10) ?? "");
  const [pickupTime, setPickupTime] = useState(() => initialPickup?.toTimeString().slice(0, 5) ?? "09:30");
  const [dropoffDate, setDropoffDate] = useState(() => initialDropoff?.toISOString().slice(0, 10) ?? "");
  const [dropoffTime, setDropoffTime] = useState(() => initialDropoff?.toTimeString().slice(0, 5) ?? "09:30");

  useEffect(() => {
    apiFetch<CarDetail>(`/api/cars/${slug}`).then(setCar).catch((err: Error) => setError(err.message));
  }, [slug]);

  const selectedPickupAt = useMemo(() => toIsoDateTime(pickupDate, pickupTime), [pickupDate, pickupTime]);
  const selectedDropoffAt = useMemo(() => toIsoDateTime(dropoffDate, dropoffTime), [dropoffDate, dropoffTime]);
  const images = car?.imageUrls?.length ? car.imageUrls : car ? [car.imageUrl] : [];

  useEffect(() => {
    if (!car || !selectedPickupAt || !selectedDropoffAt) return;
    apiFetch<Availability>(`/api/cars/${car.id}/availability`, {
      query: { pickupAt: selectedPickupAt, dropoffAt: selectedDropoffAt },
    }).then(setAvailability).catch((err: Error) => setError(err.message));
  }, [car, selectedPickupAt, selectedDropoffAt]);

  const returnUrl = `${pathname}?${searchParams.toString()}`;
  const whatsappUrl = useMemo(() => {
    if (!car) return "#";
    const text = [
      `Hallo Velocity, ich möchte den ${car.brand} ${car.model} anfragen.`,
      selectedPickupAt && `Abholung: ${formatDateTime(selectedPickupAt)}`,
      selectedDropoffAt && `Rückgabe: ${formatDateTime(selectedDropoffAt)}`,
      location && `Standort: ${location}`,
    ].filter(Boolean).join("\n");
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }, [car, selectedPickupAt, selectedDropoffAt, location]);

  const createBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    if (!car) return;
    if (!user) {
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return;
    }
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          carId: car.id,
          pickupAt: selectedPickupAt,
          dropoffAt: selectedDropoffAt,
          pickupLocation: location || car.location,
          dropoffLocation: location || car.location,
        }),
      });
      router.push("/zahlung");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Die Buchung konnte nicht erstellt werden.");
    }
  };

  if (error && !car) return <p className="p-10 text-red-400">{error}</p>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 text-foreground">
        {car && (
          <Container className="py-8">
            <div className="mb-8 text-sm">
              <Link href="/fahrzeuge" className="text-muted hover:text-primary">Fahrzeuge</Link>
              <span className="mx-2 text-muted/50">/</span>
              <span className="font-semibold">{car.brand} {car.model}</span>
            </div>
            <section className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
                  <Image src={images[activeImage] ?? car.imageUrl} alt={`${car.brand} ${car.model}`} fill priority className="object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/80 to-transparent p-5">
                    <span className="border border-white/20 bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur">{activeImage + 1} / {images.length}</span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button type="button" key={`${image}-${index}`} onClick={() => setActiveImage(index)} className={`relative aspect-[16/9] overflow-hidden border bg-surface ${activeImage === index ? "border-primary" : "border-border"}`}>
                      <Image src={image} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary">{car.brand}</p>
                <h1 className="mt-2 font-display text-6xl leading-none">{car.model}</h1>
                <p className="mt-3 text-xl text-muted">{car.year}, {car.transmission}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <Check className="size-4" />
                    {availability?.isAvailable === false ? "Nicht verfügbar" : "Verfügbar"}
                  </span>
                  <span className="border border-border bg-surface px-3 py-1 text-sm font-semibold">Kaution {formatEuro(car.deposit)}</span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <Spec icon={<Gauge className="size-5" />} label="Leistung" value={`${car.horsePower} PS`} />
                  <Spec icon={<Users className="size-5" />} label="Sitze" value={`${car.seats}`} />
                  <Spec icon={<ShieldCheck className="size-5" />} label="Alter" value={`${car.minimumAge}+`} />
                </div>
                <form onSubmit={createBooking} className="mt-7 border border-border bg-surface p-6 shadow-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-4xl font-semibold">{formatEuro(car.pricePerDay)}</p><p className="text-muted">pro Tag</p></div>
                    <span className="bg-background px-3 py-2 text-sm font-semibold text-muted">Mindestmietdauer: 1 Tag</span>
                  </div>
                  <div className="mt-6 grid gap-3">
                    <DateTimePicker pickerId="vehicle-pickup" label="Abholung" date={pickupDate} time={pickupTime} onDateChange={setPickupDate} onTimeChange={setPickupTime} relatedDates={[dropoffDate]} openPicker={openPicker} setOpenPicker={setOpenPicker} />
                    <DateTimePicker pickerId="vehicle-dropoff" label="Rückgabe" date={dropoffDate} time={dropoffTime} onDateChange={setDropoffDate} onTimeChange={setDropoffTime} relatedDates={[pickupDate]} openPicker={openPicker} setOpenPicker={setOpenPicker} />
                  </div>
                  {availability && (
                    <div className="mt-6 bg-background p-5">
                      <div className="flex justify-between text-sm text-muted"><span>Mietdauer</span><strong className="text-foreground">{availability.rentalDays} Tag(e)</strong></div>
                      <div className="mt-3 flex justify-between text-sm text-muted"><span>Preis</span><strong className="text-foreground">{formatEuro(availability.totalPrice)}</strong></div>
                      <div className="mt-4 flex justify-between border-t border-border pt-4 text-xl font-semibold"><span>Total</span><span>{formatEuro(availability.totalPrice)}</span></div>
                    </div>
                  )}
                  <button type="submit" disabled={!availability?.isAvailable} className="mt-6 w-full bg-primary px-5 py-4 font-black text-primary-foreground transition hover:brightness-95 disabled:opacity-40">{user ? "Anfrage erstellen" : "Anmelden und buchen"}</button>
                  <Link href={whatsappUrl} target="_blank" className="mt-3 flex w-full items-center justify-center gap-2 border border-border px-5 py-4 text-sm font-bold transition hover:border-primary/60"><MessageCircle className="size-4 text-primary" />Per WhatsApp anfragen</Link>
                  {message && <p className="mt-4 text-sm font-semibold text-primary">{message}</p>}
                  {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                </form>
                <div className="mt-6 border border-border bg-surface p-5"><h2 className="font-semibold">Fahrzeugdetails</h2><p className="mt-2 text-muted">{car.description}</p></div>
              </div>
            </section>
          </Container>
        )}
      </main>
      <Footer />
    </>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="border border-border bg-surface p-4"><span className="text-primary">{icon}</span><p className="mt-3 text-xs font-bold uppercase text-muted">{label}</p><p className="mt-1 font-semibold">{value}</p></div>;
}
