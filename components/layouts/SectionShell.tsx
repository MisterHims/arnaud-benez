'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'contained';
}

const SectionShell: React.FC<SectionShellProps> = ({
  children,
  className,
  variant = 'full',
  ...props
}) => {

  const containedClasses = [
    'h-full mx-auto mt-[20vh] pb-36 px-4 md:px-0',
    'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14',
    'max-w-8xl xl:max-w-7xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl'
  ];

  return (
    <div
      {...props}
      className={cn(
        "",
        variant === 'contained' && containedClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionShell;