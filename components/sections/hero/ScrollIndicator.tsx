'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  onClick: () => void;
  isVisible: boolean;
  label: string;
  ariaLabel: string;
  opacity?: MotionValue<number>;
  /** Positioning classes (defaults to the bottom of the screen). */
  className?: string;
}

/** Animated mouse + label inviting to scroll down. */
export const ScrollIndicator = ({
  onClick,
  isVisible,
  label,
  ariaLabel,
  opacity,
  className = 'bottom-10',
}: ScrollIndicatorProps) => (
  <motion.button
    type="button"
    style={opacity ? { opacity } : undefined}
    onClick={onClick}
    tabIndex={isVisible ? 0 : -1}
    aria-hidden={!isVisible}
    aria-label={ariaLabel}
    className={cn(
      'absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 cursor-pointer',
      !isVisible && 'pointer-events-none',
      className
    )}
  >
    <span className="flex items-center justify-center">
      {/* Mouse body */}
      <span className="w-6 h-10 rounded-full border-2 border-white/30 relative block">
        {/* Scroll wheel */}
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full block bg-white"
        />
      </span>
    </span>

    <span className="text-[11px] tracking-[0.2em] uppercase text-gray-400 font-light">
      {label}
    </span>
  </motion.button>
);
