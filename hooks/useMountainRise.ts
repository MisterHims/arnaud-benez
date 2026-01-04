'use client';
import { useScroll, useTransform, cubicBezier } from 'framer-motion';
import { RefObject } from 'react';

export const useMountainRise = (containerRef: RefObject<HTMLElement | null>) => {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const rotateXMountains = useTransform(
    scrollYProgress, 
    [0, 0.4], 
    [90, 0], 
    { ease: cubicBezier(0.17, 0.67, 0.83, 0.67) } // Correction Easing
  );
  
  const opacityMountains = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scaleMountains = useTransform(scrollYProgress, [0, 0.4], [1.5, 1]);

  return { rotateXMountains, opacityMountains, scaleMountains };
};