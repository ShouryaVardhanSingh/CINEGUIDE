import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/cineguide/SiteNav";
import { HeroScene } from "@/components/cineguide/HeroScene";
import { JourneyHeading } from "@/components/cineguide/JourneyHeading";
import { FeatureCards } from "@/components/cineguide/FeatureCards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CINEGUIDE — Begin your Journey" },
      { name: "description", content: "CINEGUIDE is a cinematic media discovery world. Choose your adventure: One Piece, Review Box, or CINEGUIDE." },
      { property: "og:title", content: "CINEGUIDE — Begin your Journey" },
      { property: "og:description", content: "Step into a cinematic fantasy world of stories, reviews and discovery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const explore = () => document.getElementById("adventures")?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <div className="relative flex min-h-[100svh] flex-col overflow-hidden pb-12">
      <HeroScene />
      <SiteNav onExplore={explore} />
      <main className="relative z-10 flex flex-1 flex-col justify-between gap-10 pt-4 md:pt-8">
        <JourneyHeading />
        <FeatureCards />
      </main>
    </div>
  );
}
