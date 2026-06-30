"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, CalendarClock, Car, FileText, LayoutDashboard, LogOut, Plus, Settings, Users } from "lucide-react";

import { useAuth } from "@/components/auth/AuthProvider";
import { apiFetch, Booking, CarBlock, CarDetail } from "@/lib/api";
import { formatDateTime, formatEuro } from "@/lib/booking";

type AdminView = "dashboard" | "cars" | "reservations" | "users" | "invoices" | "settings";

export default function AdminClient() {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const [view, setView] = useState<AdminView>("dashboard");
  const [cars, setCars] = useState<CarDetail[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocks, setBlocks] = useState<CarBlock[]>([]);
  const [selectedCarId, setSelectedCarId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedCar = cars.find((car) => car.id === selectedCarId) ?? cars[0];
  const totalRevenue = useMemo(() => bookings.reduce((sum, booking) => sum + booking.totalPrice, 0), [bookings]);
  const pendingBookings = bookings.filter((booking) => booking.status === "Anfrage");

  const load = () => {
    Promise.all([apiFetch<CarDetail[]>("/api/admin/cars"), apiFetch<Booking[]>("/api/admin/bookings")])
      .then(([carsResult, bookingsResult]) => {
        setCars(carsResult);
        setBookings(bookingsResult);
        setSelectedCarId((current) => current || carsResult[0]?.id || "");
      })
      .catch((err: Error) => setError(`${err.message} Bitte als Admin anmelden.`));
  };

  useEffect(load, []);

  useEffect(() => {
    if (!selectedCarId) return;
    apiFetch<CarBlock[]>(`/api/admin/cars/${selectedCarId}/blocks`).then(setBlocks).catch(() => setBlocks([]));
  }, [selectedCarId, message]);

  const createBlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");
    const form = new FormData(event.currentTarget);
    const carId = String(form.get("carId"));

    try {
      await apiFetch(`/api/admin/cars/${carId}/blocks`, {
        method: "POST",
        body: JSON.stringify({
          startAt: new Date(String(form.get("startAt"))).toISOString(),
          endAt: new Date(String(form.get("endAt"))).toISOString(),
          reason: Number(form.get("reason")),
          notes: form.get("notes"),
        }),
      });
      setMessage("Zeitraum wurde blockiert.");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Blockierung fehlgeschlagen.");
    }
  };

  const updateStatus = async (id: string, status: number) => {
    await apiFetch(`/api/admin/bookings/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    load();
  };

  const deleteBlock = async (carId: string, blockId: string) => {
    await apiFetch(`/api/admin/cars/${carId}/blocks/${blockId}`, { method: "DELETE" });
    setMessage("Blockierung wurde gelöscht.");
  };

  if (!isLoading && (!user || !isAdmin)) {
    return (
      <main className="grid min-h-screen place-items-center bg-background p-6">
        <div className="max-w-md border border-border bg-surface p-6">
          <h1 className="font-display text-5xl">Kein Zugriff</h1>
          <p className="mt-3 text-muted">Das Adminpanel ist nur für Admins sichtbar.</p>
          <Link className="mt-6 inline-flex bg-primary px-5 py-3 font-semibold text-primary-foreground" href="/login?returnUrl=/admin">Als Admin anmelden</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen bg-background text-foreground lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-border bg-surface lg:block">
        <div className="border-b border-border p-5">
          <Image src="/images/velocity_logo.png" alt="Velocity" width={130} height={42} className="h-14 w-auto" />
          <p className="mt-4 text-xs text-muted">{user?.email}</p>
        </div>
        <nav className="grid gap-1 p-4 text-sm">
          <AdminNav view="dashboard" active={view} setView={setView} icon={<LayoutDashboard className="size-4" />}>Dashboard</AdminNav>
          <AdminNav view="cars" active={view} setView={setView} icon={<Car className="size-4" />}>Cars</AdminNav>
          <AdminNav view="reservations" active={view} setView={setView} icon={<CalendarClock className="size-4" />}>Reservations</AdminNav>
          <AdminNav view="users" active={view} setView={setView} icon={<Users className="size-4" />}>Users</AdminNav>
          <AdminNav view="invoices" active={view} setView={setView} icon={<FileText className="size-4" />}>Invoices</AdminNav>
          <AdminNav view="settings" active={view} setView={setView} icon={<Settings className="size-4" />}>Settings</AdminNav>
        </nav>
        <button onClick={async () => { await logout(); window.location.href = "/"; }} className="ml-4 mt-10 flex items-center gap-2 text-sm text-red-400">
          <LogOut className="size-4" />
          Sign out
        </button>
      </aside>

      <section className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Velocity Admin / {view}</p>
            <h1 className="mt-1 font-display text-6xl">Admin Dashboard</h1>
          </div>
          <button onClick={() => setView("cars")} className="inline-flex items-center gap-2 bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
            <Plus className="size-4" />
            Fahrzeug hinzufügen
          </button>
        </div>

        {message && <p className="mt-5 border border-primary/30 bg-primary/10 p-3 text-sm font-semibold text-primary">{message}</p>}
        {error && <p className="mt-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

        {view === "dashboard" && (
          <div className="mt-6 grid gap-5">
            <div className="grid gap-4 md:grid-cols-3">
              <Kpi icon={<Car className="size-5" />} label="Fahrzeuge" value={cars.length.toString()} />
              <Kpi icon={<CalendarClock className="size-5" />} label="Offene Anfragen" value={pendingBookings.length.toString()} />
              <Kpi icon={<BarChart3 className="size-5" />} label="Umsatz" value={formatEuro(totalRevenue)} />
            </div>
            <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
              <CarPreview car={selectedCar} cars={cars} selectedCarId={selectedCarId} setSelectedCarId={setSelectedCarId} />
              <ReservationsTable bookings={bookings.slice(0, 5)} updateStatus={updateStatus} />
            </div>
          </div>
        )}

        {view === "cars" && (
          <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_420px]">
            <div className="grid gap-4 md:grid-cols-2">
              {cars.map((car) => (
                <article key={car.id} className="border border-border bg-surface p-4">
                  <div className="relative aspect-[16/9] bg-background">
                    <Image src={car.imageUrl} alt={`${car.brand} ${car.model}`} fill className="object-cover" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">{car.brand} {car.model}</h2>
                  <p className="mt-1 text-sm text-muted">{formatEuro(car.pricePerDay)} / Tag · {car.location}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-5">
              <CarPreview car={selectedCar} cars={cars} selectedCarId={selectedCarId} setSelectedCarId={setSelectedCarId} />
              <BlockForm cars={cars} createBlock={createBlock} />
              <BlockList blocks={blocks} deleteBlock={deleteBlock} />
            </div>
          </div>
        )}

        {view === "reservations" && <div className="mt-6"><ReservationsTable bookings={bookings} updateStatus={updateStatus} /></div>}
        {view === "users" && <Placeholder title="Users" text="Hier kommen Kundenprofile, Rollen und Kontaktinformationen hin." />}
        {view === "invoices" && <Placeholder title="Invoices" text="Hier werden später Rechnungen, Anzahlungen und Exportfunktionen verwaltet." />}
        {view === "settings" && <Placeholder title="Settings" text="Globale Standorte, Öffnungszeiten, WhatsApp-Text und Preiseinstellungen." />}
      </section>
    </main>
  );
}

function AdminNav({ view, active, setView, icon, children }: { view: AdminView; active: AdminView; setView: (view: AdminView) => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button onClick={() => setView(view)} className={`flex items-center gap-3 px-3 py-3 text-left font-semibold transition ${active === view ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-light hover:text-foreground"}`}>
      {icon}
      {children}
    </button>
  );
}

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-border bg-surface p-5">
      <span className="text-primary">{icon}</span>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}

function CarPreview({ car, cars, selectedCarId, setSelectedCarId }: { car?: CarDetail; cars: CarDetail[]; selectedCarId: string; setSelectedCarId: (value: string) => void }) {
  if (!car) return null;
  return (
    <div className="overflow-hidden border border-border bg-surface">
      <div className="relative aspect-[16/9] bg-background">
        <Image src={car.imageUrl} alt={`${car.brand} ${car.model}`} fill className="object-cover" />
      </div>
      <div className="p-5">
        <select value={selectedCarId} onChange={(event) => setSelectedCarId(event.target.value)} className="w-full border border-border bg-background p-3 font-semibold">
          {cars.map((item) => <option key={item.id} value={item.id}>{item.brand} {item.model}</option>)}
        </select>
      </div>
    </div>
  );
}

function BlockForm({ cars, createBlock }: { cars: CarDetail[]; createBlock: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={createBlock} className="h-fit border border-border bg-surface p-5">
      <h2 className="text-xl font-semibold">Zeitraum blockieren</h2>
      <div className="mt-4 grid gap-3">
        <select name="carId" required className="border border-border bg-background p-3"><option value="">Fahrzeug wählen</option>{cars.map((car) => <option key={car.id} value={car.id}>{car.brand} {car.model}</option>)}</select>
        <select name="reason" className="border border-border bg-background p-3"><option value="0">Admin-Blockierung</option><option value="1">Wartung</option><option value="2">Reinigung</option><option value="3">Privat blockiert</option></select>
        <input name="startAt" type="datetime-local" required className="border border-border bg-background p-3 [color-scheme:dark]" />
        <input name="endAt" type="datetime-local" required className="border border-border bg-background p-3 [color-scheme:dark]" />
        <input name="notes" placeholder="Notiz" className="border border-border bg-background p-3" />
      </div>
      <button className="mt-4 bg-primary px-5 py-3 font-semibold text-primary-foreground">Blockieren</button>
    </form>
  );
}

function BlockList({ blocks, deleteBlock }: { blocks: CarBlock[]; deleteBlock: (carId: string, blockId: string) => void }) {
  return (
    <div className="border border-border bg-surface p-5">
      <h2 className="text-xl font-semibold">Aktive Blockierungen</h2>
      <div className="mt-4 grid gap-3">
        {blocks.length === 0 && <p className="text-sm text-muted">Keine Blockierungen für dieses Fahrzeug.</p>}
        {blocks.map((block) => (
          <div key={block.id} className="border border-border bg-background p-3">
            <p className="text-sm font-semibold">{block.reason}</p>
            <p className="mt-1 text-xs text-muted">{formatDateTime(block.startAt)} bis {formatDateTime(block.endAt)}</p>
            {block.notes && <p className="mt-1 text-xs text-muted">{block.notes}</p>}
            <button type="button" onClick={() => deleteBlock(block.carId, block.id)} className="mt-3 text-xs font-semibold text-red-400">
              Löschen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReservationsTable({ bookings, updateStatus }: { bookings: Booking[]; updateStatus: (id: string, status: number) => void }) {
  return (
    <div className="border border-border bg-surface p-5">
      <h2 className="font-semibold">Reservations</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase text-muted"><tr><th className="py-3">Fahrzeug</th><th>Abholung</th><th>Rückgabe</th><th>Status</th><th>Zahlung</th><th /></tr></thead>
          <tbody className="divide-y divide-border">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-4 font-semibold">{booking.carName}</td>
                <td>{formatDateTime(booking.pickupAt)}</td>
                <td>{formatDateTime(booking.dropoffAt)}</td>
                <td>{booking.status}</td>
                <td className="font-semibold">{formatEuro(booking.totalPrice)}</td>
                <td className="flex gap-2 py-3">
                  <button onClick={() => updateStatus(booking.id, 1)} className="bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">Bestätigen</button>
                  <button onClick={() => updateStatus(booking.id, 3)} className="border border-border px-3 py-2 text-xs font-bold">Ablehnen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder({ title, text }: { title: string; text: string }) {
  return <div className="mt-6 border border-border bg-surface p-8"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-3 text-muted">{text}</p></div>;
}
