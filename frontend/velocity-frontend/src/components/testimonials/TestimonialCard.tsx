import { Star } from "lucide-react";

type TestimonialCardProps = {
  testimonial: {
    id: number;
    name: string;
    source: string;
    vehicle: string;
    review: string;
  };
};

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <article
      className="
        group

        flex
        h-full
        w-[320px]
        shrink-0
        flex-col

        border
        border-border

        bg-surface

        p-8

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-primary/50

        sm:w-[360px]
        lg:w-[400px]
      "
    >
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className="fill-primary text-primary"
          />
        ))}
      </div>

      <p
        className="
          mt-8
          flex-1
          text-base
          leading-8
          text-muted
        "
      >
        &quot;{testimonial.review}&quot;
      </p>

      <div className="my-8 h-px bg-border" />

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-white">
            {testimonial.name}
          </h3>

          <p className="mt-1 text-sm text-muted">
            {testimonial.source}
          </p>
        </div>

        <span
          title={testimonial.vehicle}
          className="
            max-w-[130px]
            shrink-0
            truncate

            border
            border-border

            px-3
            py-1.5

            text-[11px]
            font-medium
            uppercase
            tracking-[0.12em]

            text-primary

            sm:max-w-[150px]
          "
        >
          {testimonial.vehicle}
        </span>
      </div>
    </article>
  );
}
