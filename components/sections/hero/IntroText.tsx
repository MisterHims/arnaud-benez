'use client';

import { motion, MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface IntroTextProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  isVisible: boolean;
}

export const IntroText = ({ opacity, scale, isVisible }: IntroTextProps) => {
  const t = useTranslations('Hero.intro');
  // Fixed line breaks: the letter spacing animates from wide to tight, and
  // free wrapping went from 3 lines to 2 mid-animation (a jump). Each <l>
  // segment never wraps: stacked lines on phones, one line from md; while
  // still wide, a line overflows evenly on both sides (centered flex item)
  const line = (chunks: React.ReactNode) => <span className="whitespace-nowrap">{chunks}</span>;
  return (
    <motion.div
      style={{ opacity, scale }}
      className={cn(
        'absolute inset-0 flex items-center justify-center z-20',
        isVisible ? 'pointer-events-auto select-text' : 'pointer-events-none'
      )}
    >
      <div className="relative text-center px-4 flex flex-col items-center">
        {/* Radial halo for readability over the starfield */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[250%] bg-[radial-gradient(closest-side,#000000_40%,rgba(0,0,0,0)_100%)] blur-3xl z-0 pointer-events-none" />

        {/* Not an <h1>: the page title is the name on the arrival screen */}
        <div className="text-white text-[clamp(20px,6vw,30px)] md:text-3xl xl:text-5xl font-extrabold uppercase text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '1em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2635em', filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center md:gap-x-[0.5em] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            {t.rich('title', { l: line })}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)' }}
            transition={{ delay: 0.8, duration: 1.6, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center md:gap-x-[0.5em] mt-4 md:mt-5 text-[clamp(16px,5vw,20px)] md:text-2xl xl:text-3xl font-extralight normal-case drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            {t.rich('tagline', { l: line })}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
