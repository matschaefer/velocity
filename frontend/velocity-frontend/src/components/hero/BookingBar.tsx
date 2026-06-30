"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { DateTimePicker, LocationPicker } from "@/components/booking/VelocityBookingControls";
import { toIsoDateTime } from "@/lib/booking";

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const dayAfterTomorrow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export default function BookingBar() {
  const router = useRouter();
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const [location, setLocation] = useState("Düsseldorf");
  const [pickupDate, setPickupDate] = useState(tomorrow);
  const [pickupTime, setPickupTime] = useState("09:30");
  const [dropoffDate, setDropoffDate] = useState(dayAfterTomorrow);
  const [dropoffTime, setDropoffTime] = useState("09:30");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pickupAt = toIsoDateTime(pickupDate, pickupTime);
    const dropoffAt = toIsoDateTime(dropoffDate, dropoffTime);
    router.push(`/fahrzeuge?${new URLSearchParams({ location, pickupAt, dropoffAt }).toString()}`);
  };

  return (
    <form
      id="buchen"
      onSubmit={handleSubmit}
      className="relative z-30 w-full max-w-6xl border border-border bg-surface/85 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-md"
    >
      <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
        <LocationPicker
          name="location"
          value={location}
          onChange={setLocation}
          label="Abholung & Rückgabe"
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
        />
        <DateTimePicker
          pickerId="pickup"
          label="Abholung"
          date={pickupDate}
          time={pickupTime}
          onDateChange={setPickupDate}
          onTimeChange={setPickupTime}
          dateName="pickupDate"
          timeName="pickupTime"
          relatedDates={[dropoffDate]}
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
        />
        <DateTimePicker
          pickerId="dropoff"
          label="Rückgabe"
          date={dropoffDate}
          time={dropoffTime}
          onDateChange={setDropoffDate}
          onTimeChange={setDropoffTime}
          dateName="dropoffDate"
          timeName="dropoffTime"
          relatedDates={[pickupDate]}
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
        />
        <button
          type="submit"
          className="flex min-h-[62px] items-center justify-center gap-2 bg-primary px-6 text-sm font-black text-primary-foreground transition hover:brightness-95"
        >
          Fahrzeuge anzeigen
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}
