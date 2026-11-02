import { useMemo, useState } from "react";
import { Swords, Eye, Laugh, Heart, Ghost, Brain, Landmark, Flame, Waves, Sparkles, Star, RotateCcw, Check } from "lucide-react";
import ships from "@/assets/op-ships.jpg";
import deck from "@/assets/op-deck.jpg";
import treasure from "@/assets/op-treasure.jpg";
import isleRush from "@/assets/isle-adrenaline.jpg";
import isleFeel from "@/assets/isle-feel.jpg";
import isleThink from "@/assets/isle-think.jpg";
import isleSurprise from "@/assets/isle-surprise.jpg";
import type { MediaType } from "@/lib/one-piece";
import {
  EXP_LABEL, PATH_LABEL, rankTreasures, whyThis,
  type Experience, type Genre, type Path,
} from "@/lib/one-piece-catalog";

type Step = "ships" | "crew" | "isles" | "treasure";
type VoyageSearch = { media: MediaType; ship?: Path | undefined; crew?: string | undefined; isle?: Experience | undefined; step?: Step | undefined };
type Patch = Partial<Omit<VoyageSearch, "media">>;

const SHIPS: { id: Path; sail: string }[] = [
  { id: "fantasy", sail: "Dragon-sailed galleon" },
  { id: "superhero", sail: "The Phoenix crest" },
  { id: "scifi", sail: "Ringed-planet starship" },
  { id: "real", sail: "The world-mapped voyager" },
];

const CREW: { id: Genre; label: string; role: string; desc: string; Icon: typeof Swords }[] = [
  { id: "action", label: "Action", role: "The Blade", desc: "First into every storm, steel drawn.", Icon: Swords },
  { id: "thriller", label: "Thriller", role: "The Watcher", desc: "Reads every shadow on the horizon.", Icon: Eye },
  { id: "comedy", label: "Comedy", role: "The Jester", desc: "Keeps the crew laughing through squalls.", Icon: Laugh },
  { id: "romance", label: "Romance", role: "The Heartkeeper", desc: "Sails for love lost and found.", Icon: Heart },
  { id: "horror", label: "Horror", role: "The Wraith", desc: "Knows what lurks beneath the waves.", Icon: Ghost },
  { id: "psychological", label: "Psychological", role: "The Mindweaver", desc: "Charts the maze of the human mind.", Icon: Brain },
  { id: "historical", label: "Historical", role: "The Chronicler", desc: "Carries the logs of ages past.", Icon: Landmark },
];

const ISLES: { id: Experience; img: string; desc: string; Icon: typeof Swords }[] = [
  { id: "rush", img: isleRush, desc: "Excitement, tension, action and adventure.", Icon: Flame },
  { id: "feel", img: isleFeel, desc: "Emotional stories and powerful character journeys.", Icon: Heart },
  { id: "think", img: isleThink, desc: "Mysteries, complex ideas and psychological depth.", Icon: Waves },
  { id: "surprise", img: isleSurprise, desc: "Unexpected discoveries outside your usual waters.", Icon: Star },
];

const btnGhost =
  "rounded-sm border border-gold/50 bg-abyss/50 px-4 py-2 text-sm text-gold backdrop-blur transition hover:bg-gold hover:text-abyss focus-visible:outline-none focus-visible:shadow-glow";
const btnGold =
  "rounded-sm bg-gold px-6 py-2.5 font-display tracking-[0.15em] text-abyss transition hover:brightness-110 focus-visible:outline-none focus-visible:shadow-glow disabled:cursor-not-allowed disabled:opacity-40";

export function Voyage({ search, mediaLabel, onUpdate, onBackToMaps }: {
  search: VoyageSearch; mediaLabel: string; onUpdate: (p: Patch) => void; onBackToMaps: () => void;
}) {
  const crew = (search.crew ? search.crew.split(",") : []) as Genre[];
  let step: Step = search.step ?? "ships";
  if (step !== "ships" && !search.ship) step = "ships";
  if (step === "treasure" && !search.isle) step = "isles";

  const bg = { ships, crew: deck, isles: ships, treasure }[step];

  return (
    <main key={step} className="relative min-h-screen overflow-hidden bg-abyss animate-cine-zoom">
      <img src={bg} alt="" aria-hidden width={1920} height={1088}
        className={`fixed inset-0 h-full w-full object-cover ${step === "isles" ? "opacity-20 blur-sm" : "opacity-60"}`} />
      <div className="fixed inset-0 bg-veil" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:py-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Trail mediaLabel={mediaLabel} search={search} crew={crew} />
        </header>
        {step === "ships" && (
          <ShipsStep media={mediaLabel} selected={search.ship} onBack={onBackToMaps}
            onPick={(ship) => onUpdate({ ship, step: "crew" })} />
        )}
        {step === "crew" && (
          <CrewStep initial={crew} onBack={(c) => onUpdate({ crew: c.join(",") || undefined, step: "ships" })}
            onContinue={(c) => onUpdate({ crew: c.join(",") || undefined, step: "isles" })} />
        )}
        {step === "isles" && (
          <IslesStep initial={search.isle} onBack={(i) => onUpdate({ isle: i, step: "crew" })}
            onContinue={(i) => onUpdate({ isle: i, step: "treasure" })} />
        )}
        {step === "treasure" && search.ship && search.isle && (
          <TreasureStep media={search.media} mediaLabel={mediaLabel} path={search.ship} crew={crew} exp={search.isle}
            onBack={() => onUpdate({ step: "isles" })} onRestart={onBackToMaps} />
        )}
      </div>
    </main>
  );
}

