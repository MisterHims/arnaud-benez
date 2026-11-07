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

  // "2024-09" → "Septembre 2024" / "September 2024"
  const formatMonth = (value: string) => {
    const [year, month] = value.split('-').map(Number);
    const label = format.dateTime(new Date(Date.UTC(year, month - 1, 1)), {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const date = end
    // En dash: the typographic sign for a range ("Juin 2018 – aujourd’hui")
    ? `${formatMonth(start)} – ${end === 'present' ? t('present') : formatMonth(end)}`
    : formatMonth(start);

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
        <div className={cn('flex', compact ? 'mb-3' : 'mb-5')}>
        <p className='inline-flex flex-wrap items-center min-h-8.25 px-3.5 rounded-full bg-white/4 text-xs uppercase tracking-[0.12em]'>
          {showType && (
            <>
              <span className="relative top-px font-medium text-zinc-300">{t(`types.${type}`)}</span>
              <span aria-hidden="true" className="mx-3 h-3 w-px bg-white/20" />
            </>
          )}
          <span className="relative top-px text-zinc-400">{date}</span>
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
        <p className='text-[#d0d4da] font-[250] leading-relaxed max-w-2xl mt-3'>
          {t(`items.${id}.description`)}
        </p>

        {/* KEY ACHIEVEMENTS */}
        {!compact && highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5 max-w-2xl">
            {highlights.map((item) => (
              <li key={item} className="relative pl-5 text-[#afb5bd] font-[250] leading-relaxed">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-1 w-2.5 rounded-full bg-zinc-600" />
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* STACK (kept in compact mode: small, and useful at a glance) */}
        {stack.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
            {stack.map((tool) => (
              <li key={tool} className="px-2.5 py-0.5 rounded-full bg-white/5 text-[13px] text-zinc-400 font-light">
                {tool}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
