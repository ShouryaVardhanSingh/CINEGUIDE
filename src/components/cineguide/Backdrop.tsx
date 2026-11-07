import type { CSSProperties, ReactNode } from "react";
import type { EnvSpec } from "@/lib/cineguide/data";

const rand = (i: number, s = 1) => {
  const x = Math.sin(i * 9301 + s * 49297) * 233280;
  return x - Math.floor(x);
};

export function Particles({ kind, count = 26 }: { kind: EnvSpec["particle"]; count?: number }) {
  if (kind === "fog") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="absolute inset-x-[-30%] h-1/2 opacity-40 blur-3xl"
            style={{ top: `${20 + i * 25}%`, background: "radial-gradient(ellipse, oklch(0.85 0.02 280 / 50%), transparent 70%)",
              animation: `cg-fog ${18 + i * 6}s ease-in-out ${i * -4}s infinite alternate` }} />
        ))}
      </div>
    );
  }
  const style = (i: number): CSSProperties => {
    const left = `${rand(i) * 100}%`;
    const dur = 10 + rand(i, 2) * 14;
    const delay = -rand(i, 3) * dur;
    const size = 3 + rand(i, 4) * 7;
    const base: CSSProperties = { left, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${dur}s` };
    switch (kind) {
      case "leaves": return { ...base, width: size * 1.6, borderRadius: "0 100% 0 100%", background: "oklch(0.7 0.15 140 / 70%)", animationName: "cg-drift" };
      case "petals": return { ...base, width: size * 1.4, borderRadius: "100% 0 100% 0", background: "oklch(0.85 0.1 0 / 80%)", animationName: "cg-drift" };
      case "embers": return { ...base, width: size / 2, height: size / 2, borderRadius: 9999, background: "oklch(0.8 0.18 55)", boxShadow: "0 0 8px oklch(0.75 0.2 45)", animationName: "cg-rise" };
      case "dust": return { ...base, width: size / 2.5, height: size / 2.5, borderRadius: 9999, background: "oklch(0.9 0.06 80 / 60%)", animationName: "cg-rise", animationDuration: `${dur * 2}s` };
      case "bubbles": return { ...base, borderRadius: 9999, border: "1px solid oklch(0.9 0.05 210 / 60%)", animationName: "cg-rise" };
      case "stars": default: return { left, top: `${rand(i, 5) * 100}%`, width: size / 3, height: size / 3, borderRadius: 9999, background: "oklch(0.97 0.03 90)", animation: `cg-twinkle ${2 + rand(i, 6) * 3}s ease-in-out ${-rand(i, 7) * 3}s infinite` };
    }
  };
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="absolute top-0" style={{ animationTimingFunction: "linear", animationIterationCount: "infinite", ...style(i) }} />
      ))}
    </div>
  );
}

export function Scene({ image, env, children, imageAnim, className = "" }: {
  image: string; env?: EnvSpec | undefined; children?: ReactNode; imageAnim?: string | undefined; className?: string | undefined;
}) {
  return (
    <section className={`relative min-h-svh w-full overflow-hidden ${className}`}>
      <img src={image} alt="" aria-hidden width={1920} height={1088}
        className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-1000 animate-kenburns"
        style={{ filter: env?.filter, animation: imageAnim }} />
      {env && <div className="absolute inset-0 transition-colors duration-1000" style={{ background: env.tint }} />}
      <div className="absolute inset-0" style={{ background: "var(--vignette)" }} />
      <Particles kind={env?.particle ?? "stars"} />
      <div className="relative z-10 flex min-h-svh flex-col">{children}</div>
    </section>
  );
}

export function Heading({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="animate-fade-up px-4 pt-10 text-center md:pt-14">
      <div className="mx-auto mb-2 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-10 bg-gold/60" />✦<span className="h-px w-10 bg-gold/60" />
      </div>
      <h2 className="font-display text-2xl text-gold-soft drop-shadow md:text-4xl">{children}</h2>
      {sub && <p className="mt-2 text-base text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}

export function NavBar({ onBack, onNext, nextLabel = "Continue", nextDisabled, extra }: {
  onBack?: () => void; onNext?: () => void; nextLabel?: string; nextDisabled?: boolean; extra?: ReactNode;
}) {
  return (
    <div className="mt-auto flex items-center justify-between gap-3 px-5 pb-6 pt-8 md:px-10">
      {onBack ? <button className="btn-ghost-rune" onClick={onBack}>← Back</button> : <span />}
      <div className="flex gap-3">
        {extra}
        {onNext && <button className="btn-rune" onClick={onNext} disabled={nextDisabled}>{nextLabel} →</button>}
      </div>
    </div>
  );
}
