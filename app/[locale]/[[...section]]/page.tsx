import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Home } from '@/components/Home';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SECTION_IDS, SECTION_TITLE_NAMESPACE, isSectionId, type SectionId } from '@/src/data/sections';
import { KNOWS_ABOUT, PROFILES, SITE_URL } from '@/src/data/site';

type PageParams = { params: Promise<{ locale: string; section?: string[] }> };

// One page, several URLs: "/" and one per section ("/qui-suis-je",
// "/en/who-i-am"…). A shared section link opens the page right on it.
export function generateStaticParams() {
  return [{ section: [] }, ...SECTION_IDS.map((id) => ({ section: [id] }))];
}

// Any other path is a 404
export const dynamicParams = false;

/** The requested section, or undefined for the home URL; 404 if unknown. */
const resolveSection = (section?: string[]): SectionId | undefined => {
  if (!section || section.length === 0) return undefined;
  if (section.length > 1 || !isSectionId(section[0])) notFound();
  return section[0];
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale: requested, section: segments } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const section = resolveSection(segments);
  const href = section ? (`/${section}` as const) : '/';
  const languages = Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href })]));
  const url = languages[locale];
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });

  let title = tMeta('title');
  let description = tMeta('description');
  if (section) {
    const t = await getTranslations({ locale, namespace: SECTION_TITLE_NAMESPACE[section] });
    title = `${t('title')} – ${tMeta('name')}`;
    description = t('metaDescription');
  }

  return {
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, 'x-default': languages[routing.defaultLocale] } },
    // Replaces the layout's openGraph as a whole (no deep merge): full set here
    openGraph: {
      type: 'website',
      siteName: tMeta('name'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      title,
      description,
      url,
    },
  };
}

export default async function Page({ params }: PageParams) {
  const { locale, section: segments } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const section = resolveSection(segments);

  // Structured data: who this site is about (schema.org Person)
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  const tHero = await getTranslations({ locale, namespace: 'Hero.identity' });
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: tMeta('name'),
    url: new URL(getPathname({ locale, href: '/' }), SITE_URL).href,
    image: new URL('/assets/portrait.png', SITE_URL).href,
    jobTitle: [tHero('designer'), tHero('developer')],
    description: tMeta('description'),
    address: { '@type': 'PostalAddress', addressRegion: 'Val-de-Marne', addressCountry: 'FR' },
    knowsLanguage: ['fr', 'en'],
    knowsAbout: KNOWS_ABOUT,
    sameAs: PROFILES,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" keeps the JSON from closing the script tag (XSS-safe)
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Home initialSection={section} />
    </>
  );
}
