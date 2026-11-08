'use client';

import Image from 'next/image';
import SectionShell from "../layouts/SectionShell";
import { CustomButton } from "../CustomButton";
import { Icon } from "../ui/Icon";
import { useTranslations } from "next-intl";

// Bold phrases stay on one line ("e-commerce" no longer splits at its hyphen)
const bold = (chunks: React.ReactNode) => <strong className='font-semibold whitespace-nowrap'>{chunks}</strong>;

export const WhoIAm = () => {
  const t = useTranslations('WhoIAm');
  return (
    // Grid: phones, one column; 768-1023px, the title above both columns
    // (in the left one it wrapped: "Who I / Am"), no gutter (the portrait's
    // own dark margins do it) and the portrait bleeding into the page margin;
    // from lg, title and text on the left, the portrait on the right.
    // From md, a full-screen "slide" (the section snap settles on it), content
    // vertically centered: nothing of the sections around once settled
    <SectionShell variant="contained" className="md:min-h-svh grid grid-cols-1 md:grid-cols-[1.15fr_1fr] lg:grid-cols-2 gap-y-0 md:gap-y-12 md:gap-x-0 lg:gap-x-14 md:content-center items-center relative overflow-hidden z-10">
      {/* Title + text: one block from lg; dissolved (display: contents)
          below lg so the title can span both columns (md) or the portrait
          slot in between title and text (phones) */}
      <div className="contents lg:block">
        <h2 className='max-md:order-1 md:col-span-2 lg:col-span-1 text-[clamp(2.75rem,15vw,4.5rem)] leading-none md:text-7xl xl:text-8xl font-black text-[#ebedf0] tracking-tight mb-8 md:-mb-4 lg:mb-8'>
          {t('title')}
        </h2>

        {/* Text and buttons: one block from lg; dissolved between md and lg
            so the buttons sit on their own row, under both columns */}
        <div className="contents lg:block">
          <div className='max-md:order-3 max-md:relative max-md:z-10 max-md:-mt-24 md:col-start-1 md:row-start-2 text-base xl:text-lg space-y-5 xl:space-y-6 leading-relaxed font-extralight mb-8 md:max-lg:mb-0'>
            <p>{t.rich('p1', { b: bold })}</p>
            <p>{t.rich('p2', { b: bold })}</p>
            <p>{t.rich('p3', { b: bold })}</p>
            <p>{t('p4')}</p>
          </div>

          {/* The resume is the main action (recruiters), the portfolio comes second */}
          <div className='max-md:order-4 md:col-span-2 md:row-start-3 lg:col-span-1 flex flex-wrap gap-3 pt-4 md:max-lg:pt-0 md:max-lg:-mt-4'>
            <CustomButton variant="primary" size="lg">
              <Icon name="Resume" size={18} />
              {t('downloadCv')}
            </CustomButton>
            <CustomButton variant="secondary" size="lg">
              <Icon name="Portfolio" size={18} />
              {t('downloadBook')}
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Portrait: on phones between the title and the text, which overlaps
          its faded bottom (smaller, centered, nudged 20px up to sit centered
          between both); beside the text from md */}
      <div className="max-md:order-2 max-md:-translate-y-5 flex justify-center md:block md:col-start-2 md:row-start-2 lg:row-start-1 md:max-lg:-mr-10">
        <Image
          src="/assets/portrait.png"
          alt={t('portraitAlt')}
          width={703}
          height={757}
          // Fills its column whatever the screen density: with "w-auto", a 2x
          // screen showed the image at half its size (its 2x file's natural size)
          className="w-full h-auto object-contain object-bottom max-md:max-w-[min(80%,320px)]"
          priority
        />
      </div>
    </SectionShell>
  );
};
