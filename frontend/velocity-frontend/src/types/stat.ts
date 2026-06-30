import type { LucideIcon } from "lucide-react";

export interface Stat {
  id: string;
  /** Headline figure, e.g. "500+" or "24/7". */
  value: string;
  label: string;
  icon: LucideIcon;
}
