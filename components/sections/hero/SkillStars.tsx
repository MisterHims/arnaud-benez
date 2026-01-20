'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

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

const LensFlareStarIcon = ({ className, style }: { className?: string, style?: CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
    style={style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 1V11M12 13V23M1 12H11M13 12H23 M6 6L10.5 10.5 M13.5 13.5L18 18 M18 6L13.5 10.5 M10.5 13.5L6 18"
      strokeWidth="0.5"
      strokeLinecap="round"
    />
    <path
      d="M12 0V24M0 12H24"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const SkillStars = ({ x, y, onStarClick }: SkillStarsProps) => {
  const fadeMaskStyle: CSSProperties = {
    maskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
  };

  return (
    <motion.div
      style={{ x, y }}
      className='absolute inset-0 z-20 pointer-events-none'
    >
      {SKILLS.map((skill) => {
        const isMajor = skill.type === 'major';

        return (
          <div
            key={skill.id}
            className='absolute pointer-events-auto cursor-pointer group flex flex-col items-center justify-center'
            style={{ top: `${skill.top}%`, left: `${skill.left}%` }}
            onClick={() => onStarClick(skill.id)}
          >
            <div className="relative flex items-center justify-center p-4">

              {/* 1. BACK GLOW */}
              <div
                className={cn(
                  "absolute bg-white rounded-full blur-md transition-all duration-500",

                  // -- BASE CLASSES --
                  isMajor
                    // CHANGE HERE: w-4 h-4 -> w-3 h-3
                    // Slightly reduced shadows (10px -> 8px)
                    ? "w-3 h-3 opacity-50 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "w-4 h-4 opacity-20",

                  // -- HOVER CLASSES --
                  // Fixed size, only opacity changes
                  "group-hover:opacity-60"
                )}
              />

              {/* 2. SVG STAR */}
              <LensFlareStarIcon
                style={fadeMaskStyle}
                className={cn(
                  "text-white transition-all duration-500 ease-out z-10",

                  // Animation uniforme
                  "group-hover:scale-110 group-hover:rotate-12",

                  isMajor
                    ? "w-7 h-7 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)] animate-pulse-slow"
                    : "w-6 h-6 opacity-60 group-hover:opacity-100"
                )}
              />

              {/* 3. CENTRAL CORE */}
              <div className={cn(
                "absolute bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)] blur-[1px] z-20",
                isMajor ? "w-[5px] h-[5px]" : "w-1 h-1"
              )} />
            </div>

            {/* LABEL */}
            <div
              className={cn(
                'absolute text-white text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 transform',
                'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1',
                isMajor ? 'top-16 font-bold' : 'top-10'
              )}
            >
              {skill.label}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};