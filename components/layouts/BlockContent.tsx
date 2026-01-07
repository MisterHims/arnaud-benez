import React from 'react';
import { cn } from '@/lib/utils';

interface BlockContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  isSticky?: boolean;
}

const colSpanClasses: Record<number, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const BlockContent: React.FC<BlockContentProps> = ({
  children,
  className,
  colSpan,
  isSticky = false,
  ...props
}) => {
  return (
    // 1. DIV PARENTE (Le conteneur Grille / Le Rail)
    <div
      className={cn(
        'w-full h-full',
        colSpan ? colSpanClasses[colSpan] : 'md:col-span-12',
        className // Les classes externes s'appliquent ici
      )}
      {...props}
    >
      {/* 2. DIV ENFANT (Le Contenu / Le Wagon) */}
      <div
        className={cn(
          "w-full h-full",
          isSticky && "md:sticky md:top-24"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default BlockContent;