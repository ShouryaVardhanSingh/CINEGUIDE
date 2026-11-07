import { useState } from "react";
import { X } from "lucide-react";
import bridge from "@/assets/bridge.jpg";
import { CHAPTERS, PIECE_COLORS, type EnvSpec } from "@/lib/cineguide/data";
import type { Piece } from "@/lib/cineguide/recommend";
import { Scene } from "./Backdrop";

// Serpentine path positions (percent of a 100x100 box)
const POS = [
  [12, 10], [34, 10], [56, 10], [80, 16],
  [62, 34], [40, 34], [18, 40],
  [36, 58], [60, 58], [84, 66],
  [60, 84], [30, 88],
];
const PATH = "M12 10 L34 10 L56 10 Q80 10 80 16 Q80 34 62 34 L40 34 Q18 34 18 40 Q18 58 36 58 L60 58 Q84 58 84 66 Q84 84 60 84 L30 88";

export function JourneyStage({ env, pieces, dragonName, onBack }: { env?: EnvSpec | undefined; pieces: Piece[]; dragonName: string; onBack: () => void }) {
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<Piece | null>(null);
  const active = pieces.find((p) => p.index === (hover ?? 0));

  return (
    <Scene image={bridge} env={env} imageAnim="none">
      <div className="px-5 pt-8 text-center">
        <h2 className="font-display text-2xl text-gold-soft md:text-4xl">Your 12-Piece Journey</h2>
        <p className="mt-1 text-muted-foreground">{dragonName ? `Riding with ${dragonName}` : "Riding with your dragon"} · <span className="text-accent">Sample pieces — catalogue not yet connected</span></p>
      </div>

      {/* Desktop map */}
      <div className="relative mx-auto mt-6 hidden aspect-[16/9] w-full max-w-6xl md:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="trail" x1="0" y1="0" x2="0" y2="1">
              {PIECE_COLORS.map((c, i) => <stop key={i} offset={`${(i / 11) * 100}%`} stopColor={c} />)}
            </linearGradient>
          </defs>
          <path d={PATH} fill="none" stroke="url(#trail)" strokeWidth="1.2" opacity=".25" style={{ filter: "blur(1px)" }} />
          <path d={PATH} fill="none" stroke="url(#trail)" strokeWidth=".35" strokeDasharray="1.5 1.5" style={{ animation: "cg-dash 3s linear infinite" }} />
        </svg>
        {CHAPTERS.map((c) => {
          const [x, y] = POS[c.range[0] - 1]!;
          return <div key={c.name} className="absolute -translate-x-1/2 font-display text-xs uppercase tracking-widest text-muted-foreground" style={{ left: `${x}%`, top: `calc(${y}% - 44px)` }}>{c.name}</div>;
        })}
        {pieces.map((p, i) => <Marker key={p.index} piece={p} pos={POS[i]!} onHover={setHover} onOpen={setOpen} active={hover === p.index} />)}
        {active && (
          <div className="gilded pointer-events-none absolute w-64 rounded-xl p-4 animate-fade-up"
            style={{ left: `min(${POS[active.index - 1]![0]}%, calc(100% - 17rem))`, top: `calc(${POS[active.index - 1]![1]}% + 34px)` }}>
            <Summary p={active} />
          </div>
        )}
      </div>

      {/* Mobile vertical path */}
      <ol className="relative mx-auto mt-6 flex w-full max-w-md flex-col gap-4 px-6 md:hidden">
        <div className="absolute bottom-4 left-[2.6rem] top-4 w-0.5" style={{ background: `linear-gradient(${PIECE_COLORS.join(",")})` }} />
        {pieces.map((p, i) => (
          <li key={p.index}>
            <button onClick={() => setOpen(p)} className="relative flex w-full items-center gap-4 text-left">
              <Star color={PIECE_COLORS[i]!} n={p.index} big={p.index === 12} />
              <div className="gilded flex-1 rounded-xl px-4 py-2">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.chapter}</div>
                <div className="font-display text-gold-soft">{p.title}</div>
              </div>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-auto px-5 pb-6 pt-6 md:px-10"><button className="btn-ghost-rune" onClick={onBack}>← Back</button></div>

      {open && <Detail p={open} onClose={() => setOpen(null)} />}
    </Scene>
  );
}

function Star({ color, n, big, active }: { color: string; n: number; big?: boolean; active?: boolean }) {
  const size = big ? 64 : 42;
  return (
    <span className={`relative grid shrink-0 place-items-center rounded-full font-display text-sm font-bold text-night transition-transform duration-300 ${active ? "scale-125" : ""} ${big ? "animate-pulse-glow" : ""}`}
      style={{ width: size, height: size, background: `radial-gradient(circle, oklch(0.98 0.03 90), ${color} 60%)`, boxShadow: `0 0 ${active || big ? 34 : 16}px ${color}, 0 0 ${big ? 70 : 30}px ${color}` }}>
      {big && <span className="absolute inset-[-14px] rounded-full border-2 border-dashed" style={{ borderColor: color, animation: "cg-portal-spin 8s linear infinite" }} />}
      {n}
    </span>
  );
}

function Marker({ piece, pos, onHover, onOpen, active }: { piece: Piece; pos: number[]; onHover: (n: number | null) => void; onOpen: (p: Piece) => void; active: boolean }) {
  return (
    <button className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pos[0]}%`, top: `${pos[1]}%` }}
      onMouseEnter={() => onHover(piece.index)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(piece.index)} onBlur={() => onHover(null)}
      onClick={() => onOpen(piece)} aria-label={`Piece ${piece.index}: ${piece.title}`}>
      <Star color={PIECE_COLORS[piece.index - 1]!} n={piece.index} big={piece.index === 12} active={active} />
    </button>
  );
}

function Summary({ p }: { p: Piece }) {
  return (
    <>
      <div className="text-xs uppercase tracking-widest" style={{ color: PIECE_COLORS[p.index - 1]! }}>Piece {p.index} — {p.chapter}</div>
      <div className="mt-1 font-display text-lg text-gold-soft">{p.title}</div>
      <div className="text-sm capitalize text-muted-foreground">{p.mediaType} · {p.genre}</div>
      <p className="mt-2 text-sm leading-snug">{p.overview}</p>
      <p className="mt-2 text-sm italic text-gold-soft">{p.why}</p>
    </>
  );
}

function Detail({ p, onClose }: { p: Piece; onClose: () => void }) {
  const color = PIECE_COLORS[p.index - 1]!;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-night/70 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal aria-label={p.title}>
      <div className="gilded relative max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 animate-fade-up" onClick={(e) => e.stopPropagation()} style={{ boxShadow: `0 0 60px ${color}` }}>
        <button className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" onClick={onClose} aria-label="Close"><X /></button>
        <div className="text-xs uppercase tracking-widest" style={{ color }}>Piece {p.index} — {p.chapter}</div>
        <h3 className="mt-1 font-display text-2xl text-gold-soft">{p.title}</h3>
        <p className="text-sm capitalize text-muted-foreground">{p.mediaType} · {p.genre} · {p.subgenre}</p>
        <p className="mt-4">{p.overview}</p>
        <dl className="mt-4 grid gap-3 text-sm">
          <Row k="Length" v={p.length} />
          <Row k="Advisories" v={p.advisories.join(", ")} />
          <Row k="Positives" v={p.positives.join(" · ")} />
          <Row k="Drawbacks" v={p.drawbacks.join(" · ")} />
          <Row k="Why this piece" v={p.why} />
          {p.replacement && <Row k="Replacement" v={p.replacement} />}
        </dl>
      </div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div><dt className="font-display text-xs uppercase tracking-widest text-gold">{k}</dt><dd>{v}</dd></div>;
}
