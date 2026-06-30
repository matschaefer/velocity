"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Mail, Phone, User } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import Container from "@/components/layout/Container";
import Navbar from "@/components/layout/Navbar";
import { apiFetch, Booking } from "@/lib/api";
import { formatDateTime, formatEuro } from "@/lib/booking";

type Tab = "buchungen" | "account" | "profil";

export default function KontoClient() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("buchungen");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!user) return;
    apiFetch<Booking[]>("/api/bookings/me").then(setBookings).catch(() => setBookings([]));
  }, [user]);

  if (!isLoading && !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32">
          <Container>
            <div className="max-w-xl border border-border bg-surface p-6">
              <h1 className="font-display text-5xl">Bitte anmelden</h1>
              <p className="mt-3 text-muted">Melde dich an, um dein Konto zu verwalten.</p>
              <Link className="mt-6 inline-flex bg-primary px-5 py-3 font-semibold text-primary-foreground" href="/login?returnUrl=/konto">
                Anmelden
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-28 text-foreground">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Mein Velocity</p>
          <h1 className="mt-2 font-display text-6xl">Account</h1>
          <p className="mt-3 max-w-2xl text-muted">Hier verwaltest du Buchungen, Kontaktdaten und dein Buchungsprofil.</p>

          <div className="mt-8 flex gap-6 border-b border-border text-sm font-bold uppercase">
            {[
              ["buchungen", "Buchungen"],
              ["account", "Account"],
              ["profil", "Profil"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key as Tab)}
                className={`pb-3 ${activeTab === key ? "border-b-2 border-primary text-primary" : "text-muted"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "buchungen" && (
            <section className="grid gap-3 py-8">
              {bookings.length === 0 && <div className="border border-border bg-surface p-5 text-muted">Du hast noch keine Buchungen.</div>}
              {bookings.map((booking) => (
                <article key={booking.id} className="border border-border bg-surface p-5">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <p className="font-semibold">{booking.carName}</p>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                        <CalendarDays className="size-4" />
                        {formatDateTime(booking.pickupAt)} bis {formatDateTime(booking.dropoffAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatEuro(booking.totalPrice)}</p>
                      <p className="text-sm text-muted">{booking.status}</p>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {activeTab === "account" && (
            <section className="grid max-w-2xl gap-5 py-8">
              <EditableField icon={<User className="size-5" />} label="Name" defaultValue={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`} />
              <EditableField icon={<CalendarDays className="size-5" />} label="Geburtsdatum" defaultValue="" placeholder="TT.MM.JJJJ" />
              <EditableField icon={<Mail className="size-5" />} label="E-Mail" defaultValue={user?.email ?? ""} />
              <EditableField icon={<Phone className="size-5" />} label="Telefonnummer" defaultValue={user?.phoneNumber || ""} placeholder="Telefonnummer hinzufügen" />
              <EditableField icon={<User className="size-5" />} label="Führerschein seit" defaultValue="" placeholder="Jahr eintragen" />
              <EditableField icon={<User className="size-5" />} label="Adresse" defaultValue="" placeholder="Straße, PLZ und Stadt" />
              <button className="mt-2 w-fit bg-primary px-6 py-3 font-semibold text-primary-foreground">Speichern</button>
            </section>
          )}

          {activeTab === "profil" && (
            <section className="grid max-w-2xl gap-4 py-8">
              <div className="border border-border bg-surface p-5">
                <p className="text-sm font-semibold">Buchungsprofil</p>
                <p className="mt-2 text-muted">Standardstandort: Düsseldorf</p>
                <p className="mt-1 text-muted">Fahrerprofil: 30+</p>
              </div>
            </section>
          )}
        </Container>
      </main>
    </>
  );
}

function EditableField({ icon, label, defaultValue, placeholder }: { icon: React.ReactNode; label: string; defaultValue: string; placeholder?: string }) {
  return (
    <label className="grid gap-2 border-b border-border pb-4">
      <span className="flex items-center gap-2 text-xs font-bold uppercase text-muted">{icon}{label}</span>
      <input defaultValue={defaultValue} placeholder={placeholder} className="bg-transparent text-xl font-semibold outline-none placeholder:text-muted/50" />
    </label>
  );
}
