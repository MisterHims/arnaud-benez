'use client';

import { useEffect, useState, type RefObject } from 'react';
import { useInView } from 'framer-motion';

/**
 * True once the element has stayed in view for `delay` ms (leaving earlier
 * resets the countdown); stays true afterwards. Used to bring calls to
 * action in after the visitor has spent a moment on the content.
 */
export const useDelayedReveal = (
  ref: RefObject<Element | null>,
  { delay = 2500, amount = 0.4 }: { delay?: number; amount?: number } = {}
) => {
  const inView = useInView(ref, { amount });
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!inView || revealed) return;
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [inView, revealed, delay]);
  return revealed;
};
