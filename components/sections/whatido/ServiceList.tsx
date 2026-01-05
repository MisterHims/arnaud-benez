'use client';

import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    title: "UI/UX Design",
    description: "Je conçois des interfaces claires, ergonomiques et intuitives, centrées sur les besoins utilisateurs. Chaque parcours est pensé pour optimiser la navigation, fluidifier l’expérience et renforcer l’accessibilité. Mon approche s’appuie sur des méthodologies UX éprouvées, alliant prototypage, design systems et tests utilisateurs.",
    tags: ['Wireframing', 'Prototyping', 'Ergonomy', 'Design Systems', 'Design System', 'Accessibility', 'Atomic Design', 'User Testing'],
    iconSrc: "/assets/cards/ui-ux-design-card-illustration.png",
    color: "59, 130, 246", // Bleu
  },
  {
    title: "Direction Artistique",
    description: "J’imagine et déploie des identités visuelles fortes et cohérentes, adaptées aux valeurs et à l’univers de chaque marque. Je conçois une ligne graphique, une stratégie de communication efficace et adaptée et dirige la création de contenus visuels en assurant une harmonie sur tous les supports (print & digital). Mon objectif : garantir une direction créative claire, percutante et alignée avec les enjeux stratégiques.",
    tags: ['Branding', 'Graphic Chart', 'Visual Identity', 'Design Strategy', 'Storytelling', 'Design Thinking'],
    iconSrc: "/assets/cards/art-direction-card-illustration.png",
    color: "236, 72, 153", // Rose
  },
  {
    title: "Création de Médias",
    description: "Je produis des supports de communication impactants, adaptés à tous les canaux : bannières, vidéos, social media, pré-presse, etc. Chaque création est pensée pour renforcer l’image de marque, capter l’attention et soutenir les objectifs marketing tout en respectant la cohérence visuelle de l’univers graphique.",
    tags: ['Motion Design', 'Sound Design', 'Mail Kits', 'Social Media', 'Pre-Press', 'Video Production', 'Content Strategy'],
    iconSrc: "/assets/cards/media-creation-card-illustration.png",
    color: "139, 92, 246", // Violet
  },
  {
    title: "Développement Front-End",
    description: "J’intègre des interfaces web performantes, accessibles et optimisées en assurant un code maintenable, modulable et conforme aux meilleures pratiques du front-end moderne. Mes développements avec React et Next.js permettent des applications fluides, réactives et adaptées à tous les environnements.",
    tags: ['Responsive Design', 'PWA', 'Form Validation', 'JS/CSS Animation'],
    iconSrc: "/assets/cards/frontend-card-illustration.png",
    color: "245, 158, 11", // Orange/Ambre
  },
  {
    title: "Gestion de projets",
    description: "J’accompagne les équipes et les entreprises dans la gestion de leurs projets digitaux, de la stratégie à la livraison. Grâce à ma double compétence en design et développement, je facilite la coordination entre les différents intervenants et assure la cohérence globale des projets. Mon approche est orientée solution avec un focus sur l’expérience utilisateur et l’innovation.",
    tags: ['Digital Strategy', 'Agile', 'UX Research', 'Sprint Planning'],
    iconSrc: "/assets/cards/project-management-card-illustration.png",
    color: "16, 185, 129", // Vert émeraude
  },
  {
    title: "E-commerce",
    description: "J’optimise l’expérience d’achat sur des plateformes e-commerce complexes, en structurant les catalogues produits, en améliorant les parcours clients et en garantissant la performance (SEO, accessibilité). J’interviens sur la gestion de données métier, l’intégration multicanal, la conversion et l’optimisation de la logistique e-commerce.",
    tags: ['A/B Testing', 'Data Management', 'SEO', 'Performance', 'Conversion'],
    iconSrc: "/assets/cards/e-commerce-card-illustration.png",
    color: "6, 182, 212", // Cyan
  }
];

export const ServiceList = () => {
  // ... (le reste du composant avec la logique des colonnes ne change pas)
  // Le {...service} passera automatiquement la nouvelle prop 'color'
  const halfIndex = Math.ceil(SERVICES.length / 2);
  const leftColumnServices = SERVICES.slice(0, halfIndex);
  const rightColumnServices = SERVICES.slice(halfIndex);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-start'>
      <div className="flex flex-col gap-6">
        {leftColumnServices.map((service, index) => (
          <ServiceCard key={`left-${index}`} {...service} />
        ))}
      </div>
      <div className="flex flex-col gap-6 sm:pt-24">
        {rightColumnServices.map((service, index) => (
          <ServiceCard key={`right-${index}`} {...service} />
        ))}
      </div>
    </div>
  );
};