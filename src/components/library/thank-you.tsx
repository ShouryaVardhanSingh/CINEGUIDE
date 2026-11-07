import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import sunsetPortal from "@/assets/sunset-portal.jpg";
import { Particles } from "./particles";

export function ThankYou({ onReturn }: { onReturn: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img src={sunsetPortal} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-chocolate/40" />
      <div className="vignette absolute inset-0" />
      <Particles count={30} />

      <div className="animate-rise relative z-10 mx-auto max-w-xl px-6 text-center">
        <div className="animate-seal mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-chocolate/60 shadow-[var(--shadow-glow)]">
          <span className="text-gold-gradient font-deco text-3xl">✦</span>
        </div>

        <h2 className="text-gold-gradient font-deco text-4xl tracking-wide drop-shadow-[0_2px_18px_oklch(0.78_0.13_80/45%)] sm:text-5xl">
          Your Story Has Been Recorded!
        </h2>

        <div className="mx-auto mt-6 flex w-56 items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
        </div>

        <p className="mt-6 font-display text-xl italic text-ivory/90">
          Your thoughts have found a place in our library.
        </p>
        <p className="mt-2 font-body text-sm text-ivory/70">
          Keep exploring, keep reviewing…
        </p>

        <Button variant="gold" size="natural"
          onClick={onReturn}
          className="btn-gold mt-10 inline-flex items-center gap-3 rounded-md px-10 py-4 font-deco text-lg tracking-widest"
        >
          <Home className="h-5 w-5" />
          Return to the Library
        </Button>
      </div>
    </section>
  );
}
