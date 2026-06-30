import Image from "next/image";

type BrandLogoProps = {
  brand: {
    id: number;
    name: string;
    image: string;
  };
};

export default function BrandLogo({ brand }: BrandLogoProps) {
  return (
    <div
      className="
        group

        flex
        items-center
        justify-center

        py-2

        transition-all
        duration-300
      "
    >
      <Image
        src={brand.image}
        alt={brand.name}
        width={1000}
        height={400}
        draggable={false}
        className="
          h-16
          w-auto

          sm:h-20

          lg:h-24

          xl:h-28

          2xl:h-32

          object-contain
          select-none

          opacity-60

          transition-all
          duration-300
          ease-out

          group-hover:opacity-100
          group-hover:scale-[1.02]
        "
      />
    </div>
  );
}
