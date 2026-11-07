'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CSSProperties, KeyboardEvent, PointerEvent, useEffect, useState } from 'react';

/** Where a skill star leads: a page section, or a logo in the skills grid. */
export type SkillTarget = { section: string } | { skill: string };

interface SkillStarsProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity?: MotionValue<number>;
  /** Stars only react once the ship has landed. */
  interactive?: boolean;
  onStarClick: (target: SkillTarget) => void;
}

const SKILLS: {
  id: string;
  label: string;
  type: 'major' | 'minor';
  top: number;
  left: number;
  appearanceDelay: number;
  target: SkillTarget;
}[] = [
  { id: 'branding', label: 'Branding', type: 'major', top: 20, left: 15, appearanceDelay: 0.5, target: { section: 'what-i-do' } },
  { id: 'ui', label: 'UI Design', type: 'major', top: 30, left: 80, appearanceDelay: 1.0, target: { section: 'what-i-do' } },
  { id: 'typescript', label: 'TypeScript', type: 'minor', top: 15, left: 60, appearanceDelay: 1.5, target: { skill: 'TypeScript' } },
  { id: 'nextjs', label: 'Next.js', type: 'minor', top: 50, left: 10, appearanceDelay: 2.0, target: { skill: 'NextJS' } },
  { id: 'react', label: 'React', type: 'minor', top: 60, left: 85, appearanceDelay: 2.5, target: { skill: 'React' } },
  { id: 'tailwind', label: 'Tailwind', type: 'minor', top: 10, left: 40, appearanceDelay: 3.0, target: { skill: 'Tailwind CSS' } },
  { id: 'figma', label: 'Figma', type: 'minor', top: 40, left: 90, appearanceDelay: 3.5, target: { skill: 'Figma' } },
  { id: 'claudecode', label: 'Claude Code', type: 'minor', top: 62, left: 30, appearanceDelay: 4.0, target: { skill: 'Claude Code' } },
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

const fadeMaskStyle: CSSProperties = {
  maskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
  WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 55%)',
};

export const SkillStars = ({ x, y, opacity, interactive = true, onStarClick }: SkillStarsProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(!opacity);
  // Touch: the first tap reveals the label, the second one follows the star
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lastPointerType, setLastPointerType] = useState<string>('mouse');

  // Wait for container opacity to be visible before starting individual animations
  useEffect(() => {
    if (!opacity) return;
    const check = (latest: number) => {
      if (latest > 0.3) setShouldAnimate(true);
    };
    // Already visible (e.g. landing restored from the session): no change event will come
    if (opacity.get() > 0.3) queueMicrotask(() => setShouldAnimate(true));
    return opacity.on('change', check);
  }, [opacity]);

  const activate = (skill: (typeof SKILLS)[number]) => {
    if (!interactive) return;
    if (lastPointerType === 'touch' && activeId !== skill.id) {
      setActiveId(skill.id);
      return;
    }
    setActiveId(null);
    onStarClick(skill.target);
  };

  const onKeyDown = (e: KeyboardEvent, skill: (typeof SKILLS)[number]) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveId(null);
      if (interactive) onStarClick(skill.target);
    }
  };

  return (
    <motion.div
      style={{ x, y, opacity }}
      className='absolute inset-0 z-20 pointer-events-none'
    >
      {SKILLS.map((skill) => {
        const isMajor = skill.type === 'major';
        const { appearanceDelay } = skill;
        const isActive = activeId === skill.id;

        return (
          <motion.div
            key={skill.id}
            role="button"
            tabIndex={interactive && shouldAnimate ? 0 : -1}
            aria-label={skill.label}
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
            className={cn(
              'absolute group flex flex-col items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent',
              interactive ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
            )}
            style={{ top: `${skill.top}%`, left: `${skill.left}%` }}
            onPointerDown={(e: PointerEvent) => setLastPointerType(e.pointerType)}
            onClick={() => activate(skill)}
            onKeyDown={(e) => onKeyDown(e, skill)}
            onBlur={() => setActiveId((id) => (id === skill.id ? null : id))}
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
                  isMajor
                    ? "w-3 h-3 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    : "w-4 h-4",
                  "group-hover:opacity-60 group-focus-visible:opacity-60",
                  isActive && "opacity-60"
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
                    "group-hover:scale-110 group-hover:rotate-12 group-focus-visible:scale-110 group-focus-visible:rotate-12",
                    isActive && "scale-110 rotate-12",
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

            {/* LABEL: hover, keyboard focus, or first tap on touch screens */}
            <div
              className={cn(
                'absolute text-white font-extrabold text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 transform',
                'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-1',
                'group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:translate-y-1',
                isActive && 'opacity-100 scale-100 translate-y-1',
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
