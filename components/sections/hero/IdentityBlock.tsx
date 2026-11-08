'use client';

import { useTranslations } from 'next-intl';

export const IdentityBlock = () => {
  const t = useTranslations('Hero.identity');
  return (
    <div className='relative z-10 flex flex-col items-center justify-center lg:flex-row gap-8 lg:gap-12 xl:gap-15 p-8'>
        {/* Halo Radial pour lisibilité */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(closest-side,#000000_50%,rgba(0,0,0,0)_100%)] blur-3xl z-[-1] pointer-events-none" />

        {/* LOGO SVG */}
        <div className='shrink-0'>
          <svg width='160' height='160' viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg' className='size-[100px] md:size-[120px] xl:size-[160px]'>
            <path d='M124.444 80L160 44.445L115.556 0.00126118L80 35.555L44.445 0L0 44.445L8.88875 53.3337L44.4437 17.7788L73.7146 47.0484V73.7096H41.8416L0 115.552L44.4437 159.997L80 124.444L115.555 160L159.999 115.556L124.444 80ZM86.3168 47.0144L115.555 17.7762L142.221 44.4412L112.952 73.7096H86.2854L86.3168 47.0144ZM44.445 142.221L17.7788 115.552L47.0484 86.2803H73.7146V112.996L44.445 142.221ZM115.555 142.221L86.2854 112.969V86.2803H112.952L142.221 115.552L115.555 142.221Z' fill='white' />
          </svg>
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