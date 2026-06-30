import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

import BrandLogo from "./BrandLogo";
import { brands } from "./brands";

export default function Brands() {
  return (
    <section
      id="marken"
      className="section"
    >
      <Container>
        <div
          className="
            flex
            flex-col

            gap-16

            lg:flex-row
            lg:items-center
            lg:gap-20

            xl:gap-24
          "
        >
          <Reveal
            className="
              max-w-md
              shrink-0

              lg:w-[280px]

              xl:w-[330px]
            "
          >
            <SectionMarker number="04" />

            <Heading
              as="h2"
              className="
                text-4xl
                leading-[0.92]

                sm:text-5xl

                lg:text-6xl
              "
            >
              Fahre,
              <br />
              was dich
              <br />
              begeistert.
            </Heading>

            <Text
              className="
                mt-8

                max-w-sm

                text-base
                leading-8

                text-muted
              "
            >
              Entdecke eine handverlesene Auswahl der renommiertesten
              Sportwagen- und Luxusmarken weltweit.
            </Text>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex-1"
          >
            <div
              className="
                grid
                grid-cols-2

                gap-x-10
                gap-y-10

                sm:grid-cols-3

                lg:hidden
              "
            >
              {brands.map((brand) => (
                <BrandLogo
                  key={brand.id}
                  brand={brand}
                />
              ))}

              <Link
                href="/fahrzeuge"
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-2

                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]

                  text-muted
                  transition-colors
                  hover:text-primary
                "
              >
                Und mehr
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div
              className="
                hidden

                lg:flex
                lg:items-center
                lg:justify-between
                lg:gap-8

                xl:gap-10
              "
            >
              {brands.map((brand) => (
                <BrandLogo
                  key={brand.id}
                  brand={brand}
                />
              ))}

              <Link
                href="/fahrzeuge"
                className="
                  group
                  flex
                  shrink-0
                  items-center
                  gap-2

                  whitespace-nowrap

                  text-sm
                  font-medium

                  uppercase

                  tracking-[0.22em]

                  text-muted
                  transition-colors
                  hover:text-primary
                "
              >
                Und mehr
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
