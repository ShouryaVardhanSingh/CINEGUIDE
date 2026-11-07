import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowLeft, BookMarked, Search } from "lucide-react";
import rotunda from "@/assets/rotunda.jpg";
import { POPULAR, type Category, type Title } from "@/data/mock-library";
import { searchTitles } from "@/lib/review-service";
import { Particles } from "./particles";

export function TitleSearch({
  category,
  onSelect,
  onBack,
}: {
  category: Category;
  onSelect: (title: Title) => void;
  onBack: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Title[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    let cancelled = false;
    searchTitles(category.id, query).then((r) => {
      if (!cancelled) setResults(r);
    });
    return () => {
      cancelled = true;
    };
  }, [category.id, query]);

  const popular = POPULAR[category.id];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img src={rotunda} alt="" className="absolute inset-0 h-full w-full object-cover" />
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

      <div className="animate-rise relative z-10 mx-4 w-full max-w-2xl">
        <div className="parchment gold-frame rounded-lg px-6 py-10 sm:px-12">
          <p className="text-center font-deco text-sm uppercase tracking-[0.3em] text-bronze">
            Browsing {category.name}
          </p>
          <h2 className="mt-2 text-center font-deco text-3xl tracking-wide text-ink sm:text-4xl">
            Which story shall we open?
          </h2>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(true);
            }}
          >
            <label className="relative flex-1">
              <span className="sr-only">Search {category.searchNoun}</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-bronze" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(true);
                }}
                placeholder={`Search ${category.searchNoun}…`}
                className="ink-field w-full py-3.5 pl-12 pr-4"
                autoFocus
              />
            </label>
            <Button variant="gold" size="natural"
              type="submit"
              className="btn-gold rounded-md px-8 py-3.5 font-deco tracking-widest"
            >
              Search
            </Button>
          </form>

          {query.trim() === "" && (
            <div className="mt-8">
              <p className="text-center font-body text-sm italic text-ink/70">
                …or try something popular:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {popular.map((name) => (
                  <Button variant="ghost" size="natural"
                    key={name}
                    onClick={() => {
                      setQuery(name);
                      setSearched(true);
                    }}
                    className="rounded-full border border-bronze/60 px-4 py-1.5 font-body text-sm text-ink transition-all hover:border-bronze hover:bg-ivory/40 hover:shadow-[0_0_14px_oklch(0.58_0.11_60/35%)]"
                  >
                    {name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {searched && query.trim() !== "" && (
            <div className="mt-8">
              {results.length === 0 ? (
                <p className="text-center font-body italic text-ink/70">
                  No story by that name rests on this shelf — try another.
                </p>
              ) : (
                <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {results.map((title) => (
                    <li key={title.id}>
                      <Button variant="ghost" size="natural"
                        onClick={() => onSelect(title)}
                        className="group flex w-full items-center gap-3 rounded-md border border-bronze/40 bg-ivory/30 px-4 py-3 text-left transition-all hover:border-bronze hover:bg-ivory/60 hover:shadow-[0_0_16px_oklch(0.58_0.11_60/30%)]"
                      >
                        <BookMarked className="h-5 w-5 shrink-0 text-bronze" />
                        <span className="flex-1">
                          <span className="block font-display text-lg text-ink">
                            {title.name}
                          </span>
                          <span className="block font-body text-xs text-ink/60">
                            {title.creator} · {title.year}
                          </span>
                        </span>
                        <span className="font-deco text-xs uppercase tracking-widest text-bronze opacity-0 transition-opacity group-hover:opacity-100">
                          Open
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
