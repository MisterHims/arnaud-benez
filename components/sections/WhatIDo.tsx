'use client';

import { Button } from '@heroui/react';
import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";

export const WhatIDo = () => {
  return (
    <SectionShell variant="contained">
      <BlockContent colSpan={7} className="order-1 md:order-2">
        <h2 className='text-6xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
          What I Do
        </h2>

        <div className='text-lg space-y-6 leading-relaxed font-extralight text-gray-300'>
          <p>
            Bonjour et bienvenue sur mon portfolio. Je m'appelle Arnaud et je suis <strong className='font-semibold text-white'>UI/UX Designer</strong> & <strong className='font-semibold text-white'>Développeur Front-End</strong> basé dans le <strong className='font-semibold text-white'>Val de Marne</strong>.
          </p>

          <p>
            Depuis plus de 15 ans, je mets mon expertise au service de <strong className='font-semibold text-white'>projets e-commerce</strong> en pilotant leur gestion, leur évolution et leur intégration, tout en garantissant une <strong className='font-semibold text-white'>expérience utilisateur</strong> optimale grâce à un <strong className='font-semibold text-white'>design</strong> réfléchi et efficace.
          </p>

          <p>
            M'efforçant à toujours être en veille et à exploiter les <strong className='font-semibold text-white'>outils et méthodologies les plus actuels</strong>, je propose des <strong className='font-semibold text-white'>solutions performantes</strong>, <strong className='font-semibold text-white'>pérennes</strong> et <strong className='font-semibold text-white'>pensées</strong> pour l'utilisateur.
          </p>

          <p className="opacity-80 italic text-base">
            Et quand je ne suis pas devant Figma ou VSCode, je suis probablement en train de courir, de randonner dans les bois, de danser maladroitement ou de sauver le royaume dans une campagne de jeu de rôle.
          </p>
        </div>

        <div className='flex flex-wrap gap-4 pt-8'>
          <Button className='border-white/30 text-white hover:bg-white hover:text-black hover:border-white rounded-full px-8 py-6 transition-all text-sm uppercase tracking-wider font-medium'>
            Télécharger mon CV
          </Button>
          <Button className='border-white/30 text-white hover:bg-white hover:text-black hover:border-white rounded-full px-8 py-6 transition-all text-sm uppercase tracking-wider font-medium'>
            Voir mon book
          </Button>
        </div>
      </BlockContent>

      <BlockContent colSpan={5} className="order-2 md:order-1 space-y-12">
        {/* Card 1 */}
        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>UI/UX Design</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Je conçois des interfaces claires, ergonomiques et intuitives.
          </p>
          <div className='flex gap-2 mt-4 flex-wrap'>
            <span className='badge-tech'>Figma</span>
            <span className='badge-tech'>Design System</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>Front-End</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Architecture React et Next.js avancée.
          </p>
          <div className='flex gap-2 mt-4 flex-wrap'>
            <span className='badge-tech'>React</span>
            <span className='badge-tech'>Tailwind v4</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>Gestion de Projet</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Méthodologie Agile et rigueur.
          </p>
        </div>

        {/* Card 4 */}
        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>Direction Artistique</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Création d'identités visuelles fortes.
          </p>
        </div>

        {/* Extra Card to prove scrolling works */}
        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>E-Commerce</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Optimisation des parcours d'achat et conversion.
          </p>
        </div>
      </BlockContent>
    </SectionShell>
  );
};