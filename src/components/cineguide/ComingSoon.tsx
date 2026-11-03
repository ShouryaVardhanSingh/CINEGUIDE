import { Link } from "@tanstack/react-router";
import { SiteNav } from "./SiteNav";

/** Temporary destination for sections that are not built yet. */
export function ComingSoon({ title, image, blurb }: { title: string; image: string; blurb: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="scene-vignette absolute inset-0" />
      <SiteNav />
      <main className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-6 pt-24 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Coming soon</p>
        <h1 className="mt-4 font-title text-5xl text-gold-bright text-glow md:text-6xl">{title}</h1>
        <p className="mt-6 text-lg text-foreground/85">{blurb}</p>
        <Link to="/" className="btn-explore mt-10 rounded-full px-6 py-2.5 text-gold-bright">
          ← Back to the journey
        </Link>
      </main>
    </div>
  );
}
