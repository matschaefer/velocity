import FahrzeugeClient from "./FahrzeugeClient";

type Props = {
  searchParams: Promise<{
    location?: string;
    pickupAt?: string;
    dropoffAt?: string;
  }>;
};

export default async function FahrzeugePage({ searchParams }: Props) {
  const params = await searchParams;
  return <FahrzeugeClient {...params} />;
}
