export type Car = {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
  slug: string;
  featured?: boolean;
  badge?: string;
};

export const cars: Car[] = [
  {
    id: 1,
    brand: "Mercedes-AMG",
    model: "CLE 53 4MATIC+",
    price: 279,
    image: "/cars/mercedes_cle.png",
    slug: "mercedes-amg-cle-53-4matic",
  },
  {
    id: 2,
    brand: "Range Rover",
    model: "Velar",
    price: 296,
    image: "/cars/rangerover_velar.png",
    slug: "range-rover-velar",
    featured: true,
    badge: "Beliebt",
  },
  {
    id: 3,
    brand: "Ferrari",
    model: "SF90 Stradale",
    price: 2199,
    image: "/cars/ferrari_sf90.png",
    slug: "ferrari-sf90-stradale",
  },
  {
    id: 4,
    brand: "Porsche",
    model: "911 Turbo S",
    price: 699,
    image: "/cars/porsche_turbos.png",
    slug: "porsche-911-turbo-s",
  },
  {
    id: 5,
    brand: "Lamborghini",
    model: "Huracán EVO",
    price: 1299,
    image: "/cars/lamborghini_huracan.png",
    slug: "lamborghini-huracan-evo",
  },
  {
    id: 6,
    brand: "BMW",
    model: "M4 Competition",
    price: 349,
    image: "/cars/bmw_m4.png",
    slug: "bmw-m4-competition",
  },
  {
    id: 7,
    brand: "Audi",
    model: "RS6 Performance",
    price: 449,
    image: "/cars/audi_rs6.png",
    slug: "audi-rs6-performance",
  },
  {
    id: 8,
    brand: "Porsche",
    model: "Cayenne Turbo GT",
    price: 649,
    image: "/cars/porsche_cayenne.png",
    slug: "porsche-cayenne-turbo-gt",
  },
];
