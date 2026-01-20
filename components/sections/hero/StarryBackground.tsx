'use client';

import React, { useEffect, useRef } from 'react';

// Type definitions for TypeScript
interface Star {
  angle: number;
  radius: number;
  speed: number;
  size: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  initialLife: number;
}

export const StarryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    // I reduced the number of stars to "lighten" the background and avoid overload
    const numStars = 250;
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    let animationId: number;
    let lastShootingStarTime = 0;
    const SHOOTING_STAR_COOLDOWN = 10000;

    // 1. Dimension initialization
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // 2. Star creation
    const initStars = () => {
      stars = Array.from({ length: numStars }, () => ({
        angle: Math.random() * Math.PI * 2,
        // We calculate a radius sufficient to cover the corners from the CENTER
        radius: Math.random() * (Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 1.5),
        speed: Math.random() * 0.0001 + 0.00003,
        size: Math.random() * 1.0 + 0.5,
      }));
    };

    // 3. Shooting stars logic (unchanged)
    const spawnShootingStar = () => {
      const now = Date.now();
      if (
        shootingStars.length === 0 &&
        now - lastShootingStarTime >= SHOOTING_STAR_COOLDOWN
      ) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.5,
          y: Math.random() * canvas.height * 0.5,
          vx: 3 + Math.random() * 2,
          vy: 1 + Math.random() * 1.5,
          life: 120,
          initialLife: 140,
        });
        lastShootingStarTime = now;
      }
    };

    // 4. Boucle d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- MAJOR CORRECTION HERE ---
      // Before it was: canvas.width (bottom right corner)
      // Now: We take the CENTER of the screen as pivot
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Radius of the protected zone around the content (in pixels)
      // Adjust this value: 350px creates a nice empty space around your central text
      const safeZoneRadius = 350;

      // B. Drawing orbiting stars
      stars.forEach((star, i) => {
        star.angle += star.speed;

        // Position calculation relative to the CENTER
        const x = centerX + star.radius * Math.cos(star.angle);
        const y = centerY + star.radius * Math.sin(star.angle);

        // --- CENTRAL EXCLUSION LOGIC (Safe Zone) ---
        // We calculate the distance between the star and the exact center
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));

        // Opacity calculation (Fade out)
        // If the star is in the safety zone (< 350px), it becomes transparent
        let zoneOpacity = 1;
        if (distFromCenter < safeZoneRadius) {
          // Creation of a smooth appearance gradient
          // (dist - 100) allows keeping a totally empty zone of 100px at the core
          zoneOpacity = Math.max(0, (distFromCenter - 100) / (safeZoneRadius - 100));
          zoneOpacity = Math.pow(zoneOpacity, 2); // Exponential smoothing
        }

        // If the star is visible, we draw it
        if (zoneOpacity > 0.01) {
          const flicker = (0.4 + Math.abs(Math.sin(Date.now() * 0.0015 + i)) * 0.5) * zoneOpacity;

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${flicker})`;
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // C. Drawing shooting stars
      spawnShootingStar();

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const opacity = s.life / s.initialLife;

        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * 35,
          s.y - s.vy * 35
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 18, s.y - s.vy * 18);
        ctx.stroke();

        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1;

        if (s.life <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};