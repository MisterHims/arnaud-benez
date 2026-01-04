'use client';

import { Button } from '@heroui/react';
import { SlideNextButton } from '@/components/swipper/SlideNextButton';
import Section from "../layouts/Section";
import BlockContent from "../layouts/BlockContent";

export const WhatIDo = () => {
  return (
    // PURE DARK BACKGROUND (#0c0c0c)
    // It will merge with the bottom of the SVG of the Spacer section
    <Section>
      {/* LEFT ZONE: Internal Scroll */}
      <BlockContent
      >
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

        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>Gestion de Projet</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Méthodologie Agile et rigueur.
          </p>
        </div>

        <div className='p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors'>
          <h3 className='text-xl font-bold mb-4 text-white'>Direction Artistique</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Création d'identités visuelles fortes.
          </p>
        </div>
      </BlockContent>

      {/* RIGHT ZONE: Text */}
      <BlockContent className='md:col-span-7 flex flex-col justify-center text-left'>
        <h2 className='text-5xl md:text-7xl font-bold mb-8 text-white'>
          What I Do
        </h2>
        <div className='space-y-6 text-gray-400 text-lg leading-relaxed max-w-2xl'>
          <p>
            Expertise en <strong>React, Next.js et TailwindCSS</strong>.
          </p>
          <div className='pt-6'>
            <Button size='lg'>
              En savoir plus
            </Button>
          </div>
        </div>
      </BlockContent>
      <SlideNextButton />
    </Section>
  );
};