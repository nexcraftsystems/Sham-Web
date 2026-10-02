import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Send, ShieldCheck, Zap, TrendingUp, Gift, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { TELEGRAM_URL } from '../constants/telegram';
import { XauusdCandlestickBackground } from './XauusdCandlestickBackground';
import defaultHeroImage from '../assets/images/hero_prizes_showcase_1790848379769.jpg';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenTelegram: () => void;
}

export function Hero({ onOpenRegister, onOpenTelegram }: HeroProps) {
  const { language } = useLanguage();
  const t = translations[language].intro;
  const perk = translations[language].specialOffer;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSupportClick = () => {
    if (onOpenTelegram) {
      onOpenTelegram();
    } else {
      window.open(TELEGRAM_URL, '_blank');
    }
  };

  return (
    <section
      id="top"
      className="relative w-full pt-8 pb-20 md:pt-14 md:pb-28 px-5 md:px-8 max-w-7xl mx-auto z-10 overflow-hidden"
    >
      {/* Moving Candlestick Live Background in Hero Section */}
      <XauusdCandlestickBackground opacity="opacity-35" />

      {/* 12-Column Grid: 8 Cols for Typography & CTA, 4 Cols for Radar HUD */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-7">
          {/* Subtitle tag with border-l-2 border-cyan-500 */}
          <div className="inline-flex items-center gap-3 border-l-2 border-cyan-500 pl-4 py-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-cyan-400">
              {t.metaLeft}
            </span>
          </div>

          {/* Hero Title with line break and mix-blend-screen */}
          <h1 className="font-syncopate font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white mix-blend-screen drop-shadow-[0_0_25px_rgba(6,182,212,0.35)] leading-[0.95] sm:leading-[0.92] break-words">
            TRADE & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              CLAIM
            </span>
          </h1>

          {/* Subtitle statement */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 font-light leading-relaxed max-w-2xl">
            {t.description}
          </p>

          {/* Action CTAs: Register + Claim 14USD Free Now + Join Channel */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenRegister}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs sm:text-sm font-mono uppercase tracking-widest font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 cursor-pointer text-center"
            >
              <span>{t.registerAccount}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>

            {/* Special Perk Action: Contact support for claim 14usd free now */}
            <button
              type="button"
              onClick={handleSupportClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-950 via-cyan-900 to-cyan-950 hover:border-cyan-400 border border-cyan-500/50 text-cyan-300 text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 cursor-pointer text-center"
            >
              <Gift className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
              <span>Contact Support for Claim 14USD Free Now</span>
            </button>

            <button
              type="button"
              onClick={onOpenTelegram}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full glass-panel hover:bg-cyan-950/40 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-mono uppercase tracking-wider transition-all hover:scale-102 cursor-pointer text-center"
            >
              <Send className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{t.joinChannel}</span>
            </button>
          </div>

          {/* 3 High-Impact Perk Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 border-t border-white/8 max-w-3xl">
            {/* Card 1: 10 Lot Self Rebate USD 14/LOT */}
            <div className="reveal-division is-revealed glass-panel p-3.5 sm:p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Zap className="w-4 h-4 fill-cyan-400 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  10 Lot Program
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                USD 14 / LOT
              </div>
              <span className="text-[11px] text-cyan-300 font-mono block mt-0.5">
                10 Lot Self Rebate
              </span>
            </div>

            {/* Card 2: Free trial seminggu Indicator bernilai 10k usd */}
            <div className="reveal-division is-revealed glass-panel p-3.5 sm:p-4 rounded-2xl border border-cyan-500/25 hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Bot className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  VIP Indicator Suite
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-cyan-300">
                10K USD Value
              </div>
              <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">
                {language === 'id' ? 'Free Trial Seminggu' : 'Free 1-Week Trial'}
              </span>
            </div>

            {/* Card 3: Contact support for claim 14usd free now */}
            <div
              onClick={handleSupportClick}
              className="reveal-division is-revealed glass-panel p-3.5 sm:p-4 rounded-2xl border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-950/40 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] group"
            >
              <div className="flex items-center justify-between text-cyan-400 mb-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 shrink-0 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                    Instant Bonus
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="text-base sm:text-lg font-bold font-mono text-white">
                Claim 14USD Free
              </div>
              <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                Contact Support Now →
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4): Animated Radar HUD Division
            - Hidden on mobile device (hidden md:flex)
            - Animated on scrolling with floating parallax and slight dynamic tilt */}
        <div className="hidden md:flex lg:col-span-4 justify-center">
          <div
            style={{
              transform: `translate3d(0, ${Math.min(scrollY * 0.12, 55)}px, 0) rotate(${Math.sin(scrollY * 0.0035) * 2.2}deg)`,
              transition: 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="hidden md:flex relative w-full max-w-[280px] sm:max-w-[340px] aspect-square rounded-2xl glass-panel p-3.5 sm:p-6 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.18)] items-center justify-center overflow-hidden transition-shadow hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]"
          >
            {/* Background circular rings at scale-75 and scale-50 */}
            <div className="absolute inset-0 m-auto w-full h-full rounded-full border border-cyan-500/20" />
            <div className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full border border-cyan-500/25 scale-75" />
            <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full border border-cyan-500/30 scale-50" />
            
            {/* Center crosshair lines */}
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

            {/* Rotating radar sweep line */}
            <div className="absolute inset-0 m-auto w-full h-full rounded-full animate-radar-sweep pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/25 to-transparent origin-bottom-right" />
            </div>

            {/* Vector Animated Polygon Radar Path with 5 EXACT corners: REBATE, INDICATOR, REWARDS, CLAIM, SUPPORT */}
            <svg
              viewBox="0 0 140 130"
              className="w-full h-full relative z-10 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.85)] overflow-visible"
            >
              {/* Radar animated polygon path with 5 corners */}
              <polygon
                points="70,26 104,50 91,88 49,88 36,50"
                fill="rgba(6, 182, 212, 0.16)"
                stroke="#06b6d4"
                strokeWidth="1.8"
                className="animate-radar-path"
              />

              {/* Node glow dots at the 5 vertices */}
              <circle cx="70" cy="26" r="3" fill="#ffffff" className="drop-shadow-[0_0_6px_#fff]" />
              <circle cx="104" cy="50" r="3" fill="#06b6d4" className="drop-shadow-[0_0_6px_#06b6d4]" />
              <circle cx="91" cy="88" r="3" fill="#06b6d4" className="drop-shadow-[0_0_6px_#06b6d4]" />
              <circle cx="49" cy="88" r="3" fill="#06b6d4" className="drop-shadow-[0_0_6px_#06b6d4]" />
              <circle cx="36" cy="50" r="3" fill="#ffffff" className="drop-shadow-[0_0_6px_#fff]" />

              {/* 1. REBATE (Top Corner) */}
              <text
                x="70"
                y="15"
                textAnchor="middle"
                fill="#67e8f9"
                fontSize="6.5"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                REBATE
              </text>

              {/* 2. INDICATOR (Top-Right Corner) */}
              <text
                x="110"
                y="52"
                textAnchor="start"
                fill="#67e8f9"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                INDICATOR
              </text>

              {/* 3. REWARDS (Bottom-Right Corner) */}
              <text
                x="95"
                y="101"
                textAnchor="middle"
                fill="#67e8f9"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                REWARDS
              </text>

              {/* 4. CLAIM (Bottom-Left Corner) */}
              <text
                x="45"
                y="101"
                textAnchor="middle"
                fill="#67e8f9"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                CLAIM
              </text>

              {/* 5. SUPPORT (Top-Left Corner) */}
              <text
                x="30"
                y="52"
                textAnchor="end"
                fill="#67e8f9"
                fontSize="6"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="0.06em"
              >
                SUPPORT
              </text>
            </svg>

            {/* Live Center Telemetry Readout */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-slate-400 border-t border-white/10 pt-2 z-20">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                HUD LIVE · 5 CORNERS
              </span>
              <span>USD 14/LOT · 10K USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL HERO PRIZE SHOWCASE (Optimized for Mobile Phone Preview to see ALL prizes) */}
      <div className="reveal-division relative z-10 rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
        {/* Top HUD Frame Bar */}
        <div className="px-5 py-3 bg-black/60 border-b border-white/8 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Live Prize Catalog · Monthly Cycle
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
              USD 14/LOT Self Rebate
            </span>
            <span className="text-[10px] font-mono uppercase text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded">
              All 5 Tiers Included
            </span>
          </div>
        </div>

        {/* Picture Container */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] bg-gradient-to-b from-black/80 via-black/40 to-black/90 flex items-center justify-center p-2 sm:p-4">
          <img
            src={defaultHeroImage}
            alt="Trade & Claim All Prize Showcase"
            className="w-full h-full object-contain sm:object-cover object-center rounded-xl"
            referrerPolicy="no-referrer"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />

          {/* Floating Live Badge on Image */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto flex flex-wrap items-center gap-2 pointer-events-none">
            <span className="px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-cyan-500/30 text-white text-[11px] font-mono flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Cash 2.2Jt · iPad 11 · iPhone 17 · MacBook Neo + 17Jt · USD 14/LOT
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
