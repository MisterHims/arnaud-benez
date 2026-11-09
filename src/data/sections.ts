// src/data/sections.ts
// The page sections that have their own URL (shareable, e.g. /en/who-i-am).
// The id is the DOM id of the <section>, and the internal pathname
// ("/who-i-am"); localized slugs live in i18n/routing.ts.

export const SECTION_IDS = ['who-i-am', 'what-i-do', 'experience', 'works', 'contact'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const isSectionId = (value: unknown): value is SectionId =>
  typeof value === 'string' && (SECTION_IDS as readonly string[]).includes(value);

/** Messages namespace holding each section's title (page titles, metadata). */
export const SECTION_TITLE_NAMESPACE = {
  'who-i-am': 'WhoIAm',
  'what-i-do': 'WhatIDo',
  experience: 'Experience',
  works: 'Works',
  contact: 'Contact',
} as const satisfies Record<SectionId, string>;
