import React from 'react';
import { cn } from '@/lib/utils';

interface BlockContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  // On définit strictement les nombres acceptés pour l'autocomplétion
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

// Mapping statique pour que Tailwind détecte les classes
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
  ...props
}) => {
  return (
    <div
      className={cn(
        'pb-36',
        // Si colSpan est fourni, on va chercher la classe correspondante
        // Sinon, on peut mettre une valeur par défaut ou rien
        colSpan ? colSpanClasses[colSpan] : 'md:col-span-12',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BlockContent;