import { useEffect, useState, type CSSProperties } from "react";
import { BookOpen, Clapperboard, Drama, Film, Pencil, Sparkles, Swords, Tv, Clock } from "lucide-react";
import cosmos from "@/assets/wizard-cosmos.jpg";
import bridge from "@/assets/bridge.jpg";
import dragon from "@/assets/dragon.jpg";
import flight from "@/assets/dragon-flight.jpg";
import portalAnime from "@/assets/portal-anime.jpg";
import portalMovies from "@/assets/portal-movies.jpg";
import portalManga from "@/assets/portal-manga.jpg";
import portalComics from "@/assets/portal-comics.jpg";
import portalShows from "@/assets/portal-shows.jpg";
import portalNovels from "@/assets/portal-novels.jpg";
import worldAction from "@/assets/world-action.jpg";
import worldScifi from "@/assets/world-scifi.jpg";
import worldRomance from "@/assets/world-romance.jpg";
import worldComedy from "@/assets/world-comedy.jpg";
import worldHistory from "@/assets/world-history.jpg";
import worldPsychological from "@/assets/world-psychological.jpg";
import worldThriller from "@/assets/world-thriller.jpg";
import { ENVIRONMENTS, LENGTHS, PORTALS, WORLDS, type EnvSpec, type Environment, type MediaType, type World } from "@/lib/cineguide/data";
import { Heading, NavBar, Scene } from "./Backdrop";

/* ---------- 1. Wizard intro ---------- */
export function IntroStage({ onBegin }: { onBegin: () => void }) {
  return (
    <Scene image={cosmos}>
      <button className="btn-ghost-rune absolute right-5 top-5 z-20" onClick={onBegin}>Skip intro ⏭</button>
      {/* staff glow positioned over the wizard's staff */}
      <div className="pointer-events-none absolute left-[22.5%] top-[31%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.9 0.15 80 / 90%), transparent 65%)", animation: "cg-staff-glow 2.2s ease-in-out infinite" }} />
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path d="M22.5 31 C 40 20, 55 25, 72 38" fill="none" stroke="oklch(0.85 0.14 80 / 70%)" strokeWidth=".3"
          strokeDasharray="2 2" style={{ animation: "cg-dash 2s linear infinite" }} />
      </svg>
      <div className="m-auto flex max-w-xl flex-col items-center px-6 text-center">
        <div className="animate-fade-up text-3xl text-gold">✦</div>
        <h1 className="animate-fade-up text-gilt text-5xl font-semibold md:text-7xl" style={{ animationDelay: ".2s" }}>CINEGUIDE</h1>
        <p className="animate-fade-up mt-3 font-display text-lg text-gold-soft md:text-xl" style={{ animationDelay: ".5s" }}>The 12-Piece Discovery Journey</p>
        <p className="animate-fade-up mt-6 text-lg italic text-foreground/85" style={{ animationDelay: ".9s" }}>Because every story deserves a journey…</p>
        <button className="btn-rune animate-fade-up mt-8" style={{ animationDelay: "1.3s" }} onClick={onBegin}>Begin your journey →</button>
      </div>
    </Scene>
  );
}

/* ---------- 2. Portals ---------- */
const PORTAL_ICON: Record<MediaType, typeof Film> = { anime: Swords, movies: Film, manga: Drama, comics: Sparkles, shows: Tv, novels: BookOpen };
const PORTAL_ART: Record<MediaType, string> = { anime: portalAnime, movies: portalMovies, manga: portalManga, comics: portalComics, shows: portalShows, novels: portalNovels };

