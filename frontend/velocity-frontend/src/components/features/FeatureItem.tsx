import { ArrowUpRight } from "lucide-react";

type FeatureItemProps = {
  feature: {
    id: number;
    icon: React.ElementType;
    title: string;
    description: string;
  };
};

export default function FeatureItem({
  feature,
}: FeatureItemProps) {
  const Icon = feature.icon;

  return (
    <article className="group flex h-full flex-col">
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center

          border
          border-border
          bg-transparent

          transition-all
          duration-300

          group-hover:border-primary
          group-hover:bg-transparent
        "
      >
        <Icon
          size={24}
          strokeWidth={1.7}
          className="text-primary"
        />
      </div>

      <div className="mt-8 flex-1">
        <h3
          className="
            text-xl
            font-medium
            leading-tight

            lg:text-2xl
          "
        >
          {feature.title}
        </h3>

        <p
          className="
            mt-4

            text-[15px]

            text-muted
          "
        >
          {feature.description}
        </p>
      </div>

      <button
        className="
          mt-10

          inline-flex
          items-center
          gap-2

          text-sm
          font-medium

          text-white

          transition-colors
          duration-300

          group-hover:text-primary
        "
      >
        Mehr erfahren

        <ArrowUpRight
          size={18}
          className="
            transition-transform
            duration-300

            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </button>
    </article>
  );
}
