import { cn } from '@/lib/utils';

interface NightSkyProps {
  /** Different seeds give different skies (same sky on server and client) */
  seed: number;
  /** Number of stars */
  count?: number;
  className?: string;
}

/** Small deterministic PRNG (mulberry32): no hydration mismatch, unlike Math.random */
const random = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * The night sky seen from the planet, once landed: static stars (no more
 * travel), sparse and faint, twinkling slowly, denser at the top and fading
 * toward the bottom of the section. Purely decorative, behind the content
 * (the parent needs `relative isolate`).
 */
export const NightSky = ({ seed, count = 46, className }: NightSkyProps) => {
  const rand = random(seed);
  const stars = Array.from({ length: count }, () => {
    const size = rand() < 0.12 ? 2 : rand() < 0.5 ? 1.5 : 1;
    return {
      left: rand() * 100,
      // More stars near the top: like a sky above the horizon
      top: Math.pow(rand(), 1.6) * 100,
      size,
      opacity: 0.35 + rand() * 0.5,
      duration: 3 + rand() * 5,
      delay: -rand() * 8,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none', className)}
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 85%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 85%)',
      }}
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle motion-reduce:animate-none"
          style={{
            left: `${star.left.toFixed(2)}%`,
            top: `${star.top.toFixed(2)}%`,
            width: star.size,
            height: star.size,
            // read by the twinkle keyframes
            ['--star-opacity' as string]: star.opacity.toFixed(2),
            opacity: star.opacity.toFixed(2),
            animationDuration: `${star.duration.toFixed(2)}s`,
            animationDelay: `${star.delay.toFixed(2)}s`,
            boxShadow: star.size === 2 ? '0 0 4px rgba(255,255,255,0.6)' : undefined,
          }}
        />
      ))}
    </div>
  );
};
