'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { getPathname } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { currentSection } from '@/hooks/useSectionUrl';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SECTION_IDS, SECTION_TITLE_NAMESPACE, type SectionId } from '@/src/data/sections';
import { cn } from '@/lib/utils';

/** Pixels scrolled in one direction before the bar hides / shows again */
const SCROLL_TOLERANCE = 8;

/**
 * Site navigation, once past the hero (never during the journey nor on the
 * arrival screen, which has its own Contact button and language switch).
 * - md and up: the sections and FR | EN on the right, the section being
 *   read underlined, over a black-to-transparent fade (no bar edge);
 * - phones (below md): a menu button opening the sections full screen.
 * It slides away while scrolling down (room for the content) and comes back
 * as soon as the visitor scrolls up, when they are likely looking for it.
 */
export const SiteNav = () => {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = usePrefersReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let travelled = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const first = document.getElementById(SECTION_IDS[0]);
      // Arriving on Who I Am (scrolling down) keeps it hidden: it shows up
      // on the first scroll up
      setPastHero(!!first && first.getBoundingClientRect().top <= 1);
      setActive(currentSection());
      // Direction, with some tolerance (no flicker on tiny moves)
      const delta = y - lastY;
      lastY = y;
      travelled = Math.sign(delta) === Math.sign(travelled) ? travelled + delta : delta;
      if (travelled > SCROLL_TOLERANCE) setHidden(true);
      else if (travelled < -SCROLL_TOLERANCE) setHidden(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Also when the layout changes without scrolling (a section link opening
    // the page, a language switch re-rendering it): never a stale bar over
    // the arrival screen
    window.addEventListener('resize', onScroll);
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  // Menu open: no page scroll behind it, Escape closes it, focus moves into
  // it and back to the menu button when it closes
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    const menuButton = menuButtonRef.current;
    root.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      menuButton?.focus();
    };
  }, [menuOpen]);

  // Real links (shareable, work without JS), smoothly scrolled with JS
  const goTo = (e: MouseEvent, id: SectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
  };

  const title = (id: SectionId) => t(`${SECTION_TITLE_NAMESPACE[id]}.title`);
  const href = (id: SectionId) => getPathname({ locale, href: `/${id}` });
  const visible = pastHero && (!hidden || menuOpen);

  return (
    <>
      <motion.header
        initial={false}
        // Hidden: moved up past its full height (64 + 48px), so nothing peeks
        animate={visible ? { y: 0, opacity: 1 } : { y: reduceMotion ? 0 : -120, opacity: reduceMotion ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        // Inert on the hero only: once past it, a slid-away bar stays
        // reachable by keyboard and slides back in when focused
        inert={!pastHero}
        onFocus={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 pb-12 pointer-events-none"
      >
        {/* Background: solid page black behind the links, then a long, eased
            fade to transparent over the bottom of the bar (extra room under
            the links: pb-12): no hard edge, no border. The fade lets clicks
            through (pointer-events-none on the bar, back on the links row) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgb(7 8 10 / 0) 0%, rgb(7 8 10 / 0.25) 12%, rgb(7 8 10 / 0.55) 25%, rgb(7 8 10 / 0.82) 38%, rgb(7 8 10) 50%)',
          }}
        />
        <div className="mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] xl:w-[calc(100%-8rem)] max-w-10xl xl:max-w-9xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl h-16 flex items-center justify-end gap-6 pointer-events-auto">
          {/* md and up: the sections inline (they fit from 768px) */}
          <nav aria-label={t('Nav.label')} className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Links as blocks with the same line height as FR | EN: as inline
                text they sat on the list's taller line box, ~2px lower */}
            <ul className="flex items-center gap-5 lg:gap-7">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={href(id)}
                    onClick={(e) => goTo(e, id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={cn(
                      'relative block py-2 text-xs leading-4 uppercase tracking-[0.2em] transition-colors rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60',
                      // The section being read: white, underlined
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white after:transition-transform after:duration-300 after:origin-left",
                      active === id ? 'text-white after:scale-x-100' : 'text-white/55 hover:text-white/90 after:scale-x-0'
                    )}
                  >
                    {title(id)}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageSwitch />
          </nav>

          {/* Below md (phones): the menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            aria-label={menuOpen ? t('Nav.close') : t('Nav.open')}
            className="md:hidden -mr-2 size-10 flex items-center justify-center rounded-full text-white/90 hover:text-white hover:bg-white/6 focus-visible:outline-2 focus-visible:outline-white/60 transition-colors cursor-pointer"
          >
            <Icon name={menuOpen ? 'Close' : 'Menu'} size={22} />
          </button>
        </div>
      </motion.header>

      {/* Phones: the sections full screen, under the bar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="md:hidden fixed inset-0 z-45 bg-[#07080a] pt-20 flex flex-col"
          >
            <nav aria-label={t('Nav.label')} className="flex-1 flex flex-col">
              <div className="flex-1 flex flex-col justify-center px-6 md:px-10">
              <ul className="flex flex-col gap-2">
                {SECTION_IDS.map((id, index) => (
                  <motion.li
                    key={id}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.3, ease: 'easeOut' }}
                  >
                    <a
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={href(id)}
                      onClick={(e) => goTo(e, id)}
                      aria-current={active === id ? 'true' : undefined}
                      className={cn(
                        'block py-2 text-4xl md:text-5xl font-black tracking-tight rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60 transition-colors',
                        active === id ? 'text-white' : 'text-white/45 hover:text-white/80'
                      )}
                    >
                      {title(id)}
                    </a>
                  </motion.li>
                ))}
              </ul>
              </div>
              {/* Inside the nav landmark (all the menu's content is) */}
              <div className="px-6 md:px-10 pb-10">
                <LanguageSwitch />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
