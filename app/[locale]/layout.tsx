import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/src/data/site';
import { Inter } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import '../globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

type LayoutParams = { params: Promise<{ locale: string }> };

// Both language versions are pre-rendered at build time
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    // Resolves relative URLs (canonical, alternates, Open Graph) to absolute ones
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    // Canonical + language alternates: set per page (one per section URL)
    openGraph: {
      type: 'website',
      siteName: t('name'),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale
  setRequestLocale(locale);

  return (
    // The whole site is designed dark: the theme is fixed, whatever the
    // visitor's system preference (HeroUI reads the "dark" class)
    <html lang={locale} className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${robotoMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
