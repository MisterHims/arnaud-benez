'use client';

import { Chip } from "@heroui/react";

interface ExperienceItemProps {
  date: string;
  role: string;
  company: string;
  description: string;
  tags?: string[];
  isLast?: boolean;
}

export const ExperienceItem = ({ date, role, company, description, tags, isLast }: ExperienceItemProps) => {
  return (
    <div className="relative pl-8 pb-12 last:pb-0">
      {/* Ligne verticale (connecteur) */}
      {!isLast && (
        <div className="absolute left-[11px] top-2 bottom-0 w-px bg-white/10" />
      )}

      {/* Point sur la ligne */}
      <div className="absolute left-0 top-2 h-[22px] w-[22px] rounded-full border border-white/10 bg-[#050505] flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono text-[#A8A8A8] uppercase tracking-wider">
          {date}
        </span>

        <h3 className="text-xl font-bold text-[#EDEDED]">
          {role} <span className="text-[#A8A8A8] font-normal">@ {company}</span>
        </h3>

        <p className="text-[#A8A8A8] font-light leading-relaxed text-sm">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <Chip key={i} size="sm" className="border-white/10 text-[#A8A8A8] bg-white/5 font-light text-xs">
                {tag}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};