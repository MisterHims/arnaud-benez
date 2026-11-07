'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  easeInOut,
  easeOut,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars, type SkillTarget } from './hero/SkillStars';
import { IntroText } from './hero/IntroText';
import { ScrollIndicator } from './hero/ScrollIndicator';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Icon } from '@/components/ui/Icon';
import { useTranslations } from 'next-intl';
import { Mountains } from './hero/Mountains';

/**
 * The hero tells a short story, driven by native scroll (no hijacking):
 *   invitation → take-off → hyperspace → descent → landing on the planet.
 * The journey is one-way: once landed, the hero folds down to the arrival
 * screen, so scrolling back up never rewinds the trip ("Revoir le voyage"
 * replays it on demand).
 * Every value below is a fraction of the journey (0 → 1).
 */
const JOURNEY = {
  // Short on purpose: no half-faded "limbo" state after one wheel notch
  introOut: [0, 0.07],
  // Two parts: a short horizontal flight (~2.1 s), then a longer vertical
  // landing (~2.2 s).
  // Speed: take-off from the very first pixel (instant feedback), hyperspace,
  // partial braking (the ship keeps momentum into the descent), then a long
  // descent that holds its pace before flaring out to a soft stop.
  warp: {
    at:    [0, 0.128, 0.422, 0.561, 0.951, 1],
    speed: [0, 1,    1,   0.3,  0,    0],
  },
  // Flight direction, switched while still moving: 0° = forward, 90° = down
  pitch: { at: [0.491, 0.645], deg: [0, 90] },
  // Entering the atmosphere: the horizon glows from below during the descent
  atmosphere: [0.491, 0.868],
  identity: [0.728, 0.916],
  skills: [0.833, 0.951],
  // Where the "Launch" button takes you (landed: identity + mountains)
  arrival: 1,
  // Past this point the ship has landed (name on screen): the rest of the
  // landing plays out by itself and the journey folds away
  landed: 0.868,
};

const LAUNCH_DURATION = 4.6; // seconds for the full journey

const linear = (t: number) => t;

/**
 * Stopping mid-flight while heading down: after SETTLE_DELAY, the autopilot
 * completes the trip. It only ever flies forward: scrolling up never makes the
 * ship take off on its own.
 */
const JOURNEY_REST = { inMotion: [0.005, JOURNEY.landed] };
const SETTLE_DELAY = 200; // ms without scrolling before the autopilot takes over

/** Remembers the landing for the visit: coming back from another page lands directly. */
const LANDED_SESSION_KEY = 'ab:journey-landed';
const rememberLanding = (landed: boolean) => {
  try {
    if (landed) sessionStorage.setItem(LANDED_SESSION_KEY, '1');
    else sessionStorage.removeItem(LANDED_SESSION_KEY);
  } catch {
    // Storage unavailable (private mode…): the journey simply plays again
  }
};
const hasLandedThisSession = () => {
  try {
    return sessionStorage.getItem(LANDED_SESSION_KEY) === '1';
  } catch {
    return false;
  }
};

interface HeroProps {
  /**
   * Start on the planet, without the journey: the visitor opened a section
   * link (e.g. /en/who-i-am). Known on the server too, so the first render
   * is already folded and the page can jump straight to the section.
   */
  startLanded?: boolean;
}

