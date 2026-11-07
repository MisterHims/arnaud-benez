'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { NightSky } from "@/components/ui/NightSky";
import { ContactCard } from "./contact/ContactCard";
import { ContactForm } from "./contact/ContactForm";
import { Footer } from "./Footer";
import { useTranslations } from "next-intl";

export const Contact = () => {
  const t = useTranslations('Contact');
  return (
    <>
      <SectionShell variant="full" className="relative isolate overflow-hidden">
        {/* Section background, fading in over its first 240px (no hard edge
            with the section above) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none bg-radial-[at_25%_25%] from-[#07080a] to-[#101215] to-75%"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 240px)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 240px)',
          }}
        />
        <NightSky seed={53} count={40} />
        <SectionShell variant="contained" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">

          {/* 1. HEADER (Titre & Sous-titre) */}
          <BlockContent colSpan={12} className="mb-8">
            <h2 className='text-7xl md:text-8xl font-black text-[#ebedf0] tracking-tight mb-4'>
              {t('title')}
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl font-light">
              {t('intro')}
            </p>
          </BlockContent>

          {/* 2. ZONE GAUCHE : CARTE DE VISITE */}
          <BlockContent colSpan={6} className="flex justify-center md:justify-start">
            <ContactCard />
          </BlockContent>

          {/* 3. ZONE DROITE : FORMULAIRE */}
          <BlockContent colSpan={6} className="flex md:pl-10 items-center">
            <ContactForm />
          </BlockContent>

        </SectionShell>
      </SectionShell>
      <SectionShell variant="full">
        <Footer />
      </SectionShell>
    </>
  );
};