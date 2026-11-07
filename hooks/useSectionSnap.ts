'use client';

import { useEffect } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';

const SECTION_SELECTOR = '[data-snap-section]';
const SETTLE_DELAY = 180;      // ms without scrolling before settling
const USER_INPUT_WINDOW = 1500; // only settle right after the visitor's own scrolling
const DESKTOP_QUERY = '(min-width: 768px)';
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
      const currentEndVisible = current.top + current.height < y + vh - 1;
      if (!currentEndVisible) return;

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
        duration: Math.min(0.8, Math.max(0.35, distance / 1400)),
        ease: [0.25, 0.1, 0.25, 1],
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
