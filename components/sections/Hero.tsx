'use client';

import { useRef, useEffect, useState } from 'react';
import { useSwiper } from 'swiper/react';
import { useTransform, useSpring, useMotionValue, useMotionValueEvent, motion, animate, useVelocity } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { Mountains } from './hero/Mountains';
import { IntroText } from './hero/IntroText';
import { ScrollIndicator } from './hero/ScrollIndicator';
import SectionShell from "../layouts/SectionShell";

// --- COMPOSANT HERO ---

export const Hero = () => {
  const swiper = useSwiper();
  const targetScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  const isLocked = useRef(false);

  // 1. "JUST RIGHT" PHYSICS (Grand Touring)
  // Stiffness 22: Sharp but smooth start.
  // Damping 32: Controlled braking, no bounce, no infinite slide.
  const smoothScroll = useSpring(targetScroll, { stiffness: 22, damping: 30 });

  const { handleMouseMove, xFront, yFront, mouseY } = useMouseParallax();

  const mouseRotateX = useTransform(mouseY, [-0.5, 0.5], [4, -2]);
  const dampedXFront = useTransform(xFront, (value) => value * 0.25);
  const dampedYFront = useTransform(yFront, (value) => value * 0.25);

  // 2. DISTANCE & CLIPPING
  // We keep 8000px to simulate a large scroll depth.
  // We clip at 7800px to ensure a clean end to the visual animation.
  const animationProgress = useTransform(smoothScroll, [0, 7900], [0, 1], { clamp: true });

  // --- TRANSFORMS (Option C: Aspiration/Warp) ---
  // Scale 1 -> 4 (Zoom very strong), Blur 0 -> 20px (Speed), Opacity 1 -> 0
  // Active between 0 and 15% of scroll
  const introOpacity = useTransform(animationProgress, [0, 0.15], [1, 0]);
  const introScale = useTransform(animationProgress, [0, 0.15], [1, 4]);
  const introBlur = useTransform(animationProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);
  const scrollIndicatorOpacity = useTransform(animationProgress, [0, 0.05], [1, 0]);

  const delayedOpacity = useMotionValue(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(delayedOpacity, 1, { duration: 1 });
    }, 6000);
    return () => clearTimeout(timer);
  }, [delayedOpacity]);

  const combinedScrollIndicatorOpacity = useTransform(
    [delayedOpacity, scrollIndicatorOpacity],
    (values: number[]) => {
      const d = values[0];
      const s = values[1];
      return d * s;
    }
  );

  // 3. GIANT AMPLITUDE (400vh)
  // - Start (0.15): 400vh (Very deep).
  // - Approach (0.90): 15vh (Visible slowdown).
  // - Arrival (1.0): 0vh (Landed).
  // Starting from 400vh will create a huge sense of speed in the middle,
  // giving the impression that the "window" traveled is gigantic.
  const contentY = useTransform(
    animationProgress,
    [0, 0.45, 0.92, 0.99],
    ['250vh', '100vh', '0vh', '-6vh']
  );

  const contentOpacity = useTransform(animationProgress, [0.15, 0.25], [0, 1]);
  const skillStarsOpacity = useTransform(animationProgress, [0.85, 0.95], [0, 1]);

  const [isIntroVisible, setIsIntroVisible] = useState(true);
  useMotionValueEvent(animationProgress, 'change', (v) => {
    setIsIntroVisible(v < 0.1);
  });

  // --- KEYBOARD HANDLER ---
  useEffect(() => {
    const DELTA_SEUIL_TOTAL = 8000;
    const TRIGGER_THRESHOLD = 200;
    const sensitivity = 1.5;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow down key
      if (e.key === 'ArrowDown') {
        // If we haven't finished scrolling in Hero, simulate scroll down
        if (scrollRef.current < DELTA_SEUIL_TOTAL && !isLocked.current) {
          e.preventDefault();
          e.stopImmediatePropagation();

          // Simulate a larger scroll to navigate faster between parts
          const simulatedDeltaY = 800 * sensitivity; // Increased from 100 to 800 for faster navigation
          let newValue = scrollRef.current + simulatedDeltaY;

          if (newValue > TRIGGER_THRESHOLD) {
            newValue = DELTA_SEUIL_TOTAL;
            isLocked.current = true;
            setTimeout(() => { isLocked.current = false; }, 3000);
          }

          newValue = Math.min(newValue, DELTA_SEUIL_TOTAL);
          scrollRef.current = newValue;
          targetScroll.set(newValue);
        }
        // If scroll is complete, let Swiper handle the navigation
        return;
      }

      // Handle arrow up key
      if (e.key === 'ArrowUp') {
        // If we're in the second part of Hero (scroll > 0), scroll up in Hero
        if (scrollRef.current > 0 && !isLocked.current) {
          e.preventDefault();
          e.stopImmediatePropagation();

          // Simulate a larger scroll to navigate faster between parts
          const simulatedDeltaY = -800 * sensitivity; // Increased from 100 to 800 for faster navigation
          let newValue = scrollRef.current + simulatedDeltaY;

          // If we go back before the threshold, reset to 0
          if (newValue < DELTA_SEUIL_TOTAL - TRIGGER_THRESHOLD) {
            newValue = 0;
          }

          newValue = Math.max(newValue, 0);
          scrollRef.current = newValue;
          targetScroll.set(newValue);
        }
        // If we're at the beginning, let Swiper handle the navigation
        return;
      }
    };

    // Use capture phase to intercept before Swiper
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [targetScroll]);

  const handleScrollClick = () => {
    const DELTA_SEUIL_TOTAL = 8000;
    
    if (scrollRef.current < DELTA_SEUIL_TOTAL && !isLocked.current) {
      const newValue = DELTA_SEUIL_TOTAL;
      isLocked.current = true;
      setTimeout(() => { isLocked.current = false; }, 3000);
      
      scrollRef.current = newValue;
      targetScroll.set(newValue);
    }
  };

  // --- HANDLER ---

  const handleWheel = (e: React.WheelEvent) => {
    if (isLocked.current) {
      e.stopPropagation();
      return;
    }

    const DELTA_SEUIL_TOTAL = 8000;
    const TRIGGER_THRESHOLD = 200;
    const sensitivity = 1.5;

    if (e.deltaY > 0) {
      if (scrollRef.current < DELTA_SEUIL_TOTAL) {
        e.stopPropagation();

        let newValue = scrollRef.current + (e.deltaY * sensitivity);

        if (newValue > TRIGGER_THRESHOLD) {
          newValue = DELTA_SEUIL_TOTAL;
          isLocked.current = true;

          // BALANCED TIMING
          // 3 seconds: The perfect time to travel 400vh with this physics.
          setTimeout(() => { isLocked.current = false; }, 3000);
        }

        newValue = Math.min(newValue, DELTA_SEUIL_TOTAL);
        scrollRef.current = newValue;
        targetScroll.set(newValue);
      }
    }
    else if (e.deltaY < 0) {
      if (scrollRef.current > 0) {
        e.stopPropagation();
        let newValue = scrollRef.current + (e.deltaY * sensitivity);
        if (newValue < DELTA_SEUIL_TOTAL - TRIGGER_THRESHOLD) newValue = 0;
        newValue = Math.max(newValue, 0);
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
      {/* 1. StarryBackground en arrière-plan (z-0) */}
      <div className="absolute inset-0 z-0">
        <StarryBackground scrollProgress={animationProgress} />
      </div>

      {/* 2. Mountains au premier plan (z-10) — au-dessus des étoiles */}
      <div
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <Mountains
          progress={animationProgress}
          mouseRotateX={mouseRotateX}
        />
      </div>

      <IntroText
        opacity={introOpacity}
        scale={introScale}
        filter={introBlur}
        isVisible={isIntroVisible}
      />

      <ScrollIndicator opacity={combinedScrollIndicatorOpacity} onClick={handleScrollClick} />

      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY
        }}
        className="relative w-full h-full z-10 flex flex-col items-center justify-center"
      >
        <IdentityBlock />
        
        <SkillStars
          x={dampedXFront}
          y={dampedYFront}
          opacity={skillStarsOpacity}
          onStarClick={() => swiper && swiper.slideNext()}
        />
      </motion.div>

    </SectionShell>
  );
};