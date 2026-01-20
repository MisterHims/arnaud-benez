'use client';

import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const Header = () => {
  return (
    // I kept your pointer-events-none trick which is excellent for a slider!

    <nav className='fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none'>
      <span className='text-2xl font-bold pointer-events-auto mix-blend-difference text-white'>
        ARNAUD BENEZ
      </span>

      <div className='pointer-events-auto flex gap-4 items-center'>
        <ThemeSwitcher />
      </div>

    </nav>
  );
};