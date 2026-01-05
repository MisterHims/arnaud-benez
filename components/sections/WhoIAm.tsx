'use client';

import Image from 'next/image';
import { SlideNextButton } from '@/components/swipper/SlideNextButton';
import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { Button } from "@heroui/react";
import { CustomButton } from "../CustomButton";
import { IdVerifiedIcon } from "../ui/icons/IdVerifiedIcon";
import { BookOpen02Icon } from "../ui/icons/BookOpen02Icon";

export const WhoIAm = () => {
  return (
    <SectionShell variant="contained">
      {/* LEFT ZONE: Text Content */}
      <BlockContent colSpan={6}>
        <h2 className='text-7xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
          Who I Am
        </h2>

        <div className='text-lg space-y-6 leading-relaxed font-extralight mb-8'>
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
          <CustomButton variant="secondary" size="lg">
            <IdVerifiedIcon className="w-6 h-6" />
            Télécharger mon CV
          </CustomButton>
          <CustomButton variant="secondary" size="lg">
            <BookOpen02Icon className="w-6 h-6" />
            Télécharger mon book
          </CustomButton>
        </div>
      </BlockContent>

      {/* RIGHT ZONE: Portrait Image */}
      <BlockContent colSpan={6} className="md:col-start-7">
        <Image
          src="/assets/portrait.png"
          alt="Arnaud Benez"
          width={703}
          height={757}
          className="object-contain object-bottom w-auto"
          priority
        />
      </BlockContent>

      <SlideNextButton />
    </SectionShell>
  );
};