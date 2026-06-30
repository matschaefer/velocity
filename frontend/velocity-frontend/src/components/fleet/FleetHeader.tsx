import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

export default function FleetHeader() {
  return (
    <div
      className="
        grid
        gap-10

        lg:grid-cols-[1.6fr_1fr]
        lg:items-end
        lg:gap-16
      "
    >
      <Reveal>
        <SectionMarker number="02" />

        <Heading
          as="h2"
          className="
            max-w-4xl

            text-3xl
            leading-[0.95]

            sm:text-4xl

            lg:text-5xl

            xl:text-6xl
          "
        >
          Außergewöhnliche Fahrzeuge für jeden Anlass.
        </Heading>
      </Reveal>

      <Reveal
        delay={0.08}
        className="flex flex-col items-start gap-8"
      >
        <Text
          className="
            max-w-xs

            text-sm
            leading-relaxed
            text-muted

            sm:max-w-sm

            lg:max-w-md
          "
        >
          Wähle dein Traumfahrzeug aus unserer exklusiven Flotte. Vom
          Sportwagen bis zum luxuriösen SUV - jedes Fahrzeug bietet ein
          außergewöhnliches Fahrerlebnis.
        </Text>

        <Link
          href="/fahrzeuge"
          className="
            group

            inline-flex
            w-full
            items-center
            justify-center
            gap-3

            border
            border-border

            px-6
            py-3

            text-sm
            font-medium

            transition-all
            duration-300

            hover:border-primary
            hover:text-primary

            sm:w-auto
          "
        >
          Alle Fahrzeuge ansehen

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </div>
  );
}
