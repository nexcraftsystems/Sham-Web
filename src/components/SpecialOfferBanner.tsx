import React from 'react';
import { Send, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TELEGRAM_URL } from '../constants/telegram';

interface SpecialOfferBannerProps {
  onOpenTelegram?: () => void;
}

export function SpecialOfferBanner({ onOpenTelegram }: SpecialOfferBannerProps) {
  const { language } = useLanguage();

  return (
    <div className="reveal-division w-full bg-gradient-to-r from-amber-950/90 via-black to-amber-950/90 border-b border-amber-500/30 text-white py-2.5 px-4 sm:px-6 relative z-30 select-none shadow-[0_0_20px_rgba(245,158,11,0.18)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        {/* Left: Free Indicator Highlight */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 text-xs font-mono">
          <span className="text-slate-200 font-semibold flex items-center gap-2">
            <span className="text-amber-300 font-bold underline decoration-amber-500/60 underline-offset-4 flex items-center gap-1.5">
              <span>
                {language === 'id'
                  ? 'FREE TRIAL SEMINGGU VIP INDIKATOR WORTH 10K USD (TERSEDIA DI TRADINGVIEW)'
                  : 'FREE 1-WEEK VIP INDICATOR WORTH $10,000 USD (AVAILABLE IN TRADINGVIEW)'}
              </span>
            </span>
          </span>
        </div>

        {/* Right: Single Necessary Action CTA to Telegram */}
        <div className="shrink-0 w-full sm:w-auto flex items-center justify-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 text-black text-[11px] font-mono uppercase font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:scale-105 cursor-pointer text-center"
          >
            <Send className="w-3 h-3 shrink-0" />
            <span>{language === 'id' ? 'Klaim di Telegram Sekarang' : 'Claim on Telegram Now'}</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
