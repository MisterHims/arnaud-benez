'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ExperienceList } from "./experience/ExperienceList";
import { SkillsGrid } from "./experience/SkillsGrid";

export const Experience = () => {
  return (
    <SectionShell variant="contained" className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* COLONNE GAUCHE (Timeline) - Prend 6 colonnes sur 12 */}
        <BlockContent colSpan={6} className="order-1">
          <ExperienceList />
        </BlockContent>

        {/* COLONNE DROITE (Skills Bento) - Prend 6 colonnes sur 12 */}
        {/* isSticky permet de garder les skills visibles si la timeline est longue */}
        <BlockContent colSpan={6} isSticky className="order-2 pt-8 lg:pt-24">
          <SkillsGrid />
        </BlockContent>

      </div>
    </SectionShell>
  );
};