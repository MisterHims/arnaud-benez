'use client';

import React, { useEffect, useRef } from 'react';
import { MotionValue } from 'framer-motion';

interface StarryBackgroundProps {
  scrollProgress: MotionValue<number>;
}

interface Star {
  angle: number;
  radius: number;
  orbitalSpeed: number;
  x: number;
  y: number;
  warpSpeed: number;
  size: number;
  baseAlpha: number;
}

interface ShootingStar {
  x: number; y: number; vx: number; vy: number; life: number; initialLife: number;
}

export const StarryBackground = ({ scrollProgress }: StarryBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on('change', (latestValue) => {
      progressRef.current = latestValue;
    });
    return () => unsubscribe();
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    const numStars = 250;
    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    let animationId: number;
    let lastShootingStarTime = 0;
    const SHOOTING_STAR_COOLDOWN = 20000;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars = Array.from({ length: numStars }, () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 1.5);
        const size = Math.random() * 1.0 + 0.5;

        return {
          angle,
          radius,
          orbitalSpeed: Math.random() * 0.0001 + 0.00003,
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
          size,
          warpSpeed: 2 + (size * 4),
          baseAlpha: Math.random() * 0.5 + 0.5
        };
      });
    };

    const spawnShootingStar = () => {
      const now = Date.now();
      if (shootingStars.length === 0 && now - lastShootingStarTime >= SHOOTING_STAR_COOLDOWN) {
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const progress = progressRef.current;
      
      // --- NOUVELLE LOGIQUE BASÉE SUR LA VITESSE ---
      const delta = progress - lastProgressRef.current;
      lastProgressRef.current = progress;

      // DIRECTION
      // Retour à la logique standard (physique)
      // Scroll Down (delta > 0) -> direction = 1 -> Étoiles montent (y diminue)
      // Scroll Up (delta < 0) -> direction = -1 -> Étoiles descendent (y augmente)
      const direction = Math.sign(delta); 
      
      // INTENSITÉ
      let warpFactor = Math.abs(delta) * 40;
      warpFactor = Math.min(warpFactor, 20);

      const isMoving = warpFactor > 0.01; 

      stars.forEach((star) => {
        if (isMoving) {
          // --- MODE WARP (PHYSIQUE CHUTE) ---
          // RETOUR AU SENS "MONTÉE" POUR SIMULER LA CHUTE
          // Scroll Down (dir=1) -> Étoiles montent (y diminue).
          // C'est le seul moyen de donner l'impression de descendre.
          star.y -= star.warpSpeed * warpFactor * 15 * direction;

          if (direction > 0) {
             // Monte -> Reset en bas si < 0
             if (star.y < 0) {
               star.y = canvas.height + 10;
               star.x = Math.random() * canvas.width;
             }
          } else {
             // Descend -> Reset en haut si > height
             if (star.y > canvas.height) {
               star.y = -10;
               star.x = Math.random() * canvas.width;
             }
          }

          const dx = star.x - centerX;
          const dy = star.y - centerY;
          star.radius = Math.sqrt(dx * dx + dy * dy);
          star.angle = Math.atan2(dy, dx);

        } else {
          // --- MODE ORBITE ---
          star.angle += star.orbitalSpeed;
          star.x = centerX + star.radius * Math.cos(star.angle);
          star.y = centerY + star.radius * Math.sin(star.angle);
        }

        // --- SCINTILLEMENT ---
        const stability = Math.min(1, warpFactor * 25);
        const sineWave = 0.4 + Math.abs(Math.sin(Date.now() * 0.0015 + star.x)) * 0.5;
        const brightness = (1 * stability) + (sineWave * (1 - stability));
        const finalAlpha = star.baseAlpha * brightness;

        // --- RENDU ---
        if (finalAlpha > 0.01) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          if (warpFactor > 0.02) {
            // Traînée opposée au mouvement
            // Si on monte (y diminue), traînée vers le bas (positif) -> direction
            const trailLength = star.warpSpeed * warpFactor * 5 * direction;

            ctx.beginPath();
            const grad = ctx.createLinearGradient(star.x, star.y, star.x, star.y + trailLength);
            grad.addColorStop(0, `rgba(255, 255, 255, ${finalAlpha})`);
            grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = star.size * 1.5;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x, star.y + trailLength);
            ctx.stroke();
          }
        }
      });

      // --- ÉTOILES FILANTES ---
      if (!isMoving) {
        spawnShootingStar();
      } else {
        shootingStars.length = 0;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const opacity = s.life / s.initialLife;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 35, s.y - s.vy * 35);
        grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 18, s.y - s.vy * 18); ctx.stroke();
        s.x += s.vx; s.y += s.vy; s.life -= 1;
        if (s.life <= 0) shootingStars.splice(i, 1);
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
