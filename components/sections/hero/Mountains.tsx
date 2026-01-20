'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface MountainsProps {
  progress: MotionValue<number>;
  mouseRotateX: MotionValue<number>;
}

export const Mountains = ({ progress, mouseRotateX }: MountainsProps) => {

  // 1. Logique d'animation (Scroll)
  const y = useTransform(progress, [0, 1], ['100%', '0%']);
  const rotateXFromScroll = useTransform(progress, [0, 1], [90, 0]);
  const opacity = useTransform(progress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        rotateX: rotateXFromScroll,
        opacity,
        transformOrigin: "bottom center",
        transformStyle: "preserve-3d",
      }}
      // I removed 'left-0 w-full' and added values to center and widen
      // left-1/2 -translate-x-1/2: Centers the container
      // w-[140%]: The container is 140% of the screen width (so extends 20% on each side)
      className='absolute -bottom-px left-1/2 -translate-x-1/2 w-[140%] z-40 overflow-visible leading-0'
    >
      {/* 2. Logique d'interaction (Souris) */}
      <motion.div
        style={{
          rotateX: mouseRotateX,
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        <svg
          className='w-full h-auto min-h-[150px]'
          viewBox='0 0 1800 600'
          // We keep slice so it fills the height well
          preserveAspectRatio='xMidYMax slice'
          xmlns='http://www.w3.org/2000/svg'
          // IMPORTANT : overflow-visible permet au SVG de dessiner hors de sa boite
          style={{ overflow: 'visible' }}
        >

          {/* Your SVG paths (unchanged) */}
          <path d="M0 550L78 459L157 545L235 465L313 496L391 444L470 499L548 447L626 516L704 538L783 473L861 472L939 512L1017 415L1096 539L1174 528L1252 422L1330 475L1409 537L1487 519L1565 505L1643 458L1722 492L1800 550L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#bdbdbd"></path>
          <path d="M0 464L78 497L157 500L235 559L313 515L391 468L470 489L548 508L626 490L704 555L783 466L861 514L939 518L1017 501L1096 560L1174 518L1252 529L1330 463L1409 541L1487 515L1565 540L1643 492L1722 485L1800 478L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#dadada"></path>
          <path d="M0 571L78 572L157 512L235 560L313 545L391 531L470 517L548 559L626 529L704 551L783 540L861 509L939 567L1017 530L1096 543L1174 540L1252 524L1330 561L1409 518L1487 531L1565 503L1643 570L1722 574L1800 544L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#f8f8f8"></path>
        </svg>
      </motion.div>

      {/* Scroll Indicator (We set it back to 100% width so it's well centered on the screen, not on the widened SVG) */}
      <motion.div
        style={{ opacity }}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-screen'
      >
        <div className='w-px h-8 bg-white/30'></div>
        <span className='text-[10px] text-white/50 tracking-widest uppercase'>Scroll Down</span>
      </motion.div>
    </motion.div>
  );
};