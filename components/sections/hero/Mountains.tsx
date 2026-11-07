'use client';

import { easeOut, motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';

interface MountainsProps {
  /** Journey progress (0 → 1). The mountains rise during the landing. */
  progress: MotionValue<number>;
  /** Smoothed mouse position (-0.5 → 0.5): closer ridges shift more (depth). */
  mouseX?: MotionValue<number>;
}

// Each ridge rises a bit later than the one behind it: a parallax descent
const BACK = 'M0 550L78 459L157 545L235 465L313 496L391 444L470 499L548 447L626 516L704 538L783 473L861 472L939 512L1017 415L1096 539L1174 528L1252 422L1330 475L1409 537L1487 519L1565 505L1643 458L1722 492L1800 550L1800 601L0 601Z';
const MIDDLE = 'M0 464L78 497L157 500L235 559L313 515L391 468L470 489L548 508L626 490L704 555L783 466L861 514L939 518L1017 501L1096 560L1174 518L1252 529L1330 463L1409 541L1487 515L1565 540L1643 492L1722 485L1800 478L1800 601L0 601Z';
const FRONT = 'M0 571L78 572L157 512L235 560L313 545L391 531L470 517L548 559L626 529L704 551L783 540L861 509L939 567L1017 530L1096 543L1174 540L1252 524L1330 561L1409 518L1487 531L1565 503L1643 570L1722 574L1800 544L1800 601L0 601Z';

const Ridge = ({ d, fill, x, y }: { d: string; fill: string; x: MotionValue<number>; y: MotionValue<string> }) => (
  <motion.svg
    style={{ x, y }}
    // Slightly wider than the screen so the parallax never reveals an edge
    className="absolute top-0 -left-[3%] w-[106%] h-full"
    viewBox="0 400 1800 201"
    preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={d} fill={fill} />
  </motion.svg>
);

export const Mountains = ({ progress, mouseX }: MountainsProps) => {
  const fallbackMouse = useMotionValue(0);
  const mouse = mouseX ?? fallbackMouse;
  const backX = useTransform(mouse, [-0.5, 0.5], [8, -8]);
  const middleX = useTransform(mouse, [-0.5, 0.5], [16, -16]);
  const frontX = useTransform(mouse, [-0.5, 0.5], [28, -28]);

  // The ground comes up during the vertical descent (last ~25%) in one
  // continuous motion, slowing down as it settles: a soft touchdown, no bounce.
  // Far ridges first, closest ridge last.
  const backY = useTransform(progress, [0.695, 0.975], ['100%', '0%'], { ease: easeOut });
  const middleY = useTransform(progress, [0.735, 0.99], ['100%', '0%'], { ease: easeOut });
  const frontY = useTransform(progress, [0.77, 1], ['100%', '0%'], { ease: easeOut });

  return (
    <div
      aria-hidden="true"
      // Height shared with the hero (--mountains-h) to center the name in the sky
      className="pointer-events-none absolute bottom-0 left-0 w-full h-(--mountains-h) z-5"
    >
      <Ridge d={BACK} fill="#bdbdbd" x={backX} y={backY} />
      <Ridge d={MIDDLE} fill="#dadada" x={middleX} y={middleY} />
      {/* Front ridge matches the top of <TopSpacer /> for a seamless join */}
      <Ridge d={FRONT} fill="#f8f8f8" x={frontX} y={frontY} />
    </div>
  );
};
