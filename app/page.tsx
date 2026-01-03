'use client';

import { FullPageSlider } from '@/components/swipper/FullPageSlider';

import { Hero } from '@/components/sections/Hero';
import { WhatIDo } from '@/components/sections/WhatIDo';
import { Works } from '@/components/sections/Works';

export default function Home() {
  return (
    <main className='h-screen w-full bg-black text-white relative'>
      <FullPageSlider>
        <Hero />
        <WhatIDo />
        <Works />
      </FullPageSlider>
    </main>
  );
}