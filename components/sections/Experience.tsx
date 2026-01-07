'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import Image from "next/image";
import { ExperienceItem } from "./experience/ExperienceItems";
import { Chip } from "@heroui/react";

const EXPERIENCES = [
  {
    date: "Current",
    role: "Co-Founder",
    company: "DualCastle",
    description: "Développement d'une solution SaaS pour la gestion de patrimoine. Architecture Next.js, Supabase et Stripe.",
    tags: ["Next.js", "Supabase", "Stripe"]
  },
  {
    date: "2021 - 2023",
    role: "Front-End Developer",
    company: "Freelance",
    description: "Création d'interfaces web performantes pour divers clients. Intégration de maquettes complexes et optimisation Web Vitals.",
    tags: ["React", "Tailwind", "Framer Motion"]
  },
  {
    date: "2019 - 2021",
    role: "UI/UX Designer",
    company: "Agency",
    description: "Conception de systèmes de design et prototypage d'applications mobiles et web.",
    tags: ["Figma", "Adobe XD"]
  },
  {
    date: "2018 - 2019",
    role: "Web Designer",
    company: "Studio",
    description: "Design et intégration de sites vitrines Wordpress.",
    tags: ["Wordpress", "CSS"]
  }
];

// Exemple de Tech Stack (Logos)
// Tu devras remplacer les src par tes propres icônes
const TOOLS = [
  { name: "React", icon: "/assets/icons/react.svg" },
  { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
  { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
  { name: "Tailwind", icon: "/assets/icons/tailwind.svg" },
  { name: "Figma", icon: "/assets/icons/figma.svg" },
  { name: "Adobe", icon: "/assets/icons/adobe.svg" },
  // Ajoute tes autres outils ici...
];

export const Experience = () => {
  return (
    <SectionShell
      variant="contained"
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 col-start-1 row-start-1 z-10 bg-transparent relative"
    >
      {/* COLONNE GAUCHE : La Timeline des expériences */}
      <BlockContent colSpan={6} className="order-2 md:order-1">
        <div className="flex flex-col mt-12 md:mt-0">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceItem
              key={index}
              {...exp}
              isLast={index === EXPERIENCES.length - 1}
            />
          ))}
        </div>
      </BlockContent>

      {/* COLONNE DROITE (Sticky) : Titre + Stack Technique */}
      <BlockContent isSticky colSpan={5} className="order-1 md:order-2">
        <h2 className='text-xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
          Experience
        </h2>

        <div className='text-lg space-y-6 leading-relaxed font-extralight text-gray-300 mb-12'>
          <p>
            Mon parcours est hybride, naviguant entre le design pur et l'ingénierie front-end. Cette double compétence me permet de comprendre les contraintes techniques tout en défendant la vision créative.
          </p>
        </div>

        {/* LA GRILLE D'OUTILS (Stack) */}
        <div>
          <h3 className="text-sm font-mono text-[#A8A8A8] uppercase tracking-wider mb-6 border-b border-white/10 pb-2">
            Tech & Tools
          </h3>

          {/* Grille de logos */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            {TOOLS.map((tool, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl bg-[#0A0A0A] border border-white/5 flex items-center justify-center hover:border-white/20 transition-colors">
                {/* Tooltip simple au survol */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {tool.name}
                </div>

                {/* Image placeholder (à remplacer par tes vrais assets) */}
                <div className="w-8 h-8 relative opacity-50 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                  {/* Remplace par <Image /> quand tu as les fichiers */}
                  <div className="w-full h-full bg-white/20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlockContent>
    </SectionShell>
  );
};