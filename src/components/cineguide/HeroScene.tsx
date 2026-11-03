import heroScene from "@/assets/hero-scene.jpg";
import traveler from "@/assets/traveler.png";
import ship from "@/assets/ship.png";

const clouds = [
  { top: "8%", w: 520, h: 160, dur: 140, delay: -20, op: 0.7 },
  { top: "22%", w: 380, h: 120, dur: 110, delay: -70, op: 0.55 },
  { top: "48%", w: 640, h: 180, dur: 170, delay: -110, op: 0.45 },
  { top: "70%", w: 720, h: 200, dur: 200, delay: -40, op: 0.6 },
];

const ships = [
  { left: "58%", top: "56%", w: 46, dur: 16, delay: 0 },
  { left: "66%", top: "60%", w: 62, dur: 19, delay: -6 },
  { left: "84%", top: "64%", w: 96, dur: 22, delay: -3 },
  { left: "47%", top: "58%", w: 34, dur: 14, delay: -9 },
];

const particles = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${30 + ((i * 23) % 60)}%`,
  size: 2 + (i % 3),
  dur: 9 + (i % 5) * 2,
  delay: -(i * 1.3),
}));

/** Layered, animated background for the homepage hero. */
export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img src={heroScene} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[60%_50%]" />

      {ships.map((s, i) => (
        <img
          key={i}
          src={ship}
          alt=""
          loading="lazy"
          className="anim-sail absolute hidden opacity-90 sm:block"
          style={{ left: s.left, top: s.top, width: s.w, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s`, filter: "saturate(0.75) brightness(0.85)" }}
        />
      ))}

      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud-blob anim-drift absolute left-0"
          style={{ top: c.top, width: c.w, height: c.h, opacity: c.op, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
        />
      ))}

      <img
        src={traveler}
        alt=""
        width={1024}
        height={1024}
        className="absolute bottom-[24%] left-[-4%] w-[46vw] max-w-[440px] min-w-[200px] drop-shadow-2xl md:bottom-[30%] md:left-[1%] md:w-[26vw]"
      />

      {particles.map((p, i) => (
        <span
          key={i}
          className="anim-particle absolute rounded-full bg-gold-bright"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, boxShadow: "0 0 8px var(--gold-glow)", animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}
        />
      ))}

      <div className="scene-vignette absolute inset-0" />
    </div>
  );
}
