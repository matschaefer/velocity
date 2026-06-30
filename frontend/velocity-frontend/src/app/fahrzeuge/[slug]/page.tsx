import VehicleDetailClient from "./VehicleDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    location?: string;
    pickupAt?: string;
    dropoffAt?: string;
  }>;
};

export default async function VehicleDetailPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  return <VehicleDetailClient slug={slug} {...query} />;
}
