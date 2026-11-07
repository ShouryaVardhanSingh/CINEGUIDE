export type MediaType = "anime" | "movies" | "manga" | "comics" | "shows" | "novels";
export type World = "action" | "scifi" | "romance" | "comedy" | "history" | "psychological" | "thriller";
export type Environment =
  | "fantasy" | "dark" | "romcom" | "action" | "character" | "mystery" | "peaceful" | "celestial" | "oceanic";

export const PORTALS: { id: MediaType; label: string; hue: number; tagline: string }[] = [
  { id: "anime", label: "Anime", hue: 45, tagline: "Hand-drawn legends" },
  { id: "movies", label: "Movies", hue: 245, tagline: "Silver-screen sagas" },
  { id: "manga", label: "Manga", hue: 310, tagline: "Ink & panel realms" },
  { id: "comics", label: "Comics", hue: 70, tagline: "Heroes in colour" },
  { id: "shows", label: "Shows", hue: 195, tagline: "Episodic odysseys" },
  { id: "novels", label: "Novels", hue: 345, tagline: "Worlds of words" },
];

export const WORLDS: { id: World; label: string; hue: number; fx: string }[] = [
  { id: "action", label: "Action", hue: 30, fx: "sparks" },
  { id: "scifi", label: "Sci-Fi", hue: 220, fx: "orbit" },
  { id: "romance", label: "Romance", hue: 0, fx: "petals" },
  { id: "comedy", label: "Comedy", hue: 85, fx: "bounce" },
  { id: "history", label: "History", hue: 65, fx: "dust" },
  { id: "psychological", label: "Psychological", hue: 280, fx: "shadows" },
  { id: "thriller", label: "Thriller", hue: 250, fx: "flicker" },
];

export type EnvSpec = {
  id: Environment; label: string; desc: string;
  tint: string; filter: string; particle: "leaves" | "petals" | "embers" | "dust" | "fog" | "stars" | "bubbles";
};

export const ENVIRONMENTS: EnvSpec[] = [
  { id: "fantasy", label: "Fantasy", desc: "Enchanted forests & floating lights", tint: "oklch(0.45 0.18 300 / 35%)", filter: "saturate(1.15)", particle: "leaves" },
  { id: "dark", label: "Dark", desc: "Fog, shadow & muted moonlight", tint: "oklch(0.1 0.04 270 / 65%)", filter: "saturate(.45) brightness(.6)", particle: "fog" },
  { id: "romcom", label: "Rom-Com", desc: "Warm light & falling petals", tint: "oklch(0.75 0.12 20 / 30%)", filter: "saturate(1.2) brightness(1.05) hue-rotate(-15deg)", particle: "petals" },
  { id: "action", label: "Action", desc: "Embers, wind & raw energy", tint: "oklch(0.5 0.2 35 / 40%)", filter: "saturate(1.3) hue-rotate(-40deg) contrast(1.1)", particle: "embers" },
  { id: "character", label: "Character Study", desc: "Layered light, quiet reflection", tint: "oklch(0.35 0.05 60 / 40%)", filter: "saturate(.75) sepia(.25)", particle: "dust" },
  { id: "mystery", label: "Mystery", desc: "Drifting fog & hidden lights", tint: "oklch(0.25 0.08 220 / 55%)", filter: "saturate(.7) hue-rotate(60deg) brightness(.75)", particle: "fog" },
  { id: "peaceful", label: "Peaceful", desc: "Soft clouds & gentle breezes", tint: "oklch(0.8 0.08 150 / 20%)", filter: "saturate(.9) hue-rotate(90deg) brightness(1.05)", particle: "leaves" },
  { id: "celestial", label: "Celestial", desc: "Starfields & cosmic drift", tint: "oklch(0.2 0.12 270 / 45%)", filter: "hue-rotate(30deg) saturate(1.2)", particle: "stars" },
  { id: "oceanic", label: "Oceanic", desc: "Deep tides & shimmering water", tint: "oklch(0.4 0.12 210 / 45%)", filter: "hue-rotate(120deg) saturate(1.05)", particle: "bubbles" },
];

