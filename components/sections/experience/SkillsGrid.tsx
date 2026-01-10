'use client';

import { Logo, LogoName } from "@/components/ui/Logo";

interface SkillCategoryProps {
  title: string;
  icons: LogoName[];
}

const SkillCard = ({ title, icons, className }: SkillCategoryProps & { className?: string }) => (
  <div className={`bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-white/10 transition-colors group ${className}`}>

    {/* Grille d'icônes */}
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {icons.map((iconName, i) => (
        <div key={i} className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group/icon">

          {/* L'icône Logo */}
          <Logo
            name={iconName}
            className="w-full h-full"
          />

          {/* Tooltip optionnel (nom de l'outil au survol) */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
            {iconName}
          </span>

        </div>
      ))}
    </div>

    {/* Titre de la catégorie */}
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
        icons={['TypeScript', 'TailwindCSS', 'MUI', 'React', 'Vite', 'NextJS']}
        className="w-full"
      />

      {/* LIGNE 2 : Design (Large) */}
      <SkillCard
        title="Design & Animation"
        icons={['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'PremierePro', 'AfterEffects', 'Audition']}
        className="w-full"
      />

      {/* LIGNE 3 : Project (Moitié) + Back-End (Moitié) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SkillCard
          title="Project Management"
          icons={['Linear', 'MSProject', 'Notion', 'Trello', 'Obsidian']}
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
          icons={['ContentSquare', 'GoogleAnalytics', 'Wordpress', 'Shopify']}
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