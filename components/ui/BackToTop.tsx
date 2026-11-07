'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/Icon';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  /**
   * Id of the first section after the hero: the button shows once its top
   * reaches the middle of the screen. Never during the hero's journey,
   * which scrolls a long way without leaving the first screen.
   */
  afterId: string;
}

/** Gap kept between the button and the top of the footer, in px */
const FOOTER_GAP = 16;
/** Button size, in px (size-10) */
const BUTTON_SIZE = 40;

/**
 * Floating "back to top" button, bottom right. As the footer scrolls into
 * view, the button eases into the footer's row, centered on the copyright /
 * language line. On narrower screens, where it would cover the language
 * switch, the footer pushes it up instead (FOOTER_GAP above it).
 * No outline nor backdrop blur: both drew jagged rounded edges with
 * fractional display scaling (125%…); a plain fill stays smooth.
 */
export const BackToTop = ({ afterId }: BackToTopProps) => {
  const t = useTranslations('BackToTop');
  const reduceMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  // Vertical shift, following the scroll (0 until the footer shows up)
  const lift = useMotionValue(0);
  // Smoothed: a fast scroll to the bottom would otherwise snap it up at
  // once (damped, no bounce; instant with reduced motion)
  const smoothLift = useSpring(lift, { stiffness: 90, damping: 22 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById(afterId);
      setIsVisible(!!section && section.getBoundingClientRect().top < window.innerHeight / 2);

      const footer = document.querySelector('footer');
      const wrapper = wrapperRef.current;
      if (!footer || !wrapper) return;
      const languageSwitch = footer.querySelector('nav')?.getBoundingClientRect();
      if (!languageSwitch) return;
      const own = wrapper.getBoundingClientRect();
      const box = footer.getBoundingClientRect();
      const restBottom = parseFloat(getComputedStyle(wrapper).bottom) || 0;
      const footerVisible = Math.max(0, window.innerHeight - box.top);

      // Narrow screens: the button is over the language switch, so it stays
      // FOOTER_GAP above the footer
      if (own.left <= languageSwitch.right + FOOTER_GAP && own.right >= languageSwitch.left - FOOTER_GAP) {
        lift.set(-Math.max(0, footerVisible + FOOTER_GAP - restBottom));
        return;
      }
      // Room beside the switch: glide toward the footer's row as the footer
      // comes in, centered on that line once the footer is fully shown
      const rowCenter = window.innerHeight - box.height + (languageSwitch.top + languageSwitch.height / 2 - box.top);
      const restCenter = window.innerHeight - restBottom - BUTTON_SIZE / 2;
      const progress = Math.min(1, footerVisible / box.height);
      lift.set((rowCenter - restCenter) * progress);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Also when the page height changes without scrolling (fonts, a card
    // unfolding…): the footer moves under a still button
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, [afterId, lift]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    // Positioned wrapper, shifted by the footer; the button inside fades in / out
    <motion.div ref={wrapperRef} style={{ y: reduceMotion ? lift : smoothLift }} className="fixed z-40 right-4 md:right-10 bottom-4 md:bottom-8">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            type="button"
            onClick={backToTop}
            aria-label={t('label')}
            title={t('label')}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={cn(
              'size-10 rounded-full flex items-center justify-center',
              'bg-zinc-800/80 text-white/90',
              'hover:bg-white hover:text-black transition-[background-color,color] duration-300 cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            )}
          >
            <Icon name="ChevronUp" size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
