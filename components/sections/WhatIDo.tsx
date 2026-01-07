'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ServiceList } from "./whatido/ServiceList";
import Image from "next/image";

export const WhatIDo = () => {
  return (
    <div className="w-full min-h-full grid grid-cols-1">
      <div
        className="col-start-1 row-start-1 self-end w-full h-[1000px] pointer-events-none z-0 select-none overflow-hidden relative"
        aria-hidden="true"
      >
        <Image
          src="/assets/patterns/bg-pattern-logo.svg"
          alt=""
          fill
          className="object-cover object-bottom opacity-8"
          style={{
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
          }}
        />
      </div>

      <SectionShell
        variant="contained"
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 col-start-1 row-start-1 z-10 bg-transparent relative"
      >
        <BlockContent isSticky colSpan={5} className="order-1 md:order-2">
          <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
            What I Do
          </h2>
          {/* ... Texte ... */}
          <div className='text-lg space-y-6 leading-relaxed font-extralight text-gray-300'>
            <p>
              Avec une expertise en React, Next.js et TailwindCSS, je développe des interfaces web performantes et des applications SaaS sur mesure, optimisées pour l’UX/UI et l’accessibilité (WCAG).
            </p>
            <p>
              J’interviens aussi bien sur des sites e-commerce complexes, intégrant des architectures headless, des PIM/ERP et des flux de données métier, que sur des applications SaaS agiles, optimisées pour la scalabilité, la performance et le SEO technique.
            </p>
            <p>
              Chaque projet bénéficie d’une approche centrée sur l’utilisateur : PWA rapides, expériences API-first, optimisation de la conversion (CRO), ainsi que des interventions ponctuelles sur l’IA générative, les contenus multimédias et le conseil stratégique digital.
            </p>
          </div>
        </BlockContent>

        <BlockContent colSpan={6} className="order-2 md:order-1">
          <ServiceList />
        </BlockContent>

      </SectionShell>
    </div>
  );
};