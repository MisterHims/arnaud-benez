// src/components/layouts/AppWrapper.tsx

import React from 'react';
import { Providers } from '@/components/Providers';
import { cn } from '@/lib/utils';

interface AppWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex",
        className
      )}
    >
      <Providers>
        {children}
      </Providers>
    </div>
  );
};

export default AppWrapper;