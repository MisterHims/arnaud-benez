// src/components/layouts/BlockContent.tsx

import React from 'react';
import { cn } from '@/lib/utils';

interface BlockContentProps {
  children: React.ReactNode;
  className?: string;
}

const BlockContent: React.FC<BlockContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-center text-left space-y-8',
        className
      )}
    >
      {children}
    </div>
  );
};

export default BlockContent;