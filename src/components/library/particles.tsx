import { useMemo } from "react";

interface Particle {
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

/** Floating golden dust motes. Purely decorative. */
export function Particles({ count = 26 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37 + 13) % 100}%`,
        size: 2 + ((i * 7) % 4),
        duration: 9 + ((i * 5) % 10),
        delay: -((i * 3) % 12),
        opacity: 0.35 + ((i * 11) % 40) / 100,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="library-light library-light-one" />
      <div className="library-light library-light-two" />
      {particles.map((p, i) => (
        <span
          key={i}
          className={`particle ${i % 3 === 0 ? "particle-near" : "particle-far"}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
