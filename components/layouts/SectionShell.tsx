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
    'w-full mx-auto mt-[20vh] pb-[20vh] px-4 md:px-0',
    'max-w-10xl xl:max-w-9xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl'
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