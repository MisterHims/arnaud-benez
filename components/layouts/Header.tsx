'use client';

export const Header = () => {
  return (
    // pointer-events-none on the bar, re-enabled on its content: the header
    // never blocks clicks on the page underneath

    <nav className='fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none'>
      <span className='text-2xl font-bold pointer-events-auto mix-blend-difference text-white'>
        ARNAUD BENEZ
      </span>

      {/* Navigation to come */}
      <div className='pointer-events-auto flex gap-4 items-center' />

    </nav>
  );
};
