'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LanguageSwitchProps {
  className?: string;
}

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** "FR | EN" pill: active language in bold white, the other one muted. */
export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const t = useTranslations('LanguageSwitch');
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    startTransition(() => {
      // Same page in the other language, without jumping back to the top
      router.replace(pathname, { locale, scroll: false });
    });
  };

  return (
    <nav
      aria-label={t('label')}
      className={cn(
        'flex items-center gap-2.5 md:gap-3 rounded-full bg-white/6 backdrop-blur-sm px-4 md:px-5 h-10 md:h-12 transition-opacity',
        isPending && 'opacity-60',
        className
      )}
    >
      {LOCALES.map((locale, i) => {
        const isActive = locale.code === current;
        return (
          <span key={locale.code} className="flex items-center gap-2.5 md:gap-3">
            {i > 0 && <span aria-hidden="true" className="h-5 md:h-6 w-0.5 rounded-full bg-white/70" />}
            <button
              type="button"
              lang={locale.code}
              aria-label={locale.name}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => switchTo(locale.code)}
              className={cn(
                'text-base md:text-xl tracking-wide transition-colors',
                isActive ? 'text-white font-bold cursor-default' : 'text-white/45 font-light hover:text-white/80 cursor-pointer'
              )}
            >
              {locale.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
};
