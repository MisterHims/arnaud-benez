'use client';

import { Hero } from '@/components/sections/Hero';
import { Mountains } from '@/components/sections/hero/Mountains';
import { TopSpacer } from '@/components/sections/whoiam/TopSpacer';
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Contact } from "@/components/sections/Contact";
import { Works } from "@/components/sections/Works";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
  return (
    // Standard scroll container (body handles scroll)
    <main className="w-full min-h-screen scroll-smooth">
      
      {/* Section 1 : Hero */}
      <section className="w-full relative z-10">
        <Hero />
      </section>

      {/* Transition Layer (Mountains) */}
      <div className="w-full relative z-30">
          <Mountains />
          <TopSpacer />
      </div>

      {/* Section 2 : WhoIAm */}
      <section className="min-h-screen w-full relative bg-[#0c0c0c] z-20">
        <WhoIAm />
      </section>

      {/* Section 3 : WhatIDo */}
      <section className="min-h-screen w-full relative">
        <WhatIDo />
      </section>

      {/* Section 4 : Experience */}
      <section className="min-h-screen w-full relative">
        <Experience />
      </section>

      {/* Section 5 : Works */}
      <section className="min-h-screen w-full relative">
        <Works />
      </section>

      {/* Section 6 : Contact */}
      <section className="min-h-screen w-full relative">
        <Contact />
      </section>

    </main>
  );
}
