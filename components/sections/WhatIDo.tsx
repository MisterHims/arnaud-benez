'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ServiceList } from "./whatido/ServiceList";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const WhatIDo = () => {
  const t = useTranslations('WhatIDo');
  return (
    <div className="w-full min-h-full grid grid-cols-1">
      <div
        className="col-start-1 row-start-1 self-end w-full h-[1000px] pointer-events-none z-0 select-none overflow-hidden relative"
        aria-hidden="true"
      >
        <Image
          src="/assets/patterns/bg-pattern-logo.svg"
          alt=""
          fill
          className="object-cover object-bottom opacity-8"
          // Fades out at both ends: the section's bottom edge used to cut
          // the pattern at full strength (hard line above Experience)
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 35%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 35%, transparent 100%)'
          }}
        />
      </div>

      <SectionShell
        variant="contained"
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 col-start-1 row-start-1 z-10 bg-transparent relative"
      >
        <BlockContent isSticky colSpan={5} className="order-1 md:order-2">
          <h2 className='text-xl md:text-8xl font-black text-[#ebedf0] tracking-tight text-balance mb-8'>
            {t('title')}
          </h2>
          {/* One positioning statement: the cards carry the details */}
          <p className='text-xl leading-relaxed font-extralight text-gray-300 max-w-xl'>
            {t('intro')}
          </p>
        </BlockContent>

        <BlockContent colSpan={6} className="order-2 md:order-1 h-[calc(100%-2px)]">
          <ServiceList />
        </BlockContent>

      </SectionShell>
    </div>
  );
};