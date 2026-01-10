'use client';

import React from 'react';

// Définition des props attendues pour un item
interface ExperienceItemsProps {
  type: string;        // ex: "Collaboration", "Job"
  date: string;        // ex: "September 2024"
  role: string;        // ex: "Co-Founder"
  company: string;     // ex: "CloudCastle"
  description: string; // Le paragraphe
  isLast?: boolean;    // Pour gérer la ligne verticale si besoin
}

export const ExperienceItems = ({
  type,
  date,
  role,
  company,
  description,
}: ExperienceItemsProps) => {
  return (
    <div className="relative pl-8 md:pl-12 group">

      {/* LE POINT SUR LA LIGNE (Timeline Dot) */}
      {/* Positionné en absolu par rapport au conteneur parent pour se caler sur la bordure de la liste */}
      <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-800 ring-4 ring-black group-hover:bg-white transition-colors duration-300" />

      {/* HEADER : Type (Pill) + Date */}
      <div className="flex items-center gap-3 mb-2">
        <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] text-zinc-400 uppercase tracking-wider font-medium">
          {type}
        </span>
        <span className="text-zinc-500 text-xs font-mono">
          {date}
        </span>
      </div>

      {/* TITRE + ENTREPRISE */}
      <h3 className="text-2xl font-bold text-white mb-1">
        {role}
      </h3>
      <p className="text-zinc-400 text-sm mb-4 font-medium">
        {company}
      </p>

      {/* DESCRIPTION */}
      <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-lg">
        {description}
      </p>
    </div>
  );
};