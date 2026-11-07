'use client';

import { Logo, LogoName } from "@/components/ui/Logo";
import { Tooltip } from '@heroui/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

interface SkillCategoryProps {
  title: string;
  icons: LogoName[];
}

const SkillCard = ({ title, icons }: SkillCategoryProps) => (
  <div className="relative group rounded-2xl bg-linear-to-br from-[#101215] to-[#040506] grow sm:grow-0">
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none z-20"
      style={{
        padding: '2px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0) 100%)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor', // Essential for Chrome/Safari
      }}
    />
    <div className="relative px-5 pt-5 pb-2.5 flex flex-col items-center justify-center gap-3 z-10">

      {/* Glow effect (Top) */}
      <div className="absolute top-0 inset-x-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex justify-center gap-3 md:gap-5">
        {icons.map((iconName, i) => (
          // data-skill: target of the hero's skill stars (highlighted on arrival)
          <div key={i} data-skill={iconName} className="relative flex items-center justify-center rounded-xl">

            <Tooltip delay={0}>
              {/* Name also as visually hidden text (screen readers, search
                  engines) and a visible ring on keyboard focus */}
              <Tooltip.Trigger className="cursor-help rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0c0f]">
                <span className="sr-only">{iconName}</span>
                <div className="w-8 h-8 flex items-center justify-center">
                  <Logo
                    name={iconName}
                    aria-hidden="true"
                    className="w-full h-full object-contain grayscale-25 hover:grayscale-0 transition-all duration-300 transform hover:scale-110"
                  />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content offset={15} showArrow className="bg-white text-black">
                <Tooltip.Arrow className="[&_path]:fill-white" />
                {iconName}
              </Tooltip.Content>
            </Tooltip>
          </div>
        ))}
      </div>

      <span className="text-[13px] text-white/95 font-medium tracking-wide mt-1.5 whitespace-nowrap">
        {title}
      </span>
    </div>
  </div>
);

/** Minimal gaps kept between the grid and the top / bottom of the screen
 *  while sticky (bottom: clears the floating back-to-top button) */
const STICKY_MIN_TOP = 96;
const STICKY_BOTTOM = 80;

export const SkillsGrid = () => {
  const t = useTranslations('Experience.skills');

  // Stays in view while the (long) timeline scrolls, vertically centered in
  // the screen. When the grid is too tall for that, it first scrolls to
  // reveal its bottom, then sticks: never cut off, whatever the screen height
  const ref = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(STICKY_MIN_TOP);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const free = window.innerHeight - el.offsetHeight;
      const centered = free / 2;
      setStickyTop(
        centered >= STICKY_MIN_TOP && centered >= STICKY_BOTTOM
          ? centered
          : Math.min(STICKY_MIN_TOP, free - STICKY_BOTTOM)
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Explicit rows, each one wider than the one above: a triangle shape
  // (widths 280 / 332 / 384 / 468 / 572px), independent of line wrapping
  const rows: { key: 'frontEnd' | 'design' | 'projectManagement' | 'cms' | 'database' | 'devOps' | 'devTools'; icons: LogoName[] }[][] = [
    [{ key: 'projectManagement', icons: ['Linear', 'Microsoft Project', 'Notion', 'Trello', 'Obsidian'] }],
    [{ key: 'devTools', icons: ['VSCode', 'Git', 'Cursor', 'Claude Code', 'Stripo', 'NPM'] }],
    [{ key: 'frontEnd', icons: ['TypeScript', 'JavaScript', 'Tailwind CSS', 'MUI', 'React', 'Vite', 'NextJS'] }],
    [
      { key: 'cms', icons: ['ContentSquare', 'Google Analytics', 'Wordpress', 'Shopify'] },
      { key: 'database', icons: ['SQLite', 'MongoDB', 'NeonDB', 'Prisma'] },
    ],
    [
      { key: 'design', icons: ['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects', 'Audition'] },
      { key: 'devOps', icons: ['Docker', 'Nginx', 'Vercel'] },
    ],
  ];

  return (
    // w-fit + mx-auto: the triangle is centered in its column
    <div ref={ref} className="flex flex-col gap-3 w-fit max-w-full mx-auto lg:sticky" style={{ top: stickyTop }}>
      {rows.map((row) => (
        <div key={row.map(({ key }) => key).join('-')} className="flex flex-wrap gap-3">
          {row.map(({ key, icons }) => (
            <SkillCard key={key} title={t(key)} icons={icons} />
          ))}
        </div>
      ))}
    </div>
  );
};
