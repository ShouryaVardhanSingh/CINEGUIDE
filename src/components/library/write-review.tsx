import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import type { Category, Title } from "@/data/mock-library";
import { submitReview, validateReview, type ReviewDraft } from "@/lib/review-service";
import { OpenBook } from "./open-book";
import { StarRating } from "./star-rating";

export function WriteReview({
  category,
  title,
  onDone,
  onBack,
}: {
  category: Category;
  title: Title;
  onDone: () => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState<ReviewDraft>({ rating: 0, liked: "", disliked: "", moment: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewDraft, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof ReviewDraft) => (value: string | number) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validateReview(draft);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    await submitReview(title, draft);
    onDone();
  };

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <Button variant="gold" size="natural"
        onClick={onBack}
        className="btn-gold mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-deco text-sm tracking-wider"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <h2 className="text-gold-gradient text-center font-deco text-2xl tracking-wide sm:text-3xl">
        {title.name}
      </h2>
      <p className="mt-1 text-center font-body text-sm italic text-ivory/70">
        {title.creator} · {title.year} — record your thoughts in the great journal
      </p>

      <div className="mt-8">
        <OpenBook
          left={
            <div className="space-y-7">
              <section>
                <h3 className="font-deco text-lg tracking-wider text-ink">Your Rating</h3>
                <div className="mt-2">
                  <StarRating value={draft.rating} onChange={set("rating")} />
                </div>
                {errors.rating && <FieldError message={errors.rating} />}
              </section>

              <section>
                <h3 className="font-deco text-lg tracking-wider text-ink">What did you like?</h3>
                <textarea
                  value={draft.liked}
                  onChange={(e) => set("liked")(e.target.value)}
                  placeholder="Share what you loved about this story..."
                  rows={6}
                  className="ink-field mt-2 w-full p-3"
                />
                {errors.liked && <FieldError message={errors.liked} />}
              </section>
            </div>
          }
          right={
            <div className="space-y-7">
              <section>
                <h3 className="font-deco text-lg tracking-wider text-ink">What didn't you like?</h3>
                <textarea
                  value={draft.disliked}
                  onChange={(e) => set("disliked")(e.target.value)}
                  placeholder="Tell us what could have been better..."
                  rows={5}
                  className="ink-field mt-2 w-full p-3"
                />
                {errors.disliked && <FieldError message={errors.disliked} />}
              </section>

              <section>
                <h3 className="font-deco text-lg tracking-wider text-ink">{category.momentLabel}</h3>
                <textarea
                  value={draft.moment}
                  onChange={(e) => set("moment")(e.target.value)}
                  placeholder={category.momentPlaceholder}
                  rows={5}
                  className="ink-field mt-2 w-full p-3"
                />
                {errors.moment && <FieldError message={errors.moment} />}
              </section>
            </div>
          }
        />
      </div>

      <div className="mt-10 text-center">
        <Button variant="gold" size="natural"
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-gold animate-glow-pulse inline-flex items-center gap-3 rounded-md px-10 py-4 font-deco text-lg tracking-widest disabled:opacity-60"
        >
          <Send className="h-5 w-5" />
          {submitting ? "Sealing the page…" : "Submit Review"}
        </Button>
      </div>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-1.5 font-body text-sm italic text-destructive">
      {message}
    </p>
  );
}
