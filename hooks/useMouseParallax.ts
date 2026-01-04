'use client';

import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

export const useMouseParallax = () => {
  // 1. Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Physics (Spring) - Soft and fluid
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // 3. Transformations (Standard Parallax)
  const xBack = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const yBack = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const xFront = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const yFront = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);

  // 4. Handler
  const handleMouseMove = (e: MouseEvent) => {
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX / width) - 0.5;
    const y = (e.clientY / height) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // IMPORTANT: We also return raw or smoothed mouseX and mouseY
  return { 
    handleMouseMove, 
    xBack, yBack, 
    xFront, yFront,
    mouseX: smoothX, // We return the smoothed version directly
    mouseY: smoothY 
  };
};