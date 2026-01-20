'use client';

import { Logo, LogoName } from "../../ui/Logo";

const TRUSTED_LOGOS: { name: LogoName; className: string }[] = [
  { name: "Leclerc-custom", className: "h-13 w-auto" },
  { name: "Ticketmaster", className: "h-10 w-auto" },
  { name: "Voyages-Leclerc", className: "h-14 w-auto" },
  { name: "HeroUI", className: "h-12 w-auto" },
  { name: "DogFidelity", className: "h-12 w-auto" },
  { name: "Delaveine", className: "h-10 w-auto" },
  { name: "Zigoh", className: "h-12 w-auto" },
  { name: "Inmac", className: "h-14 w-auto" },
  { name: "Vocajob", className: "h-13 w-auto" },
];

export const TrustedBy = () => {
  const seamlessLogos = [...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS, ...TRUSTED_LOGOS]; // Not used here as we loop manually in JSX, but good practice if you refactor

  return (
    <div className="w-full flex flex-col items-center py-24 md:py-36 bg-radial-[at_25%_25%] from-[#080808] to-[#121212] to-75% overflow-hidden">

      <h3 className="text-[#c2c2c2] text-2xl md:text-3xl font-bold mb-24 text-center px-4">
        Ils m'ont fait confiance
      </h3>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >

        <div className="flex w-max">

          {/* GROUPE A */}
          <div className="flex items-center gap-16 md:gap-64 pr-16 md:pr-64 animate-infinite-scroll">
            {TRUSTED_LOGOS.map((logo, index) => (
              <div key={`a-${index}`} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <Logo name={logo.name} className={`${logo.className} text-white`} />
              </div>
            ))}
            {/* Repetition for width */}
            {TRUSTED_LOGOS.map((logo, index) => (
              <div key={`a2-${index}`} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <Logo name={logo.name} className={`${logo.className} text-white`} />
              </div>
            ))}
          </div>

          {/* GROUPE B (Boucle) */}
          <div className="flex items-center gap-16 md:gap-64 pr-16 md:pr-64 animate-infinite-scroll" aria-hidden="true">
            {TRUSTED_LOGOS.map((logo, index) => (
              <div key={`b-${index}`} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <Logo name={logo.name} className={`${logo.className} text-white`} />
              </div>
            ))}
            {/* Repetition for width */}
            {TRUSTED_LOGOS.map((logo, index) => (
              <div key={`b2-${index}`} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300">
                <Logo name={logo.name} className={`${logo.className} text-white`} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};