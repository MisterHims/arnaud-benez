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
        releaseOnEdges: true, // Allows native scroll at the end
      }}
      speed={1000}
      pagination={{ clickable: true }}
      modules={[Mousewheel, Pagination, EffectFade]}
      className='h-screen w-full bg-black'
    >
      {/* React magic: We iterate through each child passed to the component
        and automatically wrap it in a SwiperSlide.
      */}
      {Children.map(children, (child, index) => (
        <SwiperSlide key={index} className='bg-black overflow-hidden'>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};