'use client';

import { useEffect } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';

const SECTION_SELECTOR = '[data-snap-section]';
const SETTLE_DELAY = 180;      // ms without scrolling before settling
const USER_INPUT_WINDOW = 1500; // only settle right after the visitor's own scrolling
const DESKTOP_QUERY = '(min-width: 768px)';
// A section taller than this many screens is "tall": crossing out of it needs intent
const TALL_SECTION_RATIO = 1.15;
// Share of the screen the destination must already occupy before a tall section glides
const INTENT_THRESHOLD = 0.35;
// Glide pace: duration grows with the distance (px / GLIDE_SPEED), clamped (seconds)
const GLIDE_SPEED = 700;
const GLIDE_MIN_DURATION = 0.7;
const GLIDE_MAX_DURATION = 1.5;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * "Slides" between sections, without hijacking the scroll:
 * - inside a section (even a tall one) scrolling stays completely free;
 * - when the visitor stops with a section boundary on screen, the page glides
 *   to the section they were heading to (next section's start when going
 *   down, previous section's end/start when going up);
 * - any input cancels the glide instantly; programmatic scrolls (links,
 *   "Découvrir"…) never trigger it.
 *
 * Sections opt in with the `data-snap-section` attribute. A section can opt
 * out temporarily with `data-snap-section="off"` (e.g. the hero journey).
 */
export const useSectionSnap = () => {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    let glide: AnimationPlaybackControls | null = null;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let lastY = window.scrollY;
    let direction = 1;
    let lastUserInput = 0;
    let isTouching = false;

    const stopGlide = () => {
      glide?.stop();
      glide = null;
    };

    const settle = () => {
      if (glide || isTouching || !desktop.matches || reducedMotion.matches) return;
      if (Date.now() - lastUserInput > USER_INPUT_WINDOW) return;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const sections = [...document.querySelectorAll<HTMLElement>(SECTION_SELECTOR)].map((el) => ({
        el,
        top: el.getBoundingClientRect().top + y,
        height: el.offsetHeight,
        disabled: el.dataset.snapSection === 'off',
      }));

      // Section at the top of the screen, and the next one
      const currentIndex = sections.findLastIndex((s) => s.top <= y + 1);
      const current = sections[currentIndex];
      const next = sections[currentIndex + 1];
      if (!current || !next || current.disabled) return;

      // Fully inside a section: free scrolling, nothing to do. As soon as the
      // end of the current section is on screen (even if a decorative
      // transition, not a section, sits between the two), we're "between" them
      const currentEnd = current.top + current.height;
      const currentEndVisible = currentEnd < y + vh - 1;
      if (!currentEndVisible) return;

      // Intent threshold for tall sections: reading the bottom of a long
      // section (or peeking at the next one) must not throw you forward, and a
      // small scroll up must not throw you back. Short sections stay snappy.
      const isTall = (s: { height: number }) => s.height > vh * TALL_SECTION_RATIO;
      const beyondCurrent = y + vh - currentEnd; // px of the screen past the current section
      const currentShown = currentEnd - y;       // px of the current section still on screen
      if (direction > 0 && isTall(current) && beyondCurrent < vh * INTENT_THRESHOLD) return;
      if (direction < 0 && isTall(current) && currentShown < vh * INTENT_THRESHOLD) return;

      const target =
        direction > 0
          ? next.top
          : // Going up: land on the end of the previous section if it's taller
            // than the screen (keeps reading flow), otherwise on its start
            current.height > vh
            ? current.top + current.height - vh
            : current.top;

      const distance = Math.abs(target - y);
      if (distance < 2) return;

      glide = animate(y, target, {
        duration: Math.min(GLIDE_MAX_DURATION, Math.max(GLIDE_MIN_DURATION, distance / GLIDE_SPEED)),
        // Soft start and soft arrival: the page eases away, then settles
        ease: [0.45, 0, 0.2, 1],
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          glide = null;
        },
      });
    };

    const scheduleSettle = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_DELAY);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (!glide && y !== lastY) direction = y > lastY ? 1 : -1;
      lastY = y;
      if (!glide) scheduleSettle();
    };

    const onUserInput = () => {
      lastUserInput = Date.now();
      stopGlide();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(e.key)) onUserInput();
      else stopGlide();
    };
    const onTouchStart = () => {
      isTouching = true;
      onUserInput();
    };
    const onTouchEnd = () => {
      isTouching = false;
      lastUserInput = Date.now();
      scheduleSettle();
    };

    const opts = { passive: true } as const;
    window.addEventListener('scroll', onScroll, opts);
    window.addEventListener('wheel', onUserInput, opts);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, opts);
    window.addEventListener('touchend', onTouchEnd, opts);
    window.addEventListener('touchcancel', onTouchEnd, opts);
    return () => {
      stopGlide();
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onUserInput);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);
};
