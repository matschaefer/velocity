import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

import TestimonialsMarquee from "./TestimonialsMarquee";

export default function Testimonials() {
  return (
    <section
      id="kundenstimmen"
      className="section border-t border-border"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <SectionMarker number="05" />

          <Heading
            as="h2"
            className="
              text-4xl
              leading-[0.92]

              sm:text-5xl

              lg:text-6xl
            "
          >
            Das sagen
            <br />
            unsere Kunden.
          </Heading>

          <Text
            className="
              mt-8
              max-w-2xl

              text-base
              leading-8

              text-muted
            "
          >
            Über 500 zufriedene Kunden vertrauen bereits auf Velocity. Erfahre
            aus erster Hand, warum unsere Fahrzeuge, unser Service und unsere
            Leidenschaft den Unterschied machen.
          </Text>
        </Reveal>
      </Container>

      <div className="mt-20">
        <TestimonialsMarquee />
      </div>
    </section>
  );
}
