'use client';

import React from 'react';
import { Chip } from "@heroui/react";
import { ExperienceItems } from "./ExperienceItems";

const TIMELINE_DATA = [
  {
    type: "Collaboration",
    date: "September 2024",
    role: "Co-Founder",
    company: "CloudCastle",
    description: "Co-founded CloudCastle in 2024 to build Questix, an AI-powered TTRPG campaign manager. Designed the front-end (Next.js 13) and UX for a web app that helps DMs and players streamline scheduling, prep, and lore."
  },
  {
    type: "Collaboration",
    date: "March 2024",
    role: "Contributor",
    company: "HeroUI",
    description: "Supported the development of HeroUI, a component library inspired by Material Design. Worked on cross-framework portability, debugging complex UI behaviors, and aligning accessibility with EU compliance standards."
  },
  // Ajoute tes autres expériences ici...
];

export const ExperienceList = () => {
  return (
    <div className="flex flex-col h-full">

      {/* TITRE */}
      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8">
        Experience
      </h2>

      {/* FILTRES */}
      <div className="flex flex-wrap gap-2 mb-12">
        <Chip className="bg-zinc-800 text-white border border-white/10 hover:bg-zinc-700 cursor-pointer transition-colors">All</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Job</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Collaboration</Chip>
        <Chip className="text-zinc-500 border-zinc-800 hover:text-white hover:border-white/30 cursor-pointer transition-colors">Formation</Chip>
      </div>

      {/* TIMELINE CONTAINER */}
      {/* C'est ici qu'on définit la ligne verticale grise à gauche */}
      <div className="relative border-l border-zinc-800 ml-3 space-y-12 pb-12">

        {/* BOUCLE SUR LES ITEMS */}
        {TIMELINE_DATA.map((item, index) => (
          <ExperienceItems
            key={index}
            {...item} // Passe toutes les propriétés (type, date, role...) automatiquement
          />
        ))}

        {/* BOUTON "SHOW MORE" EN BAS */}
        <div className="relative pl-12 pt-2">
          {/* Petit point décoratif pour finir la ligne */}
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