export type LengthPreset = { id: string; label: string; sub: string; value: number };
export type LengthSpec = { unit: string; hint: string; presets: LengthPreset[]; defaultId: string; min: number; max: number; step: number };

export const LENGTHS: Record<MediaType, LengthSpec> = {
  movies: { unit: "minutes", hint: "Total runtime per film", defaultId: "classic", min: 60, max: 300, step: 10, presets: [
    { id: "short", label: "~1h", sub: "Short", value: 90 },
    { id: "classic", label: "2–3h", sub: "Classic", value: 150 },
    { id: "epic", label: "4–5h", sub: "Extended", value: 270 } ] },
  anime: { unit: "episodes", hint: "≈ 23–25 min per episode", defaultId: "cour", min: 1, max: 500, step: 1, presets: [
    { id: "film", label: "1–6", sub: "Film / OVA", value: 6 },
    { id: "cour", label: "12–26", sub: "One–two cours", value: 24 },
    { id: "long", label: "50–100", sub: "Long saga", value: 75 } ] },
  shows: { unit: "episodes", hint: "≈ 30–60 min per episode", defaultId: "season", min: 1, max: 200, step: 1, presets: [
    { id: "mini", label: "4–8", sub: "Miniseries", value: 6 },
    { id: "season", label: "10–24", sub: "A season or two", value: 18 },
    { id: "long", label: "50+", sub: "Full run", value: 60 } ] },
  manga: { unit: "chapters", hint: "Chapters in total", defaultId: "mid", min: 1, max: 1200, step: 5, presets: [
    { id: "short", label: "<50", sub: "One sitting-ish", value: 40 },
    { id: "mid", label: "50–150", sub: "Weekend arc", value: 100 },
    { id: "long", label: "300+", sub: "Epic", value: 350 } ] },
  comics: { unit: "pages", hint: "Pages in total", defaultId: "arc", min: 20, max: 3000, step: 20, presets: [
    { id: "oneshot", label: "<100", sub: "One-shot", value: 80 },
    { id: "arc", label: "150–400", sub: "Story arc", value: 250 },
    { id: "run", label: "800+", sub: "Full run", value: 900 } ] },
  novels: { unit: "pages", hint: "Pages in total", defaultId: "standard", min: 50, max: 2000, step: 25, presets: [
    { id: "novella", label: "<200", sub: "Novella", value: 150 },
    { id: "standard", label: "250–450", sub: "Standard", value: 350 },
    { id: "tome", label: "600+", sub: "Tome", value: 700 } ] },
};

export const CHAPTERS = [
  { name: "Familiar Lands", range: [1, 3] },
  { name: "Hidden Lands", range: [4, 6] },
  { name: "Beyond the Horizon", range: [7, 9] },
  { name: "Companions", range: [10, 11] },
  { name: "The Unknown", range: [12, 12] },
] as const;

/** Gradual colour progression for the 12 pieces: warm pastels → teal/blue → indigo/magenta → intense → wildcard. */
export const PIECE_COLORS = [
  "oklch(0.88 0.11 85)", "oklch(0.85 0.1 55)", "oklch(0.83 0.1 10)",
  "oklch(0.8 0.1 330)", "oklch(0.78 0.12 190)", "oklch(0.72 0.14 225)",
  "oklch(0.68 0.2 260)", "oklch(0.62 0.24 290)", "oklch(0.65 0.26 330)",
  "oklch(0.62 0.25 10)", "oklch(0.66 0.24 35)", "oklch(0.82 0.22 60)",
];

export function chapterOf(n: number) {
  return CHAPTERS.find((c) => n >= c.range[0] && n <= c.range[1])!.name;
}
