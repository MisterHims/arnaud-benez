'use client';

import { useRef, useState, useEffect } from 'react';
import { useTransform, useMotionValue, useMotionValueEvent, motion, useScroll } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { IntroText } from './hero/IntroText';
import { ScrollIndicator } from './hero/ScrollIndicator';
import SectionShell from "../layouts/SectionShell";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Remplacement de la simulation Swiper par le scroll natif Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const animationProgress = scrollYProgress;

  const { handleMouseMove, xFront, yFront, mouseY } = useMouseParallax();

  const mouseRotateX = useTransform(mouseY, [-0.5, 0.5], [4, -2]);
  const dampedXFront = useTransform(xFront, (value) => value * 0.25);
  const dampedYFront = useTransform(yFront, (value) => value * 0.25);

  // --- TRANSFORMS ---

  // PHASE 1: INTRO (0% - 20%)
  const introOpacity = useTransform(animationProgress, [0, 0.15], [1, 0]);
  const introScale = useTransform(animationProgress, [0, 0.15], [1, 4]);
  const introBlur = useTransform(animationProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);

  const scrollIndicatorOpacity = useTransform(animationProgress, [0, 0.05], [1, 0]);
  const delayedOpacity = useMotionValue(1);
  const combinedScrollIndicatorOpacity = useTransform(
    [delayedOpacity, scrollIndicatorOpacity],
    (values: number[]) => values[0] * values[1]
  );

  const [isIntroVisible, setIsIntroVisible] = useState(true);
  useMotionValueEvent(animationProgress, 'change', (v) => {
    setIsIntroVisible(v < 0.1);
  });

  // IDENTITY APPEARANCE STATE (Timer Based)
  const [showIdentity, setShowIdentity] = useState(false);
  const skillStarsOpacity = useMotionValue(0);

  useEffect(() => {
    if (showIdentity) {
      skillStarsOpacity.set(1);
    } else {
      skillStarsOpacity.set(0);
    }
  }, [showIdentity]);

  // WARP TRIGGER (Bi-directional Auto-Scroll)
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const triggerScroll = (from: number, to: number) => {
      isAutoScrolling.current = true;
      const distance = to - from;
      const duration = 5000;
      let startTime: number | null = null;

      // TIMED APPEARANCE LOGIC
      if (to > from) {
        // Scrolling DOWN -> Show Identity LATE
        // 4000ms delay ensures it appears only at the very end of the deceleration
        setTimeout(() => setShowIdentity(true), 4000);
      } else {
        // Scrolling UP -> Hide Identity IMMEDIATELY
        setShowIdentity(false);
      }

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Modified Easing: SEPTIC (Ease-In-Out Septic - Power 7)
        // Extremely slow start and end.
        const run = progress < 0.5 
          ? 64 * Math.pow(progress, 7) 
          : 1 - Math.pow(-2 * progress + 2, 7) / 2;

        window.scrollTo(0, from + distance * run);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          isAutoScrolling.current = false;
        }
      };
      requestAnimationFrame(animation);
    };

    const handleWheel = (e: WheelEvent) => {
      // 1. If currently animating, block EVERYTHING.
      if (isAutoScrolling.current) {
        e.preventDefault();
        return;
      }

      const currentScroll = window.scrollY;
      // Target adjusted to 14.08 to show mountains LESS prominently
      const targetScroll = window.innerHeight * 14.08;
      const threshold = 100; // Tolerance zone at ends

      // --- SCROLL DOWN TRIGGER (From Intro to Identity) ---
      // Condition: At Top AND Scrolling Down
      if (currentScroll < threshold && e.deltaY > 0) {
        e.preventDefault();
        triggerScroll(currentScroll, targetScroll);
      }

      // --- SCROLL UP TRIGGER (From Identity to Intro) ---
      // Condition: At Bottom (Identity Zone) AND Scrolling Up
      else if (currentScroll > targetScroll - threshold && currentScroll < targetScroll + threshold && e.deltaY < 0) {
        e.preventDefault();
        triggerScroll(currentScroll, 0);
      }

      // --- NO MAN'S LAND PROTECTION (Middle Zone) ---
      // If user is stuck in the middle, force them to the nearest end.
      else if (currentScroll > threshold && currentScroll < targetScroll - threshold) {
        e.preventDefault();
        if (e.deltaY > 0) {
          triggerScroll(currentScroll, targetScroll); // Continue Down
        } else {
          triggerScroll(currentScroll, 0); // Go Back Up
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div ref={containerRef} className="h-[1500vh] w-full relative bg-black">
      <SectionShell
        onMouseMove={handleMouseMove}
        className='w-full h-screen overflow-hidden flex flex-col items-center justify-center sticky top-0 bg-black'
      >
        {/* 1. StarryBackground */}
        <div className="absolute inset-0 z-0">
          <StarryBackground scrollProgress={animationProgress} />
        </div>


        <IntroText
          opacity={introOpacity}
          scale={introScale}
          filter={introBlur}
          isVisible={isIntroVisible}
        />

        <ScrollIndicator opacity={combinedScrollIndicatorOpacity} onClick={() => { }} />

        <motion.div
          initial={{ opacity: 0, y: '20vh' }}
          animate={{ 
            opacity: showIdentity ? 1 : 0,
            y: showIdentity ? '10vh' : '20vh'
          }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="relative w-full h-full z-10 flex flex-col items-center justify-center"
        >
          <IdentityBlock />

          <SkillStars
            x={dampedXFront}
            y={dampedYFront}
            // Use manual MotionValue to trigger the internal animation logic of SkillStars
            opacity={skillStarsOpacity}
            onStarClick={() => { }}
          />
        </motion.div>

      </SectionShell>
    </div>
  );
};
