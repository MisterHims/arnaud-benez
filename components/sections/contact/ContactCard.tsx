'use client';

import Image from 'next/image';
import { Card, Button } from "@heroui/react";
import { Icon } from "@/components/ui/Icon";

export const ContactCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0 group">

      {/* LA CARTE PRINCIPALE */}
      <Card className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl relative z-10 overflow-hidden min-h-[400px]">

        {/* Effet de fond (le chevron gris en bas à droite) */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-zinc-800 rotate-45 transform opacity-20 pointer-events-none" />
        <div className="absolute -bottom-24 -right-8 w-64 h-64 bg-zinc-700 rotate-45 transform opacity-20 pointer-events-none" />

        {/* HEADER : Photo + Nom */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-20 h-20 rounded-3xl overflow-hidden border-2 border-white/10 shrink-0">
            <Image
              src="/assets/card-portrait.jpg"
              alt="Arnaud Benez"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <h3 className="text-white font-black text-2xl uppercase tracking-wide leading-none mb-1">
              Arnaud Benez
            </h3>
            <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
              UI/UX Designer | Front-End Dev
            </p>
          </div>
        </div>

        {/* INFO LIST */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 text-zinc-400 text-sm group/link hover:text-white transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/link:bg-white/10">
              {/* Remplace par une icône Mail si tu as, sinon Icon générique */}
              <Icon name="ArrowRight" size={14} />
            </div>
            <span>arnaud.benez@gmail.com</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-sm group/link hover:text-white transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/link:bg-white/10">
              <Icon name="ArrowRight" size={14} />
            </div>
            <span>www.arnaud-benez.net</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
              <Icon name="ArrowRight" size={14} />
            </div>
            <span>Île de France</span>
          </div>
        </div>

        {/* SOCIAL ICONS (Bas Gauche) */}
        <div className="flex gap-4 mt-auto pt-4">
          {/* Placeholders pour réseaux sociaux */}
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">X</div>
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">in</div>
          <div className="w-8 h-8 bg-white/5 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">gh</div>
        </div>

      </Card>

      {/* BOUTON FLOTTANT (Download Contact Card) */}
      <div className="absolute -bottom-5 right-8 z-20">
        <Button
          className="bg-[#1a1a1a] border border-white/10 text-zinc-400 text-xs font-medium px-6 py-2 rounded-full hover:bg-white hover:text-black hover:border-white transition-all shadow-xl backdrop-blur-md"
        >
          Download Contact Card
        </Button>
      </div>

    </div>
  );
};