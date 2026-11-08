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
import { SiteNav } from "@/components/layouts/SiteNav";
import { NightSky } from "@/components/ui/NightSky";
import { useSectionUrl } from "@/hooks/useSectionUrl";
import type { SectionId } from "@/src/data/sections";
import { useTranslations } from "next-intl";

interface HomeProps {
  /** Opened from a section link ("/fr/qui-suis-je", "/en/who-i-am"…) */
  initialSection?: SectionId;
}

export function Home({ initialSection }: HomeProps) {
  // Glides from one section to the next when the visitor stops between two
  // (sections opt in with data-snap-section)
  useSectionSnap();
  // The address bar follows the section being read (shareable links)
  useSectionUrl(initialSection);
  const t = useTranslations('Nav');

  return (
    <>
    {/* Keyboard: first stop, skips the arrival screen's controls (visible on
        focus only) */}
    <a
      href="#who-i-am"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-xs focus:font-medium focus:uppercase focus:tracking-[0.2em] focus:outline-2 focus:outline-offset-2 focus:outline-white"
    >
      {t('skip')}
    </a>
    {/* Before the content in the DOM: the navigation comes first with Tab */}
    <SiteNav />
    {/* Standard scroll container (body handles scroll) */}
    <main className="w-full min-h-svh scroll-smooth">
      
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
      {/* flow-root: keeps the inner top margin inside the dark background (no seam);
          -mt-px: overlaps the ridges by 1px (no sub-pixel seam at fractional scaling) */}
      {/* NightSky: the stars seen from the planet once landed (isolate: keeps
          them behind the content, above the section background) */}
      {/* Background fading out over its last 160px: no hard edge with the next
          section (darker), visible when the section is shorter than the screen.
          tabIndex -1: the skip link's target takes the focus */}
      <section id="who-i-am" tabIndex={-1} data-snap-section className="outline-none flow-root md:min-h-svh w-full relative isolate bg-[linear-gradient(to_bottom,#0a0c0f_calc(100%-160px),transparent)] z-20 -mt-px">
        <NightSky seed={11} />
        <WhoIAm />
      </section>

      {/* Section 3 : WhatIDo */}
      <section id="what-i-do" data-snap-section className="min-h-svh w-full relative">
        <WhatIDo />
      </section>

      {/* Section 4 : Experience */}
      <section id="experience" data-snap-section className="min-h-svh w-full relative isolate">
        {/* Fixed star field: the timeline's height changes with the tabs */}
        <NightSky seed={23} fieldHeight={1600} />
        <Experience />
      </section>

      {/* Section 5 : Works */}
      <section id="works" data-snap-section className="min-h-svh w-full relative isolate">
        <NightSky seed={37} count={36} />
        <Works />
      </section>

      {/* Section 6 : Contact */}
      <section id="contact" data-snap-section className="min-h-svh w-full relative">
        <Contact />
      </section>

      <BackToTop afterId="who-i-am" />
    </main>
    </>
  );
}
