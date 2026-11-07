import React from 'react';

/**
 * Transition from the hero's snowy foreground (#f7f8f9) down to the dark
 * "Who I Am" valley (#0a0c0f). The viewBox is cropped to the ridges only, so
 * there is no tall white band between the landing and the next section.
 */
export const TopSpacer = () => {
  return (
    <div className="w-full relative z-10 leading-0 bg-[#f7f8f9]">
      <svg
        className="w-full h-auto block"
        viewBox="0 380 1800 221"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 487L78 445L157 413L235 457L313 408L391 515L470 507L548 431L626 436L704 490L783 548L861 442L939 539L1017 500L1096 507L1174 511L1252 529L1330 452L1409 483L1487 499L1565 421L1643 534L1722 438L1800 414L1800 601L0 601Z" fill="#474d54"></path>
        <path d="M0 478L78 501L157 491L235 500L313 552L391 515L470 541L548 540L626 524L704 490L783 503L861 519L939 526L1017 484L1096 478L1174 477L1252 480L1330 510L1409 499L1487 480L1565 525L1643 473L1722 496L1800 525L1800 601L0 601Z" fill="#292c32"></path>
        <path d="M0 558L78 554L157 512L235 575L313 554L391 507L470 518L548 560L626 572L704 537L783 562L861 550L939 513L1017 529L1096 548L1174 525L1252 571L1330 506L1409 539L1487 562L1565 555L1643 546L1722 528L1800 506L1800 601L0 601Z" fill="#0a0c0f"></path>
      </svg>
    </div>
  );
};
