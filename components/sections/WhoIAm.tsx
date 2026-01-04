'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import { SlideNextButton } from '@/components/swipper/SlideNextButton';
import Section from "../layouts/Section";
import BlockContent from "../layouts/BlockContent";

export const WhoIAm = () => {
  return (
    <Section>
      {/* LEFT ZONE: Text Content */}
      <BlockContent>
        <h2 className='text-7xl md:text-8xl font-black text-[#EDEDED] tracking-tight'>
          Who I Am
        </h2>

        <div className='text-lg space-y-6 leading-relaxed font-extralight'>
          <p>
            Bonjour et bienvenue sur mon portfolio. Je m'appelle Arnaud et je suis <strong className='font-semibold'>UI/UX Designer</strong> & <strong className='font-semibold'>Développeur Front-End</strong> basé dans le <strong className='font-semibold'>Val de Marne</strong>.
          </p>

          <p>
            Depuis plus de 15 ans, je mets mon expertise au service de <strong className='font-semibold'>projets e-commerce</strong> en pilotant leur gestion, leur évolution et leur intégration, tout en garantissant une <strong className='font-semibold'>expérience utilisateur</strong> optimale grâce à un <strong className='font-semibold'>design</strong> réfléchi et efficace. Mon parcours m'a permis de développer une solide culture en <strong className='font-semibold'>direction artistique</strong>, renforcée par une expertise en <strong className='font-semibold'>gestion de projets</strong>.
          </p>

          <p>
            M'efforçant à toujours être en veille et à exploiter les <strong className='font-semibold'>outils et méthodologies les plus actuels</strong>, je propose des <strong className='font-semibold'>solutions performantes</strong>, <strong className='font-semibold'>pérennes</strong> et <strong className='font-semibold'>pensées</strong> pour l'utilisateur.
          </p>

          <p>
            Et quand je ne suis pas devant Figma ou VSCode, je suis probablement en train de courir, de randonner dans les bois, de danser maladroitement ou de sauver le royaume dans une campagne de jeu de rôle.
          </p>
        </div>

        <div className='flex gap-4 pt-4'>
          <Button
            className='border-white/30 hover:bg-white hover:text-black rounded-full px-6 py-6 transition-all text-sm uppercase tracking-wider'
          >
            Télécharger mon CV
          </Button>
          <Button
            className='border-white/30 hover:bg-white hover:text-black rounded-full px-6 py-6 transition-all text-sm uppercase tracking-wider'
          >
            Télécharger mon book
          </Button>
        </div>
      </BlockContent>

      {/* RIGHT ZONE: Portrait Image */}
      <BlockContent>
        <Image
          src="/assets/portrait.png"
          alt="Arnaud Benez"
          width={800}
          height={1000}
          className="object-contain object-bottom h-[40vh] md:h-[60vh] w-auto"
          priority
        />
      </BlockContent>

      <SlideNextButton />
    </Section>
  );
};