export function PortalStage({ value, onPick, onBack }: { value?: MediaType | undefined; onPick: (m: MediaType) => void; onBack: () => void }) {
  const [entering, setEntering] = useState<MediaType | null>(null);
  const pick = (m: MediaType) => {
    if (entering) return;
    setEntering(m);
    setTimeout(() => onPick(m), 1100);
  };
  return (
    <Scene image={cosmos} imageAnim={entering ? "zoom-in 1.1s ease-in forwards" : undefined}>
      <Heading sub="Choose the universe you wish to enter">Six Universes Await…</Heading>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-5 pt-10 sm:grid-cols-3 lg:grid-cols-6">
        {PORTALS.map((p, i) => {
          const Icon = PORTAL_ICON[p.id];
          const sel = entering === p.id || (!entering && value === p.id);
          const dim = entering && entering !== p.id;
          return (
            <button key={p.id} onClick={() => pick(p.id)} aria-label={`Enter ${p.label} portal`}
              className="group relative flex flex-col items-center transition-all duration-700"
              style={{ opacity: dim ? 0.15 : 1, transform: entering === p.id ? "scale(1.6)" : dim ? "scale(.85)" : undefined, filter: dim ? "blur(3px)" : undefined, animation: `cg-fade-up .8s ${i * 0.08}s both` }}>
              <div className="relative aspect-[3/4.4] w-full overflow-hidden rounded-t-full border-2 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                style={{ borderColor: `oklch(0.8 0.17 ${p.hue})`, boxShadow: `0 0 ${sel ? 60 : 28}px oklch(0.7 0.2 ${p.hue} / ${sel ? 80 : 45}%), inset 0 0 40px oklch(0.6 0.2 ${p.hue} / 50%)`,
                  background: `oklch(0.12 0.05 ${p.hue})` }}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                  <img src={PORTAL_ART[p.id]} alt="" loading="lazy" width={704} height={1024} className="h-full w-full object-cover animate-kenburns" />
                </div>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, oklch(0.75 0.2 ${p.hue} / 18%), transparent 40%, oklch(0.12 0.05 ${p.hue} / 55%) 100%)` }} />
                <div className="absolute inset-[-40%] opacity-30" style={{ background: `conic-gradient(from 0deg, transparent, oklch(0.9 0.15 ${p.hue} / 60%), transparent 30%)`, animation: `cg-portal-spin ${8 + i}s linear infinite` }} />
              </div>
              <div className="gilded -mt-3 w-[85%] rounded-lg py-2 text-center">
                <div className="flex items-center justify-center gap-1.5 font-display text-sm text-gold-soft">
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />{p.label}
                </div>
                <div className="hidden text-xs text-muted-foreground md:block">{p.tagline}</div>
              </div>
            </button>
          );
        })}
      </div>
      <NavBar onBack={onBack} />
    </Scene>
  );
}

/* ---------- 3. World cards ---------- */
function WorldFx({ fx, hue }: { fx: string; hue: number }) {
  const c = `oklch(0.85 0.17 ${hue})`;
  const dots = Array.from({ length: 8 }, (_, i) => i);
  switch (fx) {
    case "sparks": return <>{dots.map((i) => <span key={i} className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}`, ["--dx" as string]: `${Math.cos(i) * 50}px`, ["--dy" as string]: `${Math.sin(i) * 60}px`, animation: `cg-spark 1.4s ${i * 0.17}s ease-out infinite` } as CSSProperties} />)}</>;
    case "orbit": return <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed" style={{ borderColor: c, animation: "cg-portal-spin 6s linear infinite" }}><span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} /></div>;
    case "petals": return <>{dots.map((i) => <span key={i} className="absolute top-0 h-2 w-3" style={{ left: `${i * 12}%`, borderRadius: "100% 0", background: c, animation: `cg-drift ${5 + i % 3}s ${-i}s linear infinite` }} />)}</>;
    case "bounce": return <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 text-2xl opacity-80" style={{ animation: "cg-wobble 1s ease-in-out infinite" }}>☺</div>;
    case "dust": return <>{dots.map((i) => <span key={i} className="absolute h-0.5 w-0.5 rounded-full" style={{ left: `${10 + i * 11}%`, background: c, animation: `cg-rise ${7 + i}s ${-i}s linear infinite` }} /> )}<div className="absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg, oklch(0.6 0.08 70 / 30%) 0 1px, transparent 1px 6px)" }} /></>;
    case "shadows": return <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, oklch(0.05 0 0 / 80%), transparent 50%), radial-gradient(ellipse at 70% 50%, ${c}, transparent 45%)`, animation: "cg-shadow-shift 5s ease-in-out infinite" }} />;
    case "flicker": default: return <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 25%, ${c}, transparent 55%)`, animation: "cg-flicker 2.6s linear infinite" }} />;
  }
}

const WORLD_ART: Record<World, string> = { action: worldAction, scifi: worldScifi, romance: worldRomance, comedy: worldComedy, history: worldHistory, psychological: worldPsychological, thriller: worldThriller };

