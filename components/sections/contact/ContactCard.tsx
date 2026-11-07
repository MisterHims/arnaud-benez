'use client';

import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, type PointerEvent } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Card } from "@heroui/react";
import { Icon } from "@/components/ui/Icon";
import { CustomButton } from "@/components/CustomButton";
import { useTranslations } from "next-intl";

/** Maximum tilt, in degrees, when the cursor reaches the card's edges */
const MAX_TILT = 2.5;

export const ContactCard = () => {
  const t = useTranslations('Contact.card');
  const reduceMotion = usePrefersReducedMotion();

  // Cursor position over the card, from -0.5 (left / top) to 0.5
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);
  // The card leans toward the cursor, like a card held in the hand
  const rotateY = useTransform(x, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]);
  const rotateX = useTransform(y, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]);
  // Soft light following the cursor
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08), transparent 55%)`;
  const glareOpacity = useSpring(0, spring);

  // The halo also lights up the portrait: its color version shows through a
  // soft circle following the cursor (relative to the photo), so the light
  // brings the color, even from elsewhere on the card
  const photoRef = useRef<HTMLDivElement>(null);
  const lightX = useSpring(useMotionValue(-999), spring);
  const lightY = useSpring(useMotionValue(-999), spring);
  const photoLight = useMotionTemplate`radial-gradient(circle 150px at ${lightX}px ${lightY}px, black 25%, transparent 100%)`;

  // Mouse only (no tilt on touch screens), and none with reduced motion
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
    glareOpacity.set(1);
    const photo = photoRef.current?.getBoundingClientRect();
    if (photo) {
      lightX.set(e.clientX - photo.left);
      lightY.set(e.clientY - photo.top);
    }
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    glareOpacity.set(0);
  };

  return (
    // 1. THE MASTER CONTAINER: tilts as a whole (card + floating button)
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative w-full max-w-[640px] aspect-640/416 mx-auto md:mx-0"
    >

      {/* 2. LA CARTE */}
      <Card className="flex flex-col h-full bg-linear-to-br from-[#121417] to-[#090a0c] border-3 border-white/10 p-6 sm:p-8 rounded-xl relative z-10 overflow-hidden justify-between gap-9.5">

        {/* --- FOND SVG --- */}
        <div className="absolute bottom-0 right-0 z-0 pointer-events-none w-[65%] h-auto">
          <svg
            viewBox="0 0 363 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="xMaxYMax meet"
          >
            <path
              d="M0 188H74.4217L187.547 74.9121L300.619 188H376L187.973 0L0 188Z"
              fill="url(#paint0_linear_contact_card)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_contact_card"
                x1="188"
                y1="0"
                x2="188"
                y2="188"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#939aa3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* HEADER : Photo + Nom */}
        <Card.Header className="flex flex-row self-stretch gap-6">
          <div ref={photoRef} className="relative w-25 h-25 rounded-xl overflow-hidden shrink-0">
            <Image
              src="/assets/card-portrait_min.jpg"
              alt="Arnaud Benez"
              fill
              className="object-cover grayscale"
            />
            {/* Color version, revealed where the halo shines */}
            <motion.div
              aria-hidden="true"
              style={{ maskImage: photoLight, WebkitMaskImage: photoLight, opacity: glareOpacity }}
              className="absolute inset-0"
            >
              <Image src="/assets/card-portrait_min.jpg" alt="" fill className="object-cover" />
            </motion.div>
          </div>
          <div className="self-stretch py-1.5 inline-flex flex-col justify-center items-start">
            <h3 className="text-white text-3xl font-semibold uppercase tracking-[6px]">Arnaud Benez</h3>
            <span className="text-[#bec3ca] text-sm uppercase tracking-wide font-extralight">{t('roles')}</span>
          </div>
        </Card.Header>

        {/* INFO LIST - CLEANED (Without circles) */}
        <Card.Content className="flex flex-col gap-3 sm:gap-4 mt-1.5">

          {/* EMAIL */}
          <div className="flex items-center gap-4 text-[#dbdee3] text-lgsm:text-sm group/link hover:text-white transition-colors cursor-pointer pl-1">
            <Icon name="Mail" size={20} />
            <span className="font-light tracking-wide truncate">arnaud.benez@gmail.com</span>
          </div>

          {/* WEBSITE */}
          <div className="flex items-center gap-4 text-[#dbdee3] text-lgsm:text-sm group/link hover:text-white transition-colors pl-1">
            <Icon name="LaptopPhone" size={20} />
            <span className="font-light tracking-wide truncate">www.arnaud-benez.net</span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-4 text-[#dbdee3] text-lgsm:text-sm group/link hover:text-white transition-colors pl-1">
            <Icon name="LocationUser" size={20} />
            <span className="font-light tracking-wide">{t('location')}</span>
          </div>
        </Card.Content>

        {/* THE REQUESTED SEPARATOR */}
        <div className="w-30 h-[2px] bg-white/10"></div>

        {/* FOOTER: SEPARATOR + SOCIAL ICONS */}
        <div className="relative z-10 flex flex-col gap-6 pl-1">

          <div className="flex gap-8">
            {/* X (Twitter) */}
            <a href="#" aria-label="X (Twitter)" className="-m-1 p-1 rounded-md text-[#dbdee3] hover:text-white focus-visible:outline-2 focus-visible:outline-white/60 transition-colors">
              <Icon name="NewTwitter" size={20} />
            </a>

            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn" className="-m-1 p-1 rounded-md text-[#dbdee3] hover:text-white focus-visible:outline-2 focus-visible:outline-white/60 transition-colors">
              <Icon name="Linkedin" size={20} />
            </a>

            {/* GitHub */}
            <a href="#" aria-label="GitHub" className="-m-1 p-1 rounded-md text-[#dbdee3] hover:text-white focus-visible:outline-2 focus-visible:outline-white/60 transition-colors">
              <Icon name="GitHub" size={20} />
            </a>

            {/* Slack */}
            <a href="#" aria-label="Slack" className="-m-1 p-1 rounded-md text-[#dbdee3] hover:text-white focus-visible:outline-2 focus-visible:outline-white/60 transition-colors">
              <Icon name="Slack" size={20} />
            </a>
          </div>
        </div>

      </Card>

      {/* Light reflection over the card (above its content, below the button) */}
      <motion.div
        aria-hidden="true"
        style={{ backgroundImage: glare, opacity: glareOpacity }}
        className="absolute inset-0 z-15 rounded-xl pointer-events-none"
      />

      {/* BOUTON FLOTTANT */}
      <div className="absolute -bottom-5 right-4 sm:right-8 z-20">
        {/* Opaque fill: the button straddles the card's edge */}
        <CustomButton variant="secondary" size="sm" className="bg-[#1a1c20]">
          <Icon name="ContactCard" size={16} />
          {/* Small 11px caps sit higher than in the larger buttons: 2px down
              instead of the usual 1px */}
          <span className="relative top-[2px]">{t('download')}</span>
        </CustomButton>
      </div>

    </motion.div>
  );
};