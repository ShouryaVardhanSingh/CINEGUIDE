import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/cineguide/ComingSoon";
import img from "@/assets/card-books.jpg";

export const Route = createFileRoute("/review-box")({
  head: () => ({
    meta: [
      { title: "Review Box — CINEGUIDE" },
      { name: "description", content: "Reviews of films and series, written by quill. Coming soon to CINEGUIDE." },
      { property: "og:title", content: "Review Box — CINEGUIDE" },
      { property: "og:description", content: "Reviews of films and series, written by quill." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="REVIEW BOX" image={img} blurb="The ink is still drying. Reviews arrive soon." />,
});
