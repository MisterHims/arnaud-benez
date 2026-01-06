'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from "@heroui/react";

interface WorkCardProps {
  title: string;
  category?: string;
  imageSrc?: string;
  logo?: string;
  className?: string;
}

export const WorkCard = ({
  title,
  category,
  imageSrc,
  logo,
  className,
}: WorkCardProps) => {

  const isCta = !imageSrc;

  const containerClasses = cn(
    "rounded-none relative w-full h-full overflow-hidden border-2 border-white/5 bg-zinc-900 group hover:bg-zinc-800 hover:cursor-pointer transition-all duration-300",
    className
  );

  if (isCta) {
    return (
      <Card className={cn(containerClasses, "flex flex-col justify-between p-8 bg-[#050505]")}>
        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
          --
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-[#A8A8A8] text-sm font-light">
            {category || "Explorez l'ensemble de mes créations digitales."}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={containerClasses}>

      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc!}
          alt={title}
          fill
          // Ajout de 'grayscale' si c'est la carte all-real.jpg pour l'effet texture
          className={cn(
            "object-cover transition-transform duration-500 group-hover:scale-105",
            imageSrc.includes('all-real') ? "opacity-40 grayscale" : "opacity-80"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>

      {/* 2. Centered Logo */}
      {!imageSrc.includes('all-real') && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm shadow-xl transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
            {logo || title}
          </div>
        </div>
      )}

      {/* 3. Bottom Text */}
      <Card.Footer
        // If it's the texture card, show the text always, otherwise on hover
        className={cn(
          "absolute bottom-6 left-6 z-20 transition-all duration-300 pointer-events-none",
          imageSrc.includes('all-real')
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <div>
          <p className={cn("text-white font-bold leading-tight mb-1", imageSrc.includes('all-real') ? "text-2xl" : "text-xl")}>
            {title}
          </p>
          {imageSrc.includes('all-real') ? (
            <p className="text-gray-300 text-sm font-light">{category}</p>
          ) : (
            <div className="text-gray-300 text-xs font-mono uppercase tracking-wider bg-black/60 px-2 py-1 rounded w-fit backdrop-blur-md">
              {category}
            </div>
          )}
        </div>
      </Card.Footer>

    </Card>
  );
};