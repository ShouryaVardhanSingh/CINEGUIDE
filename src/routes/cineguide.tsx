import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/cineguide/ComingSoon";
import img from "@/assets/card-mage.jpg";

export const Route = createFileRoute("/cineguide")({
  head: () => ({
    meta: [
      { title: "CINEGUIDE — Your guide to cinema" },
      { name: "description", content: "The CINEGUIDE discovery hall is being enchanted. Coming soon." },
      { property: "og:title", content: "CINEGUIDE — Your guide to cinema" },
      { property: "og:description", content: "The CINEGUIDE discovery hall is being enchanted." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <ComingSoon title="CINEGUIDE" image={img} blurb="The mage is still casting. This hall opens soon." />,
});
