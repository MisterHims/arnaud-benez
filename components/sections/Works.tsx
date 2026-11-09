'use client';

import SectionShell from "../layouts/SectionShell";
import { Logo } from "../ui/Logo";
import { TrustedBy } from "./works/TrustedBy";
import { WorkCard } from "./works/WorkCard";
import { useTranslations } from "next-intl";

export const Works = () => {
  const t = useTranslations('Works');
  return (
    <div className="w-full min-h-full grid grid-cols-1">
      {/* No bottom padding: the logo band right below sets the gap */}
      <SectionShell
        variant="contained"
        className="pb-0!"
      >

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className='text-[clamp(2.25rem,12vw,3.75rem)] leading-none md:text-7xl xl:text-8xl font-black text-[#ebedf0] tracking-tight mb-4'>
            {t('title')}
          </h2>

          <p className="text-[#a2a9b2] text-2xl md:text-3xl font-bold">
            {t('subtitle')}
          </p>
        </div>

        {/* --- BENTO COMPACT --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full auto-rows-[240px] md:auto-rows-[230px] xl:auto-rows-[300px]">

          {/* 1. TOP LEFT */}
          <WorkCard
            className="md:col-span-2 md:rounded-tl-2xl"
            title="Mouvement E.Leclerc"
            category={t('categories.travelAgency')}
            logo={<Logo name="Leclerc" role="img" aria-label="E.Leclerc" className="w-28 h-auto" />}
            imageSrc="/assets/works/voyages-leclerc.jpg"
          />

          {/* 2. TOP RIGHT */}
          <WorkCard
            className="md:rounded-tr-2xl"
            title="HeroUI"
            category={t('categories.library')}
            logo={<Logo name="HeroUI" role="img" aria-label="HeroUI" className="w-28 h-auto" />}
            imageSrc="/assets/works/heroui.jpg"
          />

          {/* 3. MIDDLE LEFT */}
          <WorkCard
            title="MajiTV"
            category={t('categories.streaming')}
            logo="MajiTV"
            imageSrc="/assets/works/maji.jpg"
          />

          {/* 4. MIDDLE */}
          <WorkCard
            title="Questix"
            category={t('categories.saas')}
            logo="Questix"
            imageSrc="/assets/works/questix.jpg"
          />

          {/* 5. MIDDLE RIGHT */}
          <WorkCard
            title="Delaveine"
            category={t('categories.ecommerce')}
            logo="delaveine"
            imageSrc="/assets/works/delaveine.jpg"
          />

          {/* 6. BOTTOM LEFT */}
          <WorkCard
            className="md:rounded-bl-2xl"
            title="Vocajob"
            category={t('categories.recruitment')}
            logo="Vocajob"
            imageSrc="/assets/works/vocajob.jpg"
          />

          {/* 7. BOTTOM MIDDLE */}
          <WorkCard
            title="FoundryVTT"
            category={t('categories.collaboration')}
            logo="FoundryVTT"
            imageSrc="/assets/works/fvtt.webp"
          />

          {/* 8. BOTTOM RIGHT */}
          <WorkCard
            className="md:rounded-br-2xl bg-[#040506]"
            title={t('allWorks.title')}
            category={t('allWorks.subtitle')}
            imageSrc="/assets/works/all-real.png"
          />

        </div>

      </SectionShell>
      {/* 2. Infinite Scroll Section (Isolated component) */}
      <SectionShell variant="full">
        <TrustedBy />
      </SectionShell>
    </div>
  );
};