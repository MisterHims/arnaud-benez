'use client';

import { useState } from "react"; // 1. Import useState
import { Tabs } from "@heroui/react";
import { ExperienceItem } from "./ExperienceItem";
import { TIMELINE_DATA } from "@/src/data/experience";
import { CustomButton } from "@/components/CustomButton";
import { Icon } from "@/components/ui/Icon";

export const ExperienceList = () => {

  // 2. État pour gérer l'affichage complet ou limité
  const [isExpanded, setIsExpanded] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'job', label: 'Job' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'formation', label: 'Formation' },
  ];

  return (
    <div className="flex flex-col h-full">

      <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
        Experience
      </h2>

      <Tabs
        aria-label="Experience filters"
        defaultSelectedKey="all"
        className="w-full"
        orientation="horizontal"
        // 3. IMPORTANT : On replie la liste quand on change d'onglet pour éviter des bugs d'affichage
        onSelectionChange={() => setIsExpanded(false)}
      >
        <Tabs.ListContainer>
          <Tabs.List className="flex flex-row w-fit bg-zinc-900/40 backdrop-blur-sm border-3 border-zinc-800/60 rounded-2xl p-1 mb-12 gap-1">
            {filters.map((filter) => (
              <Tabs.Tab
                key={filter.id}
                id={filter.id}
                className="
                relative px-4 h-9 rounded-xl font-medium text-zinc-400 
                transition-all duration-300 ease-out cursor-pointer select-none
                [&::before]:bg-zinc-700
                [&::before]:content-['']
                [&::before]:absolute
                [&::before]:left-[-2px]
                [&::before]:top-1/2 
                [&::before]:-translate-y-1/2
                [&::before]:h-4 
                [&::before]:w-px
                [&::before]:transition-opacity 
                [&::before]:duration-300
                first:[&::before]:hidden
                data-[selected=true]:[&::before]:opacity-0
                hover:[&::before]:opacity-0
                [&[data-selected=true]+*::before]:opacity-0
                [&:hover+*::before]:opacity-0
                hover:bg-white/5 hover:text-zinc-200
                focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:outline-none
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

        {filters.map((filter) => {
          const categoryItems = TIMELINE_DATA.filter((item) => {
            if (filter.id === 'all') return true;
            return item.type.toLowerCase() === filter.id;
          });

          const showButton = categoryItems.length > 8;
          const displayedItems = isExpanded ? categoryItems : categoryItems.slice(0, 8);

          // LOGIQUE DU FONDU :
          // On applique le fondu SEULEMENT SI :
          // 1. Il n'y a pas de bouton (liste courte)
          // OU
          // 2. La liste est entièrement dépliée
          const shouldFade = !showButton || isExpanded;

          return (
            <Tabs.Panel key={filter.id} id={filter.id} className="w-full outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">

              <div className="relative ml-3 space-y-12 pb-18">

                {/* --- LIGNE DE TIMELINE --- */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-[3px] bg-zinc-900 pointer-events-none"
                  style={
                    shouldFade
                      ? {
                        maskImage: 'linear-gradient(to bottom, black calc(100% - 100px), transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 100px), transparent 100%)'
                      }
                      : undefined // Si bouton affiché => Pas de masque => Ligne solide
                  }
                />

                {displayedItems.map((item, index) => (
                  <ExperienceItem
                    key={index}
                    {...item}
                  />
                ))}

                {categoryItems.length === 0 && (
                  <p className="pl-12 text-zinc-600 text-sm italic py-4">No experience found for this category.</p>
                )}

                {showButton && !isExpanded && (
                  <div className="relative pl-12 pt-2">
                    <div className="absolute -left-[6px] top-5 w-3.25 h-3.25 rounded-full bg-zinc-800 ring-4 ring-black text-[8px] flex items-center justify-center text-black"></div>
                    <CustomButton
                      size="sm"
                      variant="secondary"
                      onPress={() => setIsExpanded(true)}
                      className="absolute"
                    >
                      Show More
                      <Icon name="ArrowDown" className="w-5 h-5 mt-[5px]" />
                    </CustomButton>
                  </div>
                )}

              </div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </div>
  );
};