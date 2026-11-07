'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { rememberSectionOffset } from '@/hooks/useSectionUrl';

interface LanguageSwitchProps {
  className?: string;
}

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** "FR | EN" switch (no background): active language in white, the other one muted. */
export const LanguageSwitch = ({ className }: LanguageSwitchProps) => {
  const t = useTranslations('LanguageSwitch');
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (locale: Locale) => {
    if (locale === current) return;
    // Same spot in the section being read, whatever the texts' length
    rememberSectionOffset();
    startTransition(() => {
      // Same page in the other language, without jumping back to the top
      router.replace(pathname, { locale, scroll: false });
    });
  };

  return (
    <nav
      aria-label={t('label')}
      className={cn(
        'flex items-center gap-2.5 h-9 px-1 transition-opacity',
        isPending && 'opacity-60',
        className
      )}
    >
      {LOCALES.map((locale, i) => {
        const isActive = locale.code === current;
        return (
          <span key={locale.code} className="flex items-center gap-2.5">
            {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/25" />}
            <button
              type="button"
              lang={locale.code}
              aria-label={locale.name}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => switchTo(locale.code)}
              className={cn(
                'py-1 text-xs tracking-[0.2em] transition-colors',
                isActive ? 'text-white font-medium cursor-default' : 'text-white/55 hover:text-white/85 cursor-pointer'
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
