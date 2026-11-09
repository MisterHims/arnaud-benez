'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { Icon, IconName } from "@/components/ui/Icon";
import type { ExperienceId, ExperienceType } from '@/src/data/experience';
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  id: ExperienceId;
  type: ExperienceType;
  start: string;   // "YYYY-MM"
  end?: string;    // "YYYY-MM" | "present"
  company: string;
  stack?: readonly string[];
  /** Lighter rendering (trainings in the "All" view): tighter spacing */
  compact?: boolean;
  /** Show the type in the label: only in the "All" view (a filtered list
   *  already says it, and so does the timeline icon) */
  showType?: boolean;
}

const ICONS: Record<ExperienceType, IconName> = {
  job: 'Job',
  formation: 'Formation',
  collaboration: 'Collaboration',
};

// Optical alignment of each badge icon in its circle
const ICON_ALIGNMENT: Record<ExperienceType, string> = {
  job: '-translate-y-[0.5px]',
  formation: 'translate-y-[0.5px]',
  collaboration: 'translate-y-[0.5px]',
};

export const ExperienceItem = ({ id, type, start, end, company, stack = [], compact = false, showType = true}: ExperienceItemProps) => {
  const t = useTranslations('Experience');
  const format = useFormatter();

  // "2024-09" → "Septembre 2024" / "September 2024" (short: "Sept. 2024" / "Sep 2024")
  const formatMonth = (value: string, month: 'long' | 'short' = 'long') => {
    const [year, monthIndex] = value.split('-').map(Number);
    const label = format.dateTime(new Date(Date.UTC(year, monthIndex - 1, 1)), {
      month,
      year: 'numeric',
      timeZone: 'UTC',
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  // En dash: the typographic sign for a range ("Juin 2018 – aujourd’hui")
  const range = (month: 'long' | 'short') => end
    ? `${formatMonth(start, month)} – ${end === 'present' ? t('present') : formatMonth(end, month)}`
    : formatMonth(start, month);

  const highlights = t.has(`items.${id}.highlights` as never)
    ? (t.raw(`items.${id}.highlights` as never) as string[])
    : [];

  return (
    <div className="relative pl-12 group">

      {/* --- ICON ON TIMELINE --- */}
      {/* A bit more contrast than before (the type was hard to make out),
          without competing with the role title */}
      <div className="absolute -left-[16px] top-0 w-8.25 h-8.25 p-0.5 rounded-full bg-zinc-800 flex items-center justify-center align-center z-10 shadow-[0_-4px_0_4px_black]">
        <Icon
          name={ICONS[type]}
          size={17}
          className={cn("text-zinc-300 group-hover:text-white transition-colors", ICON_ALIGNMENT[type])}
        />
      </div>

      <div className="flex flex-col gap-1">
        {/* HEADER: type and dates on a soft pill background. Same height as
            the timeline icon, so both stay aligned. The uppercase text is
            nudged down 1px to look centered (no descenders) */}
        <div className={cn('flex', compact ? 'mb-4' : 'mb-7')}>
        {/* Phones: short months. If type and date still don't fit on one
            line, the date wraps under the type and the separator goes: each
            part carries a leading separator, and the negative margin, clipped,
            hides the one starting a line. rounded-2xl: a pill on one line,
            a soft rectangle on two */}
        <p className='inline-flex items-center min-h-8.25 py-1.5 px-3.5 rounded-2xl bg-white/4 text-[11px] xl:text-xs uppercase tracking-[0.08em] xl:tracking-[0.12em]'>
          <span className="block overflow-hidden">
            <span className="flex flex-wrap items-center -ml-[25px] [&>span]:before:content-[''] [&>span]:before:inline-block [&>span]:before:w-px [&>span]:before:h-3 [&>span]:before:mx-3 [&>span]:before:bg-white/20 [&>span]:before:align-[-1px]">
              {showType && <span className="relative top-px font-medium text-zinc-300">{t(`types.${type}`)}</span>}
              <span className="relative top-px text-zinc-400 whitespace-nowrap">
                <span className="sm:hidden">{range('short')}</span>
                <span className="max-sm:hidden">{range('long')}</span>
              </span>
            </span>
          </span>
        </p>
        </div>

        {/* ROLE */}
        {/* Same size for every entry (compact only tightens the spacing) */}
        <h3 className='text-xl md:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors'>
          {t(`items.${id}.role`)}
        </h3>

        {/* COMPANY: the written name for every entry (company logos broke
            the typographic rhythm; clients have their logo wall in Works) */}
        <span className='-mt-[3px] text-lg text-[#dcdfe4] font-light'>
          {company}
        </span>

        {/* SUMMARY: a notch brighter than the highlights (reading levels).
            Weight 250 (Inter is variable): between extralight, too thin on
            dark, and light, a bit heavy */}
        <p className='text-[#d0d4da] font-light leading-relaxed max-w-2xl mt-3'>
          {t(`items.${id}.description`)}
        </p>

        {/* KEY ACHIEVEMENTS */}
        {!compact && highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 max-w-2xl">
            {highlights.map((item) => (
              <li key={item} className="relative pl-5 text-[#afb5bd] font-light leading-relaxed">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-2.5 rounded-full bg-zinc-600" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* STACK (kept in compact mode: small, and useful at a glance) */}
        {stack.length > 0 && (
          // Plain text, dot-separated (not chips: they looked too much like the
          // date pill above). A drawn dot, not a "·" character, so screen readers
          // don't read it; the dot starting a wrapped line is clipped (leading
          // dots + negative margin inside an overflow-hidden wrapper)
          <div className="mt-4 overflow-hidden">
            <ul className="-ml-[23px] flex flex-wrap gap-y-1 text-[13px] text-zinc-400 font-light" aria-label="Stack">
              {stack.map((tool) => (
                <li key={tool} className="whitespace-nowrap before:content-[''] before:inline-block before:size-[3px] before:mx-2.5 before:rounded-full before:bg-zinc-600 before:align-middle">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
