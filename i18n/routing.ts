import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  // French lives at the root ("/"), English under "/en"
  localePrefix: 'as-needed',
  // Each section has its own shareable URL, with a slug in each language.
  // Keys are the internal pathnames (= section ids, see src/data/sections.ts)
  pathnames: {
    '/': '/',
    '/who-i-am': { fr: '/qui-suis-je', en: '/who-i-am' },
    '/what-i-do': { fr: '/ce-que-je-fais', en: '/what-i-do' },
    '/experience': { fr: '/experiences', en: '/experience' },
    '/works': { fr: '/realisations', en: '/works' },
    '/contact': '/contact',
    '/legal': { fr: '/mentions-legales', en: '/legal-notice' },
  },
});

export type Locale = (typeof routing.locales)[number];
