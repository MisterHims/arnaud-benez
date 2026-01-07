'use client';

import React from 'react';
import { WorkCard } from "./WorkCard";
import { Logo } from "../../ui/Logo";

export const Showcase = () => {
  return (
    <div className="flex flex-col gap-12 w-full">

      {/* SOUS-TITRE */}
      <div className="text-center">
        <h3 className="text-[#A8A8A8] text-2xl md:text-3xl font-bold">
          Take a look at my showcase
        </h3>
      </div>

      {/* GRILLE BENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full auto-rows-[300px]">

        {/* 1. TOP LEFT */}
        <WorkCard
          className="md:col-span-2 md:rounded-tl-3xl"
          title="Mouvement E.Leclerc"
          category="Travel Agency"
          logo={<Logo name="Leclerc" className="w-28 h-auto" />}
          imageSrc="/assets/works/voyages-leclerc.jpg"
        />

        {/* 2. TOP RIGHT */}
        <WorkCard
          className="md:rounded-tr-3xl"
          title="HeroUI"
          category="Library"
          logo={<Logo name="HeroUI" className="w-28 h-auto" />}
          imageSrc="/assets/works/heroui.jpg"
        />

        {/* 3. MIDDLE LEFT */}
        <WorkCard
          title="MajiTV"
          category="Streaming"
          logo="MajiTV"
          imageSrc="/assets/works/maji.jpg"
        />

        {/* 4. MIDDLE */}
        <WorkCard
          title="Questix"
          category="SaaS"
          logo="Questix"
          imageSrc="/assets/works/questix.jpg"
        />

        {/* 5. MIDDLE RIGHT */}
        <WorkCard
          title="Delaveine"
          category="E-commerce"
          logo="delaveine"
          imageSrc="/assets/works/delaveine.jpg"
        />

        {/* 6. BOTTOM LEFT */}
        <WorkCard
          className="md:rounded-bl-3xl"
          title="Vocajob"
          category="Recruitment"
          logo="Vocajob"
          imageSrc="/assets/works/vocajob.jpg"
        />

        {/* 7. BOTTOM MIDDLE */}
        <WorkCard
          title="FoundryVTT"
          category="Collaboration"
          logo="FoundryVTT"
          imageSrc="/assets/works/fvtt.webp"
        />

        {/* 8. BOTTOM RIGHT */}
        <WorkCard
          className="md:rounded-br-3xl bg-[#050505]"
          title="Toutes mes réalisations"
          category="Voir le portfolio complet"
          imageSrc="/assets/works/all-real.png"
        />

      </div>
    </div>
  );
};