import React from 'react';
import { Sparkles, Send, Zap, Gift, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';

interface SpecialOfferBannerProps {
  onOpenTelegram?: () => void;
}

export function SpecialOfferBanner({ onOpenTelegram }: SpecialOfferBannerProps) {
  const { language } = useLanguage();
  const t = translations[language].specialOffer;

  const handleTelegramClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-cyan-950/80 via-black to-cyan-950/80 border-b border-cyan-500/30 text-white py-2.5 px-4 sm:px-6 relative z-30 select-none shadow-[0_0_20px_rgba(6,182,212,0.15)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* Left: Highlight Chips */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 text-xs font-mono">
          <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-black font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
            <Zap className="w-3 h-3 fill-black" />
            {t.bannerTag}
          </span>

          <span className="text-slate-200 font-semibold flex items-center gap-2">
            <span className="text-cyan-300 font-bold underline decoration-cyan-500/60 underline-offset-4">
              {language === 'id' ? 'Free Trial Seminggu Indicator Bernilai 10K USD' : 'Free 1-Week Trial Indicator ($10K USD Value)'}
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-emerald-400 font-bold">
              10 Lot Self Rebate (USD 14/LOT)
            </span>
          </span>
        </div>

        {/* Right: Action CTA */}
        <div className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleTelegramClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-[11px] font-mono uppercase font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 cursor-pointer text-center"
          >
            <Send className="w-3 h-3 shrink-0" />
            <span>{language === 'id' ? 'Contact Support for Claim 14USD Free Now' : 'Contact Support for Claim 14USD Free Now'}</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
