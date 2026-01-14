'use client';

import { Logo, LogoName } from "@/components/ui/Logo";
import { Tooltip } from '@heroui/react';

interface SkillCategoryProps {
  title: string;
  icons: LogoName[];
}

const SkillCard = ({ title, icons }: SkillCategoryProps) => (
  <div className="bg-linear-to-br from-[#141414] to-[#0A0A0A] border-3 border-white/10 rounded-xl p-6 pb-3 flex flex-col items-center justify-center gap-4 grow sm:grow-0">

    <div className="flex justify-center gap-4 md:gap-6">
      {icons.map((iconName, i) => (
        <div key={i} className="relative flex items-center justify-center">

          <Tooltip delay={0} closeDelay={20000}>
            <Tooltip.Trigger className="cursor-help outline-none">
              <div className="w-10 h-10 flex items-center justify-center">
                <Logo
                  name={iconName}
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

    <span className="text-[15px] text-white/95 font-medium tracking-wide mt-2 whitespace-nowrap">
      {title}
    </span>
  </div>
);

export const SkillsGrid = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-start">

      <SkillCard
        title="Front-End Development"
        icons={['TypeScript', 'Tailwind CSS', 'MUI', 'React', 'Vite', 'NextJS']}
      />

      <SkillCard
        title="Design & Animation"
        icons={['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'Premiere Pro', 'After Effects', 'Audition']}
      />

      <SkillCard
        title="Project Management"
        icons={['Linear', 'Microsoft Project', 'Notion', 'Trello', 'Obsidian']}
      />

      <SkillCard
        title="Backend Development"
        icons={['JavaScript']}
      />

      <SkillCard
        title="CMS & E-Commerce"
        icons={['ContentSquare', 'Google Analytics', 'Wordpress', 'Shopify']}
      />

      <SkillCard
        title="Database"
        icons={['SQLite', 'MongoDB', 'NeonDB', 'Prisma']}
      />

      <SkillCard
        title="Dev Ops"
        icons={['Docker', 'Nginx', 'Vercel']}
      />

      <SkillCard
        title="Dev Tools"
        icons={['VSCode', 'Git', 'Stripo', 'NPM']} // J'ai retiré Github/Copilot car pas dans la liste des LogoName mis à jour précédemment, à remettre si ajoutés
      />

    </div>
  );
};