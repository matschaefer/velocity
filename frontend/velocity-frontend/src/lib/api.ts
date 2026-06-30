export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5267";

type ApiOptions = RequestInit & {
  query?: Record<string, string | number | boolean | null | undefined>;
};

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const url = new URL(path, API_BASE_URL);

  Object.entries(options.query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    const validationErrors = error?.errors
      ? Object.values(error.errors).flat().join(" ")
      : null;
    throw new Error(
      error?.message ??
        validationErrors ??
        error?.title ??
        "Die Anfrage konnte nicht verarbeitet werden."
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export type CarListItem = {
  id: string;
  brand: string;
  model: string;
  slug: string;
  pricePerDay: number;
  imageUrl: string;
  imageUrls: string[];
  location: string;
  isFeatured: boolean;
  badge?: string | null;
  isAvailable: boolean;
};

export type UnavailablePeriod = {
  startAt: string;
  endAt: string;
  reason: string;
};

export type CarDetail = CarListItem & {
  description: string;
  horsePower: number;
  year: number;
  seats: number;
  transmission: string;
  fuelType: string;
  deposit: number;
  minimumAge: number;
  isActive: boolean;
  unavailablePeriods: UnavailablePeriod[];
};

export type Availability = {
  isAvailable: boolean;
  totalPrice: number;
  rentalDays: number;
};

export type Booking = {
  id: string;
  carId: string;
  carName: string;
  pickupAt: string;
  dropoffAt: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  totalPrice: number;
  notes?: string | null;
  createdAt: string;
};

export type CarBlock = {
  id: string;
  carId: string;
  startAt: string;
  endAt: string;
  reason: string;
  notes?: string | null;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  roles: string[];
};
