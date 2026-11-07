import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowLeft, Feather } from "lucide-react";
import type { Category, Review, Title } from "@/data/mock-library";
import { getReviews } from "@/lib/review-service";
import { OpenBook } from "./open-book";
import { StaticStars } from "./star-rating";

export function ReadReviews({
  category,
  title,
  onBack,
}: {
  category: Category;
  title: Title;
  onBack: () => void;
}) {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getReviews(title).then((r) => {
      if (!cancelled) setReviews(r);
    });
    return () => {
      cancelled = true;
    };
  }, [title]);

  const leftReviews = reviews?.filter((_, i) => i % 2 === 0) ?? [];
  const rightReviews = reviews?.filter((_, i) => i % 2 === 1) ?? [];

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <Button variant="gold" size="natural"
        onClick={onBack}
        className="btn-gold mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-deco text-sm tracking-wider"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Search
      </Button>

      <h2 className="text-gold-gradient text-center font-deco text-2xl tracking-wide sm:text-3xl">
        {title.name}
      </h2>
      <p className="mt-1 text-center font-body text-sm italic text-ivory/70">
        {title.creator} · {title.year} — entries from the great journal
      </p>

      <div className="mt-8">
        {reviews === null ? (
          <p className="py-24 text-center font-display text-xl italic text-gold-bright/80 animate-flicker">
            Turning the pages…
          </p>
        ) : reviews.length === 0 ? (
          <OpenBook
            left={
              <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                <Feather className="h-10 w-10 text-bronze" strokeWidth={1.25} />
                <p className="mt-4 max-w-xs font-display text-xl italic text-ink/80">
                  No one has written about this story yet.
                </p>
              </div>
            }
            right={
              <div className="flex h-full min-h-64 items-center justify-center text-center">
                <p className="max-w-xs font-body text-sm text-ink/60">
                  Its pages await a first entry. Perhaps yours will be the one to begin them.
                </p>
              </div>
            }
          />
        ) : (
          <OpenBook
            left={<ReviewColumn reviews={leftReviews} momentLabel={category.momentLabel} />}
            right={<ReviewColumn reviews={rightReviews} momentLabel={category.momentLabel} />}
          />
        )}
      </div>
    </div>
  );
}

function ReviewColumn({ reviews, momentLabel }: { reviews: Review[]; momentLabel: string }) {
  return (
    <div className="max-h-[28rem] space-y-8 overflow-y-auto pr-2">
      {reviews.map((review) => (
        <article key={review.id} className="border-b border-bronze/30 pb-6 last:border-none">
          <header className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-deco text-base tracking-wider text-ink">{review.reviewer}</h3>
            <StaticStars value={review.rating} />
          </header>

          <p className="mt-3 font-deco text-xs uppercase tracking-[0.25em] text-bronze">Liked</p>
          <p className="mt-1 font-body text-sm leading-relaxed text-ink/90">{review.liked}</p>

          <p className="mt-3 font-deco text-xs uppercase tracking-[0.25em] text-bronze">Disliked</p>
          <p className="mt-1 font-body text-sm leading-relaxed text-ink/90">{review.disliked}</p>

          <p className="mt-3 font-deco text-xs uppercase tracking-[0.25em] text-bronze">
            {momentLabel}
          </p>
          <p className="mt-1 font-display text-base italic leading-relaxed text-ink">
            “{review.moment}”
          </p>
        </article>
      ))}
    </div>
  );
}
