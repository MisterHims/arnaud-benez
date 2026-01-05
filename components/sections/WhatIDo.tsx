'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ServiceList } from "./whatido/ServiceList";

export const WhatIDo = () => {
  return (
    <SectionShell variant="contained">
      <BlockContent isSticky colSpan={5} className="order-1 md:order-2">
        <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
          What I Do
        </h2>

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
  );
};