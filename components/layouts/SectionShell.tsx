'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'contained';
  withSpacing?: boolean;
}

const SectionShell: React.FC<SectionShellProps> = ({
  children,
  className,
  variant = 'full',
  withSpacing = true,
  ...props
}) => {

  // 1. Structure classes (Max width, centering) - Always applied if contained
  const layoutClasses = 'w-full mx-auto max-w-10xl xl:max-w-9xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl';

  // 2. Spacing Classes (Vertical Margins and Side Padding) - Conditional
  const spacingClasses = 'mt-[20vh] pb-[20vh] px-4 md:px-0';

  return (
    <div
      {...props}
      className={cn(
        "",
        variant === 'contained' && layoutClasses,
        (variant === 'contained' && withSpacing) && spacingClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionShell;