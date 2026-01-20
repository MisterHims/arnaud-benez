'use client';

import { useRef } from 'react';
import { useSwiper } from 'swiper/react';
import { useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { Mountains } from './hero/Mountains';
import SectionShell from "../layouts/SectionShell";

export const Hero = () => {
  const swiper = useSwiper();

  const targetScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  const smoothScroll = useSpring(targetScroll, { stiffness: 60, damping: 20 });

  const { handleMouseMove, xFront, yFront, mouseY } = useMouseParallax();

  // --- MODIFICATION 1 : Rotation sensitivity (Mountains) ---
  // Before: [15, -5] (Amplitude of 20 degrees)
  // After: [4, -2] (Amplitude of 6 degrees -> much more subtle)
  const mouseRotateX = useTransform(mouseY, [-0.5, 0.5], [4, -2]);

  // --- MODIFICATION 2 : Movement sensitivity (SkillStars) ---
  // We create new transformed values to reduce movement.
  // Factor 0.25 = Movement is reduced to 25% of its initial speed.
  // You can change 0.25 to whatever you want (0.1 = very slow, 0.9 = fast)
  const dampedXFront = useTransform(xFront, (value) => value * 0.25);
  const dampedYFront = useTransform(yFront, (value) => value * 0.25);

  const animationProgress = useTransform(smoothScroll, [0, 1500], [0, 1], { clamp: true });

  const handleWheel = (e: React.WheelEvent) => {
    const DELTA_SEUIL_TOTAL = 1500;
    const sensitivity = 1;

    if (e.deltaY > 0) {
      if (scrollRef.current < DELTA_SEUIL_TOTAL) {
        e.stopPropagation();
        const newValue = Math.min(scrollRef.current + (e.deltaY * sensitivity), DELTA_SEUIL_TOTAL);
        scrollRef.current = newValue;
        targetScroll.set(newValue);
      }
    }
    else if (e.deltaY < 0) {
      if (scrollRef.current > 0) {
        e.stopPropagation();
        const newValue = Math.max(scrollRef.current + (e.deltaY * sensitivity), 0);
        scrollRef.current = newValue;
        targetScroll.set(newValue);
      }
    }
  };

  return (
    <SectionShell
      onMouseMove={handleMouseMove}
      onWheelCapture={handleWheel}
      className='min-h-screen relative w-full h-full overflow-hidden flex flex-col items-center justify-center'
    >
      <div className="absolute inset-0 z-0">
        <StarryBackground />
      </div>

      <IdentityBlock />

      {/* We pass the "damped" values instead of raw values */}
      <SkillStars
        x={dampedXFront}
        y={dampedYFront}
        onStarClick={() => swiper && swiper.slideNext()}
      />

      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <Mountains
          progress={animationProgress}
          mouseRotateX={mouseRotateX}
        />
      </div>
    </SectionShell>
  );
};