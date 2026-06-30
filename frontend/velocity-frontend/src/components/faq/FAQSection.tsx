import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

import FAQAccordion from "./FAQAccordion";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section border-t border-border"
    >
      <Container>
        <div
          className="
            flex
            flex-col

            gap-16

            lg:flex-row
            lg:justify-between

            xl:gap-28
          "
        >
          <Reveal
            className="
              max-w-md
              shrink-0

              lg:w-[320px]

              xl:w-[380px]
            "
          >
            <SectionMarker number="06" />

            <Heading
              as="h2"
              className="
                text-4xl
                leading-[0.92]

                sm:text-5xl

                lg:text-6xl
              "
            >
              Häufig
              <br />
              gestellte
              <br />
              Fragen.
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
              Antworten auf die wichtigsten Fragen rund um unsere Fahrzeuge,
              den Buchungsprozess und deine Anmietung bei Velocity.
            </Text>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex-1"
          >
            <FAQAccordion />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
