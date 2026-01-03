"use client";

import { useRef } from "react"; // 👈 On a besoin de useRef pour piloter le scroll
import { Button } from "@heroui/react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Home() {
  // On crée une référence vers le conteneur principal pour pouvoir le scroller
  const mainRef = useRef<HTMLElement>(null);

  // Fonction personnalisée pour gérer la vitesse et l'animation
  const scrollToSection = (sectionId: string) => {
    const container = mainRef.current;
    const target = document.getElementById(sectionId);
    if (!container || !target) return;

    const start = container.scrollTop;
    const distance = target.offsetTop - start;
    const duration = 1200; // ⏱️ VITESSE : 1200ms = 1.2 secondes (Modifiez ici)

    let startTime: number | null = null;

    // Fonction d'animation (Easing: easeInOutCubic)
    // Cela fait démarrer doucement, accélérer au milieu, et freiner à la fin
    const ease = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // On déplace le scroll manuellement à chaque image
      container.scrollTop = start + (distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    // 👇 On ajoute ref={mainRef} ici
    <main
      ref={mainRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-background text-foreground"
    // Note : J'ai retiré 'scroll-smooth' du CSS car notre fonction JS s'en occupe mieux
    >

      <div className="fixed top-6 right-6 z-50">
        <ThemeSwitcher />
      </div>

      {/* --- ÉCRAN 1 : HERO --- */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center relative p-6">

        <div className="text-center max-w-2xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Arnaud Benez
          </h1>
          <h2 className="text-xl md:text-2xl text-default-500 font-medium">
            Développeur Fullstack & UI Designer
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            {/* On appelle notre nouvelle fonction au clic */}
            <Button variant="primary" size="lg" onPress={() => scrollToSection("section-2")}>
              🚀 Voir mes projets
            </Button>

            <Button variant="secondary" size="lg">
              👋 Me contacter
            </Button>
          </div>
        </div>

        {/* Indicateur de scroll (Emoji animé) */}
        <div
          className="absolute bottom-10 animate-bounce cursor-pointer"
          onClick={() => scrollToSection("section-2")}
        >
          <span className="text-4xl">⬇️</span>
        </div>
      </section>

      {/* --- ÉCRAN 2 --- */}
      <section id="section-2" className="h-screen w-full snap-start flex flex-col items-center justify-center bg-content1 p-6">
        <div className="max-w-5xl w-full space-y-10">

          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold">À propos & Stack</h2>
            <p className="text-default-500">
              Navigation fluide customisée (1.2 secondes)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-background shadow-sm border border-default-100 flex flex-col items-center text-center gap-4 hover:scale-105 transition-transform">
              <span className="text-4xl">💻</span>
              <h3 className="text-xl font-bold">Frontend</h3>
              <p className="text-default-500">React, Next.js, HeroUI</p>
            </div>

            <div className="p-8 rounded-2xl bg-background shadow-sm border border-default-100 flex flex-col items-center text-center gap-4 hover:scale-105 transition-transform">
              <span className="text-4xl">⚙️</span>
              <h3 className="text-xl font-bold">Backend</h3>
              <p className="text-default-500">Node.js, PostgreSQL</p>
            </div>

            <div className="p-8 rounded-2xl bg-background shadow-sm border border-default-100 flex flex-col items-center text-center gap-4 hover:scale-105 transition-transform">
              <span className="text-4xl">🎨</span>
              <h3 className="text-xl font-bold">Design</h3>
              <p className="text-default-500">Figma, Tailwind</p>
            </div>
          </div>

          {/* Bouton pour remonter */}
          <div className="flex justify-center mt-8">
            <Button variant="ghost" onPress={() => scrollToSection("section-1")}>
              Remonter ⬆️
            </Button>
          </div>

        </div>
      </section>

      {/* J'ai ajouté un ID caché ici pour que le bouton "Remonter" fonctionne si besoin d'identifier le haut */}
      <div id="section-1" className="absolute top-0" />

    </main>
  );
}