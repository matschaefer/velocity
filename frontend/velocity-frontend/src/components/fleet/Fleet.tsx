"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import FleetCard from "./FleetCard";
import FleetHeader from "./FleetHeader";
import { cars } from "./cars";

export default function Fleet() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
  });

  return (
    <section
      id="fahrzeuge"
      className="section overflow-hidden border-t border-border"
    >
      <Container>
        <FleetHeader />

        <div className="mt-10 hidden justify-end gap-3 sm:mt-12 lg:mt-16 lg:flex">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="
              flex h-12 w-12 items-center justify-center
              border border-border
              bg-surface
              transition-all duration-300

              hover:border-primary
              hover:bg-surface-light
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="
              flex h-12 w-12 items-center justify-center
              border border-border
              bg-surface
              transition-all duration-300

              hover:border-primary
              hover:bg-surface-light
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </Container>

      <div className="relative mt-8 sm:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-background via-background/90 to-transparent lg:block xl:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-background via-background/90 to-transparent lg:block xl:w-24" />

        <div
          ref={emblaRef}
          className="overflow-hidden px-5 py-8 sm:px-6 lg:px-8"
        >
          <div className="-ml-4 flex">
            {cars.map((car) => (
              <div
                key={car.id}
                className="
                  min-w-0
                  pl-4

                  flex-[0_0_88%]

                  sm:flex-[0_0_70%]

                  md:flex-[0_0_52%]

                  lg:flex-[0_0_42%]

                  xl:flex-[0_0_33.333%]
                "
              >
                <FleetCard car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
