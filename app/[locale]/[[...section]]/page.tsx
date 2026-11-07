import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Home } from '@/components/Home';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SECTION_IDS, SECTION_TITLE_NAMESPACE, isSectionId, type SectionId } from '@/src/data/sections';

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
  const alternates = { canonical: languages[locale], languages };
  if (!section) return { alternates };

  const t = await getTranslations({ locale, namespace: SECTION_TITLE_NAMESPACE[section] });
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  return { title: `${t('title')} – ${tMeta('name')}`, alternates };
}

export default async function Page({ params }: PageParams) {
  const { locale, section: segments } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <Home initialSection={resolveSection(segments)} />;
}
