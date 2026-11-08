'use client';

import { useTranslations } from 'next-intl';
import { BrandMark } from '@/components/ui/BrandMark';

export const IdentityBlock = () => {
  const t = useTranslations('Hero.identity');
  return (
    <div className='relative z-10 flex flex-col items-center justify-center lg:flex-row gap-8 lg:gap-12 xl:gap-15 p-8'>
        {/* Halo Radial pour lisibilité */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(closest-side,#000000_50%,rgba(0,0,0,0)_100%)] blur-3xl z-[-1] pointer-events-none" />

        {/* LOGO SVG */}
        {/* Stacked (below lg): 4px lower, a little closer to the name, it looked
            detached and too high */}
        <div className='shrink-0 max-lg:translate-y-1'>
          <BrandMark className='size-[100px] md:size-[120px] xl:size-[160px] text-white' />
        </div>

        {/* VERTICAL SEPARATOR */}
        <div className='hidden lg:block h-30 xl:h-39 w-px bg-white/20'></div>

        {/* TEXTES TYPOGRAPHIE */}
        <div className='flex flex-col text-center lg:text-left text-white gap-1'>
          <h1 className='font-semibold text-[40px] md:text-[44px] xl:text-[54px] leading-none uppercase tracking-[0.2em]'>
            Arnaud Benez
          </h1>
          <div className='font-light text-[16px] md:text-[19px] xl:text-[23px] text-gray-300 uppercase tracking-[0.084em] flex flex-col md:flex-row items-center justify-center lg:justify-start gap-1 md:gap-3'>
            <span>{t('designer')}</span>
            <span className='h-6 w-px bg-gray-500 hidden md:block'></span>
            <span>{t('developer')}</span>
          </div>
        </div>
      </div>
  );
};