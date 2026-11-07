import { ArrowLeft } from "lucide-react";
import rotunda from "@/assets/rotunda.jpg";
import shelfStillLifes from "@/assets/shelf-still-lifes.jpg";
import { Button } from "@/components/ui/button";
import { CATEGORIES, type Category } from "@/data/mock-library";
import { Particles } from "./particles";

export function ShelfSelection({
  onSelect,
  onBack,
}: {
  onSelect: (category: Category) => void;
  onBack: () => void;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img src={rotunda} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-chocolate/60" />
      <div className="vignette absolute inset-0" />
      <Particles count={18} />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <Button variant="gold" size="natural"
          onClick={onBack}
          className="btn-gold mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-deco text-sm tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <h2 className="shelf-heading text-gold-gradient text-center font-deco text-3xl sm:text-4xl md:text-5xl">
          Which shelf would you like to explore?
        </h2>

        <div className="shelf-grid mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <Button variant="shelf" size="natural"
              key={category.id}
              onClick={() => onSelect(category)}
              className={`group shelf-${i} relative block overflow-hidden p-0 text-center animate-rise`}
              style={{ animationDelay: `${i * 90}ms` }}
              onPointerMove={(event) => {
                if (event.pointerType !== "mouse") return;
                const box = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - box.left) / box.width;
                const y = (event.clientY - box.top) / box.height;
                event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
                event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
                event.currentTarget.style.setProperty("--light-x", `${x * 100}%`);
                event.currentTarget.style.setProperty("--light-y", `${y * 100}%`);
              }}
              onPointerLeave={(event) => {
                event.currentTarget.style.setProperty("--tilt-x", "0deg");
                event.currentTarget.style.setProperty("--tilt-y", "0deg");
              }}
            >
              <span className="shelf-art" aria-hidden>
                <img src={shelfStillLifes} alt="" width={1536} height={1024} loading="lazy" />
              </span>
              <span className="shelf-caption">
              <span className="block font-deco text-2xl text-gold-bright">
                {category.name}
              </span>
              <span className="mt-1 block font-body text-sm text-ivory/75">
                {category.blurb}
              </span>
              </span>
              <span className="shelf-reflection" aria-hidden />
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
