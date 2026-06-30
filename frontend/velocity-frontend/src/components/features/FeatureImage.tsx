import Image from "next/image";

export default function FeatureImage() {
  return (
    <div
      className="
        relative
        overflow-hidden

        border
        border-border

        bg-surface

        min-h-[320px]

        sm:min-h-[420px]

        lg:min-h-[520px]
      "
    >
      <Image
        src="/images/features_image.webp"
        alt="Premium Sportwagen von Velocity"
        fill
        priority
        className="
          object-cover

          scale-[1.03]

          transition-transform
          duration-700

          hover:scale-[1.06]
        "
      />

      {/* Dark Overlay */}

      <div
        className="
          absolute
          inset-0

          bg-black/25
        "
      />

      {/* Bottom Gradient */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0

          h-40

          bg-gradient-to-t
          from-black
          via-black/50
          to-transparent
        "
      />

      {/* Top Gradient */}

      <div
        className="
          absolute
          inset-x-0
          top-0

          h-24

          bg-gradient-to-b
          from-black/25
          to-transparent
        "
      />

      {/* Corner Accent */}

      <div
        className="
          absolute

          left-0
          top-0

          h-16
          w-16

          border-l-2
          border-t-2

          border-primary
        "
      />

      <div
        className="
          absolute

          bottom-0
          right-0

          h-16
          w-16

          border-b-2
          border-r-2

          border-primary
        "
      />
    </div>
  );
}
