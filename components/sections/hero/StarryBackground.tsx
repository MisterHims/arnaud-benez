'use client';

import { motion, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  const [stars, setStars] = useState<Star[]>([]);

  // Génération des étoiles côté client uniquement pour éviter les erreurs d'hydratation Next.js
  useEffect(() => {
    const generatedStars = [...Array(50)].map((_, i) => ({
      id: i,
      width: Math.random() * 2 + 1 + 'px',
      height: Math.random() * 2 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 3 + 2 + 's',
    }));
    setStars(generatedStars);
  }, []);

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