import TestimonialCard from "./TestimonialCard";
import { testimonials } from "./testimonials";

function TestimonialLane() {
  return (
    <div className="flex shrink-0 gap-6 pr-6 sm:gap-8 sm:pr-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
        />
      ))}
    </div>
  );
}

export default function TestimonialsMarquee() {
  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent sm:w-32" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent sm:w-32" />

      <div className="flex w-max [--marquee-duration:28s] animate-[testimonials-marquee_var(--marquee-duration)_linear_infinite] will-change-transform hover:[animation-play-state:paused] sm:[--marquee-duration:34s] lg:[--marquee-duration:42s]">
        <TestimonialLane />
        <TestimonialLane />
      </div>
    </div>
  );
}
