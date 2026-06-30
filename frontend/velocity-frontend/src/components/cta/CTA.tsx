import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

export default function CTA() {
  return (
    <section
      id="buchen"
      className="
        relative
        isolate
        overflow-hidden

        border-y
        border-primary/70

        py-0
      "
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta_image.webp"
          alt=""
          fill
          sizes="100vw"
          className="
            object-cover
            object-[68%_center]

            opacity-95

            sm:object-[72%_center]
            lg:object-right
          "
        />

        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/20" />
        <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-background/20 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container>
        <div
          className="
            flex
            min-h-[360px]
            items-center

            py-16

            sm:min-h-[420px]
            sm:py-20

            lg:min-h-[460px]
          "
        >
          <Reveal className="max-w-xl">
            <SectionMarker number="07" />

            <Heading
              as="h2"
              className="
                text-5xl
                leading-[0.9]

                sm:text-6xl

                lg:text-7xl
              "
            >
              Dein Traumauto
              <br />
              wartet schon.
            </Heading>

            <Text
              className="
                mt-6
                max-w-sm

                text-base
                leading-7

                text-muted
              "
            >
              Buche jetzt dein exklusives Fahrerlebnis.
            </Text>

            <Button
              href="/fahrzeuge"
              size="lg"
              icon={<ArrowRight size={17} strokeWidth={2.2} />}
              className="mt-8"
            >
              Jetzt buchen
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
