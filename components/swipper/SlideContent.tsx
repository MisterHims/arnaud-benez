'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideContentProps {
  children: ReactNode;
  className?: string;
  isScrollable?: boolean;
}

export const SlideContent = ({
  children,
  className,
  isScrollable = false
}: SlideContentProps) => {

  const containerRef = useRef<HTMLDivElement>(null);

  // --- LOGIQUE DE SCROLL (Inchangée) ---
  useEffect(() => {
    if (!isScrollable) return;

    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

      if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isScrollable]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "h-full w-full",

        isScrollable
          ? "overflow-y-auto" // Par défaut pour le scrollable
          : "", // Par défaut pour le standard (centré)

        className
      )}
    >
      {children}
    </section>
  );
};