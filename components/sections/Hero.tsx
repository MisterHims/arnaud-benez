'use client';

import { useRef } from 'react';
import { useSwiper } from 'swiper/react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { Mountains } from './hero/Mountains';

export const Hero = () => {
  const swiper = useSwiper();
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, xBack, yBack, xFront, yFront } = useMouseParallax();
  const handleStarClick = (skillId: string) => {
    swiper.slideNext();
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className='h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-black'
    >
      <IdentityBlock />
      <StarryBackground x={xBack} y={yBack} />
      <SkillStars x={xFront} y={yFront} onStarClick={handleStarClick} />
      <Mountains />

    </section>
  );
};