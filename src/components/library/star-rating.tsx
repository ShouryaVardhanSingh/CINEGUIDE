import { useState } from "react";
import { Star } from "lucide-react";

export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="Your rating out of five stars"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          className="rounded-sm p-0.5 transition-transform duration-150 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        >
          <Star
            className="h-8 w-8 transition-colors"
            fill={active >= n ? "var(--gold)" : "transparent"}
            strokeWidth={1.5}
            style={{ color: active >= n ? "var(--bronze)" : "oklch(0.45 0.06 55 / 60%)" }}
          />
        </button>
      ))}
    </div>
  );
}

export function StaticStars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="h-4 w-4"
          fill={value >= n ? "var(--gold)" : "transparent"}
          strokeWidth={1.5}
          style={{ color: value >= n ? "var(--bronze)" : "oklch(0.45 0.06 55 / 60%)" }}
        />
      ))}
    </span>
  );
}
