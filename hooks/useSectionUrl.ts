'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getPathname } from '@/i18n/navigation';
import { SECTION_IDS, SECTION_TITLE_NAMESPACE, type SectionId } from '@/src/data/sections';

/** A section is "current" once its top passes this line (fraction of the viewport). */
const ACTIVE_LINE = 0.35;
/** Position within the current section, kept across a language switch. */
const OFFSET_SESSION_KEY = 'ab:section-offset';

/** The section being read (its top past ACTIVE_LINE), or null on the hero */
export const currentSection = (): SectionId | null => {
  let current: SectionId | null = null;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE) current = id;
  }
  return current;
};

/**
 * Call right before switching language: the texts differ in length, so the
 * same scroll position would land elsewhere. The new page restores the
 * position relative to the section being read instead.
 */
export const rememberSectionOffset = () => {
  const section = currentSection();
  const el = section && document.getElementById(section);
  if (!el) return;
  try {
    sessionStorage.setItem(OFFSET_SESSION_KEY, JSON.stringify({ section, offset: -el.getBoundingClientRect().top }));
  } catch {
    // Storage unavailable: the section top is used instead
  }
};

const takeSectionOffset = (section: SectionId): number | null => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(OFFSET_SESSION_KEY) ?? 'null');
    sessionStorage.removeItem(OFFSET_SESSION_KEY);
    return saved?.section === section && typeof saved.offset === 'number' ? saved.offset : null;
  } catch {
    return null;
  }
};

/**
 * Keeps the address bar (and the tab title) on the section being read
 * ("/qui-suis-je", "/en/who-i-am"…) without navigating, so the URL can be
 * shared as is. On load, a section URL opens the page right on that section.
 */
export const useSectionUrl = (initialSection?: SectionId) => {
  const locale = useLocale();
  const t = useTranslations();

  // Opening a section link: jump to it before the first paint (the hero
  // starts landed, see Home). After a language switch, back to the same
  // spot within the section.
  useLayoutEffect(() => {
    if (!initialSection) return;
    const el = document.getElementById(initialSection);
    if (!el) return;
    const offset = takeSectionOffset(initialSection);
    if (offset !== null) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'instant' });
    } else if (currentSection() !== initialSection) {
      el.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }, [initialSection]);

  // While scrolling: reflect the current section in the URL and the title
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      const section = currentSection();
      const path = getPathname({ locale, href: section ? `/${section}` : '/' });
      if (path === window.location.pathname) return;
      // Replace, not push: the back button leaves the site instead of
      // replaying every section the visitor scrolled through. State null:
      // Next.js then syncs its router (usePathname, language switch)
      window.history.replaceState(null, '', path + window.location.search);
      document.title = section
        ? `${t(`${SECTION_TITLE_NAMESPACE[section]}.title`)} – ${t('Metadata.name')}`
        : t('Metadata.title');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [locale, t]);
};
