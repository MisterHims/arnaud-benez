'use client';

import { ServiceCard } from "./ServiceCard";
import { useTranslations } from "next-intl";

// Visuals only: titles, descriptions and tags live in messages (Services.<id>)
const SERVICES = [
  { id: 'uiux', iconSrc: "/assets/cards/ui-ux-design-card-illustration.png", color: "59, 130, 246" },             // Blue
  { id: 'artDirection', iconSrc: "/assets/cards/art-direction-card-illustration.png", color: "236, 72, 153" },   // Pink
  { id: 'media', iconSrc: "/assets/cards/media-creation-card-illustration.png", color: "139, 92, 246" },         // Purple
  { id: 'frontEnd', iconSrc: "/assets/cards/frontend-card-illustration.png", color: "245, 158, 11" },             // Amber
  { id: 'projectManagement', iconSrc: "/assets/cards/project-management-card-illustration.png", color: "16, 185, 129" }, // Emerald
  { id: 'ecommerce', iconSrc: "/assets/cards/e-commerce-card-illustration.png", color: "6, 182, 212" },          // Cyan
] as const;

export const ServiceList = () => {
  const t = useTranslations('Services');
  const services = SERVICES.map(({ id, iconSrc, color }) => ({
    id,
    iconSrc,
    color,
    title: t(`${id}.title`),
    description: t(`${id}.description`),
    tags: t.raw(`${id}.tags`) as string[],
  }));

  // ... (the rest of the component with column logic doesn't change)
  // The {...service} will automatically pass the new 'color' prop
  const halfIndex = Math.ceil(services.length / 2);
  const leftColumnServices = services.slice(0, halfIndex);
  const rightColumnServices = services.slice(halfIndex);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-start'>
      <div className="flex flex-col gap-6">
        {leftColumnServices.map(({ id, ...service }) => (
          <ServiceCard key={id} {...service} />
        ))}
      </div>
      <div className="flex flex-col gap-6 sm:pt-24">
        {rightColumnServices.map(({ id, ...service }) => (
          <ServiceCard key={id} {...service} />
        ))}
      </div>
    </div>
  );
};