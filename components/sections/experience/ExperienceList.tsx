'use client';

import { Chip } from "@heroui/react";
import { ExperienceItem } from "./ExperienceItem";
import { TIMELINE_DATA } from "@/src/data/experience";

export const ExperienceList = () => {
  return (
    <div className="flex flex-col h-full">

      {/* TITLE */}
      <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
        Experience
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 mb-12">
        <Chip className="bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700 cursor-pointer transition-colors">All</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Job</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Collaboration</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Formation</Chip>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative border-l-3 border-zinc-900 ml-3 space-y-12 pb-12">

        {/* LOOP OVER ITEMS */}
        {TIMELINE_DATA.map((item, index) => (
          <ExperienceItem
            key={index}
            {...item}
          />
        ))}

        {/* "SHOW MORE" BUTTON AT THE BOTTOM */}
        <div className="relative pl-12 pt-2">
          <div className="absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full bg-zinc-800 ring-4 ring-black text-[8px] flex items-center justify-center text-black">
            •
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
            Show More <span className="text-[10px] scale-75">▼</span>
          </button>
        </div>

      </div>
    </div>
  );
};