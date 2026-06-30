const stats = [
  { value: "8", label: "kuratierte Fahrzeuge" },
  { value: "2", label: "Standorte in NRW" },
  { value: "24h", label: "Antwort auf Anfragen" },
  { value: "30+", label: "Fahrerprofil möglich" },
];

export default function HeroStats() {
  return (
    <div className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-7 ${index < stats.length - 1 ? "md:border-r md:border-border" : ""} ${index % 2 === 0 ? "border-r border-border md:border-r" : ""} ${index < 2 ? "border-b border-border md:border-b-0" : ""}`}
          >
            <div className="px-5 md:px-8">
              <p className="font-display text-5xl leading-none text-primary">{stat.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.14em] text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
