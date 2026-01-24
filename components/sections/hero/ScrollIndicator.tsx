'use client';

import { motion, MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  opacity: MotionValue<number>;
  onClick: () => void;
}

export const ScrollIndicator = ({ opacity, onClick }: ScrollIndicatorProps) => (
  <motion.div
    style={{ opacity }}
    onClick={onClick}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-auto cursor-pointer"
  >
    {/* Mouse Icon */}
    <div className="relative">
      {/* Mouse body */}
      <div className="w-6 h-10 rounded-full border-2 border-white/30 bg-transparent relative">
        {/* Scroll wheel with animation */}
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 0.3
          }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-white rounded-full"
        />
      </div>
    </div>
    
    {/* SCROLL DOWN text */}
    <span className="text-[11px] text-gray-400 tracking-[0.2em] uppercase font-light">
      SCROLL DOWN
    </span>
  </motion.div>
);