import React from 'react';
import { RevealText } from './RevealText';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';

interface IntroProps {
  onOpenTelegram?: () => void;
  onOpenRegister?: () => void;
}

export function Intro({ onOpenTelegram, onOpenRegister }: IntroProps) {
  return (
    <section id="intro" className="relative w-full bg-[#faf8f5] text-[#111] py-20 md:py-32 px-6 md:px-12 border-b border-black/10 overflow-hidden select-none">
      {/* Live Moving XAU/USD Candlestick Chart Background (50% saturated, green bullish / red bearish) */}
      <XauusdCandlestickBackground />

      <div className="relative z-10 max-w-[1800px] mx-auto flex flex-col space-y-16 md:space-y-24">
        {/* Top Meta Line: Left & Right */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base font-normal text-black/75 border-b border-black/10 pb-6 gap-2">
          <span>Automated monthly volume tracking. Instant admin claims.</span>
          <span className="font-mono text-xs uppercase tracking-wider text-black/50">
            Open to all registered traders
          </span>
        </div>

        {/* Large Tracking-Tight Headline with Word-by-Word Reveal Animation */}
        <div className="max-w-6xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.03em] leading-[1.1] text-[#111]">
            <RevealText text="MORE LOT, MORE REWARDS, MORE REBATE!" />
          </h2>
        </div>

        {/* Secondary Editorial Paragraph & Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.2em] text-black/50">
            Program Overview
          </div>
          <div className="md:col-span-8 max-w-3xl space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-black/85 leading-relaxed">
              <RevealText text="Every closed lot you trade this month is automatically accumulated into your tier balance. Whether you trade 5 lots or scale past 10,000 lots, your rewards grow continuously." />
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenTelegram}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#229ED9] text-white text-xs font-semibold tracking-wide hover:bg-[#1b8ec4] transition-all cursor-pointer shadow-sm hover:scale-102"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                <span>Join Official Telegram Channel</span>
              </button>
              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide hover:bg-neutral-800 transition-all cursor-pointer hover:scale-102"
              >
                <span>Register Account</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
