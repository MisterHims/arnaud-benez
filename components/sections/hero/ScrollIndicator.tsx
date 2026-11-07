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
  /** 'light' for dark backgrounds (sky), 'dark' for light ones (snow). */
  tone?: 'light' | 'dark';
}

/** Animated mouse + label inviting to scroll down. */
export const ScrollIndicator = ({
  onClick,
  isVisible,
  label,
  ariaLabel,
  opacity,
  className = 'bottom-10',
  tone = 'light',
}: ScrollIndicatorProps) => (
  <motion.button
    type="button"
    style={opacity ? { opacity } : undefined}
    onClick={onClick}
    tabIndex={isVisible ? 0 : -1}
    aria-hidden={!isVisible}
    aria-label={ariaLabel}
    className={cn(
      'absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-30 cursor-pointer',
      tone === 'dark' ? 'gap-2' : 'gap-4',
      !isVisible && 'pointer-events-none',
      className
    )}
  >
    {/* On the snow (dark tone), the mouse sits on a dark translucent disc:
        an anchor point that stands out, and the same white mouse as on the
        sky */}
    <span
      className={cn(
        'flex items-center justify-center',
        tone === 'dark' && 'size-14 rounded-full bg-black/70'
      )}
    >
      {/* Mouse body */}
      <span className={cn('w-6 h-10 rounded-full border-2 relative block', tone === 'dark' ? 'border-white/50' : 'border-white/30')}>
        {/* Scroll wheel */}
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full block bg-white"
        />
      </span>
    </span>

    <span
      className={cn(
        'text-[11px] tracking-[0.2em] uppercase',
        tone === 'light' ? 'text-gray-400 font-light' : 'text-neutral-700 font-medium'
      )}
    >
      {label}
    </span>
  </motion.button>
);
