'use client';

import { Children, ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectFade } from 'swiper/modules';

// Styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface FullPageSliderProps {
  children: ReactNode;
}

export const FullPageSlider = ({ children }: FullPageSliderProps) => {
  return (
    <Swiper
      direction={'vertical'}
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={{
        sensitivity: 1,
        releaseOnEdges: true, // Permet le scroll natif en bout de course
      }}
      speed={1000}
      pagination={{ clickable: true }}
      modules={[Mousewheel, Pagination, EffectFade]}
      className='h-screen w-full bg-black'
    >
      {/* Magie React : On parcourt chaque enfant passé au composant
        et on l'enveloppe automatiquement dans une SwiperSlide.
      */}
      {Children.map(children, (child, index) => (
        <SwiperSlide key={index} className='bg-black overflow-hidden'>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};