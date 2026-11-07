'use client';

import Image from 'next/image';
import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { CustomButton } from "../CustomButton";
import { Icon } from "../ui/Icon";
import { useTranslations } from "next-intl";

const bold = (chunks: React.ReactNode) => <strong className='font-semibold'>{chunks}</strong>;

export const WhoIAm = () => {
  const t = useTranslations('WhoIAm');
  return (
    <SectionShell variant="contained" className="min-h-screen grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 relative overflow-hidden flex items-center bg-[#0c0c0c] z-10">
      {/* LEFT ZONE: Text Content */}
      <BlockContent colSpan={6}>
        <h2 className='text-7xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-8'>
          {t('title')}
        </h2>

        <div className='text-lg space-y-6 leading-relaxed font-extralight mb-8'>
          <p>{t.rich('p1', { b: bold })}</p>
          <p>{t.rich('p2', { b: bold })}</p>
          <p>{t.rich('p3', { b: bold })}</p>
          <p>{t('p4')}</p>
        </div>

        <div className='flex gap-8 pt-4'>
          <CustomButton variant="secondary" size="lg">
            <Icon name="IdVerified" className="w-6 h-6 mt-[2px]" />
            {t('downloadCv')}
          </CustomButton>
          <CustomButton variant="secondary" size="lg">
            <Icon name="BookOpen" className="w-6 h-6 mt-[2px]" />
            {t('downloadBook')}
          </CustomButton>
        </div>
      </BlockContent>

      {/* RIGHT ZONE: Portrait Image */}
      <BlockContent colSpan={5} className="md:col-start-7">
        <Image
          src="/assets/portrait.png"
          alt={t('portraitAlt')}
          width={703}
          height={757}
          className="object-contain object-bottom w-auto"
          priority
        />
      </BlockContent>

    </SectionShell>
  );
};
