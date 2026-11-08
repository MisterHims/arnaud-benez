'use client';

import BlockContent from "../layouts/BlockContent";
import SectionShell from "../layouts/SectionShell";
import { ExperienceList } from "./experience/ExperienceList";
import { SkillsGrid } from "./experience/SkillsGrid";

export const Experience = () => {
  return (
    <SectionShell variant="contained" className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-x-10 xl:gap-x-20">

        {/* COLONNE GAUCHE (Timeline) - Prend 6 colonnes sur 12 */}
        <BlockContent colSpan={6} className="order-1">
          <ExperienceList skillsStrip={<SkillsGrid variant="strip" />} />
        </BlockContent>

        {/* COLONNE DROITE (Skills Bento) - Prend 6 colonnes sur 12 */}
        {/* The skills grid handles its own sticky behavior (see SkillsGrid).
            Below lg it becomes a swipeable strip under the title instead */}
        <BlockContent colSpan={6} className="order-2 hidden lg:block pt-24">
          <SkillsGrid />
        </BlockContent>

      </div>
    </SectionShell>
  );
};