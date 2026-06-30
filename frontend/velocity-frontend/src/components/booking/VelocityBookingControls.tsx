"use client";

import { ReactNode, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export const velocityLocations = [
  { name: "Mülheim", address: "Ruhrgebiet, flexible Übergabe nach Vereinbarung" },
  { name: "Düsseldorf", address: "City, Messe und Flughafen Düsseldorf" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
];

const weekDays = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
type OpenPicker = string | null;

function BodyPortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

function PickerBackdrop({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <BodyPortal>
      <div className="fixed inset-0 z-[1000]">
        <button type="button" aria-label="Auswahl schließen" className="absolute inset-0 bg-black/30" onClick={onClose} />
        {children}
      </div>
    </BodyPortal>
  );
}

export function LocationPicker({
  value,
  onChange,
  name,
  label = "Standort",
  pickerId = "location",
  openPicker,
  setOpenPicker,
}: {
  value: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  pickerId?: string;
  openPicker: OpenPicker;
  setOpenPicker: (value: OpenPicker) => void;
}) {
  const isOpen = openPicker === pickerId;
  const selected = velocityLocations.find((location) => location.name === value) ?? velocityLocations[0];

  return (
    <div className="relative">
      <input type="hidden" name={name} value={selected.name} />
      <button
        type="button"
        onClick={() => setOpenPicker(isOpen ? null : pickerId)}
        className="flex w-full items-center gap-3 border border-border bg-background px-4 py-3 text-left transition hover:border-primary/60"
      >
        <Search className="size-5 text-muted" />
        <span className="min-w-0">
          <span className="block text-[11px] uppercase tracking-[0.12em] text-muted">{label}</span>
          <span className="block truncate text-sm font-semibold">{selected.name}</span>
        </span>
      </button>

      {isOpen && (
        <PickerBackdrop onClose={() => setOpenPicker(null)}>
          <div className="absolute left-4 right-4 top-24 mx-auto grid max-h-[calc(100vh-7rem)] max-w-4xl overflow-hidden border border-border bg-surface shadow-2xl md:grid-cols-[280px_1fr]">
            <div className="border-b border-border md:border-b-0 md:border-r">
              <div className="border-b border-border p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Standorte</p>
              </div>
              <div className="grid p-2">
                {velocityLocations.map((location) => (
                  <button
                    type="button"
                    key={location.name}
                    onClick={() => {
                      onChange(location.name);
                      setOpenPicker(null);
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-4 text-left transition hover:bg-surface-light",
                      location.name === selected.name && "bg-surface-light text-primary"
                    )}
                  >
                    <MapPin className="size-5" />
                    <span>
                      <span className="block font-semibold">{location.name}</span>
                      <span className="text-xs text-muted">{location.address}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6">
              <MapPin className="size-8 text-primary" />
              <h3 className="mt-4 text-2xl font-semibold">{selected.name}</h3>
              <p className="mt-2 text-muted">{selected.address}</p>
              <div className="mt-6 grid gap-2 text-sm">
                <p className="font-semibold">Öffnungszeiten</p>
                <p className="text-muted">Täglich nach Vereinbarung, Abholung und Rückgabe flexibel.</p>
              </div>
            </div>
          </div>
        </PickerBackdrop>
      )}
    </div>
  );
}

export function DateTimePicker({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
  dateName,
  timeName,
  pickerId,
  openPicker,
  setOpenPicker,
  relatedDates = [],
}: {
  label: string;
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  dateName?: string;
  timeName?: string;
  pickerId: string;
  openPicker: OpenPicker;
  setOpenPicker: (value: OpenPicker) => void;
  relatedDates?: string[];
}) {
  const dateOpenKey = `${pickerId}:date`;
  const timeOpenKey = `${pickerId}:time`;
  const displayDate = date
    ? new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "short" }).format(new Date(`${date}T00:00:00`))
    : "Datum";

  return (
    <div className="relative">
      {dateName && <input type="hidden" name={dateName} value={date} />}
      {timeName && <input type="hidden" name={timeName} value={time} />}
      <div className="grid grid-cols-[1fr_96px] overflow-hidden border border-border bg-background transition focus-within:border-primary/70">
        <button type="button" onClick={() => setOpenPicker(openPicker === dateOpenKey ? null : dateOpenKey)} className="flex items-center gap-3 px-4 py-3 text-left hover:bg-surface">
          <CalendarDays className="size-5 text-muted" />
          <span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-muted">{label}</span>
            <span className="text-sm font-semibold">{displayDate}</span>
          </span>
        </button>
        <button type="button" onClick={() => setOpenPicker(openPicker === timeOpenKey ? null : timeOpenKey)} className="flex items-center justify-center gap-2 border-l border-border px-3 text-sm font-semibold hover:bg-surface">
          <Clock className="size-4 text-muted" />
          {time}
        </button>
      </div>

      {openPicker === dateOpenKey && (
        <PickerBackdrop onClose={() => setOpenPicker(null)}>
          <CalendarPopover selectedDate={date} relatedDates={relatedDates} onSelect={(value) => { onDateChange(value); setOpenPicker(null); }} />
        </PickerBackdrop>
      )}
      {openPicker === timeOpenKey && (
        <PickerBackdrop onClose={() => setOpenPicker(null)}>
          <TimePopover selectedTime={time} onSelect={(value) => { onTimeChange(value); setOpenPicker(null); }} />
        </PickerBackdrop>
      )}
    </div>
  );
}

function CalendarPopover({ selectedDate, relatedDates, onSelect }: { selectedDate: string; relatedDates: string[]; onSelect: (value: string) => void }) {
  const [offset, setOffset] = useState(0);
  const months = useMemo(() => [0, 1, 2].map((item) => addMonths(new Date(), item + offset)), [offset]);

  return (
    <div className="absolute left-4 right-4 top-24 mx-auto max-h-[calc(100vh-7rem)] max-w-6xl overflow-y-auto border border-border bg-surface p-4 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => setOffset((value) => value - 1)} className="p-2 hover:text-primary"><ChevronLeft className="size-5" /></button>
        <p className="text-sm font-semibold text-muted">Datum auswählen</p>
        <button type="button" onClick={() => setOffset((value) => value + 1)} className="p-2 hover:text-primary"><ChevronRight className="size-5" /></button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {months.map((month) => <Month key={month.toISOString()} month={month} selectedDate={selectedDate} relatedDates={relatedDates} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function Month({ month, selectedDate, relatedDates, onSelect }: { month: Date; selectedDate: string; relatedDates: string[]; onSelect: (value: string) => void }) {
  const days = getMonthGrid(month);
  return (
    <div>
      <h3 className="mb-4 text-center text-xl font-semibold">{new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(month)}</h3>
      <div className="grid grid-cols-7 border-b border-border pb-2 text-center text-xs text-muted">{weekDays.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, index) => {
          const value = day ? toDateInput(day) : "";
          const isSelected = value === selectedDate;
          const isRelated = relatedDates.includes(value) && !isSelected;
          const isPast = day ? day < startOfToday() : false;
          return (
            <button
              type="button"
              key={`${value}-${index}`}
              disabled={!day || isPast}
              onClick={() => value && onSelect(value)}
              className={cn(
                "h-10 font-semibold transition disabled:text-muted/30",
                day && "hover:bg-primary hover:text-primary-foreground",
                isRelated && "border border-primary/50 text-primary",
                isSelected && "bg-primary text-primary-foreground"
              )}
            >
              {day?.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimePopover({ selectedTime, onSelect }: { selectedTime: string; onSelect: (value: string) => void }) {
  return (
    <div className="absolute right-4 top-24 max-h-[calc(100vh-7rem)] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden border border-border bg-surface shadow-2xl">
      <div className="border-b border-border p-4 text-center font-semibold">Zeit auswählen</div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-4">
        <p className="mb-3 text-sm text-muted">Öffnungszeiten: 08:00 - 20:00</p>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <button type="button" key={slot} onClick={() => onSelect(slot)} className={cn("bg-surface-light px-4 py-3 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground", selectedTime === slot && "bg-primary text-primary-foreground")}>{slot}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getMonthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startOffset = (first.getDay() + 6) % 7;
  const days: Array<Date | null> = Array.from({ length: startOffset }, () => null);
  for (let day = 1; day <= last.getDate(); day += 1) days.push(new Date(month.getFullYear(), month.getMonth(), day));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function toDateInput(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}
