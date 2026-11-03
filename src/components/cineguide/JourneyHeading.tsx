/** "Begin your Journey" — each word floats independently in a high / low / high rhythm. */
export function JourneyHeading() {
  return (
    <div className="anim-rise relative mx-auto w-full max-w-xl px-4" style={{ animationDelay: "0.35s" }}>
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <ellipse cx="250" cy="95" rx="200" ry="38" transform="rotate(-6 250 95)" stroke="var(--gold)" strokeWidth="1.2" className="anim-trail" opacity="0.7" />
        <ellipse cx="260" cy="230" rx="220" ry="40" transform="rotate(-5 260 230)" stroke="var(--gold)" strokeWidth="1.2" className="anim-trail" style={{ animationDelay: "0.8s" }} opacity="0.7" />
        <line x1="20" y1="160" x2="150" y2="160" stroke="var(--gold)" strokeWidth="1" className="anim-shimmer" />
        <line x1="350" y1="160" x2="480" y2="160" stroke="var(--gold)" strokeWidth="1" className="anim-shimmer" style={{ animationDelay: "1.5s" }} />
        <circle cx="250" cy="40" r="3" fill="var(--gold-bright)" className="anim-shimmer" />
        <circle cx="430" cy="200" r="2.5" fill="var(--gold-bright)" className="anim-shimmer" style={{ animationDelay: "2s" }} />
      </svg>
      <h1 className="relative grid grid-cols-1 justify-items-center font-script italic leading-none text-gold-bright text-glow">
        <span className="anim-float text-6xl font-semibold sm:text-7xl md:text-8xl" style={{ animationDuration: "6s" }}>Begin</span>
        <span className="anim-float -mt-1 text-4xl font-medium sm:text-5xl md:text-6xl" style={{ animationDuration: "7s", animationDelay: "-2.2s" }}>your</span>
        <span className="anim-float text-6xl font-semibold sm:text-7xl md:text-8xl" style={{ animationDuration: "6.6s", animationDelay: "-4s" }}>Journey</span>
      </h1>
    </div>
  );
}
