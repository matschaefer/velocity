import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Reveal from "@/components/ui/Reveal";
import SectionMarker from "@/components/ui/SectionMarker";
import Text from "@/components/ui/Text";

import FeatureGrid from "./FeatureGrid";
import FeatureImage from "./FeatureImage";

export default function Features() {
  return (
    <section id="warum-velocity" className="section overflow-hidden border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.2fr] lg:items-center xl:gap-16">
          <Reveal>
            <SectionMarker number="03" />
            <Heading as="h2" className="text-4xl leading-[0.92] sm:text-5xl lg:text-6xl">
              Mehr als nur
              <br />
              eine Autovermietung.
            </Heading>
            <Text className="mt-8 max-w-xl text-base leading-8 text-muted">
              Velocity verbindet handverlesene Fahrzeuge, transparente Konditionen
              und persönlichen Service zu einem Fahrerlebnis, das sich vom ersten
              Klick bis zur Rückgabe hochwertig anfühlt.
            </Text>
            <Button href="/ueber-uns" size="lg" icon={<ArrowRight size={17} strokeWidth={2.2} />} className="mt-10">
              Mehr über uns
            </Button>
          </Reveal>
          <Reveal delay={0.08}>
            <FeatureImage />
          </Reveal>
        </div>
        <FeatureGrid />
      </Container>
    </section>
  );
}
