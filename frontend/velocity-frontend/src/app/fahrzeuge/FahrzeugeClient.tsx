"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { apiFetch, CarListItem } from "@/lib/api";
import { formatDateTime, formatEuro } from "@/lib/booking";

type Props = {
  location?: string;
  pickupAt?: string;
  dropoffAt?: string;
};

export default function FahrzeugeClient({ location, pickupAt, dropoffAt }: Props) {
  const queryKey = `${location ?? ""}|${pickupAt ?? ""}|${dropoffAt ?? ""}`;
  const [result, setResult] = useState<{
    key: string;
    cars: CarListItem[];
    error: string;
  }>({ key: "", cars: [], error: "" });
  const hasDates = Boolean(pickupAt && dropoffAt);

  useEffect(() => {
    apiFetch<CarListItem[]>("/api/cars", {
      query: { location, pickupAt, dropoffAt },
    })
      .then((cars) => setResult({ key: queryKey, cars, error: "" }))
      .catch((err: Error) => setResult({ key: queryKey, cars: [], error: err.message }));
  }, [location, pickupAt, dropoffAt, queryKey]);

  const availableCars = useMemo(
    () => result.cars.filter((car) => !hasDates || car.isAvailable),
    [result.cars, hasDates]
  );
  const isLoading = result.key !== queryKey;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28">
        <Container>
          <div className="flex flex-col gap-4 border-b border-border pb-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary">
              Verfügbare Fahrzeuge
            </p>
            <h1 className="font-display text-5xl leading-none sm:text-7xl">
              Deine Auswahl
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-muted">
              {location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  {location}
                </span>
              )}
              {pickupAt && dropoffAt && (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatDateTime(pickupAt)} bis {formatDateTime(dropoffAt)}
                </span>
              )}
            </div>
          </div>

          {isLoading && <p className="py-16 text-muted">Fahrzeuge werden geladen...</p>}
          {result.error && <p className="py-16 text-red-400">{result.error}</p>}

          {!isLoading && !result.error && (
            <div className="grid gap-5 py-10 md:grid-cols-2 xl:grid-cols-3">
              {availableCars.map((car) => (
                <Link
                  key={car.id}
                  href={{
                    pathname: `/fahrzeuge/${car.slug}`,
                    query: { location, pickupAt, dropoffAt },
                  }}
                  className="group overflow-hidden border border-border bg-surface transition hover:-translate-y-1 hover:border-primary/60"
                >
                  <div className="relative aspect-[16/10] bg-black">
                    <Image
                      src={car.imageUrl}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {car.badge && (
                      <span className="absolute left-4 top-4 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                        {car.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                        {car.brand}
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold">{car.model}</h2>
                      <p className="mt-2 text-sm text-muted">{car.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-semibold">{formatEuro(car.pricePerDay)}</p>
                      <p className="text-sm text-muted">pro Tag</p>
                      <ArrowRight className="ml-auto mt-4 size-5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
