export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  /** City shown under the reviewer name. */
  location: string;
  /** Star rating from 0 to 5. */
  rating: number;
  /** Optional avatar image path; falls back to initials when absent. */
  avatar?: string;
}
