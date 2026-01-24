'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface IntroTextProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  filter: MotionValue<string>;
  isVisible: boolean;
}

export const IntroText = ({ opacity, scale, filter, isVisible }: IntroTextProps) => {
  return (
    <motion.div
      style={{ opacity, scale, filter }}
      className={cn(
        'absolute inset-0 flex items-center justify-center z-20',
        isVisible ? 'pointer-events-auto select-text' : 'pointer-events-none'
      )}
    >
      <div className="relative text-center px-4">
        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-extrabold uppercase text-center relative z-10">
          {/* Option A: Cinematic Arrival */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '1em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2635em', filter: 'blur(0px)' }}
            transition={{
              duration: 2.5,
              ease: "easeOut",
            }}
            className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Designing Universe
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)' }}
            transition={{
              delay: 1.5,
              duration: 2.5,
              ease: "easeOut",
            }}
            className="block mt-4 text-xl md:text-3xl lg:text-4xl font-extralight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            style={{ textTransform: 'none' }}
          >
            Designing experiences that make sense.
          </motion.span>
        </h1>
      </div>
    </motion.div>
  );
};