'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card, Chip } from '@heroui/react';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tags?: string[];
  iconSrc?: string;
  color?: string;
}

export const ServiceCard = ({
  title,
  description,
  tags = [],
  iconSrc,
  color = "255, 255, 255",
  className,
  ...props
}: ServiceCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        // 1. max-w-full : Empêche strictement la carte de dépasser sa colonne de grille
        'p-0 break-inside-avoid relative flex flex-col rounded-2xl overflow-hidden group bg-[#050505] max-w-full',
        className
      )}
      {...props}
    >
      {/* --- 1. COUCHE ARRIÈRE-PLAN (Visible sur les bords de 2px) --- */}
      <div className="absolute inset-0 bg-white/10" />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: opacity === 1 ? 0 : 1,
          background: `radial-gradient(500px circle at 0px 0px, rgba(${color}, 0.6), transparent 40%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(${color}, 1), transparent 40%)`,
        }}
      />

      {/* --- 2. LE CONTENU --- */}
      <div
        className={cn(
          "relative flex flex-col grow bg-[#050505] rounded-[14px] overflow-hidden z-10",
          // CORRECTION CRUCIALE ICI :
          // Au lieu de margin ou padding, on centre l'élément et on calcule sa taille exacte.
          // 1. mx-auto my-[2px] : Centre horizontalement, marge de 2px en haut/bas.
          // 2. w-[calc(100%-4px)] : La largeur est EXACTEMENT 100% moins 4px (2px gauche + 2px droite).
          //    Cela empêche mathématiquement tout débordement hors du parent.
          "mx-auto my-[2px] w-[calc(100%-4px)]"
        )}
      >

        {/* Dégradé interne */}
        <div className="pointer-events-none absolute bottom-0 right-0 left-0 h-1/3 bg-linear-to-tl from-white/5 to-transparent z-0" />

        {iconSrc && (
          <div className="relative h-[120px] w-full mb-6 pointer-events-none select-none z-10">
            <Image
              src={iconSrc}
              alt=""
              width={318}
              height={120}
              className="w-full object-contain object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
              }}
            />
          </div>
        )}

        <div className="flex flex-col grow z-10">
          <Card.Header className="px-6 pb-2 pt-0">
            <h3 className='text-xl font-bold text-[#EDEDED]'>
              {title}
            </h3>
          </Card.Header>

          {/* Note: Si Card.Content ne marche pas (selon la version de HeroUI), utilise Card.Body */}
          <Card.Content className="px-6 py-2 overflow-visible">
            <p className='text-[#A8A8A8] text-base leading-6 font-extralight'>
              {description}
            </p>
          </Card.Content>

          <Card.Footer className="px-6 pt-2 pb-6 mt-auto">
            {tags.length > 0 && (
              <div className='flex gap-2 flex-wrap'>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    className="px-2.5 py-1 h-auto text-sm text-[#A8A8A8] border border-[#27272B] bg-white/5 font-light"
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            )}
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
};