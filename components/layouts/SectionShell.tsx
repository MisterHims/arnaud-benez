'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionShellProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'full' | 'contained';
  withSpacing?: boolean;
}

const SectionShell = forwardRef<HTMLDivElement, SectionShellProps>(({
  children,
  className,
  variant = 'full',
  withSpacing = true,
  ...props
}, ref) => {

  // 1. Structure classes (Max width, centering) - Always applied if contained
  // The width always keeps a side gutter (16 / 40 / 64px): below the max
  // widths (e.g. a 1440px laptop under the 1536px xl max) the content used
  // to touch the screen edges
  const layoutClasses = 'mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-5rem)] xl:w-[calc(100%-8rem)] max-w-10xl xl:max-w-9xl lg:max-w-6xl md:max-w-5xl sm:max-w-4xl';

  // 2. Spacing Classes (Vertical and Side Padding) - Conditional
  // Padding rather than margins: stays inside the section's background and
  // its min-height (no margin collapsing), and 12vh + 12vh instead of the
  // former 20vh + 20vh keeps sections much shorter to scroll through
  const spacingClasses = 'pt-[12vh] pb-[12vh]';

  return (
    <div
      ref={ref}
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
});

SectionShell.displayName = "SectionShell";

export default SectionShell;
