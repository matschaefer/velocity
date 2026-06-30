import Image from "next/image";

import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

import BookingBar from "./BookingBar";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-12rem)] flex-col overflow-hidden border-b border-border md:min-h-[calc(100svh-6rem)]"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero_background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="flex flex-1">
        <div className="flex flex-1 flex-col justify-center gap-8 pt-24 pb-10 sm:gap-10 lg:pt-28 lg:pb-12">
          <div className="max-w-xl">
            <SectionMarker number="01" className="mb-6" />

            <Heading
              as="h1"
              className="text-[3.25rem] leading-[0.92] sm:text-7xl lg:text-[5.5rem]"
            >
              Erlebe Luxus.
              <br />
              Spüre den Thrill.
            </Heading>

            <Text className="mt-6 max-w-[320px] text-[15px] leading-relaxed text-muted">
              Von exotischen Sportwagen bis Luxuslimousinen und SUVs -
              außergewöhnliche Auswahl, persönlicher Service.
            </Text>
          </div>

          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
