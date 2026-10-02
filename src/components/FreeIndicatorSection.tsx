import React from 'react';
import { ArrowUpRight, Bot, Send, Sparkles, Zap, Gift, Coins } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';

interface FreeIndicatorSectionProps {
  onOpenRegister: () => void;
  onOpenTelegram?: () => void;
}

export function FreeIndicatorSection({
  onOpenRegister,
  onOpenTelegram,
}: FreeIndicatorSectionProps) {
  const { language } = useLanguage();
  const t = translations[language].freeIndicator;

  const handleSupportClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <section
      id="indicator"
      className="relative w-full py-20 md:py-28 px-5 md:px-8 max-w-7xl mx-auto z-10 border-b border-white/8 select-none"
    >
      <div className="reveal-division rounded-3xl glass-panel p-7 sm:p-12 md:p-16 border border-cyan-500/25 relative overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.18)]">
        {/* Moving Candlestick Live Background in Free Indicator Section */}
        <XauusdCandlestickBackground opacity="opacity-35" />

        {/* Ambient Top-Right Glow */}
        <div className="w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl absolute -top-20 -right-20 pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Left Column: Typography & Badges */}
          <div className="space-y-6 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 border-l-2 border-cyan-500 pl-3 py-0.5">
                03 // VIP INDICATOR
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                {language === 'id'
                  ? 'Free Trial Seminggu Indicator Bernilai 10K USD'
                  : 'Free 1-Week Trial Indicator ($10K USD Value)'}
              </span>
            </div>

            {/* Main Section Headline with "WORTH 10K USD" as big as the title right after indicator */}
            <h2 className="font-syncopate text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-[1.08]">
              {language === 'id' ? (
                <>
                  Daftar sekarang dan klaim indikator gratis Anda{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    WORTH 10K USD
                  </span>
                </>
              ) : (
                <>
                  Register now and claim your free indicator{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    WORTH 10K USD
                  </span>
                </>
              )}
            </h2>

            {/* Special Dual Feature Callout: 10 Lot Self Rebate USD 14/LOT */}
            <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 block">
                    Special Trader Rate
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-white">
                    10 Lot Self Rebate · <span className="text-cyan-400">USD 14 / LOT</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  ✓ Instant Payouts
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono text-slate-300">
              <span className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                Zero Repaint Algorithm
              </span>
              <span className="px-3 py-1 rounded-lg bg-black/60 border border-white/10">
                MT4 · MT5 · TradingView
              </span>
              <span className="px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                WORTH 10K USD INCLUDED
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Action Buttons */}
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
            {/* Contact Support for Claim 14USD Free Now */}
            <button
              type="button"
              onClick={handleSupportClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-black text-xs sm:text-sm font-mono uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <Gift className="w-4 h-4 text-black" />
              <span>Contact Support for Claim 14USD Free Now</span>
            </button>

            {/* Register Now Button */}
            <button
              type="button"
              onClick={onOpenRegister}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass-panel hover:bg-white/10 border border-white/15 text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold transition-all hover:scale-102 cursor-pointer whitespace-nowrap"
            >
              <span>{t.registerNow}</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
