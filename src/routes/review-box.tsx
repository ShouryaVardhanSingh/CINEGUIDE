import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import rotunda from "@/assets/rotunda.jpg";
import { ActionSelection, type ReviewMode } from "@/components/library/action-selection";
import { BookReveal } from "@/components/library/book-reveal";
import { OpeningScreen } from "@/components/library/opening-screen";
import { Particles } from "@/components/library/particles";
import { ReadReviews } from "@/components/library/read-reviews";
import { ShelfSelection } from "@/components/library/shelf-selection";
import { ThankYou } from "@/components/library/thank-you";
import { TitleSearch } from "@/components/library/title-search";
import { WriteReview } from "@/components/library/write-review";
import type { Category, Title } from "@/data/mock-library";

export const Route = createFileRoute("/review-box")({
  head: () => ({
    meta: [
      { title: "REVIEW BOX — Read. Review. Relive." },
      {
        name: "description",
        content:
          "Step into a magical antique library and write or read reviews of movies, series, anime, manga, comics and novels — recorded in a golden open book.",
      },
      { property: "og:title", content: "REVIEW BOX — Read. Review. Relive." },
      {
        property: "og:description",
        content:
          "A magical library where every movie, series, anime, manga, comic and novel has a story worth remembering — and every reader a page to write on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewBox,
});

type Stage =
  | { name: "opening" }
  | { name: "shelves" }
  | { name: "action"; category: Category }
  | { name: "search"; category: Category; mode: ReviewMode }
  | { name: "book"; category: Category; mode: ReviewMode; title: Title }
  | { name: "thanks" };

function ReviewBox() {
  const [stage, setStage] = useState<Stage>({ name: "opening" });

  return (
    <main className="library-scene min-h-screen">
      {stage.name === "opening" && (
        <StageShell key="opening">
          <OpeningScreen onEnter={() => setStage({ name: "shelves" })} />
        </StageShell>
      )}

      {stage.name === "shelves" && (
        <StageShell key="shelves">
          <ShelfSelection
            onBack={() => setStage({ name: "opening" })}
            onSelect={(category) => setStage({ name: "action", category })}
          />
        </StageShell>
      )}

      {stage.name === "action" && (
        <StageShell key={`action-${stage.category.id}`}>
          <ActionSelection
            category={stage.category}
            onBack={() => setStage({ name: "shelves" })}
            onSelect={(mode) =>
              setStage({ name: "search", category: stage.category, mode })
            }
          />
        </StageShell>
      )}

      {stage.name === "search" && (
        <StageShell key={`search-${stage.category.id}-${stage.mode}`}>
          <TitleSearch
            category={stage.category}
            onBack={() => setStage({ name: "action", category: stage.category })}
            onSelect={(title) =>
              setStage({ name: "book", category: stage.category, mode: stage.mode, title })
            }
          />
        </StageShell>
      )}

      {stage.name === "book" && (
        <StageShell key={`book-${stage.title.id}-${stage.mode}`}>
          <section className="relative min-h-screen overflow-hidden">
            <img src={rotunda} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-chocolate/70" />
            <div className="vignette absolute inset-0" />
            <Particles count={14} />
            <BookReveal title={stage.title}>
              {stage.mode === "write" ? (
                <WriteReview
                  category={stage.category}
                  title={stage.title}
                  onBack={() =>
                    setStage({ name: "search", category: stage.category, mode: stage.mode })
                  }
                  onDone={() => setStage({ name: "thanks" })}
                />
              ) : (
                <ReadReviews
                  category={stage.category}
                  title={stage.title}
                  onBack={() =>
                    setStage({ name: "search", category: stage.category, mode: stage.mode })
                  }
                />
              )}
            </BookReveal>
          </section>
        </StageShell>
      )}

      {stage.name === "thanks" && (
        <StageShell key="thanks">
          <ThankYou onReturn={() => setStage({ name: "shelves" })} />
        </StageShell>
      )}
    </main>
  );
}

function StageShell({ children }: { children: React.ReactNode }) {
  return <div className="animate-scene-in">{children}</div>;
}
