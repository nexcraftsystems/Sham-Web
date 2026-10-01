import React from 'react';
import { ArrowUpRight } from './Icons';
import { RevealText } from './RevealText';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

interface FreeIndicatorSectionProps {
  onOpenRegister: () => void;
  onOpenTelegram?: () => void;
}

export function FreeIndicatorSection({
  onOpenRegister,
}: FreeIndicatorSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].freeIndicator;

  return (
    <section
      id="free-indicator"
      className="w-full bg-[#111] text-[#faf8f5] py-12 md:py-16 px-6 md:px-12 select-none border-b border-white/10"
    >
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
        {/* Left: All wording, refined and not too big */}
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-normal tracking-tight text-white leading-snug">
            <RevealText key={`free-ind-${language}`} text={t.heading} />
          </h2>
        </div>

        {/* Right: Register Now button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>{t.registerNow}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
