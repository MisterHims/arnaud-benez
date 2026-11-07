'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import { Logo, LogoName } from "../../ui/Logo";

const TRUSTED_LOGOS: { name: LogoName; className: string }[] = [
  { name: "Leclerc-custom", className: "h-13 w-auto" },
  { name: "Ticketmaster", className: "h-10 w-auto" },
  { name: "Voyages-Leclerc", className: "h-14 w-auto" },
  { name: "HeroUI", className: "h-12 w-auto" },
  { name: "DogFidelity", className: "h-12 w-auto" },
  { name: "Delaveine", className: "h-10 w-auto" },
  { name: "Zigoh", className: "h-12 w-auto" },
  { name: "Inmac", className: "h-14 w-auto" },
  { name: "Vocajob", className: "h-13 w-auto" },
];

/** Seconds for one group of logos to scroll by (same pace as before) */
const LOOP_DURATION = 160;
/** Time constant of the speed easing, in ms: smooth stop and restart */
const SPEED_EASING = 400;

export const TrustedBy = () => {
  const t = useTranslations('Works');
  const reduceMotion = usePrefersReducedMotion();

  // Scrolled frame by frame (not a CSS animation, whose pause is instant):
  // hovering a logo eases the speed down to 0, leaving it eases it back up
  const bandRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bandRef);
  const x = useMotionValue(0);
  const speed = useRef(0);
  const [hoveringLogo, setHoveringLogo] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const measure = () => setGroupWidth(group.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (!inView || !groupWidth) return;
    const target = reduceMotion || hoveringLogo ? 0 : groupWidth / LOOP_DURATION; // px/s
    speed.current += (target - speed.current) * (1 - Math.exp(-delta / SPEED_EASING));
    let next = x.get() - (speed.current * delta) / 1000;
    if (next <= -groupWidth) next += groupWidth; // seamless loop (group B repeats group A)
    x.set(next);
  });

  const logoProps = {
    onMouseEnter: () => setHoveringLogo(true),
    onMouseLeave: () => setHoveringLogo(false),
    className: 'shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300',
  };

  return (
    <div className="relative isolate w-full flex flex-col items-center py-24 md:py-36 overflow-hidden">
      {/* No rectangular band (its hard top / bottom edges cut the page): a
          soft elliptical glow behind the logos, fading out in every direction */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 58%, rgba(255,255,255,0.04), transparent 70%)' }}
      />

      <h3 className="text-[#bec3ca] text-2xl md:text-3xl font-bold mb-24 text-center px-4">
        {t('trustedBy')}
      </h3>

      {/* Moving content (WCAG 2.2.2): pauses while a logo is hovered, and
          stays still for visitors who asked for reduced motion */}
      <div
        ref={bandRef}
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >

        <motion.div className="flex w-max" style={{ x }}>
          {/* Group A, then group B (identical, for the seamless loop) */}
          {(['a', 'b'] as const).map((group) => (
            <div
              key={group}
              ref={group === 'a' ? groupRef : undefined}
              aria-hidden={group === 'b' ? true : undefined}
              className="flex items-center gap-16 md:gap-64 pr-16 md:pr-64"
            >
              {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, index) => (
                <div key={`${group}-${index}`} {...logoProps}>
                  <Logo name={logo.name} className={`${logo.className} text-white`} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};