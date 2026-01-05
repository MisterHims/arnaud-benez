'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { WorkCard } from "./works/WorkCard";

export const Works = () => {
  return (
    // AJOUT CRUCIAL : On ajoute 'grid grid-cols-1 md:grid-cols-12' ici.
    // C'est ce qui permet au BlockContent colSpan={12} de fonctionner correctement.
    <SectionShell
      variant="contained"
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14"
    >
      <BlockContent colSpan={12} className="text-center">

        {/* En-tête */}
        <div className="mb-16 mt-12 md:mt-24">
          <h2 className='text-6xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-4'>
            Works
          </h2>
          <p className="text-[#A8A8A8] text-2xl md:text-3xl font-bold">
            Take a look at my showcase
          </p>
        </div>

        {/* GRILLE DES PROJETS */}
        {/* Correction : grid-cols-1 sur mobile, grid-cols-3 sur desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] pb-36">

          {/* 1. Grande Carte (2 colonnes) */}
          <WorkCard
            className="md:col-span-2"
            title="Voyages E.Leclerc"
            category="Travel Agency"
            logo="VOYAGES E.Leclerc"
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 2. Petite Carte */}
          <WorkCard
            title="HeroUI"
            category="Library"
            logo="HeroUI"
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 3. Petite Carte */}
          <WorkCard
            title="MajiTV"
            category="Streaming"
            logo="MajiTV"
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 4. Petite Carte */}
          <WorkCard
            title="Questix"
            category="SaaS"
            logo="Questix"
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 5. Petite Carte */}
          <WorkCard
            title="Delaveine"
            category="E-commerce"
            logo="delaveine"
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 6. Petite Carte */}
          <WorkCard
            title="Vocajob"
            category="Recruitment"
            logo="Vocajob ?"
            imageSrc="/assets/works/vocajob.jpg"
          />

          {/* 7. Carte CTA (Sans image = carte noire) */}
          <WorkCard
            title="Toutes mes réalisations"
            category="Voir le portfolio complet"
            className="bg-[#050505]"
          />
        </div>
      </BlockContent>
    </SectionShell>
  );
};