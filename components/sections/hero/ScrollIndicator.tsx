'use client';

import { motion, MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  opacity: MotionValue<number>;
  onClick: () => void;
  isVisible: boolean;
}

export const ScrollIndicator = ({ opacity, onClick, isVisible }: ScrollIndicatorProps) => (
  <motion.button
    type="button"
    style={{ opacity }}
    onClick={onClick}
    tabIndex={isVisible ? 0 : -1}
    aria-hidden={!isVisible}
    aria-label="Défiler vers le bas"
    className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 cursor-pointer ${isVisible ? '' : 'pointer-events-none'}`}
  >
    {/* Mouse body */}
    <span className="w-6 h-10 rounded-full border-2 border-white/30 relative block">
      {/* Scroll wheel */}
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
        className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-white rounded-full block"
      />
    </span>

    <span className="text-[11px] text-gray-400 tracking-[0.2em] uppercase font-light">
      Scroll down
    </span>
  </motion.button>
);
