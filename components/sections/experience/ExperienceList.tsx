'use client';

import { Tabs } from "@heroui/react";
import { ExperienceItem } from "./ExperienceItem";
import { TIMELINE_DATA } from "@/src/data/experience";

export const ExperienceList = () => {

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'job', label: 'Job' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'formation', label: 'Formation' },
  ];

  return (
    <div className="flex flex-col h-full">

      {/* TITRE */}
      <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
        Experience
      </h2>

      {/* TABS CONTAINER */}
      <Tabs
        aria-label="Experience filters"
        defaultSelectedKey="all"
        className="w-full"
        orientation="horizontal"
      >
        <Tabs.ListContainer>
          <Tabs.List
            aria-label="Experience filters"
            className="flex flex-row w-fit bg-zinc-900/40 backdrop-blur-sm border-3 border-zinc-800/60 rounded-2xl p-1 mb-12 gap-1"
          >
            {filters.map((filter) => (
              <Tabs.Tab
                key={filter.id}
                id={filter.id}
                aria-label={filter.label}
                className="
                /* Base Setup */
                relative px-4 h-9 rounded-xl font-medium text-zinc-400 
                transition-all duration-300 ease-out
                cursor-pointer select-none
                
                /* NOTE : On retire 'peer' ici, on n'en a plus besoin avec cette méthode */

                /* --- CONFIGURATION DU SÉPARATEUR (::before) --- */
                /* On utilise [&::before] pour cibler le pseudo-élément existant */
                [&::before]:bg-zinc-700
                [&::before]:content-['']     /* Sécurité pour forcer l'affichage */
                [&::before]:absolute
                [&::before]:left-[-2px]      /* À ajuster selon ton gap (gap-1 = 4px, donc -2px est centré) */
                [&::before]:top-1/2 
                [&::before]:-translate-y-1/2
                [&::before]:h-4 
                [&::before]:w-px
                [&::before]:transition-opacity 
                [&::before]:duration-300

                /* --- LOGIQUE DE DISPARITION (Intelligente) --- */
                
                /* 1. Le premier n'a jamais de bordure à gauche */
                first:[&::before]:hidden

                /* 2. Si JE suis actif ou survolé -> Je cache MA PROPRE bordure (à ma gauche) */
                data-[selected=true]:[&::before]:opacity-0
                hover:[&::before]:opacity-0

                /* 3. CIBLAGE DU VOISIN DE DROITE (L'astuce est ici) */
                
                /* Si JE suis sélectionné -> Je cache le ::before de l'élément DIRECTEMENT après moi (+ *) */
                [&[data-selected=true]+*::before]:opacity-0

                /* Si JE suis survolé -> Je cache le ::before de l'élément DIRECTEMENT après moi */
                [&:hover+*::before]:opacity-0

                /* --- Styles Visuels (Texte & Fond) --- */
                hover:bg-white/5 hover:text-zinc-200
                focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none
                
                /* Selected State */
                data-[selected=true]:bg-white 
                data-[selected=true]:text-black 
                data-[selected=true]:shadow-sm
              "
              >
                {filter.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>

        {filters.map((filter) => (
          <Tabs.Panel key={filter.id} id={filter.id} className="w-full outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">

            {/* TIMELINE CONTAINER */}
            <div className="relative border-l-3 border-zinc-900 ml-3 space-y-12 pb-12">
              {TIMELINE_DATA
                .filter((item) => {
                  if (filter.id === 'all') return true;
                  return item.type.toLowerCase() === filter.id;
                })
                .map((item, index) => (
                  <ExperienceItem
                    key={index}
                    {...item}
                  />
                ))}

              {/* MESSAGE VIDE */}
              {TIMELINE_DATA.filter(item => filter.id === 'all' || item.type.toLowerCase() === filter.id).length === 0 && (
                <p className="pl-12 text-zinc-600 text-sm italic py-4">No experience found for this category.</p>
              )}

              {/* BOUTON SHOW MORE */}
              {TIMELINE_DATA.some(item => filter.id === 'all' || item.type.toLowerCase() === filter.id) && (
                <div className="relative pl-12 pt-2">
                  <div className="absolute -left-[5px] top-5 w-2.5 h-2.5 rounded-full bg-zinc-800 ring-4 ring-black text-[8px] flex items-center justify-center text-black">
                    •
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    Show More <span className="text-[10px] scale-75">▼</span>
                  </button>
                </div>
              )}

            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
};