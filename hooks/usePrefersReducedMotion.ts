'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

/**
 * Hydration-safe "prefers-reduced-motion": returns false during SSR and
 * hydration (matching the server HTML), then the real preference.
 * Framer's useReducedMotion() reads it on the first client render instead,
 * which causes hydration mismatches when the result changes markup.
 */
export const usePrefersReducedMotion = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
