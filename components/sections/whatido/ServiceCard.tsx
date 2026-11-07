'use client';

import React, { useId, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card, Chip } from '@heroui/react';
import { Icon } from '@/components/ui/Icon';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tags?: string[];
  /** Longer text, folded under "Learn more" (still in the HTML: indexed) */
  details?: string;
  /** Extra tags shown with the details */
  moreTags?: string[];
  moreLabel?: string;
  lessLabel?: string;
  iconSrc?: string;
  color?: string;
}

/**
 * Folded block: rendered in the HTML from the start (search engines index
 * it), height animated with the 0fr -> 1fr grid trick, inert while folded
 * (skipped by keyboard and screen readers). Text and extra tags each fold
 * in place and open together.
 */
const Folded = ({ id, isOpen, children }: { id: string; isOpen: boolean; children: React.ReactNode }) => (
  <div
    id={id}
    inert={!isOpen}
    className={cn(
      'grid w-full transition-[grid-template-rows,opacity] duration-500 ease-out',
      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
    )}
  >
    <div className="overflow-hidden">{children}</div>
  </div>
);

export const ServiceCard = ({
  title,
  description,
  tags = [],
  details,
  moreTags = [],
  moreLabel = 'Learn more',
  lessLabel = 'Show less',
  iconSrc,
  color = "255, 255, 255",
  className,
  ...props
}: ServiceCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'p-[2.25px] border-none break-inside-avoid relative flex flex-col rounded-xl overflow-hidden group max-w-full',
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: opacity === 1 ? 0 : 1,
          background: `radial-gradient(500px circle at 0px 0px, rgba(${color}, 0.6), transparent 40%)`,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(${color}, 1), transparent 40%)`,
        }}
      />

      <div
        className={cn(
          "relative flex flex-col grow bg-[#040506] rounded-[10px] overflow-hidden z-10",
          "h-full w-full"
        )}
      >

        {/* Internal gradient: vertical, fully transparent at its top (the
            former diagonal one drew a visible edge across the card) */}
        <div className="pointer-events-none absolute bottom-0 right-0 left-0 h-1/2 bg-linear-to-t from-white/4 to-transparent z-0" />

        {iconSrc && (
          <div className="relative h-[100px] w-full mb-4 overflow-hidden pointer-events-none select-none z-10">
            {/* Fills its 100px band exactly (cropped at the bottom, where it
                fades out anyway): no longer runs into the title on wide cards */}
            <Image
              src={iconSrc}
              alt=""
              width={318}
              height={120}
              // The line art was barely visible on the black card
              className="w-full h-full object-cover object-top brightness-150 group-hover:brightness-200 transition-[filter] duration-500"
              style={{
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
              }}
            />
          </div>
        )}

        <div className="flex flex-col grow z-10">
          <Card.Header className="px-5 pb-1.5 pt-0">
            <h3 className='text-lg font-bold text-[#ebedf0]'>
              {title}
            </h3>
          </Card.Header>

          <Card.Content className="px-5 py-1.5 overflow-visible">
            <p className='text-[#b3b9c0] text-sm leading-relaxed font-light'>
              {description}
            </p>
            {/* Details follow the summary (text with text) */}
            {details && (
              <Folded id={`${detailsId}-text`} isOpen={isExpanded}>
                <p className='pt-3 text-[#b3b9c0] text-sm leading-relaxed font-light'>
                  {details}
                </p>
              </Folded>
            )}
          </Card.Content>

          <Card.Footer className="px-5 pt-2 pb-5 mt-auto flex-col items-start gap-0">
            {tags.length > 0 && (
              <div className='flex gap-2 flex-wrap'>
                {tags.map((tag) => (
                  <Chip key={tag} className="px-2.5 py-0.5 h-auto text-xs text-[#a2a9b2] border border-[#24282c] bg-white/5 font-light transition-colors duration-500 group-hover:text-[#d0d4da]">
                    {tag}
                  </Chip>
                ))}
              </div>
            )}

            {/* Extra tags right after the main ones (tags with tags) */}
            {moreTags.length > 0 && (
              <Folded id={`${detailsId}-tags`} isOpen={isExpanded}>
                <div className='flex gap-2 flex-wrap pt-2'>
                  {moreTags.map((tag) => (
                    <Chip key={tag} className="px-2.5 py-0.5 h-auto text-xs text-[#a2a9b2] border border-[#24282c] bg-white/5 font-light transition-colors duration-500 group-hover:text-[#d0d4da]">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </Folded>
            )}

            {(details || moreTags.length > 0) && (
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`${detailsId}-text ${detailsId}-tags`}
                onClick={() => setIsExpanded((v) => !v)}
                className="mt-4 py-1 inline-flex items-center gap-1.5 text-[13px] text-[#a2a9b2] hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/50 rounded-sm transition-colors cursor-pointer"
              >
                {isExpanded ? lessLabel : moreLabel}
                <Icon
                  name="ArrowDown"
                  size={14}
                  className={cn('transition-transform duration-500', isExpanded && 'rotate-180')}
                />
              </button>
            )}
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
};