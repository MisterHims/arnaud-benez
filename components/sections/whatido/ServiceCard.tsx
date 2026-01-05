'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  tags?: string[];
}

export const ServiceCard = ({
  title,
  description,
  tags = [],
  className,
  ...props
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        // Styles de base de ta carte
        'p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-gray-600 transition-colors',
        className
      )}
      {...props}
    >
      <h3 className='text-xl font-bold mb-4 text-white'>
        {title}
      </h3>

      <p className='text-gray-400 text-sm leading-relaxed'>
        {description}
      </p>

      {/* Rendu conditionnel des tags si il y en a */}
      {tags.length > 0 && (
        <div className='flex gap-2 mt-4 flex-wrap'>
          {tags.map((tag, index) => (
            // J'ai gardé ta classe 'badge-tech', assure-toi qu'elle est bien définie dans ton CSS
            // Sinon remplace par : className="px-3 py-1 rounded-full bg-white/5 text-xs text-white border border-white/10"
            <span key={index} className='badge-tech'>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};