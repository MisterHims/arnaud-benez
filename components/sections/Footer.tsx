'use client';

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

export const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-[#010101]">
      <SectionShell variant="contained" withSpacing={false} className="py-5">
        <BlockContent colSpan={12}>
          {/* Copyright and legal notice on the left, language choice on the right */}
          <div className="flex flex-wrap text-sm text-zinc-400 font-light tracking-wide justify-between items-center gap-4">
            <div className="flex flex-wrap items-center">
              <span>&copy; {currentYear} - {t('rights')}</span>
              <span className="mx-2">•</span>
              <Link
                href="/legal"
                className="underline underline-offset-2 hover:text-zinc-300 transition-colors"
              >
                {t('legal')}
              </Link>
            </div>
            <LanguageSwitch />
          </div>
        </BlockContent>
      </SectionShell>
    </footer>
  );
};