export const Hero = ({ startLanded = false }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const t = useTranslations('Hero');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Journey progress: follows the scroll until landing, then stays at 1
  const journey = useMotionValue(startLanded ? 1 : 0);
  const [hasLanded, setHasLanded] = useState(startLanded);
  const landedRef = useRef(startLanded);
  const pendingScrollRef = useRef<number | null>(null);
  const replayRequestedRef = useRef(false);

  const { handleMouseMove, xFront, yFront, mouseX } = useMouseParallax();
  const skillsX = useTransform(xFront, (v) => v * 0.25);
  const skillsY = useTransform(yFront, (v) => v * 0.25);

  // --- 1. INVITATION ---
  const introOpacity = useTransform(journey, JOURNEY.introOut, [1, 0]);
  // The title flies past the viewer as the ship takes off (no blur: it read as a glitch)
  const introScale = useTransform(journey, JOURNEY.introOut, reduceMotion ? [1, 1] : [1, 2.2]);
  const indicatorOpacity = useTransform(journey, [0, 0.03], [1, 0]);
  const [isIntroVisible, setIsIntroVisible] = useState(!startLanded);

  // --- 2. SPACE TRAVEL ---
  // Braking out of hyperspace is eased out; the descent is eased in-out: it
  // holds its pace first (you feel the altitude), then flares to a soft stop
  const warpSpeed = useTransform(journey, JOURNEY.warp.at, JOURNEY.warp.speed, {
    ease: [linear, linear, easeOut, easeInOut, linear],
  });
  const pitch = useTransform(journey, JOURNEY.pitch.at, JOURNEY.pitch.deg, { ease: easeInOut });
  // Engines: on while the journey moves forward (scrolling down, autopilot),
  // cut while the visitor scrolls back up. The ship then coasts to a stop and
  // floats, instead of stars rushing at you while you go backwards.
  const engines = useMotionValue(1);
  const shipSpeed = useTransform(() => warpSpeed.get() * engines.get());
  const camera = useMemo(() => ({ speed: shipSpeed, pitch }), [shipSpeed, pitch]);

  // --- 3. ARRIVAL ---
  const atmosphereOpacity = useTransform(journey, JOURNEY.atmosphere, [0, 1]);
  const identityOpacity = useTransform(journey, JOURNEY.identity, [0, 1]);
  const identityY = useTransform(journey, JOURNEY.identity, reduceMotion ? [0, 0] : [60, 0]);
  const identityScale = useTransform(journey, JOURNEY.identity, reduceMotion ? [1, 1] : [0.94, 1]);
  const skillsOpacity = useTransform(journey, JOURNEY.skills, [0, 1]);

  // --- AUTOPILOT ---
  // Plays the journey (Launch button), and finishes it when the visitor stops
  // mid-flight, so the ship never idles in hyperspace. Native scroll is never
  // blocked: any manual input takes back control instantly.
  const journeyRef = useRef<AnimationPlaybackControls | null>(null);

  /** Hero scroll geometry, in px. */
  const getJourneyMetrics = useCallback(() => {
    const el = containerRef.current;
    if (!el) return null;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    return { start, distance, progress: (window.scrollY - start) / distance };
  }, []);

  const flyTo = useCallback(
    (targetProgress: number, ease: [number, number, number, number] = [0.45, 0, 0.25, 1]) => {
      const m = getJourneyMetrics();
      if (!m || m.distance <= 0) return;
      const target = m.start + m.distance * targetProgress;

      journeyRef.current?.stop();
      engines.set(1); // the autopilot always flies forward
      if (reduceMotion) {
        window.scrollTo({ top: target });
        return;
      }
      // Same cruising pace whatever the starting point
      const duration = Math.max(0.8, LAUNCH_DURATION * Math.abs(targetProgress - m.progress));
      journeyRef.current = animate(window.scrollY, target, {
        duration,
        ease,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          journeyRef.current = null;
        },
      });
    },
    [getJourneyMetrics, reduceMotion, engines]
  );

  const launchJourney = useCallback(() => flyTo(JOURNEY.arrival), [flyTo]);

  // --- LANDING: fold the journey away, keeping the view exactly in place ---
  const land = useCallback(() => {
    const m = getJourneyMetrics();
    if (landedRef.current || !m) return;
    landedRef.current = true;
    journeyRef.current?.stop();
    journeyRef.current = null;
    // The hero shrinks to one screen: keep the view exactly where it is
    pendingScrollRef.current = m.start + Math.max(0, window.scrollY - m.start - m.distance);
    // Play the last moments of the landing (mountains settling, name fading in)
    if (reduceMotion) journey.set(1);
    // A slow finish: the mountains and the name settle in (longer landing)
    else animate(journey, 1, { duration: 1.5, ease: 'easeOut' });
    setIsIntroVisible(false);
    setHasLanded(true);
    rememberLanding(true);
  }, [getJourneyMetrics, journey, reduceMotion]);

  // Already landed earlier in this visit: start on the planet, no journey
  useLayoutEffect(() => {
    if (startLanded) {
      rememberLanding(true);
      return;
    }
    if (!hasLandedThisSession()) return;
    landedRef.current = true;
    journey.set(1);
    setIsIntroVisible(false); // eslint-disable-line react-hooks/set-state-in-effect
    setHasLanded(true);
  }, [journey, startLanded]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (landedRef.current) return;
    journey.set(v);
    setIsIntroVisible(v < 0.05);
    if (v >= JOURNEY.landed) land();
  });

  // --- REPLAY: unfold the journey, back to the invitation ---
  // The visitor takes off again themselves (scroll or "Lancer le voyage")
  const [showReplay, setShowReplay] = useState(false);
  const replayJourney = useCallback(() => {
    replayRequestedRef.current = true;
    landedRef.current = false;
    journey.set(0);
    engines.set(1);
    rememberLanding(false);
    setShowReplay(false);
    setIsIntroVisible(true);
    setHasLanded(false);
  }, [journey, engines]);

  // "Revoir le voyage" only shows up when the visitor tries to go further up
  // than the planet (wheel, touch swipe or keyboard while already at the top)
  useEffect(() => {
    if (!hasLanded) return;
    const atTop = () => (containerRef.current?.getBoundingClientRect().top ?? -1) >= -1;
    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && atTop()) setShowReplay(true);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'PageUp', 'Home'].includes(e.key) && atTop()) setShowReplay(true);
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const pulledDown = (e.touches[0]?.clientY ?? 0) - touchStartY > 30;
      if (pulledDown && atTop()) setShowReplay(true);
    };
    // Heading back down into the site: tuck it away again
    const onScroll = () => {
      if ((containerRef.current?.getBoundingClientRect().top ?? 0) < -120) setShowReplay(false);
    };

    const opts = { passive: true } as const;
    window.addEventListener('wheel', onWheel, opts);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, opts);
    window.addEventListener('touchmove', onTouchMove, opts);
    window.addEventListener('scroll', onScroll, opts);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasLanded]);

  // Scroll adjustments happen right after the height change, before paint
  useLayoutEffect(() => {
    if (hasLanded && pendingScrollRef.current !== null) {
      window.scrollTo(0, pendingScrollRef.current);
      pendingScrollRef.current = null;
    }
    if (!hasLanded && replayRequestedRef.current) {
      replayRequestedRef.current = false;
      const m = getJourneyMetrics();
      if (m) window.scrollTo(0, m.start);
    }
  }, [hasLanded, getJourneyMetrics]);

  // --- ARRIVAL INTERACTIONS ---
  const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

  // A slower, eased glide to the next section than the browser's smooth
  // scroll (instant with reduced motion)
  const discoverSite = useCallback(() => {
    const target = document.getElementById('who-i-am');
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    if (reduceMotion) {
      window.scrollTo(0, top);
      return;
    }
    animate(window.scrollY, top, {
      duration: 1.4,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    });
  }, [reduceMotion]);

  const goToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  }, [scrollBehavior]);

  // A skill star leads to its section, or to its logo in the skills grid (highlighted)
  const goToSkill = useCallback(
    (target: SkillTarget) => {
      if ('section' in target) {
        document.getElementById(target.section)?.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
        return;
      }
      const logo = document.querySelector<HTMLElement>(`[data-skill="${CSS.escape(target.skill)}"]`);
      if (!logo) return;
      logo.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
      logo.classList.remove('animate-skill-ping');
      void logo.offsetWidth; // restart the animation if clicked twice
      logo.classList.add('animate-skill-ping');
      window.setTimeout(() => logo.classList.remove('animate-skill-ping'), 4500);
    },
    [scrollBehavior]
  );

  useEffect(() => {
    let lastY = window.scrollY;
    let direction = 1;
    let isTouching = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const cancel = () => {
      journeyRef.current?.stop();
      journeyRef.current = null;
    };

    // Visitor stopped mid-flight while heading down: finish the trip.
    // Never when they were scrolling up: the ship doesn't move on its own then.
    const settle = () => {
      if (landedRef.current || journeyRef.current || isTouching || reduceMotion) return;
      if (direction < 0) return;
      const m = getJourneyMetrics();
      if (!m) return;
      const { inMotion } = JOURNEY_REST;
      if (m.progress > inMotion[0] && m.progress < inMotion[1]) {
        // Starts with some momentum: it carries on the visitor's own motion
        flyTo(JOURNEY.arrival, [0.2, 0.25, 0.25, 1]);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (journeyRef.current) {
        lastY = y; // our own scrolling: just keep track of the position
        return;
      }
      if (y !== lastY) {
        direction = y > lastY ? 1 : -1;
        engines.set(direction > 0 ? 1 : 0);
      }
      lastY = y;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_DELAY);
    };

    const onTouchStart = () => {
      isTouching = true;
      cancel();
    };
    const onTouchEnd = () => {
      isTouching = false;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_DELAY);
    };

    const opts = { passive: true } as const;
    window.addEventListener('scroll', onScroll, opts);
    window.addEventListener('wheel', cancel, opts);
    window.addEventListener('keydown', cancel);
    window.addEventListener('touchstart', onTouchStart, opts);
    window.addEventListener('touchend', onTouchEnd, opts);
    window.addEventListener('touchcancel', onTouchEnd, opts);
    return () => {
      cancel();
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [flyTo, getJourneyMetrics, reduceMotion, engines]);

  return (
    <div
      ref={containerRef}
      className={cn(
        // overflow-anchor: none — we compensate the fold ourselves, precisely
        'relative w-full bg-black [overflow-anchor:none]',
        hasLanded ? 'h-screen' : reduceMotion ? 'h-[200vh]' : 'h-[350vh]'
      )}
    >
      <div
        onMouseMove={handleMouseMove}
        // --mountains-h: height of the landing ridges, shared by the mountains
        // and the identity block (centered in the sky above them)
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black [--mountains-h:clamp(120px,24vh,280px)]"
      >
        <StarryBackground camera={camera} reducedMotion={reduceMotion} />
        {/* Planet atmosphere glowing from the horizon on arrival */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: atmosphereOpacity }}
          className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_120%_60%_at_50%_115%,rgba(64,100,170,0.35)_0%,rgba(24,40,80,0.18)_40%,transparent_70%)]"
        />

        {!hasLanded && (
          <>
            {/* Invitation: language choice, top right (fades out at take-off) */}
            <motion.div
              style={{ opacity: introOpacity }}
              className={cn(
                'absolute z-30 top-4 right-4 md:top-8 md:right-10',
                !isIntroVisible && 'pointer-events-none'
              )}
            >
              <LanguageSwitch />
            </motion.div>

            <IntroText opacity={introOpacity} scale={introScale} isVisible={isIntroVisible} />
            <ScrollIndicator
              opacity={indicatorOpacity}
              onClick={launchJourney}
              isVisible={isIntroVisible}
              label={t('scrollDown.label')}
              ariaLabel={t('scrollDown.ariaLabel')}
            />
          </>
        )}

        <motion.div
          style={{ opacity: identityOpacity, y: identityY, scale: identityScale }}
          // Centered in the sky: from the top of the screen to the mountain tops
          className="absolute inset-x-0 top-0 bottom-(--mountains-h) z-10 flex items-center justify-center"
        >
          <IdentityBlock />
        </motion.div>

        <SkillStars
          x={skillsX}
          y={skillsY}
          opacity={skillsOpacity}
          interactive={hasLanded}
          onStarClick={goToSkill}
        />

        {/* Landing: the planet's ridges rise from the horizon */}
        <Mountains progress={journey} mouseX={mouseX} />

        {/* Landed: contact + language, top right */}
        {hasLanded && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            className="absolute z-30 top-4 right-4 md:top-8 md:right-10 flex items-center gap-3"
          >
            <button
              type="button"
              onClick={goToContact}
              className="group relative isolate h-9 px-5 rounded-full bg-white/6 text-white/90 text-xs font-medium uppercase tracking-[0.2em] hover:text-black focus-visible:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-300 ease-out cursor-pointer"
            >
              {/* White fill fading in on hover: an opacity transition (GPU) is
                  smoother than animating the background color, and its length
                  absorbs quick in/out flickers along the rounded edge */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-out"
              />
              {t('contact')}
            </button>
            <LanguageSwitch />
          </motion.div>
        )}

        {/* Landed: invite to explore the rest of the site */}
        {hasLanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ScrollIndicator
              onClick={discoverSite}
              isVisible
              label={t('discover.label')}
              ariaLabel={t('discover.ariaLabel')}
              // Same look as the intro's "Scroll down", on the sky just above
              // the ridges (white on the snow lacked contrast)
              className="bottom-[calc(var(--mountains-h)-3.5rem)]"
            />
          </motion.div>
        )}

        {/* Landed + trying to scroll further up: offer to replay the trip */}
        <AnimatePresence>
          {hasLanded && showReplay && (
            <motion.button
              type="button"
              onClick={replayJourney}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute z-30 top-20 md:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.2em] font-light text-white/70 hover:text-white hover:bg-white/12 focus-visible:text-white focus-visible:outline focus-visible:outline-white/40 transition-colors cursor-pointer"
            >
              <Icon name="Undo" size={16} />
              {t('replay')}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
