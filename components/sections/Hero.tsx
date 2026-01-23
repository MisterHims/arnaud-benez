'use client';

import { useRef, useEffect } from 'react';
import { useSwiper } from 'swiper/react';
import { useTransform, useSpring, useMotionValue, motion, MotionValue } from 'framer-motion';
import { useMouseParallax } from '@/hooks/useMouseParallax';

import { IdentityBlock } from './hero/IdentityBlock';
import { StarryBackground } from './hero/StarryBackground';
import { SkillStars } from './hero/SkillStars';
import { Mountains } from './hero/Mountains';
import SectionShell from "../layouts/SectionShell";

// --- SUB-COMPONENTS ---

const ScrollIndicator = ({ opacity }: { opacity: MotionValue<number> }) => (
  <motion.div
    style={{ opacity }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-none"
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

const IntroText = ({ opacity, scale, filter }: { opacity: MotionValue<number>, scale: MotionValue<number>, filter: MotionValue<string> }) => {
  return (
    <motion.div
      style={{ opacity, scale, filter }}
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      <div className="relative text-center px-4">
        {/* Subtle glow effect */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            transform: 'scale(1.8)',
          }}
        />
        
        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-[0.2em] md:tracking-[0.2635em] uppercase text-center relative z-10">
          {/* First line: "Designing Universe" */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: 1, 
              y: [15, 0, -3],
            }}
            transition={{
              opacity: {
                delay: 0,
                duration: 2,
                ease: [0.4, 0, 0.2, 1], // Slow start for gentle fade-in
              },
              y: {
                delay: 0,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.5, 1],
              },
            }}
            className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            Designing Universe
          </motion.span>
          
          {/* Second line: "Designing experiences that make sense." - follows like a thought */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: 1, 
              y: [12, 0, -2],
            }}
            transition={{
              opacity: {
                delay: 0.8,
                duration: 2.5,
                ease: [0.4, 0, 0.2, 1], // Slow start for gentle fade-in
              },
              y: {
                delay: 0.8,
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.85, 1],
              },
            }}
            className="block mt-2 md:mt-3 text-xl md:text-3xl lg:text-4xl tracking-[0.15em] md:tracking-[0.2em] font-extralight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            style={{ textTransform: 'none' }}
          >
            Designing experiences that make sense.
          </motion.span>
        </h1>
      </div>
    </motion.div>
  );
};

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

  // --- TRANSFORMS ---

  const introOpacity = useTransform(animationProgress, [0, 0.1], [1, 0]);
  const introScale = useTransform(animationProgress, [0, 0.1], [1, 1.2]);
  const introBlur = useTransform(animationProgress, [0, 0.1], ["blur(0px)", "blur(10px)"]);
  const scrollIndicatorOpacity = useTransform(animationProgress, [0, 0.05], [1, 0]);

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
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        <Mountains
          progress={animationProgress}
          mouseRotateX={mouseRotateX}
        />
      </div>
      
      <div className="absolute inset-0 z-0">
        <StarryBackground scrollProgress={animationProgress} />
      </div>

      <IntroText
        opacity={introOpacity}
        scale={introScale}
        filter={introBlur}
      />

      <ScrollIndicator opacity={scrollIndicatorOpacity} />

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