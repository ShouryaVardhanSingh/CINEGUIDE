import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import intro from "@/assets/op-intro.jpg";
import mMovies from "@/assets/map-movies.jpg";
import mAnime from "@/assets/map-anime.jpg";
import mShows from "@/assets/map-shows.jpg";
import mManga from "@/assets/map-manga.jpg";
import mComics from "@/assets/map-comics.jpg";
import mNovels from "@/assets/map-novels.jpg";
import { INTRO_SEEN_KEY, isMediaType, type MediaType } from "@/lib/one-piece";
import { EXPERIENCES, GENRES, PATHS, type Experience, type Path } from "@/lib/one-piece-catalog";
import { Voyage } from "@/components/one-piece/Voyage";

type Search = { media?: MediaType; ship?: Path | undefined; crew?: string | undefined; isle?: Experience | undefined; step?: Step | undefined };
type Step = "ships" | "crew" | "isles" | "treasure";
const STEPS: Step[] = ["ships", "crew", "isles", "treasure"];

export const Route = createFileRoute("/one-piece")({
  validateSearch: (s: Record<string, unknown>): Search => {
    if (!isMediaType(s["media"])) return {};
    const out: Search = { media: s["media"] };
    if ((PATHS as readonly unknown[]).includes(s["ship"])) out.ship = s["ship"] as Path;
    if (typeof s["crew"] === "string") out.crew = s["crew"].split(",").filter((g) => (GENRES as readonly string[]).includes(g)).join(",") || undefined;
    if ((EXPERIENCES as readonly unknown[]).includes(s["isle"])) out.isle = s["isle"] as Experience;
    if ((STEPS as unknown[]).includes(s["step"])) out.step = s["step"] as Step;
    return out;
  },
  head: () => ({
    meta: [
      { title: "ONE PIECE — CINEGUIDE Voyage" },
      { name: "description", content: "Sail through six storytelling worlds to find one personalised recommendation." },
      { property: "og:title", content: "ONE PIECE — CINEGUIDE Voyage" },
      { property: "og:description", content: "Six worlds. Countless stories. One treasure waiting to be found." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnePiece,
});

const MAPS: { id: MediaType; label: string; img: string; tag: string; tilt: string }[] = [
  { id: "movies", label: "Movies", img: mMovies, tag: "The Silver Screen Citadel", tilt: "-rotate-2" },
  { id: "anime", label: "Anime", img: mAnime, tag: "Isle of Blossoms", tilt: "rotate-1" },
  { id: "shows", label: "Shows", img: mShows, tag: "The Broadcast Metropolis", tilt: "-rotate-1" },
  { id: "manga", label: "Manga", img: mManga, tag: "Gate of Ink & Snow", tilt: "rotate-2" },
  { id: "comics", label: "Comics", img: mComics, tag: "Panel City", tilt: "-rotate-1" },
  { id: "novels", label: "Novels", img: mNovels, tag: "The Library Spires", tilt: "rotate-1" },
];

type Stage = "loading" | "intro" | "maps" | "leaving" | "ships";

function OnePiece() {
  const search = Route.useSearch();
  const { media } = search;
  const navigate = Route.useNavigate();
  const [stage, setStage] = useState<Stage>("loading");
  const [picked, setPicked] = useState<MediaType | null>(media ?? null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (media) return setStage("ships");
    const seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    setStage(seen ? "maps" : "intro");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const endIntro = useCallback(() => {
    window.clearTimeout(timer.current);
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    setStage("maps");
  }, []);

  useEffect(() => {
    if (stage !== "intro") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(endIntro, reduced ? 1500 : 7000);
    return () => window.clearTimeout(timer.current);
  }, [stage, endIntro]);

  const choose = (id: MediaType) => {
    setPicked(id);
    setStage("leaving");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      navigate({ search: { media: id } });
      setStage("ships");
    }, reduced ? 50 : 900);
  };

  const back = () => {
    navigate({ search: {} });
    setStage("maps");
  };

  if (stage === "loading") return <div className="min-h-screen bg-abyss" />;
  if (stage === "intro") return <Intro onSkip={endIntro} />;
  if (stage === "ships" && media)
    return (
      <Voyage
        search={{ ...search, media }}
        mediaLabel={MAPS.find((m) => m.id === media)!.label}
        onUpdate={(patch) => navigate({ search: (prev) => ({ ...prev, ...patch }) })}
        onBackToMaps={back}
      />
    );
  return (
    <Maps
      leaving={stage === "leaving"}
      picked={picked}
      onChoose={choose}
      onReplay={() => setStage("intro")}
    />
  );
}

function Intro({ onSkip }: { onSkip: () => void }) {
  return (
    <main className="relative h-screen overflow-hidden bg-abyss" aria-label="Opening cinematic">
      <img src={intro} alt="A lone ship sails toward a mysterious island of castles" width={1920} height={1088}
        className="absolute inset-0 h-full w-full object-cover animate-cine-push" />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative flex h-full flex-col items-center justify-end pb-[14vh] text-center animate-cine-title">
        <p className="font-display text-sm tracking-[0.5em] text-gold/80">✦</p>
        <h1 className="mt-2 font-display text-5xl tracking-[0.12em] text-gold-gradient sm:text-7xl">CINEGUIDE</h1>
        <p className="mt-1 font-display text-xl tracking-[0.5em] text-gold sm:text-2xl">ONE PIECE</p>
        <p className="mt-6 max-w-sm text-sm text-foreground/80">Six worlds. Countless stories.<br />One treasure waiting to be found.</p>
      </div>
      <button onClick={onSkip} autoFocus
        className="absolute right-5 top-5 rounded-sm border border-gold/60 bg-abyss/50 px-4 py-2 text-sm text-gold backdrop-blur transition hover:bg-gold hover:text-abyss focus-visible:outline-none focus-visible:shadow-glow">
        Skip Intro ›
      </button>
    </main>
  );
}

function Maps({ leaving, picked, onChoose, onReplay }: {
  leaving: boolean; picked: MediaType | null; onChoose: (m: MediaType) => void; onReplay: () => void;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-abyss">
      <img src={intro} alt="" width={1920} height={1088} aria-hidden
        className={`fixed inset-0 h-full w-full scale-110 object-cover opacity-30 blur-[2px] transition-transform duration-1000 ${leaving ? "scale-150" : ""}`} />
      <div className="fixed inset-0 bg-veil" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-mist/10 to-transparent animate-cine-drift" />

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg tracking-[0.2em] text-gold-gradient">CINEGUIDE</Link>
          <button onClick={onReplay} className="text-xs tracking-widest text-muted-foreground underline-offset-4 hover:text-gold hover:underline">
            Replay intro
          </button>
        </header>
        <div className={`mt-10 text-center transition-opacity duration-700 ${leaving ? "opacity-0" : ""}`}>
          <h1 className="font-display text-3xl text-gold sm:text-5xl">The Six Maps</h1>
          <p className="mt-3 text-muted-foreground">Choose one world to begin your voyage.</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-3" role="list">
          {MAPS.map((m, i) => {
            const chosen = picked === m.id;
            const fade = leaving && !chosen;
            return (
              <li key={m.id} className="animate-cine-mist" style={{ animationDelay: `${i * 110}ms` }}>
                <button
                  onClick={() => onChoose(m.id)}
                  disabled={leaving}
                  aria-pressed={chosen}
                  className={`group relative block w-full ${m.tilt} rounded-md text-left shadow-artefact transition duration-700 ease-out
                    hover:-translate-y-2 hover:rotate-0 hover:shadow-glow focus-visible:rotate-0 focus-visible:shadow-glow focus-visible:outline-none active:scale-[0.97]
                    ${chosen ? "z-10 scale-110 rotate-0 shadow-glow" : ""} ${fade ? "translate-y-6 scale-90 opacity-0 blur-sm" : ""}`}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-md bg-parchment">
                    <img src={m.img} alt="" width={944} height={704} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-gradient-to-t from-abyss/95 via-abyss/60 to-transparent px-3 pb-3 pt-10 text-center">
                    <span className="block font-display text-lg text-gold sm:text-2xl">{m.label}</span>
                    <span className="hidden text-xs text-foreground/70 sm:block">{m.tag}</span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

