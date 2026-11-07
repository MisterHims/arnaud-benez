'use client';

import { cn } from '@/lib/utils';

export type Locale = 'fr' | 'en';

interface LanguageSwitchProps {
  current?: Locale;
  /** Not wired yet: the bilingual version (next-intl) comes later. */
  onChange?: (locale: Locale) => void;
  className?: string;
}

const LOCALES: { code: Locale; label: string; name: string }[] = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
];

/** "FR | EN" pill: active language in bold white, the other one muted. */
export const LanguageSwitch = ({ current = 'fr', onChange, className }: LanguageSwitchProps) => (
  <nav
    aria-label="Langue"
    className={cn(
      'flex items-center gap-2.5 md:gap-3 rounded-full bg-white/6 backdrop-blur-sm px-4 md:px-5 h-10 md:h-12',
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
            onClick={() => onChange?.(locale.code)}
            className={cn(
              'text-base md:text-xl tracking-wide transition-colors cursor-pointer',
              isActive ? 'text-white font-bold' : 'text-white/45 font-light hover:text-white/80'
            )}
          >
            {locale.label}
          </button>
        </span>
      );
    })}
  </nav>
);
