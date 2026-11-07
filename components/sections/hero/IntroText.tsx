'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CustomButton } from '@/components/CustomButton';

interface IntroTextProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  isVisible: boolean;
  onLaunch: () => void;
}

export const IntroText = ({ opacity, scale, isVisible, onLaunch }: IntroTextProps) => {
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
        <div className="text-white text-2xl md:text-4xl lg:text-6xl font-extrabold uppercase text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '1em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2635em', filter: 'blur(0px)' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Designing Universe
          </motion.p>

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.2em', filter: 'blur(0px)' }}
            transition={{ delay: 1.5, duration: 2.5, ease: 'easeOut' }}
            className="block mt-4 text-xl md:text-3xl lg:text-4xl font-extralight normal-case drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Designing experiences that make sense.
          </motion.p>
        </div>

        {/* Invitation to start the journey */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1, ease: 'easeOut' }}
          className="relative z-10 mt-12"
        >
          <CustomButton variant="secondary" size="lg" onPress={onLaunch}>
            Lancer le voyage
          </CustomButton>
        </motion.div>
      </div>
    </motion.div>
  );
};
