'use client';

import { SlideNextButton } from '@/components/swipper/SlideNextButton';

export const Hero = () => {
  return (
    <section className='h-full flex flex-col items-center justify-center relative px-4'>
      <h1 className='text-5xl md:text-9xl font-bold mb-6 text-center text-white'>
        WHO I AM
      </h1>
      <p className='max-w-md text-center text-gray-400 text-lg'>
        Développeur Fullstack passionné par les interfaces immersives.
      </p>
      <SlideNextButton />
    </section>
  );
};