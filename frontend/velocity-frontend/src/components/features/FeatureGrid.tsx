import Reveal from "@/components/ui/Reveal";

import FeatureItem from "./FeatureItem";
import { features } from "./features";

export default function FeatureGrid() {
  return (
    <Reveal
      delay={0.12}
      className="relative mt-14"
    >
      <div className="absolute left-1/2 top-0 h-px w-screen -translate-x-1/2 bg-border" />
      <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-border" />

      <div
        className="
          relative
          grid
          grid-cols-1

          md:grid-cols-2
          xl:grid-cols-4
        "
      >
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`
              relative

              px-6
              py-8

              lg:px-7
              lg:py-10

              ${index !== features.length - 1 ? "xl:border-r xl:border-border" : ""}
              ${index < 2 ? "md:border-b md:border-border xl:border-b-0" : ""}
              ${index % 2 === 0 ? "md:border-r md:border-border xl:border-r" : ""}
            `}
          >
            <FeatureItem feature={feature} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
