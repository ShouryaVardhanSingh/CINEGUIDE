import { describe, expect, it } from "vitest";

import { validateReview } from "@/lib/review-service";

describe("Review validation", () => {
  it("rejects a review without a 1–5 star rating", () => {
    const errors = validateReview({ rating: 0, liked: "Great story", disliked: "Slow middle", moment: "The finale" });
    expect(errors.rating).toBeTruthy();
  });

  it("rejects a rating above 5", () => {
    const errors = validateReview({ rating: 6, liked: "Great story", disliked: "Slow middle", moment: "The finale" });
    expect(errors.rating).toBeTruthy();
  });

  it("requires all three written answers", () => {
    const errors = validateReview({ rating: 4, liked: "", disliked: "  ", moment: "" });
    expect(errors.liked).toBeTruthy();
    expect(errors.disliked).toBeTruthy();
    expect(errors.moment).toBeTruthy();
  });

  it("accepts a complete review", () => {
    const errors = validateReview({ rating: 5, liked: "Great story", disliked: "Slow middle", moment: "The finale" });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
