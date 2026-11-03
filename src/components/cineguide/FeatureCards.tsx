import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import pirate from "@/assets/card-pirate.jpg";
import books from "@/assets/card-books.jpg";
import feather from "@/assets/feather.png";
import mage from "@/assets/card-mage.jpg";
import { CompassLogo } from "./SiteNav";

type Props = {
  to: "/one-piece" | "/review-box" | "/cineguide";
  title: string;
  image: string;
  alt: string;
  icon: ReactNode;
  children?: ReactNode;
  delay: string;
};

function PortalCard({ to, title, image, alt, icon, children, delay }: Props) {
  return (
    <Link
      to={to}
      aria-label={`Open ${title}`}
      className="portal-card group anim-rise relative block aspect-[4/4.3] overflow-hidden rounded-xl bg-navy-deep"
      style={{ animationDelay: delay }}
    >
      <img src={image} alt={alt} loading="lazy" width={784} height={848} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {children}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent" />
      <div className="card-sweep pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-2 rounded-lg border border-gold/30" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 pb-5">
        <div className="flex items-center gap-2 text-gold">
          <span className="h-px w-10 bg-gold/70" />
          {icon}
          <span className="h-px w-10 bg-gold/70" />
        </div>
        <span className="font-title text-xl tracking-wider text-gold-bright text-glow md:text-2xl">{title}</span>
      </div>
    </Link>
  );
}

export function FeatureCards() {
  return (
    <section id="adventures" aria-label="Adventures" className="relative z-10 mx-auto grid w-full max-w-5xl scroll-mt-6 grid-cols-1 gap-6 px-6 sm:grid-cols-3 md:gap-10">
      <PortalCard
        to="/one-piece"
        title="ONE PIECE"
        delay="0.6s"
        image={pirate}
        alt="A straw-hatted pirate stands on a rock facing a sunset sea full of sailing ships"
        icon={<CompassLogo className="h-6 w-6" />}
      />
      <PortalCard
        to="/review-box"
        title="REVIEW BOX"
        delay="0.75s"
        image={books}
        alt="Two antique books stacked in a candlelit library with a peacock-feather quill"
        icon={<span aria-hidden="true" className="text-lg">📖</span>}
      >
        <img
          src={feather}
          alt=""
          loading="lazy"
          className="anim-sway pointer-events-none absolute left-[22%] top-[18%] w-[68%] drop-shadow-[0_6px_10px_oklch(0.1_0.03_265/70%)]"
        />
      </PortalCard>
      <PortalCard
        to="/cineguide"
        title="CINEGUIDE"
        delay="0.9s"
        image={mage}
        alt="A cloaked mage on a rocky ledge points a glowing wand toward a dark mountain castle"
        icon={<span aria-hidden="true" className="text-lg">✦</span>}
      >
        <span
          aria-hidden="true"
          className="anim-spark absolute left-[58%] top-[18%] h-4 w-4 rounded-full bg-gold-bright"
          style={{ boxShadow: "0 0 14px 6px var(--gold-glow)" }}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            className="anim-particle absolute h-1 w-1 rounded-full bg-gold-bright"
            style={{ left: `${15 + i * 9}%`, top: `${55 + (i % 2) * 10}%`, animationDuration: `${6 + i}s`, animationDelay: `${-i * 1.4}s` }}
          />
        ))}
      </PortalCard>
    </section>
  );
}
