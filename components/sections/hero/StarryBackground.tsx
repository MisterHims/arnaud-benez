'use client';

import { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

/** Ship state along the journey, all driven by the hero's scroll progress. */
export interface JourneyCamera {
  /** Warp speed, 0 (floating in space) to 1 (full hyperspace). */
  speed: MotionValue<number>;
  /** Flight direction in degrees: 0 = straight ahead, 90 = descending. */
  pitch: MotionValue<number>;
}

interface StarryBackgroundProps {
  camera: JourneyCamera;
  reducedMotion?: boolean;
}

interface Star {
  x: number; // horizontal position in "space"
  y: number; // vertical position in "space"
  z: number; // depth: 1 = far away, ~0 = right in front of the viewer
  size: number;
  baseAlpha: number;
  phase: number; // twinkle offset
  age: number;   // seconds since (re)birth, for the fade-in
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number; life: number; initialLife: number;
}

// --- CONFIGURATION ---
const NUM_STARS = 550;
const IDLE_SPEED = 0.006;   // space units / second when floating
const WARP_SPEED = 1.4;     // extra space units / second at full warp
const TRAIL = 0.14;         // streak length (space units) at full warp
const SMOOTHING = 4;        // higher = camera reacts faster to scroll changes
const SHOOTING_STAR_COOLDOWN = 20000;
const FADE_IN = 0.8;        // seconds for a newborn star to reach full brightness

const randomStar = (z = Math.random() * 0.95 + 0.05): Star => ({
  x: Math.random() * 2 - 1,
  y: Math.random() * 2 - 1,
  z,
  size: Math.random() * 1.0 + 0.5,
  baseAlpha: Math.random() * 0.5 + 0.5,
  phase: Math.random() * Math.PI * 2,
  age: FADE_IN,
});

export const StarryBackground = ({ camera, reducedMotion = false }: StarryBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Latest motion values, read every frame without re-running the effect
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let lastTime = 0;
    let lastShootingStarTime = 0;
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => randomStar());
    const shootingStars: ShootingStar[] = [];

    // Smoothed camera, eased toward the scroll-driven targets
    const cam0 = cameraRef.current;
    const smooth = {
      speed: 0,
      pitch: reducedMotion ? 0 : cam0.pitch.get(),
    };

    // Rebirth far away, somewhere on screen (never off screen: off-screen
    // newborns used to pile up at the bottom once the ship turned downward)
    const respawn = (star: Star) => {
      const z = Math.random() * 0.3 + 0.7;
      const scale = Math.max(width, height) * 0.5;
      Object.assign(star, randomStar(z), {
        x: ((Math.random() - 0.5) * width / scale) * z,
        y: ((Math.random() - 0.5) * height / scale) * z,
        age: 0,
      });
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    const spawnShootingStar = (now: number) => {
      if (shootingStars.length === 0 && now - lastShootingStarTime >= SHOOTING_STAR_COOLDOWN) {
        shootingStars.push({
          x: Math.random() * width * 0.5,
          y: Math.random() * height * 0.5,
          vx: 3 + Math.random() * 2,
          vy: 1 + Math.random() * 1.5,
          life: 120,
          initialLife: 140,
        });
        lastShootingStarTime = now;
      }
    };

    const animate = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;

      // --- CAMERA ---
      const cam = cameraRef.current;
      const k = Math.min(1, dt * SMOOTHING);
      smooth.speed += ((reducedMotion ? 0 : cam.speed.get()) - smooth.speed) * k;
      smooth.pitch += ((reducedMotion ? 0 : cam.pitch.get()) - smooth.pitch) * k;

      const s = smooth.speed;
      const vpx = width / 2;
      const vpy = height / 2;
      const scale = Math.max(width, height) * 0.5;

      // Flight direction: forward (z) blending into a vertical descent (y)
      const pitchRad = (smooth.pitch * Math.PI) / 180;
      const forward = Math.cos(pitchRad);
      const down = Math.sin(pitchRad);
      const isWarping = s > 0.02;

      const project = (x: number, y: number, z: number) => ({
        sx: vpx + (x / z) * scale,
        sy: vpy + (y / z) * scale,
      });
      // Inverse projection: space coordinate that lands on a given screen pixel
      const unprojectX = (sx: number, z: number) => ((sx - vpx) / scale) * z;
      const unprojectY = (sy: number, z: number) => ((sy - vpy) / scale) * z;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // --- STARS ---
      const travel = ((reducedMotion ? 0 : IDLE_SPEED) + s * WARP_SPEED) * dt;
      // Twinkle fades out in hyperspace, and comes back during the landing
      const twinkleMix = Math.min(1, s * 10) * forward;
      const margin = 50;

      for (const star of stars) {
        // The ship moves forward and/or down: stars come closer and/or rise.
        // The rise uses a mild, capped parallax (near stars at most 2× faster
        // than far ones) so the descent feels deep without stars whizzing past.
        const rise = star.z * (1 + (1 - star.z));
        star.z -= travel * forward;
        star.y -= travel * down * rise;
        star.age += dt;

        let { sx, sy } = project(star.x, star.y, star.z);
        const offScreen = sx < -margin || sx > width + margin || sy < -margin || sy > height + margin;

        if (star.z <= 0.02) {
          respawn(star);
        } else if (sy < -margin && Math.random() < down ** 8) {
          // Descending: a star leaving through the top re-enters from the
          // bottom. While the ship is still turning, stars stream out of the
          // top far faster than room frees up at the bottom: only part of them
          // wrap (the more vertical the flight, the more), the others are
          // reborn far away, so the sky stays evenly spread after landing.
          star.y = unprojectY(height + margin * Math.random(), star.z);
          star.x = unprojectX(Math.random() * width, star.z);
        } else if (offScreen) {
          // Recycle far away so the field never empties
          respawn(star);
        }
        ({ sx, sy } = project(star.x, star.y, star.z));

        const nearness = 1 - star.z; // 0 = far, 1 = close
        const twinkle = 0.55 + 0.45 * Math.abs(Math.sin(time * 0.0015 + star.phase));
        const brightness = twinkle * (1 - twinkleMix) + twinkleMix;
        // Newborn stars fade in instead of popping (hidden by streaks in warp)
        const fadeIn = isWarping ? 1 : Math.min(1, star.age / FADE_IN);
        const alpha = star.baseAlpha * brightness * Math.min(1, 0.25 + nearness * 1.2) * fadeIn;
        const radius = star.size * (0.5 + nearness * 1.3);

        if (alpha < 0.01) continue;

        if (isWarping) {
          // Streak from where the star was a moment ago to where it is now
          const trail = TRAIL * s;
          const tail = project(star.x, star.y + trail * down * rise, Math.min(1, star.z + trail * forward));
          const grad = ctx.createLinearGradient(tail.sx, tail.sy, sx, sy);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = radius * 1.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tail.sx, tail.sy);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- SHOOTING STARS (only when floating) ---
      if (isWarping || reducedMotion) {
        shootingStars.length = 0;
      } else {
        spawnShootingStar(Date.now());
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        const opacity = st.life / st.initialLife;
        const grad = ctx.createLinearGradient(st.x, st.y, st.x - st.vx * 35, st.y - st.vy * 35);
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * 18, st.y - st.vy * 18);
        ctx.stroke();
        st.x += st.vx;
        st.y += st.vy;
        st.life -= 1;
        if (st.life <= 0) shootingStars.splice(i, 1);
      }

      animationId = requestAnimationFrame(animate);
    };

    // Only animate while the sky is on screen: no wasted CPU/battery while
    // the visitor reads the rest of the site
    const start = () => {
      if (animationId) return;
      lastTime = 0; // resume without a time jump
      animationId = requestAnimationFrame(animate);
    };
    const stop = () => {
      cancelAnimationFrame(animationId);
      animationId = 0;
    };
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });

    resizeCanvas();
    start();
    visibility.observe(canvas);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      visibility.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      stop();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};
