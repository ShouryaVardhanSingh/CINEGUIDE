import { useEffect, useState, type ReactNode } from "react";
import type { Title } from "@/data/mock-library";
import { Particles } from "./particles";

/**
 * Cinematic reveal: the selected title appears as a closed antique book,
 * its cover swings open, then the open-book content fades in.
 */
export function BookReveal({
  title,
  children,
}: {
  title: Title;
  children: ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpened(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  if (opened) return <>{children}</>;

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center" aria-live="polite">
      <Particles count={14} />
      <div className="animate-book-appear relative" style={{ perspective: "1600px" }}>
        {/* Book body (pages block under the cover) */}
        <div className="parchment gold-frame relative h-80 w-60 rounded-r-md rounded-l-sm sm:h-96 sm:w-72">
          <div className="absolute inset-y-4 left-3 w-px bg-bronze/30" />
          {/* Cover */}
          <div
            className="leather-cover animate-cover-open absolute inset-0 rounded-r-md rounded-l-sm border border-gold/70"
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="mb-4 h-px w-16 bg-gold/70" aria-hidden />
              <span className="font-deco text-xl leading-snug tracking-wider text-gold-bright sm:text-2xl">
                {title.name}
              </span>
              <span className="mt-3 font-body text-xs italic text-ivory/70">
                {title.creator} · {title.year}
              </span>
              <span className="mt-4 h-px w-16 bg-gold/70" aria-hidden />
            </div>
          </div>
        </div>
        <p className="mt-8 text-center font-display text-lg italic text-gold-bright/90 animate-flicker">
          Opening the story…
        </p>
      </div>
    </div>
  );
}
