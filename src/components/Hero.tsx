import React from 'react';
import defaultHeroImage from '../assets/images/hero_prizes_showcase_1790848379769.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenTelegram: () => void;
}

export function Hero({ onOpenRegister, onOpenTelegram }: HeroProps) {
  return (
    <section
      id="top"
      className="relative w-full min-h-[85vh] md:min-h-[92vh] bg-black text-white overflow-hidden flex flex-col justify-end select-none border-b border-black/10"
    >
      {/* Full-bleed background image filling all the hero section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={defaultHeroImage}
          alt="Trade & Claim Hero Showcase"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic gradient overlays for high contrast and white text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40 pointer-events-none" />
      </div>

      {/* Hero Bottom: "TRADE & CLAIM" maintaining exact size & position, with white font color */}
      <div className="relative z-10 w-full overflow-hidden flex flex-col items-center justify-end pointer-events-none px-2 sm:px-4 md:px-6">
        <h1 className="text-[13.8vw] sm:text-[14.2vw] md:text-[14.6vw] lg:text-[14.9vw] leading-[0.78] tracking-[-0.035em] font-normal uppercase text-white whitespace-nowrap overflow-hidden select-none -mb-1 md:-mb-4">
          TRADE & CLAIM
        </h1>
      </div>
    </section>
  );
}
