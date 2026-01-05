'use client';

import React from 'react';
import { cn } from '@/lib/utils';
// Si tu es sur Next.js, décommente la ligne suivante pour optimiser les images
// import Image from 'next/image';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tags?: string[];
  // Ajout de la prop pour l'image/icône en haut
  iconSrc?: string;
}

export const ServiceCard = ({
  title,
  description,
  tags = [],
  iconSrc,
  className,
  ...props
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        'relative flex flex-col p-8 rounded-2xl border border-white/10 bg-[#050505] hover:border-white/20 transition-colors overflow-hidden group',
        className
      )}
      {...props}
    >
      {/* --- ZONE IMAGE/ICÔNE --- */}
      {iconSrc && (
        <div className="relative h-40 w-full mb-6 -mt-4 -ml-4 pointer-events-none select-none">
          {/* L'image elle-même :
             - opacity-20 : pour la rendre très discrète
             - object-contain object-left-top : pour qu'elle ne soit pas déformée et calée en haut à gauche
             - style maskImage : C'est LA clé pour l'effet de fondu vers le bas. 
           */}
          {/* Utilise <Image /> de next/image de préférence ici si possible */}
          <img
            src={iconSrc}
            alt=""
            className="w-full h-full object-contain object-top-left opacity-20 transition-opacity group-hover:opacity-30"
            style={{
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          />
        </div>
      )}

      {/* --- CONTENU TEXTE --- */}
      {/* 'relative z-10' assure que le texte passe au-dessus de l'image si elle déborde */}
      <div className="relative z-10 flex flex-col grow">
        <h3 className='text-2xl font-bold mb-4 text-white'>
          {title}
        </h3>

        {/* mb-6 pour espacer avant les tags */}
        <p className='text-gray-400 text-base leading-relaxed mb-6'>
          {description}
        </p>

        {/* --- TAGS --- */}
        {/* mt-auto pousse les tags vers le bas de la carte */}
        {tags.length > 0 && (
          <div className='flex gap-3 mt-auto flex-wrap'>
            {tags.map((tag, index) => (
              // NOUVEAU STYLE DES BADGES :
              // Pilule sombre avec bordure fine claire
              <span
                key={index}
                className='px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};