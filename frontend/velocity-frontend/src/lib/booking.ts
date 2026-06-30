export function toIsoDateTime(date: string, time: string) {
  if (!date || !time) {
    return "";
  }

  return new Date(`${date}T${time}:00`).toISOString();
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
