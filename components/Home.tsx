'use client';

import { Hero } from '@/components/sections/Hero';
import { TopSpacer } from '@/components/sections/whoiam/TopSpacer';
import { WhoIAm } from "@/components/sections/WhoIAm";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Contact } from "@/components/sections/Contact";
import { Works } from "@/components/sections/Works";
import { Experience } from "@/components/sections/Experience";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { BackToTop } from "@/components/ui/BackToTop";
import { useSectionUrl } from "@/hooks/useSectionUrl";
import type { SectionId } from "@/src/data/sections";

interface HomeProps {
  /** Opened from a section link ("/qui-suis-je", "/en/who-i-am"…) */
  initialSection?: SectionId;
}

export function Home({ initialSection }: HomeProps) {
  // Glides from one section to the next when the visitor stops between two
  // (sections opt in with data-snap-section)
  useSectionSnap();
  // The address bar follows the section being read (shareable links)
  useSectionUrl(initialSection);

  return (
    // Standard scroll container (body handles scroll)
    <main className="w-full min-h-screen scroll-smooth">
      
      {/* Section 1 : Hero */}
      <section data-snap-section className="w-full relative z-10">
        <Hero startLanded={!!initialSection} />
      </section>

      {/* Transition Layer: snowy ridge (end of the hero's landing) → dark valley.
          - -mt-[2px]: tucks under the hero's last pixel rows (snow on both sides)
          - no z-index / positioning on purpose: stacking it above the hero made
            the browser composite it separately, which drew a dark hairline on
            its top edge with fractional display scaling (e.g. Windows 125%) */}
      <div className="w-full -mt-[2px]">
          <TopSpacer />
      </div>

      {/* Section 2 : WhoIAm */}
      {/* flow-root: keeps the inner top margin inside the dark background (no seam) */}
      <section id="who-i-am" data-snap-section className="flow-root min-h-screen w-full relative bg-[#0a0c0f] z-20">
        <WhoIAm />
      </section>

      {/* Section 3 : WhatIDo */}
      <section id="what-i-do" data-snap-section className="min-h-screen w-full relative">
        <WhatIDo />
      </section>

      {/* Section 4 : Experience */}
      <section id="experience" data-snap-section className="min-h-screen w-full relative">
        <Experience />
      </section>

      {/* Section 5 : Works */}
      <section id="works" data-snap-section className="min-h-screen w-full relative">
        <Works />
      </section>

      {/* Section 6 : Contact */}
      <section id="contact" data-snap-section className="min-h-screen w-full relative">
        <Contact />
      </section>

      <BackToTop afterId="who-i-am" />
    </main>
  );
}
