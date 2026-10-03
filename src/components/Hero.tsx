import React from 'react';
import { ArrowUpRight, Send, Bot, Zap, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL, openTelegramDirect } from '../constants/telegram';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';
import defaultHeroImage from '../assets/images/hero_prizes_showcase_1790848379769.jpg';

interface HeroProps {
  onOpenTelegram?: () => void;
}

export function Hero({ onOpenTelegram }: HeroProps) {
  const { language } = useLanguage();
  const t = translations[language].intro;

  const handleDirectTelegram = () => {
    openTelegramDirect();
  };

  return (
    <section
      id="top"
      className="relative w-full pt-8 pb-20 md:pt-14 md:pb-28 px-5 md:px-8 max-w-7xl mx-auto z-10 overflow-hidden"
    >
      {/* Moving Candlestick Live Background in Hero Section */}
      <XauusdCandlestickBackground opacity="opacity-35" />

      {/* Hero Typography & CTAs (Full Width, Grand Presence) */}
      <div className="reveal-division relative z-10 max-w-4xl space-y-7 mb-14">
        {/* Hero Title: TRADE & CLAIM X SELF REBATE 10USD */}
        <h1 className="font-syncopate font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white drop-shadow-[0_0_25px_rgba(6,182,212,0.35)] leading-[1.05] sm:leading-[0.98] break-words">
          TRADE & CLAIM <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-emerald-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            X SELF REBATE 10USD
          </span>
        </h1>

        {/* Subtitle statement */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
          {language === 'id'
            ? 'Setiap closed lot yang Anda tradingkan bulan ini otomatis dihitung ke saldo hadiah Anda. Dapatkan self rebate USD 10/LOT, indikator VIP senilai 10K USD di TradingView, serta hadiah tunai & gadget mewah.'
            : 'Every closed lot you trade this month is automatically accumulated into your rewards balance. Enjoy USD 10/LOT self rebate, $10,000 USD VIP indicator in TradingView, plus luxury cash and Apple prizes.'}
        </p>

        {/* Necessary Buttons Only: Direct to Telegram without delay */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
          {/* Main Action -> Direct to Telegram */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs sm:text-sm font-mono uppercase tracking-widest font-bold transition-all shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] hover:scale-105 cursor-pointer text-center"
          >
            <Send className="w-4 h-4 shrink-0 text-black" />
            <span>{language === 'id' ? 'Klaim di Telegram Sekarang' : 'Claim on Telegram Now'}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 text-black" />
          </a>

          {/* Secondary Action -> Direct Channel Link */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full glass-panel hover:bg-cyan-950/40 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-mono uppercase tracking-wider transition-all hover:scale-102 cursor-pointer text-center"
          >
            <Send className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{t.joinChannel}</span>
          </a>
        </div>

        {/* 3 High-Impact Perk Cards (All direct to Telegram) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/8 max-w-3xl">
          {/* Card 1: Self Rebate 10USD */}
          <div
            onClick={handleDirectTelegram}
            className="reveal-division glass-panel p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-400 transition-all hover:scale-102 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)] group"
          >
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-cyan-400 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Self Rebate Program
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-white">
              USD 10 / LOT
            </div>
            <span className="text-[11px] text-cyan-300 font-mono block mt-0.5">
              Self Rebate 10USD →
            </span>
          </div>

          {/* Card 2: VIP Indicator Suite Worth 10K USD in TradingView */}
          <div
            onClick={handleDirectTelegram}
            className="reveal-division glass-panel p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-400 transition-all hover:scale-102 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)] group"
          >
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  TradingView Ready
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-cyan-300">
              WORTH 10K USD
            </div>
            <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
              {language === 'id' ? 'Free Trial di TradingView →' : 'Free Trial in TradingView →'}
            </span>
          </div>

          {/* Card 3: Luxury Prize Milestones */}
          <div
            onClick={handleDirectTelegram}
            className="reveal-division glass-panel p-4 rounded-2xl border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-950/40 transition-all hover:scale-102 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
          >
            <div className="flex items-center justify-between text-cyan-400 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 shrink-0 animate-pulse text-amber-400" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Target Milestones
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-white">
              100 — 1,000 LOT
            </div>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              Cash & Apple Prizes →
            </span>
          </div>
        </div>
      </div>

      {/* FULL HERO PRIZE SHOWCASE - FULL COLOR, VIBRANT, MODERN */}
      <div className="reveal-division relative z-10 rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)]">
        {/* Top HUD Frame Bar */}
        <div className="px-5 py-3.5 bg-black/75 border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-200 font-bold">
              OFFICIAL PRIZE SHOWCASE · ALL 5 TIERS INCLUDED
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-1 rounded-full font-bold shadow-sm">
              SELF REBATE 10USD
            </span>
            <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full font-bold shadow-sm">
              WORTH 10K USD INDICATOR
            </span>
          </div>
        </div>

        {/* Picture Container - Full Vibrant Color (NO grayscale) */}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full aspect-[16/10] sm:aspect-[21/9] bg-gradient-to-b from-black/60 via-transparent to-black/80 p-2 sm:p-4 group cursor-pointer overflow-hidden"
        >
          <img
            src={defaultHeroImage}
            alt="Trade & Claim All Prize Showcase Full Color"
            className="w-full h-full object-contain sm:object-cover object-center rounded-xl saturate-120 contrast-105 brightness-105 group-hover:scale-102 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Soft Bottom Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-transparent to-transparent pointer-events-none" />

          {/* Floating Live Badge on Image */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto flex flex-wrap items-center gap-2 pointer-events-none">
            <span className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md border border-cyan-500/50 text-white text-[11px] font-mono flex items-center gap-2.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Cash 2.2Jt · iPad 11 · iPhone 17 · MacBook Neo + 17Jt · SELF REBATE 10USD</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
