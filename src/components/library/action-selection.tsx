import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Feather } from "lucide-react";
import libraryHall from "@/assets/library-hall.jpg";
import quill from "@/assets/peacock-quill.png";
import type { Category } from "@/data/mock-library";
import { Particles } from "./particles";

export type ReviewMode = "write" | "read";

export function ActionSelection({
  category,
  onSelect,
  onBack,
}: {
  category: Category;
  onSelect: (mode: ReviewMode) => void;
  onBack: () => void;
}) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img src={libraryHall} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-chocolate/70" />
      <div className="vignette absolute inset-0" />
      <Particles count={16} />

      <div className="absolute left-4 top-6 z-20 sm:left-8">
        <Button variant="gold" size="natural"
          onClick={onBack}
          className="btn-gold inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-deco text-sm tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
      </div>

      <img
        src={quill}
        alt=""
        aria-hidden
        className="absolute -right-8 bottom-0 hidden w-56 rotate-12 opacity-80 lg:block"
      />

      <div className="animate-rise relative z-10 mx-4 w-full max-w-3xl">
        <div className="parchment gold-frame rounded-lg px-6 py-10 sm:px-12">
          <p className="text-center font-deco text-sm uppercase tracking-[0.3em] text-bronze">
            The {category.name} Shelf
          </p>
          <h2 className="mt-2 text-center font-deco text-3xl tracking-wide text-ink sm:text-4xl">
            What would you like to do?
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Button variant="ghost" size="natural"
              onClick={() => onSelect("write")}
              className="dark-panel group rounded-lg border border-gold/60 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
            >
              <Feather className="mx-auto h-10 w-10 text-gold transition-transform duration-300 group-hover:-rotate-12" strokeWidth={1.25} />
              <span className="mt-4 block font-deco text-xl tracking-wider text-gold-bright">
                Write a Review
              </span>
              <span className="mt-2 block font-body text-sm text-ivory/75">
                Share your thoughts, opinions and ratings.
              </span>
            </Button>

            <Button variant="ghost" size="natural"
              onClick={() => onSelect("read")}
              className="dark-panel group rounded-lg border border-gold/60 px-6 py-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-glow)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
            >
              <BookOpen className="mx-auto h-10 w-10 text-gold transition-transform duration-300 group-hover:scale-110" strokeWidth={1.25} />
              <span className="mt-4 block font-deco text-xl tracking-wider text-gold-bright">
                Read Reviews
              </span>
              <span className="mt-2 block font-body text-sm text-ivory/75">
                Discover what other readers and viewers have to say.
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
