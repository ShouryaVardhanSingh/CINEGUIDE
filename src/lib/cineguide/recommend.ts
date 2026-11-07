/**
 * Recommendation service boundary.
 * MOCK DATA ONLY — placeholder pieces until the shared media catalogue and the
 * CINEGUIDE recommendation service are connected. Nothing here is a verified title.
 */
import { chapterOf, LENGTHS, type Environment, type MediaType, type World } from "./data";

export type Preferences = {
  media: MediaType; world: World; environment: Environment;
  length: number; dragonName?: string | undefined; reference?: string | undefined;
};

export type Piece = {
  index: number; chapter: string; title: string; mediaType: MediaType;
  genre: string; subgenre: string; overview: string; length: string;
  advisories: string[]; positives: string[]; drawbacks: string[];
  why: string; replacement?: string | undefined; isMock: true;
};

const SUBGENRES: Record<World, string[]> = {
  action: ["Martial epic", "Heist", "Survival", "War saga"],
  scifi: ["Space opera", "Cyberpunk", "Time travel", "First contact"],
  romance: ["Slow burn", "Second chance", "Star-crossed", "Slice of life"],
  comedy: ["Satire", "Ensemble", "Absurdist", "Workplace"],
  history: ["Court intrigue", "Period drama", "Alt-history", "Biographical"],
  psychological: ["Mind game", "Unreliable narrator", "Identity", "Moral dilemma"],
  thriller: ["Conspiracy", "Cat & mouse", "Noir", "Locked room"],
};

export async function getJourney(p: Preferences): Promise<Piece[]> {
  const subs = SUBGENRES[p.world];
  const unit = LENGTHS[p.media].unit;
  return Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const chapter = chapterOf(n);
    const why =
      n <= 3 ? `A strong match for your love of ${p.world} in a ${p.environment} atmosphere.`
      : n <= 6 ? `A lesser-known ${p.world} discovery that fits your chosen pace.`
      : n <= 9 ? `Stretches beyond pure ${p.world} into neighbouring territory.`
      : n <= 11 ? (p.reference ? `Informed by your reference "${p.reference}".` : `Picked from your other preferences — a trusty companion.`)
      : `A wildcard that still respects your length and restrictions.`;
    return {
      index: n, chapter, isMock: true,
      title: `Placeholder Piece ${n}`,
      mediaType: p.media,
      genre: p.world, subgenre: subs[i % subs.length]!,
      overview: "Sample entry shown while the media catalogue is not yet connected. Real titles will appear here.",
      length: `Target ≈ ${p.length} ${unit} (unverified)`,
      advisories: ["Advisories pending catalogue data"],
      positives: ["Matches your selected world", "Fits your atmosphere"],
      drawbacks: ["Details unverified until catalogue connects"],
      why, replacement: n < 12 ? `Alternate for piece ${n} (pending)` : undefined,
    };
  });
}
