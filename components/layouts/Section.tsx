// src/components/layouts/Section.tsx

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
}) => {
  return (
    <section
      className={cn(
        'mx-auto h-full items-center px-6',
        'grid grid-cols-1 md:grid-cols-2',
        'gap-6 md:gap-10',
        'max-w-8xl xl:max-w-7xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl',
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;