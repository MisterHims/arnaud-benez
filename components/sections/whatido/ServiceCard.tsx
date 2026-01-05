'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Chip, Card } from '@heroui/react'; // 1. Import de Card

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
    // 2. Utilisation de Card comme conteneur racine
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // On désactive le shadow et le background par défaut de HeroUI
      // pour laisser tes effets gérer le design.
      className={cn(
        'break-inside-avoid',
        // 'bg-transparent' et 'border-none' sont cruciaux ici pour ne pas avoir 
        // le fond blanc/gris par défaut de la Card HeroUI.
        'relative p-[2px] rounded-2xl overflow-hidden group bg-transparent border-none',
        className
      )}
      {...props}
    >
      {/* --- 1. COUCHE BORDURE STATIQUE --- */}
      <div className="absolute inset-0 bg-white/10" />

      {/* --- 2. SPOTLIGHT STATIQUE --- */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: opacity === 1 ? 0 : 1,
          background: `radial-gradient(400px circle at 0px 0px, rgba(${color}, 0.6), transparent 40%)`,
        }}
      />

      {/* --- 3. SPOTLIGHT DYNAMIQUE --- */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(${color}, 1), transparent 40%)`,
        }}
      />

      {/* --- 4. LE CONTENU (Fond noir) --- */}
      {/* On garde cette div car elle sert de masque (cutout) pour créer la bordure de 2px. 
          HeroUI Card ne gère pas nativement ce type de bordure "interne". */}
      <div className="relative z-10 flex flex-col grow bg-[#050505] rounded-[14px] overflow-hidden">

        {/* Dégradé du bas */}
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

        <Card.Header className="px-6 pb-6 flex flex-col grow z-10">
          {/* Tu peux utiliser Card.Header ici si tu veux, mais ton layout actuel est plus flexible avec des balises simples */}
          <h3 className='text-xl font-bold text-[#EDEDED]'>
            {title}
          </h3>
        </Card.Header>
        <Card.Content className="px-6 pb-6 flex flex-col grow z-10">
          <p className='text-[#A8A8A8] text-base leading-6 font-extralight'>
            {description}
          </p>
        </Card.Content>
        <Card.Footer className="px-6 pb-6 flex flex-col grow z-10">
          {tags.length > 0 && (
            <div className='flex gap-2 mt-auto flex-wrap'>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  className="px-2 py-0.8 text-[#A8A8A8] border-3 border-[#27272B] bg-white/5 font-light"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          )}
        </Card.Footer>
      </div>
    </Card>
  );
};