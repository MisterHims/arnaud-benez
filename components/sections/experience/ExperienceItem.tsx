'use client';

import { Chip } from '@heroui/react';
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

export const ExperienceItem = ({ id, type, start, end, company }: ExperienceItemProps) => {
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
    ? `${formatMonth(start)} → ${end === 'present' ? t('present') : formatMonth(end)}`
    : formatMonth(start);

  return (
    <div className="relative pl-12 group">

      {/* --- ICON ON TIMELINE --- */}
      <div className="absolute -left-[16px] top-0 w-8.25 h-8.25 p-0.5 rounded-full bg-zinc-900 flex items-center justify-center align-center text-zinc-400 z-10 shadow-[0_-4px_0_4px_black]">
        <Icon
          name={ICONS[type]}
          size={17}
          className={cn("text-zinc-400 group-hover:text-white transition-colors", ICON_ALIGNMENT[type])}
        />
      </div>

      <div className="flex flex-col gap-1">
        {/* HEADER : Type (Pill) + Date */}
        <div className="flex items-center gap-3 mb-8">
          <Chip className="px-2.5 h-8 text-sm text-[#D9D9D9] border-3 border-zinc-900 bg-white/3 leading-2">
            {t(`types.${type}`)}
          </Chip>
          <span className="text-zinc-500 text-sm font-light">
            {date}
          </span>
        </div>

        {/* ROLE */}
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
          {t(`items.${id}.role`)}
        </h3>

        {/* COMPANY */}
        <span className="text-[#dfdfdf] text-xl font-light">
          {company}
        </span>

        {/* DESCRIPTION */}
        <p className="text-[#cacaca] font-extralight leading-relaxed max-w-2xl mt-3">
          {t(`items.${id}.description`)}
        </p>
      </div>
    </div>
  );
};
