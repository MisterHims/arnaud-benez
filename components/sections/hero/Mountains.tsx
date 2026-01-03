// components/hero/Mountains.tsx
'use client';

import { motion, MotionValue } from 'framer-motion';

interface MountainsProps {
  y?: MotionValue<string>; // Note: C'est une string ('100%') pas un number
}

export const Mountains = ({ y }: MountainsProps) => {
  return (
    // On enveloppe le tout dans une motion.div qui reçoit le 'y'
    <motion.div
      style={{ y }}
      className='absolute bottom-[-1px] left-0 w-full z-30 overflow-hidden leading-[0]'
    >
      <svg
        className='w-full h-auto min-h-[100px] md:min-h-[150px]'
        // ... le reste de votre SVG reste identique ...
        viewBox='0 0 1440 320'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path fill='#111' fillOpacity='1' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
        {/* J'ai mis le fill en blanc solide pour l'effet "neige" de votre image, ajustez si besoin */}
        <path fill='#ffffff' fillOpacity='1' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
      </svg>

      {/* Le bouton scroll down peut être masqué au début et apparaître avec les montagnes si vous voulez, pour l'instant je le laisse */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>
        <div className='w-[1px] h-8 bg-white/30'></div>
        <span className='text-[10px] text-white/50 tracking-widest uppercase'>Scroll Down</span>
      </div>
    </motion.div>
  );
};