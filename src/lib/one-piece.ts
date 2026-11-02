export const MEDIA_TYPES = ["movies", "anime", "shows", "manga", "comics", "novels"] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

export const SHIP_PATHS = ["Fantasy", "Superhero", "Sci-Fi", "Real World"] as const;

export const INTRO_SEEN_KEY = "cineguide.onepiece.introSeen";

export function isMediaType(v: unknown): v is MediaType {
  return typeof v === "string" && (MEDIA_TYPES as readonly string[]).includes(v);
}
