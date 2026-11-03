import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/one-piece", label: "One Piece" },
  { to: "/review-box", label: "Review Box" },
  { to: "/cineguide", label: "CINEGUIDE" },
] as const;

export function CompassLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <circle cx="24" cy="24" r="20" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="15" strokeWidth="0.8" opacity="0.7" />
      <path d="M24 2 L27 21 L46 24 L27 27 L24 46 L21 27 L2 24 L21 21 Z" fill="currentColor" stroke="none" />
      <path d="M24 10 L25.5 22.5 L38 24 L25.5 25.5 L24 38 L22.5 25.5 L10 24 L22.5 22.5 Z" fill="var(--navy-deep)" stroke="none" opacity="0.6" transform="rotate(45 24 24)" />
      <circle cx="24" cy="24" r="2.5" fill="var(--navy-deep)" stroke="none" />
    </svg>
  );
}

export function SiteNav({ onExplore }: { onExplore?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="anim-rise relative z-30" style={{ animationDelay: "0.1s" }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-3 text-gold focus-visible:outline-2 focus-visible:outline-gold-bright rounded-md">
          <CompassLogo className="h-10 w-10 md:h-12 md:w-12" />
          <span className="font-title text-xl tracking-wider text-gold-bright text-glow md:text-2xl">CINEGUIDE</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-10 border-b border-border pb-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-gold-bright text-glow" }}
                  inactiveProps={{ className: "text-foreground/80 hover:text-gold-bright" }}
                  className="rounded px-1 text-sm tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-gold-bright"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="btn-explore hidden rounded-full px-5 py-2 text-sm tracking-wide text-gold-bright sm:inline-flex items-center gap-2"
          >
            Explore <span aria-hidden="true">✦</span>
          </button>
          <button
            type="button"
            className="btn-explore rounded-full p-2 text-gold-bright md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="mx-5 rounded-2xl border border-border bg-navy-deep/90 p-4 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-gold-bright" }}
                  className="block rounded-lg px-3 py-2 text-foreground/90 hover:bg-gold/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => { setOpen(false); onExplore?.(); }}
                className="w-full rounded-lg px-3 py-2 text-left text-gold-bright hover:bg-gold/10"
              >
                Explore ✦
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
