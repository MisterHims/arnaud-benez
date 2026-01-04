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
        <h2 className='text-6xl md:text-8xl font-bold text-white tracking-tight'>
          Who I Am
        </h2>

        <div className='space-y-6 text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-light'>
          <p>
            Bonjour et bienvenue sur mon portfolio. Je m'appelle Arnaud et je suis <strong className='text-white font-bold'>UI/UX Designer</strong> & <strong className='text-white font-bold'>Développeur Front-End</strong> basé dans le <strong className='text-white font-bold'>Val de Marne</strong>.
          </p>

          <p>
            Depuis plus de 15 ans, je mets mon expertise au service de <strong className='text-white font-bold'>projets e-commerce</strong> en pilotant leur gestion, leur évolution et leur intégration, tout en garantissant une <strong className='text-white font-bold'>expérience utilisateur</strong> optimale grâce à un <strong className='text-white font-bold'>design</strong> réfléchi et efficace. Mon parcours m'a permis de développer une solide culture en <strong className='text-white font-bold'>direction artistique</strong>, renforcée par une expertise en <strong className='text-white font-bold'>gestion de projets</strong>.
          </p>

          <p>
            M'efforçant à toujours être en veille et à exploiter les <strong className='text-white font-bold'>outils et méthodologies les plus actuels</strong>, je propose des <strong className='text-white font-bold'>solutions performantes</strong>, <strong className='text-white font-bold'>pérennes</strong> et <strong className='text-white font-bold'>pensées</strong> pour l'utilisateur.
          </p>

          <p>
            Et quand je ne suis pas devant Figma ou VSCode, je suis probablement en train de courir, de randonner dans les bois, de danser maladroitement ou de sauver le royaume dans une campagne de jeu de rôle.
          </p>
        </div>

        <div className='flex gap-4 pt-4'>
          <Button
            className='text-white border-white/30 hover:bg-white hover:text-black rounded-full px-6 py-6 transition-all text-sm uppercase tracking-wider'
          >
            Télécharger mon CV
          </Button>
          <Button
            className='text-white border-white/30 hover:bg-white hover:text-black rounded-full px-6 py-6 transition-all text-sm uppercase tracking-wider'
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