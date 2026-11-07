import { Button } from "@/components/ui/button";
import { ArrowRight, Feather } from "lucide-react";
import libraryHall from "@/assets/library-hall.jpg";
import quill from "@/assets/peacock-quill.png";
import { Particles } from "./particles";

export function OpeningScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src={libraryHall}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="vignette absolute inset-0" />
      <div className="absolute inset-0 bg-chocolate/45" />
      <Particles />

      <img
        src={quill}
        alt=""
        aria-hidden
        className="animate-flicker absolute -right-10 bottom-0 hidden w-72 rotate-12 opacity-90 drop-shadow-[0_0_30px_oklch(0.78_0.13_80/40%)] lg:block xl:w-96"
      />

      <div className="animate-rise relative z-10 mx-auto max-w-2xl px-6 text-center">
        <Feather className="mx-auto mb-6 h-10 w-10 text-gold" strokeWidth={1.25} />
        <h1 className="text-gold-gradient font-deco text-6xl tracking-[0.12em] drop-shadow-[0_2px_18px_oklch(0.78_0.13_80/45%)] sm:text-7xl md:text-8xl">
          REVIEW BOX
        </h1>
        <p className="mt-4 font-display text-2xl italic text-gold-bright sm:text-3xl">
          Read. Review. Relive.
        </p>

        <div className="mx-auto mt-6 flex w-56 items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p className="mt-6 font-body text-lg text-ivory/85">
          Step into a library of stories, where every opinion matters…
        </p>

        <Button variant="gold" size="natural"
          onClick={onEnter}
          className="btn-gold mt-10 inline-flex items-center gap-3 rounded-md px-10 py-4 font-deco text-lg tracking-widest"
        >
          Enter the Library
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
