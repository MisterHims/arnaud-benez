'use client';

import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

interface ScrollIndicatorProps {
  onClick: () => void;
  isVisible: boolean;
  label: string;
  /** Label on touch screens (no mouse to scroll with); defaults to label */
  touchLabel?: string;
  ariaLabel: string;
  opacity?: MotionValue<number>;
  /** Positioning classes (defaults to the bottom of the screen). */
  className?: string;
}

/**
 * Animated mouse + label inviting to scroll down. On touch screens (coarse
 * pointer, CSS only: no flash on load) a swiping finger and its own label.
 */
export const ScrollIndicator = ({
  onClick,
  isVisible,
  label,
  touchLabel,
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
    {/* Touch screens: a finger swiping up */}
    <motion.span
      aria-hidden="true"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
      className="hidden pointer-coarse:flex items-center justify-center h-10 text-white/85"
    >
      <Icon name="SwipeUp" size={32} />
    </motion.span>

    <span className="flex pointer-coarse:hidden items-center justify-center">
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
      <span className="pointer-coarse:hidden">{label}</span>
      <span className="hidden pointer-coarse:inline">{touchLabel ?? label}</span>
    </span>
  </motion.button>
);
