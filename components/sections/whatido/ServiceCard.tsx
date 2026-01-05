'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'break-inside-avoid',
        // CORRECTION ICI :
        // 1. On ajoute 'p-[2px]' : C'est ce padding qui crée l'épaisseur de la bordure
        //    en repoussant le contenu vers l'intérieur.
        // 2. Les couches 'absolute' (spotlight) vont remplir ce padding (la bordure).
        // 3. Le contenu 'relative' va rester sagement à l'intérieur du padding.
        'relative p-[2px] rounded-2xl overflow-hidden group',
        className
      )}
      {...props}
    >
      {/* --- 1. COUCHE BORDURE STATIQUE --- */}
      <div className="absolute inset-0 bg-white/10" />

      {/* --- 2. COUCHE SPOTLIGHT DYNAMIQUE --- */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(${color}, 0.6), transparent 40%)`,
        }}
      />

      {/* --- 3. LE CONTENU (Fusionné avec le fond noir) --- */}
      {/* Au lieu d'avoir un masque séparé, on applique le fond noir directement ici. */}
      {/* rounded-[14px] : Pour épouser parfaitement l'intérieur (16px parent - 2px padding = 14px) */}
      <div className="relative z-10 flex flex-col grow bg-[#050505] rounded-[14px] overflow-hidden">

        {iconSrc && (
          <div className="relative h-[120px] w-full pointer-events-none select-none">
            <Image
              src={iconSrc}
              alt=""
              width={318}
              height={120}
              // L'image est maintenant contenue dans la div 'overflow-hidden' ci-dessus,
              // donc elle ne pourra plus jamais dépasser sur la bordure.
              className="w-full object-contain object-top"
              style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
              }}
            />
          </div>
        )}

        <div className="px-6 pb-6 flex flex-col grow">
          <h3 className='text-xl font-bold mb-4 mt-8 text-[#EDEDED]'>
            {title}
          </h3>
          <p className='text-[#A8A8A8] text-base leading-6 mb-6 font-extralight'>
            {description}
          </p>

          {tags.length > 0 && (
            <div className='flex gap-3 mt-auto flex-wrap'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-[#EDEDED]'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};