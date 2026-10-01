import React from 'react';
import { TelegramIcon, ArrowUpRight } from './Icons';
import { RevealText } from './RevealText';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';

interface HowToClaimProps {
  onOpenTelegram: () => void;
  onOpenRegister: () => void;
}

export function HowToClaim({ onOpenTelegram, onOpenRegister }: HowToClaimProps) {
  const steps = [
    {
      num: '01',
      title: 'Trade as usual',
      description: 'Every lot you trade within the month is counted automatically.',
      highlight: 'Automated Real-Time Tracking',
      iconText: 'LOTS COUNTED',
    },
    {
      num: '02',
      title: 'Hit your lot target',
      description: 'Reach the lot target for the prize you want — from 5 lots up to 10,000 lots.',
      highlight: 'Tier Range: 100 to 1,000 Lots',
      iconText: 'FLEXIBLE MILESTONES',
    },
    {
      num: '03',
      title: 'Claim with admin',
      description: 'Hit the target? Contact our admin right away to claim your prize.',
      highlight: 'Instant Telegram Verification',
      iconText: 'FAST PAYOUTS',
    },
  ];

  return (
    <section id="how-to-claim" className="relative w-full bg-[#faf8f5] py-20 md:py-32 border-b border-black/10 select-none overflow-hidden">
      {/* Live Moving XAU/USD Candlestick Chart Background (Green Bullish / Red Bearish, 50% Saturated) */}
      <XauusdCandlestickBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-black/50 mb-3">
              <span>Simple 3-Step Process</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-800 font-medium">Real-Time Market Volume</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#111]">
              <RevealText text="How to claim rewards" />
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenTelegram}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#229ED9] text-white text-xs font-semibold tracking-wide hover:bg-[#1b8ec4] transition-all cursor-pointer shadow-sm hover:scale-102"
            >
              <TelegramIcon className="w-3.5 h-3.5" />
              <span>Contact Admin on Telegram</span>
            </button>
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold tracking-wide hover:bg-neutral-800 transition-all cursor-pointer hover:scale-102"
            >
              <span>Register Account</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Step Cards Grid with Translucent Glass effect over the Live Candlestick stream */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative p-8 md:p-10 rounded-3xl bg-white/88 backdrop-blur-md border border-black/10 hover:border-black/25 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Step Index & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-black/5 mb-6">
                  <span className="text-2xl font-mono font-light text-black/40 group-hover:text-black transition-colors">
                    STEP {step.num}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-black/5 text-black/70">
                    {step.iconText}
                  </span>
                </div>

                {/* Step Title & Content */}
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#111] mb-4">
                  {step.title}
                </h3>
                <p className="text-base text-black/70 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Step Footer Highlight */}
              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-black/60">
                <span>{step.highlight}</span>
                {idx === 2 ? (
                  <button
                    type="button"
                    onClick={onOpenTelegram}
                    className="inline-flex items-center gap-1 text-[#229ED9] hover:underline font-sans font-medium"
                  >
                    <span>@TradeAndClaimAdmin</span>
                    <TelegramIcon className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-emerald-600 font-medium">✓ Automatic</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
