'use client';

import { Logo, LogoName } from "@/components/ui/Logo";
import { Tooltip } from '@heroui/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface SkillCategoryProps {
  title: string;
  icons: LogoName[];
  className?: string;
}

/** How long a tapped tool's name replaces the category title, in ms */
const TAP_LABEL_DURATION = 2000;

const SkillCard = ({ title, icons, className }: SkillCategoryProps) => {
  // Touch screens have no hover, so no tooltip: tapping a logo shows its
  // name in place of the category title for a moment
  const [tapped, setTapped] = useState<LogoName | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const showName = (name: LogoName) => {
    setTapped(name);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTapped(null), TAP_LABEL_DURATION);
  };

  return (
  <div className={cn('relative group rounded-xl bg-linear-to-br from-[#101215] to-[#040506] grow sm:grow-0', className)}>
    <div
      className="absolute inset-0 rounded-xl pointer-events-none z-20"
      style={{
        padding: '2px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0) 100%)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor', // Essential for Chrome/Safari
      }}
    />
    <div className="relative px-4 sm:px-5 compact:px-3 pt-5 compact:pt-3.5 pb-2.5 compact:pb-2 flex flex-col items-center justify-center gap-3 compact:gap-2 z-10">

      {/* Glow effect (Top) */}
      <div className="absolute top-0 inset-x-4 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex justify-center gap-2.5 sm:gap-3 md:gap-5 compact:gap-2.5">
        {icons.map((iconName, i) => (
          // data-skill: target of the hero's skill stars (highlighted on arrival)
          <div
            key={i}
            data-skill={iconName}
            className="relative flex items-center justify-center rounded-xl"
            onPointerUp={(e) => { if (e.pointerType !== 'mouse') showName(iconName); }}
          >

            <Tooltip delay={0}>
              {/* Name also as visually hidden text (screen readers, search
                  engines) and a visible ring on keyboard focus */}
              <Tooltip.Trigger className="cursor-help rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0c0f]">
                <span className="sr-only">{iconName}</span>
                <div className="size-7 sm:size-8 compact:size-7 flex items-center justify-center">
                  <Logo
                    name={iconName}
                    aria-hidden="true"
                    className={cn(
                      'w-full h-full object-contain grayscale-25 hover:grayscale-0 transition-all duration-300 transform hover:scale-110',
                      tapped === iconName && 'grayscale-0 scale-110'
                    )}
                  />
                </div>
              </Tooltip.Trigger>
              {/* Smaller radius; the arrow overlaps the bubble by 1px (no seam
                  between them) and loses HeroUI's shadow outline */}
              <Tooltip.Content offset={15} showArrow className="bg-white text-black rounded-md shadow-none">
                <Tooltip.Arrow className="-mt-px [&_path]:fill-white [&_path]:stroke-none [&_svg]:drop-shadow-none" />
                {iconName}
              </Tooltip.Content>
            </Tooltip>
          </div>
        ))}
      </div>

      {/* Category title, or the tapped tool's name (visual only: the names
          are already given to screen readers) */}
      <span
        key={tapped ?? 'title'}
        aria-hidden={tapped ? true : undefined}
        className={cn(
          'text-[13px] compact:text-xs font-medium tracking-wide mt-1.5 compact:mt-1 whitespace-nowrap animate-[fade-in_0.25s_ease-out] motion-reduce:animate-none',
          tapped ? 'text-white' : 'text-white/95'
        )}
      >
        {tapped ?? title}
      </span>
    </div>
  </div>
  );
};

/** Minimal gaps kept between the grid and the top / bottom of the screen
 *  while sticky (bottom: clears the floating back-to-top button) */
const STICKY_MIN_TOP = 96;
const STICKY_BOTTOM = 80;

type SkillsGridProps = {
  /** "grid": the triangle beside the timeline (lg and up), sticky.
   *  "strip": one swipeable row, under the section title (below lg) */
  variant?: 'grid' | 'strip';
};

/** Strip order: the core skills first */
const STRIP_ORDER = ['design', 'frontEnd', 'devTools', 'projectManagement', 'cms', 'database', 'devOps'] as const;

export const SkillsGrid = ({ variant = 'grid' }: SkillsGridProps) => {
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
  // (widths 228 / 332 / 436 / 520 / 572px), independent of line wrapping
  const rows: { key: 'frontEnd' | 'design' | 'projectManagement' | 'cms' | 'database' | 'devOps' | 'devTools'; icons: LogoName[] }[][] = [
    [{ key: 'database', icons: ['SQLite', 'MongoDB', 'NeonDB', 'Prisma'] }],
    [{ key: 'devTools', icons: ['VSCode', 'Git', 'Cursor', 'Claude Code', 'Stripo', 'NPM'] }],
    [{ key: 'design', icons: ['Figma', 'Claude Design', 'Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects', 'Audition'] }],
    [
      { key: 'projectManagement', icons: ['Linear', 'Microsoft Project', 'Notion', 'Trello', 'Obsidian'] },
      { key: 'cms', icons: ['ContentSquare', 'Google Analytics', 'Wordpress', 'Shopify'] },
    ],
    [
      { key: 'frontEnd', icons: ['TypeScript', 'JavaScript', 'Tailwind CSS', 'MUI', 'React', 'Vite', 'NextJS'] },
      { key: 'devOps', icons: ['Docker', 'Nginx', 'Vercel'] },
    ],
  ];

  if (variant === 'strip') {
    const categories = STRIP_ORDER.map((key) => rows.flat().find((category) => category.key === key)!);
    return (
      // Swipe through the categories (scroll snapping); the right edge fades
      // out to show there is more. Bleeds to the screen edges (negative
      // margins matching the page gutter), no visible scrollbar
      <div
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 md:-mx-10 px-4 md:px-10 scroll-px-4 md:scroll-px-10 pt-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: 'linear-gradient(to right, black calc(100% - 64px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 64px), transparent)',
        }}
      >
        {categories.map(({ key, icons }) => (
          <SkillCard key={key} title={t(key)} icons={icons} className="shrink-0 grow-0 snap-start" />
        ))}
      </div>
    );
  }

  return (
    // w-fit + mx-auto: the triangle is centered in its column
    <div ref={ref} className="flex flex-col gap-3 compact:gap-2.5 w-fit max-w-full mx-auto lg:sticky" style={{ top: stickyTop }}>
      {rows.map((row) => (
        <div key={row.map(({ key }) => key).join('-')} className="flex flex-wrap gap-3 compact:gap-2.5">
          {row.map(({ key, icons }) => (
            <SkillCard key={key} title={t(key)} icons={icons} />
          ))}
        </div>
      ))}
    </div>
  );
};
