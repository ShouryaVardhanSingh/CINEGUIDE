import { describe, expect, it } from "vitest";
import { rankTreasures } from "@/lib/one-piece-catalog";
import { MEDIA_TYPES } from "@/lib/one-piece";

describe("treasure ranking", () => {
  it("only recommends the chosen media type", () => {
    for (const m of MEDIA_TYPES) {
      const r = rankTreasures(m, "fantasy", [], "rush");
      expect(r.length).toBeGreaterThan(0);
      expect(r.every((t) => t.media === m)).toBe(true);
    }
  });
  it("puts the best path + crew + experience match first", () => {
    expect(rankTreasures("movies", "scifi", ["psychological"], "think")[0].title).toBe("Interstellar");
  });
});
