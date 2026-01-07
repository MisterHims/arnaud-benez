'use client';

import Image from 'next/image';
import { Card } from "@heroui/react";
import { Icon } from "@/components/ui/Icon";
import { CustomButton } from "@/components/CustomButton";

export const ContactCard = () => {
  return (
    // 1. LE CONTENEUR MAÎTRE
    // - w-full : Prend toute la largeur dispo
    // - max-w-[580px] : S'arrête à 580px (la taille "native")
    // - aspect-[580/332] : Force mathématiquement le ratio hauteur/largeur
    <div className="relative w-full max-w-[640px] aspect-640/416 mx-auto md:mx-0 group">

      {/* 2. LA CARTE */}
      {/* h-full : Remplit le ratio imposé par le parent */}
      {/* flex flex-col justify-between : Répartit le contenu verticalement (Haut, Milieu, Bas) */}
      <Card className="h-full bg-[#0A0A0A] border-3 border-white/10 p-6 sm:p-8 rounded-2xl relative z-10 overflow-hidden flex flex-col justify-between">

        {/* --- INTÉGRATION DU SVG (FOND) --- */}
        {/* w-[65%] : Le SVG prendra toujours ~65% de la largeur de la carte */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none w-[65%] h-auto">
          <svg
            viewBox="0 0 363 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMaxYMax meet"
          >
            <path
              d="M0 188H74.4217L187.547 74.9121L300.619 188H376L187.973 0L0 188Z"
              fill="url(#paint0_linear_contact_card)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_contact_card"
                x1="188"
                y1="0"
                x2="188"
                y2="188"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#999999" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* HEADER : Photo + Nom */}
        <div className="relative z-10 flex items-center gap-5 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-25 sm:h-25 rounded-xl overflow-hidden shrink-0 shadow-2xl">
            <Image
              src="/assets/card-portrait.jpg"
              alt="Arnaud Benez"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-white font-black text-xl sm:text-2xl uppercase tracking-wide leading-none mb-1 sm:mb-2">
              Arnaud Benez
            </h3>
            <p className="text-zinc-500 text-[10px] sm:text-xs font-mono tracking-[0.15em] uppercase">
              UI/UX Designer | Front-End Dev
            </p>
          </div>
        </div>

        {/* INFO LIST */}
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 text-zinc-400 text-xs sm:text-sm group/link hover:text-white transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/link:bg-white/10 transition-colors">
              <Icon name="ArrowRight" size={14} className="w-3 h-3 sm:w-auto sm:h-auto" />
            </div>
            <span className="font-light tracking-wide truncate">arnaud.benez@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-zinc-400 text-xs sm:text-sm group/link hover:text-white transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/link:bg-white/10 transition-colors">
              <Icon name="ArrowRight" size={14} className="w-3 h-3 sm:w-auto sm:h-auto" />
            </div>
            <span className="font-light tracking-wide truncate">www.arnaud-benez.net</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-zinc-400 text-xs sm:text-sm group/link hover:text-white transition-colors cursor-pointer">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/link:bg-white/10 transition-colors">
              <Icon name="ArrowRight" size={14} className="w-3 h-3 sm:w-auto sm:h-auto" />
            </div>
            <span className="font-light tracking-wide">Île de France</span>
          </div>
        </div>

        {/* SOCIAL ICONS (Bas Gauche) */}
        <div className="relative z-10 flex gap-3 sm:gap-4">
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer border border-white/5">X</div>
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer border border-white/5">in</div>
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer border border-white/5">gh</div>
        </div>

      </Card>

      {/* BOUTON FLOTTANT (Download Contact Card) */}
      {/* Ajusté pour être responsive par rapport à la taille de la carte */}
      <div className="absolute -bottom-5 right-4 sm:right-8 z-20">
        <CustomButton variant="secondary" size="sm" className="bg-[#1a1a1a] backdrop-blur-md shadow-2xl border-white/10 hover:border-white">
          <Icon name="Download" className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="mt-[2px] text-xs sm:text-sm">Download Contact Card</span>
        </CustomButton>
      </div>

    </div>
  );
};