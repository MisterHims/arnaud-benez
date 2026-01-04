'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';

import { Hero } from '@/components/sections/Hero';
import { Spacer } from '@/components/sections/Spacer';
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatIDo } from '@/components/sections/WhatIDo';
import { Contact } from "@/components/sections/Contact";
import { Works } from "@/components/sections/Works";

export default function Home() {
  const [transitionSpeed, setTransitionSpeed] = useState(1200);

  const handleSlideChange = (swiper: any) => {
    const isMovingDown = swiper.activeIndex > swiper.previousIndex;
    const isMovingUp = swiper.activeIndex < swiper.previousIndex;

    // --- SMOOTH COMPONENT SKIPPING LOGIC ---
    // If current target is the Spacer (index 1)
    if (swiper.activeIndex === 1) {
      if (isMovingDown) {
        // Immediately force destination to WhoIAm (index 2)
        // 2400ms = 2x slower than 1200ms
        swiper.slideTo(2, 3800);
      } else if (isMovingUp) {
        // Force scroll back up to Hero (index 0)
        swiper.slideTo(0, 3800);
      }
    }

    // --- STANDARD SPEED ADJUSTMENTS ---
    if (swiper.activeIndex === 0) {
      setTransitionSpeed(2400);
    } else {
      // Speed for transitioning from WhoIAm to WhatIDo for example
      setTransitionSpeed(2400);
    }
  };

  return (
    <main className="h-screen w-full bg-[#050505]">
      <Swiper
        direction="vertical"
        modules={[Mousewheel]}
        // Applied to normal slides
        speed={transitionSpeed}
        // Use change event to capture the skip
        onSlideChange={handleSlideChange}

        // DECELERATION CURVE CONFIGURATION
        // Inject "Expo Out" cubic-bezier for very smooth deceleration at the end
        style={{
          // @ts-ignore
          '--swiper-wrapper-transition-timing-function': 'cubic-bezier(0.23, 1, 0.32, 1)'
        }}

        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true
        }}
        className="h-full w-full"
      >
        {/* SECTION 1: HERO */}
        <SwiperSlide>
          <Hero />
        </SwiperSlide>

        {/* SECTION 2: SPACER (Transition) */}
        <SwiperSlide className="bg-[#f8f8f8]">
          <Spacer />
        </SwiperSlide>

        {/* SECTION 3: WHO I AM */}
        <SwiperSlide>
          <WhoIAm />
        </SwiperSlide>

        {/* SECTION 4: WHAT I DO */}
        <SwiperSlide>
          <WhatIDo />
        </SwiperSlide>

        {/* SECTION   5: WORKS */}
        <SwiperSlide>
          <Works />
        </SwiperSlide>

        {/* SECTION 6: CONTACT */}
        <SwiperSlide>
          <Contact />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}