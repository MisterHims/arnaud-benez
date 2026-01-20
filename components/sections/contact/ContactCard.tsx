'use client';

import Image from 'next/image';
import { Card } from "@heroui/react";
import { Icon } from "@/components/ui/Icon";
import { CustomButton } from "@/components/CustomButton";

export const ContactCard = () => {
  return (
    // 1. THE MASTER CONTAINER
    <div className="relative w-full max-w-[640px] aspect-640/416 mx-auto md:mx-0">

      {/* 2. LA CARTE */}
      <Card className="flex flex-col h-full bg-linear-to-br from-[#141414] to-[#0A0A0A] border-3 border-white/10 p-6 sm:p-8 rounded-xl relative z-10 overflow-hidden justify-between gap-9.5">

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
                <stop offset="1" stopColor="#999999" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* HEADER : Photo + Nom */}
        <Card.Header className="flex flex-row self-stretch gap-6">
          <div className="relative w-25 h-25 rounded-3xl overflow-hidden shrink-0">
            <Image
              src="/assets/card-portrait_min.jpg"
              alt="Arnaud Benez"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="self-stretch py-1.5 inline-flex flex-col justify-center items-start">
            <h3 className="text-white text-3xl font-semibold uppercase tracking-[6px]">Arnaud Benez</h3>
            <span className="text-[#c2c2c2] text-sm uppercase tracking-wide font-extralight">UI/UX Designer | Front-end Developer</span>
          </div>
        </Card.Header>

        {/* INFO LIST - CLEANED (Without circles) */}
        <Card.Content className="flex flex-col gap-3 sm:gap-4 mt-1.5">

          {/* EMAIL */}
          <div className="flex items-center gap-4 text-[#DEDEDE] text-lgsm:text-sm group/link hover:text-white transition-colors cursor-pointer pl-1">
            <Icon name="Mail" size={20} />
            <span className="font-light tracking-wide truncate">arnaud.benez@gmail.com</span>
          </div>

          {/* WEBSITE */}
          <div className="flex items-center gap-4 text-[#DEDEDE] text-lgsm:text-sm group/link hover:text-white transition-colors pl-1">
            <Icon name="LaptopPhone" size={20} />
            <span className="font-light tracking-wide truncate">www.arnaud-benez.net</span>
          </div>

          {/* LOCATION */}
          <div className="flex items-center gap-4 text-[#DEDEDE] text-lgsm:text-sm group/link hover:text-white transition-colors pl-1">
            <Icon name="LocationUser" size={20} />
            <span className="font-light tracking-wide">Val de Marne</span>
          </div>
        </Card.Content>

        {/* THE REQUESTED SEPARATOR */}
        <div className="w-30 h-[2px] bg-white/10"></div>

        {/* FOOTER: SEPARATOR + SOCIAL ICONS */}
        <div className="relative z-10 flex flex-col gap-6 pl-1">

          <div className="flex gap-8">
            {/* X (Twitter) */}
            <a href="#" className="text-[#DEDEDE] hover:text-white transition-colors">
              <Icon name="NewTwitter" size={20} />
            </a>

            {/* LinkedIn */}
            <a href="#" className="text-[#DEDEDE] hover:text-white transition-colors">
              <Icon name="Linkedin" size={20} />
            </a>

            {/* GitHub */}
            <a href="#" className="text-[#DEDEDE] hover:text-white transition-colors">
              <Icon name="GitHub" size={20} />
            </a>

            {/* Slack */}
            <a href="#" className="text-[#DEDEDE] hover:text-white transition-colors">
              <Icon name="Slack" size={20} />
            </a>
          </div>
        </div>

      </Card>

      {/* BOUTON FLOTTANT */}
      <div className="absolute -bottom-5 right-4 sm:right-8 z-20">
        <CustomButton variant="secondary" size="sm" className="shadow-2xl">
          <Icon name="Download" className="relative bottom-0.25 w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Download Contact Card</span>
        </CustomButton>
      </div>

    </div>
  );
};