function Trail({ mediaLabel, search, crew }: { mediaLabel: string; search: VoyageSearch; crew: Genre[] }) {
  const items = [mediaLabel, search.ship && PATH_LABEL[search.ship], crew.length ? `${crew.length} crew` : null, search.isle && EXP_LABEL[search.isle]].filter(Boolean);
  return (
    <ol className="flex flex-wrap gap-2 text-[11px] tracking-[0.2em] text-gold" aria-label="Your voyage so far">
      {items.map((t, i) => (
        <li key={i} className="rounded-full border border-gold/40 bg-abyss/60 px-3 py-1 uppercase">{t}</li>
      ))}
    </ol>
  );
}

function StageTitle({ chapter, title, sub }: { chapter: string; title: string; sub: string }) {
  return (
    <div className="text-center">
      <p className="text-sm tracking-[0.3em] text-muted-foreground">{chapter}</p>
      <h1 className="mt-2 font-display text-3xl text-gold sm:text-5xl">{title}</h1>
      <p className="mt-3 text-foreground/80">{sub}</p>
    </div>
  );
}

function ShipsStep({ media, selected, onPick, onBack }: { media: string; selected?: Path | undefined; onPick: (p: Path) => void; onBack: () => void }) {
  return (
    <>
      <div className="mt-4"><button onClick={onBack} className={btnGhost}>‹ Back to the maps</button></div>
      <div className="mt-auto pt-24">
        <StageTitle chapter="CHAPTER II" title="The Four Ships" sub={`Choose your path through the world of ${media}.`} />
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SHIPS.map((s, i) => (
            <li key={s.id} className="animate-cine-mist" style={{ animationDelay: `${200 + i * 120}ms` }}>
              <button onClick={() => onPick(s.id)} aria-pressed={selected === s.id}
                className={`w-full rounded-md border bg-abyss/70 px-4 py-4 font-display text-lg text-gold backdrop-blur transition hover:-translate-y-1 hover:shadow-glow focus-visible:shadow-glow focus-visible:outline-none active:scale-95 ${selected === s.id ? "border-gold shadow-glow" : "border-gold/40"}`}>
                {PATH_LABEL[s.id]}
                <span className="mt-1 block font-sans text-xs text-muted-foreground">{s.sail}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CrewStep({ initial, onBack, onContinue }: { initial: Genre[]; onBack: (c: Genre[]) => void; onContinue: (c: Genre[]) => void }) {
  const [sel, setSel] = useState<Genre[]>(initial);
  const toggle = (g: Genre) => setSel((s) => (s.includes(g) ? s.filter((x) => x !== g) : [...s, g]));
  return (
    <div className="mt-10 flex flex-1 flex-col">
      <StageTitle chapter="CHAPTER III" title="Recruit Your Crew" sub="Select the genres that sail with you — as many as you like." />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {CREW.map((c, i) => {
          const on = sel.includes(c.id);
          return (
            <li key={c.id} className="animate-cine-mist" style={{ animationDelay: `${i * 80}ms` }}>
              <button onClick={() => toggle(c.id)} aria-pressed={on}
                className={`relative flex h-full w-full flex-col items-center rounded-md border px-3 pb-4 pt-6 text-center backdrop-blur transition duration-300 hover:-translate-y-1 focus-visible:shadow-glow focus-visible:outline-none active:scale-95 ${on ? "border-gold bg-abyss/85 shadow-glow" : "border-gold/30 bg-abyss/60 opacity-85"}`}>
                {on && <Check aria-hidden className="absolute right-2 top-2 h-4 w-4 text-gold" />}
                <span className={`grid h-16 w-16 place-items-center rounded-full border ${on ? "border-gold bg-gold text-abyss" : "border-gold/50 text-gold"} transition`}>
                  <c.Icon className="h-7 w-7" aria-hidden />
                </span>
                <span className="mt-3 font-display text-base text-gold">{c.label}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{c.role}</span>
                <span className="mt-2 text-xs text-foreground/75">{c.desc}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-10">
        <button onClick={() => onBack(sel)} className={btnGhost}>‹ Back to the ships</button>
        <button onClick={() => onContinue(sel)} className={btnGold}>
          {sel.length ? `Set sail with ${sel.length}` : "Sail without crew"} ›
        </button>
      </div>
    </div>
  );
}

function IslesStep({ initial, onBack, onContinue }: { initial?: Experience | undefined; onBack: (i?: Experience) => void; onContinue: (i: Experience) => void }) {
  const [sel, setSel] = useState<Experience | undefined>(initial);
  return (
    <div className="mt-10 flex flex-1 flex-col">
      <StageTitle chapter="CHAPTER IV" title="The Islands of Experience" sub="What do you want to feel?" />
      <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4" role="radiogroup" aria-label="Experience">
        {ISLES.map((isle, i) => {
          const on = sel === isle.id;
          return (
            <li key={isle.id} className="animate-cine-mist" style={{ animationDelay: `${i * 130}ms` }}>
              <button role="radio" aria-checked={on} onClick={() => setSel(isle.id)}
                className={`group relative block w-full overflow-hidden rounded-md text-left shadow-artefact transition duration-500 focus-visible:shadow-glow focus-visible:outline-none active:scale-[0.98] ${on ? "scale-[1.03] shadow-glow" : sel ? "opacity-60 hover:opacity-100" : "hover:-translate-y-1"}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={isle.img} alt="" width={768} height={960} loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${on ? "animate-cine-bob" : ""}`} />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-abyss via-abyss/70 to-transparent px-3 pb-4 pt-14 text-center">
                  <isle.Icon className="mx-auto h-5 w-5 text-gold" aria-hidden />
                  <span className="mt-1 block font-display text-lg text-gold sm:text-xl">{EXP_LABEL[isle.id]}</span>
                  <span className="mt-1 hidden text-xs text-foreground/75 sm:block">{isle.desc}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-10">
        <button onClick={() => onBack(sel)} className={btnGhost}>‹ Back to the crew</button>
        <button disabled={!sel} onClick={() => sel && onContinue(sel)} className={btnGold}>Find the treasure ›</button>
      </div>
    </div>
  );
}

function TreasureStep({ media, mediaLabel, path, crew, exp, onBack, onRestart }: {
  media: MediaType; mediaLabel: string; path: Path; crew: Genre[]; exp: Experience; onBack: () => void; onRestart: () => void;
}) {
  const ranked = useMemo(() => rankTreasures(media, path, crew, exp), [media, path, crew.join(), exp]); // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0);
  const t = ranked[idx % ranked.length];
  if (!t) return null;
  return (
    <div className="mt-10 flex flex-1 flex-col">
      <StageTitle chapter="CHAPTER V" title="The Treasure" sub="Your perfect recommendation awaits…" />
      <article key={t.title} aria-live="polite"
        className="mx-auto mt-10 grid w-full max-w-3xl gap-6 rounded-md border border-gold/50 bg-abyss/80 p-6 shadow-glow backdrop-blur animate-cine-zoom sm:grid-cols-[180px_1fr] sm:p-8">
        <div className="grid aspect-[2/3] place-items-center rounded-sm border border-gold/60 bg-gradient-to-b from-ocean to-abyss p-4 text-center">
          <Sparkles className="h-8 w-8 text-gold" aria-hidden />
          <span className="font-display text-sm tracking-[0.15em] text-gold">{t.title.toUpperCase()}</span>
        </div>
        <div>
          <h2 className="font-display text-2xl text-gold sm:text-3xl">{t.title}</h2>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {mediaLabel} · {PATH_LABEL[t.path]} · {t.year} · {t.genres.join(" · ")}
          </p>
          <p className="mt-4 text-foreground/90">{t.blurb}</p>
          <h3 className="mt-5 font-display text-gold">Why this?</h3>
          <p className="mt-1 text-sm text-foreground/80">{whyThis(t, path, crew, exp)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`https://www.google.com/search?q=${encodeURIComponent(`${t.title} ${t.year}`)}`} target="_blank" rel="noreferrer" className={btnGold}>
              View details ›
            </a>
            {ranked.length > 1 && (
              <button onClick={() => setIdx((i) => i + 1)} className={btnGhost}>
                <RotateCcw className="mr-1 inline h-4 w-4" aria-hidden />Get another treasure
              </button>
            )}
          </div>
        </div>
      </article>
      <div className="mt-auto flex items-center justify-between gap-3 pt-10">
        <button onClick={onBack} className={btnGhost}>‹ Back to the islands</button>
        <button onClick={onRestart} className={btnGhost}>New voyage</button>
      </div>
    </div>
  );
}
