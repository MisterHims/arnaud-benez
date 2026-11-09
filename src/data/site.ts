// src/data/site.ts
// Public identity of the site, used for metadata and structured data (SEO).

/** Absolute site URL (canonical links, Open Graph, JSON-LD). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.arnaud-benez.net';

/** Public profiles (schema.org "sameAs"). Add LinkedIn once the URL is known. */
export const PROFILES: string[] = ['https://github.com/MisterHims'];

/** Skills listed in the structured data ("knowsAbout"). */
export const KNOWS_ABOUT = [
  'UI/UX Design',
  'User Experience',
  'Accessibility (WCAG)',
  'Design Systems',
  'Prototyping',
  'Figma',
  'Front-End Development',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'E-commerce',
  'Conversion Rate Optimization',
  'Technical SEO',
  'Art Direction',
  'Branding',
  'Motion Design',
  'Project Management',
  'Agile',
];

/** Contact email, shown in the legal notice. */
export const CONTACT_EMAIL = 'arnaud.benez@gmail.com';

/**
 * Hosting provider, required in the legal notice (LCEN): name, address and
 * phone. Not chosen yet: the legal notice shows a "to be completed" note.
 */
export const HOSTING: { name: string; address: string; phone: string } | null = null;
