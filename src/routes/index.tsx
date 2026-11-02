import { createFileRoute, Link } from "@tanstack/react-router";
import intro from "@/assets/op-intro.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CINEGUIDE — Cinematic Media Discovery" },
      { name: "description", content: "Discover your next movie, anime, show, manga, comic or novel through cinematic journeys." },
      { property: "og:title", content: "CINEGUIDE — Cinematic Media Discovery" },
      { property: "og:description", content: "Discover your next story through cinematic journeys." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-6">
      <img src={intro} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative text-center">
        <h1 className="font-display text-5xl tracking-[0.15em] text-gold-gradient sm:text-7xl">CINEGUIDE</h1>
        <p className="mt-4 text-muted-foreground">A cinematic journey. One perfect recommendation.</p>
        <Link
          to="/one-piece"
          className="mt-10 inline-flex rounded-sm border border-gold/60 px-8 py-3 font-display tracking-[0.3em] text-gold transition hover:bg-gold hover:text-abyss focus-visible:outline-none focus-visible:shadow-glow"
        >
          ONE PIECE
        </Link>
      </div>
    </main>
  );
}
