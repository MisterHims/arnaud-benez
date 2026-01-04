'use client';

export const Spacer = () => {
  return (
    // Set section background to white for safety
    <section className='relative h-full w-full overflow-hidden flex flex-col justify-end'>

      {/* Optional decorative element in center (Ghost text) */}
      <div className='absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none'>
        <h2 className='text-[10vw] font-bold text-gray-400 tracking-tighter uppercase select-none'>
          Transition
        </h2>
      </div>

      {/* --- THE SVG --- */}
      {/* Stuck to bottom, no rotation */}
      <div className="w-full z-10 leading-0">
        <svg
          className="w-full h-auto min-h-[200px] md:min-h-[300px]"
          viewBox="0 0 1800 600"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. WHITE BACKGROUND: Links with the section above (Hero) */}
          <rect x="0" y="0" width="1800" height="600" fill="#f8f8f8"></rect>

          {/* 2. DARK MOUNTAIN LAYERS */}

          {/* Back layer (Dark gray #4c4c4c) */}
          <path d="M0 487L78 445L157 413L235 457L313 408L391 515L470 507L548 431L626 436L704 490L783 548L861 442L939 539L1017 500L1096 507L1174 511L1252 529L1330 452L1409 483L1487 499L1565 421L1643 534L1722 438L1800 414L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#4c4c4c"></path>

          {/* Middle layer (Very dark gray #2c2c2c) */}
          <path d="M0 478L78 501L157 491L235 500L313 552L391 515L470 541L548 540L626 524L704 490L783 503L861 519L939 526L1017 484L1096 478L1174 477L1252 480L1330 510L1409 499L1487 480L1565 525L1643 473L1722 496L1800 525L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#2c2c2c"></path>

          {/* Front layer (Pure black #0c0c0c): Links with the next section (WhatIDo) */}
          <path d="M0 558L78 554L157 512L235 575L313 554L391 507L470 518L548 560L626 572L704 537L783 562L861 550L939 513L1017 529L1096 548L1174 525L1252 571L1330 506L1409 539L1487 562L1565 555L1643 546L1722 528L1800 506L1800 601L1722 601L1643 601L1565 601L1487 601L1409 601L1330 601L1252 601L1174 601L1096 601L1017 601L939 601L861 601L783 601L704 601L626 601L548 601L470 601L391 601L313 601L235 601L157 601L78 601L0 601Z" fill="#0c0c0c"></path>
        </svg>
      </div>
    </section>
  );
};