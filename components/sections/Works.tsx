'use client';

import SectionShell from "../layouts/SectionShell";
import { Logo, LogoName } from "../ui/Logo";
import { WorkCard } from "./works/WorkCard";
import Image from "next/image"; // 1. Ne pas oublier l'import

// Liste des logos à faire défiler (Ordre que tu souhaites)
const TRUSTED_LOGOS: { name: LogoName; className: string }[] = [
  { name: "Leclerc-custom", className: "h-13 w-auto" },
  { name: "Ticketmaster", className: "h-10 w-auto" },
  { name: "Voyages-Leclerc", className: "h-14 w-auto" },
  { name: "HeroUI", className: "h-12 w-auto" },
  { name: "DogFidelity", className: "h-12 w-auto" },
  { name: "Delaveine", className: "h-10 w-auto" },
  { name: "Zigoh", className: "h-12 w-auto" },
  { name: "Inmac", className: "h-14 w-auto" },
  { name: "Vocajob", className: "h-13 w-auto" },
];

export const Works = () => {
  return (
    <div className="w-full min-h-full grid grid-cols-1">
      <SectionShell
        variant="contained"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className='text-6xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-4'>
            Works
          </h2>
          <h3 className="text-[#A8A8A8] text-2xl md:text-3xl font-bold">
            Take a look at my showcase
          </h3>
        </div>

        {/* --- BENTO COMPACT --- */}
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

      </SectionShell>
      <SectionShell
        variant="full"
      >

        {/* --- BANDEAU INFINI "ILS M'ONT FAIT CONFIANCE" --- */}
        <div className="w-full flex flex-col items-center py-24 md:py-36 bg-[#101010] overflow-hidden">

          <h3 className="text-[#c2c2c2] text-2xl md:text-3xl font-bold mb-24 text-center px-4">
            Ils m'ont fait confiance
          </h3>

          {/* Wrapper du Slider avec effet de fondu sur les côtés */}
          <div className="relative w-full max-w-[100vw] overflow-hidden group">

            {/* Masques de fondu à gauche et à droite */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-linear-to-r from-[#101010] to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 bg-linear-to-l from-[#101010] to-transparent pointer-events-none"></div>

            {/* Le conteneur qui défile (Flex) */}
            <div className="flex w-max items-center gap-16 md:gap-64 animate-infinite-scroll pl-16 md:pl-32">

              {/* LISTE 1 */}
              {TRUSTED_LOGOS.map((logo, index) => (
                <div key={`logo-1-${index}`} className="opacity-50 hover:opacity-100 transition-opacity duration-300 shrink-0">
                  <Logo name={logo.name} className={`${logo.className} text-white`} />
                </div>
              ))}

              {/* LISTE 2 (Duplication pour la boucle) */}
              {TRUSTED_LOGOS.map((logo, index) => (
                <div key={`logo-2-${index}`} className="opacity-50 hover:opacity-100 transition-opacity duration-300 shrink-0">
                  <Logo name={logo.name} className={`${logo.className} text-white`} />
                </div>
              ))}

            </div>
          </div>

        </div>

      </SectionShell>
    </div>
  );
};