export function WorldStage({ value, onChange, onNext, onBack }: { value?: World | undefined; onChange: (w: World) => void; onNext: () => void; onBack: () => void }) {
  return (
    <Scene image={cosmos}>
      <Heading>Which world do you wish to explore?</Heading>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-4 px-5 pt-10 sm:grid-cols-4 lg:grid-cols-7">
        {WORLDS.map((w, i) => {
          const sel = value === w.id;
          return (
            <button key={w.id} onClick={() => onChange(w.id)} aria-pressed={sel}
              className={`gilded group relative aspect-[3/4.2] overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-2 ${sel ? "gilded-active -translate-y-2 scale-105" : ""}`}
              style={{ animation: `cg-fade-up .7s ${i * 0.06}s both` }}>
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <img src={WORLD_ART[w.id]} alt="" loading="lazy" width={704} height={1024} className="h-full w-full object-cover animate-kenburns" />
              </div>
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, oklch(0.45 0.16 ${w.hue} / 22%), transparent 45%, oklch(0.15 0.06 ${w.hue} / 70%) 92%)` }} />
              <div className="absolute inset-0 overflow-hidden"><WorldFx fx={w.fx} hue={w.hue} /></div>
              <div className="absolute inset-x-0 bottom-0 p-3 text-center font-display text-sm text-gold-soft">{w.label}</div>
            </button>
          );
        })}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </Scene>
  );
}

/* ---------- 4. Environment ---------- */
export function EnvironmentStage({ value, onChange, onNext, onBack }: { value?: Environment | undefined; onChange: (e: Environment) => void; onNext: () => void; onBack: () => void }) {
  const [more, setMore] = useState(false);
  const list = more ? ENVIRONMENTS : ENVIRONMENTS.slice(0, 7);
  const env = ENVIRONMENTS.find((e) => e.id === value);
  return (
    <Scene image={bridge} env={env}>
      <Heading sub="This atmosphere will stay with you for the rest of the journey">What kind of atmosphere should accompany your journey?</Heading>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-4 px-5 pt-10">
        {list.map((e, i) => {
          const sel = value === e.id;
          return (
            <button key={e.id} onClick={() => onChange(e.id)} aria-pressed={sel}
              className={`gilded relative h-44 w-36 overflow-hidden rounded-xl text-left transition-all duration-500 hover:-translate-y-1.5 md:h-52 md:w-40 ${sel ? "gilded-active -translate-y-1.5" : ""}`}
              style={{ animation: `cg-fade-up .6s ${i * 0.05}s both` }}>
              <img src={bridge} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: e.filter }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: e.tint }} />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="font-display text-sm text-gold-soft">{e.label}</div>
                <div className="text-xs leading-tight text-foreground/80">{e.desc}</div>
              </div>
            </button>
          );
        })}
        {!more && <button className="btn-ghost-rune self-center" onClick={() => setMore(true)}>+ More atmospheres</button>}
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </Scene>
  );
}

/* ---------- 5. Length ---------- */
export function LengthStage({ media, env, value, onChange, onNext, onBack }: {
  media: MediaType; env?: EnvSpec | undefined; value?: number | undefined; onChange: (n: number) => void; onNext: () => void; onBack: () => void;
}) {
  const spec = LENGTHS[media];
  const def = spec.presets.find((p) => p.id === spec.defaultId)!.value;
  const current = value ?? def;
  useEffect(() => { if (value === undefined) onChange(def); }, [value, def, onChange]);
  const custom = !spec.presets.some((p) => p.value === current);
  const [showCustom, setShowCustom] = useState(custom);
  const pretty = spec.unit === "minutes" ? `${Math.floor(current / 60)}h ${current % 60 ? `${current % 60}m` : ""}` : `${current} ${spec.unit}`;
  const MediaIcon = media === "movies" ? Clapperboard : Clock;
  return (
    <Scene image={bridge} env={env}>
      <Heading sub={`For ${media}: measured in ${spec.unit} · ${spec.hint}`}>How long do you want your journey to be?</Heading>
      <div className="mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-4 px-5 pt-10">
        {spec.presets.map((p) => {
          const sel = !showCustom && p.value === current;
          return (
            <button key={p.id} onClick={() => { setShowCustom(false); onChange(p.value); }} aria-pressed={sel}
              className={`gilded flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-xl transition-all hover:-translate-y-1 ${sel ? "gilded-active" : ""}`}>
              <MediaIcon className="h-6 w-6 text-gold" />
              <span className="font-display text-xl text-gold-soft">{p.label}</span>
              <span className="text-sm text-muted-foreground">{p.sub}</span>
            </button>
          );
        })}
        <button onClick={() => setShowCustom(true)} aria-pressed={showCustom}
          className={`gilded flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-xl transition-all hover:-translate-y-1 ${showCustom ? "gilded-active" : ""}`}>
          <Pencil className="h-6 w-6 text-gold" /><span className="font-display text-lg text-gold-soft">Custom</span>
        </button>
      </div>
      {showCustom && (
        <div className="gilded mx-auto mt-6 w-[min(92%,28rem)] rounded-xl p-5 animate-fade-up">
          <label className="font-display text-sm text-gold-soft" htmlFor="len">Custom length ({spec.unit})</label>
          <input id="len" type="range" min={spec.min} max={spec.max} step={spec.step} value={current}
            onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full accent-gold" />
        </div>
      )}
      <div className="mt-8 text-center animate-fade-up">
        <div className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Your commitment</div>
        <div className="text-gilt font-display text-3xl">{pretty}</div>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">A preference, not a promise — your journey still holds 12 pieces.</p>
      </div>
      <NavBar onBack={onBack} onNext={onNext} nextLabel="Cross the bridge" />
    </Scene>
  );
}

/* ---------- 6. Bridge transition ---------- */
export function BridgeStage({ env, label, onDone }: { env?: EnvSpec | undefined; label: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 4200); return () => clearTimeout(t); }, [onDone]);
  return (
    <Scene image={bridge} env={env} imageAnim="cross-bridge 4.4s cubic-bezier(.5,0,.3,1) forwards">
      <button className="btn-ghost-rune absolute right-5 top-5 z-20" onClick={onDone}>Skip ⏭</button>
      <div className="ml-auto mr-8 mt-16 max-w-sm text-right md:mr-20">
        <p className="animate-fade-up font-display text-2xl text-gold-soft md:text-3xl">The journey awaits…</p>
        <p className="animate-fade-up mt-2 text-lg" style={{ animationDelay: ".6s" }}>Cross the bridge of commitment</p>
        <p className="animate-fade-up mt-1 text-gold" style={{ animationDelay: "1.1s" }}>{label}</p>
      </div>
    </Scene>
  );
}

/* ---------- 7. Dragon naming ---------- */
export function DragonStage({ env, name, reference, onName, onReference, onNext, onBack }: {
  env?: EnvSpec | undefined; name: string; reference: string; onName: (s: string) => void; onReference: (s: string) => void; onNext: () => void; onBack: () => void;
}) {
  return (
    <Scene image={bridge} env={env}>
      <div className="grid flex-1 items-center gap-6 md:grid-cols-2">
        <div className="relative mx-auto aspect-square w-[min(80vw,520px)] overflow-hidden rounded-full animate-float" style={{ boxShadow: "0 0 80px oklch(0.6 0.24 305 / 60%)" }}>
          <img src={dragon} alt="Your dragon companion" width={1280} height={1280} className="h-full w-full object-cover" />
        </div>
        <div className="px-6 text-center md:text-left">
          <h2 className="animate-fade-up font-display text-2xl text-gold-soft md:text-4xl">Every explorer needs a companion.<br />What shall we call yours?</h2>
          <label htmlFor="dragon" className="mt-6 block text-sm uppercase tracking-[0.25em] text-muted-foreground">Dragon's name · optional</label>
          <input id="dragon" value={name} onChange={(e) => onName(e.target.value)} maxLength={30} placeholder="Enter dragon's name…"
            className="gilded mt-2 w-full max-w-md rounded-full px-5 py-3 text-lg text-foreground outline-none placeholder:text-muted-foreground focus:gilded-active" />
          <label htmlFor="ref" className="mt-5 block text-sm uppercase tracking-[0.25em] text-muted-foreground">A title you love · optional</label>
          <input id="ref" value={reference} onChange={(e) => onReference(e.target.value)} maxLength={80} placeholder="Guides your Companion pieces"
            className="gilded mt-2 w-full max-w-md rounded-full px-5 py-3 text-lg text-foreground outline-none placeholder:text-muted-foreground" />
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <button className="btn-ghost-rune" onClick={onBack}>← Back</button>
            <button className="btn-ghost-rune" onClick={() => { onName(""); onNext(); }}>Skip</button>
            <button className="btn-rune" onClick={onNext}>Take flight →</button>
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 8. Flight ---------- */
export function FlightStage({ env, name, onDone }: { env?: EnvSpec | undefined; name: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t); }, [onDone]);
  return (
    <Scene image={flight} env={env} imageAnim="fly 4.6s cubic-bezier(.4,0,.2,1) forwards">
      <button className="btn-ghost-rune absolute right-5 top-5 z-20" onClick={onDone}>Skip ⏭</button>
      {[0, 1].map((i) => <div key={i} className="pointer-events-none absolute inset-x-[-20%] h-1/3 opacity-60 blur-2xl" style={{ top: `${i ? 65 : 10}%`, background: "radial-gradient(ellipse, oklch(0.95 0.03 40 / 70%), transparent 70%)", animation: `cg-fog ${4 + i * 2}s linear infinite alternate` }} />)}
      <div className="ml-auto mr-8 mt-20 text-right md:mr-24">
        <p className="animate-fade-up font-display text-2xl text-gold-soft md:text-4xl">{name ? `${name} spreads its wings…` : "Your dragon spreads its wings…"}</p>
        <p className="animate-fade-up mt-2 text-xl" style={{ animationDelay: ".8s" }}>Your journey begins now.</p>
      </div>
    </Scene>
  );
}
