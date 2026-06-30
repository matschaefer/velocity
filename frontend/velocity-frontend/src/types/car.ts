export interface Car {
  id: string;
  /** Manufacturer, shown as a small muted label above the model. */
  brand: string;
  /** Model name, shown as the card headline. */
  model: string;
  /** Price per day in EUR. */
  pricePerDay: number;
  /** Public path passed to next/image. */
  image: string;
  /** Highlights the card with a "BELIEBT" badge when true. */
  popular?: boolean;
}
