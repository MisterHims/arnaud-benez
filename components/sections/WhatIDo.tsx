'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ServiceCard } from "./whatido/ServiceCard";

export const WhatIDo = () => {
  return (
    <SectionShell variant="contained">
      <BlockContent isSticky colSpan={6} className="order-1 md:order-2">
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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>

          <ServiceCard
            title="UI/UX Design"
            description="Je conçois des interfaces claires, ergonomiques et intuitives, centrées sur les besoins utilisateurs. Chaque parcours est pensé pour optimiser la navigation, fluidifier l’expérience et renforcer l’accessibilité. Mon approche s’appuie sur des méthodologies UX éprouvées, alliant prototypage, design systems et tests utilisateurs."
            tags={['Wireframing', 'Design System', 'Prototyping', 'Design Systems', 'Ergonomy', 'Accessibility', 'Atomic Design', 'User Testing']}
            iconSrc="/assets/icons/uiux-linear.svg"
          />

          <ServiceCard
            title="Développement Front-End"
            description="J’intègre des interfaces web performantes, accessibles et optimisées en assurant un code maintenable, modulable et conforme aux meilleures pratiques du front-end moderne. Mes développements avec React et Next.js permettent des applications fluides, réactives et adaptées à tous les environnements."
            tags={['Responsive Design', 'PWA', 'Form Validation', 'JS/CSS Animation']}
          />

          <ServiceCard
            title="Gestion de Projet"
            description="Pilotage agile, coordination d'équipe et respect des délais de livraison."
            tags={['Agile', 'Jira', 'Notion']}
          />

          <ServiceCard
            title="Direction Artistique"
            description="J’imagine et déploie des identités visuelles fortes et cohérentes, adaptées aux valeurs et à l’univers de chaque marque. Je conçois une ligne graphique, une stratégie de communication efficace et adaptée et dirige la création de contenus visuels en assurant une harmonie sur tous les supports (print & digital). Mon objectif : garantir une direction créative claire, percutante et alignée avec les enjeux stratégiques."
            tags={['Branding', 'Graphic Chart', 'Visual Identity', 'Design Strategy', 'Storytelling', 'Design Thinking']}
          />

          <ServiceCard
            title="Gestion de projets"
            description="J’accompagne les équipes et les entreprises dans la gestion de leurs projets digitaux, de la stratégie à la livraison. Grâce à ma double compétence en design et développement, je facilite la coordination entre les différents intervenants et assure la cohérence globale des projets. Mon approche est orientée solution avec un focus sur l’expérience utilisateur et l’innovation."
            tags={['Digital Strategy', 'Agile', 'UX Research', 'Sprint Planning', 'Sprint Planning']}
          />

          <ServiceCard
            title="Création de Médias"
            description="Je produis des supports de communication impactants, adaptés à tous les canaux : bannières, vidéos, social media, pré-presse, etc. Chaque création est pensée pour renforcer l’image de marque, capter l’attention et soutenir les objectifs marketing tout en respectant la cohérence visuelle de l’univers graphique."
            tags={['Motion Design', 'Sound Design', 'Mail Kits', 'Social Media', 'Pre-Press', 'Video Production', 'Content Strategy']}
          />

          <ServiceCard
            title="E-commerce"
            description="J’optimise l’expérience d’achat sur des plateformes e-commerce complexes, en structurant les catalogues produits, en améliorant les parcours clients et en garantissant la performance (SEO, accessibilité). J’interviens sur la gestion de données métier, l’intégration multicanal, la conversion et l’optimisation de la logistique e-commerce."
            tags={['A/B Testing', 'Data Management', 'SEO', 'Performance', 'Conversion']}
          />
        </div>
      </BlockContent>
    </SectionShell>
  );
};