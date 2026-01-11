'use client';

import { Chip } from '@heroui/react';
import { Icon, IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  type: string;        // ex: "Collaboration", "Job", "Formation"
  date: string;        // ex: "September 2024"
  role: string;        // ex: "Co-Founder"
  company: string;     // ex: "CloudCastle"
  description: string; // The paragraph
}

export const ExperienceItem = ({
  type,
  date,
  role,
  company,
  description,
}: ExperienceItemProps) => {

  // Function to map the string 'type' to the exact type 'IconName'
  const getIconName = (type: string): IconName => {
    switch (type.toLowerCase()) {
      case 'job': return 'Job';
      case 'formation': return 'Formation';
      case 'collaboration': default: return 'Collaboration';
    }
  };

  // 🔧 New function for specific optical alignment
  const getIconAlignment = (type: string) => {
    switch (type.toLowerCase()) {
      case 'job':
        return '-translate-y-[0.5px]';
      case 'formation':
      case 'collaboration':
        return 'translate-y-[0.5px]';
      default:
        return '';
    }
  };

  return (
    <div className="relative pl-12 group">

      {/* --- ICON ON TIMELINE --- */}
      <div className="absolute -left-[17px] top-0 w-8 h-8 p-0.5 rounded-full bg-zinc-900 flex items-center justify-center align-center text-zinc-400 z-10 shadow-[0_-4px_0_4px_black]">
        <Icon
          name={getIconName(type)}
          size={18}
          className={cn(
            "text-zinc-400 group-hover:text-white transition-colors",
            getIconAlignment(type)
          )}
        />
      </div>

      <div className="flex flex-col gap-1">
        {/* HEADER : Type (Pill) + Date */}
        <div className="flex items-center gap-3 mb-8">
          <Chip className="px-2.5 h-8 text-sm text-[#D9D9D9] border-3 border-zinc-900 bg-white/3 leading-2">
            {type}
          </Chip>
          <span className="text-zinc-500 text-sm font-light">
            {date}
          </span>
        </div>

        {/* ROLE */}
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
          {role}
        </h3>

        {/* ENTREPRISE */}
        <span className="text-[#949494] text-xl">
          {company}
        </span>

        {/* DESCRIPTION */}
        <p className="text-[#cacaca] font-extralight leading-relaxed max-w-2xl mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};