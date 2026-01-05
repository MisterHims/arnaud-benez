'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Hero } from '@/components/sections/Hero';
import { Spacer } from '@/components/sections/Spacer';
import { SlideContent } from "@/components/swipper/SlideContent";
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Contact } from "@/components/sections/Contact";
import { Works } from "@/components/sections/Works";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    <main>
      <Swiper
        direction="vertical"
        mousewheel={true}
        simulateTouch={false}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        // scrollbar={{
        //   draggable: true,
        // }}
        modules={[Navigation, Pagination, Mousewheel, Scrollbar, Keyboard]}
        navigation
        className="h-screen overflow-hidden">

        {/* Slide 1 : Hero */}
        <SwiperSlide>
          <SlideContent>
            <Hero />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 2 : Spacer */}
        <SwiperSlide>
          <SlideContent>
            <Spacer />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 3 : WhoIAm */}
        <SwiperSlide>
          <SlideContent isScrollable>
            <WhoIAm />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 4 : WhatIDo */}
        <SwiperSlide>
          <SlideContent isScrollable>
            <WhatIDo />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 5 : Experience */}
        <SwiperSlide>
          <SlideContent isScrollable>
            <Experience />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 6 : Works */}
        <SwiperSlide>
          <SlideContent isScrollable>
            <Works />
          </SlideContent>
        </SwiperSlide>

        {/* Slide 7 : Contact */}
        <SwiperSlide>
          <SlideContent isScrollable>
            <Contact />
          </SlideContent>
        </SwiperSlide>

      </Swiper>
    </main>
  );
}