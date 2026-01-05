'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillStarsProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onStarClick: (id: string) => void;
}

const SKILLS = [
  { id: 'branding', label: 'Branding', type: 'major', top: 20, left: 15 },
  { id: 'ui', label: 'UI Design', type: 'major', top: 30, left: 80 },
  { id: 'typescript', label: 'TypeScript', type: 'minor', top: 15, left: 60 },
  { id: 'nextjs', label: 'Next.js', type: 'minor', top: 50, left: 10 },
  { id: 'react', label: 'React', type: 'minor', top: 60, left: 85 },
  { id: 'tailwind', label: 'Tailwind', type: 'minor', top: 10, left: 40 },
  { id: 'figma', label: 'Figma', type: 'minor', top: 40, left: 90 },
];

export const SkillStars = ({ x, y, onStarClick }: SkillStarsProps) => {
  return (
    <motion.div
      style={{ x, y }}
      className='absolute inset-0 z-20 pointer-events-none'
    >
      {SKILLS.map((skill) => (
        <div
          key={skill.id}
          className='absolute pointer-events-auto cursor-pointer group'
          style={{ top: `${skill.top}%`, left: `${skill.left}%` }}
          onClick={() => onStarClick(skill.id)}
        >
          {/* L'Étoile */}
          <div
            className={cn(
              'relative rounded-full bg-white transition-all duration-300 group-hover:scale-150',
              skill.type === 'major'
                ? 'w-3 h-3 shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-pulse'
                : 'w-1.5 h-1.5 opacity-60'
            )}
          >
            {/* Effet 'Star Cross' pour les majeures */}
            {skill.type === 'major' && (
              <>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-px bg-white/50' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[40px] bg-white/50' />
              </>
            )}
          </div>

          {/* Label */}
          <div
            className={cn(
              'absolute top-6 left-1/2 -translate-x-1/2 text-white text-xs tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              skill.type === 'major' && 'opacity-70 font-bold'
            )}
          >
            {skill.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};