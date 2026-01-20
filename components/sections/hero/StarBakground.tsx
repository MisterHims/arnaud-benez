'use client';

import { motion, MotionValue } from 'framer-motion';
import { useState } from 'react';

interface StarryBackgroundProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

interface Star {
  id: number;
  width: string;
  height: string;
  top: string;
  left: string;
  animationDuration: string;
}

export const StarryBackground = ({ x, y }: StarryBackgroundProps) => {
  // Star generation on client side only to avoid Next.js hydration errors
  // Lazy initialization checks if we're on client side before generating random values
  const [stars] = useState<Star[]>(() => {
    // Returns an empty array on server side to avoid hydration differences
    if (typeof window === 'undefined') {
      return [];
    }
    return [...Array(50)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 3 + 2 + 's',
    }));
  });

  return (
    <motion.div style={{ x, y }} className='absolute inset-0 z-0'>
      {stars.map((star) => (
        <div
          key={star.id}
          className='absolute bg-white rounded-full opacity-40 animate-pulse'
          style={{
            width: star.width,
            height: star.height,
            top: star.top,
            left: star.left,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
    </motion.div>
  );
};