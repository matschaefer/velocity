type SectionMarkerProps = {
  number: string;
  className?: string;
};

export default function SectionMarker({
  number,
  className = "",
}: SectionMarkerProps) {
  return (
    <div className={`mb-5 flex items-center gap-3 ${className}`}>
      <span className="text-xs font-medium tracking-[0.1em] text-primary">
        {number}
      </span>

      <span className="h-px w-10 bg-primary" />
    </div>
  );
}
