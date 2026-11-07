'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ServiceList } from "./whatido/ServiceList";
import { CustomButton } from "@/components/CustomButton";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useDelayedReveal } from "@/hooks/useDelayedReveal";
import { useTranslations } from "next-intl";

/** Time spent in the section before the call to action shows up */
const CTA_DELAY = 2500;

export const WhatIDo = () => {
  const t = useTranslations('WhatIDo');
  const reduceMotion = usePrefersReducedMotion();
  const steps = t.raw('steps') as { title: string; text: string }[];

  // "Got a project in mind?" shows up after 2.5s spent in the section (at
  // least 40% of it on screen); leaving earlier resets the countdown, and
  // once shown it stays
  const sectionRef = useRef<HTMLDivElement>(null);
  const showCta = useDelayedReveal(sectionRef, { delay: CTA_DELAY, amount: 0.4 });

  return (
    <div ref={sectionRef} className="w-full min-h-full grid grid-cols-1">
      {/* Logo pattern in a 1200px band at the bottom of the section. A single
          seamless cell (logo-pattern-tile.svg, 7KB)
          repeated in both directions, in a flat color: the former 2.7MB
          image had a dark-to-light gradient baked into every logo, which
          made its whole upper half invisible. The fade is done here only:
          full strength over the lower half of the band, out at the bottom
          edge and toward the top */}
      <div
        aria-hidden="true"
        className="col-start-1 row-start-1 self-end w-full h-[1200px] pointer-events-none select-none z-0 opacity-6"
        style={{
          backgroundImage: 'url(/assets/patterns/logo-pattern-tile.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '30px 90px',
          backgroundPosition: 'center bottom',
          maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 50%, transparent 100%)',
        }}
      />

      <SectionShell
        variant="contained"
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 col-start-1 row-start-1 z-10 bg-transparent relative"
      >
        {/* Text in cols 8-12 (a wide gutter with the cards); from 2xl, where the
            cards are capped at 300px, one column closer to keep that gutter */}
        <BlockContent isSticky colSpan={5} className="order-1 md:order-2 md:col-start-8 2xl:col-start-7 md:row-start-1">
          <h2 className='text-xl md:text-8xl font-black text-[#ebedf0] tracking-tight text-balance mb-8'>
            {t('title')}
          </h2>
          {/* One positioning statement: the cards carry the details */}
          <p className='text-lg leading-relaxed font-extralight text-gray-300 max-w-xl'>
            {t('intro')}
          </p>

          {/* How I work: fills the sticky column while the cards scroll by */}
          <div className="mt-10 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.12em] font-medium text-zinc-400 mb-2">
              {t('methodTitle')}
            </h3>
            {/* Solid divider color (same look as 7% white on the background): a
                translucent one let the logo pattern show through */}
            <ol className="divide-y divide-[#1b1d20]">
              {steps.map((step, index) => (
                <li key={step.title} className="flex items-baseline gap-4 py-3">
                  <span aria-hidden="true" className="w-6 shrink-0 text-xs tabular-nums text-zinc-400 tracking-[0.12em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="block text-[15px] font-medium text-[#ebedf0]">{step.title}</span>
                    <span className="block text-sm font-[250] text-zinc-400 mt-0.5">{step.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* The natural next step. Its room is kept from the start (no layout
              shift); inert until shown (no invisible button for keyboard or
              screen readers); a plain fade with reduced motion */}
          <motion.div
            inert={!showCta}
            initial={false}
            animate={showCta ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : 12 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <p className="text-[#d0d4da] font-[250]">{t('cta')}</p>
            <CustomButton
              variant="primary"
              size="lg"
              onPress={() => document.getElementById('contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
            >
              <Icon name="MailLine" size={18} />
              {t('ctaButton')}
            </CustomButton>
          </motion.div>
        </BlockContent>

        <BlockContent colSpan={6} className="order-2 md:order-1 md:col-start-1 md:row-start-1 h-[calc(100%-2px)]">
          <ServiceList />
        </BlockContent>

      </SectionShell>
    </div>
  );
};