import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/sections/Footer';
import { Icon } from '@/components/ui/Icon';
import { NightSky } from '@/components/ui/NightSky';
import { getPathname, Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { CONTACT_EMAIL, HOSTING } from '@/src/data/site';

type PageParams = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const languages = Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: '/legal' })]));
  const t = await getTranslations({ locale, namespace: 'Legal' });
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  const title = `${t('title')} – ${tMeta('name')}`;
  return {
    title,
    description: t('metaDescription'),
    alternates: { canonical: languages[locale], languages: { ...languages, 'x-default': languages[routing.defaultLocale] } },
    openGraph: {
      type: 'website',
      siteName: tMeta('name'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      title,
      description: t('metaDescription'),
      url: languages[locale],
    },
  };
}

const linkClass = 'underline underline-offset-2 text-zinc-300 hover:text-white transition-colors';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-xl font-bold text-[#ebedf0]">{title}</h2>
    {children}
  </section>
);

/**
 * Legal notice (French LCEN): publisher, hosting, intellectual property,
 * personal data (GDPR) and cookies. A plain reading page under the same
 * night sky as the rest of the site.
 */
export default async function LegalPage({ params }: PageParams) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations('Legal');

  const rich = {
    b: (chunks: React.ReactNode) => <strong className="font-medium text-zinc-200">{chunks}</strong>,
    br: () => <br />,
    email: () => <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>{CONTACT_EMAIL}</a>,
    cnil: (chunks: React.ReactNode) => (
      <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className={linkClass}>{chunks}</a>
    ),
  };
  const p = 'text-zinc-400 font-light leading-relaxed';

  return (
    <>
      <main className="relative isolate min-h-svh overflow-hidden">
        <NightSky seed={71} count={36} />
        <div className="mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] max-w-3xl pt-10 md:pt-16 pb-24 md:pb-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 -ml-1 rounded-full px-1 py-1 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-white/50 transition-colors"
          >
            <Icon name="ChevronLeft" size={16} />
            <span className="relative top-px">{t('back')}</span>
          </Link>

          <h1 className="mt-12 md:mt-16 text-5xl md:text-7xl font-black text-[#ebedf0] tracking-tight">{t('title')}</h1>
          <p className="mt-4 text-sm text-zinc-400">{t('updated')}</p>

          <div className="mt-12 md:mt-16 flex flex-col gap-10 md:gap-12">
            <Section title={t('editor.title')}>
              <p className={p}>{t.rich('editor.p1', rich)}</p>
              <p className={p}>{t.rich('editor.p2', rich)}</p>
              <p className={p}>{t.rich('editor.p3', rich)}</p>
            </Section>

            <Section title={t('host.title')}>
              {HOSTING ? (
                <p className={p}>
                  <strong className="font-medium text-zinc-200">{HOSTING.name}</strong><br />
                  {HOSTING.address}<br />
                  {t('host.phone', { phone: HOSTING.phone })}
                </p>
              ) : (
                <p className={`${p} italic`}>{t('host.pending')}</p>
              )}
            </Section>

            <Section title={t('ip.title')}>
              <p className={p}>{t('ip.p1')}</p>
              <p className={p}>{t('ip.p2')}</p>
            </Section>

            <Section title={t('data.title')}>
              <p className={p}>{t('data.p1')}</p>
              <p className={p}>{t.rich('data.p2', rich)}</p>
            </Section>

            <Section title={t('cookies.title')}>
              <p className={p}>{t('cookies.p1')}</p>
            </Section>

            <Section title={t('credits.title')}>
              <p className={p}>{t('credits.p1')}</p>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
