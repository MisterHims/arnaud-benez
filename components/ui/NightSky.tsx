'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface NightSkyProps {
  /** Different seeds give different skies (same sky on server and client) */
  seed: number;
  /** Number of stars */
  count?: number;
  /**
   * Fixed height (px) for the star field, anchored at the top: for a section
   * whose height changes (tabs, "Show more"), so the stars, placed in % of
   * the field, don't move. Defaults to the section's own height
   */
  fieldHeight?: number;
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

/** Cursor parallax amplitude per depth (far, mid, near), in px */
const PARALLAX = [5, 10, 18];

const ParallaxLayer = ({ x, y, amplitude, children }: {
  x: MotionValue<number>; y: MotionValue<number>; amplitude: number; children: React.ReactNode;
}) => {
  const tx = useTransform(x, [-0.5, 0.5], [amplitude, -amplitude]);
  const ty = useTransform(y, [-0.5, 0.5], [amplitude, -amplitude]);
  return <motion.div className="absolute inset-0" style={{ x: tx, y: ty }}>{children}</motion.div>;
};

/** Delay between two shooting stars, in ms (random within the range) */
const SHOOTING_STAR_EVERY: [number, number] = [12000, 25000];

interface ShootingStar {
  id: number;
  left: number; // % of the section width
  top: number;  // px from the top of the section (in the visible part)
  angle: number; // degrees, down-right
  distance: number; // px travelled
}

/**
 * The night sky seen from the planet, once landed: sparse, faint stars
 * twinkling slowly, the whole sky drifting gently (the night going by), and
 * now and then a shooting star, like on the very first screen. Denser at the
 * top, fading toward the bottom. Decorative, behind the content (the parent
 * needs `relative isolate`); still with reduced motion.
 */
export const NightSky = ({ seed, count = 46, fieldHeight, className }: NightSkyProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = usePrefersReducedMotion();
  const [shooting, setShooting] = useState<ShootingStar | null>(null);

  // Cursor parallax: the sky shifts slightly opposite to the cursor, more
  // for near stars (mouse only, while on screen, none with reduced motion)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 40, damping: 18 });
  const y = useSpring(cursorY, { stiffness: 40, damping: 18 });
  useEffect(() => {
    if (!inView || reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      cursorX.set(e.clientX / window.innerWidth - 0.5);
      cursorY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [inView, reduceMotion, cursorX, cursorY]);

  // Shooting stars, only while the section is on screen
  useEffect(() => {
    if (!inView || reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const [min, max] = SHOOTING_STAR_EVERY;
      timer = setTimeout(() => {
        // Starts in the upper part of what is on screen (sections are tall)
        const rect = ref.current?.getBoundingClientRect();
        const visibleTop = rect ? Math.max(0, -rect.top) : 0;
        setShooting({
          id: Date.now(),
          left: 5 + Math.random() * 55,
          top: visibleTop + Math.random() * window.innerHeight * 0.4,
          angle: 18 + Math.random() * 14,
          distance: 320 + Math.random() * 220,
        });
        schedule();
      }, min + Math.random() * (max - min));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

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
      // Gentle float of each star around its spot
      floatX: (rand() - 0.5) * 6,
      floatY: (rand() - 0.5) * 6,
      floatDuration: 8 + rand() * 8,
      floatDelay: -rand() * 16,
    };
  });
  // Depth: small stars are far (barely move with the cursor), big ones near
  const layers = [1, 1.5, 2].map((size) => stars.filter((star) => star.size === size));

  return (
    // Off screen, every star animation is paused: five skies of ~90
    // animations each otherwise kept the main thread busy all the time
    // (styles recalculated every frame), slowing the whole page on phones.
    // !important: the stars set their animation inline (the shorthand resets
    // the play state)
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none',
        !inView && '[&_*]:[animation-play-state:paused]!',
        className
      )}
    >
      {/* Fixed stars, fading toward the bottom of the section */}
      <div
        className={cn('absolute inset-x-0 top-0', !fieldHeight && 'bottom-0')}
        style={{
          height: fieldHeight,
          maskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 35%, transparent 85%)',
        }}
      >
      {/* The whole sky drifts slowly (oversized so its edges never show) */}
      <div className="absolute -inset-10 animate-sky-drift motion-reduce:animate-none">
        {layers.map((layer, depth) => (
          <ParallaxLayer key={depth} x={x} y={y} amplitude={PARALLAX[depth]}>
            {layer.map((star, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white motion-reduce:animate-none!"
                style={{
                  left: `${star.left.toFixed(2)}%`,
                  top: `${star.top.toFixed(2)}%`,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity.toFixed(2),
                  // read by the twinkle / float keyframes
                  ['--star-opacity' as string]: star.opacity.toFixed(2),
                  ['--float-x' as string]: `${star.floatX.toFixed(2)}px`,
                  ['--float-y' as string]: `${star.floatY.toFixed(2)}px`,
                  animation: `twinkle ${star.duration.toFixed(2)}s ease-in-out ${star.delay.toFixed(2)}s infinite, star-float ${star.floatDuration.toFixed(2)}s ease-in-out ${star.floatDelay.toFixed(2)}s infinite`,
                  boxShadow: star.size === 2 ? '0 0 4px rgba(255,255,255,0.6)' : undefined,
                }}
              />
            ))}
          </ParallaxLayer>
        ))}
      </div>
      </div>

      {shooting && (
        <span
          key={shooting.id}
          className="absolute h-[1.5px] w-32 animate-shooting-star"
          style={{
            left: `${shooting.left}%`,
            top: shooting.top,
            background: 'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
            ['--angle' as string]: `${shooting.angle}deg`,
            ['--dx' as string]: `${Math.cos((shooting.angle * Math.PI) / 180) * shooting.distance}px`,
            ['--dy' as string]: `${Math.sin((shooting.angle * Math.PI) / 180) * shooting.distance}px`,
          }}
          onAnimationEnd={() => setShooting(null)}
        />
      )}
    </div>
  );
};
