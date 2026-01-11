'use client';

import { Logo, LogoName } from "@/components/ui/Logo";
import { Tooltip } from '@heroui/react';

interface SkillCategoryProps {
  title: string;
  icons: LogoName[];
}

const SkillCard = ({ title, icons, className }: SkillCategoryProps & { className?: string }) => (
  <div className={`bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-white/10 transition-colors group ${className}`}>

    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {icons.map((iconName, i) => (
        <div key={i} className="relative flex items-center justify-center">

          <Tooltip delay={0}>
            <Tooltip.Trigger>
              <Logo
                name={iconName}
                className="w-full h-full max-w-10 max-h-10"
              />
            </Tooltip.Trigger>
            <Tooltip.Content showArrow offset={13}>
              <Tooltip.Arrow />
              {iconName}
            </Tooltip.Content>
          </Tooltip>

        </div>
      ))}
    </div>

    <span className="text-xs text-zinc-500 font-medium tracking-wide mt-2">
      {title}
    </span>
  </div>
);

export const SkillsGrid = () => {
  return (
    <div className="flex flex-col gap-4">

      {/* LIGNE 1 : Front-End (Large) */}
      <SkillCard
        title="Front-End Development"
        icons={['TypeScript', 'Tailwind CSS', 'MUI', 'React', 'Vite', 'NextJS']}
      />

      {/* LIGNE 2 : Design (Large) */}
      <SkillCard
        title="Design & Animation"
        icons={['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects', 'Audition']}
      />

      {/* LIGNE 3 : Project (Moitié) + Back-End (Moitié) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillCard
          title="Project Management"
          icons={['Linear', 'Microsoft Project', 'Notion', 'Trello', 'Obsidian']}
        />
        <SkillCard
          title="Backend Development"
          icons={['JavaScript']}
        />
      </div>

      {/* LIGNE 4 : CMS (Moitié) + Database (Moitié) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillCard
          title="CMS & E-Commerce"
          icons={['ContentSquare', 'Google Analytics', 'Wordpress', 'Shopify']}
        />
        <SkillCard
          title="Database"
          icons={['SQLite', 'MongoDB', 'NeonDB', 'Prisma']}
        />
      </div>

      {/* LIGNE 5 : DevOps (Moitié) + DevTools (Moitié) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillCard
          title="Dev Ops"
          icons={['Docker', 'Nginx', 'Vercel']}
        />
        <SkillCard
          title="Dev Tools"
          icons={['VSCode', 'Git', 'GitHub', 'Stripo', 'NPM']}
        />
      </div>

    </div>
  );
};