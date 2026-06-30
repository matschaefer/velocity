import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type FleetCardProps = {
  car: {
    id: number | string;
    brand: string;
    model: string;
    price?: number;
    pricePerDay?: number;
    image?: string;
    imageUrl?: string;
    slug?: string;
    featured?: boolean;
    isFeatured?: boolean;
    badge?: string | null;
  };
};

export default function FleetCard({ car }: FleetCardProps) {
  const href = car.slug ? `/fahrzeuge/${car.slug}` : "/fahrzeuge";
  const price = car.pricePerDay ?? car.price ?? 0;
  const image = car.imageUrl ?? car.image ?? "";
  const featured = car.isFeatured ?? car.featured;

  return (
    <Link
      href={href}
      className={clsx(
        `
        group relative block overflow-hidden border border-border bg-surface
        shadow-[0_18px_55px_rgba(0,0,0,0.36),0_0_0_1px_rgba(255,255,255,0.02)]
        transition-all duration-500 ease-out
        hover:-translate-y-2 hover:border-primary/60 hover:shadow-[0_34px_90px_rgba(0,0,0,0.62)]
      `,
        featured && "border-primary/60"
      )}
    >
      {featured && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/60" />
      )}

      <div className="relative aspect-[16/11] overflow-hidden bg-[#090909] sm:aspect-[16/10]">
        <Image
          src={image}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
        <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {car.badge && (
          <div className="absolute left-3 top-3 z-20 border border-primary/30 bg-surface-light px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-primary backdrop-blur sm:left-4 sm:top-4">
            {car.badge}
          </div>
        )}
      </div>

      <div className="relative border-t border-border p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              {car.brand}
            </p>
            <h3 className="mt-2 text-xl font-medium sm:text-2xl">{car.model}</h3>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xl font-medium sm:text-2xl">
              {price}€
              <span className="ml-1 text-sm text-muted">/Tag</span>
            </p>
            <ArrowRight
              size={18}
              className="ml-auto mt-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
