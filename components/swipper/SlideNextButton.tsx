'use client';

import { useSwiper } from 'swiper/react';

export const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className='absolute bottom-10 left-1/2 -translate-x-1/2 z-20 p-4 rounded-full border-2 border-red-600 hover:bg-red-600/20 transition-all animate-bounce cursor-pointer group'
      aria-label='Section suivante'
    >
      {/* Remplacement de Lucide par un SVG natif */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='32'
        height='32'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='text-red-600 group-hover:scale-110 transition-transform'
      >
        <path d='M12 5v14' />
        <path d='m19 12-7 7-7-7' />
      </svg>
    </button>
  );
};