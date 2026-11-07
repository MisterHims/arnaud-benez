'use client';

import { ServiceCard } from "./ServiceCard";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Literal classes (Tailwind only generates what it can read in the source)
const MOBILE_ORDER = ['order-1', 'order-2', 'order-3', 'order-4', 'order-5', 'order-6'];

// Visuals only: titles, descriptions and tags live in messages (Services.<id>).
// Core services first (design, code, e-commerce), then the complementary ones
const SERVICES = [
  { id: 'uiux', iconSrc: "/assets/cards/ui-ux-design-card-illustration.png", color: "59, 130, 246" },             // Blue
  { id: 'frontEnd', iconSrc: "/assets/cards/frontend-card-illustration.png", color: "245, 158, 11" },             // Amber
  { id: 'ecommerce', iconSrc: "/assets/cards/e-commerce-card-illustration.png", color: "6, 182, 212" },          // Cyan
  { id: 'artDirection', iconSrc: "/assets/cards/art-direction-card-illustration.png", color: "236, 72, 153" },   // Pink
  { id: 'media', iconSrc: "/assets/cards/media-creation-card-illustration.png", color: "139, 92, 246" },         // Purple
  { id: 'projectManagement', iconSrc: "/assets/cards/project-management-card-illustration.png", color: "16, 185, 129" }, // Emerald
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
    details: t(`${id}.details`),
    moreTags: t.raw(`${id}.moreTags`) as string[],
    moreLabel: t('more'),
    lessLabel: t('less'),
  }));

  // Staggered columns, filled alternately so the reading order zigzags
  // through the list: 1 2 / 3 4 / 5 6
  const columns = [
    services.map((service, index) => ({ ...service, index })).filter(({ index }) => index % 2 === 0),
    services.map((service, index) => ({ ...service, index })).filter(({ index }) => index % 2 === 1),
  ];

  // Rendered once (no duplicated text in the HTML). Phones: the columns
  // dissolve (display: contents) and `order` restores the reading order
  return (
    <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:items-start">
      {columns.map((column, c) => (
        <div key={c} className={cn('contents sm:flex sm:flex-col sm:gap-6', c === 1 && 'sm:pt-24')}>
          {column.map(({ id, index, ...service }) => (
            <ServiceCard key={id} className={cn(MOBILE_ORDER[index], 'sm:order-none')} {...service} />
          ))}
        </div>
      ))}
    </div>
  );
};
