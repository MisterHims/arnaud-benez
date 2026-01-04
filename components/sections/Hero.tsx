'use client';

import { useRef } from 'react';
import { useSwiper } from 'swiper/react';
import { useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { Mountains } from './hero/Mountains';

export const Hero = () => {
  const swiper = useSwiper();

  const targetScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  // Smooth dampener (unchanged)
  const smoothScroll = useSpring(targetScroll, { stiffness: 60, damping: 20 });

  const { handleMouseMove, xBack, yBack, xFront, yFront, mouseY } = useMouseParallax();
  const mouseRotateX = useTransform(mouseY, [-0.5, 0.5], [15, -5]);

  // 1. ANIMATION DURATION
  // Keep 1500 to have a slow and majestic rise (~15 steps)
  const animationProgress = useTransform(smoothScroll, [0, 1500], [0, 1], { clamp: true });

  const handleWheel = (e: React.WheelEvent) => {
    // 2. RELEASE THRESHOLD
    // THIS IS THE CHANGE: We utilize the same value as the animation (1500).
    // Result: As soon as the animation finishes (1500px), we stop blocking.
    // No pause, immediate transition.
    const DELTA_SEUIL_TOTAL = 1500;

    const sensitivity = 1;

    if (e.deltaY > 0) {
      // As long as the animation isn't finished...
      if (scrollRef.current < DELTA_SEUIL_TOTAL) {
        e.stopPropagation(); // Block Swiper
        const newValue = Math.min(scrollRef.current + (e.deltaY * sensitivity), DELTA_SEUIL_TOTAL);
        scrollRef.current = newValue;
        targetScroll.set(newValue);
      }
      // Once we are at 1500 or more, we don't enter the IF.
      // 'stopPropagation' is not executed, so Swiper receives the info and changes slide.
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
    <section
      onMouseMove={handleMouseMove}
      onWheelCapture={handleWheel}
      className='relative w-full h-full overflow-hidden flex flex-col items-center justify-center'
    >
      <IdentityBlock />
      <StarryBackground x={xBack} y={yBack} />
      <SkillStars
        x={xFront}
        y={yFront}
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
    </section>
  );
};