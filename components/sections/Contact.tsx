'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ContactCard } from "./contact/ContactCard";
import { ContactForm } from "./contact/ContactForm";
import { Footer } from "./Footer";

export const Contact = () => {
  return (
    <>
      <SectionShell variant="full" className="bg-radial-[at_25%_25%] from-[#080808] to-[#121212] to-75% overflow-hidden">
        <SectionShell variant="contained" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14">

          {/* 1. HEADER (Titre & Sous-titre) */}
          <BlockContent colSpan={12} className="mb-8">
            <h2 className='text-7xl md:text-8xl font-black text-[#EDEDED] tracking-tight mb-4'>
              Contact
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl font-light">
              Une question ? Un projet ? Ou simplement envie d'échanger ? Je suis toujours ouvert à la discussion.
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