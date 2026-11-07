'use client';

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";

export const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-[#010101]">
      <SectionShell variant="contained" withSpacing={false} className="my-5">
        <BlockContent colSpan={12}>
          <div className="flex text-zinc-400 font-light tracking-wide justify-end items-end">
            <span>&copy; {currentYear} - {t('rights')}</span>
            <span className="mx-2">•</span>
            <Link
              href="/legal"
              className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
            >
              {t('legal')}
            </Link>
          </div>
        </BlockContent>
      </SectionShell>
    </footer>
  );
};