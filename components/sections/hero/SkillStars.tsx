'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CSSProperties, useState, useEffect } from 'react';

interface SkillStarsProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity?: MotionValue<number>;
  onStarClick: (id: string) => void;
}

const SKILLS = [
  { id: 'branding', label: 'Branding', type: 'major', top: 20, left: 15, delay: 0 },
  { id: 'ui', label: 'UI Design', type: 'major', top: 30, left: 80, delay: 0.3 },
  { id: 'typescript', label: 'TypeScript', type: 'minor', top: 15, left: 60, delay: 0.6 },
  { id: 'nextjs', label: 'Next.js', type: 'minor', top: 50, left: 10, delay: 0.9 },
  { id: 'react', label: 'React', type: 'minor', top: 60, left: 85, delay: 1.2 },
  { id: 'tailwind', label: 'Tailwind', type: 'minor', top: 10, left: 40, delay: 1.5 },
  { id: 'figma', label: 'Figma', type: 'minor', top: 40, left: 90, delay: 1.8 },
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

export const SkillStars = ({ x, y, opacity, onStarClick }: SkillStarsProps) => {
  const fadeMaskStyle: CSSProperties = {
    maskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
  };

  const [shouldAnimate, setShouldAnimate] = useState(!opacity);

  // Wait for container opacity to be visible before starting individual animations
  useEffect(() => {
    if (!opacity) {
      return;
    }

    const unsubscribe = opacity.on('change', (latest) => {
      if (latest > 0.3) {
        setShouldAnimate(true);
      }
    });

    return () => unsubscribe();
  }, [opacity]);

  // Specific appearance delays for each skill
  const getAppearanceDelay = (skill: typeof SKILLS[0]) => {
    const delays: Record<string, number> = {
      'branding': 0.5,
      'ui': 1.0,
      'typescript': 1.5,
      'nextjs': 2.0,
      'react': 2.5,
      'tailwind': 3.0,
      'figma': 3.5,
    };
    return delays[skill.id] || 0;
  };

  return (
    <motion.div
      style={{ x, y, opacity }}
      className='absolute inset-0 z-20 pointer-events-none'
    >
      {SKILLS.map((skill) => {
        const isMajor = skill.type === 'major';
        const appearanceDelay = getAppearanceDelay(skill);

        return (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              opacity: {
                delay: shouldAnimate ? appearanceDelay : 0,
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              },
              scale: {
                delay: shouldAnimate ? appearanceDelay : 0,
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            className='absolute pointer-events-auto cursor-pointer group flex flex-col items-center justify-center'
            style={{ top: `${skill.top}%`, left: `${skill.left}%` }}
            onClick={() => onStarClick(skill.id)}
          >
            <div className="relative flex items-center justify-center p-4">

              {/* 1. BACK GLOW */}
              <motion.div
                animate={{
                  opacity: isMajor
                    ? [0.4, 0.6, 0.4, 0.6, 0.4]
                    : [0.15, 0.25, 0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: shouldAnimate ? appearanceDelay + 0.8 : 0,
                }}
                className={cn(
                  "absolute bg-white rounded-full blur-md transition-all duration-500",

                  // -- BASE CLASSES --
                  isMajor
                    // CHANGE HERE: w-4 h-4 -> w-3 h-3
                    // Slightly reduced shadows (10px -> 8px)
                    ? "w-3 h-3 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "w-4 h-4",

                  // -- HOVER CLASSES --
                  // Fixed size, only opacity changes
                  "group-hover:opacity-60"
                )}
              />

              {/* 2. SVG STAR */}
              <motion.div
                animate={{
                  opacity: isMajor 
                    ? [0.8, 1, 0.8, 1, 0.8]
                    : [0.5, 0.7, 0.5, 0.7, 0.5],
                  scale: isMajor
                    ? [1, 1.05, 1, 1.05, 1]
                    : [1, 1.03, 1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: shouldAnimate ? appearanceDelay + 0.8 : 0,
                }}
                className="z-10"
              >
                <LensFlareStarIcon
                  style={fadeMaskStyle}
                  className={cn(
                    "text-white transition-all duration-500 ease-out",

                    // Animation uniforme
                    "group-hover:scale-110 group-hover:rotate-12",

                    isMajor
                      ? "w-7 h-7 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]"
                      : "w-6 h-6 group-hover:opacity-100"
                  )}
                />
              </motion.div>

              {/* 3. CENTRAL CORE */}
              <motion.div
                animate={{
                  opacity: [0.8, 1, 0.8, 1, 0.8],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: shouldAnimate ? appearanceDelay + 0.8 : 0,
                }}
                className={cn(
                  "absolute bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1)] blur-[1px] z-20",
                  isMajor ? "w-[5px] h-[5px]" : "w-1 h-1"
                )}
              />
            </div>

            {/* LABEL */}
            <div
              className={cn(
                'absolute text-white font-extrabold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 transform',
                'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1',
                isMajor ? 'bottom-14 font-bold' : 'bottom-12'
              )}
            >
              {skill.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};