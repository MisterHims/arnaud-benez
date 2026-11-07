'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

/**
 * Floating "back to top" button, bottom right. Lifts above the footer when
 * it comes into view, so it never covers the legal links.
 * No outline nor backdrop blur: both drew jagged rounded edges with
 * fractional display scaling (125%…); a plain fill stays smooth.
 */
export const BackToTop = ({ afterId }: BackToTopProps) => {
  const t = useTranslations('BackToTop');
  const reduceMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById(afterId);
      setIsVisible(!!section && section.getBoundingClientRect().top < window.innerHeight / 2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const footer = document.querySelector('footer');
    const observer = new IntersectionObserver(([entry]) => setIsOverFooter(entry.isIntersecting));
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [afterId]);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
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
            'fixed z-40 right-4 md:right-10 size-10 rounded-full flex items-center justify-center',
            'bg-zinc-800/80 text-white/90',
            'hover:bg-white hover:text-black transition-[background-color,color,bottom] duration-300 cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
            isOverFooter ? 'bottom-20' : 'bottom-4 md:bottom-8'
          )}
        >
          <Icon name="ChevronUp" size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
